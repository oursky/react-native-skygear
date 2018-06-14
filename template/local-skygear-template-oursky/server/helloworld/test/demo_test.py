import sqlalchemy as sa
from ..database import open_session


def test_plus():
    assert 1 + 1 == 2


def test_database_connection():
    with open_session(read_write=False) as session:
        forty_two = session.execute(sa.text('SELECT 42')).scalar()
        assert forty_two == 42
