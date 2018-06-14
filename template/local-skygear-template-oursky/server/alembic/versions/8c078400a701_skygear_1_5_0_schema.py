# flake8: noqa
"""skygear 1.5.0 schema

Revision ID: 8c078400a701
Revises: 
Create Date: 2018-06-06 04:30:08.183987

"""
from alembic import op
import sqlalchemy as sa
import os


# revision identifiers, used by Alembic.
revision = '8c078400a701'
down_revision = None
branch_labels = None
depends_on = None


SCHEMA_NAME = os.environ['APP_SCHEMA_NAME']


def upgrade():
    op.execute(sa.text('''
        CREATE SCHEMA IF NOT EXISTS {schema_name}
    '''.format(schema_name=SCHEMA_NAME)))
    op.execute(sa.text('''
        SET search_path TO {schema_name}, public
    '''.format(schema_name=SCHEMA_NAME)))
    op.execute(sa.text('''
        CREATE TABLE IF NOT EXISTS _version (
            version_num character varying(32) NOT NULL
        )
    '''))
    op.execute(sa.text('''
CREATE EXTENSION IF NOT EXISTS postgis WITH SCHEMA public;
CREATE EXTENSION IF NOT EXISTS citext WITH SCHEMA public;
CREATE TABLE IF NOT EXISTS public.pending_notification (
	id SERIAL NOT NULL PRIMARY KEY,
	op text NOT NULL,
	appname text NOT NULL,
	recordtype text NOT NULL,
	record jsonb NOT NULL
);
CREATE OR REPLACE FUNCTION public.notify_record_change() RETURNS TRIGGER AS $$
	DECLARE
		affected_record RECORD;
		inserted_id integer;
	BEGIN
		IF (TG_OP = 'DELETE') THEN
			affected_record := OLD;
		ELSE
			affected_record := NEW;
		END IF;
		INSERT INTO public.pending_notification (op, appname, recordtype, record)
			VALUES (TG_OP, TG_TABLE_SCHEMA, TG_TABLE_NAME, row_to_json(affected_record)::jsonb)
			RETURNING id INTO inserted_id;
		PERFORM pg_notify('record_change', inserted_id::TEXT);
		RETURN affected_record;
	END;
$$ LANGUAGE plpgsql;
CREATE TABLE _auth (
	id text PRIMARY KEY,
	password text,
	provider_info jsonb,
	token_valid_since timestamp without time zone,
	last_seen_at timestamp without time zone,
	disabled boolean NOT NULL DEFAULT FALSE,
	disabled_message text,
	disabled_expiry timestamp without time zone
);
CREATE TABLE _role (
	id text PRIMARY KEY,
	by_default boolean DEFAULT FALSE,
	is_admin boolean DEFAULT FALSE
);
CREATE TABLE _auth_role (
	auth_id text REFERENCES _auth (id) NOT NULL,
	role_id text REFERENCES _role (id) NOT NULL,
	PRIMARY KEY (auth_id, role_id)
);
CREATE TABLE _asset (
	id text PRIMARY KEY,
	content_type text NOT NULL,
	size bigint NOT NULL
);
CREATE TABLE _device (
	id text PRIMARY KEY,
	auth_id text REFERENCES _auth (id),
	type text NOT NULL,
	token text,
	topic text,
	last_registered_at timestamp without time zone NOT NULL,
	UNIQUE (auth_id, type, token)
);
CREATE INDEX ON _device (token, last_registered_at);
CREATE TABLE _subscription (
	id text NOT NULL,
	auth_id text NOT NULL,
	device_id text REFERENCES _device (id) ON DELETE CASCADE NOT NULL,
	type text NOT NULL,
	notification_info jsonb,
	query jsonb,
	PRIMARY KEY(auth_id, device_id, id)
);
CREATE TABLE _friend (
	left_id text NOT NULL,
	right_id text REFERENCES _auth (id) NOT NULL,
	PRIMARY KEY(left_id, right_id)
);
CREATE TABLE _follow (
	left_id text NOT NULL,
	right_id text REFERENCES _auth (id) NOT NULL,
	PRIMARY KEY(left_id, right_id)
);
CREATE TABLE _record_creation (
    record_type text NOT NULL,
    role_id text,
    UNIQUE (record_type, role_id),
    FOREIGN KEY (role_id) REFERENCES _role(id)
);
CREATE INDEX _record_creation_unique_record_type ON _record_creation (record_type);
CREATE TABLE _record_default_access (
    record_type text NOT NULL,
    default_access jsonb,
    UNIQUE (record_type)
);
CREATE INDEX _record_default_access_unique_record_type ON _record_default_access (record_type);
CREATE TABLE _record_field_access (
    record_type text NOT NULL,
    record_field text NOT NULL,
    user_role text NOT NULL,
    writable boolean NOT NULL,
    readable boolean NOT NULL,
    comparable boolean NOT NULL,
    discoverable boolean NOT NULL,
    PRIMARY KEY (record_type, record_field, user_role)
);
CREATE TABLE "user" (
    _id text,
    _database_id text,
    _owner_id text,
    _access jsonb,
    _created_at timestamp without time zone NOT NULL,
    _created_by text,
    _updated_at timestamp without time zone NOT NULL,
    _updated_by text,
    username citext,
    email citext,
    last_login_at timestamp without time zone,
    PRIMARY KEY(_id, _database_id, _owner_id),
    UNIQUE (_id)
);
ALTER TABLE "user" ADD CONSTRAINT auth_record_keys_user_username_key UNIQUE (username);
ALTER TABLE "user" ADD CONSTRAINT auth_record_keys_user_email_key UNIQUE (email);
CREATE VIEW _user AS
    SELECT
        a.id,
        a.password,
        u.username,
        u.email,
        a.provider_info AS auth,
        a.token_valid_since,
        u.last_login_at,
        a.last_seen_at
    FROM _auth AS a
    JOIN "user" AS u ON u._id = a.id;
INSERT INTO _record_field_access
  (record_type, record_field, user_role, writable, readable, comparable, discoverable)
VALUES
  ('user', 'username', '_any_user', 'FALSE', 'TRUE', 'TRUE', 'TRUE');
INSERT INTO _record_field_access
  (record_type, record_field, user_role, writable, readable, comparable, discoverable)
VALUES
  ('user', 'username', '_owner', 'TRUE', 'TRUE', 'TRUE', 'TRUE');
INSERT INTO _record_field_access
  (record_type, record_field, user_role, writable, readable, comparable, discoverable)
VALUES
  ('user', 'email', '_any_user', 'FALSE', 'TRUE', 'TRUE', 'TRUE');
INSERT INTO _record_field_access
  (record_type, record_field, user_role, writable, readable, comparable, discoverable)
VALUES
  ('user', 'email', '_owner', 'TRUE', 'TRUE', 'TRUE', 'TRUE');
CREATE TABLE _sso_oauth (
  user_id text NOT NULL,
  provider text NOT NULL,
  principal_id text NOT NULL,
  token_response jsonb,
  profile jsonb,
  _created_at timestamp without time zone NOT NULL,
  _updated_at timestamp without time zone NOT NULL,
  PRIMARY KEY (provider, principal_id),
  UNIQUE (user_id, provider)
);
CREATE TABLE _sso_custom_token (
  user_id text NOT NULL PRIMARY KEY,
  principal_id text NOT NULL,
  _created_at timestamp without time zone NOT NULL,
  UNIQUE (principal_id)
);
CREATE TABLE _password_history (
	id TEXT PRIMARY KEY,
	auth_id TEXT NOT NULL,
	password TEXT NOT NULL,
	logged_at TIMESTAMP WITHOUT TIME ZONE NOT NULL
);
CREATE INDEX ON _password_history (auth_id, logged_at DESC);
CREATE TABLE _verify_code (
	id TEXT PRIMARY KEY,
	auth_id TEXT NOT NULL,
	record_key TEXT NOT NULL,
	record_value TEXT NOT NULL,
	code TEXT NOT NULL,
	consumed BOOLEAN NOT NULL DEFAULT FALSE,
	created_at TIMESTAMP WITHOUT TIME ZONE NOT NULL
);
CREATE INDEX ON _verify_code (auth_id, code, consumed);
    '''))
    # set the version number
    op.execute(sa.text('''
        DELETE FROM _version;
        INSERT INTO _version (version_num) VALUES ('{version_num}')
    '''.format(version_num='7469be11899e')))
    # insert the admin role
    op.execute(sa.text('''
        INSERT INTO _role (id, by_default, is_admin)
        VALUES ('Admin', FALSE, TRUE)
        ON CONFLICT DO NOTHING
    '''))
    # insert the admin user
    op.execute(sa.text('''
        INSERT INTO "user" (
            _id,
            _database_id,
            _owner_id,
            _access,
            _created_at,
            _created_by,
            _updated_at,
            _updated_by
        ) VALUES (
            'admin',
            'admin',
            'admin',
            '[]'::jsonb,
            current_timestamp,
            'admin',
            current_timestamp,
            'admin'
        ) ON CONFLICT DO NOTHING;
        INSERT INTO "_auth" (
            "id",
            "provider_info"
        ) VALUES (
            'admin',
            'null'::jsonb
        ) ON CONFLICT DO NOTHING;
    '''))
    # add admin role to admin
    op.execute(sa.text('''
        INSERT INTO _auth_role (
            auth_id,
            role_id
        ) VALUES (
            'admin',
            'Admin'
        ) ON CONFLICT DO NOTHING
    '''))
    op.execute(sa.text('''
        SET search_path TO public
    '''))


def downgrade():
    op.execute(sa.text('''
        DROP SCHEMA IF EXISTS {schema_name} CASCADE
    '''.format(schema_name=SCHEMA_NAME)))
