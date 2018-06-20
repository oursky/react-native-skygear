from contextlib import contextmanager
import os
import sqlalchemy as sa
from sqlalchemy.orm import sessionmaker


SCHEMA_NAME = os.environ['APP_SCHEMA_NAME']
_engine = None


def _get_engine():
    global _engine
    if _engine is None:
        _engine = sa.create_engine(
            os.environ['DATABASE_URL'],
        )
    return _engine


Session = sessionmaker(bind=_get_engine())


@contextmanager
def open_session(read_write, isolation_level=None):
    if isolation_level is not None:
        bind = _get_engine().execution_options(
            isolation_level=isolation_level,
        )
    else:
        bind = _get_engine()
    session = Session(bind=bind, autoflush=False)
    try:
        session.execute('SET search_path TO {}, public'.format(SCHEMA_NAME))
        if not read_write:
            session.execute('SET TRANSACTION READ ONLY')
        yield session
        if not read_write:
            session.rollback()
        else:
            session.commit()
    except:  # noqa
        session.rollback()
        raise
    finally:
        session.close()
