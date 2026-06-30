--
-- PostgreSQL database dump
--

\restrict jiCGcOqVFrBQC86pMbYXVDRfxpaf8FEdOofl6fpS5CXwyenUUa97UMOLXTHMfBg

-- Dumped from database version 17.6
-- Dumped by pg_dump version 18.3 (Homebrew)

-- Started on 2026-04-05 03:05:38 WITA

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET transaction_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

--
-- TOC entry 41 (class 2615 OID 16498)
-- Name: auth; Type: SCHEMA; Schema: -; Owner: supabase_admin
--

CREATE SCHEMA auth;


ALTER SCHEMA auth OWNER TO supabase_admin;

--
-- TOC entry 27 (class 2615 OID 16392)
-- Name: extensions; Type: SCHEMA; Schema: -; Owner: postgres
--

CREATE SCHEMA extensions;


ALTER SCHEMA extensions OWNER TO postgres;

--
-- TOC entry 39 (class 2615 OID 16578)
-- Name: graphql; Type: SCHEMA; Schema: -; Owner: supabase_admin
--

CREATE SCHEMA graphql;


ALTER SCHEMA graphql OWNER TO supabase_admin;

--
-- TOC entry 38 (class 2615 OID 16567)
-- Name: graphql_public; Type: SCHEMA; Schema: -; Owner: supabase_admin
--

CREATE SCHEMA graphql_public;


ALTER SCHEMA graphql_public OWNER TO supabase_admin;

--
-- TOC entry 16 (class 2615 OID 16390)
-- Name: pgbouncer; Type: SCHEMA; Schema: -; Owner: pgbouncer
--

CREATE SCHEMA pgbouncer;


ALTER SCHEMA pgbouncer OWNER TO pgbouncer;

--
-- TOC entry 144 (class 2615 OID 25742)
-- Name: pgjwt; Type: SCHEMA; Schema: -; Owner: postgres
--

CREATE SCHEMA pgjwt;


ALTER SCHEMA pgjwt OWNER TO postgres;

--
-- TOC entry 17 (class 2615 OID 16559)
-- Name: realtime; Type: SCHEMA; Schema: -; Owner: supabase_admin
--

CREATE SCHEMA realtime;


ALTER SCHEMA realtime OWNER TO supabase_admin;

--
-- TOC entry 42 (class 2615 OID 16546)
-- Name: storage; Type: SCHEMA; Schema: -; Owner: supabase_admin
--

CREATE SCHEMA storage;


ALTER SCHEMA storage OWNER TO supabase_admin;

--
-- TOC entry 18 (class 2615 OID 17453)
-- Name: supabase_migrations; Type: SCHEMA; Schema: -; Owner: postgres
--

CREATE SCHEMA supabase_migrations;


ALTER SCHEMA supabase_migrations OWNER TO postgres;

--
-- TOC entry 36 (class 2615 OID 16607)
-- Name: vault; Type: SCHEMA; Schema: -; Owner: supabase_admin
--

CREATE SCHEMA vault;


ALTER SCHEMA vault OWNER TO supabase_admin;

--
-- TOC entry 2 (class 3079 OID 27452)
-- Name: http; Type: EXTENSION; Schema: -; Owner: -
--

CREATE EXTENSION IF NOT EXISTS http WITH SCHEMA extensions;


--
-- TOC entry 4730 (class 0 OID 0)
-- Dependencies: 2
-- Name: EXTENSION http; Type: COMMENT; Schema: -; Owner: 
--

COMMENT ON EXTENSION http IS 'HTTP client for PostgreSQL, allows web page retrieval inside the database.';


--
-- TOC entry 4 (class 3079 OID 25464)
-- Name: hypopg; Type: EXTENSION; Schema: -; Owner: -
--

CREATE EXTENSION IF NOT EXISTS hypopg WITH SCHEMA extensions;


--
-- TOC entry 4731 (class 0 OID 0)
-- Dependencies: 4
-- Name: EXTENSION hypopg; Type: COMMENT; Schema: -; Owner: 
--

COMMENT ON EXTENSION hypopg IS 'Hypothetical indexes for PostgreSQL';


--
-- TOC entry 3 (class 3079 OID 25486)
-- Name: index_advisor; Type: EXTENSION; Schema: -; Owner: -
--

CREATE EXTENSION IF NOT EXISTS index_advisor WITH SCHEMA extensions;


--
-- TOC entry 4732 (class 0 OID 0)
-- Dependencies: 3
-- Name: EXTENSION index_advisor; Type: COMMENT; Schema: -; Owner: 
--

COMMENT ON EXTENSION index_advisor IS 'Query index advisor';


--
-- TOC entry 9 (class 3079 OID 16643)
-- Name: pg_graphql; Type: EXTENSION; Schema: -; Owner: -
--

CREATE EXTENSION IF NOT EXISTS pg_graphql WITH SCHEMA graphql;


--
-- TOC entry 4733 (class 0 OID 0)
-- Dependencies: 9
-- Name: EXTENSION pg_graphql; Type: COMMENT; Schema: -; Owner: 
--

COMMENT ON EXTENSION pg_graphql IS 'pg_graphql: GraphQL support';


--
-- TOC entry 7 (class 3079 OID 16393)
-- Name: pg_stat_statements; Type: EXTENSION; Schema: -; Owner: -
--

CREATE EXTENSION IF NOT EXISTS pg_stat_statements WITH SCHEMA extensions;


--
-- TOC entry 4734 (class 0 OID 0)
-- Dependencies: 7
-- Name: EXTENSION pg_stat_statements; Type: COMMENT; Schema: -; Owner: 
--

COMMENT ON EXTENSION pg_stat_statements IS 'track planning and execution statistics of all SQL statements executed';


--
-- TOC entry 5 (class 3079 OID 16447)
-- Name: pgcrypto; Type: EXTENSION; Schema: -; Owner: -
--

CREATE EXTENSION IF NOT EXISTS pgcrypto WITH SCHEMA extensions;


--
-- TOC entry 4735 (class 0 OID 0)
-- Dependencies: 5
-- Name: EXTENSION pgcrypto; Type: COMMENT; Schema: -; Owner: 
--

COMMENT ON EXTENSION pgcrypto IS 'cryptographic functions';


--
-- TOC entry 10 (class 3079 OID 25743)
-- Name: pgjwt; Type: EXTENSION; Schema: -; Owner: -
--

CREATE EXTENSION IF NOT EXISTS pgjwt WITH SCHEMA pgjwt;


--
-- TOC entry 4736 (class 0 OID 0)
-- Dependencies: 10
-- Name: EXTENSION pgjwt; Type: COMMENT; Schema: -; Owner: 
--

COMMENT ON EXTENSION pgjwt IS 'JSON Web Token API for Postgresql';


--
-- TOC entry 8 (class 3079 OID 16608)
-- Name: supabase_vault; Type: EXTENSION; Schema: -; Owner: -
--

CREATE EXTENSION IF NOT EXISTS supabase_vault WITH SCHEMA vault;


--
-- TOC entry 4737 (class 0 OID 0)
-- Dependencies: 8
-- Name: EXTENSION supabase_vault; Type: COMMENT; Schema: -; Owner: 
--

COMMENT ON EXTENSION supabase_vault IS 'Supabase Vault Extension';


--
-- TOC entry 6 (class 3079 OID 16436)
-- Name: uuid-ossp; Type: EXTENSION; Schema: -; Owner: -
--

CREATE EXTENSION IF NOT EXISTS "uuid-ossp" WITH SCHEMA extensions;


--
-- TOC entry 4738 (class 0 OID 0)
-- Dependencies: 6
-- Name: EXTENSION "uuid-ossp"; Type: COMMENT; Schema: -; Owner: 
--

COMMENT ON EXTENSION "uuid-ossp" IS 'generate universally unique identifiers (UUIDs)';


--
-- TOC entry 1239 (class 1247 OID 16738)
-- Name: aal_level; Type: TYPE; Schema: auth; Owner: supabase_auth_admin
--

CREATE TYPE auth.aal_level AS ENUM (
    'aal1',
    'aal2',
    'aal3'
);


ALTER TYPE auth.aal_level OWNER TO supabase_auth_admin;

--
-- TOC entry 1263 (class 1247 OID 16879)
-- Name: code_challenge_method; Type: TYPE; Schema: auth; Owner: supabase_auth_admin
--

CREATE TYPE auth.code_challenge_method AS ENUM (
    's256',
    'plain'
);


ALTER TYPE auth.code_challenge_method OWNER TO supabase_auth_admin;

--
-- TOC entry 1236 (class 1247 OID 16732)
-- Name: factor_status; Type: TYPE; Schema: auth; Owner: supabase_auth_admin
--

CREATE TYPE auth.factor_status AS ENUM (
    'unverified',
    'verified'
);


ALTER TYPE auth.factor_status OWNER TO supabase_auth_admin;

--
-- TOC entry 1233 (class 1247 OID 16727)
-- Name: factor_type; Type: TYPE; Schema: auth; Owner: supabase_auth_admin
--

CREATE TYPE auth.factor_type AS ENUM (
    'totp',
    'webauthn',
    'phone'
);


ALTER TYPE auth.factor_type OWNER TO supabase_auth_admin;

--
-- TOC entry 1281 (class 1247 OID 16982)
-- Name: oauth_authorization_status; Type: TYPE; Schema: auth; Owner: supabase_auth_admin
--

CREATE TYPE auth.oauth_authorization_status AS ENUM (
    'pending',
    'approved',
    'denied',
    'expired'
);


ALTER TYPE auth.oauth_authorization_status OWNER TO supabase_auth_admin;

--
-- TOC entry 1293 (class 1247 OID 17055)
-- Name: oauth_client_type; Type: TYPE; Schema: auth; Owner: supabase_auth_admin
--

CREATE TYPE auth.oauth_client_type AS ENUM (
    'public',
    'confidential'
);


ALTER TYPE auth.oauth_client_type OWNER TO supabase_auth_admin;

--
-- TOC entry 1275 (class 1247 OID 16960)
-- Name: oauth_registration_type; Type: TYPE; Schema: auth; Owner: supabase_auth_admin
--

CREATE TYPE auth.oauth_registration_type AS ENUM (
    'dynamic',
    'manual'
);


ALTER TYPE auth.oauth_registration_type OWNER TO supabase_auth_admin;

--
-- TOC entry 1284 (class 1247 OID 16992)
-- Name: oauth_response_type; Type: TYPE; Schema: auth; Owner: supabase_auth_admin
--

CREATE TYPE auth.oauth_response_type AS ENUM (
    'code'
);


ALTER TYPE auth.oauth_response_type OWNER TO supabase_auth_admin;

--
-- TOC entry 1269 (class 1247 OID 16921)
-- Name: one_time_token_type; Type: TYPE; Schema: auth; Owner: supabase_auth_admin
--

CREATE TYPE auth.one_time_token_type AS ENUM (
    'confirmation_token',
    'reauthentication_token',
    'recovery_token',
    'email_change_token_new',
    'email_change_token_current',
    'phone_change_token'
);


ALTER TYPE auth.one_time_token_type OWNER TO supabase_auth_admin;

--
-- TOC entry 1362 (class 1247 OID 18191)
-- Name: app_role; Type: TYPE; Schema: public; Owner: postgres
--

CREATE TYPE public.app_role AS ENUM (
    'admin',
    'user'
);


ALTER TYPE public.app_role OWNER TO postgres;

--
-- TOC entry 1341 (class 1247 OID 17312)
-- Name: action; Type: TYPE; Schema: realtime; Owner: supabase_admin
--

CREATE TYPE realtime.action AS ENUM (
    'INSERT',
    'UPDATE',
    'DELETE',
    'TRUNCATE',
    'ERROR'
);


ALTER TYPE realtime.action OWNER TO supabase_admin;

--
-- TOC entry 1332 (class 1247 OID 17273)
-- Name: equality_op; Type: TYPE; Schema: realtime; Owner: supabase_admin
--

CREATE TYPE realtime.equality_op AS ENUM (
    'eq',
    'neq',
    'lt',
    'lte',
    'gt',
    'gte',
    'in'
);


ALTER TYPE realtime.equality_op OWNER TO supabase_admin;

--
-- TOC entry 1335 (class 1247 OID 17287)
-- Name: user_defined_filter; Type: TYPE; Schema: realtime; Owner: supabase_admin
--

CREATE TYPE realtime.user_defined_filter AS (
	column_name text,
	op realtime.equality_op,
	value text
);


ALTER TYPE realtime.user_defined_filter OWNER TO supabase_admin;

--
-- TOC entry 1347 (class 1247 OID 17354)
-- Name: wal_column; Type: TYPE; Schema: realtime; Owner: supabase_admin
--

CREATE TYPE realtime.wal_column AS (
	name text,
	type_name text,
	type_oid oid,
	value jsonb,
	is_pkey boolean,
	is_selectable boolean
);


ALTER TYPE realtime.wal_column OWNER TO supabase_admin;

--
-- TOC entry 1344 (class 1247 OID 17325)
-- Name: wal_rls; Type: TYPE; Schema: realtime; Owner: supabase_admin
--

CREATE TYPE realtime.wal_rls AS (
	wal jsonb,
	is_rls_enabled boolean,
	subscription_ids uuid[],
	errors text[]
);


ALTER TYPE realtime.wal_rls OWNER TO supabase_admin;

--
-- TOC entry 1317 (class 1247 OID 17200)
-- Name: buckettype; Type: TYPE; Schema: storage; Owner: supabase_storage_admin
--

CREATE TYPE storage.buckettype AS ENUM (
    'STANDARD',
    'ANALYTICS',
    'VECTOR'
);


ALTER TYPE storage.buckettype OWNER TO supabase_storage_admin;

--
-- TOC entry 580 (class 1255 OID 16544)
-- Name: email(); Type: FUNCTION; Schema: auth; Owner: supabase_auth_admin
--

CREATE FUNCTION auth.email() RETURNS text
    LANGUAGE sql STABLE
    AS $$
  select 
  coalesce(
    nullif(current_setting('request.jwt.claim.email', true), ''),
    (nullif(current_setting('request.jwt.claims', true), '')::jsonb ->> 'email')
  )::text
$$;


ALTER FUNCTION auth.email() OWNER TO supabase_auth_admin;

--
-- TOC entry 4739 (class 0 OID 0)
-- Dependencies: 580
-- Name: FUNCTION email(); Type: COMMENT; Schema: auth; Owner: supabase_auth_admin
--

COMMENT ON FUNCTION auth.email() IS 'Deprecated. Use auth.jwt() -> ''email'' instead.';


--
-- TOC entry 572 (class 1255 OID 16709)
-- Name: jwt(); Type: FUNCTION; Schema: auth; Owner: supabase_auth_admin
--

CREATE FUNCTION auth.jwt() RETURNS jsonb
    LANGUAGE sql STABLE
    AS $$
  select 
    coalesce(
        nullif(current_setting('request.jwt.claim', true), ''),
        nullif(current_setting('request.jwt.claims', true), '')
    )::jsonb
$$;


ALTER FUNCTION auth.jwt() OWNER TO supabase_auth_admin;

--
-- TOC entry 578 (class 1255 OID 16543)
-- Name: role(); Type: FUNCTION; Schema: auth; Owner: supabase_auth_admin
--

CREATE FUNCTION auth.role() RETURNS text
    LANGUAGE sql STABLE
    AS $$
  select 
  coalesce(
    nullif(current_setting('request.jwt.claim.role', true), ''),
    (nullif(current_setting('request.jwt.claims', true), '')::jsonb ->> 'role')
  )::text
$$;


ALTER FUNCTION auth.role() OWNER TO supabase_auth_admin;

--
-- TOC entry 4742 (class 0 OID 0)
-- Dependencies: 578
-- Name: FUNCTION role(); Type: COMMENT; Schema: auth; Owner: supabase_auth_admin
--

COMMENT ON FUNCTION auth.role() IS 'Deprecated. Use auth.jwt() -> ''role'' instead.';


--
-- TOC entry 584 (class 1255 OID 16542)
-- Name: uid(); Type: FUNCTION; Schema: auth; Owner: supabase_auth_admin
--

CREATE FUNCTION auth.uid() RETURNS uuid
    LANGUAGE sql STABLE
    AS $$
  select 
  coalesce(
    nullif(current_setting('request.jwt.claim.sub', true), ''),
    (nullif(current_setting('request.jwt.claims', true), '')::jsonb ->> 'sub')
  )::uuid
$$;


ALTER FUNCTION auth.uid() OWNER TO supabase_auth_admin;

--
-- TOC entry 4744 (class 0 OID 0)
-- Dependencies: 584
-- Name: FUNCTION uid(); Type: COMMENT; Schema: auth; Owner: supabase_auth_admin
--

COMMENT ON FUNCTION auth.uid() IS 'Deprecated. Use auth.jwt() -> ''sub'' instead.';


--
-- TOC entry 575 (class 1255 OID 16551)
-- Name: grant_pg_cron_access(); Type: FUNCTION; Schema: extensions; Owner: supabase_admin
--

CREATE FUNCTION extensions.grant_pg_cron_access() RETURNS event_trigger
    LANGUAGE plpgsql
    AS $$
BEGIN
  IF EXISTS (
    SELECT
    FROM pg_event_trigger_ddl_commands() AS ev
    JOIN pg_extension AS ext
    ON ev.objid = ext.oid
    WHERE ext.extname = 'pg_cron'
  )
  THEN
    grant usage on schema cron to postgres with grant option;

    alter default privileges in schema cron grant all on tables to postgres with grant option;
    alter default privileges in schema cron grant all on functions to postgres with grant option;
    alter default privileges in schema cron grant all on sequences to postgres with grant option;

    alter default privileges for user supabase_admin in schema cron grant all
        on sequences to postgres with grant option;
    alter default privileges for user supabase_admin in schema cron grant all
        on tables to postgres with grant option;
    alter default privileges for user supabase_admin in schema cron grant all
        on functions to postgres with grant option;

    grant all privileges on all tables in schema cron to postgres with grant option;
    revoke all on table cron.job from postgres;
    grant select on table cron.job to postgres with grant option;
  END IF;
END;
$$;


ALTER FUNCTION extensions.grant_pg_cron_access() OWNER TO supabase_admin;

--
-- TOC entry 4761 (class 0 OID 0)
-- Dependencies: 575
-- Name: FUNCTION grant_pg_cron_access(); Type: COMMENT; Schema: extensions; Owner: supabase_admin
--

COMMENT ON FUNCTION extensions.grant_pg_cron_access() IS 'Grants access to pg_cron';


--
-- TOC entry 512 (class 1255 OID 16572)
-- Name: grant_pg_graphql_access(); Type: FUNCTION; Schema: extensions; Owner: supabase_admin
--

CREATE FUNCTION extensions.grant_pg_graphql_access() RETURNS event_trigger
    LANGUAGE plpgsql
    AS $_$
DECLARE
    func_is_graphql_resolve bool;
BEGIN
    func_is_graphql_resolve = (
        SELECT n.proname = 'resolve'
        FROM pg_event_trigger_ddl_commands() AS ev
        LEFT JOIN pg_catalog.pg_proc AS n
        ON ev.objid = n.oid
    );

    IF func_is_graphql_resolve
    THEN
        -- Update public wrapper to pass all arguments through to the pg_graphql resolve func
        DROP FUNCTION IF EXISTS graphql_public.graphql;
        create or replace function graphql_public.graphql(
            "operationName" text default null,
            query text default null,
            variables jsonb default null,
            extensions jsonb default null
        )
            returns jsonb
            language sql
        as $$
            select graphql.resolve(
                query := query,
                variables := coalesce(variables, '{}'),
                "operationName" := "operationName",
                extensions := extensions
            );
        $$;

        -- This hook executes when `graphql.resolve` is created. That is not necessarily the last
        -- function in the extension so we need to grant permissions on existing entities AND
        -- update default permissions to any others that are created after `graphql.resolve`
        grant usage on schema graphql to postgres, anon, authenticated, service_role;
        grant select on all tables in schema graphql to postgres, anon, authenticated, service_role;
        grant execute on all functions in schema graphql to postgres, anon, authenticated, service_role;
        grant all on all sequences in schema graphql to postgres, anon, authenticated, service_role;
        alter default privileges in schema graphql grant all on tables to postgres, anon, authenticated, service_role;
        alter default privileges in schema graphql grant all on functions to postgres, anon, authenticated, service_role;
        alter default privileges in schema graphql grant all on sequences to postgres, anon, authenticated, service_role;

        -- Allow postgres role to allow granting usage on graphql and graphql_public schemas to custom roles
        grant usage on schema graphql_public to postgres with grant option;
        grant usage on schema graphql to postgres with grant option;
    END IF;

END;
$_$;


ALTER FUNCTION extensions.grant_pg_graphql_access() OWNER TO supabase_admin;

--
-- TOC entry 4763 (class 0 OID 0)
-- Dependencies: 512
-- Name: FUNCTION grant_pg_graphql_access(); Type: COMMENT; Schema: extensions; Owner: supabase_admin
--

COMMENT ON FUNCTION extensions.grant_pg_graphql_access() IS 'Grants access to pg_graphql';


--
-- TOC entry 480 (class 1255 OID 16553)
-- Name: grant_pg_net_access(); Type: FUNCTION; Schema: extensions; Owner: supabase_admin
--

CREATE FUNCTION extensions.grant_pg_net_access() RETURNS event_trigger
    LANGUAGE plpgsql
    AS $$
BEGIN
  IF EXISTS (
    SELECT 1
    FROM pg_event_trigger_ddl_commands() AS ev
    JOIN pg_extension AS ext
    ON ev.objid = ext.oid
    WHERE ext.extname = 'pg_net'
  )
  THEN
    IF NOT EXISTS (
      SELECT 1
      FROM pg_roles
      WHERE rolname = 'supabase_functions_admin'
    )
    THEN
      CREATE USER supabase_functions_admin NOINHERIT CREATEROLE LOGIN NOREPLICATION;
    END IF;

    GRANT USAGE ON SCHEMA net TO supabase_functions_admin, postgres, anon, authenticated, service_role;

    IF EXISTS (
      SELECT FROM pg_extension
      WHERE extname = 'pg_net'
      -- all versions in use on existing projects as of 2025-02-20
      -- version 0.12.0 onwards don't need these applied
      AND extversion IN ('0.2', '0.6', '0.7', '0.7.1', '0.8', '0.10.0', '0.11.0')
    ) THEN
      ALTER function net.http_get(url text, params jsonb, headers jsonb, timeout_milliseconds integer) SECURITY DEFINER;
      ALTER function net.http_post(url text, body jsonb, params jsonb, headers jsonb, timeout_milliseconds integer) SECURITY DEFINER;

      ALTER function net.http_get(url text, params jsonb, headers jsonb, timeout_milliseconds integer) SET search_path = net;
      ALTER function net.http_post(url text, body jsonb, params jsonb, headers jsonb, timeout_milliseconds integer) SET search_path = net;

      REVOKE ALL ON FUNCTION net.http_get(url text, params jsonb, headers jsonb, timeout_milliseconds integer) FROM PUBLIC;
      REVOKE ALL ON FUNCTION net.http_post(url text, body jsonb, params jsonb, headers jsonb, timeout_milliseconds integer) FROM PUBLIC;

      GRANT EXECUTE ON FUNCTION net.http_get(url text, params jsonb, headers jsonb, timeout_milliseconds integer) TO supabase_functions_admin, postgres, anon, authenticated, service_role;
      GRANT EXECUTE ON FUNCTION net.http_post(url text, body jsonb, params jsonb, headers jsonb, timeout_milliseconds integer) TO supabase_functions_admin, postgres, anon, authenticated, service_role;
    END IF;
  END IF;
END;
$$;


ALTER FUNCTION extensions.grant_pg_net_access() OWNER TO supabase_admin;

--
-- TOC entry 4765 (class 0 OID 0)
-- Dependencies: 480
-- Name: FUNCTION grant_pg_net_access(); Type: COMMENT; Schema: extensions; Owner: supabase_admin
--

COMMENT ON FUNCTION extensions.grant_pg_net_access() IS 'Grants access to pg_net';


--
-- TOC entry 443 (class 1255 OID 16563)
-- Name: pgrst_ddl_watch(); Type: FUNCTION; Schema: extensions; Owner: supabase_admin
--

CREATE FUNCTION extensions.pgrst_ddl_watch() RETURNS event_trigger
    LANGUAGE plpgsql
    AS $$
DECLARE
  cmd record;
BEGIN
  FOR cmd IN SELECT * FROM pg_event_trigger_ddl_commands()
  LOOP
    IF cmd.command_tag IN (
      'CREATE SCHEMA', 'ALTER SCHEMA'
    , 'CREATE TABLE', 'CREATE TABLE AS', 'SELECT INTO', 'ALTER TABLE'
    , 'CREATE FOREIGN TABLE', 'ALTER FOREIGN TABLE'
    , 'CREATE VIEW', 'ALTER VIEW'
    , 'CREATE MATERIALIZED VIEW', 'ALTER MATERIALIZED VIEW'
    , 'CREATE FUNCTION', 'ALTER FUNCTION'
    , 'CREATE TRIGGER'
    , 'CREATE TYPE', 'ALTER TYPE'
    , 'CREATE RULE'
    , 'COMMENT'
    )
    -- don't notify in case of CREATE TEMP table or other objects created on pg_temp
    AND cmd.schema_name is distinct from 'pg_temp'
    THEN
      NOTIFY pgrst, 'reload schema';
    END IF;
  END LOOP;
END; $$;


ALTER FUNCTION extensions.pgrst_ddl_watch() OWNER TO supabase_admin;

--
-- TOC entry 456 (class 1255 OID 16564)
-- Name: pgrst_drop_watch(); Type: FUNCTION; Schema: extensions; Owner: supabase_admin
--

CREATE FUNCTION extensions.pgrst_drop_watch() RETURNS event_trigger
    LANGUAGE plpgsql
    AS $$
DECLARE
  obj record;
BEGIN
  FOR obj IN SELECT * FROM pg_event_trigger_dropped_objects()
  LOOP
    IF obj.object_type IN (
      'schema'
    , 'table'
    , 'foreign table'
    , 'view'
    , 'materialized view'
    , 'function'
    , 'trigger'
    , 'type'
    , 'rule'
    )
    AND obj.is_temporary IS false -- no pg_temp objects
    THEN
      NOTIFY pgrst, 'reload schema';
    END IF;
  END LOOP;
END; $$;


ALTER FUNCTION extensions.pgrst_drop_watch() OWNER TO supabase_admin;

--
-- TOC entry 503 (class 1255 OID 16574)
-- Name: set_graphql_placeholder(); Type: FUNCTION; Schema: extensions; Owner: supabase_admin
--

CREATE FUNCTION extensions.set_graphql_placeholder() RETURNS event_trigger
    LANGUAGE plpgsql
    AS $_$
    DECLARE
    graphql_is_dropped bool;
    BEGIN
    graphql_is_dropped = (
        SELECT ev.schema_name = 'graphql_public'
        FROM pg_event_trigger_dropped_objects() AS ev
        WHERE ev.schema_name = 'graphql_public'
    );

    IF graphql_is_dropped
    THEN
        create or replace function graphql_public.graphql(
            "operationName" text default null,
            query text default null,
            variables jsonb default null,
            extensions jsonb default null
        )
            returns jsonb
            language plpgsql
        as $$
            DECLARE
                server_version float;
            BEGIN
                server_version = (SELECT (SPLIT_PART((select version()), ' ', 2))::float);

                IF server_version >= 14 THEN
                    RETURN jsonb_build_object(
                        'errors', jsonb_build_array(
                            jsonb_build_object(
                                'message', 'pg_graphql extension is not enabled.'
                            )
                        )
                    );
                ELSE
                    RETURN jsonb_build_object(
                        'errors', jsonb_build_array(
                            jsonb_build_object(
                                'message', 'pg_graphql is only available on projects running Postgres 14 onwards.'
                            )
                        )
                    );
                END IF;
            END;
        $$;
    END IF;

    END;
$_$;


ALTER FUNCTION extensions.set_graphql_placeholder() OWNER TO supabase_admin;

--
-- TOC entry 4820 (class 0 OID 0)
-- Dependencies: 503
-- Name: FUNCTION set_graphql_placeholder(); Type: COMMENT; Schema: extensions; Owner: supabase_admin
--

COMMENT ON FUNCTION extensions.set_graphql_placeholder() IS 'Reintroduces placeholder function for graphql_public.graphql';


--
-- TOC entry 458 (class 1255 OID 16391)
-- Name: get_auth(text); Type: FUNCTION; Schema: pgbouncer; Owner: supabase_admin
--

CREATE FUNCTION pgbouncer.get_auth(p_usename text) RETURNS TABLE(username text, password text)
    LANGUAGE plpgsql SECURITY DEFINER
    SET search_path TO ''
    AS $_$
  BEGIN
      RAISE DEBUG 'PgBouncer auth request: %', p_usename;

      RETURN QUERY
      SELECT
          rolname::text,
          CASE WHEN rolvaliduntil < now()
              THEN null
              ELSE rolpassword::text
          END
      FROM pg_authid
      WHERE rolname=$1 and rolcanlogin;
  END;
  $_$;


ALTER FUNCTION pgbouncer.get_auth(p_usename text) OWNER TO supabase_admin;

--
-- TOC entry 439 (class 1255 OID 18245)
-- Name: handle_updated_at(); Type: FUNCTION; Schema: public; Owner: postgres
--

CREATE FUNCTION public.handle_updated_at() RETURNS trigger
    LANGUAGE plpgsql
    AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$;


ALTER FUNCTION public.handle_updated_at() OWNER TO postgres;

--
-- TOC entry 434 (class 1255 OID 18220)
-- Name: has_role(uuid, public.app_role); Type: FUNCTION; Schema: public; Owner: postgres
--

CREATE FUNCTION public.has_role(_user_id uuid, _role public.app_role) RETURNS boolean
    LANGUAGE sql STABLE SECURITY DEFINER
    SET search_path TO 'public'
    AS $$
  SELECT EXISTS (
    SELECT 1
    FROM public.user_roles
    WHERE user_id = _user_id
      AND role = _role
  )
$$;


ALTER FUNCTION public.has_role(_user_id uuid, _role public.app_role) OWNER TO postgres;

--
-- TOC entry 487 (class 1255 OID 19524)
-- Name: rls_auto_enable(); Type: FUNCTION; Schema: public; Owner: postgres
--

CREATE FUNCTION public.rls_auto_enable() RETURNS event_trigger
    LANGUAGE plpgsql SECURITY DEFINER
    SET search_path TO 'pg_catalog'
    AS $$
DECLARE
  cmd record;
BEGIN
  FOR cmd IN
    SELECT *
    FROM pg_event_trigger_ddl_commands()
    WHERE command_tag IN ('CREATE TABLE', 'CREATE TABLE AS', 'SELECT INTO')
      AND object_type IN ('table','partitioned table')
  LOOP
     IF cmd.schema_name IS NOT NULL AND cmd.schema_name IN ('public') AND cmd.schema_name NOT IN ('pg_catalog','information_schema') AND cmd.schema_name NOT LIKE 'pg_toast%' AND cmd.schema_name NOT LIKE 'pg_temp%' THEN
      BEGIN
        EXECUTE format('alter table if exists %s enable row level security', cmd.object_identity);
        RAISE LOG 'rls_auto_enable: enabled RLS on %', cmd.object_identity;
      EXCEPTION
        WHEN OTHERS THEN
          RAISE LOG 'rls_auto_enable: failed to enable RLS on %', cmd.object_identity;
      END;
     ELSE
        RAISE LOG 'rls_auto_enable: skip % (either system schema or not in enforced list: %.)', cmd.object_identity, cmd.schema_name;
     END IF;
  END LOOP;
END;
$$;


ALTER FUNCTION public.rls_auto_enable() OWNER TO postgres;

--
-- TOC entry 469 (class 1255 OID 25669)
-- Name: set_booking_user_id(); Type: FUNCTION; Schema: public; Owner: postgres
--

CREATE FUNCTION public.set_booking_user_id() RETURNS trigger
    LANGUAGE plpgsql SECURITY DEFINER
    AS $$
BEGIN
  IF NEW.user_id IS NULL THEN
    NEW.user_id := (SELECT auth.uid());
  END IF;
  RETURN NEW;
END;
$$;


ALTER FUNCTION public.set_booking_user_id() OWNER TO postgres;

--
-- TOC entry 444 (class 1255 OID 25381)
-- Name: set_bookings_updated_at(); Type: FUNCTION; Schema: public; Owner: postgres
--

CREATE FUNCTION public.set_bookings_updated_at() RETURNS trigger
    LANGUAGE plpgsql
    AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$;


ALTER FUNCTION public.set_bookings_updated_at() OWNER TO postgres;

--
-- TOC entry 454 (class 1255 OID 25666)
-- Name: update_booking_notes(uuid, text); Type: FUNCTION; Schema: public; Owner: postgres
--

CREATE FUNCTION public.update_booking_notes(p_booking_id uuid, p_notes text) RETURNS void
    LANGUAGE plpgsql
    AS $$BEGIN
  -- Ensure caller is the booking owner
  IF (SELECT auth.uid()) IS NULL OR (SELECT auth.uid())::uuid <> (
    SELECT uuid FROM public.bookings WHERE id = p_booking_id
  ) THEN
    RAISE EXCEPTION 'allow all not the booking owner';
  END IF;

  UPDATE public.bookings
  SET internal_notes = p_notes,
      updated_at = now()
  WHERE id = p_booking_id;
END;$$;


ALTER FUNCTION public.update_booking_notes(p_booking_id uuid, p_notes text) OWNER TO postgres;

--
-- TOC entry 446 (class 1255 OID 25259)
-- Name: update_updated_at_column(); Type: FUNCTION; Schema: public; Owner: postgres
--

CREATE FUNCTION public.update_updated_at_column() RETURNS trigger
    LANGUAGE plpgsql
    AS $$
begin
  new.updated_at = now();
  return new;
end;
$$;


ALTER FUNCTION public.update_updated_at_column() OWNER TO postgres;

--
-- TOC entry 470 (class 1255 OID 17347)
-- Name: apply_rls(jsonb, integer); Type: FUNCTION; Schema: realtime; Owner: supabase_admin
--

CREATE FUNCTION realtime.apply_rls(wal jsonb, max_record_bytes integer DEFAULT (1024 * 1024)) RETURNS SETOF realtime.wal_rls
    LANGUAGE plpgsql
    AS $$
declare
-- Regclass of the table e.g. public.notes
entity_ regclass = (quote_ident(wal ->> 'schema') || '.' || quote_ident(wal ->> 'table'))::regclass;

-- I, U, D, T: insert, update ...
action realtime.action = (
    case wal ->> 'action'
        when 'I' then 'INSERT'
        when 'U' then 'UPDATE'
        when 'D' then 'DELETE'
        else 'ERROR'
    end
);

-- Is row level security enabled for the table
is_rls_enabled bool = relrowsecurity from pg_class where oid = entity_;

subscriptions realtime.subscription[] = array_agg(subs)
    from
        realtime.subscription subs
    where
        subs.entity = entity_
        -- Filter by action early - only get subscriptions interested in this action
        -- action_filter column can be: '*' (all), 'INSERT', 'UPDATE', or 'DELETE'
        and (subs.action_filter = '*' or subs.action_filter = action::text);

-- Subscription vars
roles regrole[] = array_agg(distinct us.claims_role::text)
    from
        unnest(subscriptions) us;

working_role regrole;
claimed_role regrole;
claims jsonb;

subscription_id uuid;
subscription_has_access bool;
visible_to_subscription_ids uuid[] = '{}';

-- structured info for wal's columns
columns realtime.wal_column[];
-- previous identity values for update/delete
old_columns realtime.wal_column[];

error_record_exceeds_max_size boolean = octet_length(wal::text) > max_record_bytes;

-- Primary jsonb output for record
output jsonb;

begin
perform set_config('role', null, true);

columns =
    array_agg(
        (
            x->>'name',
            x->>'type',
            x->>'typeoid',
            realtime.cast(
                (x->'value') #>> '{}',
                coalesce(
                    (x->>'typeoid')::regtype, -- null when wal2json version <= 2.4
                    (x->>'type')::regtype
                )
            ),
            (pks ->> 'name') is not null,
            true
        )::realtime.wal_column
    )
    from
        jsonb_array_elements(wal -> 'columns') x
        left join jsonb_array_elements(wal -> 'pk') pks
            on (x ->> 'name') = (pks ->> 'name');

old_columns =
    array_agg(
        (
            x->>'name',
            x->>'type',
            x->>'typeoid',
            realtime.cast(
                (x->'value') #>> '{}',
                coalesce(
                    (x->>'typeoid')::regtype, -- null when wal2json version <= 2.4
                    (x->>'type')::regtype
                )
            ),
            (pks ->> 'name') is not null,
            true
        )::realtime.wal_column
    )
    from
        jsonb_array_elements(wal -> 'identity') x
        left join jsonb_array_elements(wal -> 'pk') pks
            on (x ->> 'name') = (pks ->> 'name');

for working_role in select * from unnest(roles) loop

    -- Update `is_selectable` for columns and old_columns
    columns =
        array_agg(
            (
                c.name,
                c.type_name,
                c.type_oid,
                c.value,
                c.is_pkey,
                pg_catalog.has_column_privilege(working_role, entity_, c.name, 'SELECT')
            )::realtime.wal_column
        )
        from
            unnest(columns) c;

    old_columns =
            array_agg(
                (
                    c.name,
                    c.type_name,
                    c.type_oid,
                    c.value,
                    c.is_pkey,
                    pg_catalog.has_column_privilege(working_role, entity_, c.name, 'SELECT')
                )::realtime.wal_column
            )
            from
                unnest(old_columns) c;

    if action <> 'DELETE' and count(1) = 0 from unnest(columns) c where c.is_pkey then
        return next (
            jsonb_build_object(
                'schema', wal ->> 'schema',
                'table', wal ->> 'table',
                'type', action
            ),
            is_rls_enabled,
            -- subscriptions is already filtered by entity
            (select array_agg(s.subscription_id) from unnest(subscriptions) as s where claims_role = working_role),
            array['Error 400: Bad Request, no primary key']
        )::realtime.wal_rls;

    -- The claims role does not have SELECT permission to the primary key of entity
    elsif action <> 'DELETE' and sum(c.is_selectable::int) <> count(1) from unnest(columns) c where c.is_pkey then
        return next (
            jsonb_build_object(
                'schema', wal ->> 'schema',
                'table', wal ->> 'table',
                'type', action
            ),
            is_rls_enabled,
            (select array_agg(s.subscription_id) from unnest(subscriptions) as s where claims_role = working_role),
            array['Error 401: Unauthorized']
        )::realtime.wal_rls;

    else
        output = jsonb_build_object(
            'schema', wal ->> 'schema',
            'table', wal ->> 'table',
            'type', action,
            'commit_timestamp', to_char(
                ((wal ->> 'timestamp')::timestamptz at time zone 'utc'),
                'YYYY-MM-DD"T"HH24:MI:SS.MS"Z"'
            ),
            'columns', (
                select
                    jsonb_agg(
                        jsonb_build_object(
                            'name', pa.attname,
                            'type', pt.typname
                        )
                        order by pa.attnum asc
                    )
                from
                    pg_attribute pa
                    join pg_type pt
                        on pa.atttypid = pt.oid
                where
                    attrelid = entity_
                    and attnum > 0
                    and pg_catalog.has_column_privilege(working_role, entity_, pa.attname, 'SELECT')
            )
        )
        -- Add "record" key for insert and update
        || case
            when action in ('INSERT', 'UPDATE') then
                jsonb_build_object(
                    'record',
                    (
                        select
                            jsonb_object_agg(
                                -- if unchanged toast, get column name and value from old record
                                coalesce((c).name, (oc).name),
                                case
                                    when (c).name is null then (oc).value
                                    else (c).value
                                end
                            )
                        from
                            unnest(columns) c
                            full outer join unnest(old_columns) oc
                                on (c).name = (oc).name
                        where
                            coalesce((c).is_selectable, (oc).is_selectable)
                            and ( not error_record_exceeds_max_size or (octet_length((c).value::text) <= 64))
                    )
                )
            else '{}'::jsonb
        end
        -- Add "old_record" key for update and delete
        || case
            when action = 'UPDATE' then
                jsonb_build_object(
                        'old_record',
                        (
                            select jsonb_object_agg((c).name, (c).value)
                            from unnest(old_columns) c
                            where
                                (c).is_selectable
                                and ( not error_record_exceeds_max_size or (octet_length((c).value::text) <= 64))
                        )
                    )
            when action = 'DELETE' then
                jsonb_build_object(
                    'old_record',
                    (
                        select jsonb_object_agg((c).name, (c).value)
                        from unnest(old_columns) c
                        where
                            (c).is_selectable
                            and ( not error_record_exceeds_max_size or (octet_length((c).value::text) <= 64))
                            and ( not is_rls_enabled or (c).is_pkey ) -- if RLS enabled, we can't secure deletes so filter to pkey
                    )
                )
            else '{}'::jsonb
        end;

        -- Create the prepared statement
        if is_rls_enabled and action <> 'DELETE' then
            if (select 1 from pg_prepared_statements where name = 'walrus_rls_stmt' limit 1) > 0 then
                deallocate walrus_rls_stmt;
            end if;
            execute realtime.build_prepared_statement_sql('walrus_rls_stmt', entity_, columns);
        end if;

        visible_to_subscription_ids = '{}';

        for subscription_id, claims in (
                select
                    subs.subscription_id,
                    subs.claims
                from
                    unnest(subscriptions) subs
                where
                    subs.entity = entity_
                    and subs.claims_role = working_role
                    and (
                        realtime.is_visible_through_filters(columns, subs.filters)
                        or (
                          action = 'DELETE'
                          and realtime.is_visible_through_filters(old_columns, subs.filters)
                        )
                    )
        ) loop

            if not is_rls_enabled or action = 'DELETE' then
                visible_to_subscription_ids = visible_to_subscription_ids || subscription_id;
            else
                -- Check if RLS allows the role to see the record
                perform
                    -- Trim leading and trailing quotes from working_role because set_config
                    -- doesn't recognize the role as valid if they are included
                    set_config('role', trim(both '"' from working_role::text), true),
                    set_config('request.jwt.claims', claims::text, true);

                execute 'execute walrus_rls_stmt' into subscription_has_access;

                if subscription_has_access then
                    visible_to_subscription_ids = visible_to_subscription_ids || subscription_id;
                end if;
            end if;
        end loop;

        perform set_config('role', null, true);

        return next (
            output,
            is_rls_enabled,
            visible_to_subscription_ids,
            case
                when error_record_exceeds_max_size then array['Error 413: Payload Too Large']
                else '{}'
            end
        )::realtime.wal_rls;

    end if;
end loop;

perform set_config('role', null, true);
end;
$$;


ALTER FUNCTION realtime.apply_rls(wal jsonb, max_record_bytes integer) OWNER TO supabase_admin;

--
-- TOC entry 577 (class 1255 OID 17426)
-- Name: broadcast_changes(text, text, text, text, text, record, record, text); Type: FUNCTION; Schema: realtime; Owner: supabase_admin
--

CREATE FUNCTION realtime.broadcast_changes(topic_name text, event_name text, operation text, table_name text, table_schema text, new record, old record, level text DEFAULT 'ROW'::text) RETURNS void
    LANGUAGE plpgsql
    AS $$
DECLARE
    -- Declare a variable to hold the JSONB representation of the row
    row_data jsonb := '{}'::jsonb;
BEGIN
    IF level = 'STATEMENT' THEN
        RAISE EXCEPTION 'function can only be triggered for each row, not for each statement';
    END IF;
    -- Check the operation type and handle accordingly
    IF operation = 'INSERT' OR operation = 'UPDATE' OR operation = 'DELETE' THEN
        row_data := jsonb_build_object('old_record', OLD, 'record', NEW, 'operation', operation, 'table', table_name, 'schema', table_schema);
        PERFORM realtime.send (row_data, event_name, topic_name);
    ELSE
        RAISE EXCEPTION 'Unexpected operation type: %', operation;
    END IF;
EXCEPTION
    WHEN OTHERS THEN
        RAISE EXCEPTION 'Failed to process the row: %', SQLERRM;
END;

$$;


ALTER FUNCTION realtime.broadcast_changes(topic_name text, event_name text, operation text, table_name text, table_schema text, new record, old record, level text) OWNER TO supabase_admin;

--
-- TOC entry 545 (class 1255 OID 17359)
-- Name: build_prepared_statement_sql(text, regclass, realtime.wal_column[]); Type: FUNCTION; Schema: realtime; Owner: supabase_admin
--

CREATE FUNCTION realtime.build_prepared_statement_sql(prepared_statement_name text, entity regclass, columns realtime.wal_column[]) RETURNS text
    LANGUAGE sql
    AS $$
      /*
      Builds a sql string that, if executed, creates a prepared statement to
      tests retrive a row from *entity* by its primary key columns.
      Example
          select realtime.build_prepared_statement_sql('public.notes', '{"id"}'::text[], '{"bigint"}'::text[])
      */
          select
      'prepare ' || prepared_statement_name || ' as
          select
              exists(
                  select
                      1
                  from
                      ' || entity || '
                  where
                      ' || string_agg(quote_ident(pkc.name) || '=' || quote_nullable(pkc.value #>> '{}') , ' and ') || '
              )'
          from
              unnest(columns) pkc
          where
              pkc.is_pkey
          group by
              entity
      $$;


ALTER FUNCTION realtime.build_prepared_statement_sql(prepared_statement_name text, entity regclass, columns realtime.wal_column[]) OWNER TO supabase_admin;

--
-- TOC entry 459 (class 1255 OID 17309)
-- Name: cast(text, regtype); Type: FUNCTION; Schema: realtime; Owner: supabase_admin
--

CREATE FUNCTION realtime."cast"(val text, type_ regtype) RETURNS jsonb
    LANGUAGE plpgsql IMMUTABLE
    AS $$
declare
  res jsonb;
begin
  if type_::text = 'bytea' then
    return to_jsonb(val);
  end if;
  execute format('select to_jsonb(%L::'|| type_::text || ')', val) into res;
  return res;
end
$$;


ALTER FUNCTION realtime."cast"(val text, type_ regtype) OWNER TO supabase_admin;

--
-- TOC entry 494 (class 1255 OID 17304)
-- Name: check_equality_op(realtime.equality_op, regtype, text, text); Type: FUNCTION; Schema: realtime; Owner: supabase_admin
--

CREATE FUNCTION realtime.check_equality_op(op realtime.equality_op, type_ regtype, val_1 text, val_2 text) RETURNS boolean
    LANGUAGE plpgsql IMMUTABLE
    AS $$
      /*
      Casts *val_1* and *val_2* as type *type_* and check the *op* condition for truthiness
      */
      declare
          op_symbol text = (
              case
                  when op = 'eq' then '='
                  when op = 'neq' then '!='
                  when op = 'lt' then '<'
                  when op = 'lte' then '<='
                  when op = 'gt' then '>'
                  when op = 'gte' then '>='
                  when op = 'in' then '= any'
                  else 'UNKNOWN OP'
              end
          );
          res boolean;
      begin
          execute format(
              'select %L::'|| type_::text || ' ' || op_symbol
              || ' ( %L::'
              || (
                  case
                      when op = 'in' then type_::text || '[]'
                      else type_::text end
              )
              || ')', val_1, val_2) into res;
          return res;
      end;
      $$;


ALTER FUNCTION realtime.check_equality_op(op realtime.equality_op, type_ regtype, val_1 text, val_2 text) OWNER TO supabase_admin;

--
-- TOC entry 526 (class 1255 OID 17355)
-- Name: is_visible_through_filters(realtime.wal_column[], realtime.user_defined_filter[]); Type: FUNCTION; Schema: realtime; Owner: supabase_admin
--

CREATE FUNCTION realtime.is_visible_through_filters(columns realtime.wal_column[], filters realtime.user_defined_filter[]) RETURNS boolean
    LANGUAGE sql IMMUTABLE
    AS $_$
    /*
    Should the record be visible (true) or filtered out (false) after *filters* are applied
    */
        select
            -- Default to allowed when no filters present
            $2 is null -- no filters. this should not happen because subscriptions has a default
            or array_length($2, 1) is null -- array length of an empty array is null
            or bool_and(
                coalesce(
                    realtime.check_equality_op(
                        op:=f.op,
                        type_:=coalesce(
                            col.type_oid::regtype, -- null when wal2json version <= 2.4
                            col.type_name::regtype
                        ),
                        -- cast jsonb to text
                        val_1:=col.value #>> '{}',
                        val_2:=f.value
                    ),
                    false -- if null, filter does not match
                )
            )
        from
            unnest(filters) f
            join unnest(columns) col
                on f.column_name = col.name;
    $_$;


ALTER FUNCTION realtime.is_visible_through_filters(columns realtime.wal_column[], filters realtime.user_defined_filter[]) OWNER TO supabase_admin;

--
-- TOC entry 485 (class 1255 OID 17366)
-- Name: list_changes(name, name, integer, integer); Type: FUNCTION; Schema: realtime; Owner: supabase_admin
--

CREATE FUNCTION realtime.list_changes(publication name, slot_name name, max_changes integer, max_record_bytes integer) RETURNS SETOF realtime.wal_rls
    LANGUAGE sql
    SET log_min_messages TO 'fatal'
    AS $$
      with pub as (
        select
          concat_ws(
            ',',
            case when bool_or(pubinsert) then 'insert' else null end,
            case when bool_or(pubupdate) then 'update' else null end,
            case when bool_or(pubdelete) then 'delete' else null end
          ) as w2j_actions,
          coalesce(
            string_agg(
              realtime.quote_wal2json(format('%I.%I', schemaname, tablename)::regclass),
              ','
            ) filter (where ppt.tablename is not null and ppt.tablename not like '% %'),
            ''
          ) w2j_add_tables
        from
          pg_publication pp
          left join pg_publication_tables ppt
            on pp.pubname = ppt.pubname
        where
          pp.pubname = publication
        group by
          pp.pubname
        limit 1
      ),
      w2j as (
        select
          x.*, pub.w2j_add_tables
        from
          pub,
          pg_logical_slot_get_changes(
            slot_name, null, max_changes,
            'include-pk', 'true',
            'include-transaction', 'false',
            'include-timestamp', 'true',
            'include-type-oids', 'true',
            'format-version', '2',
            'actions', pub.w2j_actions,
            'add-tables', pub.w2j_add_tables
          ) x
      )
      select
        xyz.wal,
        xyz.is_rls_enabled,
        xyz.subscription_ids,
        xyz.errors
      from
        w2j,
        realtime.apply_rls(
          wal := w2j.data::jsonb,
          max_record_bytes := max_record_bytes
        ) xyz(wal, is_rls_enabled, subscription_ids, errors)
      where
        w2j.w2j_add_tables <> ''
        and xyz.subscription_ids[1] is not null
    $$;


ALTER FUNCTION realtime.list_changes(publication name, slot_name name, max_changes integer, max_record_bytes integer) OWNER TO supabase_admin;

--
-- TOC entry 556 (class 1255 OID 17303)
-- Name: quote_wal2json(regclass); Type: FUNCTION; Schema: realtime; Owner: supabase_admin
--

CREATE FUNCTION realtime.quote_wal2json(entity regclass) RETURNS text
    LANGUAGE sql IMMUTABLE STRICT
    AS $$
      select
        (
          select string_agg('' || ch,'')
          from unnest(string_to_array(nsp.nspname::text, null)) with ordinality x(ch, idx)
          where
            not (x.idx = 1 and x.ch = '"')
            and not (
              x.idx = array_length(string_to_array(nsp.nspname::text, null), 1)
              and x.ch = '"'
            )
        )
        || '.'
        || (
          select string_agg('' || ch,'')
          from unnest(string_to_array(pc.relname::text, null)) with ordinality x(ch, idx)
          where
            not (x.idx = 1 and x.ch = '"')
            and not (
              x.idx = array_length(string_to_array(nsp.nspname::text, null), 1)
              and x.ch = '"'
            )
          )
      from
        pg_class pc
        join pg_namespace nsp
          on pc.relnamespace = nsp.oid
      where
        pc.oid = entity
    $$;


ALTER FUNCTION realtime.quote_wal2json(entity regclass) OWNER TO supabase_admin;

--
-- TOC entry 544 (class 1255 OID 17425)
-- Name: send(jsonb, text, text, boolean); Type: FUNCTION; Schema: realtime; Owner: supabase_admin
--

CREATE FUNCTION realtime.send(payload jsonb, event text, topic text, private boolean DEFAULT true) RETURNS void
    LANGUAGE plpgsql
    AS $$
DECLARE
  generated_id uuid;
  final_payload jsonb;
BEGIN
  BEGIN
    -- Generate a new UUID for the id
    generated_id := gen_random_uuid();

    -- Check if payload has an 'id' key, if not, add the generated UUID
    IF payload ? 'id' THEN
      final_payload := payload;
    ELSE
      final_payload := jsonb_set(payload, '{id}', to_jsonb(generated_id));
    END IF;

    -- Set the topic configuration
    EXECUTE format('SET LOCAL realtime.topic TO %L', topic);

    -- Attempt to insert the message
    INSERT INTO realtime.messages (id, payload, event, topic, private, extension)
    VALUES (generated_id, final_payload, event, topic, private, 'broadcast');
  EXCEPTION
    WHEN OTHERS THEN
      -- Capture and notify the error
      RAISE WARNING 'ErrorSendingBroadcastMessage: %', SQLERRM;
  END;
END;
$$;


ALTER FUNCTION realtime.send(payload jsonb, event text, topic text, private boolean) OWNER TO supabase_admin;

--
-- TOC entry 517 (class 1255 OID 17301)
-- Name: subscription_check_filters(); Type: FUNCTION; Schema: realtime; Owner: supabase_admin
--

CREATE FUNCTION realtime.subscription_check_filters() RETURNS trigger
    LANGUAGE plpgsql
    AS $$
    /*
    Validates that the user defined filters for a subscription:
    - refer to valid columns that the claimed role may access
    - values are coercable to the correct column type
    */
    declare
        col_names text[] = coalesce(
                array_agg(c.column_name order by c.ordinal_position),
                '{}'::text[]
            )
            from
                information_schema.columns c
            where
                format('%I.%I', c.table_schema, c.table_name)::regclass = new.entity
                and pg_catalog.has_column_privilege(
                    (new.claims ->> 'role'),
                    format('%I.%I', c.table_schema, c.table_name)::regclass,
                    c.column_name,
                    'SELECT'
                );
        filter realtime.user_defined_filter;
        col_type regtype;

        in_val jsonb;
    begin
        for filter in select * from unnest(new.filters) loop
            -- Filtered column is valid
            if not filter.column_name = any(col_names) then
                raise exception 'invalid column for filter %', filter.column_name;
            end if;

            -- Type is sanitized and safe for string interpolation
            col_type = (
                select atttypid::regtype
                from pg_catalog.pg_attribute
                where attrelid = new.entity
                      and attname = filter.column_name
            );
            if col_type is null then
                raise exception 'failed to lookup type for column %', filter.column_name;
            end if;

            -- Set maximum number of entries for in filter
            if filter.op = 'in'::realtime.equality_op then
                in_val = realtime.cast(filter.value, (col_type::text || '[]')::regtype);
                if coalesce(jsonb_array_length(in_val), 0) > 100 then
                    raise exception 'too many values for `in` filter. Maximum 100';
                end if;
            else
                -- raises an exception if value is not coercable to type
                perform realtime.cast(filter.value, col_type);
            end if;

        end loop;

        -- Apply consistent order to filters so the unique constraint on
        -- (subscription_id, entity, filters) can't be tricked by a different filter order
        new.filters = coalesce(
            array_agg(f order by f.column_name, f.op, f.value),
            '{}'
        ) from unnest(new.filters) f;

        return new;
    end;
    $$;


ALTER FUNCTION realtime.subscription_check_filters() OWNER TO supabase_admin;

--
-- TOC entry 507 (class 1255 OID 17336)
-- Name: to_regrole(text); Type: FUNCTION; Schema: realtime; Owner: supabase_admin
--

CREATE FUNCTION realtime.to_regrole(role_name text) RETURNS regrole
    LANGUAGE sql IMMUTABLE
    AS $$ select role_name::regrole $$;


ALTER FUNCTION realtime.to_regrole(role_name text) OWNER TO supabase_admin;

--
-- TOC entry 518 (class 1255 OID 17419)
-- Name: topic(); Type: FUNCTION; Schema: realtime; Owner: supabase_realtime_admin
--

CREATE FUNCTION realtime.topic() RETURNS text
    LANGUAGE sql STABLE
    AS $$
select nullif(current_setting('realtime.topic', true), '')::text;
$$;


ALTER FUNCTION realtime.topic() OWNER TO supabase_realtime_admin;

--
-- TOC entry 535 (class 1255 OID 17141)
-- Name: can_insert_object(text, text, uuid, jsonb); Type: FUNCTION; Schema: storage; Owner: supabase_storage_admin
--

CREATE FUNCTION storage.can_insert_object(bucketid text, name text, owner uuid, metadata jsonb) RETURNS void
    LANGUAGE plpgsql
    AS $$
BEGIN
  INSERT INTO "storage"."objects" ("bucket_id", "name", "owner", "metadata") VALUES (bucketid, name, owner, metadata);
  -- hack to rollback the successful insert
  RAISE sqlstate 'PT200' using
  message = 'ROLLBACK',
  detail = 'rollback successful insert';
END
$$;


ALTER FUNCTION storage.can_insert_object(bucketid text, name text, owner uuid, metadata jsonb) OWNER TO supabase_storage_admin;

--
-- TOC entry 574 (class 1255 OID 17197)
-- Name: enforce_bucket_name_length(); Type: FUNCTION; Schema: storage; Owner: supabase_storage_admin
--

CREATE FUNCTION storage.enforce_bucket_name_length() RETURNS trigger
    LANGUAGE plpgsql
    AS $$
begin
    if length(new.name) > 100 then
        raise exception 'bucket name "%" is too long (% characters). Max is 100.', new.name, length(new.name);
    end if;
    return new;
end;
$$;


ALTER FUNCTION storage.enforce_bucket_name_length() OWNER TO supabase_storage_admin;

--
-- TOC entry 433 (class 1255 OID 17116)
-- Name: extension(text); Type: FUNCTION; Schema: storage; Owner: supabase_storage_admin
--

CREATE FUNCTION storage.extension(name text) RETURNS text
    LANGUAGE plpgsql
    AS $$
DECLARE
_parts text[];
_filename text;
BEGIN
	select string_to_array(name, '/') into _parts;
	select _parts[array_length(_parts,1)] into _filename;
	-- @todo return the last part instead of 2
	return reverse(split_part(reverse(_filename), '.', 1));
END
$$;


ALTER FUNCTION storage.extension(name text) OWNER TO supabase_storage_admin;

--
-- TOC entry 524 (class 1255 OID 17115)
-- Name: filename(text); Type: FUNCTION; Schema: storage; Owner: supabase_storage_admin
--

CREATE FUNCTION storage.filename(name text) RETURNS text
    LANGUAGE plpgsql
    AS $$
DECLARE
_parts text[];
BEGIN
	select string_to_array(name, '/') into _parts;
	return _parts[array_length(_parts,1)];
END
$$;


ALTER FUNCTION storage.filename(name text) OWNER TO supabase_storage_admin;

--
-- TOC entry 555 (class 1255 OID 17114)
-- Name: foldername(text); Type: FUNCTION; Schema: storage; Owner: supabase_storage_admin
--

CREATE FUNCTION storage.foldername(name text) RETURNS text[]
    LANGUAGE plpgsql
    AS $$
DECLARE
_parts text[];
BEGIN
	select string_to_array(name, '/') into _parts;
	return _parts[1:array_length(_parts,1)-1];
END
$$;


ALTER FUNCTION storage.foldername(name text) OWNER TO supabase_storage_admin;

--
-- TOC entry 504 (class 1255 OID 17254)
-- Name: get_common_prefix(text, text, text); Type: FUNCTION; Schema: storage; Owner: supabase_storage_admin
--

CREATE FUNCTION storage.get_common_prefix(p_key text, p_prefix text, p_delimiter text) RETURNS text
    LANGUAGE sql IMMUTABLE
    AS $$
SELECT CASE
    WHEN position(p_delimiter IN substring(p_key FROM length(p_prefix) + 1)) > 0
    THEN left(p_key, length(p_prefix) + position(p_delimiter IN substring(p_key FROM length(p_prefix) + 1)))
    ELSE NULL
END;
$$;


ALTER FUNCTION storage.get_common_prefix(p_key text, p_prefix text, p_delimiter text) OWNER TO supabase_storage_admin;

--
-- TOC entry 462 (class 1255 OID 17128)
-- Name: get_size_by_bucket(); Type: FUNCTION; Schema: storage; Owner: supabase_storage_admin
--

CREATE FUNCTION storage.get_size_by_bucket() RETURNS TABLE(size bigint, bucket_id text)
    LANGUAGE plpgsql
    AS $$
BEGIN
    return query
        select sum((metadata->>'size')::int) as size, obj.bucket_id
        from "storage".objects as obj
        group by obj.bucket_id;
END
$$;


ALTER FUNCTION storage.get_size_by_bucket() OWNER TO supabase_storage_admin;

--
-- TOC entry 467 (class 1255 OID 17180)
-- Name: list_multipart_uploads_with_delimiter(text, text, text, integer, text, text); Type: FUNCTION; Schema: storage; Owner: supabase_storage_admin
--

CREATE FUNCTION storage.list_multipart_uploads_with_delimiter(bucket_id text, prefix_param text, delimiter_param text, max_keys integer DEFAULT 100, next_key_token text DEFAULT ''::text, next_upload_token text DEFAULT ''::text) RETURNS TABLE(key text, id text, created_at timestamp with time zone)
    LANGUAGE plpgsql
    AS $_$
BEGIN
    RETURN QUERY EXECUTE
        'SELECT DISTINCT ON(key COLLATE "C") * from (
            SELECT
                CASE
                    WHEN position($2 IN substring(key from length($1) + 1)) > 0 THEN
                        substring(key from 1 for length($1) + position($2 IN substring(key from length($1) + 1)))
                    ELSE
                        key
                END AS key, id, created_at
            FROM
                storage.s3_multipart_uploads
            WHERE
                bucket_id = $5 AND
                key ILIKE $1 || ''%'' AND
                CASE
                    WHEN $4 != '''' AND $6 = '''' THEN
                        CASE
                            WHEN position($2 IN substring(key from length($1) + 1)) > 0 THEN
                                substring(key from 1 for length($1) + position($2 IN substring(key from length($1) + 1))) COLLATE "C" > $4
                            ELSE
                                key COLLATE "C" > $4
                            END
                    ELSE
                        true
                END AND
                CASE
                    WHEN $6 != '''' THEN
                        id COLLATE "C" > $6
                    ELSE
                        true
                    END
            ORDER BY
                key COLLATE "C" ASC, created_at ASC) as e order by key COLLATE "C" LIMIT $3'
        USING prefix_param, delimiter_param, max_keys, next_key_token, bucket_id, next_upload_token;
END;
$_$;


ALTER FUNCTION storage.list_multipart_uploads_with_delimiter(bucket_id text, prefix_param text, delimiter_param text, max_keys integer, next_key_token text, next_upload_token text) OWNER TO supabase_storage_admin;

--
-- TOC entry 497 (class 1255 OID 17255)
-- Name: list_objects_with_delimiter(text, text, text, integer, text, text, text); Type: FUNCTION; Schema: storage; Owner: supabase_storage_admin
--

CREATE FUNCTION storage.list_objects_with_delimiter(_bucket_id text, prefix_param text, delimiter_param text, max_keys integer DEFAULT 100, start_after text DEFAULT ''::text, next_token text DEFAULT ''::text, sort_order text DEFAULT 'asc'::text) RETURNS TABLE(name text, id uuid, metadata jsonb, updated_at timestamp with time zone, created_at timestamp with time zone, last_accessed_at timestamp with time zone)
    LANGUAGE plpgsql STABLE
    AS $_$
DECLARE
    v_peek_name TEXT;
    v_current RECORD;
    v_common_prefix TEXT;

    -- Configuration
    v_is_asc BOOLEAN;
    v_prefix TEXT;
    v_start TEXT;
    v_upper_bound TEXT;
    v_file_batch_size INT;

    -- Seek state
    v_next_seek TEXT;
    v_count INT := 0;

    -- Dynamic SQL for batch query only
    v_batch_query TEXT;

BEGIN
    -- ========================================================================
    -- INITIALIZATION
    -- ========================================================================
    v_is_asc := lower(coalesce(sort_order, 'asc')) = 'asc';
    v_prefix := coalesce(prefix_param, '');
    v_start := CASE WHEN coalesce(next_token, '') <> '' THEN next_token ELSE coalesce(start_after, '') END;
    v_file_batch_size := LEAST(GREATEST(max_keys * 2, 100), 1000);

    -- Calculate upper bound for prefix filtering (bytewise, using COLLATE "C")
    IF v_prefix = '' THEN
        v_upper_bound := NULL;
    ELSIF right(v_prefix, 1) = delimiter_param THEN
        v_upper_bound := left(v_prefix, -1) || chr(ascii(delimiter_param) + 1);
    ELSE
        v_upper_bound := left(v_prefix, -1) || chr(ascii(right(v_prefix, 1)) + 1);
    END IF;

    -- Build batch query (dynamic SQL - called infrequently, amortized over many rows)
    IF v_is_asc THEN
        IF v_upper_bound IS NOT NULL THEN
            v_batch_query := 'SELECT o.name, o.id, o.updated_at, o.created_at, o.last_accessed_at, o.metadata ' ||
                'FROM storage.objects o WHERE o.bucket_id = $1 AND o.name COLLATE "C" >= $2 ' ||
                'AND o.name COLLATE "C" < $3 ORDER BY o.name COLLATE "C" ASC LIMIT $4';
        ELSE
            v_batch_query := 'SELECT o.name, o.id, o.updated_at, o.created_at, o.last_accessed_at, o.metadata ' ||
                'FROM storage.objects o WHERE o.bucket_id = $1 AND o.name COLLATE "C" >= $2 ' ||
                'ORDER BY o.name COLLATE "C" ASC LIMIT $4';
        END IF;
    ELSE
        IF v_upper_bound IS NOT NULL THEN
            v_batch_query := 'SELECT o.name, o.id, o.updated_at, o.created_at, o.last_accessed_at, o.metadata ' ||
                'FROM storage.objects o WHERE o.bucket_id = $1 AND o.name COLLATE "C" < $2 ' ||
                'AND o.name COLLATE "C" >= $3 ORDER BY o.name COLLATE "C" DESC LIMIT $4';
        ELSE
            v_batch_query := 'SELECT o.name, o.id, o.updated_at, o.created_at, o.last_accessed_at, o.metadata ' ||
                'FROM storage.objects o WHERE o.bucket_id = $1 AND o.name COLLATE "C" < $2 ' ||
                'ORDER BY o.name COLLATE "C" DESC LIMIT $4';
        END IF;
    END IF;

    -- ========================================================================
    -- SEEK INITIALIZATION: Determine starting position
    -- ========================================================================
    IF v_start = '' THEN
        IF v_is_asc THEN
            v_next_seek := v_prefix;
        ELSE
            -- DESC without cursor: find the last item in range
            IF v_upper_bound IS NOT NULL THEN
                SELECT o.name INTO v_next_seek FROM storage.objects o
                WHERE o.bucket_id = _bucket_id AND o.name COLLATE "C" >= v_prefix AND o.name COLLATE "C" < v_upper_bound
                ORDER BY o.name COLLATE "C" DESC LIMIT 1;
            ELSIF v_prefix <> '' THEN
                SELECT o.name INTO v_next_seek FROM storage.objects o
                WHERE o.bucket_id = _bucket_id AND o.name COLLATE "C" >= v_prefix
                ORDER BY o.name COLLATE "C" DESC LIMIT 1;
            ELSE
                SELECT o.name INTO v_next_seek FROM storage.objects o
                WHERE o.bucket_id = _bucket_id
                ORDER BY o.name COLLATE "C" DESC LIMIT 1;
            END IF;

            IF v_next_seek IS NOT NULL THEN
                v_next_seek := v_next_seek || delimiter_param;
            ELSE
                RETURN;
            END IF;
        END IF;
    ELSE
        -- Cursor provided: determine if it refers to a folder or leaf
        IF EXISTS (
            SELECT 1 FROM storage.objects o
            WHERE o.bucket_id = _bucket_id
              AND o.name COLLATE "C" LIKE v_start || delimiter_param || '%'
            LIMIT 1
        ) THEN
            -- Cursor refers to a folder
            IF v_is_asc THEN
                v_next_seek := v_start || chr(ascii(delimiter_param) + 1);
            ELSE
                v_next_seek := v_start || delimiter_param;
            END IF;
        ELSE
            -- Cursor refers to a leaf object
            IF v_is_asc THEN
                v_next_seek := v_start || delimiter_param;
            ELSE
                v_next_seek := v_start;
            END IF;
        END IF;
    END IF;

    -- ========================================================================
    -- MAIN LOOP: Hybrid peek-then-batch algorithm
    -- Uses STATIC SQL for peek (hot path) and DYNAMIC SQL for batch
    -- ========================================================================
    LOOP
        EXIT WHEN v_count >= max_keys;

        -- STEP 1: PEEK using STATIC SQL (plan cached, very fast)
        IF v_is_asc THEN
            IF v_upper_bound IS NOT NULL THEN
                SELECT o.name INTO v_peek_name FROM storage.objects o
                WHERE o.bucket_id = _bucket_id AND o.name COLLATE "C" >= v_next_seek AND o.name COLLATE "C" < v_upper_bound
                ORDER BY o.name COLLATE "C" ASC LIMIT 1;
            ELSE
                SELECT o.name INTO v_peek_name FROM storage.objects o
                WHERE o.bucket_id = _bucket_id AND o.name COLLATE "C" >= v_next_seek
                ORDER BY o.name COLLATE "C" ASC LIMIT 1;
            END IF;
        ELSE
            IF v_upper_bound IS NOT NULL THEN
                SELECT o.name INTO v_peek_name FROM storage.objects o
                WHERE o.bucket_id = _bucket_id AND o.name COLLATE "C" < v_next_seek AND o.name COLLATE "C" >= v_prefix
                ORDER BY o.name COLLATE "C" DESC LIMIT 1;
            ELSIF v_prefix <> '' THEN
                SELECT o.name INTO v_peek_name FROM storage.objects o
                WHERE o.bucket_id = _bucket_id AND o.name COLLATE "C" < v_next_seek AND o.name COLLATE "C" >= v_prefix
                ORDER BY o.name COLLATE "C" DESC LIMIT 1;
            ELSE
                SELECT o.name INTO v_peek_name FROM storage.objects o
                WHERE o.bucket_id = _bucket_id AND o.name COLLATE "C" < v_next_seek
                ORDER BY o.name COLLATE "C" DESC LIMIT 1;
            END IF;
        END IF;

        EXIT WHEN v_peek_name IS NULL;

        -- STEP 2: Check if this is a FOLDER or FILE
        v_common_prefix := storage.get_common_prefix(v_peek_name, v_prefix, delimiter_param);

        IF v_common_prefix IS NOT NULL THEN
            -- FOLDER: Emit and skip to next folder (no heap access needed)
            name := rtrim(v_common_prefix, delimiter_param);
            id := NULL;
            updated_at := NULL;
            created_at := NULL;
            last_accessed_at := NULL;
            metadata := NULL;
            RETURN NEXT;
            v_count := v_count + 1;

            -- Advance seek past the folder range
            IF v_is_asc THEN
                v_next_seek := left(v_common_prefix, -1) || chr(ascii(delimiter_param) + 1);
            ELSE
                v_next_seek := v_common_prefix;
            END IF;
        ELSE
            -- FILE: Batch fetch using DYNAMIC SQL (overhead amortized over many rows)
            -- For ASC: upper_bound is the exclusive upper limit (< condition)
            -- For DESC: prefix is the inclusive lower limit (>= condition)
            FOR v_current IN EXECUTE v_batch_query USING _bucket_id, v_next_seek,
                CASE WHEN v_is_asc THEN COALESCE(v_upper_bound, v_prefix) ELSE v_prefix END, v_file_batch_size
            LOOP
                v_common_prefix := storage.get_common_prefix(v_current.name, v_prefix, delimiter_param);

                IF v_common_prefix IS NOT NULL THEN
                    -- Hit a folder: exit batch, let peek handle it
                    v_next_seek := v_current.name;
                    EXIT;
                END IF;

                -- Emit file
                name := v_current.name;
                id := v_current.id;
                updated_at := v_current.updated_at;
                created_at := v_current.created_at;
                last_accessed_at := v_current.last_accessed_at;
                metadata := v_current.metadata;
                RETURN NEXT;
                v_count := v_count + 1;

                -- Advance seek past this file
                IF v_is_asc THEN
                    v_next_seek := v_current.name || delimiter_param;
                ELSE
                    v_next_seek := v_current.name;
                END IF;

                EXIT WHEN v_count >= max_keys;
            END LOOP;
        END IF;
    END LOOP;
END;
$_$;


ALTER FUNCTION storage.list_objects_with_delimiter(_bucket_id text, prefix_param text, delimiter_param text, max_keys integer, start_after text, next_token text, sort_order text) OWNER TO supabase_storage_admin;

--
-- TOC entry 508 (class 1255 OID 17196)
-- Name: operation(); Type: FUNCTION; Schema: storage; Owner: supabase_storage_admin
--

CREATE FUNCTION storage.operation() RETURNS text
    LANGUAGE plpgsql STABLE
    AS $$
BEGIN
    RETURN current_setting('storage.operation', true);
END;
$$;


ALTER FUNCTION storage.operation() OWNER TO supabase_storage_admin;

--
-- TOC entry 442 (class 1255 OID 17261)
-- Name: protect_delete(); Type: FUNCTION; Schema: storage; Owner: supabase_storage_admin
--

CREATE FUNCTION storage.protect_delete() RETURNS trigger
    LANGUAGE plpgsql
    AS $$
BEGIN
    -- Check if storage.allow_delete_query is set to 'true'
    IF COALESCE(current_setting('storage.allow_delete_query', true), 'false') != 'true' THEN
        RAISE EXCEPTION 'Direct deletion from storage tables is not allowed. Use the Storage API instead.'
            USING HINT = 'This prevents accidental data loss from orphaned objects.',
                  ERRCODE = '42501';
    END IF;
    RETURN NULL;
END;
$$;


ALTER FUNCTION storage.protect_delete() OWNER TO supabase_storage_admin;

--
-- TOC entry 531 (class 1255 OID 17130)
-- Name: search(text, text, integer, integer, integer, text, text, text); Type: FUNCTION; Schema: storage; Owner: supabase_storage_admin
--

CREATE FUNCTION storage.search(prefix text, bucketname text, limits integer DEFAULT 100, levels integer DEFAULT 1, offsets integer DEFAULT 0, search text DEFAULT ''::text, sortcolumn text DEFAULT 'name'::text, sortorder text DEFAULT 'asc'::text) RETURNS TABLE(name text, id uuid, updated_at timestamp with time zone, created_at timestamp with time zone, last_accessed_at timestamp with time zone, metadata jsonb)
    LANGUAGE plpgsql STABLE
    AS $_$
DECLARE
    v_peek_name TEXT;
    v_current RECORD;
    v_common_prefix TEXT;
    v_delimiter CONSTANT TEXT := '/';

    -- Configuration
    v_limit INT;
    v_prefix TEXT;
    v_prefix_lower TEXT;
    v_is_asc BOOLEAN;
    v_order_by TEXT;
    v_sort_order TEXT;
    v_upper_bound TEXT;
    v_file_batch_size INT;

    -- Dynamic SQL for batch query only
    v_batch_query TEXT;

    -- Seek state
    v_next_seek TEXT;
    v_count INT := 0;
    v_skipped INT := 0;
BEGIN
    -- ========================================================================
    -- INITIALIZATION
    -- ========================================================================
    v_limit := LEAST(coalesce(limits, 100), 1500);
    v_prefix := coalesce(prefix, '') || coalesce(search, '');
    v_prefix_lower := lower(v_prefix);
    v_is_asc := lower(coalesce(sortorder, 'asc')) = 'asc';
    v_file_batch_size := LEAST(GREATEST(v_limit * 2, 100), 1000);

    -- Validate sort column
    CASE lower(coalesce(sortcolumn, 'name'))
        WHEN 'name' THEN v_order_by := 'name';
        WHEN 'updated_at' THEN v_order_by := 'updated_at';
        WHEN 'created_at' THEN v_order_by := 'created_at';
        WHEN 'last_accessed_at' THEN v_order_by := 'last_accessed_at';
        ELSE v_order_by := 'name';
    END CASE;

    v_sort_order := CASE WHEN v_is_asc THEN 'asc' ELSE 'desc' END;

    -- ========================================================================
    -- NON-NAME SORTING: Use path_tokens approach (unchanged)
    -- ========================================================================
    IF v_order_by != 'name' THEN
        RETURN QUERY EXECUTE format(
            $sql$
            WITH folders AS (
                SELECT path_tokens[$1] AS folder
                FROM storage.objects
                WHERE objects.name ILIKE $2 || '%%'
                  AND bucket_id = $3
                  AND array_length(objects.path_tokens, 1) <> $1
                GROUP BY folder
                ORDER BY folder %s
            )
            (SELECT folder AS "name",
                   NULL::uuid AS id,
                   NULL::timestamptz AS updated_at,
                   NULL::timestamptz AS created_at,
                   NULL::timestamptz AS last_accessed_at,
                   NULL::jsonb AS metadata FROM folders)
            UNION ALL
            (SELECT path_tokens[$1] AS "name",
                   id, updated_at, created_at, last_accessed_at, metadata
             FROM storage.objects
             WHERE objects.name ILIKE $2 || '%%'
               AND bucket_id = $3
               AND array_length(objects.path_tokens, 1) = $1
             ORDER BY %I %s)
            LIMIT $4 OFFSET $5
            $sql$, v_sort_order, v_order_by, v_sort_order
        ) USING levels, v_prefix, bucketname, v_limit, offsets;
        RETURN;
    END IF;

    -- ========================================================================
    -- NAME SORTING: Hybrid skip-scan with batch optimization
    -- ========================================================================

    -- Calculate upper bound for prefix filtering
    IF v_prefix_lower = '' THEN
        v_upper_bound := NULL;
    ELSIF right(v_prefix_lower, 1) = v_delimiter THEN
        v_upper_bound := left(v_prefix_lower, -1) || chr(ascii(v_delimiter) + 1);
    ELSE
        v_upper_bound := left(v_prefix_lower, -1) || chr(ascii(right(v_prefix_lower, 1)) + 1);
    END IF;

    -- Build batch query (dynamic SQL - called infrequently, amortized over many rows)
    IF v_is_asc THEN
        IF v_upper_bound IS NOT NULL THEN
            v_batch_query := 'SELECT o.name, o.id, o.updated_at, o.created_at, o.last_accessed_at, o.metadata ' ||
                'FROM storage.objects o WHERE o.bucket_id = $1 AND lower(o.name) COLLATE "C" >= $2 ' ||
                'AND lower(o.name) COLLATE "C" < $3 ORDER BY lower(o.name) COLLATE "C" ASC LIMIT $4';
        ELSE
            v_batch_query := 'SELECT o.name, o.id, o.updated_at, o.created_at, o.last_accessed_at, o.metadata ' ||
                'FROM storage.objects o WHERE o.bucket_id = $1 AND lower(o.name) COLLATE "C" >= $2 ' ||
                'ORDER BY lower(o.name) COLLATE "C" ASC LIMIT $4';
        END IF;
    ELSE
        IF v_upper_bound IS NOT NULL THEN
            v_batch_query := 'SELECT o.name, o.id, o.updated_at, o.created_at, o.last_accessed_at, o.metadata ' ||
                'FROM storage.objects o WHERE o.bucket_id = $1 AND lower(o.name) COLLATE "C" < $2 ' ||
                'AND lower(o.name) COLLATE "C" >= $3 ORDER BY lower(o.name) COLLATE "C" DESC LIMIT $4';
        ELSE
            v_batch_query := 'SELECT o.name, o.id, o.updated_at, o.created_at, o.last_accessed_at, o.metadata ' ||
                'FROM storage.objects o WHERE o.bucket_id = $1 AND lower(o.name) COLLATE "C" < $2 ' ||
                'ORDER BY lower(o.name) COLLATE "C" DESC LIMIT $4';
        END IF;
    END IF;

    -- Initialize seek position
    IF v_is_asc THEN
        v_next_seek := v_prefix_lower;
    ELSE
        -- DESC: find the last item in range first (static SQL)
        IF v_upper_bound IS NOT NULL THEN
            SELECT o.name INTO v_peek_name FROM storage.objects o
            WHERE o.bucket_id = bucketname AND lower(o.name) COLLATE "C" >= v_prefix_lower AND lower(o.name) COLLATE "C" < v_upper_bound
            ORDER BY lower(o.name) COLLATE "C" DESC LIMIT 1;
        ELSIF v_prefix_lower <> '' THEN
            SELECT o.name INTO v_peek_name FROM storage.objects o
            WHERE o.bucket_id = bucketname AND lower(o.name) COLLATE "C" >= v_prefix_lower
            ORDER BY lower(o.name) COLLATE "C" DESC LIMIT 1;
        ELSE
            SELECT o.name INTO v_peek_name FROM storage.objects o
            WHERE o.bucket_id = bucketname
            ORDER BY lower(o.name) COLLATE "C" DESC LIMIT 1;
        END IF;

        IF v_peek_name IS NOT NULL THEN
            v_next_seek := lower(v_peek_name) || v_delimiter;
        ELSE
            RETURN;
        END IF;
    END IF;

    -- ========================================================================
    -- MAIN LOOP: Hybrid peek-then-batch algorithm
    -- Uses STATIC SQL for peek (hot path) and DYNAMIC SQL for batch
    -- ========================================================================
    LOOP
        EXIT WHEN v_count >= v_limit;

        -- STEP 1: PEEK using STATIC SQL (plan cached, very fast)
        IF v_is_asc THEN
            IF v_upper_bound IS NOT NULL THEN
                SELECT o.name INTO v_peek_name FROM storage.objects o
                WHERE o.bucket_id = bucketname AND lower(o.name) COLLATE "C" >= v_next_seek AND lower(o.name) COLLATE "C" < v_upper_bound
                ORDER BY lower(o.name) COLLATE "C" ASC LIMIT 1;
            ELSE
                SELECT o.name INTO v_peek_name FROM storage.objects o
                WHERE o.bucket_id = bucketname AND lower(o.name) COLLATE "C" >= v_next_seek
                ORDER BY lower(o.name) COLLATE "C" ASC LIMIT 1;
            END IF;
        ELSE
            IF v_upper_bound IS NOT NULL THEN
                SELECT o.name INTO v_peek_name FROM storage.objects o
                WHERE o.bucket_id = bucketname AND lower(o.name) COLLATE "C" < v_next_seek AND lower(o.name) COLLATE "C" >= v_prefix_lower
                ORDER BY lower(o.name) COLLATE "C" DESC LIMIT 1;
            ELSIF v_prefix_lower <> '' THEN
                SELECT o.name INTO v_peek_name FROM storage.objects o
                WHERE o.bucket_id = bucketname AND lower(o.name) COLLATE "C" < v_next_seek AND lower(o.name) COLLATE "C" >= v_prefix_lower
                ORDER BY lower(o.name) COLLATE "C" DESC LIMIT 1;
            ELSE
                SELECT o.name INTO v_peek_name FROM storage.objects o
                WHERE o.bucket_id = bucketname AND lower(o.name) COLLATE "C" < v_next_seek
                ORDER BY lower(o.name) COLLATE "C" DESC LIMIT 1;
            END IF;
        END IF;

        EXIT WHEN v_peek_name IS NULL;

        -- STEP 2: Check if this is a FOLDER or FILE
        v_common_prefix := storage.get_common_prefix(lower(v_peek_name), v_prefix_lower, v_delimiter);

        IF v_common_prefix IS NOT NULL THEN
            -- FOLDER: Handle offset, emit if needed, skip to next folder
            IF v_skipped < offsets THEN
                v_skipped := v_skipped + 1;
            ELSE
                name := split_part(rtrim(storage.get_common_prefix(v_peek_name, v_prefix, v_delimiter), v_delimiter), v_delimiter, levels);
                id := NULL;
                updated_at := NULL;
                created_at := NULL;
                last_accessed_at := NULL;
                metadata := NULL;
                RETURN NEXT;
                v_count := v_count + 1;
            END IF;

            -- Advance seek past the folder range
            IF v_is_asc THEN
                v_next_seek := lower(left(v_common_prefix, -1)) || chr(ascii(v_delimiter) + 1);
            ELSE
                v_next_seek := lower(v_common_prefix);
            END IF;
        ELSE
            -- FILE: Batch fetch using DYNAMIC SQL (overhead amortized over many rows)
            -- For ASC: upper_bound is the exclusive upper limit (< condition)
            -- For DESC: prefix_lower is the inclusive lower limit (>= condition)
            FOR v_current IN EXECUTE v_batch_query
                USING bucketname, v_next_seek,
                    CASE WHEN v_is_asc THEN COALESCE(v_upper_bound, v_prefix_lower) ELSE v_prefix_lower END, v_file_batch_size
            LOOP
                v_common_prefix := storage.get_common_prefix(lower(v_current.name), v_prefix_lower, v_delimiter);

                IF v_common_prefix IS NOT NULL THEN
                    -- Hit a folder: exit batch, let peek handle it
                    v_next_seek := lower(v_current.name);
                    EXIT;
                END IF;

                -- Handle offset skipping
                IF v_skipped < offsets THEN
                    v_skipped := v_skipped + 1;
                ELSE
                    -- Emit file
                    name := split_part(v_current.name, v_delimiter, levels);
                    id := v_current.id;
                    updated_at := v_current.updated_at;
                    created_at := v_current.created_at;
                    last_accessed_at := v_current.last_accessed_at;
                    metadata := v_current.metadata;
                    RETURN NEXT;
                    v_count := v_count + 1;
                END IF;

                -- Advance seek past this file
                IF v_is_asc THEN
                    v_next_seek := lower(v_current.name) || v_delimiter;
                ELSE
                    v_next_seek := lower(v_current.name);
                END IF;

                EXIT WHEN v_count >= v_limit;
            END LOOP;
        END IF;
    END LOOP;
END;
$_$;


ALTER FUNCTION storage.search(prefix text, bucketname text, limits integer, levels integer, offsets integer, search text, sortcolumn text, sortorder text) OWNER TO supabase_storage_admin;

--
-- TOC entry 502 (class 1255 OID 17259)
-- Name: search_by_timestamp(text, text, integer, integer, text, text, text, text); Type: FUNCTION; Schema: storage; Owner: supabase_storage_admin
--

CREATE FUNCTION storage.search_by_timestamp(p_prefix text, p_bucket_id text, p_limit integer, p_level integer, p_start_after text, p_sort_order text, p_sort_column text, p_sort_column_after text) RETURNS TABLE(key text, name text, id uuid, updated_at timestamp with time zone, created_at timestamp with time zone, last_accessed_at timestamp with time zone, metadata jsonb)
    LANGUAGE plpgsql STABLE
    AS $_$
DECLARE
    v_cursor_op text;
    v_query text;
    v_prefix text;
BEGIN
    v_prefix := coalesce(p_prefix, '');

    IF p_sort_order = 'asc' THEN
        v_cursor_op := '>';
    ELSE
        v_cursor_op := '<';
    END IF;

    v_query := format($sql$
        WITH raw_objects AS (
            SELECT
                o.name AS obj_name,
                o.id AS obj_id,
                o.updated_at AS obj_updated_at,
                o.created_at AS obj_created_at,
                o.last_accessed_at AS obj_last_accessed_at,
                o.metadata AS obj_metadata,
                storage.get_common_prefix(o.name, $1, '/') AS common_prefix
            FROM storage.objects o
            WHERE o.bucket_id = $2
              AND o.name COLLATE "C" LIKE $1 || '%%'
        ),
        -- Aggregate common prefixes (folders)
        -- Both created_at and updated_at use MIN(obj_created_at) to match the old prefixes table behavior
        aggregated_prefixes AS (
            SELECT
                rtrim(common_prefix, '/') AS name,
                NULL::uuid AS id,
                MIN(obj_created_at) AS updated_at,
                MIN(obj_created_at) AS created_at,
                NULL::timestamptz AS last_accessed_at,
                NULL::jsonb AS metadata,
                TRUE AS is_prefix
            FROM raw_objects
            WHERE common_prefix IS NOT NULL
            GROUP BY common_prefix
        ),
        leaf_objects AS (
            SELECT
                obj_name AS name,
                obj_id AS id,
                obj_updated_at AS updated_at,
                obj_created_at AS created_at,
                obj_last_accessed_at AS last_accessed_at,
                obj_metadata AS metadata,
                FALSE AS is_prefix
            FROM raw_objects
            WHERE common_prefix IS NULL
        ),
        combined AS (
            SELECT * FROM aggregated_prefixes
            UNION ALL
            SELECT * FROM leaf_objects
        ),
        filtered AS (
            SELECT *
            FROM combined
            WHERE (
                $5 = ''
                OR ROW(
                    date_trunc('milliseconds', %I),
                    name COLLATE "C"
                ) %s ROW(
                    COALESCE(NULLIF($6, '')::timestamptz, 'epoch'::timestamptz),
                    $5
                )
            )
        )
        SELECT
            split_part(name, '/', $3) AS key,
            name,
            id,
            updated_at,
            created_at,
            last_accessed_at,
            metadata
        FROM filtered
        ORDER BY
            COALESCE(date_trunc('milliseconds', %I), 'epoch'::timestamptz) %s,
            name COLLATE "C" %s
        LIMIT $4
    $sql$,
        p_sort_column,
        v_cursor_op,
        p_sort_column,
        p_sort_order,
        p_sort_order
    );

    RETURN QUERY EXECUTE v_query
    USING v_prefix, p_bucket_id, p_level, p_limit, p_start_after, p_sort_column_after;
END;
$_$;


ALTER FUNCTION storage.search_by_timestamp(p_prefix text, p_bucket_id text, p_limit integer, p_level integer, p_start_after text, p_sort_order text, p_sort_column text, p_sort_column_after text) OWNER TO supabase_storage_admin;

--
-- TOC entry 510 (class 1255 OID 17258)
-- Name: search_v2(text, text, integer, integer, text, text, text, text); Type: FUNCTION; Schema: storage; Owner: supabase_storage_admin
--

CREATE FUNCTION storage.search_v2(prefix text, bucket_name text, limits integer DEFAULT 100, levels integer DEFAULT 1, start_after text DEFAULT ''::text, sort_order text DEFAULT 'asc'::text, sort_column text DEFAULT 'name'::text, sort_column_after text DEFAULT ''::text) RETURNS TABLE(key text, name text, id uuid, updated_at timestamp with time zone, created_at timestamp with time zone, last_accessed_at timestamp with time zone, metadata jsonb)
    LANGUAGE plpgsql STABLE
    AS $$
DECLARE
    v_sort_col text;
    v_sort_ord text;
    v_limit int;
BEGIN
    -- Cap limit to maximum of 1500 records
    v_limit := LEAST(coalesce(limits, 100), 1500);

    -- Validate and normalize sort_order
    v_sort_ord := lower(coalesce(sort_order, 'asc'));
    IF v_sort_ord NOT IN ('asc', 'desc') THEN
        v_sort_ord := 'asc';
    END IF;

    -- Validate and normalize sort_column
    v_sort_col := lower(coalesce(sort_column, 'name'));
    IF v_sort_col NOT IN ('name', 'updated_at', 'created_at') THEN
        v_sort_col := 'name';
    END IF;

    -- Route to appropriate implementation
    IF v_sort_col = 'name' THEN
        -- Use list_objects_with_delimiter for name sorting (most efficient: O(k * log n))
        RETURN QUERY
        SELECT
            split_part(l.name, '/', levels) AS key,
            l.name AS name,
            l.id,
            l.updated_at,
            l.created_at,
            l.last_accessed_at,
            l.metadata
        FROM storage.list_objects_with_delimiter(
            bucket_name,
            coalesce(prefix, ''),
            '/',
            v_limit,
            start_after,
            '',
            v_sort_ord
        ) l;
    ELSE
        -- Use aggregation approach for timestamp sorting
        -- Not efficient for large datasets but supports correct pagination
        RETURN QUERY SELECT * FROM storage.search_by_timestamp(
            prefix, bucket_name, v_limit, levels, start_after,
            v_sort_ord, v_sort_col, sort_column_after
        );
    END IF;
END;
$$;


ALTER FUNCTION storage.search_v2(prefix text, bucket_name text, limits integer, levels integer, start_after text, sort_order text, sort_column text, sort_column_after text) OWNER TO supabase_storage_admin;

--
-- TOC entry 521 (class 1255 OID 17131)
-- Name: update_updated_at_column(); Type: FUNCTION; Schema: storage; Owner: supabase_storage_admin
--

CREATE FUNCTION storage.update_updated_at_column() RETURNS trigger
    LANGUAGE plpgsql
    AS $$
BEGIN
    NEW.updated_at = now();
    RETURN NEW; 
END;
$$;


ALTER FUNCTION storage.update_updated_at_column() OWNER TO supabase_storage_admin;

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- TOC entry 362 (class 1259 OID 16529)
-- Name: audit_log_entries; Type: TABLE; Schema: auth; Owner: supabase_auth_admin
--

CREATE TABLE auth.audit_log_entries (
    instance_id uuid,
    id uuid NOT NULL,
    payload json,
    created_at timestamp with time zone,
    ip_address character varying(64) DEFAULT ''::character varying NOT NULL
);


ALTER TABLE auth.audit_log_entries OWNER TO supabase_auth_admin;

--
-- TOC entry 4861 (class 0 OID 0)
-- Dependencies: 362
-- Name: TABLE audit_log_entries; Type: COMMENT; Schema: auth; Owner: supabase_auth_admin
--

COMMENT ON TABLE auth.audit_log_entries IS 'Auth: Audit trail for user actions.';


--
-- TOC entry 402 (class 1259 OID 19403)
-- Name: custom_oauth_providers; Type: TABLE; Schema: auth; Owner: supabase_auth_admin
--

CREATE TABLE auth.custom_oauth_providers (
    id uuid DEFAULT gen_random_uuid() NOT NULL,
    provider_type text NOT NULL,
    identifier text NOT NULL,
    name text NOT NULL,
    client_id text NOT NULL,
    client_secret text NOT NULL,
    acceptable_client_ids text[] DEFAULT '{}'::text[] NOT NULL,
    scopes text[] DEFAULT '{}'::text[] NOT NULL,
    pkce_enabled boolean DEFAULT true NOT NULL,
    attribute_mapping jsonb DEFAULT '{}'::jsonb NOT NULL,
    authorization_params jsonb DEFAULT '{}'::jsonb NOT NULL,
    enabled boolean DEFAULT true NOT NULL,
    email_optional boolean DEFAULT false NOT NULL,
    issuer text,
    discovery_url text,
    skip_nonce_check boolean DEFAULT false NOT NULL,
    cached_discovery jsonb,
    discovery_cached_at timestamp with time zone,
    authorization_url text,
    token_url text,
    userinfo_url text,
    jwks_uri text,
    created_at timestamp with time zone DEFAULT now() NOT NULL,
    updated_at timestamp with time zone DEFAULT now() NOT NULL,
    CONSTRAINT custom_oauth_providers_authorization_url_https CHECK (((authorization_url IS NULL) OR (authorization_url ~~ 'https://%'::text))),
    CONSTRAINT custom_oauth_providers_authorization_url_length CHECK (((authorization_url IS NULL) OR (char_length(authorization_url) <= 2048))),
    CONSTRAINT custom_oauth_providers_client_id_length CHECK (((char_length(client_id) >= 1) AND (char_length(client_id) <= 512))),
    CONSTRAINT custom_oauth_providers_discovery_url_length CHECK (((discovery_url IS NULL) OR (char_length(discovery_url) <= 2048))),
    CONSTRAINT custom_oauth_providers_identifier_format CHECK ((identifier ~ '^[a-z0-9][a-z0-9:-]{0,48}[a-z0-9]$'::text)),
    CONSTRAINT custom_oauth_providers_issuer_length CHECK (((issuer IS NULL) OR ((char_length(issuer) >= 1) AND (char_length(issuer) <= 2048)))),
    CONSTRAINT custom_oauth_providers_jwks_uri_https CHECK (((jwks_uri IS NULL) OR (jwks_uri ~~ 'https://%'::text))),
    CONSTRAINT custom_oauth_providers_jwks_uri_length CHECK (((jwks_uri IS NULL) OR (char_length(jwks_uri) <= 2048))),
    CONSTRAINT custom_oauth_providers_name_length CHECK (((char_length(name) >= 1) AND (char_length(name) <= 100))),
    CONSTRAINT custom_oauth_providers_oauth2_requires_endpoints CHECK (((provider_type <> 'oauth2'::text) OR ((authorization_url IS NOT NULL) AND (token_url IS NOT NULL) AND (userinfo_url IS NOT NULL)))),
    CONSTRAINT custom_oauth_providers_oidc_discovery_url_https CHECK (((provider_type <> 'oidc'::text) OR (discovery_url IS NULL) OR (discovery_url ~~ 'https://%'::text))),
    CONSTRAINT custom_oauth_providers_oidc_issuer_https CHECK (((provider_type <> 'oidc'::text) OR (issuer IS NULL) OR (issuer ~~ 'https://%'::text))),
    CONSTRAINT custom_oauth_providers_oidc_requires_issuer CHECK (((provider_type <> 'oidc'::text) OR (issuer IS NOT NULL))),
    CONSTRAINT custom_oauth_providers_provider_type_check CHECK ((provider_type = ANY (ARRAY['oauth2'::text, 'oidc'::text]))),
    CONSTRAINT custom_oauth_providers_token_url_https CHECK (((token_url IS NULL) OR (token_url ~~ 'https://%'::text))),
    CONSTRAINT custom_oauth_providers_token_url_length CHECK (((token_url IS NULL) OR (char_length(token_url) <= 2048))),
    CONSTRAINT custom_oauth_providers_userinfo_url_https CHECK (((userinfo_url IS NULL) OR (userinfo_url ~~ 'https://%'::text))),
    CONSTRAINT custom_oauth_providers_userinfo_url_length CHECK (((userinfo_url IS NULL) OR (char_length(userinfo_url) <= 2048)))
);


ALTER TABLE auth.custom_oauth_providers OWNER TO supabase_auth_admin;

--
-- TOC entry 376 (class 1259 OID 16883)
-- Name: flow_state; Type: TABLE; Schema: auth; Owner: supabase_auth_admin
--

CREATE TABLE auth.flow_state (
    id uuid NOT NULL,
    user_id uuid,
    auth_code text,
    code_challenge_method auth.code_challenge_method,
    code_challenge text,
    provider_type text NOT NULL,
    provider_access_token text,
    provider_refresh_token text,
    created_at timestamp with time zone,
    updated_at timestamp with time zone,
    authentication_method text NOT NULL,
    auth_code_issued_at timestamp with time zone,
    invite_token text,
    referrer text,
    oauth_client_state_id uuid,
    linking_target_id uuid,
    email_optional boolean DEFAULT false NOT NULL
);


ALTER TABLE auth.flow_state OWNER TO supabase_auth_admin;

--
-- TOC entry 4864 (class 0 OID 0)
-- Dependencies: 376
-- Name: TABLE flow_state; Type: COMMENT; Schema: auth; Owner: supabase_auth_admin
--

COMMENT ON TABLE auth.flow_state IS 'Stores metadata for all OAuth/SSO login flows';


--
-- TOC entry 367 (class 1259 OID 16681)
-- Name: identities; Type: TABLE; Schema: auth; Owner: supabase_auth_admin
--

CREATE TABLE auth.identities (
    provider_id text NOT NULL,
    user_id uuid NOT NULL,
    identity_data jsonb NOT NULL,
    provider text NOT NULL,
    last_sign_in_at timestamp with time zone,
    created_at timestamp with time zone,
    updated_at timestamp with time zone,
    email text GENERATED ALWAYS AS (lower((identity_data ->> 'email'::text))) STORED,
    id uuid DEFAULT gen_random_uuid() NOT NULL
);


ALTER TABLE auth.identities OWNER TO supabase_auth_admin;

--
-- TOC entry 4866 (class 0 OID 0)
-- Dependencies: 367
-- Name: TABLE identities; Type: COMMENT; Schema: auth; Owner: supabase_auth_admin
--

COMMENT ON TABLE auth.identities IS 'Auth: Stores identities associated to a user.';


--
-- TOC entry 4867 (class 0 OID 0)
-- Dependencies: 367
-- Name: COLUMN identities.email; Type: COMMENT; Schema: auth; Owner: supabase_auth_admin
--

COMMENT ON COLUMN auth.identities.email IS 'Auth: Email is a generated column that references the optional email property in the identity_data';


--
-- TOC entry 361 (class 1259 OID 16522)
-- Name: instances; Type: TABLE; Schema: auth; Owner: supabase_auth_admin
--

CREATE TABLE auth.instances (
    id uuid NOT NULL,
    uuid uuid,
    raw_base_config text,
    created_at timestamp with time zone,
    updated_at timestamp with time zone
);


ALTER TABLE auth.instances OWNER TO supabase_auth_admin;

--
-- TOC entry 4869 (class 0 OID 0)
-- Dependencies: 361
-- Name: TABLE instances; Type: COMMENT; Schema: auth; Owner: supabase_auth_admin
--

COMMENT ON TABLE auth.instances IS 'Auth: Manages users across multiple sites.';


--
-- TOC entry 371 (class 1259 OID 16770)
-- Name: mfa_amr_claims; Type: TABLE; Schema: auth; Owner: supabase_auth_admin
--

CREATE TABLE auth.mfa_amr_claims (
    session_id uuid NOT NULL,
    created_at timestamp with time zone NOT NULL,
    updated_at timestamp with time zone NOT NULL,
    authentication_method text NOT NULL,
    id uuid NOT NULL
);


ALTER TABLE auth.mfa_amr_claims OWNER TO supabase_auth_admin;

--
-- TOC entry 4871 (class 0 OID 0)
-- Dependencies: 371
-- Name: TABLE mfa_amr_claims; Type: COMMENT; Schema: auth; Owner: supabase_auth_admin
--

COMMENT ON TABLE auth.mfa_amr_claims IS 'auth: stores authenticator method reference claims for multi factor authentication';


--
-- TOC entry 370 (class 1259 OID 16758)
-- Name: mfa_challenges; Type: TABLE; Schema: auth; Owner: supabase_auth_admin
--

CREATE TABLE auth.mfa_challenges (
    id uuid NOT NULL,
    factor_id uuid NOT NULL,
    created_at timestamp with time zone NOT NULL,
    verified_at timestamp with time zone,
    ip_address inet NOT NULL,
    otp_code text,
    web_authn_session_data jsonb
);


ALTER TABLE auth.mfa_challenges OWNER TO supabase_auth_admin;

--
-- TOC entry 4873 (class 0 OID 0)
-- Dependencies: 370
-- Name: TABLE mfa_challenges; Type: COMMENT; Schema: auth; Owner: supabase_auth_admin
--

COMMENT ON TABLE auth.mfa_challenges IS 'auth: stores metadata about challenge requests made';


--
-- TOC entry 369 (class 1259 OID 16745)
-- Name: mfa_factors; Type: TABLE; Schema: auth; Owner: supabase_auth_admin
--

CREATE TABLE auth.mfa_factors (
    id uuid NOT NULL,
    user_id uuid NOT NULL,
    friendly_name text,
    factor_type auth.factor_type NOT NULL,
    status auth.factor_status NOT NULL,
    created_at timestamp with time zone NOT NULL,
    updated_at timestamp with time zone NOT NULL,
    secret text,
    phone text,
    last_challenged_at timestamp with time zone,
    web_authn_credential jsonb,
    web_authn_aaguid uuid,
    last_webauthn_challenge_data jsonb
);


ALTER TABLE auth.mfa_factors OWNER TO supabase_auth_admin;

--
-- TOC entry 4875 (class 0 OID 0)
-- Dependencies: 369
-- Name: TABLE mfa_factors; Type: COMMENT; Schema: auth; Owner: supabase_auth_admin
--

COMMENT ON TABLE auth.mfa_factors IS 'auth: stores metadata about factors';


--
-- TOC entry 4876 (class 0 OID 0)
-- Dependencies: 369
-- Name: COLUMN mfa_factors.last_webauthn_challenge_data; Type: COMMENT; Schema: auth; Owner: supabase_auth_admin
--

COMMENT ON COLUMN auth.mfa_factors.last_webauthn_challenge_data IS 'Stores the latest WebAuthn challenge data including attestation/assertion for customer verification';


--
-- TOC entry 379 (class 1259 OID 16995)
-- Name: oauth_authorizations; Type: TABLE; Schema: auth; Owner: supabase_auth_admin
--

CREATE TABLE auth.oauth_authorizations (
    id uuid NOT NULL,
    authorization_id text NOT NULL,
    client_id uuid NOT NULL,
    user_id uuid,
    redirect_uri text NOT NULL,
    scope text NOT NULL,
    state text,
    resource text,
    code_challenge text,
    code_challenge_method auth.code_challenge_method,
    response_type auth.oauth_response_type DEFAULT 'code'::auth.oauth_response_type NOT NULL,
    status auth.oauth_authorization_status DEFAULT 'pending'::auth.oauth_authorization_status NOT NULL,
    authorization_code text,
    created_at timestamp with time zone DEFAULT now() NOT NULL,
    expires_at timestamp with time zone DEFAULT (now() + '00:03:00'::interval) NOT NULL,
    approved_at timestamp with time zone,
    nonce text,
    CONSTRAINT oauth_authorizations_authorization_code_length CHECK ((char_length(authorization_code) <= 255)),
    CONSTRAINT oauth_authorizations_code_challenge_length CHECK ((char_length(code_challenge) <= 128)),
    CONSTRAINT oauth_authorizations_expires_at_future CHECK ((expires_at > created_at)),
    CONSTRAINT oauth_authorizations_nonce_length CHECK ((char_length(nonce) <= 255)),
    CONSTRAINT oauth_authorizations_redirect_uri_length CHECK ((char_length(redirect_uri) <= 2048)),
    CONSTRAINT oauth_authorizations_resource_length CHECK ((char_length(resource) <= 2048)),
    CONSTRAINT oauth_authorizations_scope_length CHECK ((char_length(scope) <= 4096)),
    CONSTRAINT oauth_authorizations_state_length CHECK ((char_length(state) <= 4096))
);


ALTER TABLE auth.oauth_authorizations OWNER TO supabase_auth_admin;

--
-- TOC entry 381 (class 1259 OID 17068)
-- Name: oauth_client_states; Type: TABLE; Schema: auth; Owner: supabase_auth_admin
--

CREATE TABLE auth.oauth_client_states (
    id uuid NOT NULL,
    provider_type text NOT NULL,
    code_verifier text,
    created_at timestamp with time zone NOT NULL
);


ALTER TABLE auth.oauth_client_states OWNER TO supabase_auth_admin;

--
-- TOC entry 4879 (class 0 OID 0)
-- Dependencies: 381
-- Name: TABLE oauth_client_states; Type: COMMENT; Schema: auth; Owner: supabase_auth_admin
--

COMMENT ON TABLE auth.oauth_client_states IS 'Stores OAuth states for third-party provider authentication flows where Supabase acts as the OAuth client.';


--
-- TOC entry 378 (class 1259 OID 16965)
-- Name: oauth_clients; Type: TABLE; Schema: auth; Owner: supabase_auth_admin
--

CREATE TABLE auth.oauth_clients (
    id uuid NOT NULL,
    client_secret_hash text,
    registration_type auth.oauth_registration_type NOT NULL,
    redirect_uris text NOT NULL,
    grant_types text NOT NULL,
    client_name text,
    client_uri text,
    logo_uri text,
    created_at timestamp with time zone DEFAULT now() NOT NULL,
    updated_at timestamp with time zone DEFAULT now() NOT NULL,
    deleted_at timestamp with time zone,
    client_type auth.oauth_client_type DEFAULT 'confidential'::auth.oauth_client_type NOT NULL,
    token_endpoint_auth_method text NOT NULL,
    CONSTRAINT oauth_clients_client_name_length CHECK ((char_length(client_name) <= 1024)),
    CONSTRAINT oauth_clients_client_uri_length CHECK ((char_length(client_uri) <= 2048)),
    CONSTRAINT oauth_clients_logo_uri_length CHECK ((char_length(logo_uri) <= 2048)),
    CONSTRAINT oauth_clients_token_endpoint_auth_method_check CHECK ((token_endpoint_auth_method = ANY (ARRAY['client_secret_basic'::text, 'client_secret_post'::text, 'none'::text])))
);


ALTER TABLE auth.oauth_clients OWNER TO supabase_auth_admin;

--
-- TOC entry 380 (class 1259 OID 17028)
-- Name: oauth_consents; Type: TABLE; Schema: auth; Owner: supabase_auth_admin
--

CREATE TABLE auth.oauth_consents (
    id uuid NOT NULL,
    user_id uuid NOT NULL,
    client_id uuid NOT NULL,
    scopes text NOT NULL,
    granted_at timestamp with time zone DEFAULT now() NOT NULL,
    revoked_at timestamp with time zone,
    CONSTRAINT oauth_consents_revoked_after_granted CHECK (((revoked_at IS NULL) OR (revoked_at >= granted_at))),
    CONSTRAINT oauth_consents_scopes_length CHECK ((char_length(scopes) <= 2048)),
    CONSTRAINT oauth_consents_scopes_not_empty CHECK ((char_length(TRIM(BOTH FROM scopes)) > 0))
);


ALTER TABLE auth.oauth_consents OWNER TO supabase_auth_admin;

--
-- TOC entry 377 (class 1259 OID 16933)
-- Name: one_time_tokens; Type: TABLE; Schema: auth; Owner: supabase_auth_admin
--

CREATE TABLE auth.one_time_tokens (
    id uuid NOT NULL,
    user_id uuid NOT NULL,
    token_type auth.one_time_token_type NOT NULL,
    token_hash text NOT NULL,
    relates_to text NOT NULL,
    created_at timestamp without time zone DEFAULT now() NOT NULL,
    updated_at timestamp without time zone DEFAULT now() NOT NULL,
    CONSTRAINT one_time_tokens_token_hash_check CHECK ((char_length(token_hash) > 0))
);


ALTER TABLE auth.one_time_tokens OWNER TO supabase_auth_admin;

--
-- TOC entry 360 (class 1259 OID 16511)
-- Name: refresh_tokens; Type: TABLE; Schema: auth; Owner: supabase_auth_admin
--

CREATE TABLE auth.refresh_tokens (
    instance_id uuid,
    id bigint NOT NULL,
    token character varying(255),
    user_id character varying(255),
    revoked boolean,
    created_at timestamp with time zone,
    updated_at timestamp with time zone,
    parent character varying(255),
    session_id uuid
);


ALTER TABLE auth.refresh_tokens OWNER TO supabase_auth_admin;

--
-- TOC entry 4884 (class 0 OID 0)
-- Dependencies: 360
-- Name: TABLE refresh_tokens; Type: COMMENT; Schema: auth; Owner: supabase_auth_admin
--

COMMENT ON TABLE auth.refresh_tokens IS 'Auth: Store of tokens used to refresh JWT tokens once they expire.';


--
-- TOC entry 359 (class 1259 OID 16510)
-- Name: refresh_tokens_id_seq; Type: SEQUENCE; Schema: auth; Owner: supabase_auth_admin
--

CREATE SEQUENCE auth.refresh_tokens_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE auth.refresh_tokens_id_seq OWNER TO supabase_auth_admin;

--
-- TOC entry 4886 (class 0 OID 0)
-- Dependencies: 359
-- Name: refresh_tokens_id_seq; Type: SEQUENCE OWNED BY; Schema: auth; Owner: supabase_auth_admin
--

ALTER SEQUENCE auth.refresh_tokens_id_seq OWNED BY auth.refresh_tokens.id;


--
-- TOC entry 374 (class 1259 OID 16812)
-- Name: saml_providers; Type: TABLE; Schema: auth; Owner: supabase_auth_admin
--

CREATE TABLE auth.saml_providers (
    id uuid NOT NULL,
    sso_provider_id uuid NOT NULL,
    entity_id text NOT NULL,
    metadata_xml text NOT NULL,
    metadata_url text,
    attribute_mapping jsonb,
    created_at timestamp with time zone,
    updated_at timestamp with time zone,
    name_id_format text,
    CONSTRAINT "entity_id not empty" CHECK ((char_length(entity_id) > 0)),
    CONSTRAINT "metadata_url not empty" CHECK (((metadata_url = NULL::text) OR (char_length(metadata_url) > 0))),
    CONSTRAINT "metadata_xml not empty" CHECK ((char_length(metadata_xml) > 0))
);


ALTER TABLE auth.saml_providers OWNER TO supabase_auth_admin;

--
-- TOC entry 4888 (class 0 OID 0)
-- Dependencies: 374
-- Name: TABLE saml_providers; Type: COMMENT; Schema: auth; Owner: supabase_auth_admin
--

COMMENT ON TABLE auth.saml_providers IS 'Auth: Manages SAML Identity Provider connections.';


--
-- TOC entry 375 (class 1259 OID 16830)
-- Name: saml_relay_states; Type: TABLE; Schema: auth; Owner: supabase_auth_admin
--

CREATE TABLE auth.saml_relay_states (
    id uuid NOT NULL,
    sso_provider_id uuid NOT NULL,
    request_id text NOT NULL,
    for_email text,
    redirect_to text,
    created_at timestamp with time zone,
    updated_at timestamp with time zone,
    flow_state_id uuid,
    CONSTRAINT "request_id not empty" CHECK ((char_length(request_id) > 0))
);


ALTER TABLE auth.saml_relay_states OWNER TO supabase_auth_admin;

--
-- TOC entry 4890 (class 0 OID 0)
-- Dependencies: 375
-- Name: TABLE saml_relay_states; Type: COMMENT; Schema: auth; Owner: supabase_auth_admin
--

COMMENT ON TABLE auth.saml_relay_states IS 'Auth: Contains SAML Relay State information for each Service Provider initiated login.';


--
-- TOC entry 363 (class 1259 OID 16537)
-- Name: schema_migrations; Type: TABLE; Schema: auth; Owner: supabase_auth_admin
--

CREATE TABLE auth.schema_migrations (
    version character varying(255) NOT NULL
);


ALTER TABLE auth.schema_migrations OWNER TO supabase_auth_admin;

--
-- TOC entry 4892 (class 0 OID 0)
-- Dependencies: 363
-- Name: TABLE schema_migrations; Type: COMMENT; Schema: auth; Owner: supabase_auth_admin
--

COMMENT ON TABLE auth.schema_migrations IS 'Auth: Manages updates to the auth system.';


--
-- TOC entry 368 (class 1259 OID 16711)
-- Name: sessions; Type: TABLE; Schema: auth; Owner: supabase_auth_admin
--

CREATE TABLE auth.sessions (
    id uuid NOT NULL,
    user_id uuid NOT NULL,
    created_at timestamp with time zone,
    updated_at timestamp with time zone,
    factor_id uuid,
    aal auth.aal_level,
    not_after timestamp with time zone,
    refreshed_at timestamp without time zone,
    user_agent text,
    ip inet,
    tag text,
    oauth_client_id uuid,
    refresh_token_hmac_key text,
    refresh_token_counter bigint,
    scopes text,
    CONSTRAINT sessions_scopes_length CHECK ((char_length(scopes) <= 4096))
);


ALTER TABLE auth.sessions OWNER TO supabase_auth_admin;

--
-- TOC entry 4894 (class 0 OID 0)
-- Dependencies: 368
-- Name: TABLE sessions; Type: COMMENT; Schema: auth; Owner: supabase_auth_admin
--

COMMENT ON TABLE auth.sessions IS 'Auth: Stores session data associated to a user.';


--
-- TOC entry 4895 (class 0 OID 0)
-- Dependencies: 368
-- Name: COLUMN sessions.not_after; Type: COMMENT; Schema: auth; Owner: supabase_auth_admin
--

COMMENT ON COLUMN auth.sessions.not_after IS 'Auth: Not after is a nullable column that contains a timestamp after which the session should be regarded as expired.';


--
-- TOC entry 4896 (class 0 OID 0)
-- Dependencies: 368
-- Name: COLUMN sessions.refresh_token_hmac_key; Type: COMMENT; Schema: auth; Owner: supabase_auth_admin
--

COMMENT ON COLUMN auth.sessions.refresh_token_hmac_key IS 'Holds a HMAC-SHA256 key used to sign refresh tokens for this session.';


--
-- TOC entry 4897 (class 0 OID 0)
-- Dependencies: 368
-- Name: COLUMN sessions.refresh_token_counter; Type: COMMENT; Schema: auth; Owner: supabase_auth_admin
--

COMMENT ON COLUMN auth.sessions.refresh_token_counter IS 'Holds the ID (counter) of the last issued refresh token.';


--
-- TOC entry 373 (class 1259 OID 16797)
-- Name: sso_domains; Type: TABLE; Schema: auth; Owner: supabase_auth_admin
--

CREATE TABLE auth.sso_domains (
    id uuid NOT NULL,
    sso_provider_id uuid NOT NULL,
    domain text NOT NULL,
    created_at timestamp with time zone,
    updated_at timestamp with time zone,
    CONSTRAINT "domain not empty" CHECK ((char_length(domain) > 0))
);


ALTER TABLE auth.sso_domains OWNER TO supabase_auth_admin;

--
-- TOC entry 4899 (class 0 OID 0)
-- Dependencies: 373
-- Name: TABLE sso_domains; Type: COMMENT; Schema: auth; Owner: supabase_auth_admin
--

COMMENT ON TABLE auth.sso_domains IS 'Auth: Manages SSO email address domain mapping to an SSO Identity Provider.';


--
-- TOC entry 372 (class 1259 OID 16788)
-- Name: sso_providers; Type: TABLE; Schema: auth; Owner: supabase_auth_admin
--

CREATE TABLE auth.sso_providers (
    id uuid NOT NULL,
    resource_id text,
    created_at timestamp with time zone,
    updated_at timestamp with time zone,
    disabled boolean,
    CONSTRAINT "resource_id not empty" CHECK (((resource_id = NULL::text) OR (char_length(resource_id) > 0)))
);


ALTER TABLE auth.sso_providers OWNER TO supabase_auth_admin;

--
-- TOC entry 4901 (class 0 OID 0)
-- Dependencies: 372
-- Name: TABLE sso_providers; Type: COMMENT; Schema: auth; Owner: supabase_auth_admin
--

COMMENT ON TABLE auth.sso_providers IS 'Auth: Manages SSO identity provider information; see saml_providers for SAML.';


--
-- TOC entry 4902 (class 0 OID 0)
-- Dependencies: 372
-- Name: COLUMN sso_providers.resource_id; Type: COMMENT; Schema: auth; Owner: supabase_auth_admin
--

COMMENT ON COLUMN auth.sso_providers.resource_id IS 'Auth: Uniquely identifies a SSO provider according to a user-chosen resource ID (case insensitive), useful in infrastructure as code.';


--
-- TOC entry 358 (class 1259 OID 16499)
-- Name: users; Type: TABLE; Schema: auth; Owner: supabase_auth_admin
--

CREATE TABLE auth.users (
    instance_id uuid,
    id uuid NOT NULL,
    aud character varying(255),
    role character varying(255),
    email character varying(255),
    encrypted_password character varying(255),
    email_confirmed_at timestamp with time zone,
    invited_at timestamp with time zone,
    confirmation_token character varying(255),
    confirmation_sent_at timestamp with time zone,
    recovery_token character varying(255),
    recovery_sent_at timestamp with time zone,
    email_change_token_new character varying(255),
    email_change character varying(255),
    email_change_sent_at timestamp with time zone,
    last_sign_in_at timestamp with time zone,
    raw_app_meta_data jsonb,
    raw_user_meta_data jsonb,
    is_super_admin boolean,
    created_at timestamp with time zone,
    updated_at timestamp with time zone,
    phone text DEFAULT NULL::character varying,
    phone_confirmed_at timestamp with time zone,
    phone_change text DEFAULT ''::character varying,
    phone_change_token character varying(255) DEFAULT ''::character varying,
    phone_change_sent_at timestamp with time zone,
    confirmed_at timestamp with time zone GENERATED ALWAYS AS (LEAST(email_confirmed_at, phone_confirmed_at)) STORED,
    email_change_token_current character varying(255) DEFAULT ''::character varying,
    email_change_confirm_status smallint DEFAULT 0,
    banned_until timestamp with time zone,
    reauthentication_token character varying(255) DEFAULT ''::character varying,
    reauthentication_sent_at timestamp with time zone,
    is_sso_user boolean DEFAULT false NOT NULL,
    deleted_at timestamp with time zone,
    is_anonymous boolean DEFAULT false NOT NULL,
    CONSTRAINT users_email_change_confirm_status_check CHECK (((email_change_confirm_status >= 0) AND (email_change_confirm_status <= 2)))
);


ALTER TABLE auth.users OWNER TO supabase_auth_admin;

--
-- TOC entry 4904 (class 0 OID 0)
-- Dependencies: 358
-- Name: TABLE users; Type: COMMENT; Schema: auth; Owner: supabase_auth_admin
--

COMMENT ON TABLE auth.users IS 'Auth: Stores user login data within a secure schema.';


--
-- TOC entry 4905 (class 0 OID 0)
-- Dependencies: 358
-- Name: COLUMN users.is_sso_user; Type: COMMENT; Schema: auth; Owner: supabase_auth_admin
--

COMMENT ON COLUMN auth.users.is_sso_user IS 'Auth: Set this column to true when the account comes from SSO. These accounts can have duplicate emails.';


--
-- TOC entry 418 (class 1259 OID 27345)
-- Name: webauthn_challenges; Type: TABLE; Schema: auth; Owner: supabase_auth_admin
--

CREATE TABLE auth.webauthn_challenges (
    id uuid DEFAULT gen_random_uuid() NOT NULL,
    user_id uuid,
    challenge_type text NOT NULL,
    session_data jsonb NOT NULL,
    created_at timestamp with time zone DEFAULT now() NOT NULL,
    expires_at timestamp with time zone NOT NULL,
    CONSTRAINT webauthn_challenges_challenge_type_check CHECK ((challenge_type = ANY (ARRAY['signup'::text, 'registration'::text, 'authentication'::text])))
);


ALTER TABLE auth.webauthn_challenges OWNER TO supabase_auth_admin;

--
-- TOC entry 417 (class 1259 OID 27322)
-- Name: webauthn_credentials; Type: TABLE; Schema: auth; Owner: supabase_auth_admin
--

CREATE TABLE auth.webauthn_credentials (
    id uuid DEFAULT gen_random_uuid() NOT NULL,
    user_id uuid NOT NULL,
    credential_id bytea NOT NULL,
    public_key bytea NOT NULL,
    attestation_type text DEFAULT ''::text NOT NULL,
    aaguid uuid,
    sign_count bigint DEFAULT 0 NOT NULL,
    transports jsonb DEFAULT '[]'::jsonb NOT NULL,
    backup_eligible boolean DEFAULT false NOT NULL,
    backed_up boolean DEFAULT false NOT NULL,
    friendly_name text DEFAULT ''::text NOT NULL,
    created_at timestamp with time zone DEFAULT now() NOT NULL,
    updated_at timestamp with time zone DEFAULT now() NOT NULL,
    last_used_at timestamp with time zone
);


ALTER TABLE auth.webauthn_credentials OWNER TO supabase_auth_admin;

--
-- TOC entry 400 (class 1259 OID 18209)
-- Name: admin_settings; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.admin_settings (
    id uuid DEFAULT gen_random_uuid() NOT NULL,
    setting_key text NOT NULL,
    setting_value text NOT NULL,
    updated_at timestamp with time zone DEFAULT now() NOT NULL
);


ALTER TABLE public.admin_settings OWNER TO postgres;

--
-- TOC entry 403 (class 1259 OID 19445)
-- Name: affiliate_clicks; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.affiliate_clicks (
    id uuid DEFAULT gen_random_uuid() NOT NULL,
    hotel_name text NOT NULL,
    hotel_url text NOT NULL,
    affiliate_id text,
    clicked_at timestamp with time zone DEFAULT now(),
    referrer text,
    user_agent text,
    ip_address text
);


ALTER TABLE public.affiliate_clicks OWNER TO postgres;

--
-- TOC entry 398 (class 1259 OID 18180)
-- Name: booking_inquiries; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.booking_inquiries (
    id uuid DEFAULT gen_random_uuid() NOT NULL,
    name text NOT NULL,
    email text NOT NULL,
    phone text,
    course_title text NOT NULL,
    preferred_date date,
    experience_level text,
    message text,
    created_at timestamp with time zone DEFAULT now() NOT NULL,
    status text DEFAULT 'pending'::text,
    notes text,
    internal_notes text,
    deposit numeric DEFAULT 0,
    total numeric DEFAULT 0
);


ALTER TABLE public.booking_inquiries OWNER TO postgres;

--
-- TOC entry 413 (class 1259 OID 25846)
-- Name: bookings; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.bookings (
    id uuid DEFAULT gen_random_uuid() NOT NULL,
    name text NOT NULL,
    email text NOT NULL,
    phone text,
    item_type text,
    course_title text,
    preferred_date text,
    experience_level text,
    message text,
    payment_choice text,
    addons text,
    addons_json text,
    addons_total numeric,
    subtotal_amount numeric,
    total_payable_now numeric,
    internal_notes text,
    status text DEFAULT 'pending'::text,
    created_at timestamp with time zone DEFAULT now(),
    updated_at timestamp with time zone DEFAULT now(),
    deposit_amount numeric,
    total_amount numeric,
    due_amount numeric,
    bank_transfer_details text
);


ALTER TABLE public.bookings OWNER TO postgres;

--
-- TOC entry 408 (class 1259 OID 25416)
-- Name: course_prices; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.course_prices (
    id uuid DEFAULT gen_random_uuid() NOT NULL,
    course text NOT NULL,
    price_thb text NOT NULL,
    price_usd text NOT NULL,
    price_eur text NOT NULL,
    created_at timestamp with time zone DEFAULT now(),
    updated_at timestamp with time zone DEFAULT now()
);


ALTER TABLE public.course_prices OWNER TO postgres;

--
-- TOC entry 419 (class 1259 OID 27410)
-- Name: dive_site_pages; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.dive_site_pages (
    slug text NOT NULL,
    title text NOT NULL,
    content jsonb NOT NULL,
    created_at timestamp with time zone DEFAULT now(),
    updated_at timestamp with time zone DEFAULT now()
);


ALTER TABLE public.dive_site_pages OWNER TO postgres;

--
-- TOC entry 414 (class 1259 OID 27031)
-- Name: emails; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.emails (
    id uuid DEFAULT gen_random_uuid() NOT NULL,
    subject text NOT NULL,
    sender text NOT NULL,
    body text,
    assigned_to text,
    status text DEFAULT 'unread'::text,
    created_at timestamp with time zone DEFAULT now()
);


ALTER TABLE public.emails OWNER TO postgres;

--
-- TOC entry 412 (class 1259 OID 25592)
-- Name: newdiving; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.newdiving (
    id integer NOT NULL,
    dive_name text,
    location text,
    depth integer,
    created_at timestamp with time zone DEFAULT now()
);


ALTER TABLE public.newdiving OWNER TO postgres;

--
-- TOC entry 411 (class 1259 OID 25591)
-- Name: newdiving_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.newdiving_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.newdiving_id_seq OWNER TO postgres;

--
-- TOC entry 4921 (class 0 OID 0)
-- Dependencies: 411
-- Name: newdiving_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.newdiving_id_seq OWNED BY public.newdiving.id;


--
-- TOC entry 404 (class 1259 OID 25242)
-- Name: page_content; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.page_content (
    id uuid DEFAULT gen_random_uuid() NOT NULL,
    page_slug text NOT NULL,
    locale text DEFAULT 'en'::text NOT NULL,
    section_key text NOT NULL,
    content_type text DEFAULT 'text'::text NOT NULL,
    content_value text NOT NULL,
    updated_by text,
    created_at timestamp with time zone DEFAULT timezone('utc'::text, now()) NOT NULL,
    updated_at timestamp with time zone DEFAULT timezone('utc'::text, now()) NOT NULL
);


ALTER TABLE public.page_content OWNER TO postgres;

--
-- TOC entry 405 (class 1259 OID 25261)
-- Name: page_metadata; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.page_metadata (
    id uuid DEFAULT gen_random_uuid() NOT NULL,
    page_slug text NOT NULL,
    has_seo boolean DEFAULT false,
    is_secured boolean DEFAULT false,
    updated_at timestamp with time zone DEFAULT now(),
    created_at timestamp with time zone DEFAULT now(),
    draft_status text DEFAULT 'published'::text NOT NULL,
    published_at timestamp with time zone,
    CONSTRAINT page_metadata_draft_status_check CHECK ((draft_status = ANY (ARRAY['draft'::text, 'published'::text])))
);


ALTER TABLE public.page_metadata OWNER TO postgres;

--
-- TOC entry 4924 (class 0 OID 0)
-- Dependencies: 405
-- Name: TABLE page_metadata; Type: COMMENT; Schema: public; Owner: postgres
--

COMMENT ON TABLE public.page_metadata IS 'Tracks metadata and properties for all website pages';


--
-- TOC entry 407 (class 1259 OID 25296)
-- Name: page_security; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.page_security (
    id uuid DEFAULT gen_random_uuid() NOT NULL,
    page_slug text NOT NULL,
    is_secured boolean DEFAULT false,
    require_auth boolean DEFAULT false,
    require_admin boolean DEFAULT false,
    allowed_roles text[],
    ip_whitelist text,
    rate_limit_enabled boolean DEFAULT true,
    rate_limit_requests integer DEFAULT 100,
    rate_limit_window integer DEFAULT 60,
    csrf_protection boolean DEFAULT true,
    xss_protection boolean DEFAULT true,
    content_security_policy text,
    updated_by text,
    updated_at timestamp with time zone DEFAULT now(),
    created_at timestamp with time zone DEFAULT now()
);


ALTER TABLE public.page_security OWNER TO postgres;

--
-- TOC entry 4926 (class 0 OID 0)
-- Dependencies: 407
-- Name: TABLE page_security; Type: COMMENT; Schema: public; Owner: postgres
--

COMMENT ON TABLE public.page_security IS 'Manages security settings and access controls for pages';


--
-- TOC entry 406 (class 1259 OID 25275)
-- Name: page_seo; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.page_seo (
    id uuid DEFAULT gen_random_uuid() NOT NULL,
    page_slug text NOT NULL,
    meta_title text,
    meta_description text,
    meta_keywords text,
    canonical_url text,
    robots text DEFAULT 'index, follow'::text,
    og_title text,
    og_description text,
    og_image text,
    og_type text DEFAULT 'website'::text,
    twitter_card text DEFAULT 'summary_large_image'::text,
    twitter_title text,
    twitter_description text,
    twitter_image text,
    schema_type text DEFAULT 'WebPage'::text,
    schema_json jsonb,
    updated_by text,
    updated_at timestamp with time zone DEFAULT now(),
    created_at timestamp with time zone DEFAULT now()
);


ALTER TABLE public.page_seo OWNER TO postgres;

--
-- TOC entry 4928 (class 0 OID 0)
-- Dependencies: 406
-- Name: TABLE page_seo; Type: COMMENT; Schema: public; Owner: postgres
--

COMMENT ON TABLE public.page_seo IS 'Stores SEO and meta tag configurations for pages';


--
-- TOC entry 401 (class 1259 OID 18228)
-- Name: profiles; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.profiles (
    id uuid NOT NULL,
    full_name text,
    phone text,
    experience_level text,
    created_at timestamp with time zone DEFAULT now() NOT NULL,
    updated_at timestamp with time zone DEFAULT now() NOT NULL
);


ALTER TABLE public.profiles OWNER TO postgres;

--
-- TOC entry 428 (class 1259 OID 34187)
-- Name: project_tasks; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.project_tasks (
    id uuid DEFAULT gen_random_uuid() NOT NULL,
    title text NOT NULL,
    assigned_to uuid,
    status text DEFAULT 'To Do'::text NOT NULL,
    created_at timestamp with time zone DEFAULT now() NOT NULL,
    updated_at timestamp with time zone DEFAULT now() NOT NULL
);


ALTER TABLE public.project_tasks OWNER TO postgres;

--
-- TOC entry 423 (class 1259 OID 32095)
-- Name: role_change_audit; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.role_change_audit (
    id uuid DEFAULT gen_random_uuid() NOT NULL,
    action text NOT NULL,
    target_user_id uuid NOT NULL,
    role public.app_role NOT NULL,
    changed_by uuid,
    changed_by_email text,
    note text,
    created_at timestamp with time zone DEFAULT now() NOT NULL,
    CONSTRAINT role_change_audit_action_check CHECK ((action = ANY (ARRAY['add'::text, 'remove'::text])))
);


ALTER TABLE public.role_change_audit OWNER TO postgres;

--
-- TOC entry 399 (class 1259 OID 18195)
-- Name: user_roles; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.user_roles (
    id uuid DEFAULT gen_random_uuid() NOT NULL,
    user_id uuid NOT NULL,
    role public.app_role NOT NULL,
    created_at timestamp with time zone DEFAULT now() NOT NULL
);


ALTER TABLE public.user_roles OWNER TO postgres;

--
-- TOC entry 415 (class 1259 OID 27041)
-- Name: users; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.users (
    id uuid DEFAULT gen_random_uuid() NOT NULL,
    email text NOT NULL,
    name text
);


ALTER TABLE public.users OWNER TO postgres;

--
-- TOC entry 416 (class 1259 OID 27122)
-- Name: vouchers; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.vouchers (
    id uuid DEFAULT gen_random_uuid() NOT NULL,
    booking_id uuid,
    voucher_code text NOT NULL,
    generated_at timestamp with time zone DEFAULT now() NOT NULL,
    generated_by text,
    downloaded boolean DEFAULT false,
    downloaded_at timestamp with time zone,
    notes text
);


ALTER TABLE public.vouchers OWNER TO postgres;

--
-- TOC entry 396 (class 1259 OID 17429)
-- Name: messages; Type: TABLE; Schema: realtime; Owner: supabase_realtime_admin
--

CREATE TABLE realtime.messages (
    topic text NOT NULL,
    extension text NOT NULL,
    payload jsonb,
    event text,
    private boolean DEFAULT false,
    updated_at timestamp without time zone DEFAULT now() NOT NULL,
    inserted_at timestamp without time zone DEFAULT now() NOT NULL,
    id uuid DEFAULT gen_random_uuid() NOT NULL
)
PARTITION BY RANGE (inserted_at);


ALTER TABLE realtime.messages OWNER TO supabase_realtime_admin;

--
-- TOC entry 424 (class 1259 OID 32187)
-- Name: messages_2026_04_01; Type: TABLE; Schema: realtime; Owner: supabase_admin
--

CREATE TABLE realtime.messages_2026_04_01 (
    topic text NOT NULL,
    extension text NOT NULL,
    payload jsonb,
    event text,
    private boolean DEFAULT false,
    updated_at timestamp without time zone DEFAULT now() NOT NULL,
    inserted_at timestamp without time zone DEFAULT now() NOT NULL,
    id uuid DEFAULT gen_random_uuid() NOT NULL
);


ALTER TABLE realtime.messages_2026_04_01 OWNER TO supabase_admin;

--
-- TOC entry 425 (class 1259 OID 33309)
-- Name: messages_2026_04_02; Type: TABLE; Schema: realtime; Owner: supabase_admin
--

CREATE TABLE realtime.messages_2026_04_02 (
    topic text NOT NULL,
    extension text NOT NULL,
    payload jsonb,
    event text,
    private boolean DEFAULT false,
    updated_at timestamp without time zone DEFAULT now() NOT NULL,
    inserted_at timestamp without time zone DEFAULT now() NOT NULL,
    id uuid DEFAULT gen_random_uuid() NOT NULL
);


ALTER TABLE realtime.messages_2026_04_02 OWNER TO supabase_admin;

--
-- TOC entry 426 (class 1259 OID 33322)
-- Name: messages_2026_04_03; Type: TABLE; Schema: realtime; Owner: supabase_admin
--

CREATE TABLE realtime.messages_2026_04_03 (
    topic text NOT NULL,
    extension text NOT NULL,
    payload jsonb,
    event text,
    private boolean DEFAULT false,
    updated_at timestamp without time zone DEFAULT now() NOT NULL,
    inserted_at timestamp without time zone DEFAULT now() NOT NULL,
    id uuid DEFAULT gen_random_uuid() NOT NULL
);


ALTER TABLE realtime.messages_2026_04_03 OWNER TO supabase_admin;

--
-- TOC entry 427 (class 1259 OID 34151)
-- Name: messages_2026_04_04; Type: TABLE; Schema: realtime; Owner: supabase_admin
--

CREATE TABLE realtime.messages_2026_04_04 (
    topic text NOT NULL,
    extension text NOT NULL,
    payload jsonb,
    event text,
    private boolean DEFAULT false,
    updated_at timestamp without time zone DEFAULT now() NOT NULL,
    inserted_at timestamp without time zone DEFAULT now() NOT NULL,
    id uuid DEFAULT gen_random_uuid() NOT NULL
);


ALTER TABLE realtime.messages_2026_04_04 OWNER TO supabase_admin;

--
-- TOC entry 429 (class 1259 OID 35323)
-- Name: messages_2026_04_05; Type: TABLE; Schema: realtime; Owner: supabase_admin
--

CREATE TABLE realtime.messages_2026_04_05 (
    topic text NOT NULL,
    extension text NOT NULL,
    payload jsonb,
    event text,
    private boolean DEFAULT false,
    updated_at timestamp without time zone DEFAULT now() NOT NULL,
    inserted_at timestamp without time zone DEFAULT now() NOT NULL,
    id uuid DEFAULT gen_random_uuid() NOT NULL
);


ALTER TABLE realtime.messages_2026_04_05 OWNER TO supabase_admin;

--
-- TOC entry 430 (class 1259 OID 36448)
-- Name: messages_2026_04_06; Type: TABLE; Schema: realtime; Owner: supabase_admin
--

CREATE TABLE realtime.messages_2026_04_06 (
    topic text NOT NULL,
    extension text NOT NULL,
    payload jsonb,
    event text,
    private boolean DEFAULT false,
    updated_at timestamp without time zone DEFAULT now() NOT NULL,
    inserted_at timestamp without time zone DEFAULT now() NOT NULL,
    id uuid DEFAULT gen_random_uuid() NOT NULL
);


ALTER TABLE realtime.messages_2026_04_06 OWNER TO supabase_admin;

--
-- TOC entry 431 (class 1259 OID 36487)
-- Name: messages_2026_04_07; Type: TABLE; Schema: realtime; Owner: supabase_admin
--

CREATE TABLE realtime.messages_2026_04_07 (
    topic text NOT NULL,
    extension text NOT NULL,
    payload jsonb,
    event text,
    private boolean DEFAULT false,
    updated_at timestamp without time zone DEFAULT now() NOT NULL,
    inserted_at timestamp without time zone DEFAULT now() NOT NULL,
    id uuid DEFAULT gen_random_uuid() NOT NULL
);


ALTER TABLE realtime.messages_2026_04_07 OWNER TO supabase_admin;

--
-- TOC entry 390 (class 1259 OID 17267)
-- Name: schema_migrations; Type: TABLE; Schema: realtime; Owner: supabase_admin
--

CREATE TABLE realtime.schema_migrations (
    version bigint NOT NULL,
    inserted_at timestamp(0) without time zone
);


ALTER TABLE realtime.schema_migrations OWNER TO supabase_admin;

--
-- TOC entry 393 (class 1259 OID 17289)
-- Name: subscription; Type: TABLE; Schema: realtime; Owner: supabase_admin
--

CREATE TABLE realtime.subscription (
    id bigint NOT NULL,
    subscription_id uuid NOT NULL,
    entity regclass NOT NULL,
    filters realtime.user_defined_filter[] DEFAULT '{}'::realtime.user_defined_filter[] NOT NULL,
    claims jsonb NOT NULL,
    claims_role regrole GENERATED ALWAYS AS (realtime.to_regrole((claims ->> 'role'::text))) STORED NOT NULL,
    created_at timestamp without time zone DEFAULT timezone('utc'::text, now()) NOT NULL,
    action_filter text DEFAULT '*'::text,
    CONSTRAINT subscription_action_filter_check CHECK ((action_filter = ANY (ARRAY['*'::text, 'INSERT'::text, 'UPDATE'::text, 'DELETE'::text])))
);


ALTER TABLE realtime.subscription OWNER TO supabase_admin;

--
-- TOC entry 392 (class 1259 OID 17288)
-- Name: subscription_id_seq; Type: SEQUENCE; Schema: realtime; Owner: supabase_admin
--

ALTER TABLE realtime.subscription ALTER COLUMN id ADD GENERATED ALWAYS AS IDENTITY (
    SEQUENCE NAME realtime.subscription_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);


--
-- TOC entry 383 (class 1259 OID 17086)
-- Name: buckets; Type: TABLE; Schema: storage; Owner: supabase_storage_admin
--

CREATE TABLE storage.buckets (
    id text NOT NULL,
    name text NOT NULL,
    owner uuid,
    created_at timestamp with time zone DEFAULT now(),
    updated_at timestamp with time zone DEFAULT now(),
    public boolean DEFAULT false,
    avif_autodetection boolean DEFAULT false,
    file_size_limit bigint,
    allowed_mime_types text[],
    owner_id text,
    type storage.buckettype DEFAULT 'STANDARD'::storage.buckettype NOT NULL
);


ALTER TABLE storage.buckets OWNER TO supabase_storage_admin;

--
-- TOC entry 4947 (class 0 OID 0)
-- Dependencies: 383
-- Name: COLUMN buckets.owner; Type: COMMENT; Schema: storage; Owner: supabase_storage_admin
--

COMMENT ON COLUMN storage.buckets.owner IS 'Field is deprecated, use owner_id instead';


--
-- TOC entry 387 (class 1259 OID 17206)
-- Name: buckets_analytics; Type: TABLE; Schema: storage; Owner: supabase_storage_admin
--

CREATE TABLE storage.buckets_analytics (
    name text NOT NULL,
    type storage.buckettype DEFAULT 'ANALYTICS'::storage.buckettype NOT NULL,
    format text DEFAULT 'ICEBERG'::text NOT NULL,
    created_at timestamp with time zone DEFAULT now() NOT NULL,
    updated_at timestamp with time zone DEFAULT now() NOT NULL,
    id uuid DEFAULT gen_random_uuid() NOT NULL,
    deleted_at timestamp with time zone
);


ALTER TABLE storage.buckets_analytics OWNER TO supabase_storage_admin;

--
-- TOC entry 388 (class 1259 OID 17219)
-- Name: buckets_vectors; Type: TABLE; Schema: storage; Owner: supabase_storage_admin
--

CREATE TABLE storage.buckets_vectors (
    id text NOT NULL,
    type storage.buckettype DEFAULT 'VECTOR'::storage.buckettype NOT NULL,
    created_at timestamp with time zone DEFAULT now() NOT NULL,
    updated_at timestamp with time zone DEFAULT now() NOT NULL
);


ALTER TABLE storage.buckets_vectors OWNER TO supabase_storage_admin;

--
-- TOC entry 382 (class 1259 OID 17078)
-- Name: migrations; Type: TABLE; Schema: storage; Owner: supabase_storage_admin
--

CREATE TABLE storage.migrations (
    id integer NOT NULL,
    name character varying(100) NOT NULL,
    hash character varying(40) NOT NULL,
    executed_at timestamp without time zone DEFAULT CURRENT_TIMESTAMP
);


ALTER TABLE storage.migrations OWNER TO supabase_storage_admin;

--
-- TOC entry 384 (class 1259 OID 17096)
-- Name: objects; Type: TABLE; Schema: storage; Owner: supabase_storage_admin
--

CREATE TABLE storage.objects (
    id uuid DEFAULT gen_random_uuid() NOT NULL,
    bucket_id text,
    name text,
    owner uuid,
    created_at timestamp with time zone DEFAULT now(),
    updated_at timestamp with time zone DEFAULT now(),
    last_accessed_at timestamp with time zone DEFAULT now(),
    metadata jsonb,
    path_tokens text[] GENERATED ALWAYS AS (string_to_array(name, '/'::text)) STORED,
    version text,
    owner_id text,
    user_metadata jsonb
);


ALTER TABLE storage.objects OWNER TO supabase_storage_admin;

--
-- TOC entry 4951 (class 0 OID 0)
-- Dependencies: 384
-- Name: COLUMN objects.owner; Type: COMMENT; Schema: storage; Owner: supabase_storage_admin
--

COMMENT ON COLUMN storage.objects.owner IS 'Field is deprecated, use owner_id instead';


--
-- TOC entry 385 (class 1259 OID 17145)
-- Name: s3_multipart_uploads; Type: TABLE; Schema: storage; Owner: supabase_storage_admin
--

CREATE TABLE storage.s3_multipart_uploads (
    id text NOT NULL,
    in_progress_size bigint DEFAULT 0 NOT NULL,
    upload_signature text NOT NULL,
    bucket_id text NOT NULL,
    key text NOT NULL COLLATE pg_catalog."C",
    version text NOT NULL,
    owner_id text,
    created_at timestamp with time zone DEFAULT now() NOT NULL,
    user_metadata jsonb
);


ALTER TABLE storage.s3_multipart_uploads OWNER TO supabase_storage_admin;

--
-- TOC entry 386 (class 1259 OID 17159)
-- Name: s3_multipart_uploads_parts; Type: TABLE; Schema: storage; Owner: supabase_storage_admin
--

CREATE TABLE storage.s3_multipart_uploads_parts (
    id uuid DEFAULT gen_random_uuid() NOT NULL,
    upload_id text NOT NULL,
    size bigint DEFAULT 0 NOT NULL,
    part_number integer NOT NULL,
    bucket_id text NOT NULL,
    key text NOT NULL COLLATE pg_catalog."C",
    etag text NOT NULL,
    owner_id text,
    version text NOT NULL,
    created_at timestamp with time zone DEFAULT now() NOT NULL
);


ALTER TABLE storage.s3_multipart_uploads_parts OWNER TO supabase_storage_admin;

--
-- TOC entry 389 (class 1259 OID 17229)
-- Name: vector_indexes; Type: TABLE; Schema: storage; Owner: supabase_storage_admin
--

CREATE TABLE storage.vector_indexes (
    id text DEFAULT gen_random_uuid() NOT NULL,
    name text NOT NULL COLLATE pg_catalog."C",
    bucket_id text NOT NULL,
    data_type text NOT NULL,
    dimension integer NOT NULL,
    distance_metric text NOT NULL,
    metadata_configuration jsonb,
    created_at timestamp with time zone DEFAULT now() NOT NULL,
    updated_at timestamp with time zone DEFAULT now() NOT NULL
);


ALTER TABLE storage.vector_indexes OWNER TO supabase_storage_admin;

--
-- TOC entry 397 (class 1259 OID 17454)
-- Name: schema_migrations; Type: TABLE; Schema: supabase_migrations; Owner: postgres
--

CREATE TABLE supabase_migrations.schema_migrations (
    version text NOT NULL,
    statements text[],
    name text
);


ALTER TABLE supabase_migrations.schema_migrations OWNER TO postgres;

--
-- TOC entry 3894 (class 0 OID 0)
-- Name: messages_2026_04_01; Type: TABLE ATTACH; Schema: realtime; Owner: supabase_admin
--

ALTER TABLE ONLY realtime.messages ATTACH PARTITION realtime.messages_2026_04_01 FOR VALUES FROM ('2026-04-01 00:00:00') TO ('2026-04-02 00:00:00');


--
-- TOC entry 3895 (class 0 OID 0)
-- Name: messages_2026_04_02; Type: TABLE ATTACH; Schema: realtime; Owner: supabase_admin
--

ALTER TABLE ONLY realtime.messages ATTACH PARTITION realtime.messages_2026_04_02 FOR VALUES FROM ('2026-04-02 00:00:00') TO ('2026-04-03 00:00:00');


--
-- TOC entry 3896 (class 0 OID 0)
-- Name: messages_2026_04_03; Type: TABLE ATTACH; Schema: realtime; Owner: supabase_admin
--

ALTER TABLE ONLY realtime.messages ATTACH PARTITION realtime.messages_2026_04_03 FOR VALUES FROM ('2026-04-03 00:00:00') TO ('2026-04-04 00:00:00');


--
-- TOC entry 3897 (class 0 OID 0)
-- Name: messages_2026_04_04; Type: TABLE ATTACH; Schema: realtime; Owner: supabase_admin
--

ALTER TABLE ONLY realtime.messages ATTACH PARTITION realtime.messages_2026_04_04 FOR VALUES FROM ('2026-04-04 00:00:00') TO ('2026-04-05 00:00:00');


--
-- TOC entry 3898 (class 0 OID 0)
-- Name: messages_2026_04_05; Type: TABLE ATTACH; Schema: realtime; Owner: supabase_admin
--

ALTER TABLE ONLY realtime.messages ATTACH PARTITION realtime.messages_2026_04_05 FOR VALUES FROM ('2026-04-05 00:00:00') TO ('2026-04-06 00:00:00');


--
-- TOC entry 3899 (class 0 OID 0)
-- Name: messages_2026_04_06; Type: TABLE ATTACH; Schema: realtime; Owner: supabase_admin
--

ALTER TABLE ONLY realtime.messages ATTACH PARTITION realtime.messages_2026_04_06 FOR VALUES FROM ('2026-04-06 00:00:00') TO ('2026-04-07 00:00:00');


--
-- TOC entry 3900 (class 0 OID 0)
-- Name: messages_2026_04_07; Type: TABLE ATTACH; Schema: realtime; Owner: supabase_admin
--

ALTER TABLE ONLY realtime.messages ATTACH PARTITION realtime.messages_2026_04_07 FOR VALUES FROM ('2026-04-07 00:00:00') TO ('2026-04-08 00:00:00');


--
-- TOC entry 3910 (class 2604 OID 16514)
-- Name: refresh_tokens id; Type: DEFAULT; Schema: auth; Owner: supabase_auth_admin
--

ALTER TABLE ONLY auth.refresh_tokens ALTER COLUMN id SET DEFAULT nextval('auth.refresh_tokens_id_seq'::regclass);


--
-- TOC entry 4021 (class 2604 OID 25595)
-- Name: newdiving id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.newdiving ALTER COLUMN id SET DEFAULT nextval('public.newdiving_id_seq'::regclass);


--
-- TOC entry 4661 (class 0 OID 16529)
-- Dependencies: 362
-- Data for Name: audit_log_entries; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--

COPY auth.audit_log_entries (instance_id, id, payload, created_at, ip_address) FROM stdin;
00000000-0000-0000-0000-000000000000	828ed9ff-6862-484e-bc74-d1987ad36831	{"action":"logout","actor_id":"780bcf0c-f47f-498e-a129-35583df2a8a1","actor_username":"contact@prodiving.asia","actor_via_sso":false,"log_type":"account"}	2026-03-14 18:18:27.037987+00	
00000000-0000-0000-0000-000000000000	3ac35321-48ac-4b13-a3a4-080adc0da451	{"action":"login","actor_id":"780bcf0c-f47f-498e-a129-35583df2a8a1","actor_username":"contact@prodiving.asia","actor_via_sso":false,"log_type":"account","traits":{"provider":"email"}}	2026-03-14 18:18:35.544834+00	
00000000-0000-0000-0000-000000000000	f1f1e368-278c-4092-b45c-928fb1db4173	{"action":"login","actor_id":"780bcf0c-f47f-498e-a129-35583df2a8a1","actor_username":"contact@prodiving.asia","actor_via_sso":false,"log_type":"account","traits":{"provider":"email"}}	2026-03-14 18:21:16.137585+00	
00000000-0000-0000-0000-000000000000	d6bd0ee8-827b-4289-84b3-f1b36104e5a2	{"action":"logout","actor_id":"780bcf0c-f47f-498e-a129-35583df2a8a1","actor_username":"contact@prodiving.asia","actor_via_sso":false,"log_type":"account"}	2026-03-14 18:21:35.099998+00	
00000000-0000-0000-0000-000000000000	9d37b39d-e49e-43e4-99ec-4ae06f989b7f	{"action":"login","actor_id":"780bcf0c-f47f-498e-a129-35583df2a8a1","actor_username":"contact@prodiving.asia","actor_via_sso":false,"log_type":"account","traits":{"provider":"email"}}	2026-03-14 18:21:44.520962+00	
00000000-0000-0000-0000-000000000000	e630e127-578f-416a-9606-5601d139ba0c	{"action":"login","actor_id":"780bcf0c-f47f-498e-a129-35583df2a8a1","actor_username":"contact@prodiving.asia","actor_via_sso":false,"log_type":"account","traits":{"provider":"email"}}	2026-03-14 18:26:31.106656+00	
00000000-0000-0000-0000-000000000000	d589ab4e-a2ce-436b-8fbb-ac4547647c44	{"action":"login","actor_id":"780bcf0c-f47f-498e-a129-35583df2a8a1","actor_username":"contact@prodiving.asia","actor_via_sso":false,"log_type":"account","traits":{"provider":"email"}}	2026-03-14 18:27:39.348778+00	
00000000-0000-0000-0000-000000000000	bb94d2b9-7819-4809-9422-7d9de1c0e363	{"action":"login","actor_id":"780bcf0c-f47f-498e-a129-35583df2a8a1","actor_username":"contact@prodiving.asia","actor_via_sso":false,"log_type":"account","traits":{"provider":"email"}}	2026-03-14 18:33:23.125675+00	
00000000-0000-0000-0000-000000000000	29643f23-72be-402f-ad01-64f96957d8ec	{"action":"login","actor_id":"780bcf0c-f47f-498e-a129-35583df2a8a1","actor_username":"contact@prodiving.asia","actor_via_sso":false,"log_type":"account","traits":{"provider":"email"}}	2026-03-14 19:24:53.225661+00	
00000000-0000-0000-0000-000000000000	2207a53e-1331-4ff0-9966-c1098cfe8ada	{"action":"token_refreshed","actor_id":"780bcf0c-f47f-498e-a129-35583df2a8a1","actor_username":"contact@prodiving.asia","actor_via_sso":false,"log_type":"token"}	2026-03-14 19:26:06.052038+00	
00000000-0000-0000-0000-000000000000	16dc91c4-6f85-4bb9-be25-73e4a26e3e4a	{"action":"token_revoked","actor_id":"780bcf0c-f47f-498e-a129-35583df2a8a1","actor_username":"contact@prodiving.asia","actor_via_sso":false,"log_type":"token"}	2026-03-14 19:26:06.066943+00	
00000000-0000-0000-0000-000000000000	cb9170d1-3e14-4bf9-baf2-6eb50cb438f4	{"action":"login","actor_id":"780bcf0c-f47f-498e-a129-35583df2a8a1","actor_username":"contact@prodiving.asia","actor_via_sso":false,"log_type":"account","traits":{"provider":"email"}}	2026-03-14 19:27:14.905581+00	
00000000-0000-0000-0000-000000000000	674da43e-6a34-467d-9ae0-e27218003bff	{"action":"login","actor_id":"780bcf0c-f47f-498e-a129-35583df2a8a1","actor_username":"contact@prodiving.asia","actor_via_sso":false,"log_type":"account","traits":{"provider":"email"}}	2026-03-14 19:29:45.058141+00	
00000000-0000-0000-0000-000000000000	928be6eb-e79c-41aa-a8f0-5f864cce0a92	{"action":"login","actor_id":"780bcf0c-f47f-498e-a129-35583df2a8a1","actor_username":"contact@prodiving.asia","actor_via_sso":false,"log_type":"account","traits":{"provider":"email"}}	2026-03-14 19:33:33.310429+00	
00000000-0000-0000-0000-000000000000	b6391a67-8426-4e9d-8cb0-295bd7f38892	{"action":"logout","actor_id":"780bcf0c-f47f-498e-a129-35583df2a8a1","actor_username":"contact@prodiving.asia","actor_via_sso":false,"log_type":"account"}	2026-03-14 19:47:38.685551+00	
00000000-0000-0000-0000-000000000000	29aa23f1-3e59-4f00-96a3-bd37f9de030c	{"action":"login","actor_id":"780bcf0c-f47f-498e-a129-35583df2a8a1","actor_username":"contact@prodiving.asia","actor_via_sso":false,"log_type":"account","traits":{"provider":"email"}}	2026-03-14 19:47:43.980181+00	
00000000-0000-0000-0000-000000000000	8e155e9e-e5eb-4c74-b898-2e1e1d45b139	{"action":"login","actor_id":"780bcf0c-f47f-498e-a129-35583df2a8a1","actor_username":"contact@prodiving.asia","actor_via_sso":false,"log_type":"account","traits":{"provider":"email"}}	2026-03-14 19:53:41.295178+00	
00000000-0000-0000-0000-000000000000	df3d88a6-42ab-45b2-8936-2f2b840f2cad	{"action":"login","actor_id":"780bcf0c-f47f-498e-a129-35583df2a8a1","actor_username":"contact@prodiving.asia","actor_via_sso":false,"log_type":"account","traits":{"provider":"email"}}	2026-03-14 19:57:30.04347+00	
00000000-0000-0000-0000-000000000000	a30f9363-28bc-4408-bb5d-826f15888c22	{"action":"token_refreshed","actor_id":"780bcf0c-f47f-498e-a129-35583df2a8a1","actor_username":"contact@prodiving.asia","actor_via_sso":false,"log_type":"token"}	2026-03-15 03:52:29.284075+00	
00000000-0000-0000-0000-000000000000	78b45d94-7379-482a-9659-3437d86a4281	{"action":"token_revoked","actor_id":"780bcf0c-f47f-498e-a129-35583df2a8a1","actor_username":"contact@prodiving.asia","actor_via_sso":false,"log_type":"token"}	2026-03-15 03:52:29.303486+00	
00000000-0000-0000-0000-000000000000	0e3f6092-e263-48ae-a462-e0507e62da76	{"action":"login","actor_id":"780bcf0c-f47f-498e-a129-35583df2a8a1","actor_username":"contact@prodiving.asia","actor_via_sso":false,"log_type":"account","traits":{"provider":"email"}}	2026-03-15 06:35:17.716935+00	
00000000-0000-0000-0000-000000000000	caebc1cc-62d6-4adb-a512-e6c326f8dfd3	{"action":"token_refreshed","actor_id":"780bcf0c-f47f-498e-a129-35583df2a8a1","actor_username":"contact@prodiving.asia","actor_via_sso":false,"log_type":"token"}	2026-03-15 06:35:48.427017+00	
00000000-0000-0000-0000-000000000000	5206ff53-9cea-465d-9896-dfe809cc4ef5	{"action":"token_revoked","actor_id":"780bcf0c-f47f-498e-a129-35583df2a8a1","actor_username":"contact@prodiving.asia","actor_via_sso":false,"log_type":"token"}	2026-03-15 06:35:48.439594+00	
00000000-0000-0000-0000-000000000000	5f868c21-fcde-4776-9db1-36ec97fafe8d	{"action":"login","actor_id":"780bcf0c-f47f-498e-a129-35583df2a8a1","actor_username":"contact@prodiving.asia","actor_via_sso":false,"log_type":"account","traits":{"provider":"email"}}	2026-03-15 06:39:52.656071+00	
00000000-0000-0000-0000-000000000000	38ef1eb1-e77b-4975-ac28-9fc5b0bf3a82	{"action":"logout","actor_id":"780bcf0c-f47f-498e-a129-35583df2a8a1","actor_username":"contact@prodiving.asia","actor_via_sso":false,"log_type":"account"}	2026-03-15 07:27:20.297377+00	
00000000-0000-0000-0000-000000000000	bff1d22e-0f4a-48e3-b57e-7b5c035aadfa	{"action":"login","actor_id":"780bcf0c-f47f-498e-a129-35583df2a8a1","actor_username":"contact@prodiving.asia","actor_via_sso":false,"log_type":"account","traits":{"provider":"email"}}	2026-03-15 07:27:26.420729+00	
00000000-0000-0000-0000-000000000000	2a13a49b-b358-4a0b-82ec-4802ea99c6ba	{"action":"login","actor_id":"780bcf0c-f47f-498e-a129-35583df2a8a1","actor_username":"contact@prodiving.asia","actor_via_sso":false,"log_type":"account","traits":{"provider":"email"}}	2026-03-15 08:04:28.990967+00	
00000000-0000-0000-0000-000000000000	3844a488-9379-4bb3-90a6-8401c7be5a0e	{"action":"login","actor_id":"780bcf0c-f47f-498e-a129-35583df2a8a1","actor_username":"contact@prodiving.asia","actor_via_sso":false,"log_type":"account","traits":{"provider":"email"}}	2026-03-15 08:04:53.157162+00	
00000000-0000-0000-0000-000000000000	69067b7e-f50c-4eb9-bbf1-7851c15afb1f	{"action":"login","actor_id":"780bcf0c-f47f-498e-a129-35583df2a8a1","actor_username":"contact@prodiving.asia","actor_via_sso":false,"log_type":"account","traits":{"provider":"email"}}	2026-03-15 08:27:05.285488+00	
00000000-0000-0000-0000-000000000000	28a99c2d-aeb2-4891-835b-aa416aa5768c	{"action":"token_refreshed","actor_id":"780bcf0c-f47f-498e-a129-35583df2a8a1","actor_username":"contact@prodiving.asia","actor_via_sso":false,"log_type":"token"}	2026-03-15 08:33:02.405167+00	
00000000-0000-0000-0000-000000000000	0c3151cf-538e-49fc-8378-a6fff00f6a7b	{"action":"token_revoked","actor_id":"780bcf0c-f47f-498e-a129-35583df2a8a1","actor_username":"contact@prodiving.asia","actor_via_sso":false,"log_type":"token"}	2026-03-15 08:33:02.420041+00	
00000000-0000-0000-0000-000000000000	367b393a-d51d-4e6e-97cc-8814dc1f057f	{"action":"login","actor_id":"780bcf0c-f47f-498e-a129-35583df2a8a1","actor_username":"contact@prodiving.asia","actor_via_sso":false,"log_type":"account","traits":{"provider":"email"}}	2026-03-15 08:34:12.48803+00	
00000000-0000-0000-0000-000000000000	51db7d28-01f0-4520-8c61-3822e2d76ec3	{"action":"login","actor_id":"780bcf0c-f47f-498e-a129-35583df2a8a1","actor_username":"contact@prodiving.asia","actor_via_sso":false,"log_type":"account","traits":{"provider":"email"}}	2026-03-15 08:36:41.460688+00	
00000000-0000-0000-0000-000000000000	1ac4ffc7-2c58-4861-a85e-b28b09de341c	{"action":"logout","actor_id":"780bcf0c-f47f-498e-a129-35583df2a8a1","actor_username":"contact@prodiving.asia","actor_via_sso":false,"log_type":"account"}	2026-03-15 09:02:35.796049+00	
00000000-0000-0000-0000-000000000000	e9bdba0b-9d96-4967-b3ae-40f17e5a86bf	{"action":"login","actor_id":"780bcf0c-f47f-498e-a129-35583df2a8a1","actor_username":"contact@prodiving.asia","actor_via_sso":false,"log_type":"account","traits":{"provider":"email"}}	2026-03-15 09:02:42.22055+00	
00000000-0000-0000-0000-000000000000	6639dcf8-7af9-4566-9abf-389d636a6520	{"action":"login","actor_id":"780bcf0c-f47f-498e-a129-35583df2a8a1","actor_username":"contact@prodiving.asia","actor_via_sso":false,"log_type":"account","traits":{"provider":"email"}}	2026-03-15 09:11:34.776034+00	
00000000-0000-0000-0000-000000000000	807bf3d8-7781-4bae-b213-4b715f93f5d4	{"action":"login","actor_id":"780bcf0c-f47f-498e-a129-35583df2a8a1","actor_username":"contact@prodiving.asia","actor_via_sso":false,"log_type":"account","traits":{"provider":"email"}}	2026-03-15 09:26:05.52466+00	
00000000-0000-0000-0000-000000000000	c3e4a9e3-6760-458d-b265-6cfd7b210d73	{"action":"token_refreshed","actor_id":"780bcf0c-f47f-498e-a129-35583df2a8a1","actor_username":"contact@prodiving.asia","actor_via_sso":false,"log_type":"token"}	2026-03-15 10:12:48.957322+00	
00000000-0000-0000-0000-000000000000	5adf66bf-6fb1-4fff-b47f-32fa5ab7a479	{"action":"token_revoked","actor_id":"780bcf0c-f47f-498e-a129-35583df2a8a1","actor_username":"contact@prodiving.asia","actor_via_sso":false,"log_type":"token"}	2026-03-15 10:12:48.975021+00	
00000000-0000-0000-0000-000000000000	9b4a721d-fb64-4e16-9877-da38c7c8761e	{"action":"token_refreshed","actor_id":"780bcf0c-f47f-498e-a129-35583df2a8a1","actor_username":"contact@prodiving.asia","actor_via_sso":false,"log_type":"token"}	2026-03-15 10:28:06.335736+00	
00000000-0000-0000-0000-000000000000	f86bdbdb-7102-4912-81ab-ba0ab7562ede	{"action":"token_revoked","actor_id":"780bcf0c-f47f-498e-a129-35583df2a8a1","actor_username":"contact@prodiving.asia","actor_via_sso":false,"log_type":"token"}	2026-03-15 10:28:06.346848+00	
00000000-0000-0000-0000-000000000000	030789ea-2011-4559-a458-0fe238a343fb	{"action":"login","actor_id":"780bcf0c-f47f-498e-a129-35583df2a8a1","actor_username":"contact@prodiving.asia","actor_via_sso":false,"log_type":"account","traits":{"provider":"email"}}	2026-03-15 10:44:14.847886+00	
00000000-0000-0000-0000-000000000000	55fcb345-7c0c-49d1-b15d-c3821315722e	{"action":"login","actor_id":"780bcf0c-f47f-498e-a129-35583df2a8a1","actor_username":"contact@prodiving.asia","actor_via_sso":false,"log_type":"account","traits":{"provider":"email"}}	2026-03-15 10:46:05.389314+00	
00000000-0000-0000-0000-000000000000	20d15187-0409-43b0-b3a9-cc3b308bf06b	{"action":"login","actor_id":"780bcf0c-f47f-498e-a129-35583df2a8a1","actor_username":"contact@prodiving.asia","actor_via_sso":false,"log_type":"account","traits":{"provider":"email"}}	2026-03-15 10:50:43.332855+00	
00000000-0000-0000-0000-000000000000	ff288a51-b6b7-44c2-b2ad-e90843162c93	{"action":"token_refreshed","actor_id":"780bcf0c-f47f-498e-a129-35583df2a8a1","actor_username":"contact@prodiving.asia","actor_via_sso":false,"log_type":"token"}	2026-03-15 11:11:53.298653+00	
00000000-0000-0000-0000-000000000000	2b74b900-c38c-4bb8-ae2f-0edaed25313d	{"action":"token_revoked","actor_id":"780bcf0c-f47f-498e-a129-35583df2a8a1","actor_username":"contact@prodiving.asia","actor_via_sso":false,"log_type":"token"}	2026-03-15 11:11:53.323035+00	
00000000-0000-0000-0000-000000000000	61918b2f-29f0-4ffc-aa2d-65a85e762a4f	{"action":"token_refreshed","actor_id":"780bcf0c-f47f-498e-a129-35583df2a8a1","actor_username":"contact@prodiving.asia","actor_via_sso":false,"log_type":"token"}	2026-03-15 11:28:42.573337+00	
00000000-0000-0000-0000-000000000000	320453f1-40ce-41ef-af0b-4f7979660029	{"action":"token_revoked","actor_id":"780bcf0c-f47f-498e-a129-35583df2a8a1","actor_username":"contact@prodiving.asia","actor_via_sso":false,"log_type":"token"}	2026-03-15 11:28:42.585183+00	
00000000-0000-0000-0000-000000000000	59b912d6-e613-4815-bdb4-c897940649aa	{"action":"login","actor_id":"780bcf0c-f47f-498e-a129-35583df2a8a1","actor_username":"contact@prodiving.asia","actor_via_sso":false,"log_type":"account","traits":{"provider":"email"}}	2026-03-15 11:31:33.026111+00	
00000000-0000-0000-0000-000000000000	af4ff2d9-0281-4a3c-b748-ab7767d4e415	{"action":"login","actor_id":"780bcf0c-f47f-498e-a129-35583df2a8a1","actor_username":"contact@prodiving.asia","actor_via_sso":false,"log_type":"account","traits":{"provider":"email"}}	2026-03-15 11:46:17.653666+00	
00000000-0000-0000-0000-000000000000	c6659b8e-2cd7-4e72-a58a-e28d5c4e36cc	{"action":"login","actor_id":"780bcf0c-f47f-498e-a129-35583df2a8a1","actor_username":"contact@prodiving.asia","actor_via_sso":false,"log_type":"account","traits":{"provider":"email"}}	2026-03-15 11:55:06.959932+00	
00000000-0000-0000-0000-000000000000	7379f3f2-a1d3-4c4a-a037-0c82d43b4c88	{"action":"token_refreshed","actor_id":"780bcf0c-f47f-498e-a129-35583df2a8a1","actor_username":"contact@prodiving.asia","actor_via_sso":false,"log_type":"token"}	2026-03-15 12:12:04.620601+00	
00000000-0000-0000-0000-000000000000	c6b86d10-f7e4-4a67-bade-1c3bf54ec43c	{"action":"token_revoked","actor_id":"780bcf0c-f47f-498e-a129-35583df2a8a1","actor_username":"contact@prodiving.asia","actor_via_sso":false,"log_type":"token"}	2026-03-15 12:12:04.640157+00	
00000000-0000-0000-0000-000000000000	b95650f0-efd6-4927-8919-becef6847391	{"action":"token_refreshed","actor_id":"780bcf0c-f47f-498e-a129-35583df2a8a1","actor_username":"contact@prodiving.asia","actor_via_sso":false,"log_type":"token"}	2026-03-15 12:27:08.633565+00	
00000000-0000-0000-0000-000000000000	828f0ef6-8d30-48ae-b5fc-0e581ae472c6	{"action":"token_revoked","actor_id":"780bcf0c-f47f-498e-a129-35583df2a8a1","actor_username":"contact@prodiving.asia","actor_via_sso":false,"log_type":"token"}	2026-03-15 12:27:08.649947+00	
00000000-0000-0000-0000-000000000000	2ecf77cf-9842-443d-9b3d-67201afbb09b	{"action":"login","actor_id":"780bcf0c-f47f-498e-a129-35583df2a8a1","actor_username":"contact@prodiving.asia","actor_via_sso":false,"log_type":"account","traits":{"provider":"email"}}	2026-03-15 12:38:29.333762+00	
00000000-0000-0000-0000-000000000000	576c027f-0a5d-48c0-ba63-bb0853315153	{"action":"token_refreshed","actor_id":"780bcf0c-f47f-498e-a129-35583df2a8a1","actor_username":"contact@prodiving.asia","actor_via_sso":false,"log_type":"token"}	2026-03-15 13:21:37.404847+00	
00000000-0000-0000-0000-000000000000	0c6f4041-5bd0-4219-8866-248190c4bccf	{"action":"token_revoked","actor_id":"780bcf0c-f47f-498e-a129-35583df2a8a1","actor_username":"contact@prodiving.asia","actor_via_sso":false,"log_type":"token"}	2026-03-15 13:21:37.419535+00	
00000000-0000-0000-0000-000000000000	975db0e4-5cfe-49b7-8466-4fb357af0e16	{"action":"token_refreshed","actor_id":"780bcf0c-f47f-498e-a129-35583df2a8a1","actor_username":"contact@prodiving.asia","actor_via_sso":false,"log_type":"token"}	2026-03-15 13:27:54.12292+00	
00000000-0000-0000-0000-000000000000	25a0286e-753d-4f43-854a-c774784eace3	{"action":"token_revoked","actor_id":"780bcf0c-f47f-498e-a129-35583df2a8a1","actor_username":"contact@prodiving.asia","actor_via_sso":false,"log_type":"token"}	2026-03-15 13:27:54.130406+00	
00000000-0000-0000-0000-000000000000	2fb444de-252b-4bc2-9c14-c91b07b3a983	{"action":"login","actor_id":"780bcf0c-f47f-498e-a129-35583df2a8a1","actor_username":"contact@prodiving.asia","actor_via_sso":false,"log_type":"account","traits":{"provider":"email"}}	2026-03-15 13:33:00.652582+00	
00000000-0000-0000-0000-000000000000	a4e53eb3-0814-4441-8fcc-0479adca613a	{"action":"logout","actor_id":"780bcf0c-f47f-498e-a129-35583df2a8a1","actor_username":"contact@prodiving.asia","actor_via_sso":false,"log_type":"account"}	2026-03-15 13:46:27.242128+00	
00000000-0000-0000-0000-000000000000	304b5542-1e4b-4b14-b38f-b811fad931ab	{"action":"login","actor_id":"8f3dd95e-2571-4b71-9058-dc706c7e2ec2","actor_username":"admin@login.com","actor_via_sso":false,"log_type":"account","traits":{"provider":"email"}}	2026-03-15 14:20:50.01487+00	
00000000-0000-0000-0000-000000000000	e51f337b-fb5a-40ac-acdb-72598c18a943	{"action":"logout","actor_id":"8f3dd95e-2571-4b71-9058-dc706c7e2ec2","actor_username":"admin@login.com","actor_via_sso":false,"log_type":"account"}	2026-03-15 14:25:58.551364+00	
00000000-0000-0000-0000-000000000000	01a9cc97-cd67-4b2c-9ccf-93ef35a0a31d	{"action":"login","actor_id":"8f3dd95e-2571-4b71-9058-dc706c7e2ec2","actor_username":"admin@login.com","actor_via_sso":false,"log_type":"account","traits":{"provider":"email"}}	2026-03-15 14:26:06.022529+00	
00000000-0000-0000-0000-000000000000	030868fa-480d-48aa-add2-24abe8a5201e	{"action":"logout","actor_id":"8f3dd95e-2571-4b71-9058-dc706c7e2ec2","actor_username":"admin@login.com","actor_via_sso":false,"log_type":"account"}	2026-03-15 14:31:24.326778+00	
00000000-0000-0000-0000-000000000000	36a59748-7fe6-4351-8710-ad0fcc2de092	{"action":"login","actor_id":"8f3dd95e-2571-4b71-9058-dc706c7e2ec2","actor_username":"admin@login.com","actor_via_sso":false,"log_type":"account","traits":{"provider":"email"}}	2026-03-15 14:31:38.96803+00	
00000000-0000-0000-0000-000000000000	9cab751f-7840-467a-b023-82e3ef0b3380	{"action":"logout","actor_id":"8f3dd95e-2571-4b71-9058-dc706c7e2ec2","actor_username":"admin@login.com","actor_via_sso":false,"log_type":"account"}	2026-03-15 14:31:53.750274+00	
00000000-0000-0000-0000-000000000000	ab7980dc-c68a-4376-af88-0deb4043a810	{"action":"login","actor_id":"780bcf0c-f47f-498e-a129-35583df2a8a1","actor_username":"contact@prodiving.asia","actor_via_sso":false,"log_type":"account","traits":{"provider":"email"}}	2026-03-15 14:32:03.343424+00	
00000000-0000-0000-0000-000000000000	3f749ded-91c9-477e-a74c-26445eb26a04	{"action":"token_refreshed","actor_id":"780bcf0c-f47f-498e-a129-35583df2a8a1","actor_username":"contact@prodiving.asia","actor_via_sso":false,"log_type":"token"}	2026-03-16 12:08:48.816402+00	
00000000-0000-0000-0000-000000000000	59ed56e6-e8c5-4828-a9d2-f80868866dfa	{"action":"token_revoked","actor_id":"780bcf0c-f47f-498e-a129-35583df2a8a1","actor_username":"contact@prodiving.asia","actor_via_sso":false,"log_type":"token"}	2026-03-16 12:08:48.835996+00	
00000000-0000-0000-0000-000000000000	4c96c898-5af6-4e44-8249-328439515053	{"action":"login","actor_id":"780bcf0c-f47f-498e-a129-35583df2a8a1","actor_username":"contact@prodiving.asia","actor_via_sso":false,"log_type":"account","traits":{"provider":"email"}}	2026-03-16 14:00:29.012406+00	
00000000-0000-0000-0000-000000000000	8d0b239c-e377-4f16-9c18-cfad6a6e6618	{"action":"login","actor_id":"3a679996-7773-4b9b-a3fe-93c031266ef9","actor_username":"peter@onemedia.asia","actor_via_sso":false,"log_type":"account","traits":{"provider":"email"}}	2026-03-16 14:01:43.910271+00	
00000000-0000-0000-0000-000000000000	3e1491ed-403c-45e8-8dda-4b0a24f448eb	{"action":"token_refreshed","actor_id":"780bcf0c-f47f-498e-a129-35583df2a8a1","actor_username":"contact@prodiving.asia","actor_via_sso":false,"log_type":"token"}	2026-03-16 14:09:08.547031+00	
00000000-0000-0000-0000-000000000000	d60b93ea-ea82-41b4-857d-5cdd1edb54b9	{"action":"token_revoked","actor_id":"780bcf0c-f47f-498e-a129-35583df2a8a1","actor_username":"contact@prodiving.asia","actor_via_sso":false,"log_type":"token"}	2026-03-16 14:09:08.55334+00	
00000000-0000-0000-0000-000000000000	cccf25ea-6e05-4210-bdcc-350d5f7ad652	{"action":"login","actor_id":"780bcf0c-f47f-498e-a129-35583df2a8a1","actor_username":"contact@prodiving.asia","actor_via_sso":false,"log_type":"account","traits":{"provider":"email"}}	2026-03-16 14:28:37.676892+00	
00000000-0000-0000-0000-000000000000	24d1a511-0aa8-415b-a4fc-eb3e7d36aa0e	{"action":"login","actor_id":"780bcf0c-f47f-498e-a129-35583df2a8a1","actor_username":"contact@prodiving.asia","actor_via_sso":false,"log_type":"account","traits":{"provider":"email"}}	2026-03-16 15:01:14.367714+00	
00000000-0000-0000-0000-000000000000	2b2aacc1-cb9a-4e50-8e7b-7e0e1ed85f01	{"action":"token_refreshed","actor_id":"780bcf0c-f47f-498e-a129-35583df2a8a1","actor_username":"contact@prodiving.asia","actor_via_sso":false,"log_type":"token"}	2026-03-16 15:07:35.646186+00	
00000000-0000-0000-0000-000000000000	98577fb0-e1a5-43bb-9e0d-329442618faf	{"action":"token_revoked","actor_id":"780bcf0c-f47f-498e-a129-35583df2a8a1","actor_username":"contact@prodiving.asia","actor_via_sso":false,"log_type":"token"}	2026-03-16 15:07:35.670115+00	
00000000-0000-0000-0000-000000000000	1baf55f9-cd45-4791-abdd-f0e800c5c9d5	{"action":"token_refreshed","actor_id":"780bcf0c-f47f-498e-a129-35583df2a8a1","actor_username":"contact@prodiving.asia","actor_via_sso":false,"log_type":"token"}	2026-03-16 16:05:59.56371+00	
00000000-0000-0000-0000-000000000000	f9f6f443-c630-41a0-bf0e-10ea0b718b47	{"action":"token_revoked","actor_id":"780bcf0c-f47f-498e-a129-35583df2a8a1","actor_username":"contact@prodiving.asia","actor_via_sso":false,"log_type":"token"}	2026-03-16 16:05:59.593198+00	
00000000-0000-0000-0000-000000000000	5605a055-0d44-4795-b374-81986d7aab4a	{"action":"token_refreshed","actor_id":"780bcf0c-f47f-498e-a129-35583df2a8a1","actor_username":"contact@prodiving.asia","actor_via_sso":false,"log_type":"token"}	2026-03-16 17:04:16.162031+00	
00000000-0000-0000-0000-000000000000	83d3db32-d225-427e-ad76-14a37e22fec6	{"action":"token_revoked","actor_id":"780bcf0c-f47f-498e-a129-35583df2a8a1","actor_username":"contact@prodiving.asia","actor_via_sso":false,"log_type":"token"}	2026-03-16 17:04:16.188929+00	
00000000-0000-0000-0000-000000000000	1076a96e-a04f-4edc-82e1-78172e9c1b75	{"action":"login","actor_id":"780bcf0c-f47f-498e-a129-35583df2a8a1","actor_username":"contact@prodiving.asia","actor_via_sso":false,"log_type":"account","traits":{"provider":"email"}}	2026-03-16 17:06:14.595007+00	
00000000-0000-0000-0000-000000000000	b47465cd-be9b-4b24-8f1f-d58ae5e7a59a	{"action":"login","actor_id":"780bcf0c-f47f-498e-a129-35583df2a8a1","actor_username":"contact@prodiving.asia","actor_via_sso":false,"log_type":"account","traits":{"provider":"email"}}	2026-03-16 17:17:04.803611+00	
00000000-0000-0000-0000-000000000000	5ab54369-122e-4cc9-9aaa-be7fd46ae00b	{"action":"token_refreshed","actor_id":"780bcf0c-f47f-498e-a129-35583df2a8a1","actor_username":"contact@prodiving.asia","actor_via_sso":false,"log_type":"token"}	2026-03-16 18:02:39.686847+00	
00000000-0000-0000-0000-000000000000	9685a088-3af1-400e-a439-3cf78529150d	{"action":"token_revoked","actor_id":"780bcf0c-f47f-498e-a129-35583df2a8a1","actor_username":"contact@prodiving.asia","actor_via_sso":false,"log_type":"token"}	2026-03-16 18:02:39.703721+00	
00000000-0000-0000-0000-000000000000	7dd8520b-44d4-4579-ac18-8c73f41b6107	{"action":"token_refreshed","actor_id":"780bcf0c-f47f-498e-a129-35583df2a8a1","actor_username":"contact@prodiving.asia","actor_via_sso":false,"log_type":"token"}	2026-03-16 18:15:19.41544+00	
00000000-0000-0000-0000-000000000000	13be76b2-0590-41f2-8d23-5753de4a273e	{"action":"token_revoked","actor_id":"780bcf0c-f47f-498e-a129-35583df2a8a1","actor_username":"contact@prodiving.asia","actor_via_sso":false,"log_type":"token"}	2026-03-16 18:15:19.43264+00	
00000000-0000-0000-0000-000000000000	220218e2-2dcf-4ef9-8f61-f456da53b4cd	{"action":"token_refreshed","actor_id":"780bcf0c-f47f-498e-a129-35583df2a8a1","actor_username":"contact@prodiving.asia","actor_via_sso":false,"log_type":"token"}	2026-03-16 18:16:57.866677+00	
00000000-0000-0000-0000-000000000000	f844c332-738e-4a36-be70-3e76361561ad	{"action":"token_revoked","actor_id":"780bcf0c-f47f-498e-a129-35583df2a8a1","actor_username":"contact@prodiving.asia","actor_via_sso":false,"log_type":"token"}	2026-03-16 18:16:57.872725+00	
00000000-0000-0000-0000-000000000000	85b71a06-bc5d-48e4-9f17-75a0784fdbe2	{"action":"token_refreshed","actor_id":"780bcf0c-f47f-498e-a129-35583df2a8a1","actor_username":"contact@prodiving.asia","actor_via_sso":false,"log_type":"token"}	2026-03-16 19:01:08.065765+00	
00000000-0000-0000-0000-000000000000	93572d06-9dc0-4e33-aab1-df9edbe13a69	{"action":"token_revoked","actor_id":"780bcf0c-f47f-498e-a129-35583df2a8a1","actor_username":"contact@prodiving.asia","actor_via_sso":false,"log_type":"token"}	2026-03-16 19:01:08.083803+00	
00000000-0000-0000-0000-000000000000	c846c100-8340-4570-bb78-b9a01f5f98c6	{"action":"token_refreshed","actor_id":"780bcf0c-f47f-498e-a129-35583df2a8a1","actor_username":"contact@prodiving.asia","actor_via_sso":false,"log_type":"token"}	2026-03-16 19:15:23.579856+00	
00000000-0000-0000-0000-000000000000	4a4a456d-6108-4f6c-b30e-78d463f22108	{"action":"token_revoked","actor_id":"780bcf0c-f47f-498e-a129-35583df2a8a1","actor_username":"contact@prodiving.asia","actor_via_sso":false,"log_type":"token"}	2026-03-16 19:15:23.598729+00	
00000000-0000-0000-0000-000000000000	429be746-d4c2-4fb3-9842-68587171c10e	{"action":"token_refreshed","actor_id":"780bcf0c-f47f-498e-a129-35583df2a8a1","actor_username":"contact@prodiving.asia","actor_via_sso":false,"log_type":"token"}	2026-03-16 19:17:43.806505+00	
00000000-0000-0000-0000-000000000000	4374ffa8-d94b-4448-b477-b62b7121434a	{"action":"token_revoked","actor_id":"780bcf0c-f47f-498e-a129-35583df2a8a1","actor_username":"contact@prodiving.asia","actor_via_sso":false,"log_type":"token"}	2026-03-16 19:17:43.820526+00	
00000000-0000-0000-0000-000000000000	4dd2b60e-b674-4bf6-b0e9-4f12560fba35	{"action":"token_refreshed","actor_id":"780bcf0c-f47f-498e-a129-35583df2a8a1","actor_username":"contact@prodiving.asia","actor_via_sso":false,"log_type":"token"}	2026-03-16 20:05:55.597881+00	
00000000-0000-0000-0000-000000000000	ce79d1ed-75d2-4d9c-91b5-b05c058ca4d1	{"action":"token_revoked","actor_id":"780bcf0c-f47f-498e-a129-35583df2a8a1","actor_username":"contact@prodiving.asia","actor_via_sso":false,"log_type":"token"}	2026-03-16 20:05:55.616964+00	
00000000-0000-0000-0000-000000000000	46f6351a-f131-47ae-881b-e34f06aeab07	{"action":"token_refreshed","actor_id":"780bcf0c-f47f-498e-a129-35583df2a8a1","actor_username":"contact@prodiving.asia","actor_via_sso":false,"log_type":"token"}	2026-03-16 20:22:37.979543+00	
00000000-0000-0000-0000-000000000000	5e5817e3-3271-4f92-96c2-55e3ce2308d5	{"action":"token_revoked","actor_id":"780bcf0c-f47f-498e-a129-35583df2a8a1","actor_username":"contact@prodiving.asia","actor_via_sso":false,"log_type":"token"}	2026-03-16 20:22:37.995552+00	
00000000-0000-0000-0000-000000000000	1005fc1c-ec2d-4c61-b874-b01cf45abc72	{"action":"token_refreshed","actor_id":"780bcf0c-f47f-498e-a129-35583df2a8a1","actor_username":"contact@prodiving.asia","actor_via_sso":false,"log_type":"token"}	2026-03-16 20:24:32.663991+00	
00000000-0000-0000-0000-000000000000	ee417d10-8add-40c9-ad12-1398a5ab86c6	{"action":"token_revoked","actor_id":"780bcf0c-f47f-498e-a129-35583df2a8a1","actor_username":"contact@prodiving.asia","actor_via_sso":false,"log_type":"token"}	2026-03-16 20:24:32.684837+00	
00000000-0000-0000-0000-000000000000	b09992ac-0171-4733-bf43-16d281917461	{"action":"token_refreshed","actor_id":"780bcf0c-f47f-498e-a129-35583df2a8a1","actor_username":"contact@prodiving.asia","actor_via_sso":false,"log_type":"token"}	2026-03-16 21:04:25.485788+00	
00000000-0000-0000-0000-000000000000	dc46c5bd-845c-48e3-b9a8-a6def166f24f	{"action":"token_revoked","actor_id":"780bcf0c-f47f-498e-a129-35583df2a8a1","actor_username":"contact@prodiving.asia","actor_via_sso":false,"log_type":"token"}	2026-03-16 21:04:25.506711+00	
00000000-0000-0000-0000-000000000000	70a8dae9-973b-4a23-aaaa-e9614a194396	{"action":"token_refreshed","actor_id":"780bcf0c-f47f-498e-a129-35583df2a8a1","actor_username":"contact@prodiving.asia","actor_via_sso":false,"log_type":"token"}	2026-03-16 21:37:53.356769+00	
00000000-0000-0000-0000-000000000000	555c5bce-ceb5-420d-8027-097b7f02bf5b	{"action":"token_revoked","actor_id":"780bcf0c-f47f-498e-a129-35583df2a8a1","actor_username":"contact@prodiving.asia","actor_via_sso":false,"log_type":"token"}	2026-03-16 21:37:53.378747+00	
00000000-0000-0000-0000-000000000000	ee1afb39-c5da-4d06-ada1-cec6e1a05fc2	{"action":"token_refreshed","actor_id":"780bcf0c-f47f-498e-a129-35583df2a8a1","actor_username":"contact@prodiving.asia","actor_via_sso":false,"log_type":"token"}	2026-03-16 22:37:18.39809+00	
00000000-0000-0000-0000-000000000000	8d838dfb-6e16-43ef-bc83-7ace3a46e023	{"action":"token_revoked","actor_id":"780bcf0c-f47f-498e-a129-35583df2a8a1","actor_username":"contact@prodiving.asia","actor_via_sso":false,"log_type":"token"}	2026-03-16 22:37:18.414854+00	
00000000-0000-0000-0000-000000000000	72946015-92fb-4487-9bf1-0609b54df762	{"action":"token_refreshed","actor_id":"780bcf0c-f47f-498e-a129-35583df2a8a1","actor_username":"contact@prodiving.asia","actor_via_sso":false,"log_type":"token"}	2026-03-16 23:56:52.775398+00	
00000000-0000-0000-0000-000000000000	4ca7e2da-700e-4205-871c-12fb8e089fa8	{"action":"token_revoked","actor_id":"780bcf0c-f47f-498e-a129-35583df2a8a1","actor_username":"contact@prodiving.asia","actor_via_sso":false,"log_type":"token"}	2026-03-16 23:56:52.788598+00	
00000000-0000-0000-0000-000000000000	c386a4d8-f4a7-46a4-bf83-8ee8a1695243	{"action":"token_refreshed","actor_id":"780bcf0c-f47f-498e-a129-35583df2a8a1","actor_username":"contact@prodiving.asia","actor_via_sso":false,"log_type":"token"}	2026-03-17 01:04:07.98783+00	
00000000-0000-0000-0000-000000000000	cad76b7c-83e9-4ffd-944f-b351d30c6ce8	{"action":"token_revoked","actor_id":"780bcf0c-f47f-498e-a129-35583df2a8a1","actor_username":"contact@prodiving.asia","actor_via_sso":false,"log_type":"token"}	2026-03-17 01:04:08.005201+00	
00000000-0000-0000-0000-000000000000	751b780e-8c4c-474a-9af7-b6c05e4b737b	{"action":"token_refreshed","actor_id":"780bcf0c-f47f-498e-a129-35583df2a8a1","actor_username":"contact@prodiving.asia","actor_via_sso":false,"log_type":"token"}	2026-03-17 01:34:42.902477+00	
00000000-0000-0000-0000-000000000000	c5cb6c85-4cdf-4bb4-a743-0f65f8776573	{"action":"token_revoked","actor_id":"780bcf0c-f47f-498e-a129-35583df2a8a1","actor_username":"contact@prodiving.asia","actor_via_sso":false,"log_type":"token"}	2026-03-17 01:34:42.920828+00	
00000000-0000-0000-0000-000000000000	cb1a8c22-5618-46a6-b08e-84e208537874	{"action":"token_refreshed","actor_id":"780bcf0c-f47f-498e-a129-35583df2a8a1","actor_username":"contact@prodiving.asia","actor_via_sso":false,"log_type":"token"}	2026-03-17 01:56:51.404941+00	
00000000-0000-0000-0000-000000000000	eebfffc5-c151-4d46-9cdd-5850e6fe8a69	{"action":"token_revoked","actor_id":"780bcf0c-f47f-498e-a129-35583df2a8a1","actor_username":"contact@prodiving.asia","actor_via_sso":false,"log_type":"token"}	2026-03-17 01:56:51.42121+00	
00000000-0000-0000-0000-000000000000	d9ae062e-65af-4a01-948c-af3da3ca7936	{"action":"token_refreshed","actor_id":"780bcf0c-f47f-498e-a129-35583df2a8a1","actor_username":"contact@prodiving.asia","actor_via_sso":false,"log_type":"token"}	2026-03-17 01:58:17.168851+00	
00000000-0000-0000-0000-000000000000	e0d6310d-005c-4037-801a-4b8a4319496b	{"action":"token_revoked","actor_id":"780bcf0c-f47f-498e-a129-35583df2a8a1","actor_username":"contact@prodiving.asia","actor_via_sso":false,"log_type":"token"}	2026-03-17 01:58:17.175993+00	
00000000-0000-0000-0000-000000000000	d6697a92-3712-4177-9bba-2134901e7371	{"action":"token_refreshed","actor_id":"780bcf0c-f47f-498e-a129-35583df2a8a1","actor_username":"contact@prodiving.asia","actor_via_sso":false,"log_type":"token"}	2026-03-17 02:09:36.552917+00	
00000000-0000-0000-0000-000000000000	c3d95816-1f33-44d8-ad14-451104de9d95	{"action":"token_revoked","actor_id":"780bcf0c-f47f-498e-a129-35583df2a8a1","actor_username":"contact@prodiving.asia","actor_via_sso":false,"log_type":"token"}	2026-03-17 02:09:36.562201+00	
00000000-0000-0000-0000-000000000000	231d41b6-c21c-4e02-a62f-d7492873b205	{"action":"token_refreshed","actor_id":"780bcf0c-f47f-498e-a129-35583df2a8a1","actor_username":"contact@prodiving.asia","actor_via_sso":false,"log_type":"token"}	2026-03-17 02:35:55.59435+00	
00000000-0000-0000-0000-000000000000	eb5454b6-5d70-46af-acd0-aa47f332bc98	{"action":"token_revoked","actor_id":"780bcf0c-f47f-498e-a129-35583df2a8a1","actor_username":"contact@prodiving.asia","actor_via_sso":false,"log_type":"token"}	2026-03-17 02:35:55.611515+00	
00000000-0000-0000-0000-000000000000	63eeb217-b48f-4ecf-ae00-73e935aa29ac	{"action":"token_refreshed","actor_id":"780bcf0c-f47f-498e-a129-35583df2a8a1","actor_username":"contact@prodiving.asia","actor_via_sso":false,"log_type":"token"}	2026-03-17 02:56:45.110427+00	
00000000-0000-0000-0000-000000000000	a591d972-a9df-4bad-b7b2-4590533b93ec	{"action":"token_revoked","actor_id":"780bcf0c-f47f-498e-a129-35583df2a8a1","actor_username":"contact@prodiving.asia","actor_via_sso":false,"log_type":"token"}	2026-03-17 02:56:45.119735+00	
00000000-0000-0000-0000-000000000000	7fb068b4-f041-40e4-9c74-307110bf9ab9	{"action":"token_refreshed","actor_id":"780bcf0c-f47f-498e-a129-35583df2a8a1","actor_username":"contact@prodiving.asia","actor_via_sso":false,"log_type":"token"}	2026-03-17 03:18:21.437795+00	
00000000-0000-0000-0000-000000000000	856693e3-c972-4a9a-b198-3ce93bee3cbd	{"action":"token_revoked","actor_id":"780bcf0c-f47f-498e-a129-35583df2a8a1","actor_username":"contact@prodiving.asia","actor_via_sso":false,"log_type":"token"}	2026-03-17 03:18:21.442825+00	
00000000-0000-0000-0000-000000000000	463aa7f8-bb89-45f3-b547-150ac0696bb8	{"action":"token_refreshed","actor_id":"780bcf0c-f47f-498e-a129-35583df2a8a1","actor_username":"contact@prodiving.asia","actor_via_sso":false,"log_type":"token"}	2026-03-17 03:34:32.478306+00	
00000000-0000-0000-0000-000000000000	55558c9a-5e95-4f47-a4e9-d22778b81e1b	{"action":"token_revoked","actor_id":"780bcf0c-f47f-498e-a129-35583df2a8a1","actor_username":"contact@prodiving.asia","actor_via_sso":false,"log_type":"token"}	2026-03-17 03:34:32.490229+00	
00000000-0000-0000-0000-000000000000	cb4153e2-bfd4-48af-a3c9-b92455adf361	{"action":"token_refreshed","actor_id":"780bcf0c-f47f-498e-a129-35583df2a8a1","actor_username":"contact@prodiving.asia","actor_via_sso":false,"log_type":"token"}	2026-03-17 03:41:00.435561+00	
00000000-0000-0000-0000-000000000000	fc90f6b0-92ed-436e-bdb6-6b89ea51c89f	{"action":"token_revoked","actor_id":"780bcf0c-f47f-498e-a129-35583df2a8a1","actor_username":"contact@prodiving.asia","actor_via_sso":false,"log_type":"token"}	2026-03-17 03:41:00.449874+00	
00000000-0000-0000-0000-000000000000	e2cc9f9d-7aeb-4d02-9c92-8771e66c4719	{"action":"token_refreshed","actor_id":"780bcf0c-f47f-498e-a129-35583df2a8a1","actor_username":"contact@prodiving.asia","actor_via_sso":false,"log_type":"token"}	2026-03-17 04:24:22.849851+00	
00000000-0000-0000-0000-000000000000	53f1bb9c-a207-47da-8b62-e1577f253099	{"action":"token_revoked","actor_id":"780bcf0c-f47f-498e-a129-35583df2a8a1","actor_username":"contact@prodiving.asia","actor_via_sso":false,"log_type":"token"}	2026-03-17 04:24:22.872387+00	
00000000-0000-0000-0000-000000000000	1bcfb2f8-0f8b-4c70-a358-36e2910ab5d5	{"action":"token_refreshed","actor_id":"780bcf0c-f47f-498e-a129-35583df2a8a1","actor_username":"contact@prodiving.asia","actor_via_sso":false,"log_type":"token"}	2026-03-17 04:30:53.404067+00	
00000000-0000-0000-0000-000000000000	60c1209e-17cb-4f52-9a96-4490d4afd89f	{"action":"token_revoked","actor_id":"780bcf0c-f47f-498e-a129-35583df2a8a1","actor_username":"contact@prodiving.asia","actor_via_sso":false,"log_type":"token"}	2026-03-17 04:30:53.422309+00	
00000000-0000-0000-0000-000000000000	bc82e602-71bf-4e95-99b9-fbea462a72c2	{"action":"token_refreshed","actor_id":"780bcf0c-f47f-498e-a129-35583df2a8a1","actor_username":"contact@prodiving.asia","actor_via_sso":false,"log_type":"token"}	2026-03-17 04:37:50.836227+00	
00000000-0000-0000-0000-000000000000	a3eb1516-66e7-41a1-a7e4-80551c1e4d71	{"action":"token_revoked","actor_id":"780bcf0c-f47f-498e-a129-35583df2a8a1","actor_username":"contact@prodiving.asia","actor_via_sso":false,"log_type":"token"}	2026-03-17 04:37:50.848263+00	
00000000-0000-0000-0000-000000000000	e0cae9ae-4360-4358-8bcd-36f98efc07aa	{"action":"token_refreshed","actor_id":"780bcf0c-f47f-498e-a129-35583df2a8a1","actor_username":"contact@prodiving.asia","actor_via_sso":false,"log_type":"token"}	2026-03-17 04:59:08.536276+00	
00000000-0000-0000-0000-000000000000	7cf8b931-ca31-4682-8df3-d573d1a56181	{"action":"token_revoked","actor_id":"780bcf0c-f47f-498e-a129-35583df2a8a1","actor_username":"contact@prodiving.asia","actor_via_sso":false,"log_type":"token"}	2026-03-17 04:59:08.553931+00	
00000000-0000-0000-0000-000000000000	0134f1f6-35a8-4ce5-ad09-8276c5e6834f	{"action":"token_refreshed","actor_id":"780bcf0c-f47f-498e-a129-35583df2a8a1","actor_username":"contact@prodiving.asia","actor_via_sso":false,"log_type":"token"}	2026-03-17 05:29:20.350257+00	
00000000-0000-0000-0000-000000000000	6ffac8e9-5f50-4a4b-9a4e-2bf0521254b8	{"action":"token_revoked","actor_id":"780bcf0c-f47f-498e-a129-35583df2a8a1","actor_username":"contact@prodiving.asia","actor_via_sso":false,"log_type":"token"}	2026-03-17 05:29:20.417906+00	
00000000-0000-0000-0000-000000000000	a7e22beb-0cd8-4c5c-964b-693d1951e49f	{"action":"token_refreshed","actor_id":"780bcf0c-f47f-498e-a129-35583df2a8a1","actor_username":"contact@prodiving.asia","actor_via_sso":false,"log_type":"token"}	2026-03-17 05:35:54.416198+00	
00000000-0000-0000-0000-000000000000	36b85643-edc4-45ff-8506-c7de64070be4	{"action":"token_revoked","actor_id":"780bcf0c-f47f-498e-a129-35583df2a8a1","actor_username":"contact@prodiving.asia","actor_via_sso":false,"log_type":"token"}	2026-03-17 05:35:54.438859+00	
00000000-0000-0000-0000-000000000000	d46310e4-8586-4880-b05f-3674fa5c6521	{"action":"logout","actor_id":"780bcf0c-f47f-498e-a129-35583df2a8a1","actor_username":"contact@prodiving.asia","actor_via_sso":false,"log_type":"account"}	2026-03-17 05:40:04.159437+00	
00000000-0000-0000-0000-000000000000	dc6fa6e5-4794-4003-b4b2-ce64e4abf727	{"action":"login","actor_id":"780bcf0c-f47f-498e-a129-35583df2a8a1","actor_username":"contact@prodiving.asia","actor_via_sso":false,"log_type":"account","traits":{"provider":"email"}}	2026-03-17 05:40:14.038115+00	
00000000-0000-0000-0000-000000000000	9186df0a-26c7-4a59-8b2f-20a00628eb47	{"action":"login","actor_id":"780bcf0c-f47f-498e-a129-35583df2a8a1","actor_username":"contact@prodiving.asia","actor_via_sso":false,"log_type":"account","traits":{"provider":"email"}}	2026-03-17 06:05:42.92122+00	
00000000-0000-0000-0000-000000000000	980b3788-39ac-437f-ba4e-44ce5ef00a0e	{"action":"login","actor_id":"780bcf0c-f47f-498e-a129-35583df2a8a1","actor_username":"contact@prodiving.asia","actor_via_sso":false,"log_type":"account","traits":{"provider":"email"}}	2026-03-17 06:08:21.268263+00	
00000000-0000-0000-0000-000000000000	b42be87a-ab5b-48e5-95de-605f430abc27	{"action":"token_refreshed","actor_id":"780bcf0c-f47f-498e-a129-35583df2a8a1","actor_username":"contact@prodiving.asia","actor_via_sso":false,"log_type":"token"}	2026-03-17 07:10:01.999737+00	
00000000-0000-0000-0000-000000000000	5d8451b4-8832-41a5-94b8-f01edd107daa	{"action":"token_revoked","actor_id":"780bcf0c-f47f-498e-a129-35583df2a8a1","actor_username":"contact@prodiving.asia","actor_via_sso":false,"log_type":"token"}	2026-03-17 07:10:02.015632+00	
00000000-0000-0000-0000-000000000000	7ea32728-3912-45de-84a9-9df20e4cf893	{"action":"token_refreshed","actor_id":"780bcf0c-f47f-498e-a129-35583df2a8a1","actor_username":"contact@prodiving.asia","actor_via_sso":false,"log_type":"token"}	2026-03-17 07:17:23.274179+00	
00000000-0000-0000-0000-000000000000	994480fe-0905-46d0-8aed-294fb547f53f	{"action":"token_revoked","actor_id":"780bcf0c-f47f-498e-a129-35583df2a8a1","actor_username":"contact@prodiving.asia","actor_via_sso":false,"log_type":"token"}	2026-03-17 07:17:23.283085+00	
00000000-0000-0000-0000-000000000000	ec673bc1-04ce-444e-99ea-d5e56f0d5868	{"action":"login","actor_id":"780bcf0c-f47f-498e-a129-35583df2a8a1","actor_username":"contact@prodiving.asia","actor_via_sso":false,"log_type":"account","traits":{"provider":"email"}}	2026-03-17 07:19:33.640156+00	
00000000-0000-0000-0000-000000000000	d822c1c2-02ed-40ab-a55b-8ab79cf10f5d	{"action":"token_refreshed","actor_id":"780bcf0c-f47f-498e-a129-35583df2a8a1","actor_username":"contact@prodiving.asia","actor_via_sso":false,"log_type":"token"}	2026-03-17 10:39:46.984883+00	
00000000-0000-0000-0000-000000000000	e9ba59d9-2be5-4275-9607-a051b496b861	{"action":"token_revoked","actor_id":"780bcf0c-f47f-498e-a129-35583df2a8a1","actor_username":"contact@prodiving.asia","actor_via_sso":false,"log_type":"token"}	2026-03-17 10:39:47.009915+00	
00000000-0000-0000-0000-000000000000	41177197-068e-43d0-ad14-2b587333ef87	{"action":"token_refreshed","actor_id":"780bcf0c-f47f-498e-a129-35583df2a8a1","actor_username":"contact@prodiving.asia","actor_via_sso":false,"log_type":"token"}	2026-03-17 10:47:49.916745+00	
00000000-0000-0000-0000-000000000000	4e233ee4-5db3-41ee-b3aa-a675bfcc9d9d	{"action":"token_revoked","actor_id":"780bcf0c-f47f-498e-a129-35583df2a8a1","actor_username":"contact@prodiving.asia","actor_via_sso":false,"log_type":"token"}	2026-03-17 10:47:49.933135+00	
00000000-0000-0000-0000-000000000000	fbcac61e-6eb5-4d92-b744-086dd9ebcba1	{"action":"login","actor_id":"780bcf0c-f47f-498e-a129-35583df2a8a1","actor_username":"contact@prodiving.asia","actor_via_sso":false,"log_type":"account","traits":{"provider":"email"}}	2026-03-17 11:06:49.683678+00	
00000000-0000-0000-0000-000000000000	cc0c80d2-e97c-47f6-a634-e18badffaba0	{"action":"token_refreshed","actor_id":"780bcf0c-f47f-498e-a129-35583df2a8a1","actor_username":"contact@prodiving.asia","actor_via_sso":false,"log_type":"token"}	2026-03-17 12:01:47.181794+00	
00000000-0000-0000-0000-000000000000	c4982f24-d29c-44c3-9f5f-6c731bae856e	{"action":"token_revoked","actor_id":"780bcf0c-f47f-498e-a129-35583df2a8a1","actor_username":"contact@prodiving.asia","actor_via_sso":false,"log_type":"token"}	2026-03-17 12:01:47.198332+00	
00000000-0000-0000-0000-000000000000	62730123-f774-416d-8f88-49f0ac5459bf	{"action":"token_refreshed","actor_id":"780bcf0c-f47f-498e-a129-35583df2a8a1","actor_username":"contact@prodiving.asia","actor_via_sso":false,"log_type":"token"}	2026-03-17 12:19:13.863124+00	
00000000-0000-0000-0000-000000000000	b9b6eeda-7a9a-4fb1-b977-bca6789689f0	{"action":"token_revoked","actor_id":"780bcf0c-f47f-498e-a129-35583df2a8a1","actor_username":"contact@prodiving.asia","actor_via_sso":false,"log_type":"token"}	2026-03-17 12:19:13.877202+00	
00000000-0000-0000-0000-000000000000	19696a0d-2082-4db6-babe-e5c5d28c9b1d	{"action":"token_refreshed","actor_id":"780bcf0c-f47f-498e-a129-35583df2a8a1","actor_username":"contact@prodiving.asia","actor_via_sso":false,"log_type":"token"}	2026-03-17 12:19:21.979434+00	
00000000-0000-0000-0000-000000000000	9261aab6-9ee6-40e1-88b1-777cfdf728a9	{"action":"token_revoked","actor_id":"780bcf0c-f47f-498e-a129-35583df2a8a1","actor_username":"contact@prodiving.asia","actor_via_sso":false,"log_type":"token"}	2026-03-17 12:19:21.983053+00	
00000000-0000-0000-0000-000000000000	450adb77-c61a-4ba7-8611-ede04cca90c6	{"action":"logout","actor_id":"780bcf0c-f47f-498e-a129-35583df2a8a1","actor_username":"contact@prodiving.asia","actor_via_sso":false,"log_type":"account"}	2026-03-17 13:12:50.793102+00	
00000000-0000-0000-0000-000000000000	1a700600-5626-4a18-a63e-0d68148ab9cf	{"action":"user_confirmation_requested","actor_id":"150f5370-cae7-472a-b62f-83a4758d9dcb","actor_username":"login@onemedia.asia","actor_via_sso":false,"log_type":"user","traits":{"provider":"email"}}	2026-03-17 13:14:07.634635+00	
00000000-0000-0000-0000-000000000000	a1050f3f-ee51-487d-8afa-1d53683c2ace	{"action":"user_signedup","actor_id":"150f5370-cae7-472a-b62f-83a4758d9dcb","actor_username":"login@onemedia.asia","actor_via_sso":false,"log_type":"team","traits":{"provider":"email"}}	2026-03-17 13:14:33.110557+00	
00000000-0000-0000-0000-000000000000	377c4bd5-573f-424d-abc3-b38df261b364	{"action":"user_signedup","actor_id":"00000000-0000-0000-0000-000000000000","actor_username":"service_role","actor_via_sso":false,"log_type":"team","traits":{"provider":"email","user_email":"bas@divinginasia.com","user_id":"eaaa47be-6300-4bc4-85f7-e98c5e00e249","user_phone":""}}	2026-03-17 13:19:24.200607+00	
00000000-0000-0000-0000-000000000000	ce8843e7-4551-423e-9a2b-1c1e947bb140	{"action":"login","actor_id":"780bcf0c-f47f-498e-a129-35583df2a8a1","actor_username":"contact@prodiving.asia","actor_via_sso":false,"log_type":"account","traits":{"provider":"email"}}	2026-03-17 13:24:22.078599+00	
00000000-0000-0000-0000-000000000000	11bde206-d484-4e52-9e55-3c7e35cbc9d9	{"action":"login","actor_id":"780bcf0c-f47f-498e-a129-35583df2a8a1","actor_username":"contact@prodiving.asia","actor_via_sso":false,"log_type":"account","traits":{"provider":"email"}}	2026-03-17 13:25:15.358156+00	
00000000-0000-0000-0000-000000000000	43807151-9a93-44f6-b529-f9b07ff1529a	{"action":"login","actor_id":"780bcf0c-f47f-498e-a129-35583df2a8a1","actor_username":"contact@prodiving.asia","actor_via_sso":false,"log_type":"account","traits":{"provider":"email"}}	2026-03-17 14:02:16.807859+00	
00000000-0000-0000-0000-000000000000	c532e4a9-d9d2-4da0-a71c-1432e8d9cb7c	{"action":"token_refreshed","actor_id":"780bcf0c-f47f-498e-a129-35583df2a8a1","actor_username":"contact@prodiving.asia","actor_via_sso":false,"log_type":"token"}	2026-03-17 14:22:51.604474+00	
00000000-0000-0000-0000-000000000000	e40d60b2-5bbf-497f-976d-42870b3c37da	{"action":"token_revoked","actor_id":"780bcf0c-f47f-498e-a129-35583df2a8a1","actor_username":"contact@prodiving.asia","actor_via_sso":false,"log_type":"token"}	2026-03-17 14:22:51.627488+00	
00000000-0000-0000-0000-000000000000	c693c409-5990-493d-9bfe-56f6c2d93a2f	{"action":"login","actor_id":"780bcf0c-f47f-498e-a129-35583df2a8a1","actor_username":"contact@prodiving.asia","actor_via_sso":false,"log_type":"account","traits":{"provider":"email"}}	2026-03-17 14:30:08.545318+00	
00000000-0000-0000-0000-000000000000	9606f148-0fc6-47bc-9985-004c9f587af6	{"action":"logout","actor_id":"780bcf0c-f47f-498e-a129-35583df2a8a1","actor_username":"contact@prodiving.asia","actor_via_sso":false,"log_type":"account"}	2026-03-17 14:35:00.838482+00	
00000000-0000-0000-0000-000000000000	d0745a26-cfa7-4263-aa69-06e8ede95430	{"action":"login","actor_id":"780bcf0c-f47f-498e-a129-35583df2a8a1","actor_username":"contact@prodiving.asia","actor_via_sso":false,"log_type":"account","traits":{"provider":"email"}}	2026-03-17 14:41:53.130454+00	
00000000-0000-0000-0000-000000000000	c709986c-d95c-4b05-8803-80368e2ffe6b	{"action":"login","actor_id":"780bcf0c-f47f-498e-a129-35583df2a8a1","actor_username":"contact@prodiving.asia","actor_via_sso":false,"log_type":"account","traits":{"provider":"email"}}	2026-03-17 14:55:44.678496+00	
00000000-0000-0000-0000-000000000000	67c993e3-aa64-406d-bafd-617ee545895f	{"action":"login","actor_id":"780bcf0c-f47f-498e-a129-35583df2a8a1","actor_username":"contact@prodiving.asia","actor_via_sso":false,"log_type":"account","traits":{"provider":"email"}}	2026-03-17 15:03:50.857942+00	
00000000-0000-0000-0000-000000000000	7851209f-8356-4693-ae89-89089b2f6721	{"action":"login","actor_id":"780bcf0c-f47f-498e-a129-35583df2a8a1","actor_username":"contact@prodiving.asia","actor_via_sso":false,"log_type":"account","traits":{"provider":"email"}}	2026-03-17 15:04:19.375676+00	
00000000-0000-0000-0000-000000000000	86a72cb0-17ec-4e7f-93fb-d4b893fd37e6	{"action":"token_refreshed","actor_id":"780bcf0c-f47f-498e-a129-35583df2a8a1","actor_username":"contact@prodiving.asia","actor_via_sso":false,"log_type":"token"}	2026-03-17 15:54:12.502277+00	
00000000-0000-0000-0000-000000000000	c5fa3dfb-bfc6-405a-82b9-dd2297a5931c	{"action":"token_revoked","actor_id":"780bcf0c-f47f-498e-a129-35583df2a8a1","actor_username":"contact@prodiving.asia","actor_via_sso":false,"log_type":"token"}	2026-03-17 15:54:12.52476+00	
00000000-0000-0000-0000-000000000000	d24ae26b-a31e-44f0-ac08-b8ca22af9c30	{"action":"token_refreshed","actor_id":"780bcf0c-f47f-498e-a129-35583df2a8a1","actor_username":"contact@prodiving.asia","actor_via_sso":false,"log_type":"token"}	2026-03-17 16:03:01.11542+00	
00000000-0000-0000-0000-000000000000	10a6a73c-d8db-4925-ab25-f7d6ca13de86	{"action":"token_revoked","actor_id":"780bcf0c-f47f-498e-a129-35583df2a8a1","actor_username":"contact@prodiving.asia","actor_via_sso":false,"log_type":"token"}	2026-03-17 16:03:01.133135+00	
00000000-0000-0000-0000-000000000000	3738e903-0ae4-412e-a6ba-c2024123250f	{"action":"login","actor_id":"780bcf0c-f47f-498e-a129-35583df2a8a1","actor_username":"contact@prodiving.asia","actor_via_sso":false,"log_type":"account","traits":{"provider":"email"}}	2026-03-17 16:13:54.181161+00	
00000000-0000-0000-0000-000000000000	a3e493ae-e04d-4e0e-8cae-4b72457ee002	{"action":"token_refreshed","actor_id":"780bcf0c-f47f-498e-a129-35583df2a8a1","actor_username":"contact@prodiving.asia","actor_via_sso":false,"log_type":"token"}	2026-03-17 16:52:30.390226+00	
00000000-0000-0000-0000-000000000000	875add35-c360-45c9-b3b3-932fdbde90c0	{"action":"token_revoked","actor_id":"780bcf0c-f47f-498e-a129-35583df2a8a1","actor_username":"contact@prodiving.asia","actor_via_sso":false,"log_type":"token"}	2026-03-17 16:52:30.406202+00	
00000000-0000-0000-0000-000000000000	fece78a6-ffb4-4c3c-bc1c-e57d6f8c2ce3	{"action":"token_refreshed","actor_id":"780bcf0c-f47f-498e-a129-35583df2a8a1","actor_username":"contact@prodiving.asia","actor_via_sso":false,"log_type":"token"}	2026-03-17 17:02:34.647472+00	
00000000-0000-0000-0000-000000000000	ce391585-7e89-4a7a-bdc7-86b4adfd6071	{"action":"token_revoked","actor_id":"780bcf0c-f47f-498e-a129-35583df2a8a1","actor_username":"contact@prodiving.asia","actor_via_sso":false,"log_type":"token"}	2026-03-17 17:02:34.675089+00	
00000000-0000-0000-0000-000000000000	b3922ec7-322c-44a9-ac47-8f3681844eb7	{"action":"token_refreshed","actor_id":"780bcf0c-f47f-498e-a129-35583df2a8a1","actor_username":"contact@prodiving.asia","actor_via_sso":false,"log_type":"token"}	2026-03-17 17:09:23.674332+00	
00000000-0000-0000-0000-000000000000	5626c0db-61da-4736-98ba-0bdc69d54d58	{"action":"token_revoked","actor_id":"780bcf0c-f47f-498e-a129-35583df2a8a1","actor_username":"contact@prodiving.asia","actor_via_sso":false,"log_type":"token"}	2026-03-17 17:09:23.697391+00	
00000000-0000-0000-0000-000000000000	16033251-fb28-4b71-8f63-26ad665f90d4	{"action":"login","actor_id":"780bcf0c-f47f-498e-a129-35583df2a8a1","actor_username":"contact@prodiving.asia","actor_via_sso":false,"log_type":"account","traits":{"provider":"email"}}	2026-03-17 17:19:37.319241+00	
00000000-0000-0000-0000-000000000000	f4a1a487-7efd-444a-89a1-ad92109ba597	{"action":"token_refreshed","actor_id":"780bcf0c-f47f-498e-a129-35583df2a8a1","actor_username":"contact@prodiving.asia","actor_via_sso":false,"log_type":"token"}	2026-03-17 17:25:40.704265+00	
00000000-0000-0000-0000-000000000000	6562cce8-7ca2-4f7f-b4b2-96f2ad91db15	{"action":"token_revoked","actor_id":"780bcf0c-f47f-498e-a129-35583df2a8a1","actor_username":"contact@prodiving.asia","actor_via_sso":false,"log_type":"token"}	2026-03-17 17:25:40.721368+00	
00000000-0000-0000-0000-000000000000	aa08ba87-5580-4e85-ae8e-bb2e57492096	{"action":"token_refreshed","actor_id":"780bcf0c-f47f-498e-a129-35583df2a8a1","actor_username":"contact@prodiving.asia","actor_via_sso":false,"log_type":"token"}	2026-03-17 17:53:42.496564+00	
00000000-0000-0000-0000-000000000000	33d295d3-6af2-4f43-b1d7-4567cbbbdafa	{"action":"token_revoked","actor_id":"780bcf0c-f47f-498e-a129-35583df2a8a1","actor_username":"contact@prodiving.asia","actor_via_sso":false,"log_type":"token"}	2026-03-17 17:53:42.504764+00	
00000000-0000-0000-0000-000000000000	17c85768-f655-42ab-927f-3fdf3890710a	{"action":"token_refreshed","actor_id":"780bcf0c-f47f-498e-a129-35583df2a8a1","actor_username":"contact@prodiving.asia","actor_via_sso":false,"log_type":"token"}	2026-03-17 18:11:45.733562+00	
00000000-0000-0000-0000-000000000000	5387df00-739e-4ca6-8070-c7d2dceacbdd	{"action":"token_revoked","actor_id":"780bcf0c-f47f-498e-a129-35583df2a8a1","actor_username":"contact@prodiving.asia","actor_via_sso":false,"log_type":"token"}	2026-03-17 18:11:45.746441+00	
00000000-0000-0000-0000-000000000000	81faf23b-d4aa-4ce0-80a4-0d97e85b4bb2	{"action":"token_refreshed","actor_id":"780bcf0c-f47f-498e-a129-35583df2a8a1","actor_username":"contact@prodiving.asia","actor_via_sso":false,"log_type":"token"}	2026-03-17 18:44:41.807815+00	
00000000-0000-0000-0000-000000000000	132a3324-8f53-49e1-bbc4-6603b1def11a	{"action":"token_revoked","actor_id":"780bcf0c-f47f-498e-a129-35583df2a8a1","actor_username":"contact@prodiving.asia","actor_via_sso":false,"log_type":"token"}	2026-03-17 18:44:41.833537+00	
00000000-0000-0000-0000-000000000000	5a7be462-855e-493e-a9cf-e95fb73ddb53	{"action":"token_refreshed","actor_id":"780bcf0c-f47f-498e-a129-35583df2a8a1","actor_username":"contact@prodiving.asia","actor_via_sso":false,"log_type":"token"}	2026-03-17 18:48:43.429451+00	
00000000-0000-0000-0000-000000000000	d93d0742-61e7-4737-b68a-c2050677c900	{"action":"token_revoked","actor_id":"780bcf0c-f47f-498e-a129-35583df2a8a1","actor_username":"contact@prodiving.asia","actor_via_sso":false,"log_type":"token"}	2026-03-17 18:48:43.44913+00	
00000000-0000-0000-0000-000000000000	52f3e86d-30bf-475b-a9d9-544b37a576cf	{"action":"token_refreshed","actor_id":"780bcf0c-f47f-498e-a129-35583df2a8a1","actor_username":"contact@prodiving.asia","actor_via_sso":false,"log_type":"token"}	2026-03-17 18:58:30.93529+00	
00000000-0000-0000-0000-000000000000	6844dfbf-6fba-488d-925c-c001ca99b6a8	{"action":"token_revoked","actor_id":"780bcf0c-f47f-498e-a129-35583df2a8a1","actor_username":"contact@prodiving.asia","actor_via_sso":false,"log_type":"token"}	2026-03-17 18:58:30.947388+00	
00000000-0000-0000-0000-000000000000	0c0c0876-a839-4842-b8cb-37528970dc60	{"action":"token_refreshed","actor_id":"780bcf0c-f47f-498e-a129-35583df2a8a1","actor_username":"contact@prodiving.asia","actor_via_sso":false,"log_type":"token"}	2026-03-17 19:00:43.3831+00	
00000000-0000-0000-0000-000000000000	b4d201f6-9dd5-495b-a721-121589e3f75e	{"action":"token_revoked","actor_id":"780bcf0c-f47f-498e-a129-35583df2a8a1","actor_username":"contact@prodiving.asia","actor_via_sso":false,"log_type":"token"}	2026-03-17 19:00:43.409004+00	
00000000-0000-0000-0000-000000000000	475f5b60-ba95-4eb8-a55e-86f28dbd423f	{"action":"token_refreshed","actor_id":"780bcf0c-f47f-498e-a129-35583df2a8a1","actor_username":"contact@prodiving.asia","actor_via_sso":false,"log_type":"token"}	2026-03-17 19:56:40.547315+00	
00000000-0000-0000-0000-000000000000	c84b1b78-d45e-42fe-9978-9c3db6e81553	{"action":"token_revoked","actor_id":"780bcf0c-f47f-498e-a129-35583df2a8a1","actor_username":"contact@prodiving.asia","actor_via_sso":false,"log_type":"token"}	2026-03-17 19:56:40.565818+00	
00000000-0000-0000-0000-000000000000	1e67cbaa-2caa-400e-9445-1b7ca04e2f95	{"action":"token_refreshed","actor_id":"780bcf0c-f47f-498e-a129-35583df2a8a1","actor_username":"contact@prodiving.asia","actor_via_sso":false,"log_type":"token"}	2026-03-17 20:11:56.459359+00	
00000000-0000-0000-0000-000000000000	9c7fd0a3-fbf1-4c3a-8e59-8292c532d91b	{"action":"token_revoked","actor_id":"780bcf0c-f47f-498e-a129-35583df2a8a1","actor_username":"contact@prodiving.asia","actor_via_sso":false,"log_type":"token"}	2026-03-17 20:11:56.469064+00	
00000000-0000-0000-0000-000000000000	f740f434-ded0-459f-b560-b3a8518b57bc	{"action":"token_refreshed","actor_id":"780bcf0c-f47f-498e-a129-35583df2a8a1","actor_username":"contact@prodiving.asia","actor_via_sso":false,"log_type":"token"}	2026-03-17 20:22:47.507894+00	
00000000-0000-0000-0000-000000000000	9ffa5f04-b928-4dc6-ba75-e411be520223	{"action":"token_revoked","actor_id":"780bcf0c-f47f-498e-a129-35583df2a8a1","actor_username":"contact@prodiving.asia","actor_via_sso":false,"log_type":"token"}	2026-03-17 20:22:47.519245+00	
00000000-0000-0000-0000-000000000000	8fae916e-8418-4d67-8665-bf3e11a8d025	{"action":"login","actor_id":"780bcf0c-f47f-498e-a129-35583df2a8a1","actor_username":"contact@prodiving.asia","actor_via_sso":false,"log_type":"account","traits":{"provider":"email"}}	2026-03-17 20:27:24.8137+00	
00000000-0000-0000-0000-000000000000	425faedc-3f0a-4dab-9f2c-2e68f8e021bf	{"action":"login","actor_id":"780bcf0c-f47f-498e-a129-35583df2a8a1","actor_username":"contact@prodiving.asia","actor_via_sso":false,"log_type":"account","traits":{"provider":"email"}}	2026-03-17 20:28:08.744974+00	
00000000-0000-0000-0000-000000000000	b6d10925-50ca-4320-bef1-2b81a5636a3f	{"action":"logout","actor_id":"780bcf0c-f47f-498e-a129-35583df2a8a1","actor_username":"contact@prodiving.asia","actor_via_sso":false,"log_type":"account"}	2026-03-17 20:43:26.685188+00	
00000000-0000-0000-0000-000000000000	c4d10eec-b94a-458f-a9dd-c3f0dadd55ec	{"action":"login","actor_id":"780bcf0c-f47f-498e-a129-35583df2a8a1","actor_username":"contact@prodiving.asia","actor_via_sso":false,"log_type":"account","traits":{"provider":"email"}}	2026-03-17 20:43:30.40977+00	
00000000-0000-0000-0000-000000000000	fc8e35dc-bdf5-4ae4-8baa-6a9f56fd4119	{"action":"login","actor_id":"780bcf0c-f47f-498e-a129-35583df2a8a1","actor_username":"contact@prodiving.asia","actor_via_sso":false,"log_type":"account","traits":{"provider":"email"}}	2026-03-17 20:43:58.047969+00	
00000000-0000-0000-0000-000000000000	fe09ece1-b16c-433e-aa0a-f5aa78e8adde	{"action":"login","actor_id":"780bcf0c-f47f-498e-a129-35583df2a8a1","actor_username":"contact@prodiving.asia","actor_via_sso":false,"log_type":"account","traits":{"provider":"email"}}	2026-03-18 18:16:07.953491+00	
00000000-0000-0000-0000-000000000000	7fdb5475-629d-4e2a-9c4a-9c66e5cb034c	{"action":"login","actor_id":"780bcf0c-f47f-498e-a129-35583df2a8a1","actor_username":"contact@prodiving.asia","actor_via_sso":false,"log_type":"account","traits":{"provider":"email"}}	2026-03-19 06:09:48.871467+00	
00000000-0000-0000-0000-000000000000	4f00a935-019a-487e-b6cb-ab7f0edb0518	{"action":"login","actor_id":"780bcf0c-f47f-498e-a129-35583df2a8a1","actor_username":"contact@prodiving.asia","actor_via_sso":false,"log_type":"account","traits":{"provider":"email"}}	2026-03-19 06:55:57.882059+00	
00000000-0000-0000-0000-000000000000	d282d9b2-8296-4de2-a3ea-1ce51c7fb6cb	{"action":"login","actor_id":"780bcf0c-f47f-498e-a129-35583df2a8a1","actor_username":"contact@prodiving.asia","actor_via_sso":false,"log_type":"account","traits":{"provider":"email"}}	2026-03-19 07:05:48.942043+00	
00000000-0000-0000-0000-000000000000	36e5d366-3267-47fe-b5a7-bcac9df540ec	{"action":"token_refreshed","actor_id":"780bcf0c-f47f-498e-a129-35583df2a8a1","actor_username":"contact@prodiving.asia","actor_via_sso":false,"log_type":"token"}	2026-03-19 07:12:23.852915+00	
00000000-0000-0000-0000-000000000000	c43926b4-50ee-4f60-96f3-ff59a1d143da	{"action":"token_revoked","actor_id":"780bcf0c-f47f-498e-a129-35583df2a8a1","actor_username":"contact@prodiving.asia","actor_via_sso":false,"log_type":"token"}	2026-03-19 07:12:23.8704+00	
00000000-0000-0000-0000-000000000000	dc563d9e-699d-4927-886a-963c6b286d50	{"action":"token_refreshed","actor_id":"780bcf0c-f47f-498e-a129-35583df2a8a1","actor_username":"contact@prodiving.asia","actor_via_sso":false,"log_type":"token"}	2026-03-19 07:59:40.856382+00	
00000000-0000-0000-0000-000000000000	937f8153-dddd-49bb-bf00-6d32ff0806d5	{"action":"token_revoked","actor_id":"780bcf0c-f47f-498e-a129-35583df2a8a1","actor_username":"contact@prodiving.asia","actor_via_sso":false,"log_type":"token"}	2026-03-19 07:59:40.878618+00	
00000000-0000-0000-0000-000000000000	1fb1d57e-e05f-40b4-a156-442d35d17023	{"action":"token_refreshed","actor_id":"780bcf0c-f47f-498e-a129-35583df2a8a1","actor_username":"contact@prodiving.asia","actor_via_sso":false,"log_type":"token"}	2026-03-19 08:18:54.005957+00	
00000000-0000-0000-0000-000000000000	3d3d9034-54e1-4f3d-b98b-66e6f50ce975	{"action":"token_revoked","actor_id":"780bcf0c-f47f-498e-a129-35583df2a8a1","actor_username":"contact@prodiving.asia","actor_via_sso":false,"log_type":"token"}	2026-03-19 08:18:54.016128+00	
00000000-0000-0000-0000-000000000000	ac26217e-0e64-4ca9-b32a-307991a08755	{"action":"token_refreshed","actor_id":"780bcf0c-f47f-498e-a129-35583df2a8a1","actor_username":"contact@prodiving.asia","actor_via_sso":false,"log_type":"token"}	2026-03-19 08:26:26.695236+00	
00000000-0000-0000-0000-000000000000	aef914d4-ed1d-44e6-b2cf-ee5bc8ffe929	{"action":"token_revoked","actor_id":"780bcf0c-f47f-498e-a129-35583df2a8a1","actor_username":"contact@prodiving.asia","actor_via_sso":false,"log_type":"token"}	2026-03-19 08:26:26.702279+00	
00000000-0000-0000-0000-000000000000	182d4fa7-7eb1-4b4d-ba16-445edf3f7711	{"action":"token_refreshed","actor_id":"780bcf0c-f47f-498e-a129-35583df2a8a1","actor_username":"contact@prodiving.asia","actor_via_sso":false,"log_type":"token"}	2026-03-19 08:58:10.900105+00	
00000000-0000-0000-0000-000000000000	a0a2ed59-938d-4bca-a106-4f0ed2390c2a	{"action":"token_revoked","actor_id":"780bcf0c-f47f-498e-a129-35583df2a8a1","actor_username":"contact@prodiving.asia","actor_via_sso":false,"log_type":"token"}	2026-03-19 08:58:10.926457+00	
00000000-0000-0000-0000-000000000000	07187409-affa-4b34-b69e-f8fa2a9fce2c	{"action":"token_refreshed","actor_id":"780bcf0c-f47f-498e-a129-35583df2a8a1","actor_username":"contact@prodiving.asia","actor_via_sso":false,"log_type":"token"}	2026-03-19 09:25:22.68936+00	
00000000-0000-0000-0000-000000000000	480cd6b0-da35-48e6-b4ba-9e81d9946f50	{"action":"token_revoked","actor_id":"780bcf0c-f47f-498e-a129-35583df2a8a1","actor_username":"contact@prodiving.asia","actor_via_sso":false,"log_type":"token"}	2026-03-19 09:25:22.7066+00	
00000000-0000-0000-0000-000000000000	6f683d53-e6f6-4139-bf3c-bbeae0b52ec5	{"action":"token_refreshed","actor_id":"780bcf0c-f47f-498e-a129-35583df2a8a1","actor_username":"contact@prodiving.asia","actor_via_sso":false,"log_type":"token"}	2026-03-19 09:25:38.502517+00	
00000000-0000-0000-0000-000000000000	a1e8fa27-8dfb-4dfc-bae6-f703989cc122	{"action":"token_revoked","actor_id":"780bcf0c-f47f-498e-a129-35583df2a8a1","actor_username":"contact@prodiving.asia","actor_via_sso":false,"log_type":"token"}	2026-03-19 09:25:38.515086+00	
00000000-0000-0000-0000-000000000000	77df1fa8-4c4e-45c6-8044-ccc9bde9be6f	{"action":"token_refreshed","actor_id":"780bcf0c-f47f-498e-a129-35583df2a8a1","actor_username":"contact@prodiving.asia","actor_via_sso":false,"log_type":"token"}	2026-03-19 09:56:13.717576+00	
00000000-0000-0000-0000-000000000000	3e2edb83-04ec-4c32-b0cb-5e057b21e2ca	{"action":"token_revoked","actor_id":"780bcf0c-f47f-498e-a129-35583df2a8a1","actor_username":"contact@prodiving.asia","actor_via_sso":false,"log_type":"token"}	2026-03-19 09:56:13.739143+00	
00000000-0000-0000-0000-000000000000	30a137c5-0cbc-4365-b61b-9bde8c12a06c	{"action":"token_refreshed","actor_id":"780bcf0c-f47f-498e-a129-35583df2a8a1","actor_username":"contact@prodiving.asia","actor_via_sso":false,"log_type":"token"}	2026-03-19 10:24:13.205372+00	
00000000-0000-0000-0000-000000000000	94ad993e-0264-4e2e-8a2f-4cff31a11647	{"action":"token_revoked","actor_id":"780bcf0c-f47f-498e-a129-35583df2a8a1","actor_username":"contact@prodiving.asia","actor_via_sso":false,"log_type":"token"}	2026-03-19 10:24:13.220471+00	
00000000-0000-0000-0000-000000000000	c7c320e5-2c98-4bb1-868a-68944941b35b	{"action":"logout","actor_id":"780bcf0c-f47f-498e-a129-35583df2a8a1","actor_username":"contact@prodiving.asia","actor_via_sso":false,"log_type":"account"}	2026-03-19 10:36:06.963599+00	
00000000-0000-0000-0000-000000000000	bae5d4e7-8c8f-495d-aa23-b794996a9215	{"action":"login","actor_id":"780bcf0c-f47f-498e-a129-35583df2a8a1","actor_username":"contact@prodiving.asia","actor_via_sso":false,"log_type":"account","traits":{"provider":"email"}}	2026-03-19 10:36:13.841425+00	
00000000-0000-0000-0000-000000000000	f3f8321c-c169-4c41-b2d8-877a05ac8c45	{"action":"login","actor_id":"780bcf0c-f47f-498e-a129-35583df2a8a1","actor_username":"contact@prodiving.asia","actor_via_sso":false,"log_type":"account","traits":{"provider":"email"}}	2026-03-19 10:55:05.97798+00	
00000000-0000-0000-0000-000000000000	ba716399-2877-4d86-9561-00c9a9425d1c	{"action":"token_refreshed","actor_id":"780bcf0c-f47f-498e-a129-35583df2a8a1","actor_username":"contact@prodiving.asia","actor_via_sso":false,"log_type":"token"}	2026-03-19 11:38:13.195644+00	
00000000-0000-0000-0000-000000000000	6d65ba95-a895-4333-b83c-49e48918f54d	{"action":"token_revoked","actor_id":"780bcf0c-f47f-498e-a129-35583df2a8a1","actor_username":"contact@prodiving.asia","actor_via_sso":false,"log_type":"token"}	2026-03-19 11:38:13.203698+00	
00000000-0000-0000-0000-000000000000	e7929e91-9821-4b9b-a1be-c151b96ad425	{"action":"token_refreshed","actor_id":"780bcf0c-f47f-498e-a129-35583df2a8a1","actor_username":"contact@prodiving.asia","actor_via_sso":false,"log_type":"token"}	2026-03-19 11:53:20.047457+00	
00000000-0000-0000-0000-000000000000	840c7aa8-c272-4d63-a2b9-c71296cc5b50	{"action":"token_revoked","actor_id":"780bcf0c-f47f-498e-a129-35583df2a8a1","actor_username":"contact@prodiving.asia","actor_via_sso":false,"log_type":"token"}	2026-03-19 11:53:20.068871+00	
00000000-0000-0000-0000-000000000000	4b54d5b8-0a7c-44d3-b604-74b0e459b793	{"action":"logout","actor_id":"780bcf0c-f47f-498e-a129-35583df2a8a1","actor_username":"contact@prodiving.asia","actor_via_sso":false,"log_type":"account"}	2026-03-19 12:28:41.906159+00	
00000000-0000-0000-0000-000000000000	73d9fa44-0781-42c4-a24d-72141bb57916	{"action":"login","actor_id":"780bcf0c-f47f-498e-a129-35583df2a8a1","actor_username":"contact@prodiving.asia","actor_via_sso":false,"log_type":"account","traits":{"provider":"email"}}	2026-03-19 12:28:49.692787+00	
00000000-0000-0000-0000-000000000000	59ad3905-e299-4869-a895-bd6b2d159efd	{"action":"login","actor_id":"780bcf0c-f47f-498e-a129-35583df2a8a1","actor_username":"contact@prodiving.asia","actor_via_sso":false,"log_type":"account","traits":{"provider":"email"}}	2026-03-19 12:30:17.07993+00	
00000000-0000-0000-0000-000000000000	d5fc6b6f-9de7-4d9c-9cfe-fc63eb8b6aa2	{"action":"token_refreshed","actor_id":"780bcf0c-f47f-498e-a129-35583df2a8a1","actor_username":"contact@prodiving.asia","actor_via_sso":false,"log_type":"token"}	2026-03-19 14:09:21.44746+00	
00000000-0000-0000-0000-000000000000	b8aab6b2-6f49-4abf-a12d-ccbe0e73f748	{"action":"token_revoked","actor_id":"780bcf0c-f47f-498e-a129-35583df2a8a1","actor_username":"contact@prodiving.asia","actor_via_sso":false,"log_type":"token"}	2026-03-19 14:09:21.476072+00	
00000000-0000-0000-0000-000000000000	8975c968-2a13-4d89-a57f-15cdf0d0b38e	{"action":"token_refreshed","actor_id":"780bcf0c-f47f-498e-a129-35583df2a8a1","actor_username":"contact@prodiving.asia","actor_via_sso":false,"log_type":"token"}	2026-03-19 14:36:14.90965+00	
00000000-0000-0000-0000-000000000000	84c9ad15-6a21-427f-98f4-f8b82be2c5c4	{"action":"token_revoked","actor_id":"780bcf0c-f47f-498e-a129-35583df2a8a1","actor_username":"contact@prodiving.asia","actor_via_sso":false,"log_type":"token"}	2026-03-19 14:36:14.927215+00	
00000000-0000-0000-0000-000000000000	d85b1a56-ea93-4758-8035-a85a5c840a56	{"action":"token_refreshed","actor_id":"780bcf0c-f47f-498e-a129-35583df2a8a1","actor_username":"contact@prodiving.asia","actor_via_sso":false,"log_type":"token"}	2026-03-20 08:54:33.240065+00	
00000000-0000-0000-0000-000000000000	3ba6ae5b-e6ca-4524-ac94-82fdb6c2dff2	{"action":"token_revoked","actor_id":"780bcf0c-f47f-498e-a129-35583df2a8a1","actor_username":"contact@prodiving.asia","actor_via_sso":false,"log_type":"token"}	2026-03-20 08:54:33.25972+00	
00000000-0000-0000-0000-000000000000	12f6bc30-ab91-45d4-814e-9aca70306e63	{"action":"token_refreshed","actor_id":"780bcf0c-f47f-498e-a129-35583df2a8a1","actor_username":"contact@prodiving.asia","actor_via_sso":false,"log_type":"token"}	2026-03-20 08:59:31.359244+00	
00000000-0000-0000-0000-000000000000	93a20c60-0806-4bb4-9975-60ac50ca4495	{"action":"token_revoked","actor_id":"780bcf0c-f47f-498e-a129-35583df2a8a1","actor_username":"contact@prodiving.asia","actor_via_sso":false,"log_type":"token"}	2026-03-20 08:59:31.374781+00	
00000000-0000-0000-0000-000000000000	46b083c8-e461-4472-a7e5-0316642dd278	{"action":"login","actor_id":"780bcf0c-f47f-498e-a129-35583df2a8a1","actor_username":"contact@prodiving.asia","actor_via_sso":false,"log_type":"account","traits":{"provider":"email"}}	2026-03-20 09:08:13.266819+00	
00000000-0000-0000-0000-000000000000	fa6b0266-0a12-44be-8641-f038932c37d6	{"action":"login","actor_id":"780bcf0c-f47f-498e-a129-35583df2a8a1","actor_username":"contact@prodiving.asia","actor_via_sso":false,"log_type":"account","traits":{"provider":"email"}}	2026-03-20 10:26:35.318074+00	
00000000-0000-0000-0000-000000000000	6e306f34-c108-4b55-b4ca-cbb87cccd9a7	{"action":"login","actor_id":"780bcf0c-f47f-498e-a129-35583df2a8a1","actor_username":"contact@prodiving.asia","actor_via_sso":false,"log_type":"account","traits":{"provider":"email"}}	2026-03-20 11:26:51.97044+00	
00000000-0000-0000-0000-000000000000	b1eed59b-fb6d-437f-aefa-0de0e381f728	{"action":"token_refreshed","actor_id":"780bcf0c-f47f-498e-a129-35583df2a8a1","actor_username":"contact@prodiving.asia","actor_via_sso":false,"log_type":"token"}	2026-03-20 11:33:04.207877+00	
00000000-0000-0000-0000-000000000000	6ee0f7a3-9a39-4d95-b657-3f3204332459	{"action":"token_revoked","actor_id":"780bcf0c-f47f-498e-a129-35583df2a8a1","actor_username":"contact@prodiving.asia","actor_via_sso":false,"log_type":"token"}	2026-03-20 11:33:04.233933+00	
00000000-0000-0000-0000-000000000000	d97dc1b2-cc9d-4918-9a82-c973449e6e4a	{"action":"token_refreshed","actor_id":"780bcf0c-f47f-498e-a129-35583df2a8a1","actor_username":"contact@prodiving.asia","actor_via_sso":false,"log_type":"token"}	2026-03-20 12:25:44.385593+00	
00000000-0000-0000-0000-000000000000	e41c3d8d-adab-45f4-bf09-4797e4a835e6	{"action":"token_revoked","actor_id":"780bcf0c-f47f-498e-a129-35583df2a8a1","actor_username":"contact@prodiving.asia","actor_via_sso":false,"log_type":"token"}	2026-03-20 12:25:44.402943+00	
00000000-0000-0000-0000-000000000000	8f6e7825-a18e-42bc-b3fc-f5bd29e4f310	{"action":"token_refreshed","actor_id":"780bcf0c-f47f-498e-a129-35583df2a8a1","actor_username":"contact@prodiving.asia","actor_via_sso":false,"log_type":"token"}	2026-03-20 12:31:36.200589+00	
00000000-0000-0000-0000-000000000000	51d348f3-4245-4b89-8e37-cebc98ed64d8	{"action":"token_revoked","actor_id":"780bcf0c-f47f-498e-a129-35583df2a8a1","actor_username":"contact@prodiving.asia","actor_via_sso":false,"log_type":"token"}	2026-03-20 12:31:36.216973+00	
00000000-0000-0000-0000-000000000000	c826219b-3b62-4d65-bef6-043baebb219e	{"action":"token_refreshed","actor_id":"780bcf0c-f47f-498e-a129-35583df2a8a1","actor_username":"contact@prodiving.asia","actor_via_sso":false,"log_type":"token"}	2026-03-20 13:24:36.438098+00	
00000000-0000-0000-0000-000000000000	bbd7bf6e-eae2-4a77-86bf-e827088915ba	{"action":"token_revoked","actor_id":"780bcf0c-f47f-498e-a129-35583df2a8a1","actor_username":"contact@prodiving.asia","actor_via_sso":false,"log_type":"token"}	2026-03-20 13:24:36.450845+00	
00000000-0000-0000-0000-000000000000	55c230c0-579d-4da1-9760-1ec3a42f73b5	{"action":"token_refreshed","actor_id":"780bcf0c-f47f-498e-a129-35583df2a8a1","actor_username":"contact@prodiving.asia","actor_via_sso":false,"log_type":"token"}	2026-03-20 13:32:52.86689+00	
00000000-0000-0000-0000-000000000000	fd875e5a-c34d-4633-977c-332fef4f2a7b	{"action":"token_revoked","actor_id":"780bcf0c-f47f-498e-a129-35583df2a8a1","actor_username":"contact@prodiving.asia","actor_via_sso":false,"log_type":"token"}	2026-03-20 13:32:52.893626+00	
00000000-0000-0000-0000-000000000000	f6c269db-7b30-4d84-a9db-c706dd233a71	{"action":"token_refreshed","actor_id":"780bcf0c-f47f-498e-a129-35583df2a8a1","actor_username":"contact@prodiving.asia","actor_via_sso":false,"log_type":"token"}	2026-03-20 14:33:49.314694+00	
00000000-0000-0000-0000-000000000000	6ccb3345-861c-4c3d-b264-922fe52a0c21	{"action":"token_revoked","actor_id":"780bcf0c-f47f-498e-a129-35583df2a8a1","actor_username":"contact@prodiving.asia","actor_via_sso":false,"log_type":"token"}	2026-03-20 14:33:49.328925+00	
00000000-0000-0000-0000-000000000000	4f9c4864-f7d8-435f-b5dd-69bc97935cdb	{"action":"token_refreshed","actor_id":"780bcf0c-f47f-498e-a129-35583df2a8a1","actor_username":"contact@prodiving.asia","actor_via_sso":false,"log_type":"token"}	2026-03-20 15:41:25.911376+00	
00000000-0000-0000-0000-000000000000	3da9f0a1-6227-4c74-8173-de190d223e09	{"action":"token_revoked","actor_id":"780bcf0c-f47f-498e-a129-35583df2a8a1","actor_username":"contact@prodiving.asia","actor_via_sso":false,"log_type":"token"}	2026-03-20 15:41:25.929083+00	
00000000-0000-0000-0000-000000000000	63be8561-2e36-4459-95c5-654ff9830f38	{"action":"token_refreshed","actor_id":"780bcf0c-f47f-498e-a129-35583df2a8a1","actor_username":"contact@prodiving.asia","actor_via_sso":false,"log_type":"token"}	2026-03-20 15:41:32.599911+00	
00000000-0000-0000-0000-000000000000	17e4b4d8-d70e-4aca-b287-c94e0a42dc10	{"action":"token_revoked","actor_id":"780bcf0c-f47f-498e-a129-35583df2a8a1","actor_username":"contact@prodiving.asia","actor_via_sso":false,"log_type":"token"}	2026-03-20 15:41:32.601014+00	
00000000-0000-0000-0000-000000000000	0d65bade-a258-4af2-a9b3-4df59211f54a	{"action":"token_refreshed","actor_id":"780bcf0c-f47f-498e-a129-35583df2a8a1","actor_username":"contact@prodiving.asia","actor_via_sso":false,"log_type":"token"}	2026-03-20 16:54:26.878504+00	
00000000-0000-0000-0000-000000000000	7e8a5bac-6245-4e0d-af2a-7bb84e486343	{"action":"token_revoked","actor_id":"780bcf0c-f47f-498e-a129-35583df2a8a1","actor_username":"contact@prodiving.asia","actor_via_sso":false,"log_type":"token"}	2026-03-20 16:54:26.900185+00	
00000000-0000-0000-0000-000000000000	fcd09df8-324a-4f16-81c4-fb4d66e055a0	{"action":"token_refreshed","actor_id":"780bcf0c-f47f-498e-a129-35583df2a8a1","actor_username":"contact@prodiving.asia","actor_via_sso":false,"log_type":"token"}	2026-03-20 17:08:32.755819+00	
00000000-0000-0000-0000-000000000000	8371a2d7-ca51-4d59-bd64-52a2cd8453cc	{"action":"token_revoked","actor_id":"780bcf0c-f47f-498e-a129-35583df2a8a1","actor_username":"contact@prodiving.asia","actor_via_sso":false,"log_type":"token"}	2026-03-20 17:08:32.769644+00	
00000000-0000-0000-0000-000000000000	121465f0-56d8-402c-a6e5-fb5313d662e1	{"action":"token_refreshed","actor_id":"780bcf0c-f47f-498e-a129-35583df2a8a1","actor_username":"contact@prodiving.asia","actor_via_sso":false,"log_type":"token"}	2026-03-21 08:37:44.719129+00	
00000000-0000-0000-0000-000000000000	02bc1d98-49c3-465b-a16f-69ea1331e75f	{"action":"token_revoked","actor_id":"780bcf0c-f47f-498e-a129-35583df2a8a1","actor_username":"contact@prodiving.asia","actor_via_sso":false,"log_type":"token"}	2026-03-21 08:37:44.745194+00	
00000000-0000-0000-0000-000000000000	4b7c77a9-ae0a-4a99-9be7-2eadb75f24c2	{"action":"token_refreshed","actor_id":"780bcf0c-f47f-498e-a129-35583df2a8a1","actor_username":"contact@prodiving.asia","actor_via_sso":false,"log_type":"token"}	2026-03-21 08:46:56.661127+00	
00000000-0000-0000-0000-000000000000	7c6a9f99-0a95-4aab-93d9-ec4415921a2e	{"action":"token_revoked","actor_id":"780bcf0c-f47f-498e-a129-35583df2a8a1","actor_username":"contact@prodiving.asia","actor_via_sso":false,"log_type":"token"}	2026-03-21 08:46:56.674618+00	
00000000-0000-0000-0000-000000000000	905408b0-49df-4455-8cc4-0f712f6ab12b	{"action":"token_refreshed","actor_id":"780bcf0c-f47f-498e-a129-35583df2a8a1","actor_username":"contact@prodiving.asia","actor_via_sso":false,"log_type":"token"}	2026-03-21 09:43:30.084902+00	
00000000-0000-0000-0000-000000000000	5e81c901-0128-4578-9502-2ae6aaf36fca	{"action":"token_revoked","actor_id":"780bcf0c-f47f-498e-a129-35583df2a8a1","actor_username":"contact@prodiving.asia","actor_via_sso":false,"log_type":"token"}	2026-03-21 09:43:30.110909+00	
00000000-0000-0000-0000-000000000000	a767f8d4-b1b9-411b-b16d-5ebb5305eeae	{"action":"token_refreshed","actor_id":"780bcf0c-f47f-498e-a129-35583df2a8a1","actor_username":"contact@prodiving.asia","actor_via_sso":false,"log_type":"token"}	2026-03-21 09:51:08.728832+00	
00000000-0000-0000-0000-000000000000	c27d738a-3327-480e-8312-e83a2f0944c6	{"action":"token_revoked","actor_id":"780bcf0c-f47f-498e-a129-35583df2a8a1","actor_username":"contact@prodiving.asia","actor_via_sso":false,"log_type":"token"}	2026-03-21 09:51:08.740386+00	
00000000-0000-0000-0000-000000000000	d3426096-7180-4857-96e1-546586e6e733	{"action":"login","actor_id":"780bcf0c-f47f-498e-a129-35583df2a8a1","actor_username":"contact@prodiving.asia","actor_via_sso":false,"log_type":"account","traits":{"provider":"email"}}	2026-03-21 10:43:42.004256+00	
00000000-0000-0000-0000-000000000000	43e86a0d-e2ee-44ef-bc58-372a49958f20	{"action":"token_refreshed","actor_id":"780bcf0c-f47f-498e-a129-35583df2a8a1","actor_username":"contact@prodiving.asia","actor_via_sso":false,"log_type":"token"}	2026-03-21 10:51:40.441918+00	
00000000-0000-0000-0000-000000000000	f92953e6-499e-437a-acf5-38bd4fab8a97	{"action":"token_revoked","actor_id":"780bcf0c-f47f-498e-a129-35583df2a8a1","actor_username":"contact@prodiving.asia","actor_via_sso":false,"log_type":"token"}	2026-03-21 10:51:40.472842+00	
00000000-0000-0000-0000-000000000000	c88e5f48-6e18-4247-b233-8f250e3c4223	{"action":"token_refreshed","actor_id":"780bcf0c-f47f-498e-a129-35583df2a8a1","actor_username":"contact@prodiving.asia","actor_via_sso":false,"log_type":"token"}	2026-03-21 11:10:35.701245+00	
00000000-0000-0000-0000-000000000000	e625b430-b2d9-4620-bd1c-2bc62723aff9	{"action":"token_revoked","actor_id":"780bcf0c-f47f-498e-a129-35583df2a8a1","actor_username":"contact@prodiving.asia","actor_via_sso":false,"log_type":"token"}	2026-03-21 11:10:35.723153+00	
00000000-0000-0000-0000-000000000000	3946000d-1ab9-4474-a297-59297a0f545b	{"action":"token_refreshed","actor_id":"780bcf0c-f47f-498e-a129-35583df2a8a1","actor_username":"contact@prodiving.asia","actor_via_sso":false,"log_type":"token"}	2026-03-21 12:08:53.115027+00	
00000000-0000-0000-0000-000000000000	400a527b-25e3-475e-a519-f14ac2f97323	{"action":"token_revoked","actor_id":"780bcf0c-f47f-498e-a129-35583df2a8a1","actor_username":"contact@prodiving.asia","actor_via_sso":false,"log_type":"token"}	2026-03-21 12:08:53.134163+00	
00000000-0000-0000-0000-000000000000	296b22c8-df38-4d7d-ab32-750f64278ebe	{"action":"token_refreshed","actor_id":"780bcf0c-f47f-498e-a129-35583df2a8a1","actor_username":"contact@prodiving.asia","actor_via_sso":false,"log_type":"token"}	2026-03-21 13:25:19.332214+00	
00000000-0000-0000-0000-000000000000	51c80e1e-20a2-4baf-8876-e98c7a0d0ac4	{"action":"token_revoked","actor_id":"780bcf0c-f47f-498e-a129-35583df2a8a1","actor_username":"contact@prodiving.asia","actor_via_sso":false,"log_type":"token"}	2026-03-21 13:25:19.349468+00	
00000000-0000-0000-0000-000000000000	4626ff47-00d2-43d8-b2e4-81d1be360a8e	{"action":"token_refreshed","actor_id":"780bcf0c-f47f-498e-a129-35583df2a8a1","actor_username":"contact@prodiving.asia","actor_via_sso":false,"log_type":"token"}	2026-03-21 14:11:02.523735+00	
00000000-0000-0000-0000-000000000000	eab2d3f8-1d23-4b25-b1fe-708d57229af8	{"action":"token_revoked","actor_id":"780bcf0c-f47f-498e-a129-35583df2a8a1","actor_username":"contact@prodiving.asia","actor_via_sso":false,"log_type":"token"}	2026-03-21 14:11:02.535215+00	
00000000-0000-0000-0000-000000000000	08a8e2ef-f640-4aa1-b6a7-b622e166b227	{"action":"token_refreshed","actor_id":"780bcf0c-f47f-498e-a129-35583df2a8a1","actor_username":"contact@prodiving.asia","actor_via_sso":false,"log_type":"token"}	2026-03-21 14:31:16.510739+00	
00000000-0000-0000-0000-000000000000	22a002b8-363e-4457-923c-d44ca303f8b1	{"action":"token_revoked","actor_id":"780bcf0c-f47f-498e-a129-35583df2a8a1","actor_username":"contact@prodiving.asia","actor_via_sso":false,"log_type":"token"}	2026-03-21 14:31:16.52881+00	
00000000-0000-0000-0000-000000000000	6b8aab9c-5215-42f3-8829-e4cd079af619	{"action":"token_refreshed","actor_id":"780bcf0c-f47f-498e-a129-35583df2a8a1","actor_username":"contact@prodiving.asia","actor_via_sso":false,"log_type":"token"}	2026-03-21 14:54:59.867167+00	
00000000-0000-0000-0000-000000000000	4187b894-b54b-4c10-ae72-481d4fbb0599	{"action":"token_revoked","actor_id":"780bcf0c-f47f-498e-a129-35583df2a8a1","actor_username":"contact@prodiving.asia","actor_via_sso":false,"log_type":"token"}	2026-03-21 14:54:59.893828+00	
00000000-0000-0000-0000-000000000000	46754fdd-88a4-4c6c-bc9c-2e7d2577410a	{"action":"token_refreshed","actor_id":"780bcf0c-f47f-498e-a129-35583df2a8a1","actor_username":"contact@prodiving.asia","actor_via_sso":false,"log_type":"token"}	2026-03-21 15:12:49.584321+00	
00000000-0000-0000-0000-000000000000	444b0a27-7e7f-44aa-b7f7-ccf8e0decf46	{"action":"token_revoked","actor_id":"780bcf0c-f47f-498e-a129-35583df2a8a1","actor_username":"contact@prodiving.asia","actor_via_sso":false,"log_type":"token"}	2026-03-21 15:12:49.604934+00	
00000000-0000-0000-0000-000000000000	8576741c-97cb-4b7f-9760-6d6d438df770	{"action":"token_refreshed","actor_id":"780bcf0c-f47f-498e-a129-35583df2a8a1","actor_username":"contact@prodiving.asia","actor_via_sso":false,"log_type":"token"}	2026-03-21 15:30:51.99181+00	
00000000-0000-0000-0000-000000000000	5fe03466-d79d-4cb2-a415-b74db2d9dcc1	{"action":"token_revoked","actor_id":"780bcf0c-f47f-498e-a129-35583df2a8a1","actor_username":"contact@prodiving.asia","actor_via_sso":false,"log_type":"token"}	2026-03-21 15:30:52.014997+00	
00000000-0000-0000-0000-000000000000	b36d8288-e340-488c-a1b6-1f3bca10e81e	{"action":"token_refreshed","actor_id":"3a679996-7773-4b9b-a3fe-93c031266ef9","actor_username":"peter@onemedia.asia","actor_via_sso":false,"log_type":"token"}	2026-03-21 15:31:39.198829+00	
00000000-0000-0000-0000-000000000000	b7d6c9ac-4c4f-4665-ab4f-963b2dd26903	{"action":"token_revoked","actor_id":"3a679996-7773-4b9b-a3fe-93c031266ef9","actor_username":"peter@onemedia.asia","actor_via_sso":false,"log_type":"token"}	2026-03-21 15:31:39.200909+00	
00000000-0000-0000-0000-000000000000	0573977c-f83f-45b8-ad61-eac0c56f8f38	{"action":"token_refreshed","actor_id":"780bcf0c-f47f-498e-a129-35583df2a8a1","actor_username":"contact@prodiving.asia","actor_via_sso":false,"log_type":"token"}	2026-03-21 16:02:23.953475+00	
00000000-0000-0000-0000-000000000000	fd046c91-d4cd-46ca-8da8-498b89952c11	{"action":"token_revoked","actor_id":"780bcf0c-f47f-498e-a129-35583df2a8a1","actor_username":"contact@prodiving.asia","actor_via_sso":false,"log_type":"token"}	2026-03-21 16:02:23.984469+00	
00000000-0000-0000-0000-000000000000	a5b3c9df-2811-48b0-a396-8e20e075c365	{"action":"login","actor_id":"780bcf0c-f47f-498e-a129-35583df2a8a1","actor_username":"contact@prodiving.asia","actor_via_sso":false,"log_type":"account","traits":{"provider":"email"}}	2026-03-21 16:14:41.814092+00	
00000000-0000-0000-0000-000000000000	493cfc6f-b233-4d75-9043-472caf3f6ed8	{"action":"token_refreshed","actor_id":"780bcf0c-f47f-498e-a129-35583df2a8a1","actor_username":"contact@prodiving.asia","actor_via_sso":false,"log_type":"token"}	2026-03-21 16:29:18.073449+00	
00000000-0000-0000-0000-000000000000	6445a0f4-46ce-40e2-87bd-e61f29f0f11b	{"action":"token_revoked","actor_id":"780bcf0c-f47f-498e-a129-35583df2a8a1","actor_username":"contact@prodiving.asia","actor_via_sso":false,"log_type":"token"}	2026-03-21 16:29:18.099605+00	
00000000-0000-0000-0000-000000000000	0a87981b-9925-4c89-bb31-efca148aaeef	{"action":"token_refreshed","actor_id":"780bcf0c-f47f-498e-a129-35583df2a8a1","actor_username":"contact@prodiving.asia","actor_via_sso":false,"log_type":"token"}	2026-03-21 16:39:40.954611+00	
00000000-0000-0000-0000-000000000000	588a7872-13f2-434e-90f8-bf2f4e939a9b	{"action":"token_revoked","actor_id":"780bcf0c-f47f-498e-a129-35583df2a8a1","actor_username":"contact@prodiving.asia","actor_via_sso":false,"log_type":"token"}	2026-03-21 16:39:40.967503+00	
00000000-0000-0000-0000-000000000000	37f44c92-35b6-4721-9a2e-48c8539d8ce7	{"action":"token_refreshed","actor_id":"780bcf0c-f47f-498e-a129-35583df2a8a1","actor_username":"contact@prodiving.asia","actor_via_sso":false,"log_type":"token"}	2026-03-21 17:13:07.461323+00	
00000000-0000-0000-0000-000000000000	3c1cf0fb-f5cf-4dcb-88cb-5fd82643b623	{"action":"token_revoked","actor_id":"780bcf0c-f47f-498e-a129-35583df2a8a1","actor_username":"contact@prodiving.asia","actor_via_sso":false,"log_type":"token"}	2026-03-21 17:13:07.478083+00	
00000000-0000-0000-0000-000000000000	01d28e12-9de3-4af0-b2ac-c321dcbb872e	{"action":"token_refreshed","actor_id":"780bcf0c-f47f-498e-a129-35583df2a8a1","actor_username":"contact@prodiving.asia","actor_via_sso":false,"log_type":"token"}	2026-03-21 17:13:24.63009+00	
00000000-0000-0000-0000-000000000000	0fe32040-3b51-4026-be4c-ef980a9de0b5	{"action":"token_revoked","actor_id":"780bcf0c-f47f-498e-a129-35583df2a8a1","actor_username":"contact@prodiving.asia","actor_via_sso":false,"log_type":"token"}	2026-03-21 17:13:24.631546+00	
00000000-0000-0000-0000-000000000000	ed57fe53-96a1-4a1c-896d-7fd51a3c62a5	{"action":"token_refreshed","actor_id":"780bcf0c-f47f-498e-a129-35583df2a8a1","actor_username":"contact@prodiving.asia","actor_via_sso":false,"log_type":"token"}	2026-03-21 17:27:47.114472+00	
00000000-0000-0000-0000-000000000000	903da210-5419-4aa6-839f-7dee5fc199de	{"action":"token_revoked","actor_id":"780bcf0c-f47f-498e-a129-35583df2a8a1","actor_username":"contact@prodiving.asia","actor_via_sso":false,"log_type":"token"}	2026-03-21 17:27:47.134463+00	
00000000-0000-0000-0000-000000000000	bace28f7-f0f2-4e6c-af14-1ae6f9cd12ba	{"action":"token_refreshed","actor_id":"780bcf0c-f47f-498e-a129-35583df2a8a1","actor_username":"contact@prodiving.asia","actor_via_sso":false,"log_type":"token"}	2026-03-21 17:39:46.035981+00	
00000000-0000-0000-0000-000000000000	3e08f5dc-cb7c-41f9-914a-8b3d36848fac	{"action":"token_revoked","actor_id":"780bcf0c-f47f-498e-a129-35583df2a8a1","actor_username":"contact@prodiving.asia","actor_via_sso":false,"log_type":"token"}	2026-03-21 17:39:46.047115+00	
00000000-0000-0000-0000-000000000000	096ff312-738b-452b-8bdf-b7fd32457006	{"action":"login","actor_id":"780bcf0c-f47f-498e-a129-35583df2a8a1","actor_username":"contact@prodiving.asia","actor_via_sso":false,"log_type":"account","traits":{"provider":"email"}}	2026-03-21 18:18:17.461858+00	
00000000-0000-0000-0000-000000000000	d3d0bac6-f9f7-4c6b-a6de-3805f1bb7bc3	{"action":"token_refreshed","actor_id":"780bcf0c-f47f-498e-a129-35583df2a8a1","actor_username":"contact@prodiving.asia","actor_via_sso":false,"log_type":"token"}	2026-03-21 18:20:07.008689+00	
00000000-0000-0000-0000-000000000000	54fca671-94c4-439a-99ea-9f7eb5d0faa0	{"action":"token_revoked","actor_id":"780bcf0c-f47f-498e-a129-35583df2a8a1","actor_username":"contact@prodiving.asia","actor_via_sso":false,"log_type":"token"}	2026-03-21 18:20:07.028942+00	
00000000-0000-0000-0000-000000000000	610ad72a-759b-4935-81ea-14df5d863b6d	{"action":"token_refreshed","actor_id":"780bcf0c-f47f-498e-a129-35583df2a8a1","actor_username":"contact@prodiving.asia","actor_via_sso":false,"log_type":"token"}	2026-03-21 18:26:16.917957+00	
00000000-0000-0000-0000-000000000000	d84d6324-35a5-4490-9ab1-7b34608cb690	{"action":"token_revoked","actor_id":"780bcf0c-f47f-498e-a129-35583df2a8a1","actor_username":"contact@prodiving.asia","actor_via_sso":false,"log_type":"token"}	2026-03-21 18:26:16.929396+00	
00000000-0000-0000-0000-000000000000	f59e18b0-5c1d-4a72-9a45-d7fd86dac46e	{"action":"token_refreshed","actor_id":"780bcf0c-f47f-498e-a129-35583df2a8a1","actor_username":"contact@prodiving.asia","actor_via_sso":false,"log_type":"token"}	2026-03-21 18:39:09.972902+00	
00000000-0000-0000-0000-000000000000	ac4886ec-fa7a-498b-9875-f666235ca9a2	{"action":"token_revoked","actor_id":"780bcf0c-f47f-498e-a129-35583df2a8a1","actor_username":"contact@prodiving.asia","actor_via_sso":false,"log_type":"token"}	2026-03-21 18:39:09.988232+00	
00000000-0000-0000-0000-000000000000	a1414410-64a1-463d-a76a-fe9b33119c55	{"action":"token_refreshed","actor_id":"780bcf0c-f47f-498e-a129-35583df2a8a1","actor_username":"contact@prodiving.asia","actor_via_sso":false,"log_type":"token"}	2026-03-21 18:56:07.067674+00	
00000000-0000-0000-0000-000000000000	84663dc4-5988-4ca3-b4e3-527faba6cd12	{"action":"token_revoked","actor_id":"780bcf0c-f47f-498e-a129-35583df2a8a1","actor_username":"contact@prodiving.asia","actor_via_sso":false,"log_type":"token"}	2026-03-21 18:56:07.086042+00	
00000000-0000-0000-0000-000000000000	87d7ff28-88ce-494a-a6f3-4c131973ecde	{"action":"token_refreshed","actor_id":"780bcf0c-f47f-498e-a129-35583df2a8a1","actor_username":"contact@prodiving.asia","actor_via_sso":false,"log_type":"token"}	2026-03-21 19:24:17.126102+00	
00000000-0000-0000-0000-000000000000	813cd97f-0407-4f0c-a102-a2611c7e2438	{"action":"token_revoked","actor_id":"780bcf0c-f47f-498e-a129-35583df2a8a1","actor_username":"contact@prodiving.asia","actor_via_sso":false,"log_type":"token"}	2026-03-21 19:24:17.137104+00	
00000000-0000-0000-0000-000000000000	ad5b0176-2c94-4f56-8e04-9cec930e0f29	{"action":"token_refreshed","actor_id":"780bcf0c-f47f-498e-a129-35583df2a8a1","actor_username":"contact@prodiving.asia","actor_via_sso":false,"log_type":"token"}	2026-03-21 19:37:57.96342+00	
00000000-0000-0000-0000-000000000000	33c3cf95-af86-4398-8def-63da7680b276	{"action":"token_revoked","actor_id":"780bcf0c-f47f-498e-a129-35583df2a8a1","actor_username":"contact@prodiving.asia","actor_via_sso":false,"log_type":"token"}	2026-03-21 19:37:57.979516+00	
00000000-0000-0000-0000-000000000000	ccf8d187-11bb-42d3-8c2c-e72c881e1960	{"action":"token_refreshed","actor_id":"780bcf0c-f47f-498e-a129-35583df2a8a1","actor_username":"contact@prodiving.asia","actor_via_sso":false,"log_type":"token"}	2026-03-21 19:54:44.621828+00	
00000000-0000-0000-0000-000000000000	37f4eff1-d4c2-4751-9fab-20a8a80a7849	{"action":"token_revoked","actor_id":"780bcf0c-f47f-498e-a129-35583df2a8a1","actor_username":"contact@prodiving.asia","actor_via_sso":false,"log_type":"token"}	2026-03-21 19:54:44.641872+00	
00000000-0000-0000-0000-000000000000	43d33d4f-6baf-4e96-8622-682274e4b489	{"action":"token_refreshed","actor_id":"780bcf0c-f47f-498e-a129-35583df2a8a1","actor_username":"contact@prodiving.asia","actor_via_sso":false,"log_type":"token"}	2026-03-21 20:03:18.631085+00	
00000000-0000-0000-0000-000000000000	98ea2165-a521-4629-8e9b-53763ca20588	{"action":"token_revoked","actor_id":"780bcf0c-f47f-498e-a129-35583df2a8a1","actor_username":"contact@prodiving.asia","actor_via_sso":false,"log_type":"token"}	2026-03-21 20:03:18.689559+00	
00000000-0000-0000-0000-000000000000	090b054c-0f90-4c46-b27b-1ca13b752051	{"action":"token_refreshed","actor_id":"780bcf0c-f47f-498e-a129-35583df2a8a1","actor_username":"contact@prodiving.asia","actor_via_sso":false,"log_type":"token"}	2026-03-21 20:05:39.871063+00	
00000000-0000-0000-0000-000000000000	15c5aa90-4c3d-4211-889f-30c8b0e58d45	{"action":"token_revoked","actor_id":"780bcf0c-f47f-498e-a129-35583df2a8a1","actor_username":"contact@prodiving.asia","actor_via_sso":false,"log_type":"token"}	2026-03-21 20:05:39.886978+00	
00000000-0000-0000-0000-000000000000	27ae522f-53b6-4010-80a3-73586ee8499c	{"action":"token_refreshed","actor_id":"780bcf0c-f47f-498e-a129-35583df2a8a1","actor_username":"contact@prodiving.asia","actor_via_sso":false,"log_type":"token"}	2026-03-21 20:22:39.139064+00	
00000000-0000-0000-0000-000000000000	96968140-e7d1-48d4-b9bb-c0ab80298d00	{"action":"token_revoked","actor_id":"780bcf0c-f47f-498e-a129-35583df2a8a1","actor_username":"contact@prodiving.asia","actor_via_sso":false,"log_type":"token"}	2026-03-21 20:22:39.143024+00	
00000000-0000-0000-0000-000000000000	43635bc8-0092-4a76-9e27-24a736e61011	{"action":"token_refreshed","actor_id":"780bcf0c-f47f-498e-a129-35583df2a8a1","actor_username":"contact@prodiving.asia","actor_via_sso":false,"log_type":"token"}	2026-03-21 20:50:46.75984+00	
00000000-0000-0000-0000-000000000000	7ae4c1ac-0484-42d8-89e2-007f5ba90f4c	{"action":"token_revoked","actor_id":"780bcf0c-f47f-498e-a129-35583df2a8a1","actor_username":"contact@prodiving.asia","actor_via_sso":false,"log_type":"token"}	2026-03-21 20:50:46.783913+00	
00000000-0000-0000-0000-000000000000	552ac80b-8966-45fd-b82d-16f0a91a6093	{"action":"token_refreshed","actor_id":"780bcf0c-f47f-498e-a129-35583df2a8a1","actor_username":"contact@prodiving.asia","actor_via_sso":false,"log_type":"token"}	2026-03-21 21:33:43.924231+00	
00000000-0000-0000-0000-000000000000	b922961e-1306-44eb-9c4f-8708d38ae24c	{"action":"token_revoked","actor_id":"780bcf0c-f47f-498e-a129-35583df2a8a1","actor_username":"contact@prodiving.asia","actor_via_sso":false,"log_type":"token"}	2026-03-21 21:33:43.938536+00	
00000000-0000-0000-0000-000000000000	f360418b-eab7-49c7-acb4-cca29161a5be	{"action":"token_refreshed","actor_id":"780bcf0c-f47f-498e-a129-35583df2a8a1","actor_username":"contact@prodiving.asia","actor_via_sso":false,"log_type":"token"}	2026-03-22 10:19:34.769459+00	
00000000-0000-0000-0000-000000000000	362745c4-7371-4d54-9996-9acec5fe1f09	{"action":"token_revoked","actor_id":"780bcf0c-f47f-498e-a129-35583df2a8a1","actor_username":"contact@prodiving.asia","actor_via_sso":false,"log_type":"token"}	2026-03-22 10:19:34.799478+00	
00000000-0000-0000-0000-000000000000	922ddd49-20d2-40e0-b369-8dc448cff4d9	{"action":"token_refreshed","actor_id":"780bcf0c-f47f-498e-a129-35583df2a8a1","actor_username":"contact@prodiving.asia","actor_via_sso":false,"log_type":"token"}	2026-03-22 11:26:29.77799+00	
00000000-0000-0000-0000-000000000000	7edef855-8fab-4435-9eae-085923e35a86	{"action":"token_revoked","actor_id":"780bcf0c-f47f-498e-a129-35583df2a8a1","actor_username":"contact@prodiving.asia","actor_via_sso":false,"log_type":"token"}	2026-03-22 11:26:29.799959+00	
00000000-0000-0000-0000-000000000000	532e7ee4-80f6-40ca-8bb7-39903683d76a	{"action":"token_refreshed","actor_id":"780bcf0c-f47f-498e-a129-35583df2a8a1","actor_username":"contact@prodiving.asia","actor_via_sso":false,"log_type":"token"}	2026-03-22 11:39:12.501756+00	
00000000-0000-0000-0000-000000000000	57689311-f63e-4fb7-b679-c10bf4f1fe2a	{"action":"token_revoked","actor_id":"780bcf0c-f47f-498e-a129-35583df2a8a1","actor_username":"contact@prodiving.asia","actor_via_sso":false,"log_type":"token"}	2026-03-22 11:39:12.521566+00	
00000000-0000-0000-0000-000000000000	a87813e2-25f5-4637-8677-0702714d1603	{"action":"token_refreshed","actor_id":"780bcf0c-f47f-498e-a129-35583df2a8a1","actor_username":"contact@prodiving.asia","actor_via_sso":false,"log_type":"token"}	2026-03-22 12:31:39.711027+00	
00000000-0000-0000-0000-000000000000	ddb79dd4-ea7f-471f-a575-953daab1dd34	{"action":"token_revoked","actor_id":"780bcf0c-f47f-498e-a129-35583df2a8a1","actor_username":"contact@prodiving.asia","actor_via_sso":false,"log_type":"token"}	2026-03-22 12:31:39.75228+00	
00000000-0000-0000-0000-000000000000	88925266-da3f-4f3a-abef-81ae10f0d7d3	{"action":"token_refreshed","actor_id":"780bcf0c-f47f-498e-a129-35583df2a8a1","actor_username":"contact@prodiving.asia","actor_via_sso":false,"log_type":"token"}	2026-03-22 12:39:05.382701+00	
00000000-0000-0000-0000-000000000000	8ebad7e6-395c-46d6-a06a-38caa6728b8a	{"action":"token_revoked","actor_id":"780bcf0c-f47f-498e-a129-35583df2a8a1","actor_username":"contact@prodiving.asia","actor_via_sso":false,"log_type":"token"}	2026-03-22 12:39:05.403303+00	
00000000-0000-0000-0000-000000000000	6668c3e4-4eda-4513-8c60-2e4cc7fa5dca	{"action":"token_refreshed","actor_id":"780bcf0c-f47f-498e-a129-35583df2a8a1","actor_username":"contact@prodiving.asia","actor_via_sso":false,"log_type":"token"}	2026-03-22 12:47:30.052735+00	
00000000-0000-0000-0000-000000000000	a7c59ce0-83d9-4498-89fd-20ad910a7811	{"action":"token_revoked","actor_id":"780bcf0c-f47f-498e-a129-35583df2a8a1","actor_username":"contact@prodiving.asia","actor_via_sso":false,"log_type":"token"}	2026-03-22 12:47:30.063603+00	
00000000-0000-0000-0000-000000000000	ea685947-7666-4b26-ad15-c9f3509c00bb	{"action":"token_refreshed","actor_id":"780bcf0c-f47f-498e-a129-35583df2a8a1","actor_username":"contact@prodiving.asia","actor_via_sso":false,"log_type":"token"}	2026-03-22 13:40:05.721976+00	
00000000-0000-0000-0000-000000000000	2a4da53c-9c5a-491c-b83c-a4c9927d5cc5	{"action":"token_revoked","actor_id":"780bcf0c-f47f-498e-a129-35583df2a8a1","actor_username":"contact@prodiving.asia","actor_via_sso":false,"log_type":"token"}	2026-03-22 13:40:05.744964+00	
00000000-0000-0000-0000-000000000000	81dc5aa3-078c-4b26-9905-2044063abb36	{"action":"token_refreshed","actor_id":"780bcf0c-f47f-498e-a129-35583df2a8a1","actor_username":"contact@prodiving.asia","actor_via_sso":false,"log_type":"token"}	2026-03-22 14:20:37.636474+00	
00000000-0000-0000-0000-000000000000	cfb43327-f6b3-48fc-b64b-6086ad26e79f	{"action":"token_revoked","actor_id":"780bcf0c-f47f-498e-a129-35583df2a8a1","actor_username":"contact@prodiving.asia","actor_via_sso":false,"log_type":"token"}	2026-03-22 14:20:37.660463+00	
00000000-0000-0000-0000-000000000000	50c2ec1d-a6eb-4f78-abf3-416f41dc833b	{"action":"token_refreshed","actor_id":"780bcf0c-f47f-498e-a129-35583df2a8a1","actor_username":"contact@prodiving.asia","actor_via_sso":false,"log_type":"token"}	2026-03-22 14:33:21.468908+00	
00000000-0000-0000-0000-000000000000	09c0b950-86a3-4af1-8928-ddfe8cdde3ac	{"action":"token_revoked","actor_id":"780bcf0c-f47f-498e-a129-35583df2a8a1","actor_username":"contact@prodiving.asia","actor_via_sso":false,"log_type":"token"}	2026-03-22 14:33:21.479738+00	
00000000-0000-0000-0000-000000000000	286445e6-339a-4047-bb4c-119d1a6a8bad	{"action":"token_refreshed","actor_id":"780bcf0c-f47f-498e-a129-35583df2a8a1","actor_username":"contact@prodiving.asia","actor_via_sso":false,"log_type":"token"}	2026-03-22 15:14:08.225252+00	
00000000-0000-0000-0000-000000000000	25e2563c-2f5c-4fa6-90c9-f6a8f8283326	{"action":"token_revoked","actor_id":"780bcf0c-f47f-498e-a129-35583df2a8a1","actor_username":"contact@prodiving.asia","actor_via_sso":false,"log_type":"token"}	2026-03-22 15:14:08.245352+00	
00000000-0000-0000-0000-000000000000	3fa3878b-2050-43f8-9672-f4484cd0c044	{"action":"token_refreshed","actor_id":"780bcf0c-f47f-498e-a129-35583df2a8a1","actor_username":"contact@prodiving.asia","actor_via_sso":false,"log_type":"token"}	2026-03-22 15:32:18.376472+00	
00000000-0000-0000-0000-000000000000	eb5381a4-1ca1-4550-a3ce-43e8c476c338	{"action":"token_revoked","actor_id":"780bcf0c-f47f-498e-a129-35583df2a8a1","actor_username":"contact@prodiving.asia","actor_via_sso":false,"log_type":"token"}	2026-03-22 15:32:18.398337+00	
00000000-0000-0000-0000-000000000000	11260720-3b4a-42cc-bc61-7988c476ecc4	{"action":"token_refreshed","actor_id":"780bcf0c-f47f-498e-a129-35583df2a8a1","actor_username":"contact@prodiving.asia","actor_via_sso":false,"log_type":"token"}	2026-03-22 16:19:04.3959+00	
00000000-0000-0000-0000-000000000000	2039709a-b34d-4ddd-b876-d3e26d6c5b18	{"action":"token_revoked","actor_id":"780bcf0c-f47f-498e-a129-35583df2a8a1","actor_username":"contact@prodiving.asia","actor_via_sso":false,"log_type":"token"}	2026-03-22 16:19:04.410273+00	
00000000-0000-0000-0000-000000000000	f7959922-2635-4b5a-a328-cdd082d5500a	{"action":"token_refreshed","actor_id":"780bcf0c-f47f-498e-a129-35583df2a8a1","actor_username":"contact@prodiving.asia","actor_via_sso":false,"log_type":"token"}	2026-03-22 17:17:43.643588+00	
00000000-0000-0000-0000-000000000000	689b32a1-fe06-4282-908e-284b3991ac56	{"action":"token_revoked","actor_id":"780bcf0c-f47f-498e-a129-35583df2a8a1","actor_username":"contact@prodiving.asia","actor_via_sso":false,"log_type":"token"}	2026-03-22 17:17:43.655318+00	
00000000-0000-0000-0000-000000000000	38e105d3-cf9a-459b-93a2-caa14aa42cc4	{"action":"token_refreshed","actor_id":"780bcf0c-f47f-498e-a129-35583df2a8a1","actor_username":"contact@prodiving.asia","actor_via_sso":false,"log_type":"token"}	2026-03-22 18:16:47.257139+00	
00000000-0000-0000-0000-000000000000	800362d6-3704-4759-8df9-0b6a7f522a15	{"action":"token_revoked","actor_id":"780bcf0c-f47f-498e-a129-35583df2a8a1","actor_username":"contact@prodiving.asia","actor_via_sso":false,"log_type":"token"}	2026-03-22 18:16:47.26913+00	
00000000-0000-0000-0000-000000000000	b7e97d5b-1a9b-4856-87c0-ea12f8e2aef2	{"action":"token_refreshed","actor_id":"780bcf0c-f47f-498e-a129-35583df2a8a1","actor_username":"contact@prodiving.asia","actor_via_sso":false,"log_type":"token"}	2026-03-22 19:15:24.733634+00	
00000000-0000-0000-0000-000000000000	02c93307-e49f-4715-9f57-a520d16f934e	{"action":"token_revoked","actor_id":"780bcf0c-f47f-498e-a129-35583df2a8a1","actor_username":"contact@prodiving.asia","actor_via_sso":false,"log_type":"token"}	2026-03-22 19:15:24.748433+00	
00000000-0000-0000-0000-000000000000	7f1e961d-dc53-43a3-b4a3-e5b56bab08c4	{"action":"token_refreshed","actor_id":"780bcf0c-f47f-498e-a129-35583df2a8a1","actor_username":"contact@prodiving.asia","actor_via_sso":false,"log_type":"token"}	2026-03-22 19:16:35.554327+00	
00000000-0000-0000-0000-000000000000	82226cee-894e-4d85-b66f-91ee23bddbfc	{"action":"token_revoked","actor_id":"780bcf0c-f47f-498e-a129-35583df2a8a1","actor_username":"contact@prodiving.asia","actor_via_sso":false,"log_type":"token"}	2026-03-22 19:16:35.557327+00	
00000000-0000-0000-0000-000000000000	58015555-4d7d-4954-adb0-f8e98c9889d7	{"action":"token_refreshed","actor_id":"780bcf0c-f47f-498e-a129-35583df2a8a1","actor_username":"contact@prodiving.asia","actor_via_sso":false,"log_type":"token"}	2026-03-22 19:25:02.005081+00	
00000000-0000-0000-0000-000000000000	f9881ad3-ad0c-40d8-8709-9861e9560d8c	{"action":"token_revoked","actor_id":"780bcf0c-f47f-498e-a129-35583df2a8a1","actor_username":"contact@prodiving.asia","actor_via_sso":false,"log_type":"token"}	2026-03-22 19:25:02.030187+00	
00000000-0000-0000-0000-000000000000	6e9e1f5c-5c53-48ff-9945-216c26443f19	{"action":"token_refreshed","actor_id":"780bcf0c-f47f-498e-a129-35583df2a8a1","actor_username":"contact@prodiving.asia","actor_via_sso":false,"log_type":"token"}	2026-03-22 20:37:13.632736+00	
00000000-0000-0000-0000-000000000000	786f06a2-5b07-419a-af6d-2ed05c2798fa	{"action":"token_refreshed","actor_id":"780bcf0c-f47f-498e-a129-35583df2a8a1","actor_username":"contact@prodiving.asia","actor_via_sso":false,"log_type":"token"}	2026-03-22 20:37:13.632848+00	
00000000-0000-0000-0000-000000000000	97a5c013-3ed2-4955-a602-705f6cb0c0d7	{"action":"token_revoked","actor_id":"780bcf0c-f47f-498e-a129-35583df2a8a1","actor_username":"contact@prodiving.asia","actor_via_sso":false,"log_type":"token"}	2026-03-22 20:37:13.668809+00	
00000000-0000-0000-0000-000000000000	71023563-4598-4da9-ae65-6e3e9858a95f	{"action":"token_revoked","actor_id":"780bcf0c-f47f-498e-a129-35583df2a8a1","actor_username":"contact@prodiving.asia","actor_via_sso":false,"log_type":"token"}	2026-03-22 20:37:13.668936+00	
00000000-0000-0000-0000-000000000000	0860928c-8da0-4d96-a6a0-d3bfd7a33445	{"action":"token_refreshed","actor_id":"780bcf0c-f47f-498e-a129-35583df2a8a1","actor_username":"contact@prodiving.asia","actor_via_sso":false,"log_type":"token"}	2026-03-22 20:44:02.683034+00	
00000000-0000-0000-0000-000000000000	82c42b71-91f0-4802-883d-eb32df2b5724	{"action":"token_revoked","actor_id":"780bcf0c-f47f-498e-a129-35583df2a8a1","actor_username":"contact@prodiving.asia","actor_via_sso":false,"log_type":"token"}	2026-03-22 20:44:02.704054+00	
00000000-0000-0000-0000-000000000000	548110ff-c685-4d0f-b3d0-acd420992558	{"action":"token_refreshed","actor_id":"780bcf0c-f47f-498e-a129-35583df2a8a1","actor_username":"contact@prodiving.asia","actor_via_sso":false,"log_type":"token"}	2026-03-22 21:35:20.916236+00	
00000000-0000-0000-0000-000000000000	02f20b72-cb11-45f7-9e92-1ca9ff55018b	{"action":"token_revoked","actor_id":"780bcf0c-f47f-498e-a129-35583df2a8a1","actor_username":"contact@prodiving.asia","actor_via_sso":false,"log_type":"token"}	2026-03-22 21:35:20.938426+00	
00000000-0000-0000-0000-000000000000	5caf7362-67e4-46f9-b594-4d0de79d429d	{"action":"token_refreshed","actor_id":"780bcf0c-f47f-498e-a129-35583df2a8a1","actor_username":"contact@prodiving.asia","actor_via_sso":false,"log_type":"token"}	2026-03-22 21:45:11.651375+00	
00000000-0000-0000-0000-000000000000	574ade21-28d2-4699-b405-0412cd9985ed	{"action":"token_revoked","actor_id":"780bcf0c-f47f-498e-a129-35583df2a8a1","actor_username":"contact@prodiving.asia","actor_via_sso":false,"log_type":"token"}	2026-03-22 21:45:11.668967+00	
00000000-0000-0000-0000-000000000000	a354b856-a900-4ad9-9467-7afcd38cbe85	{"action":"token_refreshed","actor_id":"780bcf0c-f47f-498e-a129-35583df2a8a1","actor_username":"contact@prodiving.asia","actor_via_sso":false,"log_type":"token"}	2026-03-22 22:07:22.681193+00	
00000000-0000-0000-0000-000000000000	5c34f7cb-b5dc-4d07-b0a0-bc7c08ae14a4	{"action":"token_revoked","actor_id":"780bcf0c-f47f-498e-a129-35583df2a8a1","actor_username":"contact@prodiving.asia","actor_via_sso":false,"log_type":"token"}	2026-03-22 22:07:22.705855+00	
00000000-0000-0000-0000-000000000000	995cce33-1556-4e91-9cd1-410184242be5	{"action":"token_refreshed","actor_id":"780bcf0c-f47f-498e-a129-35583df2a8a1","actor_username":"contact@prodiving.asia","actor_via_sso":false,"log_type":"token"}	2026-03-22 22:18:22.157587+00	
00000000-0000-0000-0000-000000000000	5766f723-40e1-4081-9940-9f0a337e4cf8	{"action":"token_revoked","actor_id":"780bcf0c-f47f-498e-a129-35583df2a8a1","actor_username":"contact@prodiving.asia","actor_via_sso":false,"log_type":"token"}	2026-03-22 22:18:22.17126+00	
00000000-0000-0000-0000-000000000000	0c800805-bb3a-44f6-b420-ace55be71d9a	{"action":"token_refreshed","actor_id":"780bcf0c-f47f-498e-a129-35583df2a8a1","actor_username":"contact@prodiving.asia","actor_via_sso":false,"log_type":"token"}	2026-03-22 22:49:25.97114+00	
00000000-0000-0000-0000-000000000000	a9348c37-2c35-48b6-83e2-bc36fc3e7bd8	{"action":"token_revoked","actor_id":"780bcf0c-f47f-498e-a129-35583df2a8a1","actor_username":"contact@prodiving.asia","actor_via_sso":false,"log_type":"token"}	2026-03-22 22:49:25.989073+00	
00000000-0000-0000-0000-000000000000	b6e55744-7a63-475c-82bb-7b9a64b65d4a	{"action":"token_refreshed","actor_id":"780bcf0c-f47f-498e-a129-35583df2a8a1","actor_username":"contact@prodiving.asia","actor_via_sso":false,"log_type":"token"}	2026-03-22 23:12:31.082426+00	
00000000-0000-0000-0000-000000000000	4a0bf764-225e-4a0d-bd89-78a03001ee64	{"action":"token_revoked","actor_id":"780bcf0c-f47f-498e-a129-35583df2a8a1","actor_username":"contact@prodiving.asia","actor_via_sso":false,"log_type":"token"}	2026-03-22 23:12:31.104695+00	
00000000-0000-0000-0000-000000000000	9728f44a-baa0-4536-9acf-1a2f12704eb0	{"action":"token_refreshed","actor_id":"780bcf0c-f47f-498e-a129-35583df2a8a1","actor_username":"contact@prodiving.asia","actor_via_sso":false,"log_type":"token"}	2026-03-22 23:23:00.258197+00	
00000000-0000-0000-0000-000000000000	dcdea17c-8ccd-440b-a237-8a7b43a7ba6f	{"action":"token_revoked","actor_id":"780bcf0c-f47f-498e-a129-35583df2a8a1","actor_username":"contact@prodiving.asia","actor_via_sso":false,"log_type":"token"}	2026-03-22 23:23:00.276759+00	
00000000-0000-0000-0000-000000000000	4be08e5b-1a33-4b9a-b0bf-63bae6f8164f	{"action":"token_refreshed","actor_id":"780bcf0c-f47f-498e-a129-35583df2a8a1","actor_username":"contact@prodiving.asia","actor_via_sso":false,"log_type":"token"}	2026-03-22 23:48:02.051106+00	
00000000-0000-0000-0000-000000000000	3471dbd9-ec11-4c18-9984-2fa33a1bd6a8	{"action":"token_revoked","actor_id":"780bcf0c-f47f-498e-a129-35583df2a8a1","actor_username":"contact@prodiving.asia","actor_via_sso":false,"log_type":"token"}	2026-03-22 23:48:02.070662+00	
00000000-0000-0000-0000-000000000000	dceb3c2c-18ac-4bb4-b901-59d9b67afa55	{"action":"token_refreshed","actor_id":"780bcf0c-f47f-498e-a129-35583df2a8a1","actor_username":"contact@prodiving.asia","actor_via_sso":false,"log_type":"token"}	2026-03-23 00:16:38.939671+00	
00000000-0000-0000-0000-000000000000	62171bd5-ebbf-45b6-a454-b687d9f9eb5c	{"action":"token_revoked","actor_id":"780bcf0c-f47f-498e-a129-35583df2a8a1","actor_username":"contact@prodiving.asia","actor_via_sso":false,"log_type":"token"}	2026-03-23 00:16:38.956997+00	
00000000-0000-0000-0000-000000000000	78342934-9df4-4c3f-aff4-9f231b79f474	{"action":"token_refreshed","actor_id":"780bcf0c-f47f-498e-a129-35583df2a8a1","actor_username":"contact@prodiving.asia","actor_via_sso":false,"log_type":"token"}	2026-03-23 00:46:03.19825+00	
00000000-0000-0000-0000-000000000000	70c07c88-3c81-45f1-babd-ed4e51430ac9	{"action":"token_revoked","actor_id":"780bcf0c-f47f-498e-a129-35583df2a8a1","actor_username":"contact@prodiving.asia","actor_via_sso":false,"log_type":"token"}	2026-03-23 00:46:03.217554+00	
00000000-0000-0000-0000-000000000000	8d5b8cd1-cd5a-4787-8967-1a4506794e2c	{"action":"token_refreshed","actor_id":"780bcf0c-f47f-498e-a129-35583df2a8a1","actor_username":"contact@prodiving.asia","actor_via_sso":false,"log_type":"token"}	2026-03-23 01:44:33.405253+00	
00000000-0000-0000-0000-000000000000	37cc60c3-e842-48ae-8e97-21a65ca53fcc	{"action":"token_revoked","actor_id":"780bcf0c-f47f-498e-a129-35583df2a8a1","actor_username":"contact@prodiving.asia","actor_via_sso":false,"log_type":"token"}	2026-03-23 01:44:33.431922+00	
00000000-0000-0000-0000-000000000000	92315114-b210-4338-a9c2-d2c4a2b33e28	{"action":"login","actor_id":"780bcf0c-f47f-498e-a129-35583df2a8a1","actor_username":"contact@prodiving.asia","actor_via_sso":false,"log_type":"account","traits":{"provider":"email"}}	2026-03-23 01:57:02.034582+00	
00000000-0000-0000-0000-000000000000	777de6de-4218-44c3-a253-1f2728542613	{"action":"token_refreshed","actor_id":"780bcf0c-f47f-498e-a129-35583df2a8a1","actor_username":"contact@prodiving.asia","actor_via_sso":false,"log_type":"token"}	2026-03-23 02:29:21.650985+00	
00000000-0000-0000-0000-000000000000	239057ff-878b-450e-b411-d810a6ea4e6d	{"action":"token_revoked","actor_id":"780bcf0c-f47f-498e-a129-35583df2a8a1","actor_username":"contact@prodiving.asia","actor_via_sso":false,"log_type":"token"}	2026-03-23 02:29:21.666737+00	
00000000-0000-0000-0000-000000000000	01d937c5-a79e-4183-a183-0ddc3ac7a94e	{"action":"token_refreshed","actor_id":"780bcf0c-f47f-498e-a129-35583df2a8a1","actor_username":"contact@prodiving.asia","actor_via_sso":false,"log_type":"token"}	2026-03-23 02:43:04.062121+00	
00000000-0000-0000-0000-000000000000	a9394f7f-b1dd-48cc-9277-9d4b50c79b3b	{"action":"token_revoked","actor_id":"780bcf0c-f47f-498e-a129-35583df2a8a1","actor_username":"contact@prodiving.asia","actor_via_sso":false,"log_type":"token"}	2026-03-23 02:43:04.072688+00	
00000000-0000-0000-0000-000000000000	3a40bfe5-e8e3-4ffe-8ca3-7d6ca6270b50	{"action":"token_refreshed","actor_id":"780bcf0c-f47f-498e-a129-35583df2a8a1","actor_username":"contact@prodiving.asia","actor_via_sso":false,"log_type":"token"}	2026-03-23 02:52:44.12045+00	
00000000-0000-0000-0000-000000000000	d5f8b6ef-1eba-4a7b-a0a9-474ad38c269a	{"action":"token_revoked","actor_id":"780bcf0c-f47f-498e-a129-35583df2a8a1","actor_username":"contact@prodiving.asia","actor_via_sso":false,"log_type":"token"}	2026-03-23 02:52:44.138237+00	
00000000-0000-0000-0000-000000000000	5c7d923a-3a36-4d97-ba37-6593f4e0d70e	{"action":"token_refreshed","actor_id":"780bcf0c-f47f-498e-a129-35583df2a8a1","actor_username":"contact@prodiving.asia","actor_via_sso":false,"log_type":"token"}	2026-03-23 03:08:51.610981+00	
00000000-0000-0000-0000-000000000000	075d0b5d-1734-451b-b3cc-1510a47d94da	{"action":"token_revoked","actor_id":"780bcf0c-f47f-498e-a129-35583df2a8a1","actor_username":"contact@prodiving.asia","actor_via_sso":false,"log_type":"token"}	2026-03-23 03:08:51.628721+00	
00000000-0000-0000-0000-000000000000	875fcc99-e591-4287-bba1-910a4cfd9f9f	{"action":"token_refreshed","actor_id":"780bcf0c-f47f-498e-a129-35583df2a8a1","actor_username":"contact@prodiving.asia","actor_via_sso":false,"log_type":"token"}	2026-03-23 03:29:16.28027+00	
00000000-0000-0000-0000-000000000000	9079e9e8-fcb7-4ae6-95b8-f0a5c3a235f2	{"action":"token_revoked","actor_id":"780bcf0c-f47f-498e-a129-35583df2a8a1","actor_username":"contact@prodiving.asia","actor_via_sso":false,"log_type":"token"}	2026-03-23 03:29:16.298785+00	
00000000-0000-0000-0000-000000000000	ac679419-ab3a-4860-8d2b-9a5e1eb63314	{"action":"token_refreshed","actor_id":"780bcf0c-f47f-498e-a129-35583df2a8a1","actor_username":"contact@prodiving.asia","actor_via_sso":false,"log_type":"token"}	2026-03-23 03:41:25.282037+00	
00000000-0000-0000-0000-000000000000	6fa63287-3a42-4ff6-8310-46ef4529e9ec	{"action":"token_revoked","actor_id":"780bcf0c-f47f-498e-a129-35583df2a8a1","actor_username":"contact@prodiving.asia","actor_via_sso":false,"log_type":"token"}	2026-03-23 03:41:25.305083+00	
00000000-0000-0000-0000-000000000000	61ed53f7-944d-4f03-bc0b-9245cb25492b	{"action":"token_refreshed","actor_id":"780bcf0c-f47f-498e-a129-35583df2a8a1","actor_username":"contact@prodiving.asia","actor_via_sso":false,"log_type":"token"}	2026-03-23 03:53:06.195712+00	
00000000-0000-0000-0000-000000000000	d86c4976-5388-423b-a58e-fc5945da86cd	{"action":"token_revoked","actor_id":"780bcf0c-f47f-498e-a129-35583df2a8a1","actor_username":"contact@prodiving.asia","actor_via_sso":false,"log_type":"token"}	2026-03-23 03:53:06.215632+00	
00000000-0000-0000-0000-000000000000	32ea6ce2-ca83-43f8-bc3a-814f498a916f	{"action":"token_refreshed","actor_id":"780bcf0c-f47f-498e-a129-35583df2a8a1","actor_username":"contact@prodiving.asia","actor_via_sso":false,"log_type":"token"}	2026-03-23 04:09:01.826281+00	
00000000-0000-0000-0000-000000000000	283259c1-1abf-467a-937f-e74b2341993c	{"action":"token_revoked","actor_id":"780bcf0c-f47f-498e-a129-35583df2a8a1","actor_username":"contact@prodiving.asia","actor_via_sso":false,"log_type":"token"}	2026-03-23 04:09:01.849677+00	
00000000-0000-0000-0000-000000000000	3827e757-9100-4d6f-a803-f9f1e196fe06	{"action":"token_refreshed","actor_id":"780bcf0c-f47f-498e-a129-35583df2a8a1","actor_username":"contact@prodiving.asia","actor_via_sso":false,"log_type":"token"}	2026-03-23 04:27:30.765645+00	
00000000-0000-0000-0000-000000000000	fb1cd985-bfd9-4795-9c58-c5dfd47a916e	{"action":"token_revoked","actor_id":"780bcf0c-f47f-498e-a129-35583df2a8a1","actor_username":"contact@prodiving.asia","actor_via_sso":false,"log_type":"token"}	2026-03-23 04:27:30.779105+00	
00000000-0000-0000-0000-000000000000	5bc30283-ad2a-4a8f-83a2-d5ed3e29fd42	{"action":"token_refreshed","actor_id":"780bcf0c-f47f-498e-a129-35583df2a8a1","actor_username":"contact@prodiving.asia","actor_via_sso":false,"log_type":"token"}	2026-03-23 11:05:13.552342+00	
00000000-0000-0000-0000-000000000000	1f818695-ab17-492e-af7b-7f3bcbc36de7	{"action":"token_refreshed","actor_id":"780bcf0c-f47f-498e-a129-35583df2a8a1","actor_username":"contact@prodiving.asia","actor_via_sso":false,"log_type":"token"}	2026-03-23 11:05:13.55161+00	
00000000-0000-0000-0000-000000000000	b5c1f5fa-f36c-4d12-b919-32d9270a2da9	{"action":"token_refreshed","actor_id":"780bcf0c-f47f-498e-a129-35583df2a8a1","actor_username":"contact@prodiving.asia","actor_via_sso":false,"log_type":"token"}	2026-03-23 11:05:13.551765+00	
00000000-0000-0000-0000-000000000000	dee4dd32-2d34-4d78-9f02-d209e80c5768	{"action":"token_revoked","actor_id":"780bcf0c-f47f-498e-a129-35583df2a8a1","actor_username":"contact@prodiving.asia","actor_via_sso":false,"log_type":"token"}	2026-03-23 11:05:13.581742+00	
00000000-0000-0000-0000-000000000000	375b18b7-4370-4893-a5a6-77daf3e00b75	{"action":"token_revoked","actor_id":"780bcf0c-f47f-498e-a129-35583df2a8a1","actor_username":"contact@prodiving.asia","actor_via_sso":false,"log_type":"token"}	2026-03-23 11:05:13.581779+00	
00000000-0000-0000-0000-000000000000	568d8a2b-b7ed-46db-aa1d-3e6d57993945	{"action":"token_revoked","actor_id":"780bcf0c-f47f-498e-a129-35583df2a8a1","actor_username":"contact@prodiving.asia","actor_via_sso":false,"log_type":"token"}	2026-03-23 11:05:13.582005+00	
00000000-0000-0000-0000-000000000000	f5506ecc-c0c7-422d-85c9-0629e6e4d843	{"action":"token_refreshed","actor_id":"780bcf0c-f47f-498e-a129-35583df2a8a1","actor_username":"contact@prodiving.asia","actor_via_sso":false,"log_type":"token"}	2026-03-23 12:03:33.186094+00	
00000000-0000-0000-0000-000000000000	6469b18e-59c8-4e2c-994c-b37099577f5e	{"action":"token_revoked","actor_id":"780bcf0c-f47f-498e-a129-35583df2a8a1","actor_username":"contact@prodiving.asia","actor_via_sso":false,"log_type":"token"}	2026-03-23 12:03:33.205268+00	
00000000-0000-0000-0000-000000000000	04531c82-05f6-4d59-b14d-d696156dd08d	{"action":"token_refreshed","actor_id":"780bcf0c-f47f-498e-a129-35583df2a8a1","actor_username":"contact@prodiving.asia","actor_via_sso":false,"log_type":"token"}	2026-03-23 12:03:42.698753+00	
00000000-0000-0000-0000-000000000000	dfac63d6-3231-4b9a-b999-94c8555ed5d6	{"action":"token_revoked","actor_id":"780bcf0c-f47f-498e-a129-35583df2a8a1","actor_username":"contact@prodiving.asia","actor_via_sso":false,"log_type":"token"}	2026-03-23 12:03:42.700837+00	
00000000-0000-0000-0000-000000000000	61695f91-8504-4f36-96f0-319155b465df	{"action":"token_refreshed","actor_id":"780bcf0c-f47f-498e-a129-35583df2a8a1","actor_username":"contact@prodiving.asia","actor_via_sso":false,"log_type":"token"}	2026-03-23 12:09:18.946657+00	
00000000-0000-0000-0000-000000000000	afe234ed-d015-40d4-adcf-1052c65b7697	{"action":"token_revoked","actor_id":"780bcf0c-f47f-498e-a129-35583df2a8a1","actor_username":"contact@prodiving.asia","actor_via_sso":false,"log_type":"token"}	2026-03-23 12:09:18.966335+00	
00000000-0000-0000-0000-000000000000	01d5d208-72a8-4b93-b165-86086993a21c	{"action":"token_refreshed","actor_id":"780bcf0c-f47f-498e-a129-35583df2a8a1","actor_username":"contact@prodiving.asia","actor_via_sso":false,"log_type":"token"}	2026-03-23 12:44:17.251706+00	
00000000-0000-0000-0000-000000000000	0c29fc2c-0258-4ea9-aa1b-1f4e6b04fd10	{"action":"token_revoked","actor_id":"780bcf0c-f47f-498e-a129-35583df2a8a1","actor_username":"contact@prodiving.asia","actor_via_sso":false,"log_type":"token"}	2026-03-23 12:44:17.287795+00	
00000000-0000-0000-0000-000000000000	1e47a0b6-8c24-45c7-bacc-00b75051e599	{"action":"token_refreshed","actor_id":"780bcf0c-f47f-498e-a129-35583df2a8a1","actor_username":"contact@prodiving.asia","actor_via_sso":false,"log_type":"token"}	2026-03-23 12:58:44.951988+00	
00000000-0000-0000-0000-000000000000	701fb6f9-a69b-4f4c-9e33-4bbe632bb841	{"action":"token_revoked","actor_id":"780bcf0c-f47f-498e-a129-35583df2a8a1","actor_username":"contact@prodiving.asia","actor_via_sso":false,"log_type":"token"}	2026-03-23 12:58:44.965978+00	
00000000-0000-0000-0000-000000000000	7839d9e6-80d6-47eb-98d5-9589cb91b87a	{"action":"token_refreshed","actor_id":"780bcf0c-f47f-498e-a129-35583df2a8a1","actor_username":"contact@prodiving.asia","actor_via_sso":false,"log_type":"token"}	2026-03-23 13:03:31.345351+00	
00000000-0000-0000-0000-000000000000	c6227f3f-4384-4158-b2a1-e4cd6b138b4f	{"action":"token_revoked","actor_id":"780bcf0c-f47f-498e-a129-35583df2a8a1","actor_username":"contact@prodiving.asia","actor_via_sso":false,"log_type":"token"}	2026-03-23 13:03:31.363009+00	
00000000-0000-0000-0000-000000000000	cc87bdd8-730a-4807-8a5f-4bc3a96f9b14	{"action":"token_refreshed","actor_id":"780bcf0c-f47f-498e-a129-35583df2a8a1","actor_username":"contact@prodiving.asia","actor_via_sso":false,"log_type":"token"}	2026-03-23 13:53:58.0099+00	
00000000-0000-0000-0000-000000000000	70279a47-7e6f-45b9-b097-70d9b9f3a6a3	{"action":"token_revoked","actor_id":"780bcf0c-f47f-498e-a129-35583df2a8a1","actor_username":"contact@prodiving.asia","actor_via_sso":false,"log_type":"token"}	2026-03-23 13:53:58.023188+00	
00000000-0000-0000-0000-000000000000	eab1ae37-1cac-4e6d-a442-1a0fe95e7eca	{"action":"token_refreshed","actor_id":"780bcf0c-f47f-498e-a129-35583df2a8a1","actor_username":"contact@prodiving.asia","actor_via_sso":false,"log_type":"token"}	2026-03-23 13:56:20.135942+00	
00000000-0000-0000-0000-000000000000	00bb44c3-2b61-47aa-831c-ffe3aae4f751	{"action":"token_revoked","actor_id":"780bcf0c-f47f-498e-a129-35583df2a8a1","actor_username":"contact@prodiving.asia","actor_via_sso":false,"log_type":"token"}	2026-03-23 13:56:20.165148+00	
00000000-0000-0000-0000-000000000000	dc1f855f-bbf3-46e0-9c2b-f2467b85221b	{"action":"token_refreshed","actor_id":"780bcf0c-f47f-498e-a129-35583df2a8a1","actor_username":"contact@prodiving.asia","actor_via_sso":false,"log_type":"token"}	2026-03-23 13:56:20.308065+00	
00000000-0000-0000-0000-000000000000	77d0007d-27ba-453c-a47f-d21f9245b37d	{"action":"token_revoked","actor_id":"780bcf0c-f47f-498e-a129-35583df2a8a1","actor_username":"contact@prodiving.asia","actor_via_sso":false,"log_type":"token"}	2026-03-23 13:56:20.311218+00	
00000000-0000-0000-0000-000000000000	fd599743-a6d4-4bba-ab89-33bf84984e61	{"action":"token_refreshed","actor_id":"780bcf0c-f47f-498e-a129-35583df2a8a1","actor_username":"contact@prodiving.asia","actor_via_sso":false,"log_type":"token"}	2026-03-23 14:01:19.19102+00	
00000000-0000-0000-0000-000000000000	9a356cae-331f-4839-977f-5e04cfd1a3bd	{"action":"token_refreshed","actor_id":"780bcf0c-f47f-498e-a129-35583df2a8a1","actor_username":"contact@prodiving.asia","actor_via_sso":false,"log_type":"token"}	2026-03-23 14:02:29.160915+00	
00000000-0000-0000-0000-000000000000	3ffa78c9-6867-4a52-968b-c2d165bf94cc	{"action":"token_revoked","actor_id":"780bcf0c-f47f-498e-a129-35583df2a8a1","actor_username":"contact@prodiving.asia","actor_via_sso":false,"log_type":"token"}	2026-03-23 14:02:29.169062+00	
00000000-0000-0000-0000-000000000000	e25bbb61-cded-4fd3-8c4a-8745b6536a02	{"action":"token_refreshed","actor_id":"780bcf0c-f47f-498e-a129-35583df2a8a1","actor_username":"contact@prodiving.asia","actor_via_sso":false,"log_type":"token"}	2026-03-23 14:14:35.886916+00	
00000000-0000-0000-0000-000000000000	bb1f78a7-ffd4-4486-8107-b46e8bccfcd0	{"action":"logout","actor_id":"780bcf0c-f47f-498e-a129-35583df2a8a1","actor_username":"contact@prodiving.asia","actor_via_sso":false,"log_type":"account"}	2026-03-23 14:25:01.814472+00	
00000000-0000-0000-0000-000000000000	7a059825-4ff2-4190-8448-98e24962294b	{"action":"login","actor_id":"780bcf0c-f47f-498e-a129-35583df2a8a1","actor_username":"contact@prodiving.asia","actor_via_sso":false,"log_type":"account","traits":{"provider":"email"}}	2026-03-23 14:25:16.648585+00	
00000000-0000-0000-0000-000000000000	de1e5093-35bf-4be0-95a7-2446a1af9f08	{"action":"login","actor_id":"780bcf0c-f47f-498e-a129-35583df2a8a1","actor_username":"contact@prodiving.asia","actor_via_sso":false,"log_type":"account","traits":{"provider":"email"}}	2026-03-23 14:28:03.582059+00	
00000000-0000-0000-0000-000000000000	475d5407-a749-462d-b408-a417d67fdcac	{"action":"login","actor_id":"780bcf0c-f47f-498e-a129-35583df2a8a1","actor_username":"contact@prodiving.asia","actor_via_sso":false,"log_type":"account","traits":{"provider":"email"}}	2026-03-23 14:47:17.715916+00	
00000000-0000-0000-0000-000000000000	9cac4852-bfe3-4cdc-ad9c-81a50e0657ca	{"action":"logout","actor_id":"780bcf0c-f47f-498e-a129-35583df2a8a1","actor_username":"contact@prodiving.asia","actor_via_sso":false,"log_type":"account"}	2026-03-23 14:53:59.107856+00	
00000000-0000-0000-0000-000000000000	ba717e80-2803-4c85-86fc-f8a0e5d3b76c	{"action":"login","actor_id":"780bcf0c-f47f-498e-a129-35583df2a8a1","actor_username":"contact@prodiving.asia","actor_via_sso":false,"log_type":"account","traits":{"provider":"email"}}	2026-03-23 14:54:10.047634+00	
00000000-0000-0000-0000-000000000000	fe652e51-5213-41ad-bab6-34470a3efeb7	{"action":"login","actor_id":"780bcf0c-f47f-498e-a129-35583df2a8a1","actor_username":"contact@prodiving.asia","actor_via_sso":false,"log_type":"account","traits":{"provider":"email"}}	2026-03-23 15:02:05.650477+00	
00000000-0000-0000-0000-000000000000	d769f0b9-2209-421b-a980-0533cc9a2d87	{"action":"login","actor_id":"780bcf0c-f47f-498e-a129-35583df2a8a1","actor_username":"contact@prodiving.asia","actor_via_sso":false,"log_type":"account","traits":{"provider":"email"}}	2026-03-23 15:11:48.759905+00	
00000000-0000-0000-0000-000000000000	c2bfe55f-c283-43a5-8daa-813fcf913fc1	{"action":"login","actor_id":"780bcf0c-f47f-498e-a129-35583df2a8a1","actor_username":"contact@prodiving.asia","actor_via_sso":false,"log_type":"account","traits":{"provider":"email"}}	2026-03-23 15:23:28.72183+00	
00000000-0000-0000-0000-000000000000	68e18d38-2c3f-4763-8ac3-8b5da95004fc	{"action":"login","actor_id":"780bcf0c-f47f-498e-a129-35583df2a8a1","actor_username":"contact@prodiving.asia","actor_via_sso":false,"log_type":"account","traits":{"provider":"email"}}	2026-03-23 15:38:06.76975+00	
00000000-0000-0000-0000-000000000000	024cad17-47d2-4f63-9edd-b68e33b2fc46	{"action":"token_refreshed","actor_id":"780bcf0c-f47f-498e-a129-35583df2a8a1","actor_username":"contact@prodiving.asia","actor_via_sso":false,"log_type":"token"}	2026-03-23 16:00:17.471492+00	
00000000-0000-0000-0000-000000000000	02e77a17-53d8-44d6-b358-3918012625f5	{"action":"token_revoked","actor_id":"780bcf0c-f47f-498e-a129-35583df2a8a1","actor_username":"contact@prodiving.asia","actor_via_sso":false,"log_type":"token"}	2026-03-23 16:00:17.494811+00	
00000000-0000-0000-0000-000000000000	4aabb0e0-b6f6-489c-b06b-11919d73e60c	{"action":"token_refreshed","actor_id":"780bcf0c-f47f-498e-a129-35583df2a8a1","actor_username":"contact@prodiving.asia","actor_via_sso":false,"log_type":"token"}	2026-03-23 16:01:51.4204+00	
00000000-0000-0000-0000-000000000000	3519568f-6cbc-48bf-b06f-665840ddf831	{"action":"token_revoked","actor_id":"780bcf0c-f47f-498e-a129-35583df2a8a1","actor_username":"contact@prodiving.asia","actor_via_sso":false,"log_type":"token"}	2026-03-23 16:01:51.423719+00	
00000000-0000-0000-0000-000000000000	5eb865bb-16fc-4ff6-a862-070762a4676a	{"action":"token_refreshed","actor_id":"780bcf0c-f47f-498e-a129-35583df2a8a1","actor_username":"contact@prodiving.asia","actor_via_sso":false,"log_type":"token"}	2026-03-23 16:12:02.949065+00	
00000000-0000-0000-0000-000000000000	08490959-6802-4db1-9246-f74ca3f7d38a	{"action":"token_revoked","actor_id":"780bcf0c-f47f-498e-a129-35583df2a8a1","actor_username":"contact@prodiving.asia","actor_via_sso":false,"log_type":"token"}	2026-03-23 16:12:02.967886+00	
00000000-0000-0000-0000-000000000000	2e0a3e53-40aa-49f2-bff3-65430959adc6	{"action":"token_refreshed","actor_id":"780bcf0c-f47f-498e-a129-35583df2a8a1","actor_username":"contact@prodiving.asia","actor_via_sso":false,"log_type":"token"}	2026-03-23 17:57:21.039168+00	
00000000-0000-0000-0000-000000000000	25810893-9bdf-4674-95ea-f9f73742e2ba	{"action":"token_revoked","actor_id":"780bcf0c-f47f-498e-a129-35583df2a8a1","actor_username":"contact@prodiving.asia","actor_via_sso":false,"log_type":"token"}	2026-03-23 17:57:21.05742+00	
00000000-0000-0000-0000-000000000000	8e65d288-6e43-47d9-868b-72c699914472	{"action":"token_refreshed","actor_id":"780bcf0c-f47f-498e-a129-35583df2a8a1","actor_username":"contact@prodiving.asia","actor_via_sso":false,"log_type":"token"}	2026-03-23 20:18:32.433496+00	
00000000-0000-0000-0000-000000000000	33eb3ca5-c38f-49dc-93ca-f914ac3cf9e8	{"action":"token_revoked","actor_id":"780bcf0c-f47f-498e-a129-35583df2a8a1","actor_username":"contact@prodiving.asia","actor_via_sso":false,"log_type":"token"}	2026-03-23 20:18:32.452373+00	
00000000-0000-0000-0000-000000000000	77d46e40-a50b-446f-8fad-ee768e8ab626	{"action":"token_refreshed","actor_id":"780bcf0c-f47f-498e-a129-35583df2a8a1","actor_username":"contact@prodiving.asia","actor_via_sso":false,"log_type":"token"}	2026-03-23 20:19:41.382479+00	
00000000-0000-0000-0000-000000000000	3a3bd0af-78a1-46a2-ac8f-5982b1aab366	{"action":"token_revoked","actor_id":"780bcf0c-f47f-498e-a129-35583df2a8a1","actor_username":"contact@prodiving.asia","actor_via_sso":false,"log_type":"token"}	2026-03-23 20:19:41.399794+00	
00000000-0000-0000-0000-000000000000	5bdbb9c5-6a4d-4bbd-b02c-79bf759feed4	{"action":"token_refreshed","actor_id":"780bcf0c-f47f-498e-a129-35583df2a8a1","actor_username":"contact@prodiving.asia","actor_via_sso":false,"log_type":"token"}	2026-03-23 21:00:33.950959+00	
00000000-0000-0000-0000-000000000000	0554198f-d669-4794-9cf6-ff53a8c5a9f7	{"action":"token_revoked","actor_id":"780bcf0c-f47f-498e-a129-35583df2a8a1","actor_username":"contact@prodiving.asia","actor_via_sso":false,"log_type":"token"}	2026-03-23 21:00:33.969627+00	
00000000-0000-0000-0000-000000000000	53a2ecc7-cdc6-41e8-ba60-582c58d8bce8	{"action":"token_refreshed","actor_id":"780bcf0c-f47f-498e-a129-35583df2a8a1","actor_username":"contact@prodiving.asia","actor_via_sso":false,"log_type":"token"}	2026-03-23 21:30:15.903923+00	
00000000-0000-0000-0000-000000000000	0f6d9f47-82c8-4062-81f8-54ceb81ebdd8	{"action":"token_revoked","actor_id":"780bcf0c-f47f-498e-a129-35583df2a8a1","actor_username":"contact@prodiving.asia","actor_via_sso":false,"log_type":"token"}	2026-03-23 21:30:15.923026+00	
00000000-0000-0000-0000-000000000000	100012b6-9154-426a-bcb1-4b1ebb643455	{"action":"token_refreshed","actor_id":"780bcf0c-f47f-498e-a129-35583df2a8a1","actor_username":"contact@prodiving.asia","actor_via_sso":false,"log_type":"token"}	2026-03-23 22:07:18.770942+00	
00000000-0000-0000-0000-000000000000	4260ca65-1d93-4729-98e6-41c499eb7f61	{"action":"token_revoked","actor_id":"780bcf0c-f47f-498e-a129-35583df2a8a1","actor_username":"contact@prodiving.asia","actor_via_sso":false,"log_type":"token"}	2026-03-23 22:07:18.79023+00	
00000000-0000-0000-0000-000000000000	d4fea97d-bcaa-44f4-9a89-05d81152cf59	{"action":"token_refreshed","actor_id":"780bcf0c-f47f-498e-a129-35583df2a8a1","actor_username":"contact@prodiving.asia","actor_via_sso":false,"log_type":"token"}	2026-03-23 22:28:29.237694+00	
00000000-0000-0000-0000-000000000000	1cd69766-67d3-4317-82e0-3050986b6e68	{"action":"token_revoked","actor_id":"780bcf0c-f47f-498e-a129-35583df2a8a1","actor_username":"contact@prodiving.asia","actor_via_sso":false,"log_type":"token"}	2026-03-23 22:28:29.260696+00	
00000000-0000-0000-0000-000000000000	2b4fe40c-fe1f-4cfb-8a2f-4dcb998cdce0	{"action":"login","actor_id":"780bcf0c-f47f-498e-a129-35583df2a8a1","actor_username":"contact@prodiving.asia","actor_via_sso":false,"log_type":"account","traits":{"provider":"email"}}	2026-03-23 22:53:31.593032+00	
00000000-0000-0000-0000-000000000000	a582632c-fbd8-4a5e-b404-1445dea56f70	{"action":"token_refreshed","actor_id":"780bcf0c-f47f-498e-a129-35583df2a8a1","actor_username":"contact@prodiving.asia","actor_via_sso":false,"log_type":"token"}	2026-03-23 23:41:55.870597+00	
00000000-0000-0000-0000-000000000000	c6f228ce-e3c1-4007-87d8-c389fc6fef66	{"action":"token_revoked","actor_id":"780bcf0c-f47f-498e-a129-35583df2a8a1","actor_username":"contact@prodiving.asia","actor_via_sso":false,"log_type":"token"}	2026-03-23 23:41:55.893829+00	
00000000-0000-0000-0000-000000000000	7a0889eb-e752-4862-85d5-7b2d8f9473f3	{"action":"token_refreshed","actor_id":"780bcf0c-f47f-498e-a129-35583df2a8a1","actor_username":"contact@prodiving.asia","actor_via_sso":false,"log_type":"token"}	2026-03-23 23:44:39.527741+00	
00000000-0000-0000-0000-000000000000	aa0647f4-a7cc-43ca-aa96-4fff45a57212	{"action":"token_revoked","actor_id":"780bcf0c-f47f-498e-a129-35583df2a8a1","actor_username":"contact@prodiving.asia","actor_via_sso":false,"log_type":"token"}	2026-03-23 23:44:39.537661+00	
00000000-0000-0000-0000-000000000000	2588790e-cbb0-458c-84c8-6846564cbd53	{"action":"token_refreshed","actor_id":"780bcf0c-f47f-498e-a129-35583df2a8a1","actor_username":"contact@prodiving.asia","actor_via_sso":false,"log_type":"token"}	2026-03-23 23:57:12.74165+00	
00000000-0000-0000-0000-000000000000	588410a5-ad7c-428e-9468-4b4f74b11811	{"action":"token_revoked","actor_id":"780bcf0c-f47f-498e-a129-35583df2a8a1","actor_username":"contact@prodiving.asia","actor_via_sso":false,"log_type":"token"}	2026-03-23 23:57:12.75548+00	
00000000-0000-0000-0000-000000000000	e28d4c02-5b9f-4a7a-905e-9399943f5397	{"action":"token_refreshed","actor_id":"780bcf0c-f47f-498e-a129-35583df2a8a1","actor_username":"contact@prodiving.asia","actor_via_sso":false,"log_type":"token"}	2026-03-23 23:57:13.087565+00	
00000000-0000-0000-0000-000000000000	41337e25-55bb-4e2e-a00c-618f71419ead	{"action":"token_refreshed","actor_id":"780bcf0c-f47f-498e-a129-35583df2a8a1","actor_username":"contact@prodiving.asia","actor_via_sso":false,"log_type":"token"}	2026-03-24 00:32:28.826058+00	
00000000-0000-0000-0000-000000000000	f043499e-de99-4ca8-8214-45c72ea62231	{"action":"token_revoked","actor_id":"780bcf0c-f47f-498e-a129-35583df2a8a1","actor_username":"contact@prodiving.asia","actor_via_sso":false,"log_type":"token"}	2026-03-24 00:32:28.843782+00	
00000000-0000-0000-0000-000000000000	fa09c662-86c8-44e0-9498-9ff4d3ce22d5	{"action":"token_refreshed","actor_id":"780bcf0c-f47f-498e-a129-35583df2a8a1","actor_username":"contact@prodiving.asia","actor_via_sso":false,"log_type":"token"}	2026-03-24 00:51:17.141581+00	
00000000-0000-0000-0000-000000000000	1f52a8e5-d84d-456f-a2be-d0531a505f70	{"action":"token_revoked","actor_id":"780bcf0c-f47f-498e-a129-35583df2a8a1","actor_username":"contact@prodiving.asia","actor_via_sso":false,"log_type":"token"}	2026-03-24 00:51:17.16306+00	
00000000-0000-0000-0000-000000000000	ba1f6990-c02e-4cd7-9c15-637e67571f9e	{"action":"token_refreshed","actor_id":"780bcf0c-f47f-498e-a129-35583df2a8a1","actor_username":"contact@prodiving.asia","actor_via_sso":false,"log_type":"token"}	2026-03-24 01:49:19.64552+00	
00000000-0000-0000-0000-000000000000	07249032-1b7c-4e07-8a7c-b709ed6225c5	{"action":"token_revoked","actor_id":"780bcf0c-f47f-498e-a129-35583df2a8a1","actor_username":"contact@prodiving.asia","actor_via_sso":false,"log_type":"token"}	2026-03-24 01:49:19.664899+00	
00000000-0000-0000-0000-000000000000	df2ea69f-a12b-49cc-a381-d5015ab8e8e0	{"action":"token_refreshed","actor_id":"780bcf0c-f47f-498e-a129-35583df2a8a1","actor_username":"contact@prodiving.asia","actor_via_sso":false,"log_type":"token"}	2026-03-24 01:53:59.924372+00	
00000000-0000-0000-0000-000000000000	8a39db3d-8557-400f-bb72-beda211e2aa3	{"action":"token_revoked","actor_id":"780bcf0c-f47f-498e-a129-35583df2a8a1","actor_username":"contact@prodiving.asia","actor_via_sso":false,"log_type":"token"}	2026-03-24 01:53:59.936902+00	
00000000-0000-0000-0000-000000000000	7dc7e00d-3b0a-4008-88ff-9188c2448b2d	{"action":"token_refreshed","actor_id":"780bcf0c-f47f-498e-a129-35583df2a8a1","actor_username":"contact@prodiving.asia","actor_via_sso":false,"log_type":"token"}	2026-03-24 01:59:22.585407+00	
00000000-0000-0000-0000-000000000000	6b3f7f80-6c3a-43bb-a6c1-dd4fb2756281	{"action":"token_revoked","actor_id":"780bcf0c-f47f-498e-a129-35583df2a8a1","actor_username":"contact@prodiving.asia","actor_via_sso":false,"log_type":"token"}	2026-03-24 01:59:22.599411+00	
00000000-0000-0000-0000-000000000000	7ce10caf-a873-40e8-bfdb-09f49abc112b	{"action":"token_refreshed","actor_id":"780bcf0c-f47f-498e-a129-35583df2a8a1","actor_username":"contact@prodiving.asia","actor_via_sso":false,"log_type":"token"}	2026-03-24 02:52:36.560248+00	
00000000-0000-0000-0000-000000000000	fc230a60-d1fe-4e16-b725-34d7de7b5c90	{"action":"token_revoked","actor_id":"780bcf0c-f47f-498e-a129-35583df2a8a1","actor_username":"contact@prodiving.asia","actor_via_sso":false,"log_type":"token"}	2026-03-24 02:52:36.583411+00	
00000000-0000-0000-0000-000000000000	a187b656-3f6c-48f4-b691-937e6a567168	{"action":"token_refreshed","actor_id":"780bcf0c-f47f-498e-a129-35583df2a8a1","actor_username":"contact@prodiving.asia","actor_via_sso":false,"log_type":"token"}	2026-03-24 14:15:59.842992+00	
00000000-0000-0000-0000-000000000000	92d19fb6-526f-4e6b-acd2-48a46759d8b2	{"action":"token_revoked","actor_id":"780bcf0c-f47f-498e-a129-35583df2a8a1","actor_username":"contact@prodiving.asia","actor_via_sso":false,"log_type":"token"}	2026-03-24 14:15:59.861951+00	
00000000-0000-0000-0000-000000000000	cf5c9577-95fd-4921-ad7d-ab27d10ef2eb	{"action":"token_refreshed","actor_id":"780bcf0c-f47f-498e-a129-35583df2a8a1","actor_username":"contact@prodiving.asia","actor_via_sso":false,"log_type":"token"}	2026-03-25 13:46:20.957489+00	
00000000-0000-0000-0000-000000000000	2636f086-d70a-48b8-a457-5ec583b200e4	{"action":"token_revoked","actor_id":"780bcf0c-f47f-498e-a129-35583df2a8a1","actor_username":"contact@prodiving.asia","actor_via_sso":false,"log_type":"token"}	2026-03-25 13:46:20.988378+00	
00000000-0000-0000-0000-000000000000	874a85a6-acdb-4c8b-9813-6e006710c0aa	{"action":"token_refreshed","actor_id":"780bcf0c-f47f-498e-a129-35583df2a8a1","actor_username":"contact@prodiving.asia","actor_via_sso":false,"log_type":"token"}	2026-03-25 13:50:28.593911+00	
00000000-0000-0000-0000-000000000000	c2acb89a-549c-4702-aa42-a9806d4cfa27	{"action":"token_revoked","actor_id":"780bcf0c-f47f-498e-a129-35583df2a8a1","actor_username":"contact@prodiving.asia","actor_via_sso":false,"log_type":"token"}	2026-03-25 13:50:28.606693+00	
00000000-0000-0000-0000-000000000000	7eb6557e-0339-4ff4-83bb-77e7b031a705	{"action":"token_refreshed","actor_id":"780bcf0c-f47f-498e-a129-35583df2a8a1","actor_username":"contact@prodiving.asia","actor_via_sso":false,"log_type":"token"}	2026-03-25 13:54:29.764185+00	
00000000-0000-0000-0000-000000000000	f0f96359-caf8-402d-ac3a-fcd77ccd351f	{"action":"token_revoked","actor_id":"780bcf0c-f47f-498e-a129-35583df2a8a1","actor_username":"contact@prodiving.asia","actor_via_sso":false,"log_type":"token"}	2026-03-25 13:54:29.775553+00	
00000000-0000-0000-0000-000000000000	c7db5553-1bf4-44e5-adf8-6fcaddcc5d15	{"action":"token_refreshed","actor_id":"780bcf0c-f47f-498e-a129-35583df2a8a1","actor_username":"contact@prodiving.asia","actor_via_sso":false,"log_type":"token"}	2026-03-25 14:05:39.040093+00	
00000000-0000-0000-0000-000000000000	b99a88ff-2b7d-4171-96f9-f4324f092164	{"action":"token_revoked","actor_id":"780bcf0c-f47f-498e-a129-35583df2a8a1","actor_username":"contact@prodiving.asia","actor_via_sso":false,"log_type":"token"}	2026-03-25 14:05:39.054165+00	
00000000-0000-0000-0000-000000000000	250fc6c2-9052-4443-9909-5ffd89f3228a	{"action":"token_refreshed","actor_id":"780bcf0c-f47f-498e-a129-35583df2a8a1","actor_username":"contact@prodiving.asia","actor_via_sso":false,"log_type":"token"}	2026-03-25 14:56:55.658471+00	
00000000-0000-0000-0000-000000000000	0059ce2d-261b-44b0-8c21-0de3a566f2a5	{"action":"token_revoked","actor_id":"780bcf0c-f47f-498e-a129-35583df2a8a1","actor_username":"contact@prodiving.asia","actor_via_sso":false,"log_type":"token"}	2026-03-25 14:56:55.670452+00	
00000000-0000-0000-0000-000000000000	8b56057c-f45b-4c72-9156-22b68f9e0079	{"action":"login","actor_id":"780bcf0c-f47f-498e-a129-35583df2a8a1","actor_username":"contact@prodiving.asia","actor_via_sso":false,"log_type":"account","traits":{"provider":"email"}}	2026-03-27 07:37:37.836008+00	
00000000-0000-0000-0000-000000000000	a0e7edd9-42f6-4105-94ee-706a802dc49c	{"action":"token_refreshed","actor_id":"780bcf0c-f47f-498e-a129-35583df2a8a1","actor_username":"contact@prodiving.asia","actor_via_sso":false,"log_type":"token"}	2026-03-27 08:00:29.286403+00	
00000000-0000-0000-0000-000000000000	86ee95ba-c21c-4dbb-adec-4196084df231	{"action":"token_revoked","actor_id":"780bcf0c-f47f-498e-a129-35583df2a8a1","actor_username":"contact@prodiving.asia","actor_via_sso":false,"log_type":"token"}	2026-03-27 08:00:29.307868+00	
00000000-0000-0000-0000-000000000000	5d525da1-b861-4a0e-b9a0-6863b2238d00	{"action":"token_refreshed","actor_id":"780bcf0c-f47f-498e-a129-35583df2a8a1","actor_username":"contact@prodiving.asia","actor_via_sso":false,"log_type":"token"}	2026-03-27 08:58:32.301952+00	
00000000-0000-0000-0000-000000000000	5a91fc59-c16b-45d4-9e35-201989fa9d76	{"action":"token_revoked","actor_id":"780bcf0c-f47f-498e-a129-35583df2a8a1","actor_username":"contact@prodiving.asia","actor_via_sso":false,"log_type":"token"}	2026-03-27 08:58:32.32178+00	
00000000-0000-0000-0000-000000000000	b26a145a-e54c-4852-bfdf-55faee509da1	{"action":"token_refreshed","actor_id":"780bcf0c-f47f-498e-a129-35583df2a8a1","actor_username":"contact@prodiving.asia","actor_via_sso":false,"log_type":"token"}	2026-03-27 09:03:05.894177+00	
00000000-0000-0000-0000-000000000000	191e90cd-ddd1-4734-b3b5-146539f7040d	{"action":"token_revoked","actor_id":"780bcf0c-f47f-498e-a129-35583df2a8a1","actor_username":"contact@prodiving.asia","actor_via_sso":false,"log_type":"token"}	2026-03-27 09:03:05.910747+00	
00000000-0000-0000-0000-000000000000	4c0c11d6-04f4-4ff0-8792-ba3f40f32559	{"action":"login","actor_id":"780bcf0c-f47f-498e-a129-35583df2a8a1","actor_username":"contact@prodiving.asia","actor_via_sso":false,"log_type":"account","traits":{"provider":"email"}}	2026-03-27 09:19:18.28168+00	
00000000-0000-0000-0000-000000000000	075bec89-22a7-40d1-865d-77d2bfa1463f	{"action":"token_refreshed","actor_id":"780bcf0c-f47f-498e-a129-35583df2a8a1","actor_username":"contact@prodiving.asia","actor_via_sso":false,"log_type":"token"}	2026-03-27 09:57:05.07362+00	
00000000-0000-0000-0000-000000000000	26394dfb-da8a-4fb3-8c5c-77657f3c4612	{"action":"token_revoked","actor_id":"780bcf0c-f47f-498e-a129-35583df2a8a1","actor_username":"contact@prodiving.asia","actor_via_sso":false,"log_type":"token"}	2026-03-27 09:57:05.092251+00	
00000000-0000-0000-0000-000000000000	85e88177-f10e-4e63-a1a7-b09bd5650b7c	{"action":"token_refreshed","actor_id":"780bcf0c-f47f-498e-a129-35583df2a8a1","actor_username":"contact@prodiving.asia","actor_via_sso":false,"log_type":"token"}	2026-03-27 10:01:06.080547+00	
00000000-0000-0000-0000-000000000000	eb1feaba-073f-4d29-b708-4fc2fb97fc0a	{"action":"token_revoked","actor_id":"780bcf0c-f47f-498e-a129-35583df2a8a1","actor_username":"contact@prodiving.asia","actor_via_sso":false,"log_type":"token"}	2026-03-27 10:01:06.092664+00	
00000000-0000-0000-0000-000000000000	085513cc-8467-421c-be25-88aca2c2e160	{"action":"login","actor_id":"780bcf0c-f47f-498e-a129-35583df2a8a1","actor_username":"contact@prodiving.asia","actor_via_sso":false,"log_type":"account","traits":{"provider":"email"}}	2026-03-27 10:16:49.347578+00	
00000000-0000-0000-0000-000000000000	18389c14-fa2e-4f36-a034-8b7375bf0672	{"action":"token_refreshed","actor_id":"780bcf0c-f47f-498e-a129-35583df2a8a1","actor_username":"contact@prodiving.asia","actor_via_sso":false,"log_type":"token"}	2026-03-27 10:17:58.859371+00	
00000000-0000-0000-0000-000000000000	500e168d-3270-4902-8f6c-9ff8cd3fc848	{"action":"token_revoked","actor_id":"780bcf0c-f47f-498e-a129-35583df2a8a1","actor_username":"contact@prodiving.asia","actor_via_sso":false,"log_type":"token"}	2026-03-27 10:17:58.878606+00	
00000000-0000-0000-0000-000000000000	3bb04108-3910-4aa8-8089-d2ec01330719	{"action":"token_refreshed","actor_id":"780bcf0c-f47f-498e-a129-35583df2a8a1","actor_username":"contact@prodiving.asia","actor_via_sso":false,"log_type":"token"}	2026-03-27 10:55:32.275906+00	
00000000-0000-0000-0000-000000000000	cebba187-fe5b-4a05-ad3a-c9335de06080	{"action":"token_revoked","actor_id":"780bcf0c-f47f-498e-a129-35583df2a8a1","actor_username":"contact@prodiving.asia","actor_via_sso":false,"log_type":"token"}	2026-03-27 10:55:32.307918+00	
00000000-0000-0000-0000-000000000000	b2a0319c-c908-4d0f-9e85-93984517aff6	{"action":"token_refreshed","actor_id":"780bcf0c-f47f-498e-a129-35583df2a8a1","actor_username":"contact@prodiving.asia","actor_via_sso":false,"log_type":"token"}	2026-03-27 10:59:11.927641+00	
00000000-0000-0000-0000-000000000000	e6b95578-f81c-42ca-b062-d9d050561804	{"action":"token_revoked","actor_id":"780bcf0c-f47f-498e-a129-35583df2a8a1","actor_username":"contact@prodiving.asia","actor_via_sso":false,"log_type":"token"}	2026-03-27 10:59:11.947551+00	
00000000-0000-0000-0000-000000000000	81eb9cc4-11d4-461d-89f3-591369ca9119	{"action":"token_refreshed","actor_id":"780bcf0c-f47f-498e-a129-35583df2a8a1","actor_username":"contact@prodiving.asia","actor_via_sso":false,"log_type":"token"}	2026-03-27 11:15:21.300117+00	
00000000-0000-0000-0000-000000000000	1b838aad-7dec-471e-a362-5ba71c0fe319	{"action":"token_revoked","actor_id":"780bcf0c-f47f-498e-a129-35583df2a8a1","actor_username":"contact@prodiving.asia","actor_via_sso":false,"log_type":"token"}	2026-03-27 11:15:21.318799+00	
00000000-0000-0000-0000-000000000000	f1afff37-d1ba-4e2f-8904-94ca3631768e	{"action":"token_refreshed","actor_id":"780bcf0c-f47f-498e-a129-35583df2a8a1","actor_username":"contact@prodiving.asia","actor_via_sso":false,"log_type":"token"}	2026-03-27 11:56:08.708785+00	
00000000-0000-0000-0000-000000000000	2bd19939-5919-4278-b5e0-2a8c839edbff	{"action":"token_revoked","actor_id":"780bcf0c-f47f-498e-a129-35583df2a8a1","actor_username":"contact@prodiving.asia","actor_via_sso":false,"log_type":"token"}	2026-03-27 11:56:08.727118+00	
00000000-0000-0000-0000-000000000000	1f19cf96-9caf-4691-873c-16bfee88ca78	{"action":"token_refreshed","actor_id":"780bcf0c-f47f-498e-a129-35583df2a8a1","actor_username":"contact@prodiving.asia","actor_via_sso":false,"log_type":"token"}	2026-03-27 11:57:46.400263+00	
00000000-0000-0000-0000-000000000000	e1eafcb2-ec93-4fc9-a138-fce9d8c7ebaf	{"action":"token_revoked","actor_id":"780bcf0c-f47f-498e-a129-35583df2a8a1","actor_username":"contact@prodiving.asia","actor_via_sso":false,"log_type":"token"}	2026-03-27 11:57:46.415577+00	
00000000-0000-0000-0000-000000000000	156d64ea-0f67-430a-9808-ae174bd6d426	{"action":"login","actor_id":"780bcf0c-f47f-498e-a129-35583df2a8a1","actor_username":"contact@prodiving.asia","actor_via_sso":false,"log_type":"account","traits":{"provider":"email"}}	2026-03-27 12:29:03.826788+00	
00000000-0000-0000-0000-000000000000	7fb44fd1-ab73-4608-b69e-b388872b6457	{"action":"token_refreshed","actor_id":"780bcf0c-f47f-498e-a129-35583df2a8a1","actor_username":"contact@prodiving.asia","actor_via_sso":false,"log_type":"token"}	2026-03-27 12:54:16.13335+00	
00000000-0000-0000-0000-000000000000	b1b6e7af-b802-4ea5-a226-07e2e2dd9526	{"action":"token_revoked","actor_id":"780bcf0c-f47f-498e-a129-35583df2a8a1","actor_username":"contact@prodiving.asia","actor_via_sso":false,"log_type":"token"}	2026-03-27 12:54:16.148612+00	
00000000-0000-0000-0000-000000000000	c99327a4-225a-447d-83db-cf3cec396dd1	{"action":"login","actor_id":"780bcf0c-f47f-498e-a129-35583df2a8a1","actor_username":"contact@prodiving.asia","actor_via_sso":false,"log_type":"account","traits":{"provider":"email"}}	2026-03-27 13:29:54.239096+00	
00000000-0000-0000-0000-000000000000	d0492c47-df58-40d9-bdb7-9d89812e0320	{"action":"token_refreshed","actor_id":"780bcf0c-f47f-498e-a129-35583df2a8a1","actor_username":"contact@prodiving.asia","actor_via_sso":false,"log_type":"token"}	2026-03-27 13:52:47.142934+00	
00000000-0000-0000-0000-000000000000	d8262a61-bdc9-47a2-8c7e-8e8baab753a9	{"action":"token_revoked","actor_id":"780bcf0c-f47f-498e-a129-35583df2a8a1","actor_username":"contact@prodiving.asia","actor_via_sso":false,"log_type":"token"}	2026-03-27 13:52:47.179902+00	
00000000-0000-0000-0000-000000000000	eff9a6f9-ff9c-4826-b640-c7414f7ce6a3	{"action":"token_refreshed","actor_id":"780bcf0c-f47f-498e-a129-35583df2a8a1","actor_username":"contact@prodiving.asia","actor_via_sso":false,"log_type":"token"}	2026-03-27 14:28:29.653396+00	
00000000-0000-0000-0000-000000000000	6fc5dcf7-03ca-48f2-8045-dc5756c93548	{"action":"token_revoked","actor_id":"780bcf0c-f47f-498e-a129-35583df2a8a1","actor_username":"contact@prodiving.asia","actor_via_sso":false,"log_type":"token"}	2026-03-27 14:28:29.673467+00	
00000000-0000-0000-0000-000000000000	08930f1c-4e46-492c-9870-b65e6e13613a	{"action":"token_refreshed","actor_id":"780bcf0c-f47f-498e-a129-35583df2a8a1","actor_username":"contact@prodiving.asia","actor_via_sso":false,"log_type":"token"}	2026-03-27 14:54:16.183823+00	
00000000-0000-0000-0000-000000000000	526cfed5-338a-414c-9fd3-2690a3bd5870	{"action":"token_revoked","actor_id":"780bcf0c-f47f-498e-a129-35583df2a8a1","actor_username":"contact@prodiving.asia","actor_via_sso":false,"log_type":"token"}	2026-03-27 14:54:16.202714+00	
00000000-0000-0000-0000-000000000000	025ccf2c-f312-4781-babe-3f2daf09bffa	{"action":"token_refreshed","actor_id":"780bcf0c-f47f-498e-a129-35583df2a8a1","actor_username":"contact@prodiving.asia","actor_via_sso":false,"log_type":"token"}	2026-03-27 15:37:37.301934+00	
00000000-0000-0000-0000-000000000000	b95dff2a-0945-45b2-b57e-8683eda96657	{"action":"token_revoked","actor_id":"780bcf0c-f47f-498e-a129-35583df2a8a1","actor_username":"contact@prodiving.asia","actor_via_sso":false,"log_type":"token"}	2026-03-27 15:37:37.321267+00	
00000000-0000-0000-0000-000000000000	f1b9ba87-7839-4848-9197-e2c4124df493	{"action":"token_refreshed","actor_id":"780bcf0c-f47f-498e-a129-35583df2a8a1","actor_username":"contact@prodiving.asia","actor_via_sso":false,"log_type":"token"}	2026-03-27 15:52:54.340089+00	
00000000-0000-0000-0000-000000000000	bc35c56d-ac38-47c9-be22-97d35dfbee23	{"action":"token_revoked","actor_id":"780bcf0c-f47f-498e-a129-35583df2a8a1","actor_username":"contact@prodiving.asia","actor_via_sso":false,"log_type":"token"}	2026-03-27 15:52:54.36223+00	
00000000-0000-0000-0000-000000000000	fe9f4d47-49d9-4853-91ac-c5229c403fd8	{"action":"token_refreshed","actor_id":"780bcf0c-f47f-498e-a129-35583df2a8a1","actor_username":"contact@prodiving.asia","actor_via_sso":false,"log_type":"token"}	2026-03-27 17:25:17.661397+00	
00000000-0000-0000-0000-000000000000	dff09604-b1de-4a33-afeb-9cfffe85ec71	{"action":"token_revoked","actor_id":"780bcf0c-f47f-498e-a129-35583df2a8a1","actor_username":"contact@prodiving.asia","actor_via_sso":false,"log_type":"token"}	2026-03-27 17:25:17.684701+00	
00000000-0000-0000-0000-000000000000	40e98d36-437f-49cc-be95-e407560081d8	{"action":"token_refreshed","actor_id":"780bcf0c-f47f-498e-a129-35583df2a8a1","actor_username":"contact@prodiving.asia","actor_via_sso":false,"log_type":"token"}	2026-03-27 17:25:53.365668+00	
00000000-0000-0000-0000-000000000000	87bb4aec-5501-4f7a-a531-13cbef1b0aaa	{"action":"token_revoked","actor_id":"780bcf0c-f47f-498e-a129-35583df2a8a1","actor_username":"contact@prodiving.asia","actor_via_sso":false,"log_type":"token"}	2026-03-27 17:25:53.382034+00	
00000000-0000-0000-0000-000000000000	54644cac-f192-432f-88e4-77965afdd150	{"action":"token_refreshed","actor_id":"780bcf0c-f47f-498e-a129-35583df2a8a1","actor_username":"contact@prodiving.asia","actor_via_sso":false,"log_type":"token"}	2026-03-28 12:02:09.841017+00	
00000000-0000-0000-0000-000000000000	8f2eea95-6459-4445-b18b-f833b7ce34a5	{"action":"token_revoked","actor_id":"780bcf0c-f47f-498e-a129-35583df2a8a1","actor_username":"contact@prodiving.asia","actor_via_sso":false,"log_type":"token"}	2026-03-28 12:02:09.860268+00	
00000000-0000-0000-0000-000000000000	dc2eb421-41ae-4b6d-8b7f-47f30b0fd623	{"action":"login","actor_id":"780bcf0c-f47f-498e-a129-35583df2a8a1","actor_username":"contact@prodiving.asia","actor_via_sso":false,"log_type":"account","traits":{"provider":"email"}}	2026-03-28 12:02:28.190649+00	
00000000-0000-0000-0000-000000000000	63715f1c-f766-4956-93bf-e2051cb6f59e	{"action":"token_refreshed","actor_id":"780bcf0c-f47f-498e-a129-35583df2a8a1","actor_username":"contact@prodiving.asia","actor_via_sso":false,"log_type":"token"}	2026-03-28 12:09:07.783631+00	
00000000-0000-0000-0000-000000000000	9c63bc2e-0a00-46fd-ac7d-9958e8bac669	{"action":"token_revoked","actor_id":"780bcf0c-f47f-498e-a129-35583df2a8a1","actor_username":"contact@prodiving.asia","actor_via_sso":false,"log_type":"token"}	2026-03-28 12:09:07.809449+00	
00000000-0000-0000-0000-000000000000	df34ac18-b9cd-40b6-bd14-f031a146c164	{"action":"logout","actor_id":"780bcf0c-f47f-498e-a129-35583df2a8a1","actor_username":"contact@prodiving.asia","actor_via_sso":false,"log_type":"account"}	2026-03-28 12:14:48.627826+00	
00000000-0000-0000-0000-000000000000	6bd34c84-18db-4bff-afae-6f53b1afda5c	{"action":"login","actor_id":"780bcf0c-f47f-498e-a129-35583df2a8a1","actor_username":"contact@prodiving.asia","actor_via_sso":false,"log_type":"account","traits":{"provider":"email"}}	2026-03-28 12:18:24.618077+00	
00000000-0000-0000-0000-000000000000	6c911290-83fc-4cbc-bb37-445ecfd6978c	{"action":"login","actor_id":"780bcf0c-f47f-498e-a129-35583df2a8a1","actor_username":"contact@prodiving.asia","actor_via_sso":false,"log_type":"account","traits":{"provider":"email"}}	2026-03-28 13:12:37.818672+00	
00000000-0000-0000-0000-000000000000	cbf7ffda-10ed-4b17-8a22-d31a52c0b598	{"action":"token_refreshed","actor_id":"780bcf0c-f47f-498e-a129-35583df2a8a1","actor_username":"contact@prodiving.asia","actor_via_sso":false,"log_type":"token"}	2026-03-28 13:17:36.049849+00	
00000000-0000-0000-0000-000000000000	60ef7b6a-c852-4756-9c59-c1a45ee3b5ed	{"action":"token_revoked","actor_id":"780bcf0c-f47f-498e-a129-35583df2a8a1","actor_username":"contact@prodiving.asia","actor_via_sso":false,"log_type":"token"}	2026-03-28 13:17:36.064263+00	
00000000-0000-0000-0000-000000000000	f1566780-c099-4a46-9042-452a47e3cddf	{"action":"token_refreshed","actor_id":"780bcf0c-f47f-498e-a129-35583df2a8a1","actor_username":"contact@prodiving.asia","actor_via_sso":false,"log_type":"token"}	2026-03-28 14:16:12.987276+00	
00000000-0000-0000-0000-000000000000	5d2f025e-7de9-47bb-a323-1d5236eacc4c	{"action":"token_revoked","actor_id":"780bcf0c-f47f-498e-a129-35583df2a8a1","actor_username":"contact@prodiving.asia","actor_via_sso":false,"log_type":"token"}	2026-03-28 14:16:13.002423+00	
00000000-0000-0000-0000-000000000000	bef47b66-8b42-4ce1-ba7d-ef5e5d21a5e8	{"action":"token_refreshed","actor_id":"780bcf0c-f47f-498e-a129-35583df2a8a1","actor_username":"contact@prodiving.asia","actor_via_sso":false,"log_type":"token"}	2026-03-28 14:20:17.527567+00	
00000000-0000-0000-0000-000000000000	6406e4a3-d913-4681-ad60-bda4ad406e84	{"action":"token_revoked","actor_id":"780bcf0c-f47f-498e-a129-35583df2a8a1","actor_username":"contact@prodiving.asia","actor_via_sso":false,"log_type":"token"}	2026-03-28 14:20:17.603793+00	
00000000-0000-0000-0000-000000000000	6b618f38-f35f-4481-a3cc-0e007728c443	{"action":"token_refreshed","actor_id":"780bcf0c-f47f-498e-a129-35583df2a8a1","actor_username":"contact@prodiving.asia","actor_via_sso":false,"log_type":"token"}	2026-03-28 15:14:59.326176+00	
00000000-0000-0000-0000-000000000000	717c834c-9620-4146-b5d2-13ab6312a79f	{"action":"token_revoked","actor_id":"780bcf0c-f47f-498e-a129-35583df2a8a1","actor_username":"contact@prodiving.asia","actor_via_sso":false,"log_type":"token"}	2026-03-28 15:14:59.34835+00	
00000000-0000-0000-0000-000000000000	6afd1e00-1b68-43ef-af3b-165975cc4964	{"action":"token_refreshed","actor_id":"780bcf0c-f47f-498e-a129-35583df2a8a1","actor_username":"contact@prodiving.asia","actor_via_sso":false,"log_type":"token"}	2026-03-28 15:48:33.792616+00	
00000000-0000-0000-0000-000000000000	7a3d33d0-674f-4600-b600-5ab0a7b6e95f	{"action":"token_revoked","actor_id":"780bcf0c-f47f-498e-a129-35583df2a8a1","actor_username":"contact@prodiving.asia","actor_via_sso":false,"log_type":"token"}	2026-03-28 15:48:33.823219+00	
00000000-0000-0000-0000-000000000000	35566027-91aa-4395-95c6-68b4655478c8	{"action":"token_refreshed","actor_id":"780bcf0c-f47f-498e-a129-35583df2a8a1","actor_username":"contact@prodiving.asia","actor_via_sso":false,"log_type":"token"}	2026-03-28 16:13:31.043521+00	
00000000-0000-0000-0000-000000000000	182a8bd5-f2d3-418b-b5f7-780e6199c1e1	{"action":"token_revoked","actor_id":"780bcf0c-f47f-498e-a129-35583df2a8a1","actor_username":"contact@prodiving.asia","actor_via_sso":false,"log_type":"token"}	2026-03-28 16:13:31.064584+00	
00000000-0000-0000-0000-000000000000	f889acbe-107a-4fcc-a7a9-3d0ee53f4a1c	{"action":"token_refreshed","actor_id":"780bcf0c-f47f-498e-a129-35583df2a8a1","actor_username":"contact@prodiving.asia","actor_via_sso":false,"log_type":"token"}	2026-03-28 17:12:10.487136+00	
00000000-0000-0000-0000-000000000000	4099f0d1-c0c4-49d6-a2e7-6477448a004d	{"action":"token_revoked","actor_id":"780bcf0c-f47f-498e-a129-35583df2a8a1","actor_username":"contact@prodiving.asia","actor_via_sso":false,"log_type":"token"}	2026-03-28 17:12:10.504236+00	
00000000-0000-0000-0000-000000000000	f24e58c7-f60d-4c2e-83a5-03f2bf957af5	{"action":"token_refreshed","actor_id":"780bcf0c-f47f-498e-a129-35583df2a8a1","actor_username":"contact@prodiving.asia","actor_via_sso":false,"log_type":"token"}	2026-03-28 17:53:05.275086+00	
00000000-0000-0000-0000-000000000000	dd1a2158-8811-4a70-a26b-5aea99d93062	{"action":"token_revoked","actor_id":"780bcf0c-f47f-498e-a129-35583df2a8a1","actor_username":"contact@prodiving.asia","actor_via_sso":false,"log_type":"token"}	2026-03-28 17:53:05.295598+00	
00000000-0000-0000-0000-000000000000	5ed645c0-4283-4c6b-b14c-3b852ecd7b84	{"action":"token_refreshed","actor_id":"780bcf0c-f47f-498e-a129-35583df2a8a1","actor_username":"contact@prodiving.asia","actor_via_sso":false,"log_type":"token"}	2026-03-28 18:10:53.98693+00	
00000000-0000-0000-0000-000000000000	779e109d-f13a-4682-bb6d-16bc4d7246c5	{"action":"token_revoked","actor_id":"780bcf0c-f47f-498e-a129-35583df2a8a1","actor_username":"contact@prodiving.asia","actor_via_sso":false,"log_type":"token"}	2026-03-28 18:10:54.011935+00	
00000000-0000-0000-0000-000000000000	be7375de-3e02-4664-8534-e591db47a26b	{"action":"login","actor_id":"780bcf0c-f47f-498e-a129-35583df2a8a1","actor_username":"contact@prodiving.asia","actor_via_sso":false,"log_type":"account","traits":{"provider":"email"}}	2026-03-28 18:14:42.398898+00	
00000000-0000-0000-0000-000000000000	64e2d246-26fc-4c34-bec4-2e2bf404d81b	{"action":"login","actor_id":"780bcf0c-f47f-498e-a129-35583df2a8a1","actor_username":"contact@prodiving.asia","actor_via_sso":false,"log_type":"account","traits":{"provider":"email"}}	2026-03-28 18:16:05.858023+00	
00000000-0000-0000-0000-000000000000	99fc5321-08d0-45fd-94af-4270fa97f148	{"action":"token_refreshed","actor_id":"780bcf0c-f47f-498e-a129-35583df2a8a1","actor_username":"contact@prodiving.asia","actor_via_sso":false,"log_type":"token"}	2026-03-28 19:01:00.456781+00	
00000000-0000-0000-0000-000000000000	45c4c16f-6ed4-4520-93ec-3a6a73d59935	{"action":"token_revoked","actor_id":"780bcf0c-f47f-498e-a129-35583df2a8a1","actor_username":"contact@prodiving.asia","actor_via_sso":false,"log_type":"token"}	2026-03-28 19:01:00.479352+00	
00000000-0000-0000-0000-000000000000	c8a4be0c-379b-47da-9eae-3967b2a37894	{"action":"token_refreshed","actor_id":"780bcf0c-f47f-498e-a129-35583df2a8a1","actor_username":"contact@prodiving.asia","actor_via_sso":false,"log_type":"token"}	2026-03-28 19:10:15.019716+00	
00000000-0000-0000-0000-000000000000	d6068b4b-e9b3-42b8-945f-f38d9b54b1a9	{"action":"token_revoked","actor_id":"780bcf0c-f47f-498e-a129-35583df2a8a1","actor_username":"contact@prodiving.asia","actor_via_sso":false,"log_type":"token"}	2026-03-28 19:10:15.044855+00	
00000000-0000-0000-0000-000000000000	72b0959f-e20a-477c-a2bd-717fb330e69d	{"action":"token_refreshed","actor_id":"780bcf0c-f47f-498e-a129-35583df2a8a1","actor_username":"contact@prodiving.asia","actor_via_sso":false,"log_type":"token"}	2026-03-28 20:01:07.746213+00	
00000000-0000-0000-0000-000000000000	78276e68-8aab-4150-9de1-4b9e28811cc9	{"action":"token_revoked","actor_id":"780bcf0c-f47f-498e-a129-35583df2a8a1","actor_username":"contact@prodiving.asia","actor_via_sso":false,"log_type":"token"}	2026-03-28 20:01:07.769605+00	
00000000-0000-0000-0000-000000000000	9bd2512e-b2ca-446f-b54e-09e720e728d6	{"action":"token_refreshed","actor_id":"780bcf0c-f47f-498e-a129-35583df2a8a1","actor_username":"contact@prodiving.asia","actor_via_sso":false,"log_type":"token"}	2026-03-28 20:08:51.743411+00	
00000000-0000-0000-0000-000000000000	ce46c1fa-20ce-49cd-ba3c-5651a3beba39	{"action":"token_revoked","actor_id":"780bcf0c-f47f-498e-a129-35583df2a8a1","actor_username":"contact@prodiving.asia","actor_via_sso":false,"log_type":"token"}	2026-03-28 20:08:51.767239+00	
00000000-0000-0000-0000-000000000000	da7bc757-bec3-4c8b-a11f-55e72a39b025	{"action":"login","actor_id":"780bcf0c-f47f-498e-a129-35583df2a8a1","actor_username":"contact@prodiving.asia","actor_via_sso":false,"log_type":"account","traits":{"provider":"email"}}	2026-03-28 20:40:00.945082+00	
00000000-0000-0000-0000-000000000000	67974648-abd7-48fb-907d-e14df94bbc99	{"action":"login","actor_id":"780bcf0c-f47f-498e-a129-35583df2a8a1","actor_username":"contact@prodiving.asia","actor_via_sso":false,"log_type":"account","traits":{"provider":"email"}}	2026-03-28 20:42:14.860821+00	
00000000-0000-0000-0000-000000000000	f6cd91b0-9e6a-4815-a5ac-ab6683509efb	{"action":"token_refreshed","actor_id":"780bcf0c-f47f-498e-a129-35583df2a8a1","actor_username":"contact@prodiving.asia","actor_via_sso":false,"log_type":"token"}	2026-03-28 20:59:46.95504+00	
00000000-0000-0000-0000-000000000000	38e6fd24-6776-4516-8676-aea8443dd362	{"action":"token_revoked","actor_id":"780bcf0c-f47f-498e-a129-35583df2a8a1","actor_username":"contact@prodiving.asia","actor_via_sso":false,"log_type":"token"}	2026-03-28 20:59:46.979427+00	
00000000-0000-0000-0000-000000000000	f9dc9b0c-6df2-44b7-865b-b2bcec965390	{"action":"token_refreshed","actor_id":"780bcf0c-f47f-498e-a129-35583df2a8a1","actor_username":"contact@prodiving.asia","actor_via_sso":false,"log_type":"token"}	2026-03-28 21:07:01.371382+00	
00000000-0000-0000-0000-000000000000	0e404b3d-75a1-4a63-a36c-ede754a89102	{"action":"token_revoked","actor_id":"780bcf0c-f47f-498e-a129-35583df2a8a1","actor_username":"contact@prodiving.asia","actor_via_sso":false,"log_type":"token"}	2026-03-28 21:07:01.394005+00	
00000000-0000-0000-0000-000000000000	89973b94-4a79-4c74-94f1-e9f0e64c81f0	{"action":"user_recovery_requested","actor_id":"d314da05-5a66-49b4-bb53-034981d83690","actor_username":"onemediaasia@duck.com","actor_via_sso":false,"log_type":"user"}	2026-03-28 21:24:16.626389+00	
00000000-0000-0000-0000-000000000000	000fb964-4668-4cff-af8b-6a4e0c9d1a94	{"action":"user_signedup","actor_id":"d314da05-5a66-49b4-bb53-034981d83690","actor_username":"onemediaasia@duck.com","actor_via_sso":false,"log_type":"team","traits":{"provider":"email"}}	2026-03-28 21:24:26.945101+00	
00000000-0000-0000-0000-000000000000	660854f3-74a9-4994-a39b-b6835c02d789	{"action":"user_recovery_requested","actor_id":"d314da05-5a66-49b4-bb53-034981d83690","actor_username":"onemediaasia@duck.com","actor_via_sso":false,"log_type":"user"}	2026-03-28 21:25:26.159841+00	
00000000-0000-0000-0000-000000000000	c553de7d-4725-4479-993c-91d538de1dd7	{"action":"logout","actor_id":"d314da05-5a66-49b4-bb53-034981d83690","actor_username":"onemediaasia@duck.com","actor_via_sso":false,"log_type":"account"}	2026-03-28 21:25:36.275492+00	
00000000-0000-0000-0000-000000000000	26e9b46a-16e5-4d43-9395-c65135c93eb1	{"action":"login","actor_id":"d314da05-5a66-49b4-bb53-034981d83690","actor_username":"onemediaasia@duck.com","actor_via_sso":false,"log_type":"account"}	2026-03-28 21:25:54.464175+00	
00000000-0000-0000-0000-000000000000	bb4ddc5e-21f4-4503-8d08-99021632119f	{"action":"logout","actor_id":"780bcf0c-f47f-498e-a129-35583df2a8a1","actor_username":"contact@prodiving.asia","actor_via_sso":false,"log_type":"account"}	2026-03-28 21:33:15.23427+00	
00000000-0000-0000-0000-000000000000	2913ff69-c3ea-4bfb-bc6f-a0c6e4921c74	{"action":"user_deleted","actor_id":"00000000-0000-0000-0000-000000000000","actor_username":"service_role","actor_via_sso":false,"log_type":"team","traits":{"user_email":"bas@divinginasia.com","user_id":"eaaa47be-6300-4bc4-85f7-e98c5e00e249","user_phone":""}}	2026-03-28 21:37:33.797332+00	
00000000-0000-0000-0000-000000000000	59b198b8-3044-421b-82db-5fd304789fdc	{"action":"user_repeated_signup","actor_id":"8f3dd95e-2571-4b71-9058-dc706c7e2ec2","actor_username":"admin@login.com","actor_via_sso":false,"log_type":"user","traits":{"provider":"email"}}	2026-03-28 21:39:35.132071+00	
00000000-0000-0000-0000-000000000000	ead19a5c-20ef-42ea-ae1d-8fb2b2b76ecf	{"action":"user_repeated_signup","actor_id":"3a679996-7773-4b9b-a3fe-93c031266ef9","actor_username":"peter@onemedia.asia","actor_via_sso":false,"log_type":"user","traits":{"provider":"email"}}	2026-03-28 21:40:05.045453+00	
00000000-0000-0000-0000-000000000000	a338280b-e26c-4c06-8bbb-821d75acdf31	{"action":"logout","actor_id":"d314da05-5a66-49b4-bb53-034981d83690","actor_username":"onemediaasia@duck.com","actor_via_sso":false,"log_type":"account"}	2026-03-28 21:40:35.036844+00	
00000000-0000-0000-0000-000000000000	f7a976d2-bbbd-48d0-b410-ce4cb1ed6dfb	{"action":"login","actor_id":"8f3dd95e-2571-4b71-9058-dc706c7e2ec2","actor_username":"admin@login.com","actor_via_sso":false,"log_type":"account","traits":{"provider":"email"}}	2026-03-28 21:40:43.075607+00	
00000000-0000-0000-0000-000000000000	000644f9-cdf8-497c-a7bc-1382ed140cc9	{"action":"logout","actor_id":"8f3dd95e-2571-4b71-9058-dc706c7e2ec2","actor_username":"admin@login.com","actor_via_sso":false,"log_type":"account"}	2026-03-28 21:41:22.833965+00	
00000000-0000-0000-0000-000000000000	e0b71f36-64e2-443d-a222-042436795e24	{"action":"login","actor_id":"780bcf0c-f47f-498e-a129-35583df2a8a1","actor_username":"contact@prodiving.asia","actor_via_sso":false,"log_type":"account","traits":{"provider":"email"}}	2026-03-28 21:41:31.225426+00	
00000000-0000-0000-0000-000000000000	c92a7d7a-19dd-4d54-9562-12494fd7acea	{"action":"logout","actor_id":"780bcf0c-f47f-498e-a129-35583df2a8a1","actor_username":"contact@prodiving.asia","actor_via_sso":false,"log_type":"account"}	2026-03-28 21:42:36.846814+00	
00000000-0000-0000-0000-000000000000	b069ffea-8b47-4fce-8044-cc7e4ddad2a2	{"action":"login","actor_id":"8f3dd95e-2571-4b71-9058-dc706c7e2ec2","actor_username":"admin@login.com","actor_via_sso":false,"log_type":"account","traits":{"provider":"email"}}	2026-03-28 21:42:45.344572+00	
00000000-0000-0000-0000-000000000000	3788de37-9e34-45a4-9881-7db8eb15fa78	{"action":"user_repeated_signup","actor_id":"150f5370-cae7-472a-b62f-83a4758d9dcb","actor_username":"login@onemedia.asia","actor_via_sso":false,"log_type":"user","traits":{"provider":"email"}}	2026-03-28 21:45:17.290154+00	
00000000-0000-0000-0000-000000000000	5190e4a2-e3f8-4708-988f-2ae8c4b85389	{"action":"login","actor_id":"780bcf0c-f47f-498e-a129-35583df2a8a1","actor_username":"contact@prodiving.asia","actor_via_sso":false,"log_type":"account","traits":{"provider":"email"}}	2026-03-28 21:46:52.159328+00	
00000000-0000-0000-0000-000000000000	47cda148-ba4e-4d3e-b1c8-31694711b6e9	{"action":"logout","actor_id":"780bcf0c-f47f-498e-a129-35583df2a8a1","actor_username":"contact@prodiving.asia","actor_via_sso":false,"log_type":"account"}	2026-03-28 21:51:53.016031+00	
00000000-0000-0000-0000-000000000000	199d9990-a332-4a75-ba77-8fbfb92a07b8	{"action":"login","actor_id":"d314da05-5a66-49b4-bb53-034981d83690","actor_username":"onemediaasia@duck.com","actor_via_sso":false,"log_type":"account","traits":{"provider":"email"}}	2026-03-28 21:52:07.32431+00	
00000000-0000-0000-0000-000000000000	066ce835-13c3-4741-8385-ac078cb3b100	{"action":"logout","actor_id":"d314da05-5a66-49b4-bb53-034981d83690","actor_username":"onemediaasia@duck.com","actor_via_sso":false,"log_type":"account"}	2026-03-28 21:56:42.985463+00	
00000000-0000-0000-0000-000000000000	0998e049-cfb7-46f9-9b12-0793093f36ee	{"action":"login","actor_id":"780bcf0c-f47f-498e-a129-35583df2a8a1","actor_username":"contact@prodiving.asia","actor_via_sso":false,"log_type":"account","traits":{"provider":"email"}}	2026-03-28 22:08:10.365347+00	
00000000-0000-0000-0000-000000000000	92b37282-bb31-4178-938c-ebe929daedf6	{"action":"logout","actor_id":"780bcf0c-f47f-498e-a129-35583df2a8a1","actor_username":"contact@prodiving.asia","actor_via_sso":false,"log_type":"account"}	2026-03-28 22:16:38.24859+00	
00000000-0000-0000-0000-000000000000	535459cd-9945-4bd1-9fef-7b112fd6a4ed	{"action":"login","actor_id":"780bcf0c-f47f-498e-a129-35583df2a8a1","actor_username":"contact@prodiving.asia","actor_via_sso":false,"log_type":"account","traits":{"provider":"email"}}	2026-03-28 22:21:08.924663+00	
00000000-0000-0000-0000-000000000000	b058ff6d-01bf-4d05-bca7-21b95dd71e1b	{"action":"user_deleted","actor_id":"00000000-0000-0000-0000-000000000000","actor_username":"service_role","actor_via_sso":false,"log_type":"team","traits":{"user_email":"peter@one.com","user_id":"0b406a7e-a3bd-42e7-b1d6-22d8cb12f920","user_phone":""}}	2026-03-28 22:23:01.960135+00	
00000000-0000-0000-0000-000000000000	cf9d04e6-c601-44f4-bf79-a7ca1229a3b6	{"action":"user_deleted","actor_id":"00000000-0000-0000-0000-000000000000","actor_username":"service_role","actor_via_sso":false,"log_type":"team","traits":{"user_email":"login@one.com","user_id":"6b09a69d-3f85-4978-a223-69fb97225b32","user_phone":""}}	2026-03-28 22:23:01.960038+00	
00000000-0000-0000-0000-000000000000	dcf37578-e9dc-490b-a6cc-720b6a71ccd8	{"action":"user_deleted","actor_id":"00000000-0000-0000-0000-000000000000","actor_username":"service_role","actor_via_sso":false,"log_type":"team","traits":{"user_email":"peter@p.com","user_id":"f21cf312-c013-4e1d-a997-745a1ae15ea3","user_phone":""}}	2026-03-28 22:23:01.970125+00	
00000000-0000-0000-0000-000000000000	7592c82b-b5e3-431f-b003-7897e675cbd1	{"action":"user_deleted","actor_id":"00000000-0000-0000-0000-000000000000","actor_username":"service_role","actor_via_sso":false,"log_type":"team","traits":{"user_email":"bas@coursedirector.best","user_id":"91313ee3-e965-4ee5-b160-497ac39d38e7","user_phone":""}}	2026-03-28 22:23:01.968915+00	
00000000-0000-0000-0000-000000000000	d0f1e9ad-e693-4c38-a1e0-20f07ef1da1f	{"action":"user_deleted","actor_id":"00000000-0000-0000-0000-000000000000","actor_username":"service_role","actor_via_sso":false,"log_type":"team","traits":{"user_email":"login@onemedia.asia","user_id":"150f5370-cae7-472a-b62f-83a4758d9dcb","user_phone":""}}	2026-03-28 22:23:01.975127+00	
00000000-0000-0000-0000-000000000000	5fe9f19b-2168-45c0-93a2-396afe188989	{"action":"user_deleted","actor_id":"00000000-0000-0000-0000-000000000000","actor_username":"service_role","actor_via_sso":false,"log_type":"team","traits":{"user_email":"admin@login.com","user_id":"8f3dd95e-2571-4b71-9058-dc706c7e2ec2","user_phone":""}}	2026-03-28 22:23:01.988367+00	
00000000-0000-0000-0000-000000000000	b56bb2fc-e05d-44b9-9748-6b51cc284726	{"action":"user_deleted","actor_id":"00000000-0000-0000-0000-000000000000","actor_username":"service_role","actor_via_sso":false,"log_type":"team","traits":{"user_email":"pe@p.om","user_id":"6b81b3e9-643d-4675-aec6-5a56eb325a24","user_phone":""}}	2026-03-28 22:23:01.990085+00	
00000000-0000-0000-0000-000000000000	6e23c657-1317-4f32-8e2b-8f722a1b7f7f	{"action":"token_refreshed","actor_id":"780bcf0c-f47f-498e-a129-35583df2a8a1","actor_username":"contact@prodiving.asia","actor_via_sso":false,"log_type":"token"}	2026-03-28 23:19:20.125594+00	
00000000-0000-0000-0000-000000000000	a3f3b751-fa37-4e9e-be63-cb0c7876cf48	{"action":"token_revoked","actor_id":"780bcf0c-f47f-498e-a129-35583df2a8a1","actor_username":"contact@prodiving.asia","actor_via_sso":false,"log_type":"token"}	2026-03-28 23:19:20.16475+00	
00000000-0000-0000-0000-000000000000	e4f914dd-d8a6-4a1a-8d9f-50f6c634d86d	{"action":"token_refreshed","actor_id":"780bcf0c-f47f-498e-a129-35583df2a8a1","actor_username":"contact@prodiving.asia","actor_via_sso":false,"log_type":"token"}	2026-03-29 00:18:11.850769+00	
00000000-0000-0000-0000-000000000000	b5507253-21c3-49bb-82f6-63aca92bae16	{"action":"token_revoked","actor_id":"780bcf0c-f47f-498e-a129-35583df2a8a1","actor_username":"contact@prodiving.asia","actor_via_sso":false,"log_type":"token"}	2026-03-29 00:18:11.88119+00	
00000000-0000-0000-0000-000000000000	f324654e-26e3-47f1-a14a-67eb575855ef	{"action":"token_refreshed","actor_id":"780bcf0c-f47f-498e-a129-35583df2a8a1","actor_username":"contact@prodiving.asia","actor_via_sso":false,"log_type":"token"}	2026-03-29 01:17:30.19668+00	
00000000-0000-0000-0000-000000000000	09076f77-cdb0-4feb-a9c4-895a055f02d2	{"action":"token_revoked","actor_id":"780bcf0c-f47f-498e-a129-35583df2a8a1","actor_username":"contact@prodiving.asia","actor_via_sso":false,"log_type":"token"}	2026-03-29 01:17:30.225869+00	
00000000-0000-0000-0000-000000000000	6adc2e9e-b2ca-4cc1-a82d-097120dcd15a	{"action":"token_refreshed","actor_id":"780bcf0c-f47f-498e-a129-35583df2a8a1","actor_username":"contact@prodiving.asia","actor_via_sso":false,"log_type":"token"}	2026-03-29 02:16:02.517029+00	
00000000-0000-0000-0000-000000000000	a42b4dae-0cc2-4d5a-b07a-64d8446d92fa	{"action":"token_revoked","actor_id":"780bcf0c-f47f-498e-a129-35583df2a8a1","actor_username":"contact@prodiving.asia","actor_via_sso":false,"log_type":"token"}	2026-03-29 02:16:02.543051+00	
00000000-0000-0000-0000-000000000000	4ad8d3b7-55c4-4e62-bd10-e1ee424d106a	{"action":"login","actor_id":"780bcf0c-f47f-498e-a129-35583df2a8a1","actor_username":"contact@prodiving.asia","actor_via_sso":false,"log_type":"account","traits":{"provider":"email"}}	2026-03-29 03:24:36.233942+00	
00000000-0000-0000-0000-000000000000	dbb2755f-fef3-45a4-bc6b-fa238c5dde70	{"action":"login","actor_id":"780bcf0c-f47f-498e-a129-35583df2a8a1","actor_username":"contact@prodiving.asia","actor_via_sso":false,"log_type":"account","traits":{"provider":"email"}}	2026-03-29 04:35:26.422068+00	
00000000-0000-0000-0000-000000000000	cf58966e-94b7-4ef6-98a6-5deba0f96b6f	{"action":"login","actor_id":"780bcf0c-f47f-498e-a129-35583df2a8a1","actor_username":"contact@prodiving.asia","actor_via_sso":false,"log_type":"account","traits":{"provider":"email"}}	2026-03-29 04:41:04.253776+00	
00000000-0000-0000-0000-000000000000	45fc8526-9709-40b5-b2fd-a2987c290873	{"action":"token_refreshed","actor_id":"780bcf0c-f47f-498e-a129-35583df2a8a1","actor_username":"contact@prodiving.asia","actor_via_sso":false,"log_type":"token"}	2026-03-29 05:34:09.171779+00	
00000000-0000-0000-0000-000000000000	03571fa8-06ed-4fc3-8b6c-8673860d2d6e	{"action":"token_revoked","actor_id":"780bcf0c-f47f-498e-a129-35583df2a8a1","actor_username":"contact@prodiving.asia","actor_via_sso":false,"log_type":"token"}	2026-03-29 05:34:09.19632+00	
00000000-0000-0000-0000-000000000000	95911fee-015a-4c58-ae54-423767cb6e73	{"action":"token_refreshed","actor_id":"780bcf0c-f47f-498e-a129-35583df2a8a1","actor_username":"contact@prodiving.asia","actor_via_sso":false,"log_type":"token"}	2026-03-29 05:39:38.461345+00	
00000000-0000-0000-0000-000000000000	83343df5-58a4-4bd7-8bab-928ea7e66ef7	{"action":"token_revoked","actor_id":"780bcf0c-f47f-498e-a129-35583df2a8a1","actor_username":"contact@prodiving.asia","actor_via_sso":false,"log_type":"token"}	2026-03-29 05:39:38.483587+00	
00000000-0000-0000-0000-000000000000	1697a69b-eb64-488f-8ca4-dd9ea08590c8	{"action":"login","actor_id":"780bcf0c-f47f-498e-a129-35583df2a8a1","actor_username":"contact@prodiving.asia","actor_via_sso":false,"log_type":"account","traits":{"provider":"email"}}	2026-03-29 05:49:18.814058+00	
00000000-0000-0000-0000-000000000000	1022ffa2-5c8c-4152-805b-2c659a99caab	{"action":"token_refreshed","actor_id":"780bcf0c-f47f-498e-a129-35583df2a8a1","actor_username":"contact@prodiving.asia","actor_via_sso":false,"log_type":"token"}	2026-03-29 06:48:05.240776+00	
00000000-0000-0000-0000-000000000000	5749ef2d-9734-456b-aabf-b746af7f7e47	{"action":"token_revoked","actor_id":"780bcf0c-f47f-498e-a129-35583df2a8a1","actor_username":"contact@prodiving.asia","actor_via_sso":false,"log_type":"token"}	2026-03-29 06:48:05.272123+00	
00000000-0000-0000-0000-000000000000	188b1315-83a0-4f12-ac7e-e25981702185	{"action":"token_refreshed","actor_id":"780bcf0c-f47f-498e-a129-35583df2a8a1","actor_username":"contact@prodiving.asia","actor_via_sso":false,"log_type":"token"}	2026-03-29 06:51:35.621577+00	
00000000-0000-0000-0000-000000000000	7de26da2-31d8-4833-9020-dcf38e90f121	{"action":"token_revoked","actor_id":"780bcf0c-f47f-498e-a129-35583df2a8a1","actor_username":"contact@prodiving.asia","actor_via_sso":false,"log_type":"token"}	2026-03-29 06:51:35.636678+00	
00000000-0000-0000-0000-000000000000	1143c226-1e06-426e-9edc-72a89ae4762e	{"action":"login","actor_id":"780bcf0c-f47f-498e-a129-35583df2a8a1","actor_username":"contact@prodiving.asia","actor_via_sso":false,"log_type":"account","traits":{"provider":"email"}}	2026-03-29 07:12:51.291952+00	
00000000-0000-0000-0000-000000000000	851aa43c-47fd-4aea-8bf1-cbc8fd0f299d	{"action":"token_refreshed","actor_id":"780bcf0c-f47f-498e-a129-35583df2a8a1","actor_username":"contact@prodiving.asia","actor_via_sso":false,"log_type":"token"}	2026-03-29 08:22:13.965208+00	
00000000-0000-0000-0000-000000000000	f09eb51a-a72e-457a-b30e-177e77369f62	{"action":"token_revoked","actor_id":"780bcf0c-f47f-498e-a129-35583df2a8a1","actor_username":"contact@prodiving.asia","actor_via_sso":false,"log_type":"token"}	2026-03-29 08:22:13.998016+00	
00000000-0000-0000-0000-000000000000	9b81be19-b5f5-464d-a41e-e34c42e90380	{"action":"token_refreshed","actor_id":"780bcf0c-f47f-498e-a129-35583df2a8a1","actor_username":"contact@prodiving.asia","actor_via_sso":false,"log_type":"token"}	2026-03-29 08:28:47.146284+00	
00000000-0000-0000-0000-000000000000	bdabb7af-07af-42a6-9e86-c460540e7e45	{"action":"token_revoked","actor_id":"780bcf0c-f47f-498e-a129-35583df2a8a1","actor_username":"contact@prodiving.asia","actor_via_sso":false,"log_type":"token"}	2026-03-29 08:28:47.177399+00	
00000000-0000-0000-0000-000000000000	1f54d13e-c857-4690-b453-1445058b8da7	{"action":"token_refreshed","actor_id":"780bcf0c-f47f-498e-a129-35583df2a8a1","actor_username":"contact@prodiving.asia","actor_via_sso":false,"log_type":"token"}	2026-03-29 09:27:06.568475+00	
00000000-0000-0000-0000-000000000000	5fffa6d6-ffb3-49b2-9e94-a70cbbe1ca6c	{"action":"token_revoked","actor_id":"780bcf0c-f47f-498e-a129-35583df2a8a1","actor_username":"contact@prodiving.asia","actor_via_sso":false,"log_type":"token"}	2026-03-29 09:27:06.596526+00	
00000000-0000-0000-0000-000000000000	776297d9-f52a-46d8-8f05-e5b1e6e9c4b1	{"action":"token_refreshed","actor_id":"780bcf0c-f47f-498e-a129-35583df2a8a1","actor_username":"contact@prodiving.asia","actor_via_sso":false,"log_type":"token"}	2026-03-29 10:08:47.84637+00	
00000000-0000-0000-0000-000000000000	6eb6572e-3a72-4ad4-8246-f8a649c42e3f	{"action":"token_revoked","actor_id":"780bcf0c-f47f-498e-a129-35583df2a8a1","actor_username":"contact@prodiving.asia","actor_via_sso":false,"log_type":"token"}	2026-03-29 10:08:47.885596+00	
00000000-0000-0000-0000-000000000000	4cac0683-b62c-432b-96df-24cc72b2f4fb	{"action":"token_refreshed","actor_id":"780bcf0c-f47f-498e-a129-35583df2a8a1","actor_username":"contact@prodiving.asia","actor_via_sso":false,"log_type":"token"}	2026-03-29 10:25:15.509066+00	
00000000-0000-0000-0000-000000000000	57134b25-9f4c-44ef-9d75-ebcdeb5f18e7	{"action":"token_revoked","actor_id":"780bcf0c-f47f-498e-a129-35583df2a8a1","actor_username":"contact@prodiving.asia","actor_via_sso":false,"log_type":"token"}	2026-03-29 10:25:15.532344+00	
00000000-0000-0000-0000-000000000000	c3ab96fa-e9b9-4b39-8009-d96e6c7ea6b1	{"action":"login","actor_id":"780bcf0c-f47f-498e-a129-35583df2a8a1","actor_username":"contact@prodiving.asia","actor_via_sso":false,"log_type":"account","traits":{"provider":"email"}}	2026-03-29 11:27:37.519102+00	
00000000-0000-0000-0000-000000000000	17477c9a-6196-48c6-a768-dbccca256bd5	{"action":"login","actor_id":"780bcf0c-f47f-498e-a129-35583df2a8a1","actor_username":"contact@prodiving.asia","actor_via_sso":false,"log_type":"account","traits":{"provider":"email"}}	2026-03-29 11:33:09.642944+00	
00000000-0000-0000-0000-000000000000	0323eaa8-2ddb-4fc8-b2a9-c5f48760661d	{"action":"token_refreshed","actor_id":"780bcf0c-f47f-498e-a129-35583df2a8a1","actor_username":"contact@prodiving.asia","actor_via_sso":false,"log_type":"token"}	2026-03-29 11:35:57.96772+00	
00000000-0000-0000-0000-000000000000	05d8827e-00f9-4947-a61c-77c66e52bfeb	{"action":"token_revoked","actor_id":"780bcf0c-f47f-498e-a129-35583df2a8a1","actor_username":"contact@prodiving.asia","actor_via_sso":false,"log_type":"token"}	2026-03-29 11:35:57.994713+00	
00000000-0000-0000-0000-000000000000	da6649d0-7f7f-4dd7-a016-7372b0aa76a7	{"action":"login","actor_id":"780bcf0c-f47f-498e-a129-35583df2a8a1","actor_username":"contact@prodiving.asia","actor_via_sso":false,"log_type":"account","traits":{"provider":"email"}}	2026-03-29 11:37:40.914638+00	
00000000-0000-0000-0000-000000000000	5c9ed816-28de-435b-b801-baadb962393a	{"action":"token_refreshed","actor_id":"780bcf0c-f47f-498e-a129-35583df2a8a1","actor_username":"contact@prodiving.asia","actor_via_sso":false,"log_type":"token"}	2026-03-29 11:39:50.773363+00	
00000000-0000-0000-0000-000000000000	42ae800d-4d11-4287-afab-76695552e0f2	{"action":"token_revoked","actor_id":"780bcf0c-f47f-498e-a129-35583df2a8a1","actor_username":"contact@prodiving.asia","actor_via_sso":false,"log_type":"token"}	2026-03-29 11:39:50.788376+00	
00000000-0000-0000-0000-000000000000	f8365278-5e40-4361-abb9-922a46c9f777	{"action":"token_refreshed","actor_id":"780bcf0c-f47f-498e-a129-35583df2a8a1","actor_username":"contact@prodiving.asia","actor_via_sso":false,"log_type":"token"}	2026-03-29 12:34:37.971586+00	
00000000-0000-0000-0000-000000000000	dccc5061-af19-4515-ba71-49a3277cbe50	{"action":"token_revoked","actor_id":"780bcf0c-f47f-498e-a129-35583df2a8a1","actor_username":"contact@prodiving.asia","actor_via_sso":false,"log_type":"token"}	2026-03-29 12:34:38.052545+00	
00000000-0000-0000-0000-000000000000	5b079090-dda6-44bf-b251-ef99f6e6951d	{"action":"token_refreshed","actor_id":"780bcf0c-f47f-498e-a129-35583df2a8a1","actor_username":"contact@prodiving.asia","actor_via_sso":false,"log_type":"token"}	2026-03-29 13:32:42.567022+00	
00000000-0000-0000-0000-000000000000	a51a4ddc-23b0-4f88-8a5b-98a5faff26b4	{"action":"token_revoked","actor_id":"780bcf0c-f47f-498e-a129-35583df2a8a1","actor_username":"contact@prodiving.asia","actor_via_sso":false,"log_type":"token"}	2026-03-29 13:32:42.590594+00	
00000000-0000-0000-0000-000000000000	0554fa4a-62c3-4498-9cfe-3a673040dc7b	{"action":"token_refreshed","actor_id":"780bcf0c-f47f-498e-a129-35583df2a8a1","actor_username":"contact@prodiving.asia","actor_via_sso":false,"log_type":"token"}	2026-03-29 13:53:39.308059+00	
00000000-0000-0000-0000-000000000000	0941d4bd-ff85-4209-b257-b13b721da840	{"action":"token_revoked","actor_id":"780bcf0c-f47f-498e-a129-35583df2a8a1","actor_username":"contact@prodiving.asia","actor_via_sso":false,"log_type":"token"}	2026-03-29 13:53:39.903084+00	
00000000-0000-0000-0000-000000000000	e66a490a-ce81-4721-b1b7-2482fcaa4292	{"action":"token_refreshed","actor_id":"780bcf0c-f47f-498e-a129-35583df2a8a1","actor_username":"contact@prodiving.asia","actor_via_sso":false,"log_type":"token"}	2026-03-29 14:33:51.78854+00	
00000000-0000-0000-0000-000000000000	d99acdff-f26c-4222-9177-b0aab71d20e0	{"action":"token_revoked","actor_id":"780bcf0c-f47f-498e-a129-35583df2a8a1","actor_username":"contact@prodiving.asia","actor_via_sso":false,"log_type":"token"}	2026-03-29 14:33:51.811443+00	
00000000-0000-0000-0000-000000000000	13c53e82-1065-4c35-9888-63c7de5379d2	{"action":"token_refreshed","actor_id":"780bcf0c-f47f-498e-a129-35583df2a8a1","actor_username":"contact@prodiving.asia","actor_via_sso":false,"log_type":"token"}	2026-03-29 15:32:01.066586+00	
00000000-0000-0000-0000-000000000000	d7d1c479-9799-44b9-8cc1-867cffeb5249	{"action":"token_revoked","actor_id":"780bcf0c-f47f-498e-a129-35583df2a8a1","actor_username":"contact@prodiving.asia","actor_via_sso":false,"log_type":"token"}	2026-03-29 15:32:01.085666+00	
00000000-0000-0000-0000-000000000000	3452e478-a39d-4fbb-a991-62035335d6f7	{"action":"token_refreshed","actor_id":"780bcf0c-f47f-498e-a129-35583df2a8a1","actor_username":"contact@prodiving.asia","actor_via_sso":false,"log_type":"token"}	2026-03-29 16:30:24.994362+00	
00000000-0000-0000-0000-000000000000	55fe9103-0c18-4d99-b033-7d73aee12d90	{"action":"token_revoked","actor_id":"780bcf0c-f47f-498e-a129-35583df2a8a1","actor_username":"contact@prodiving.asia","actor_via_sso":false,"log_type":"token"}	2026-03-29 16:30:25.02057+00	
00000000-0000-0000-0000-000000000000	c26ab0f3-95b4-4bb7-afa1-7afbb9c6873a	{"action":"token_refreshed","actor_id":"780bcf0c-f47f-498e-a129-35583df2a8a1","actor_username":"contact@prodiving.asia","actor_via_sso":false,"log_type":"token"}	2026-03-29 17:29:05.786607+00	
00000000-0000-0000-0000-000000000000	6335b090-d594-45dd-847b-bee525e66ab4	{"action":"token_revoked","actor_id":"780bcf0c-f47f-498e-a129-35583df2a8a1","actor_username":"contact@prodiving.asia","actor_via_sso":false,"log_type":"token"}	2026-03-29 17:29:05.810113+00	
00000000-0000-0000-0000-000000000000	dde71f74-b984-4dc1-baa9-33cff6fb3c00	{"action":"token_refreshed","actor_id":"780bcf0c-f47f-498e-a129-35583df2a8a1","actor_username":"contact@prodiving.asia","actor_via_sso":false,"log_type":"token"}	2026-03-29 18:27:35.847631+00	
00000000-0000-0000-0000-000000000000	15d20c39-1fbd-4916-b766-f9f7037d5747	{"action":"token_revoked","actor_id":"780bcf0c-f47f-498e-a129-35583df2a8a1","actor_username":"contact@prodiving.asia","actor_via_sso":false,"log_type":"token"}	2026-03-29 18:27:35.864826+00	
00000000-0000-0000-0000-000000000000	8d1cd19a-c769-46ce-ba85-afecf349111d	{"action":"token_refreshed","actor_id":"780bcf0c-f47f-498e-a129-35583df2a8a1","actor_username":"contact@prodiving.asia","actor_via_sso":false,"log_type":"token"}	2026-03-29 19:34:07.823817+00	
00000000-0000-0000-0000-000000000000	7692f636-2822-4b50-b35e-329aa51365ca	{"action":"token_revoked","actor_id":"780bcf0c-f47f-498e-a129-35583df2a8a1","actor_username":"contact@prodiving.asia","actor_via_sso":false,"log_type":"token"}	2026-03-29 19:34:07.847002+00	
00000000-0000-0000-0000-000000000000	7227842f-24ac-459a-9c85-52780aead313	{"action":"token_refreshed","actor_id":"780bcf0c-f47f-498e-a129-35583df2a8a1","actor_username":"contact@prodiving.asia","actor_via_sso":false,"log_type":"token"}	2026-03-29 20:04:38.937311+00	
00000000-0000-0000-0000-000000000000	310e24da-146b-4385-9095-45928a57d6af	{"action":"token_revoked","actor_id":"780bcf0c-f47f-498e-a129-35583df2a8a1","actor_username":"contact@prodiving.asia","actor_via_sso":false,"log_type":"token"}	2026-03-29 20:04:38.957612+00	
00000000-0000-0000-0000-000000000000	ceecb14a-bc05-4323-8292-77c227272838	{"action":"token_refreshed","actor_id":"780bcf0c-f47f-498e-a129-35583df2a8a1","actor_username":"contact@prodiving.asia","actor_via_sso":false,"log_type":"token"}	2026-03-29 20:34:29.060231+00	
00000000-0000-0000-0000-000000000000	97c037e3-535e-466c-8039-400ce5ad2b92	{"action":"token_revoked","actor_id":"780bcf0c-f47f-498e-a129-35583df2a8a1","actor_username":"contact@prodiving.asia","actor_via_sso":false,"log_type":"token"}	2026-03-29 20:34:29.08141+00	
00000000-0000-0000-0000-000000000000	b33a6b80-00ce-4d73-84a9-e6d4ba43f718	{"action":"token_refreshed","actor_id":"780bcf0c-f47f-498e-a129-35583df2a8a1","actor_username":"contact@prodiving.asia","actor_via_sso":false,"log_type":"token"}	2026-03-29 21:03:42.710912+00	
00000000-0000-0000-0000-000000000000	9e128381-d411-45d6-b367-db604ed912fe	{"action":"token_revoked","actor_id":"780bcf0c-f47f-498e-a129-35583df2a8a1","actor_username":"contact@prodiving.asia","actor_via_sso":false,"log_type":"token"}	2026-03-29 21:03:42.731672+00	
00000000-0000-0000-0000-000000000000	e17e690d-ceaf-4e1a-8c8b-2bda9fad87a5	{"action":"token_refreshed","actor_id":"780bcf0c-f47f-498e-a129-35583df2a8a1","actor_username":"contact@prodiving.asia","actor_via_sso":false,"log_type":"token"}	2026-03-29 21:32:35.304749+00	
00000000-0000-0000-0000-000000000000	46df447a-e5b2-486b-8ce6-60b4274ee691	{"action":"token_revoked","actor_id":"780bcf0c-f47f-498e-a129-35583df2a8a1","actor_username":"contact@prodiving.asia","actor_via_sso":false,"log_type":"token"}	2026-03-29 21:32:35.333481+00	
00000000-0000-0000-0000-000000000000	4d038ce5-7cad-4adb-b857-1891c31679e2	{"action":"token_refreshed","actor_id":"780bcf0c-f47f-498e-a129-35583df2a8a1","actor_username":"contact@prodiving.asia","actor_via_sso":false,"log_type":"token"}	2026-03-29 22:02:38.401154+00	
00000000-0000-0000-0000-000000000000	8175528b-f880-43a5-b937-258c4e4b1248	{"action":"token_revoked","actor_id":"780bcf0c-f47f-498e-a129-35583df2a8a1","actor_username":"contact@prodiving.asia","actor_via_sso":false,"log_type":"token"}	2026-03-29 22:02:38.425012+00	
00000000-0000-0000-0000-000000000000	d801dbdb-abc4-4568-b131-a70ceb7a373c	{"action":"token_refreshed","actor_id":"780bcf0c-f47f-498e-a129-35583df2a8a1","actor_username":"contact@prodiving.asia","actor_via_sso":false,"log_type":"token"}	2026-03-30 03:49:28.324149+00	
00000000-0000-0000-0000-000000000000	93c21e63-d3fe-4745-bee1-301b95a60863	{"action":"token_revoked","actor_id":"780bcf0c-f47f-498e-a129-35583df2a8a1","actor_username":"contact@prodiving.asia","actor_via_sso":false,"log_type":"token"}	2026-03-30 03:49:28.347549+00	
00000000-0000-0000-0000-000000000000	f6e0f782-efd6-42df-870b-3b5806abab3b	{"action":"token_refreshed","actor_id":"780bcf0c-f47f-498e-a129-35583df2a8a1","actor_username":"contact@prodiving.asia","actor_via_sso":false,"log_type":"token"}	2026-03-30 04:56:48.27895+00	
00000000-0000-0000-0000-000000000000	6ce20139-6edd-466b-b237-0115db2b945d	{"action":"token_revoked","actor_id":"780bcf0c-f47f-498e-a129-35583df2a8a1","actor_username":"contact@prodiving.asia","actor_via_sso":false,"log_type":"token"}	2026-03-30 04:56:48.299275+00	
00000000-0000-0000-0000-000000000000	b46767b7-806f-4872-a183-4e54c794813b	{"action":"token_refreshed","actor_id":"780bcf0c-f47f-498e-a129-35583df2a8a1","actor_username":"contact@prodiving.asia","actor_via_sso":false,"log_type":"token"}	2026-03-30 05:06:55.289112+00	
00000000-0000-0000-0000-000000000000	322801e3-27b8-4371-a4db-b095ce9dbd89	{"action":"token_revoked","actor_id":"780bcf0c-f47f-498e-a129-35583df2a8a1","actor_username":"contact@prodiving.asia","actor_via_sso":false,"log_type":"token"}	2026-03-30 05:06:55.313411+00	
00000000-0000-0000-0000-000000000000	d676d7f5-3a3d-4942-a5e6-b2618c624969	{"action":"token_refreshed","actor_id":"780bcf0c-f47f-498e-a129-35583df2a8a1","actor_username":"contact@prodiving.asia","actor_via_sso":false,"log_type":"token"}	2026-03-30 06:11:10.212374+00	
00000000-0000-0000-0000-000000000000	5b2330b1-b36a-42eb-b71f-b5bc1518ec9f	{"action":"token_revoked","actor_id":"780bcf0c-f47f-498e-a129-35583df2a8a1","actor_username":"contact@prodiving.asia","actor_via_sso":false,"log_type":"token"}	2026-03-30 06:11:10.240648+00	
00000000-0000-0000-0000-000000000000	1cf0cb12-f61c-4587-979a-4701bd17f343	{"action":"token_refreshed","actor_id":"780bcf0c-f47f-498e-a129-35583df2a8a1","actor_username":"contact@prodiving.asia","actor_via_sso":false,"log_type":"token"}	2026-03-30 07:01:05.27009+00	
00000000-0000-0000-0000-000000000000	0f53dfb7-706a-427d-b1dd-bc7b2d895548	{"action":"token_revoked","actor_id":"780bcf0c-f47f-498e-a129-35583df2a8a1","actor_username":"contact@prodiving.asia","actor_via_sso":false,"log_type":"token"}	2026-03-30 07:01:05.292457+00	
00000000-0000-0000-0000-000000000000	0a5f127e-e3c9-4da2-8a2e-c4b7c61ebdf7	{"action":"token_refreshed","actor_id":"780bcf0c-f47f-498e-a129-35583df2a8a1","actor_username":"contact@prodiving.asia","actor_via_sso":false,"log_type":"token"}	2026-03-30 07:09:31.413562+00	
00000000-0000-0000-0000-000000000000	c29552d1-668b-47b5-a90d-955c9355b716	{"action":"token_revoked","actor_id":"780bcf0c-f47f-498e-a129-35583df2a8a1","actor_username":"contact@prodiving.asia","actor_via_sso":false,"log_type":"token"}	2026-03-30 07:09:31.451477+00	
00000000-0000-0000-0000-000000000000	5589453b-27cf-49aa-867c-613a9d5ee0b0	{"action":"token_refreshed","actor_id":"780bcf0c-f47f-498e-a129-35583df2a8a1","actor_username":"contact@prodiving.asia","actor_via_sso":false,"log_type":"token"}	2026-03-30 07:59:41.920009+00	
00000000-0000-0000-0000-000000000000	7b27676f-d19b-4082-899a-efe79d97610d	{"action":"token_revoked","actor_id":"780bcf0c-f47f-498e-a129-35583df2a8a1","actor_username":"contact@prodiving.asia","actor_via_sso":false,"log_type":"token"}	2026-03-30 07:59:41.944413+00	
00000000-0000-0000-0000-000000000000	505a97b0-93b3-4a2c-91c2-6f7850647a4d	{"action":"token_refreshed","actor_id":"780bcf0c-f47f-498e-a129-35583df2a8a1","actor_username":"contact@prodiving.asia","actor_via_sso":false,"log_type":"token"}	2026-03-30 08:07:56.104511+00	
00000000-0000-0000-0000-000000000000	1d819f2c-7bd8-4195-9d3a-261ad3ce17bc	{"action":"token_revoked","actor_id":"780bcf0c-f47f-498e-a129-35583df2a8a1","actor_username":"contact@prodiving.asia","actor_via_sso":false,"log_type":"token"}	2026-03-30 08:07:56.121529+00	
00000000-0000-0000-0000-000000000000	706daeaa-8a35-4a60-8bd9-7d0e018e922d	{"action":"token_refreshed","actor_id":"780bcf0c-f47f-498e-a129-35583df2a8a1","actor_username":"contact@prodiving.asia","actor_via_sso":false,"log_type":"token"}	2026-03-30 10:03:43.555343+00	
00000000-0000-0000-0000-000000000000	9f53f8aa-b55a-4ddb-84cd-c06a58f82e71	{"action":"token_revoked","actor_id":"780bcf0c-f47f-498e-a129-35583df2a8a1","actor_username":"contact@prodiving.asia","actor_via_sso":false,"log_type":"token"}	2026-03-30 10:03:43.583152+00	
00000000-0000-0000-0000-000000000000	f6bf7765-cfd3-481a-b4bb-4bdc069e1994	{"action":"token_refreshed","actor_id":"780bcf0c-f47f-498e-a129-35583df2a8a1","actor_username":"contact@prodiving.asia","actor_via_sso":false,"log_type":"token"}	2026-03-30 11:02:31.471927+00	
00000000-0000-0000-0000-000000000000	c16042b3-43a9-4bb1-ab50-5ab033c404e5	{"action":"token_revoked","actor_id":"780bcf0c-f47f-498e-a129-35583df2a8a1","actor_username":"contact@prodiving.asia","actor_via_sso":false,"log_type":"token"}	2026-03-30 11:02:31.568684+00	
00000000-0000-0000-0000-000000000000	f348029c-9d87-4ac6-839c-140b450d6bd2	{"action":"token_refreshed","actor_id":"780bcf0c-f47f-498e-a129-35583df2a8a1","actor_username":"contact@prodiving.asia","actor_via_sso":false,"log_type":"token"}	2026-03-30 12:01:04.453553+00	
00000000-0000-0000-0000-000000000000	5515ce97-5b3d-4b54-abb6-fa1bcdc62c68	{"action":"token_revoked","actor_id":"780bcf0c-f47f-498e-a129-35583df2a8a1","actor_username":"contact@prodiving.asia","actor_via_sso":false,"log_type":"token"}	2026-03-30 12:01:04.484371+00	
00000000-0000-0000-0000-000000000000	2d4b504c-7f3b-44ea-b00a-b473834b24b3	{"action":"token_refreshed","actor_id":"780bcf0c-f47f-498e-a129-35583df2a8a1","actor_username":"contact@prodiving.asia","actor_via_sso":false,"log_type":"token"}	2026-03-30 12:55:42.526723+00	
00000000-0000-0000-0000-000000000000	686b5a07-fb73-4582-9f62-71540ed530a8	{"action":"token_revoked","actor_id":"780bcf0c-f47f-498e-a129-35583df2a8a1","actor_username":"contact@prodiving.asia","actor_via_sso":false,"log_type":"token"}	2026-03-30 12:55:42.555106+00	
00000000-0000-0000-0000-000000000000	f363acff-2db3-407a-be7f-d86c8def0446	{"action":"token_refreshed","actor_id":"780bcf0c-f47f-498e-a129-35583df2a8a1","actor_username":"contact@prodiving.asia","actor_via_sso":false,"log_type":"token"}	2026-03-30 13:05:19.997658+00	
00000000-0000-0000-0000-000000000000	f263d5f2-57cb-4e69-bfac-9c4c85464c84	{"action":"token_revoked","actor_id":"780bcf0c-f47f-498e-a129-35583df2a8a1","actor_username":"contact@prodiving.asia","actor_via_sso":false,"log_type":"token"}	2026-03-30 13:05:20.014624+00	
00000000-0000-0000-0000-000000000000	50b87b9f-a481-4535-b09b-cb1fb422d942	{"action":"login","actor_id":"780bcf0c-f47f-498e-a129-35583df2a8a1","actor_username":"contact@prodiving.asia","actor_via_sso":false,"log_type":"account","traits":{"provider":"email"}}	2026-03-30 13:37:36.629087+00	
00000000-0000-0000-0000-000000000000	05160b64-2af8-41c2-b0d5-fc65dc66d8e1	{"action":"token_refreshed","actor_id":"780bcf0c-f47f-498e-a129-35583df2a8a1","actor_username":"contact@prodiving.asia","actor_via_sso":false,"log_type":"token"}	2026-03-30 14:05:16.111623+00	
00000000-0000-0000-0000-000000000000	ad43ff5f-82bc-4afc-9d84-a71b471e6c45	{"action":"token_revoked","actor_id":"780bcf0c-f47f-498e-a129-35583df2a8a1","actor_username":"contact@prodiving.asia","actor_via_sso":false,"log_type":"token"}	2026-03-30 14:05:16.132728+00	
00000000-0000-0000-0000-000000000000	473c59cb-0922-408f-ba25-a5dd30880288	{"action":"token_refreshed","actor_id":"780bcf0c-f47f-498e-a129-35583df2a8a1","actor_username":"contact@prodiving.asia","actor_via_sso":false,"log_type":"token"}	2026-03-30 14:20:01.480594+00	
00000000-0000-0000-0000-000000000000	557ff17b-e902-4bfc-8187-cacbc6b6239b	{"action":"token_revoked","actor_id":"780bcf0c-f47f-498e-a129-35583df2a8a1","actor_username":"contact@prodiving.asia","actor_via_sso":false,"log_type":"token"}	2026-03-30 14:20:01.506086+00	
00000000-0000-0000-0000-000000000000	9961143d-8559-404e-a42b-0b70a6a5f115	{"action":"token_refreshed","actor_id":"780bcf0c-f47f-498e-a129-35583df2a8a1","actor_username":"contact@prodiving.asia","actor_via_sso":false,"log_type":"token"}	2026-03-30 14:34:15.647838+00	
00000000-0000-0000-0000-000000000000	0d0f9224-65e1-44bf-ab28-b9e6d0b454cc	{"action":"token_revoked","actor_id":"780bcf0c-f47f-498e-a129-35583df2a8a1","actor_username":"contact@prodiving.asia","actor_via_sso":false,"log_type":"token"}	2026-03-30 14:34:15.669685+00	
00000000-0000-0000-0000-000000000000	22bfefb1-93e5-4343-819a-1c0001a7bef8	{"action":"token_refreshed","actor_id":"780bcf0c-f47f-498e-a129-35583df2a8a1","actor_username":"contact@prodiving.asia","actor_via_sso":false,"log_type":"token"}	2026-03-30 15:03:57.781733+00	
00000000-0000-0000-0000-000000000000	a10163af-8e68-4aa8-b18d-13fc9cfe2ec7	{"action":"token_revoked","actor_id":"780bcf0c-f47f-498e-a129-35583df2a8a1","actor_username":"contact@prodiving.asia","actor_via_sso":false,"log_type":"token"}	2026-03-30 15:03:57.807976+00	
00000000-0000-0000-0000-000000000000	e5e47ebc-9b47-46d3-abe7-41f4fc9d3cd7	{"action":"token_refreshed","actor_id":"780bcf0c-f47f-498e-a129-35583df2a8a1","actor_username":"contact@prodiving.asia","actor_via_sso":false,"log_type":"token"}	2026-03-30 15:32:56.911554+00	
00000000-0000-0000-0000-000000000000	1b2c1007-50f2-4ed7-a30e-56cd20378939	{"action":"token_revoked","actor_id":"780bcf0c-f47f-498e-a129-35583df2a8a1","actor_username":"contact@prodiving.asia","actor_via_sso":false,"log_type":"token"}	2026-03-30 15:32:57.150866+00	
00000000-0000-0000-0000-000000000000	5f444877-6abd-49ee-b11e-44512c692d87	{"action":"token_refreshed","actor_id":"780bcf0c-f47f-498e-a129-35583df2a8a1","actor_username":"contact@prodiving.asia","actor_via_sso":false,"log_type":"token"}	2026-03-30 16:12:53.482426+00	
00000000-0000-0000-0000-000000000000	b1ca1408-9001-44dd-8453-90c54f9adcdf	{"action":"token_revoked","actor_id":"780bcf0c-f47f-498e-a129-35583df2a8a1","actor_username":"contact@prodiving.asia","actor_via_sso":false,"log_type":"token"}	2026-03-30 16:12:53.558809+00	
00000000-0000-0000-0000-000000000000	e84f00d6-acf9-4d93-8dfc-fd42dab6c54f	{"action":"token_refreshed","actor_id":"780bcf0c-f47f-498e-a129-35583df2a8a1","actor_username":"contact@prodiving.asia","actor_via_sso":false,"log_type":"token"}	2026-03-30 17:16:00.367069+00	
00000000-0000-0000-0000-000000000000	d78fa62d-63ef-4698-b444-e16320ccef16	{"action":"token_revoked","actor_id":"780bcf0c-f47f-498e-a129-35583df2a8a1","actor_username":"contact@prodiving.asia","actor_via_sso":false,"log_type":"token"}	2026-03-30 17:16:00.402839+00	
00000000-0000-0000-0000-000000000000	0a6b2ba9-7236-4a0b-9aa1-25c883b28a0e	{"action":"token_refreshed","actor_id":"780bcf0c-f47f-498e-a129-35583df2a8a1","actor_username":"contact@prodiving.asia","actor_via_sso":false,"log_type":"token"}	2026-03-30 19:44:17.268598+00	
00000000-0000-0000-0000-000000000000	78c4ed5a-90da-4580-a99a-c2b4f9bf8dd5	{"action":"token_revoked","actor_id":"780bcf0c-f47f-498e-a129-35583df2a8a1","actor_username":"contact@prodiving.asia","actor_via_sso":false,"log_type":"token"}	2026-03-30 19:44:17.292661+00	
00000000-0000-0000-0000-000000000000	d95cbfde-4d9d-433b-818d-1382989c8631	{"action":"token_refreshed","actor_id":"780bcf0c-f47f-498e-a129-35583df2a8a1","actor_username":"contact@prodiving.asia","actor_via_sso":false,"log_type":"token"}	2026-03-30 20:44:10.643381+00	
00000000-0000-0000-0000-000000000000	81c4e564-329d-4363-96d3-50b078cd3cb3	{"action":"token_revoked","actor_id":"780bcf0c-f47f-498e-a129-35583df2a8a1","actor_username":"contact@prodiving.asia","actor_via_sso":false,"log_type":"token"}	2026-03-30 20:44:10.662567+00	
00000000-0000-0000-0000-000000000000	f96d543f-98fd-4013-9053-32dc6edb2e22	{"action":"token_refreshed","actor_id":"780bcf0c-f47f-498e-a129-35583df2a8a1","actor_username":"contact@prodiving.asia","actor_via_sso":false,"log_type":"token"}	2026-03-30 21:45:24.155765+00	
00000000-0000-0000-0000-000000000000	d768b316-245a-4d93-81a8-e63bdd7269f7	{"action":"token_revoked","actor_id":"780bcf0c-f47f-498e-a129-35583df2a8a1","actor_username":"contact@prodiving.asia","actor_via_sso":false,"log_type":"token"}	2026-03-30 21:45:24.172215+00	
00000000-0000-0000-0000-000000000000	8764fba8-1756-4b7f-8302-2652c9f0760d	{"action":"token_refreshed","actor_id":"780bcf0c-f47f-498e-a129-35583df2a8a1","actor_username":"contact@prodiving.asia","actor_via_sso":false,"log_type":"token"}	2026-03-30 22:46:28.396113+00	
00000000-0000-0000-0000-000000000000	b3ff35c5-f530-4e82-a78c-213e82d88a2f	{"action":"token_revoked","actor_id":"780bcf0c-f47f-498e-a129-35583df2a8a1","actor_username":"contact@prodiving.asia","actor_via_sso":false,"log_type":"token"}	2026-03-30 22:46:28.413963+00	
00000000-0000-0000-0000-000000000000	202b2722-2125-4c51-91a4-68d8e0daf910	{"action":"token_refreshed","actor_id":"780bcf0c-f47f-498e-a129-35583df2a8a1","actor_username":"contact@prodiving.asia","actor_via_sso":false,"log_type":"token"}	2026-03-30 23:47:38.659153+00	
00000000-0000-0000-0000-000000000000	64f1aab0-2fea-4e32-a640-8213691ad6a7	{"action":"token_revoked","actor_id":"780bcf0c-f47f-498e-a129-35583df2a8a1","actor_username":"contact@prodiving.asia","actor_via_sso":false,"log_type":"token"}	2026-03-30 23:47:38.679578+00	
00000000-0000-0000-0000-000000000000	460c2c6b-ab11-4a93-9264-4652080b7dbe	{"action":"token_refreshed","actor_id":"780bcf0c-f47f-498e-a129-35583df2a8a1","actor_username":"contact@prodiving.asia","actor_via_sso":false,"log_type":"token"}	2026-03-31 00:48:40.891996+00	
00000000-0000-0000-0000-000000000000	fec7fd68-3616-45c7-92c9-59ffbe06c25c	{"action":"token_revoked","actor_id":"780bcf0c-f47f-498e-a129-35583df2a8a1","actor_username":"contact@prodiving.asia","actor_via_sso":false,"log_type":"token"}	2026-03-31 00:48:40.9115+00	
00000000-0000-0000-0000-000000000000	5074e2cb-5fbb-47be-94e6-7d15fa0ebe28	{"action":"token_refreshed","actor_id":"780bcf0c-f47f-498e-a129-35583df2a8a1","actor_username":"contact@prodiving.asia","actor_via_sso":false,"log_type":"token"}	2026-03-31 01:49:48.446203+00	
00000000-0000-0000-0000-000000000000	8f000dfa-2c28-4f85-82a8-2c69f0e77ab4	{"action":"token_revoked","actor_id":"780bcf0c-f47f-498e-a129-35583df2a8a1","actor_username":"contact@prodiving.asia","actor_via_sso":false,"log_type":"token"}	2026-03-31 01:49:48.463121+00	
00000000-0000-0000-0000-000000000000	d1c000b4-e0e3-44fa-9665-b36bb63ff425	{"action":"token_refreshed","actor_id":"780bcf0c-f47f-498e-a129-35583df2a8a1","actor_username":"contact@prodiving.asia","actor_via_sso":false,"log_type":"token"}	2026-03-31 02:50:59.845193+00	
00000000-0000-0000-0000-000000000000	c22a7385-54c0-43bf-8b01-dfbcd7332528	{"action":"token_revoked","actor_id":"780bcf0c-f47f-498e-a129-35583df2a8a1","actor_username":"contact@prodiving.asia","actor_via_sso":false,"log_type":"token"}	2026-03-31 02:50:59.862511+00	
00000000-0000-0000-0000-000000000000	b8997640-4f2d-4549-b8bd-217ba084d4ec	{"action":"token_refreshed","actor_id":"780bcf0c-f47f-498e-a129-35583df2a8a1","actor_username":"contact@prodiving.asia","actor_via_sso":false,"log_type":"token"}	2026-03-31 03:52:02.813982+00	
00000000-0000-0000-0000-000000000000	902817a6-7360-4e98-9b4f-5a7193163362	{"action":"token_revoked","actor_id":"780bcf0c-f47f-498e-a129-35583df2a8a1","actor_username":"contact@prodiving.asia","actor_via_sso":false,"log_type":"token"}	2026-03-31 03:52:02.828416+00	
00000000-0000-0000-0000-000000000000	c720f74e-646a-4641-b914-068b7342e9c4	{"action":"token_refreshed","actor_id":"780bcf0c-f47f-498e-a129-35583df2a8a1","actor_username":"contact@prodiving.asia","actor_via_sso":false,"log_type":"token"}	2026-03-31 04:53:08.517246+00	
00000000-0000-0000-0000-000000000000	ec2116d4-4854-4b6a-a28c-189f09b64771	{"action":"token_revoked","actor_id":"780bcf0c-f47f-498e-a129-35583df2a8a1","actor_username":"contact@prodiving.asia","actor_via_sso":false,"log_type":"token"}	2026-03-31 04:53:08.538025+00	
00000000-0000-0000-0000-000000000000	fbe9f203-9c09-426f-953f-05f29f688cd1	{"action":"token_refreshed","actor_id":"780bcf0c-f47f-498e-a129-35583df2a8a1","actor_username":"contact@prodiving.asia","actor_via_sso":false,"log_type":"token"}	2026-03-31 05:54:17.515077+00	
00000000-0000-0000-0000-000000000000	302c206a-7879-42e1-a58a-3ab92ecc7df2	{"action":"token_revoked","actor_id":"780bcf0c-f47f-498e-a129-35583df2a8a1","actor_username":"contact@prodiving.asia","actor_via_sso":false,"log_type":"token"}	2026-03-31 05:54:17.637188+00	
00000000-0000-0000-0000-000000000000	d1487eac-bd9e-432a-bd12-d25fd2d02cec	{"action":"token_refreshed","actor_id":"780bcf0c-f47f-498e-a129-35583df2a8a1","actor_username":"contact@prodiving.asia","actor_via_sso":false,"log_type":"token"}	2026-03-31 06:55:22.174795+00	
00000000-0000-0000-0000-000000000000	33ee139c-f7ed-4a63-b206-92c68ff8d9e3	{"action":"token_revoked","actor_id":"780bcf0c-f47f-498e-a129-35583df2a8a1","actor_username":"contact@prodiving.asia","actor_via_sso":false,"log_type":"token"}	2026-03-31 06:55:22.194623+00	
00000000-0000-0000-0000-000000000000	e5a1960c-8b35-4372-8282-d360d8319f10	{"action":"token_refreshed","actor_id":"780bcf0c-f47f-498e-a129-35583df2a8a1","actor_username":"contact@prodiving.asia","actor_via_sso":false,"log_type":"token"}	2026-03-31 07:56:30.226477+00	
00000000-0000-0000-0000-000000000000	e980673d-0d28-4973-901d-52b165614dfa	{"action":"token_revoked","actor_id":"780bcf0c-f47f-498e-a129-35583df2a8a1","actor_username":"contact@prodiving.asia","actor_via_sso":false,"log_type":"token"}	2026-03-31 07:56:30.246898+00	
00000000-0000-0000-0000-000000000000	2504a866-b3af-4b7c-a590-a2122e3ddf70	{"action":"token_refreshed","actor_id":"780bcf0c-f47f-498e-a129-35583df2a8a1","actor_username":"contact@prodiving.asia","actor_via_sso":false,"log_type":"token"}	2026-03-31 08:57:34.369951+00	
00000000-0000-0000-0000-000000000000	5be97e68-68ce-4e7d-b3c2-6b7f41b35b93	{"action":"token_revoked","actor_id":"780bcf0c-f47f-498e-a129-35583df2a8a1","actor_username":"contact@prodiving.asia","actor_via_sso":false,"log_type":"token"}	2026-03-31 08:57:34.384401+00	
00000000-0000-0000-0000-000000000000	b45574f2-133d-4c25-8d2f-a02510371a8b	{"action":"token_refreshed","actor_id":"780bcf0c-f47f-498e-a129-35583df2a8a1","actor_username":"contact@prodiving.asia","actor_via_sso":false,"log_type":"token"}	2026-03-31 09:58:43.24603+00	
00000000-0000-0000-0000-000000000000	39f936b6-a589-4c41-8f47-d28a467d3ffb	{"action":"token_revoked","actor_id":"780bcf0c-f47f-498e-a129-35583df2a8a1","actor_username":"contact@prodiving.asia","actor_via_sso":false,"log_type":"token"}	2026-03-31 09:58:43.273748+00	
00000000-0000-0000-0000-000000000000	63ff867f-9ebf-4220-97c2-aa5202b8715e	{"action":"token_refreshed","actor_id":"780bcf0c-f47f-498e-a129-35583df2a8a1","actor_username":"contact@prodiving.asia","actor_via_sso":false,"log_type":"token"}	2026-03-31 10:59:49.79484+00	
00000000-0000-0000-0000-000000000000	b95dae39-8008-4662-9104-286dac49a50a	{"action":"token_revoked","actor_id":"780bcf0c-f47f-498e-a129-35583df2a8a1","actor_username":"contact@prodiving.asia","actor_via_sso":false,"log_type":"token"}	2026-03-31 10:59:49.82226+00	
00000000-0000-0000-0000-000000000000	271b5c5a-abe0-4aff-816d-60a632d652b7	{"action":"token_refreshed","actor_id":"780bcf0c-f47f-498e-a129-35583df2a8a1","actor_username":"contact@prodiving.asia","actor_via_sso":false,"log_type":"token"}	2026-03-31 12:00:58.152205+00	
00000000-0000-0000-0000-000000000000	bed2f04f-98dd-4766-a446-c2eb0f11dc1c	{"action":"token_revoked","actor_id":"780bcf0c-f47f-498e-a129-35583df2a8a1","actor_username":"contact@prodiving.asia","actor_via_sso":false,"log_type":"token"}	2026-03-31 12:00:58.170709+00	
00000000-0000-0000-0000-000000000000	9f86128c-b404-4498-8fe1-94fe57e347cc	{"action":"token_refreshed","actor_id":"780bcf0c-f47f-498e-a129-35583df2a8a1","actor_username":"contact@prodiving.asia","actor_via_sso":false,"log_type":"token"}	2026-03-31 13:44:12.574493+00	
00000000-0000-0000-0000-000000000000	81acf7be-ad19-4c1e-8d28-bdd5e13bfa59	{"action":"token_revoked","actor_id":"780bcf0c-f47f-498e-a129-35583df2a8a1","actor_username":"contact@prodiving.asia","actor_via_sso":false,"log_type":"token"}	2026-03-31 13:44:12.589604+00	
00000000-0000-0000-0000-000000000000	49bca848-9ea8-44df-9ce1-6d4a667fdc85	{"action":"token_refreshed","actor_id":"780bcf0c-f47f-498e-a129-35583df2a8a1","actor_username":"contact@prodiving.asia","actor_via_sso":false,"log_type":"token"}	2026-03-31 14:42:42.988127+00	
00000000-0000-0000-0000-000000000000	071bf910-83ba-4d1b-9dcf-1230127b1b15	{"action":"token_revoked","actor_id":"780bcf0c-f47f-498e-a129-35583df2a8a1","actor_username":"contact@prodiving.asia","actor_via_sso":false,"log_type":"token"}	2026-03-31 14:42:43.019126+00	
00000000-0000-0000-0000-000000000000	074fb27c-d969-4244-8f58-7bdd5e3f723f	{"action":"token_refreshed","actor_id":"780bcf0c-f47f-498e-a129-35583df2a8a1","actor_username":"contact@prodiving.asia","actor_via_sso":false,"log_type":"token"}	2026-03-31 15:06:44.524559+00	
00000000-0000-0000-0000-000000000000	e4098dd1-1655-4aa7-9486-3e1f52e0dd71	{"action":"token_revoked","actor_id":"780bcf0c-f47f-498e-a129-35583df2a8a1","actor_username":"contact@prodiving.asia","actor_via_sso":false,"log_type":"token"}	2026-03-31 15:06:44.555599+00	
00000000-0000-0000-0000-000000000000	9519cf00-a8ca-4d08-87e4-e384af44be1d	{"action":"token_refreshed","actor_id":"780bcf0c-f47f-498e-a129-35583df2a8a1","actor_username":"contact@prodiving.asia","actor_via_sso":false,"log_type":"token"}	2026-03-31 15:41:19.357844+00	
00000000-0000-0000-0000-000000000000	ca45155f-d1f3-4f0b-a248-a5471b45b612	{"action":"token_revoked","actor_id":"780bcf0c-f47f-498e-a129-35583df2a8a1","actor_username":"contact@prodiving.asia","actor_via_sso":false,"log_type":"token"}	2026-03-31 15:41:19.38468+00	
00000000-0000-0000-0000-000000000000	94d51044-6c9a-478b-9af6-d4bfb83c2179	{"action":"token_refreshed","actor_id":"780bcf0c-f47f-498e-a129-35583df2a8a1","actor_username":"contact@prodiving.asia","actor_via_sso":false,"log_type":"token"}	2026-03-31 16:26:27.221574+00	
00000000-0000-0000-0000-000000000000	41ba510e-82a2-4f62-ba3d-d9ecf7f77080	{"action":"token_revoked","actor_id":"780bcf0c-f47f-498e-a129-35583df2a8a1","actor_username":"contact@prodiving.asia","actor_via_sso":false,"log_type":"token"}	2026-03-31 16:26:27.271627+00	
00000000-0000-0000-0000-000000000000	5f2113e3-093f-4236-af26-293a2897b6bd	{"action":"token_refreshed","actor_id":"780bcf0c-f47f-498e-a129-35583df2a8a1","actor_username":"contact@prodiving.asia","actor_via_sso":false,"log_type":"token"}	2026-03-31 16:48:45.752195+00	
00000000-0000-0000-0000-000000000000	344adeee-8ee8-4f0d-9fdf-b400aa863d08	{"action":"token_revoked","actor_id":"780bcf0c-f47f-498e-a129-35583df2a8a1","actor_username":"contact@prodiving.asia","actor_via_sso":false,"log_type":"token"}	2026-03-31 16:48:45.776922+00	
00000000-0000-0000-0000-000000000000	211242df-36db-4530-88cc-b248df9e33ef	{"action":"token_refreshed","actor_id":"780bcf0c-f47f-498e-a129-35583df2a8a1","actor_username":"contact@prodiving.asia","actor_via_sso":false,"log_type":"token"}	2026-03-31 17:47:18.613689+00	
00000000-0000-0000-0000-000000000000	6e665453-7e43-4388-9d4c-d9675883ceeb	{"action":"token_revoked","actor_id":"780bcf0c-f47f-498e-a129-35583df2a8a1","actor_username":"contact@prodiving.asia","actor_via_sso":false,"log_type":"token"}	2026-03-31 17:47:18.645522+00	
00000000-0000-0000-0000-000000000000	9e32e3aa-90c0-4c48-ac7b-fe5ee0f70140	{"action":"token_refreshed","actor_id":"780bcf0c-f47f-498e-a129-35583df2a8a1","actor_username":"contact@prodiving.asia","actor_via_sso":false,"log_type":"token"}	2026-03-31 18:45:56.684047+00	
00000000-0000-0000-0000-000000000000	0234f7c9-67f7-4d11-8eb0-80ef1257bb03	{"action":"token_revoked","actor_id":"780bcf0c-f47f-498e-a129-35583df2a8a1","actor_username":"contact@prodiving.asia","actor_via_sso":false,"log_type":"token"}	2026-03-31 18:45:56.699243+00	
00000000-0000-0000-0000-000000000000	c04b11f4-2fb2-455a-82d4-2c1b0c1fa397	{"action":"token_refreshed","actor_id":"780bcf0c-f47f-498e-a129-35583df2a8a1","actor_username":"contact@prodiving.asia","actor_via_sso":false,"log_type":"token"}	2026-03-31 19:41:33.548121+00	
00000000-0000-0000-0000-000000000000	e9e656d3-b8ab-4b25-9ad4-f61ffe9095d5	{"action":"token_revoked","actor_id":"780bcf0c-f47f-498e-a129-35583df2a8a1","actor_username":"contact@prodiving.asia","actor_via_sso":false,"log_type":"token"}	2026-03-31 19:41:33.580502+00	
00000000-0000-0000-0000-000000000000	1585494c-8504-4840-bd17-35aef8b0b3f2	{"action":"token_refreshed","actor_id":"780bcf0c-f47f-498e-a129-35583df2a8a1","actor_username":"contact@prodiving.asia","actor_via_sso":false,"log_type":"token"}	2026-03-31 19:43:56.868587+00	
00000000-0000-0000-0000-000000000000	3edaa308-fb37-482f-87a2-12a68e55f041	{"action":"token_revoked","actor_id":"780bcf0c-f47f-498e-a129-35583df2a8a1","actor_username":"contact@prodiving.asia","actor_via_sso":false,"log_type":"token"}	2026-03-31 19:43:56.896871+00	
00000000-0000-0000-0000-000000000000	00a555ac-4ff1-4491-a6d4-0a854796f790	{"action":"token_refreshed","actor_id":"780bcf0c-f47f-498e-a129-35583df2a8a1","actor_username":"contact@prodiving.asia","actor_via_sso":false,"log_type":"token"}	2026-03-31 20:40:13.414884+00	
00000000-0000-0000-0000-000000000000	fc332582-c820-400b-9734-3edfee9624fd	{"action":"token_revoked","actor_id":"780bcf0c-f47f-498e-a129-35583df2a8a1","actor_username":"contact@prodiving.asia","actor_via_sso":false,"log_type":"token"}	2026-03-31 20:40:13.434503+00	
00000000-0000-0000-0000-000000000000	1561015a-424a-4317-bd34-0b6a75023d19	{"action":"token_refreshed","actor_id":"780bcf0c-f47f-498e-a129-35583df2a8a1","actor_username":"contact@prodiving.asia","actor_via_sso":false,"log_type":"token"}	2026-03-31 20:42:17.431651+00	
00000000-0000-0000-0000-000000000000	49154a9c-155d-45e4-9d5a-8e8d3dee3643	{"action":"token_revoked","actor_id":"780bcf0c-f47f-498e-a129-35583df2a8a1","actor_username":"contact@prodiving.asia","actor_via_sso":false,"log_type":"token"}	2026-03-31 20:42:17.44897+00	
00000000-0000-0000-0000-000000000000	f4a33924-a9eb-4f7c-9993-63e4054f5a06	{"action":"login","actor_id":"780bcf0c-f47f-498e-a129-35583df2a8a1","actor_username":"contact@prodiving.asia","actor_via_sso":false,"log_type":"account","traits":{"provider":"email"}}	2026-03-31 20:51:47.145109+00	
00000000-0000-0000-0000-000000000000	b9c9aaaa-7a2d-46ca-8196-17a9dec37fcc	{"action":"token_refreshed","actor_id":"780bcf0c-f47f-498e-a129-35583df2a8a1","actor_username":"contact@prodiving.asia","actor_via_sso":false,"log_type":"token"}	2026-03-31 21:22:39.917442+00	
00000000-0000-0000-0000-000000000000	72c6d6f7-8556-4000-8523-cd696f0ebd0c	{"action":"token_revoked","actor_id":"780bcf0c-f47f-498e-a129-35583df2a8a1","actor_username":"contact@prodiving.asia","actor_via_sso":false,"log_type":"token"}	2026-03-31 21:22:39.933266+00	
00000000-0000-0000-0000-000000000000	7f5c2158-f67c-40d1-b3dd-635fe2d8b9e2	{"action":"token_refreshed","actor_id":"780bcf0c-f47f-498e-a129-35583df2a8a1","actor_username":"contact@prodiving.asia","actor_via_sso":false,"log_type":"token"}	2026-03-31 21:38:52.417034+00	
00000000-0000-0000-0000-000000000000	79df4454-d898-4832-a3f8-1a1847212b16	{"action":"token_revoked","actor_id":"780bcf0c-f47f-498e-a129-35583df2a8a1","actor_username":"contact@prodiving.asia","actor_via_sso":false,"log_type":"token"}	2026-03-31 21:38:52.431567+00	
00000000-0000-0000-0000-000000000000	e5298530-d9a0-4f96-991c-e9816a0167b6	{"action":"token_refreshed","actor_id":"780bcf0c-f47f-498e-a129-35583df2a8a1","actor_username":"contact@prodiving.asia","actor_via_sso":false,"log_type":"token"}	2026-03-31 21:40:17.615968+00	
00000000-0000-0000-0000-000000000000	6591f88c-2d44-4765-a9c9-ee22fba7a387	{"action":"token_revoked","actor_id":"780bcf0c-f47f-498e-a129-35583df2a8a1","actor_username":"contact@prodiving.asia","actor_via_sso":false,"log_type":"token"}	2026-03-31 21:40:17.636495+00	
00000000-0000-0000-0000-000000000000	25c0ad2a-3f07-4351-a974-349cc894a949	{"action":"login","actor_id":"780bcf0c-f47f-498e-a129-35583df2a8a1","actor_username":"contact@prodiving.asia","actor_via_sso":false,"log_type":"account","traits":{"provider":"email"}}	2026-03-31 21:54:12.288505+00	
00000000-0000-0000-0000-000000000000	a28f20c8-12b1-4414-8bd5-c2f4cefc1f65	{"action":"login","actor_id":"780bcf0c-f47f-498e-a129-35583df2a8a1","actor_username":"contact@prodiving.asia","actor_via_sso":false,"log_type":"account","traits":{"provider":"email"}}	2026-03-31 22:17:30.674758+00	
00000000-0000-0000-0000-000000000000	3f490a00-fcef-4d83-8242-55df9055b5a1	{"action":"token_refreshed","actor_id":"780bcf0c-f47f-498e-a129-35583df2a8a1","actor_username":"contact@prodiving.asia","actor_via_sso":false,"log_type":"token"}	2026-03-31 22:22:15.118597+00	
00000000-0000-0000-0000-000000000000	cefead55-431b-45f5-a308-5daf5f5882cc	{"action":"token_revoked","actor_id":"780bcf0c-f47f-498e-a129-35583df2a8a1","actor_username":"contact@prodiving.asia","actor_via_sso":false,"log_type":"token"}	2026-03-31 22:22:15.147885+00	
00000000-0000-0000-0000-000000000000	b4d2eb60-4972-4ae8-9586-96f2f2427eed	{"action":"token_refreshed","actor_id":"780bcf0c-f47f-498e-a129-35583df2a8a1","actor_username":"contact@prodiving.asia","actor_via_sso":false,"log_type":"token"}	2026-03-31 22:38:32.230694+00	
00000000-0000-0000-0000-000000000000	b9895781-e8d4-43f1-a39a-b49910bbc58b	{"action":"token_revoked","actor_id":"780bcf0c-f47f-498e-a129-35583df2a8a1","actor_username":"contact@prodiving.asia","actor_via_sso":false,"log_type":"token"}	2026-03-31 22:38:32.264192+00	
00000000-0000-0000-0000-000000000000	840d6525-bf0d-4ece-afa0-24f34d895960	{"action":"login","actor_id":"780bcf0c-f47f-498e-a129-35583df2a8a1","actor_username":"contact@prodiving.asia","actor_via_sso":false,"log_type":"account","traits":{"provider":"email"}}	2026-03-31 22:46:09.895381+00	
00000000-0000-0000-0000-000000000000	2a3b3f07-5b4d-498f-afe4-a3a824376259	{"action":"token_refreshed","actor_id":"780bcf0c-f47f-498e-a129-35583df2a8a1","actor_username":"contact@prodiving.asia","actor_via_sso":false,"log_type":"token"}	2026-03-31 22:52:31.880408+00	
00000000-0000-0000-0000-000000000000	a19b958d-2e1d-43cc-bbf9-b2e2c1c81b31	{"action":"token_revoked","actor_id":"780bcf0c-f47f-498e-a129-35583df2a8a1","actor_username":"contact@prodiving.asia","actor_via_sso":false,"log_type":"token"}	2026-03-31 22:52:31.901581+00	
00000000-0000-0000-0000-000000000000	847ce1a4-c85d-4707-aa14-b21a5a7567b4	{"action":"login","actor_id":"780bcf0c-f47f-498e-a129-35583df2a8a1","actor_username":"contact@prodiving.asia","actor_via_sso":false,"log_type":"account","traits":{"provider":"email"}}	2026-03-31 23:27:58.045943+00	
00000000-0000-0000-0000-000000000000	07a3e697-4130-4be6-9553-f3254feb3d36	{"action":"token_refreshed","actor_id":"780bcf0c-f47f-498e-a129-35583df2a8a1","actor_username":"contact@prodiving.asia","actor_via_sso":false,"log_type":"token"}	2026-03-31 23:44:42.134333+00	
00000000-0000-0000-0000-000000000000	933a196b-07b4-4472-b018-8cdfd5c42c28	{"action":"token_revoked","actor_id":"780bcf0c-f47f-498e-a129-35583df2a8a1","actor_username":"contact@prodiving.asia","actor_via_sso":false,"log_type":"token"}	2026-03-31 23:44:42.158752+00	
00000000-0000-0000-0000-000000000000	84c46be2-3375-4018-a320-14a49e57da5c	{"action":"token_refreshed","actor_id":"780bcf0c-f47f-498e-a129-35583df2a8a1","actor_username":"contact@prodiving.asia","actor_via_sso":false,"log_type":"token"}	2026-03-31 23:45:43.255559+00	
00000000-0000-0000-0000-000000000000	bbfb89e6-3d43-44f0-bb07-720404a63e88	{"action":"token_revoked","actor_id":"780bcf0c-f47f-498e-a129-35583df2a8a1","actor_username":"contact@prodiving.asia","actor_via_sso":false,"log_type":"token"}	2026-03-31 23:45:43.277527+00	
00000000-0000-0000-0000-000000000000	dbf44d74-95b5-45d1-81f8-709efe25cd88	{"action":"token_refreshed","actor_id":"780bcf0c-f47f-498e-a129-35583df2a8a1","actor_username":"contact@prodiving.asia","actor_via_sso":false,"log_type":"token"}	2026-03-31 23:46:19.490216+00	
00000000-0000-0000-0000-000000000000	020a870a-90bf-43dd-9d37-c9b302f78ce5	{"action":"token_revoked","actor_id":"780bcf0c-f47f-498e-a129-35583df2a8a1","actor_username":"contact@prodiving.asia","actor_via_sso":false,"log_type":"token"}	2026-03-31 23:46:19.504944+00	
00000000-0000-0000-0000-000000000000	ca31afc9-6825-49ff-ad62-d2c2d3fd06dd	{"action":"token_refreshed","actor_id":"780bcf0c-f47f-498e-a129-35583df2a8a1","actor_username":"contact@prodiving.asia","actor_via_sso":false,"log_type":"token"}	2026-03-31 23:50:32.280172+00	
00000000-0000-0000-0000-000000000000	d2fc1cf2-6cc9-4ebd-9a38-6feae3757102	{"action":"token_revoked","actor_id":"780bcf0c-f47f-498e-a129-35583df2a8a1","actor_username":"contact@prodiving.asia","actor_via_sso":false,"log_type":"token"}	2026-03-31 23:50:32.301891+00	
00000000-0000-0000-0000-000000000000	2063c27f-1785-4988-ac0a-060809283427	{"action":"token_refreshed","actor_id":"780bcf0c-f47f-498e-a129-35583df2a8a1","actor_username":"contact@prodiving.asia","actor_via_sso":false,"log_type":"token"}	2026-04-01 00:43:07.176275+00	
00000000-0000-0000-0000-000000000000	c314fb26-a3d1-4c76-b7a8-a0afba2b332c	{"action":"token_revoked","actor_id":"780bcf0c-f47f-498e-a129-35583df2a8a1","actor_username":"contact@prodiving.asia","actor_via_sso":false,"log_type":"token"}	2026-04-01 00:43:07.195846+00	
00000000-0000-0000-0000-000000000000	c16a3b7e-ed2d-43e7-a175-350174d5d9a8	{"action":"login","actor_id":"780bcf0c-f47f-498e-a129-35583df2a8a1","actor_username":"contact@prodiving.asia","actor_via_sso":false,"log_type":"account","traits":{"provider":"email"}}	2026-04-01 00:57:54.730046+00	
00000000-0000-0000-0000-000000000000	1f449c9e-c0d4-4900-a6c6-c6fae36cda7c	{"action":"token_refreshed","actor_id":"780bcf0c-f47f-498e-a129-35583df2a8a1","actor_username":"contact@prodiving.asia","actor_via_sso":false,"log_type":"token"}	2026-04-01 00:58:59.704953+00	
00000000-0000-0000-0000-000000000000	f2bd573f-0705-4b52-a301-123c2da5c566	{"action":"token_revoked","actor_id":"780bcf0c-f47f-498e-a129-35583df2a8a1","actor_username":"contact@prodiving.asia","actor_via_sso":false,"log_type":"token"}	2026-04-01 00:58:59.729405+00	
00000000-0000-0000-0000-000000000000	b771e291-fa6a-4326-a101-db36c21803b5	{"action":"token_refreshed","actor_id":"780bcf0c-f47f-498e-a129-35583df2a8a1","actor_username":"contact@prodiving.asia","actor_via_sso":false,"log_type":"token"}	2026-04-01 01:42:02.583256+00	
00000000-0000-0000-0000-000000000000	bc35fad5-0481-4fde-b4df-f575594b111b	{"action":"token_revoked","actor_id":"780bcf0c-f47f-498e-a129-35583df2a8a1","actor_username":"contact@prodiving.asia","actor_via_sso":false,"log_type":"token"}	2026-04-01 01:42:02.626518+00	
00000000-0000-0000-0000-000000000000	63e134fb-4842-4095-86e0-73315e7be3cc	{"action":"token_refreshed","actor_id":"780bcf0c-f47f-498e-a129-35583df2a8a1","actor_username":"contact@prodiving.asia","actor_via_sso":false,"log_type":"token"}	2026-04-01 01:46:29.152577+00	
00000000-0000-0000-0000-000000000000	86158e50-a06c-4c1a-9b04-994ce68359bd	{"action":"token_revoked","actor_id":"780bcf0c-f47f-498e-a129-35583df2a8a1","actor_username":"contact@prodiving.asia","actor_via_sso":false,"log_type":"token"}	2026-04-01 01:46:29.268412+00	
00000000-0000-0000-0000-000000000000	8a5a0576-40f1-4b0b-a50f-5a58f606238c	{"action":"token_refreshed","actor_id":"780bcf0c-f47f-498e-a129-35583df2a8a1","actor_username":"contact@prodiving.asia","actor_via_sso":false,"log_type":"token"}	2026-04-01 01:50:55.908379+00	
00000000-0000-0000-0000-000000000000	646da6b2-acae-4c2b-b29c-92a29e24a511	{"action":"token_revoked","actor_id":"780bcf0c-f47f-498e-a129-35583df2a8a1","actor_username":"contact@prodiving.asia","actor_via_sso":false,"log_type":"token"}	2026-04-01 01:50:55.977753+00	
00000000-0000-0000-0000-000000000000	f11ca9ca-47a8-45ed-b04e-7b2fcea9fe80	{"action":"token_refreshed","actor_id":"780bcf0c-f47f-498e-a129-35583df2a8a1","actor_username":"contact@prodiving.asia","actor_via_sso":false,"log_type":"token"}	2026-04-01 02:30:25.893638+00	
00000000-0000-0000-0000-000000000000	cea431fa-141e-45df-bf2f-0586b556ee54	{"action":"token_revoked","actor_id":"780bcf0c-f47f-498e-a129-35583df2a8a1","actor_username":"contact@prodiving.asia","actor_via_sso":false,"log_type":"token"}	2026-04-01 02:30:25.918625+00	
00000000-0000-0000-0000-000000000000	6c7b2cd9-2a65-4481-a739-4dbad84c5ae8	{"action":"token_refreshed","actor_id":"780bcf0c-f47f-498e-a129-35583df2a8a1","actor_username":"contact@prodiving.asia","actor_via_sso":false,"log_type":"token"}	2026-04-01 02:40:36.50581+00	
00000000-0000-0000-0000-000000000000	29b64a0d-c62d-4ab5-be17-86b7e52f29b4	{"action":"token_revoked","actor_id":"780bcf0c-f47f-498e-a129-35583df2a8a1","actor_username":"contact@prodiving.asia","actor_via_sso":false,"log_type":"token"}	2026-04-01 02:40:36.521679+00	
00000000-0000-0000-0000-000000000000	a365c19a-06d3-48f0-bdc0-b4a4592ea79b	{"action":"token_refreshed","actor_id":"780bcf0c-f47f-498e-a129-35583df2a8a1","actor_username":"contact@prodiving.asia","actor_via_sso":false,"log_type":"token"}	2026-04-01 02:49:31.386058+00	
00000000-0000-0000-0000-000000000000	cb9478ae-2723-4989-9d50-9a10f4725eca	{"action":"token_revoked","actor_id":"780bcf0c-f47f-498e-a129-35583df2a8a1","actor_username":"contact@prodiving.asia","actor_via_sso":false,"log_type":"token"}	2026-04-01 02:49:31.407692+00	
00000000-0000-0000-0000-000000000000	d37c983b-2c37-4c2a-b0e8-4a5b3fd710b7	{"action":"token_refreshed","actor_id":"780bcf0c-f47f-498e-a129-35583df2a8a1","actor_username":"contact@prodiving.asia","actor_via_sso":false,"log_type":"token"}	2026-04-01 02:53:19.142821+00	
00000000-0000-0000-0000-000000000000	2f053ce8-f3ea-424f-8f6c-3e49bb233a0d	{"action":"token_revoked","actor_id":"780bcf0c-f47f-498e-a129-35583df2a8a1","actor_username":"contact@prodiving.asia","actor_via_sso":false,"log_type":"token"}	2026-04-01 02:53:19.177441+00	
00000000-0000-0000-0000-000000000000	4ba8a2a9-5258-4995-a590-870fa4d99036	{"action":"token_refreshed","actor_id":"780bcf0c-f47f-498e-a129-35583df2a8a1","actor_username":"contact@prodiving.asia","actor_via_sso":false,"log_type":"token"}	2026-04-01 03:39:25.816937+00	
00000000-0000-0000-0000-000000000000	3d007de4-cb14-4313-952b-e6d83992eb1f	{"action":"token_revoked","actor_id":"780bcf0c-f47f-498e-a129-35583df2a8a1","actor_username":"contact@prodiving.asia","actor_via_sso":false,"log_type":"token"}	2026-04-01 03:39:25.840949+00	
00000000-0000-0000-0000-000000000000	b03b24e2-dcbd-4500-8e96-904e7cfe2abb	{"action":"login","actor_id":"780bcf0c-f47f-498e-a129-35583df2a8a1","actor_username":"contact@prodiving.asia","actor_via_sso":false,"log_type":"account","traits":{"provider":"email"}}	2026-04-01 03:56:57.014757+00	
00000000-0000-0000-0000-000000000000	c0de5d43-c4dc-4536-ad6f-7db80cd5088a	{"action":"login","actor_id":"780bcf0c-f47f-498e-a129-35583df2a8a1","actor_username":"contact@prodiving.asia","actor_via_sso":false,"log_type":"account","traits":{"provider":"email"}}	2026-04-01 03:59:58.023917+00	
00000000-0000-0000-0000-000000000000	31951d7b-8628-4848-8d02-30dba97fad51	{"action":"token_refreshed","actor_id":"780bcf0c-f47f-498e-a129-35583df2a8a1","actor_username":"contact@prodiving.asia","actor_via_sso":false,"log_type":"token"}	2026-04-01 04:37:59.328794+00	
00000000-0000-0000-0000-000000000000	33080f86-52ba-4eac-bf5e-8b261c92962c	{"action":"token_revoked","actor_id":"780bcf0c-f47f-498e-a129-35583df2a8a1","actor_username":"contact@prodiving.asia","actor_via_sso":false,"log_type":"token"}	2026-04-01 04:37:59.350811+00	
00000000-0000-0000-0000-000000000000	115e0caf-dc8e-4992-b0c7-47d67d92e37a	{"action":"token_refreshed","actor_id":"780bcf0c-f47f-498e-a129-35583df2a8a1","actor_username":"contact@prodiving.asia","actor_via_sso":false,"log_type":"token"}	2026-04-01 04:48:03.239852+00	
00000000-0000-0000-0000-000000000000	e897a632-93af-4434-9d80-ad136f2ec4b9	{"action":"token_revoked","actor_id":"780bcf0c-f47f-498e-a129-35583df2a8a1","actor_username":"contact@prodiving.asia","actor_via_sso":false,"log_type":"token"}	2026-04-01 04:48:03.252887+00	
00000000-0000-0000-0000-000000000000	97649078-a9e4-41f4-b412-5abd2fa15b63	{"action":"token_refreshed","actor_id":"780bcf0c-f47f-498e-a129-35583df2a8a1","actor_username":"contact@prodiving.asia","actor_via_sso":false,"log_type":"token"}	2026-04-01 04:55:55.856342+00	
00000000-0000-0000-0000-000000000000	42a8c3ae-51cc-4391-9a63-63da82ae0231	{"action":"token_revoked","actor_id":"780bcf0c-f47f-498e-a129-35583df2a8a1","actor_username":"contact@prodiving.asia","actor_via_sso":false,"log_type":"token"}	2026-04-01 04:55:55.88361+00	
00000000-0000-0000-0000-000000000000	9720a99b-b3bd-42f0-a2af-8f24970a39ff	{"action":"token_refreshed","actor_id":"780bcf0c-f47f-498e-a129-35583df2a8a1","actor_username":"contact@prodiving.asia","actor_via_sso":false,"log_type":"token"}	2026-04-01 05:36:31.562478+00	
00000000-0000-0000-0000-000000000000	7886bf61-155b-4033-b1df-2883af081e95	{"action":"token_revoked","actor_id":"780bcf0c-f47f-498e-a129-35583df2a8a1","actor_username":"contact@prodiving.asia","actor_via_sso":false,"log_type":"token"}	2026-04-01 05:36:31.587253+00	
00000000-0000-0000-0000-000000000000	381c1f67-7ff5-47f9-8fca-163e72d778b4	{"action":"token_refreshed","actor_id":"780bcf0c-f47f-498e-a129-35583df2a8a1","actor_username":"contact@prodiving.asia","actor_via_sso":false,"log_type":"token"}	2026-04-01 06:35:02.839132+00	
00000000-0000-0000-0000-000000000000	f8bbaa24-8e76-4170-9541-ef15c2aca9ed	{"action":"token_revoked","actor_id":"780bcf0c-f47f-498e-a129-35583df2a8a1","actor_username":"contact@prodiving.asia","actor_via_sso":false,"log_type":"token"}	2026-04-01 06:35:02.860711+00	
00000000-0000-0000-0000-000000000000	4cf3c5eb-69fb-48e7-8b9c-9c5ef50535be	{"action":"token_refreshed","actor_id":"780bcf0c-f47f-498e-a129-35583df2a8a1","actor_username":"contact@prodiving.asia","actor_via_sso":false,"log_type":"token"}	2026-04-01 07:33:43.145184+00	
00000000-0000-0000-0000-000000000000	59ef1841-bd38-4374-84ec-8f51dab5f7b3	{"action":"token_revoked","actor_id":"780bcf0c-f47f-498e-a129-35583df2a8a1","actor_username":"contact@prodiving.asia","actor_via_sso":false,"log_type":"token"}	2026-04-01 07:33:43.167365+00	
00000000-0000-0000-0000-000000000000	a3656396-6838-4269-91dd-e79166a23d94	{"action":"token_refreshed","actor_id":"780bcf0c-f47f-498e-a129-35583df2a8a1","actor_username":"contact@prodiving.asia","actor_via_sso":false,"log_type":"token"}	2026-04-01 07:58:28.536863+00	
00000000-0000-0000-0000-000000000000	5dae198b-836f-45c8-b2f2-075caeac781e	{"action":"token_revoked","actor_id":"780bcf0c-f47f-498e-a129-35583df2a8a1","actor_username":"contact@prodiving.asia","actor_via_sso":false,"log_type":"token"}	2026-04-01 07:58:28.56244+00	
00000000-0000-0000-0000-000000000000	c78d286e-5ba0-4f74-b45f-0f97b78e7f78	{"action":"login","actor_id":"780bcf0c-f47f-498e-a129-35583df2a8a1","actor_username":"contact@prodiving.asia","actor_via_sso":false,"log_type":"account","traits":{"provider":"email"}}	2026-04-01 07:59:53.877101+00	
00000000-0000-0000-0000-000000000000	dd8b187c-e34e-446d-8929-1d025b1a8ae9	{"action":"token_refreshed","actor_id":"780bcf0c-f47f-498e-a129-35583df2a8a1","actor_username":"contact@prodiving.asia","actor_via_sso":false,"log_type":"token"}	2026-04-01 08:32:28.438007+00	
00000000-0000-0000-0000-000000000000	89f6ce1b-a4f9-4c31-8f54-34def33f8371	{"action":"token_revoked","actor_id":"780bcf0c-f47f-498e-a129-35583df2a8a1","actor_username":"contact@prodiving.asia","actor_via_sso":false,"log_type":"token"}	2026-04-01 08:32:28.584284+00	
00000000-0000-0000-0000-000000000000	0526b113-2cdb-4679-a497-c00c7de5a878	{"action":"token_refreshed","actor_id":"780bcf0c-f47f-498e-a129-35583df2a8a1","actor_username":"contact@prodiving.asia","actor_via_sso":false,"log_type":"token"}	2026-04-01 08:57:03.335858+00	
00000000-0000-0000-0000-000000000000	327ed72f-c375-4797-af6d-fa6cd42f9cc1	{"action":"token_revoked","actor_id":"780bcf0c-f47f-498e-a129-35583df2a8a1","actor_username":"contact@prodiving.asia","actor_via_sso":false,"log_type":"token"}	2026-04-01 08:57:03.354171+00	
00000000-0000-0000-0000-000000000000	677289ab-0780-4680-8294-067321855885	{"action":"token_refreshed","actor_id":"780bcf0c-f47f-498e-a129-35583df2a8a1","actor_username":"contact@prodiving.asia","actor_via_sso":false,"log_type":"token"}	2026-04-01 08:58:26.780763+00	
00000000-0000-0000-0000-000000000000	e4c160d4-0300-418d-94ab-603f7cf0e585	{"action":"token_revoked","actor_id":"780bcf0c-f47f-498e-a129-35583df2a8a1","actor_username":"contact@prodiving.asia","actor_via_sso":false,"log_type":"token"}	2026-04-01 08:58:26.790987+00	
00000000-0000-0000-0000-000000000000	91b5478c-5ce1-4f61-b2f9-d11b2e8424df	{"action":"token_refreshed","actor_id":"780bcf0c-f47f-498e-a129-35583df2a8a1","actor_username":"contact@prodiving.asia","actor_via_sso":false,"log_type":"token"}	2026-04-01 08:59:09.867368+00	
00000000-0000-0000-0000-000000000000	b67c01f3-31b9-4e8e-9d6c-bb17cfc8cb8d	{"action":"token_revoked","actor_id":"780bcf0c-f47f-498e-a129-35583df2a8a1","actor_username":"contact@prodiving.asia","actor_via_sso":false,"log_type":"token"}	2026-04-01 08:59:09.878596+00	
00000000-0000-0000-0000-000000000000	0198a144-f581-4cfd-9c87-41db261622b6	{"action":"token_refreshed","actor_id":"780bcf0c-f47f-498e-a129-35583df2a8a1","actor_username":"contact@prodiving.asia","actor_via_sso":false,"log_type":"token"}	2026-04-01 09:30:39.086854+00	
00000000-0000-0000-0000-000000000000	40b099ee-09d4-440c-a308-5cc9b753b789	{"action":"token_revoked","actor_id":"780bcf0c-f47f-498e-a129-35583df2a8a1","actor_username":"contact@prodiving.asia","actor_via_sso":false,"log_type":"token"}	2026-04-01 09:30:39.119722+00	
00000000-0000-0000-0000-000000000000	516ef1c2-dc42-43d3-84f7-0cc15f8aa1b7	{"action":"token_refreshed","actor_id":"780bcf0c-f47f-498e-a129-35583df2a8a1","actor_username":"contact@prodiving.asia","actor_via_sso":false,"log_type":"token"}	2026-04-01 10:29:09.660597+00	
00000000-0000-0000-0000-000000000000	d2b665fb-e86b-4547-bec0-5d21e133ae16	{"action":"token_revoked","actor_id":"780bcf0c-f47f-498e-a129-35583df2a8a1","actor_username":"contact@prodiving.asia","actor_via_sso":false,"log_type":"token"}	2026-04-01 10:29:09.683346+00	
00000000-0000-0000-0000-000000000000	40766a0a-ac5c-44fe-afa8-6273bff3af4d	{"action":"token_refreshed","actor_id":"780bcf0c-f47f-498e-a129-35583df2a8a1","actor_username":"contact@prodiving.asia","actor_via_sso":false,"log_type":"token"}	2026-04-01 11:27:26.526452+00	
00000000-0000-0000-0000-000000000000	6833a59a-5377-4a36-af51-066755d08e05	{"action":"token_revoked","actor_id":"780bcf0c-f47f-498e-a129-35583df2a8a1","actor_username":"contact@prodiving.asia","actor_via_sso":false,"log_type":"token"}	2026-04-01 11:27:26.54405+00	
00000000-0000-0000-0000-000000000000	bb859b7f-104d-4632-a5f6-8eddb9da2415	{"action":"login","actor_id":"780bcf0c-f47f-498e-a129-35583df2a8a1","actor_username":"contact@prodiving.asia","actor_via_sso":false,"log_type":"account","traits":{"provider":"email"}}	2026-04-01 11:54:58.122932+00	
00000000-0000-0000-0000-000000000000	18272725-01ce-430e-8c6a-ca719274a725	{"action":"token_refreshed","actor_id":"780bcf0c-f47f-498e-a129-35583df2a8a1","actor_username":"contact@prodiving.asia","actor_via_sso":false,"log_type":"token"}	2026-04-01 12:34:01.014099+00	
00000000-0000-0000-0000-000000000000	aaf3bfe8-bde6-4fdc-a47a-15b90de44117	{"action":"token_revoked","actor_id":"780bcf0c-f47f-498e-a129-35583df2a8a1","actor_username":"contact@prodiving.asia","actor_via_sso":false,"log_type":"token"}	2026-04-01 12:34:01.034987+00	
00000000-0000-0000-0000-000000000000	1784a4c8-2f2f-480b-a78a-7490a79cc26f	{"action":"token_refreshed","actor_id":"780bcf0c-f47f-498e-a129-35583df2a8a1","actor_username":"contact@prodiving.asia","actor_via_sso":false,"log_type":"token"}	2026-04-01 12:45:34.971277+00	
00000000-0000-0000-0000-000000000000	53694f39-e5da-433c-8ca8-211acea62cb6	{"action":"token_revoked","actor_id":"780bcf0c-f47f-498e-a129-35583df2a8a1","actor_username":"contact@prodiving.asia","actor_via_sso":false,"log_type":"token"}	2026-04-01 12:45:35.022987+00	
00000000-0000-0000-0000-000000000000	4e9810b6-d82c-423b-81fe-486ea5833d6e	{"action":"token_refreshed","actor_id":"780bcf0c-f47f-498e-a129-35583df2a8a1","actor_username":"contact@prodiving.asia","actor_via_sso":false,"log_type":"token"}	2026-04-01 13:32:22.608506+00	
00000000-0000-0000-0000-000000000000	d0673394-5ed6-4b6e-9518-dbb6c0f7b304	{"action":"token_revoked","actor_id":"780bcf0c-f47f-498e-a129-35583df2a8a1","actor_username":"contact@prodiving.asia","actor_via_sso":false,"log_type":"token"}	2026-04-01 13:32:22.628276+00	
00000000-0000-0000-0000-000000000000	615964df-5e8a-4baf-a115-aa10f43bed8a	{"action":"token_refreshed","actor_id":"780bcf0c-f47f-498e-a129-35583df2a8a1","actor_username":"contact@prodiving.asia","actor_via_sso":false,"log_type":"token"}	2026-04-01 14:15:02.448041+00	
00000000-0000-0000-0000-000000000000	33424c11-7c9d-40d9-9a77-f087f6b239ab	{"action":"token_revoked","actor_id":"780bcf0c-f47f-498e-a129-35583df2a8a1","actor_username":"contact@prodiving.asia","actor_via_sso":false,"log_type":"token"}	2026-04-01 14:15:02.4658+00	
00000000-0000-0000-0000-000000000000	01b4c9a5-6c7d-4bdd-88c7-e4c747ea255f	{"action":"token_refreshed","actor_id":"780bcf0c-f47f-498e-a129-35583df2a8a1","actor_username":"contact@prodiving.asia","actor_via_sso":false,"log_type":"token"}	2026-04-01 14:38:40.623041+00	
00000000-0000-0000-0000-000000000000	f716a09f-f0cc-411d-b51c-689ac6f4e572	{"action":"token_revoked","actor_id":"780bcf0c-f47f-498e-a129-35583df2a8a1","actor_username":"contact@prodiving.asia","actor_via_sso":false,"log_type":"token"}	2026-04-01 14:38:40.64437+00	
00000000-0000-0000-0000-000000000000	989f5e93-30b6-4783-aa3c-37990cabb2f1	{"action":"token_refreshed","actor_id":"780bcf0c-f47f-498e-a129-35583df2a8a1","actor_username":"contact@prodiving.asia","actor_via_sso":false,"log_type":"token"}	2026-04-01 15:13:49.826767+00	
00000000-0000-0000-0000-000000000000	6f697a15-5669-4414-bd53-27f5d2fabc10	{"action":"token_revoked","actor_id":"780bcf0c-f47f-498e-a129-35583df2a8a1","actor_username":"contact@prodiving.asia","actor_via_sso":false,"log_type":"token"}	2026-04-01 15:13:49.839037+00	
00000000-0000-0000-0000-000000000000	b6fcdf0f-fab5-4024-9ce4-9098d34e82dc	{"action":"token_refreshed","actor_id":"780bcf0c-f47f-498e-a129-35583df2a8a1","actor_username":"contact@prodiving.asia","actor_via_sso":false,"log_type":"token"}	2026-04-01 15:36:57.369949+00	
00000000-0000-0000-0000-000000000000	ded20908-a33e-499f-81c9-cb6a7072bce2	{"action":"token_revoked","actor_id":"780bcf0c-f47f-498e-a129-35583df2a8a1","actor_username":"contact@prodiving.asia","actor_via_sso":false,"log_type":"token"}	2026-04-01 15:36:57.392659+00	
00000000-0000-0000-0000-000000000000	99e9b595-bdf5-4cfd-a3df-eec5db2b7879	{"action":"token_refreshed","actor_id":"780bcf0c-f47f-498e-a129-35583df2a8a1","actor_username":"contact@prodiving.asia","actor_via_sso":false,"log_type":"token"}	2026-04-01 15:40:39.427985+00	
00000000-0000-0000-0000-000000000000	ebff645b-91c9-4b05-bfdd-7d0b43a3971a	{"action":"token_revoked","actor_id":"780bcf0c-f47f-498e-a129-35583df2a8a1","actor_username":"contact@prodiving.asia","actor_via_sso":false,"log_type":"token"}	2026-04-01 15:40:39.469048+00	
00000000-0000-0000-0000-000000000000	5eb59c57-3ab0-4480-80d2-a47b7ce507cb	{"action":"logout","actor_id":"780bcf0c-f47f-498e-a129-35583df2a8a1","actor_username":"contact@prodiving.asia","actor_via_sso":false,"log_type":"account"}	2026-04-01 15:52:21.410845+00	
00000000-0000-0000-0000-000000000000	47e96ae5-e2b3-47fb-8d5b-7ec35aa1efd7	{"action":"login","actor_id":"780bcf0c-f47f-498e-a129-35583df2a8a1","actor_username":"contact@prodiving.asia","actor_via_sso":false,"log_type":"account","traits":{"provider":"email"}}	2026-04-01 16:52:42.872022+00	
00000000-0000-0000-0000-000000000000	35eba25a-fd80-4b0e-8328-16220ed77423	{"action":"login","actor_id":"780bcf0c-f47f-498e-a129-35583df2a8a1","actor_username":"contact@prodiving.asia","actor_via_sso":false,"log_type":"account","traits":{"provider":"email"}}	2026-04-01 16:53:20.466117+00	
00000000-0000-0000-0000-000000000000	b392dff1-eb10-4f88-af77-b073c9fbfcab	{"action":"token_refreshed","actor_id":"780bcf0c-f47f-498e-a129-35583df2a8a1","actor_username":"contact@prodiving.asia","actor_via_sso":false,"log_type":"token"}	2026-04-01 17:51:21.432316+00	
00000000-0000-0000-0000-000000000000	df511bd2-7d7e-4414-a00c-7c95522b8775	{"action":"token_revoked","actor_id":"780bcf0c-f47f-498e-a129-35583df2a8a1","actor_username":"contact@prodiving.asia","actor_via_sso":false,"log_type":"token"}	2026-04-01 17:51:21.458998+00	
00000000-0000-0000-0000-000000000000	eb6c4d04-5457-4b4f-95d5-155041a0fce5	{"action":"token_refreshed","actor_id":"780bcf0c-f47f-498e-a129-35583df2a8a1","actor_username":"contact@prodiving.asia","actor_via_sso":false,"log_type":"token"}	2026-04-01 17:57:37.760155+00	
00000000-0000-0000-0000-000000000000	5edaba68-a524-4537-8111-8eb8644f1a4f	{"action":"token_revoked","actor_id":"780bcf0c-f47f-498e-a129-35583df2a8a1","actor_username":"contact@prodiving.asia","actor_via_sso":false,"log_type":"token"}	2026-04-01 17:57:37.782256+00	
00000000-0000-0000-0000-000000000000	7e9c216e-a5d8-4ea7-a24b-baf40a8e38a0	{"action":"token_refreshed","actor_id":"780bcf0c-f47f-498e-a129-35583df2a8a1","actor_username":"contact@prodiving.asia","actor_via_sso":false,"log_type":"token"}	2026-04-01 18:50:44.915173+00	
00000000-0000-0000-0000-000000000000	8d1b2649-9b3a-4643-8318-0c2398a72b60	{"action":"token_revoked","actor_id":"780bcf0c-f47f-498e-a129-35583df2a8a1","actor_username":"contact@prodiving.asia","actor_via_sso":false,"log_type":"token"}	2026-04-01 18:50:44.939241+00	
00000000-0000-0000-0000-000000000000	25404454-4bc2-46ec-b0ea-5337d6e4f271	{"action":"logout","actor_id":"780bcf0c-f47f-498e-a129-35583df2a8a1","actor_username":"contact@prodiving.asia","actor_via_sso":false,"log_type":"account"}	2026-04-01 18:59:59.246803+00	
00000000-0000-0000-0000-000000000000	b5162567-f21e-414d-89db-3a3dd33d4461	{"action":"login","actor_id":"780bcf0c-f47f-498e-a129-35583df2a8a1","actor_username":"contact@prodiving.asia","actor_via_sso":false,"log_type":"account","traits":{"provider":"email"}}	2026-04-01 19:01:10.610685+00	
00000000-0000-0000-0000-000000000000	07397324-129a-48cc-b550-0a271d554887	{"action":"token_refreshed","actor_id":"780bcf0c-f47f-498e-a129-35583df2a8a1","actor_username":"contact@prodiving.asia","actor_via_sso":false,"log_type":"token"}	2026-04-01 19:59:43.827314+00	
00000000-0000-0000-0000-000000000000	dde4713a-e129-4455-8fb8-408f39ce0454	{"action":"token_revoked","actor_id":"780bcf0c-f47f-498e-a129-35583df2a8a1","actor_username":"contact@prodiving.asia","actor_via_sso":false,"log_type":"token"}	2026-04-01 19:59:43.851645+00	
00000000-0000-0000-0000-000000000000	20ed1b97-b74a-4d73-9a37-ae638ad91d43	{"action":"token_refreshed","actor_id":"780bcf0c-f47f-498e-a129-35583df2a8a1","actor_username":"contact@prodiving.asia","actor_via_sso":false,"log_type":"token"}	2026-04-01 20:58:14.009461+00	
00000000-0000-0000-0000-000000000000	b3b00563-9a70-464e-b073-5c9ad9a45b64	{"action":"token_revoked","actor_id":"780bcf0c-f47f-498e-a129-35583df2a8a1","actor_username":"contact@prodiving.asia","actor_via_sso":false,"log_type":"token"}	2026-04-01 20:58:14.030045+00	
00000000-0000-0000-0000-000000000000	b9d3b710-1f1b-4287-8963-592254783e6b	{"action":"token_refreshed","actor_id":"780bcf0c-f47f-498e-a129-35583df2a8a1","actor_username":"contact@prodiving.asia","actor_via_sso":false,"log_type":"token"}	2026-04-01 21:56:51.018709+00	
00000000-0000-0000-0000-000000000000	dcb16ee4-ff34-45a5-a5c9-c4e0403ce99e	{"action":"token_revoked","actor_id":"780bcf0c-f47f-498e-a129-35583df2a8a1","actor_username":"contact@prodiving.asia","actor_via_sso":false,"log_type":"token"}	2026-04-01 21:56:51.038229+00	
00000000-0000-0000-0000-000000000000	7dfd71e8-7323-4f3d-bacb-b1ddb0ca1e7a	{"action":"token_refreshed","actor_id":"780bcf0c-f47f-498e-a129-35583df2a8a1","actor_username":"contact@prodiving.asia","actor_via_sso":false,"log_type":"token"}	2026-04-01 23:01:49.366578+00	
00000000-0000-0000-0000-000000000000	a68cb1f6-7e94-4054-9f8c-5642c4dce6f2	{"action":"token_revoked","actor_id":"780bcf0c-f47f-498e-a129-35583df2a8a1","actor_username":"contact@prodiving.asia","actor_via_sso":false,"log_type":"token"}	2026-04-01 23:01:49.421446+00	
00000000-0000-0000-0000-000000000000	8bdd21b1-ca9f-4ac7-9d4b-bdcaaf5da993	{"action":"login","actor_id":"780bcf0c-f47f-498e-a129-35583df2a8a1","actor_username":"contact@prodiving.asia","actor_via_sso":false,"log_type":"account","traits":{"provider":"email"}}	2026-04-01 23:36:19.798483+00	
00000000-0000-0000-0000-000000000000	cf4a44dd-fb16-485d-a90c-1494e2507074	{"action":"token_refreshed","actor_id":"780bcf0c-f47f-498e-a129-35583df2a8a1","actor_username":"contact@prodiving.asia","actor_via_sso":false,"log_type":"token"}	2026-04-02 00:00:25.159319+00	
00000000-0000-0000-0000-000000000000	026e99d3-ad98-45ed-898f-319efec8af01	{"action":"token_revoked","actor_id":"780bcf0c-f47f-498e-a129-35583df2a8a1","actor_username":"contact@prodiving.asia","actor_via_sso":false,"log_type":"token"}	2026-04-02 00:00:25.186135+00	
00000000-0000-0000-0000-000000000000	a87ca20a-6e53-41d9-bb5d-2c27df52ba1c	{"action":"token_refreshed","actor_id":"780bcf0c-f47f-498e-a129-35583df2a8a1","actor_username":"contact@prodiving.asia","actor_via_sso":false,"log_type":"token"}	2026-04-02 00:59:00.532402+00	
00000000-0000-0000-0000-000000000000	c353f80c-18e2-4e52-a8e0-a4c6ce4eb612	{"action":"token_revoked","actor_id":"780bcf0c-f47f-498e-a129-35583df2a8a1","actor_username":"contact@prodiving.asia","actor_via_sso":false,"log_type":"token"}	2026-04-02 00:59:00.555813+00	
00000000-0000-0000-0000-000000000000	69f916b6-87bf-46cb-8910-83236d9e961b	{"action":"token_refreshed","actor_id":"780bcf0c-f47f-498e-a129-35583df2a8a1","actor_username":"contact@prodiving.asia","actor_via_sso":false,"log_type":"token"}	2026-04-03 11:29:06.437737+00	
00000000-0000-0000-0000-000000000000	6a0112bb-7bf0-4c51-96a8-7e9b806d04ba	{"action":"token_revoked","actor_id":"780bcf0c-f47f-498e-a129-35583df2a8a1","actor_username":"contact@prodiving.asia","actor_via_sso":false,"log_type":"token"}	2026-04-03 11:29:06.459657+00	
00000000-0000-0000-0000-000000000000	e2912678-1006-4868-a052-efa569f3e352	{"action":"token_refreshed","actor_id":"780bcf0c-f47f-498e-a129-35583df2a8a1","actor_username":"contact@prodiving.asia","actor_via_sso":false,"log_type":"token"}	2026-04-03 12:36:51.442849+00	
00000000-0000-0000-0000-000000000000	95cc7bb8-8df9-4272-b334-092008f22022	{"action":"token_revoked","actor_id":"780bcf0c-f47f-498e-a129-35583df2a8a1","actor_username":"contact@prodiving.asia","actor_via_sso":false,"log_type":"token"}	2026-04-03 12:36:51.459933+00	
00000000-0000-0000-0000-000000000000	bdb1738c-a443-4486-9e4c-af3aa23e6ca3	{"action":"token_refreshed","actor_id":"780bcf0c-f47f-498e-a129-35583df2a8a1","actor_username":"contact@prodiving.asia","actor_via_sso":false,"log_type":"token"}	2026-04-03 13:35:14.254381+00	
00000000-0000-0000-0000-000000000000	44e44663-29bd-4f2c-b71e-ec6ec76af740	{"action":"token_revoked","actor_id":"780bcf0c-f47f-498e-a129-35583df2a8a1","actor_username":"contact@prodiving.asia","actor_via_sso":false,"log_type":"token"}	2026-04-03 13:35:14.275508+00	
00000000-0000-0000-0000-000000000000	b14ebe30-45a4-4916-aada-5405dc1e24ab	{"action":"token_refreshed","actor_id":"780bcf0c-f47f-498e-a129-35583df2a8a1","actor_username":"contact@prodiving.asia","actor_via_sso":false,"log_type":"token"}	2026-04-03 14:33:34.759671+00	
00000000-0000-0000-0000-000000000000	a02b8f63-ed4a-4320-914c-ee177c6071e9	{"action":"token_revoked","actor_id":"780bcf0c-f47f-498e-a129-35583df2a8a1","actor_username":"contact@prodiving.asia","actor_via_sso":false,"log_type":"token"}	2026-04-03 14:33:34.780086+00	
00000000-0000-0000-0000-000000000000	e1fd47fc-c59b-4c05-8422-9bdf4667295b	{"action":"token_refreshed","actor_id":"780bcf0c-f47f-498e-a129-35583df2a8a1","actor_username":"contact@prodiving.asia","actor_via_sso":false,"log_type":"token"}	2026-04-03 15:31:37.94695+00	
00000000-0000-0000-0000-000000000000	46868722-2cf7-470b-872a-079277cc1ee3	{"action":"token_revoked","actor_id":"780bcf0c-f47f-498e-a129-35583df2a8a1","actor_username":"contact@prodiving.asia","actor_via_sso":false,"log_type":"token"}	2026-04-03 15:31:37.965444+00	
00000000-0000-0000-0000-000000000000	03903d0f-fd8b-47ae-9f22-1d2c385caed3	{"action":"token_refreshed","actor_id":"780bcf0c-f47f-498e-a129-35583df2a8a1","actor_username":"contact@prodiving.asia","actor_via_sso":false,"log_type":"token"}	2026-04-03 16:30:13.967968+00	
00000000-0000-0000-0000-000000000000	6439f0a1-6cad-447f-9a09-f530eeb7ca08	{"action":"token_revoked","actor_id":"780bcf0c-f47f-498e-a129-35583df2a8a1","actor_username":"contact@prodiving.asia","actor_via_sso":false,"log_type":"token"}	2026-04-03 16:30:13.994159+00	
00000000-0000-0000-0000-000000000000	ef83ebc6-ce0b-4d73-8902-faf42dc10fd1	{"action":"login","actor_id":"780bcf0c-f47f-498e-a129-35583df2a8a1","actor_username":"contact@prodiving.asia","actor_via_sso":false,"log_type":"account","traits":{"provider":"email"}}	2026-04-03 17:15:46.301924+00	
00000000-0000-0000-0000-000000000000	db3f54d0-c920-4421-be39-b3eecc698082	{"action":"token_refreshed","actor_id":"780bcf0c-f47f-498e-a129-35583df2a8a1","actor_username":"contact@prodiving.asia","actor_via_sso":false,"log_type":"token"}	2026-04-03 17:28:43.792676+00	
00000000-0000-0000-0000-000000000000	5d8f276f-84bb-400d-bed0-42859f37fdc3	{"action":"token_revoked","actor_id":"780bcf0c-f47f-498e-a129-35583df2a8a1","actor_username":"contact@prodiving.asia","actor_via_sso":false,"log_type":"token"}	2026-04-03 17:28:43.814501+00	
00000000-0000-0000-0000-000000000000	4716d033-ccc4-4d81-a230-1f52a8b30292	{"action":"token_refreshed","actor_id":"780bcf0c-f47f-498e-a129-35583df2a8a1","actor_username":"contact@prodiving.asia","actor_via_sso":false,"log_type":"token"}	2026-04-03 18:27:20.433003+00	
00000000-0000-0000-0000-000000000000	4a24ab85-b7c9-42bb-b9cb-b44823760e9e	{"action":"token_revoked","actor_id":"780bcf0c-f47f-498e-a129-35583df2a8a1","actor_username":"contact@prodiving.asia","actor_via_sso":false,"log_type":"token"}	2026-04-03 18:27:20.45786+00	
00000000-0000-0000-0000-000000000000	567d4535-bd23-4ca3-9c26-07b331c21458	{"action":"token_refreshed","actor_id":"780bcf0c-f47f-498e-a129-35583df2a8a1","actor_username":"contact@prodiving.asia","actor_via_sso":false,"log_type":"token"}	2026-04-03 19:00:50.315684+00	
00000000-0000-0000-0000-000000000000	4a3f9861-e70e-416f-87bc-ae1f93045494	{"action":"token_revoked","actor_id":"780bcf0c-f47f-498e-a129-35583df2a8a1","actor_username":"contact@prodiving.asia","actor_via_sso":false,"log_type":"token"}	2026-04-03 19:00:50.351479+00	
00000000-0000-0000-0000-000000000000	3eb6501f-0fce-48c3-9d86-1820c64d6aa6	{"action":"token_refreshed","actor_id":"780bcf0c-f47f-498e-a129-35583df2a8a1","actor_username":"contact@prodiving.asia","actor_via_sso":false,"log_type":"token"}	2026-04-03 19:26:09.644291+00	
00000000-0000-0000-0000-000000000000	893dd14a-7bb4-4e09-b0cc-1b0b0fe6361d	{"action":"token_revoked","actor_id":"780bcf0c-f47f-498e-a129-35583df2a8a1","actor_username":"contact@prodiving.asia","actor_via_sso":false,"log_type":"token"}	2026-04-03 19:26:09.664179+00	
00000000-0000-0000-0000-000000000000	57c0926e-d2c0-4f81-8dab-b5868bf62adf	{"action":"login","actor_id":"780bcf0c-f47f-498e-a129-35583df2a8a1","actor_username":"contact@prodiving.asia","actor_via_sso":false,"log_type":"account","traits":{"provider":"email"}}	2026-04-03 19:37:16.826316+00	
00000000-0000-0000-0000-000000000000	3947a9cb-d777-4c84-9362-dde820318e1b	{"action":"user_signedup","actor_id":"00000000-0000-0000-0000-000000000000","actor_username":"service_role","actor_via_sso":false,"log_type":"team","traits":{"provider":"email","user_email":"bas@divinginasia.com","user_id":"1379a8ab-4fe0-48d4-876e-b6b697c1dc46","user_phone":""}}	2026-04-03 20:04:23.663249+00	
00000000-0000-0000-0000-000000000000	8623facc-2028-412f-aa62-391796ee610e	{"action":"logout","actor_id":"780bcf0c-f47f-498e-a129-35583df2a8a1","actor_username":"contact@prodiving.asia","actor_via_sso":false,"log_type":"account"}	2026-04-03 20:04:58.460711+00	
00000000-0000-0000-0000-000000000000	d019c440-9b23-4ffd-847d-6d2974083790	{"action":"login","actor_id":"1379a8ab-4fe0-48d4-876e-b6b697c1dc46","actor_username":"bas@divinginasia.com","actor_via_sso":false,"log_type":"account","traits":{"provider":"email"}}	2026-04-03 20:10:08.469079+00	
00000000-0000-0000-0000-000000000000	513a8105-5a8a-49f1-8b58-e0d287a30127	{"action":"user_recovery_requested","actor_id":"780bcf0c-f47f-498e-a129-35583df2a8a1","actor_username":"contact@prodiving.asia","actor_via_sso":false,"log_type":"user"}	2026-04-03 20:11:34.27221+00	
00000000-0000-0000-0000-000000000000	f354b5ff-4489-4cf9-9b45-6fd974ba9544	{"action":"login","actor_id":"780bcf0c-f47f-498e-a129-35583df2a8a1","actor_username":"contact@prodiving.asia","actor_via_sso":false,"log_type":"account"}	2026-04-03 20:12:27.062113+00	
00000000-0000-0000-0000-000000000000	6ef4f051-b446-4100-a653-ca2071c282b9	{"action":"user_recovery_requested","actor_id":"780bcf0c-f47f-498e-a129-35583df2a8a1","actor_username":"contact@prodiving.asia","actor_via_sso":false,"log_type":"user"}	2026-04-03 20:12:56.029166+00	
00000000-0000-0000-0000-000000000000	4319e820-b680-485c-b14f-3a9330b1621b	{"action":"login","actor_id":"780bcf0c-f47f-498e-a129-35583df2a8a1","actor_username":"contact@prodiving.asia","actor_via_sso":false,"log_type":"account"}	2026-04-03 20:13:07.090645+00	
00000000-0000-0000-0000-000000000000	03d2b4c3-ec6e-4bcd-ae99-35e26fbcc857	{"action":"login","actor_id":"780bcf0c-f47f-498e-a129-35583df2a8a1","actor_username":"contact@prodiving.asia","actor_via_sso":false,"log_type":"account","traits":{"provider":"email"}}	2026-04-03 20:27:21.579336+00	
00000000-0000-0000-0000-000000000000	e3518b8c-1979-4cd9-8ef6-543172dacf16	{"action":"logout","actor_id":"780bcf0c-f47f-498e-a129-35583df2a8a1","actor_username":"contact@prodiving.asia","actor_via_sso":false,"log_type":"account"}	2026-04-03 20:29:46.312232+00	
00000000-0000-0000-0000-000000000000	8216fb69-5606-4172-afe3-3166fa8ec4f1	{"action":"login","actor_id":"d314da05-5a66-49b4-bb53-034981d83690","actor_username":"onemediaasia@duck.com","actor_via_sso":false,"log_type":"account","traits":{"provider":"email"}}	2026-04-03 20:30:15.798966+00	
00000000-0000-0000-0000-000000000000	9abadfb2-3d0b-4a61-af90-cae566056a14	{"action":"login","actor_id":"780bcf0c-f47f-498e-a129-35583df2a8a1","actor_username":"contact@prodiving.asia","actor_via_sso":false,"log_type":"account","traits":{"provider":"email"}}	2026-04-03 20:30:59.235628+00	
00000000-0000-0000-0000-000000000000	063159d2-8231-4c7e-bbc4-eceb95e9d87d	{"action":"logout","actor_id":"780bcf0c-f47f-498e-a129-35583df2a8a1","actor_username":"contact@prodiving.asia","actor_via_sso":false,"log_type":"account"}	2026-04-03 20:32:12.98567+00	
00000000-0000-0000-0000-000000000000	cba38716-48b5-4d55-8b4e-f14c5b22744e	{"action":"login","actor_id":"780bcf0c-f47f-498e-a129-35583df2a8a1","actor_username":"contact@prodiving.asia","actor_via_sso":false,"log_type":"account","traits":{"provider":"email"}}	2026-04-03 20:32:36.238011+00	
00000000-0000-0000-0000-000000000000	718b6683-2d9f-4e8e-8e49-6e8c7ab875f1	{"action":"login","actor_id":"780bcf0c-f47f-498e-a129-35583df2a8a1","actor_username":"contact@prodiving.asia","actor_via_sso":false,"log_type":"account","traits":{"provider":"email"}}	2026-04-03 20:34:39.736495+00	
00000000-0000-0000-0000-000000000000	90f7ac74-f1b2-4fef-9a24-5f11f0fe53f5	{"action":"logout","actor_id":"780bcf0c-f47f-498e-a129-35583df2a8a1","actor_username":"contact@prodiving.asia","actor_via_sso":false,"log_type":"account"}	2026-04-03 20:39:47.41153+00	
00000000-0000-0000-0000-000000000000	9fd23303-6912-47fd-996c-0061adeef419	{"action":"login","actor_id":"780bcf0c-f47f-498e-a129-35583df2a8a1","actor_username":"contact@prodiving.asia","actor_via_sso":false,"log_type":"account","traits":{"provider":"email"}}	2026-04-03 20:40:24.368131+00	
00000000-0000-0000-0000-000000000000	e84a9bd0-66d1-4b65-a922-1489d12222de	{"action":"logout","actor_id":"780bcf0c-f47f-498e-a129-35583df2a8a1","actor_username":"contact@prodiving.asia","actor_via_sso":false,"log_type":"account"}	2026-04-03 20:47:22.487507+00	
00000000-0000-0000-0000-000000000000	102522b0-4b5a-4538-bd64-fe65993c0bf5	{"action":"login","actor_id":"1379a8ab-4fe0-48d4-876e-b6b697c1dc46","actor_username":"bas@divinginasia.com","actor_via_sso":false,"log_type":"account","traits":{"provider":"email"}}	2026-04-03 20:47:56.662086+00	
00000000-0000-0000-0000-000000000000	3b019884-dbbb-4af5-b217-f97f4c1432a3	{"action":"logout","actor_id":"1379a8ab-4fe0-48d4-876e-b6b697c1dc46","actor_username":"bas@divinginasia.com","actor_via_sso":false,"log_type":"account"}	2026-04-03 20:48:15.950858+00	
00000000-0000-0000-0000-000000000000	c2d253f0-3f09-4131-96c4-a9afd6e08206	{"action":"login","actor_id":"1379a8ab-4fe0-48d4-876e-b6b697c1dc46","actor_username":"bas@divinginasia.com","actor_via_sso":false,"log_type":"account","traits":{"provider":"email"}}	2026-04-03 20:48:56.344759+00	
00000000-0000-0000-0000-000000000000	58c713a0-9ebf-45ed-84c7-eb1f4aa03aed	{"action":"logout","actor_id":"1379a8ab-4fe0-48d4-876e-b6b697c1dc46","actor_username":"bas@divinginasia.com","actor_via_sso":false,"log_type":"account"}	2026-04-03 20:51:55.172127+00	
00000000-0000-0000-0000-000000000000	0b1b3719-8abb-4acb-bb29-c9e375e023c0	{"action":"login","actor_id":"1379a8ab-4fe0-48d4-876e-b6b697c1dc46","actor_username":"bas@divinginasia.com","actor_via_sso":false,"log_type":"account","traits":{"provider":"email"}}	2026-04-03 20:52:22.202194+00	
00000000-0000-0000-0000-000000000000	8c032013-071d-4389-b38f-d2b521e131ad	{"action":"logout","actor_id":"1379a8ab-4fe0-48d4-876e-b6b697c1dc46","actor_username":"bas@divinginasia.com","actor_via_sso":false,"log_type":"account"}	2026-04-03 21:10:19.16552+00	
00000000-0000-0000-0000-000000000000	655ceb43-653a-4cd8-b4d1-c95c0a96bd43	{"action":"login","actor_id":"780bcf0c-f47f-498e-a129-35583df2a8a1","actor_username":"contact@prodiving.asia","actor_via_sso":false,"log_type":"account","traits":{"provider":"email"}}	2026-04-03 21:10:28.650807+00	
00000000-0000-0000-0000-000000000000	cc62214d-ab4e-4c3e-ba0c-73c443f7ed64	{"action":"logout","actor_id":"780bcf0c-f47f-498e-a129-35583df2a8a1","actor_username":"contact@prodiving.asia","actor_via_sso":false,"log_type":"account"}	2026-04-03 21:23:02.175035+00	
00000000-0000-0000-0000-000000000000	186b4549-aaa3-4b76-83d4-504543593976	{"action":"login","actor_id":"780bcf0c-f47f-498e-a129-35583df2a8a1","actor_username":"contact@prodiving.asia","actor_via_sso":false,"log_type":"account","traits":{"provider":"email"}}	2026-04-03 21:24:30.047313+00	
00000000-0000-0000-0000-000000000000	bc8b065e-21e6-4df1-a4b2-3bc58cd68920	{"action":"login","actor_id":"780bcf0c-f47f-498e-a129-35583df2a8a1","actor_username":"contact@prodiving.asia","actor_via_sso":false,"log_type":"account","traits":{"provider":"email"}}	2026-04-03 21:59:12.811318+00	
00000000-0000-0000-0000-000000000000	32ee4a12-19e6-460e-88a6-5bfd693ef114	{"action":"login","actor_id":"780bcf0c-f47f-498e-a129-35583df2a8a1","actor_username":"contact@prodiving.asia","actor_via_sso":false,"log_type":"account","traits":{"provider":"email"}}	2026-04-03 22:14:41.857257+00	
00000000-0000-0000-0000-000000000000	e5299375-dddc-4138-849c-c14f1a012c35	{"action":"token_refreshed","actor_id":"780bcf0c-f47f-498e-a129-35583df2a8a1","actor_username":"contact@prodiving.asia","actor_via_sso":false,"log_type":"token"}	2026-04-03 22:23:05.570012+00	
00000000-0000-0000-0000-000000000000	8ffdea65-c76c-4567-834a-3a94405e2927	{"action":"token_revoked","actor_id":"780bcf0c-f47f-498e-a129-35583df2a8a1","actor_username":"contact@prodiving.asia","actor_via_sso":false,"log_type":"token"}	2026-04-03 22:23:05.590536+00	
00000000-0000-0000-0000-000000000000	db6eda64-0372-43d6-9fc0-2f761eded8ac	{"action":"login","actor_id":"780bcf0c-f47f-498e-a129-35583df2a8a1","actor_username":"contact@prodiving.asia","actor_via_sso":false,"log_type":"account","traits":{"provider":"email"}}	2026-04-03 22:49:41.125347+00	
00000000-0000-0000-0000-000000000000	c47c6ed8-a969-4851-b1bd-b7e06e38af03	{"action":"login","actor_id":"d314da05-5a66-49b4-bb53-034981d83690","actor_username":"onemediaasia@duck.com","actor_via_sso":false,"log_type":"account","traits":{"provider":"email"}}	2026-04-03 23:04:40.653428+00	
00000000-0000-0000-0000-000000000000	c65af74d-97a7-4f17-afb1-8ae3a464ce79	{"action":"token_refreshed","actor_id":"780bcf0c-f47f-498e-a129-35583df2a8a1","actor_username":"contact@prodiving.asia","actor_via_sso":false,"log_type":"token"}	2026-04-03 23:16:32.183845+00	
00000000-0000-0000-0000-000000000000	9e5190cc-ab62-4f32-8a2b-a76d6d059c08	{"action":"token_revoked","actor_id":"780bcf0c-f47f-498e-a129-35583df2a8a1","actor_username":"contact@prodiving.asia","actor_via_sso":false,"log_type":"token"}	2026-04-03 23:16:32.207974+00	
00000000-0000-0000-0000-000000000000	8af79737-312f-46f3-9769-4030251be570	{"action":"token_refreshed","actor_id":"780bcf0c-f47f-498e-a129-35583df2a8a1","actor_username":"contact@prodiving.asia","actor_via_sso":false,"log_type":"token"}	2026-04-03 23:21:36.416042+00	
00000000-0000-0000-0000-000000000000	c0b99478-c95b-4fc6-a771-9487f964332e	{"action":"token_revoked","actor_id":"780bcf0c-f47f-498e-a129-35583df2a8a1","actor_username":"contact@prodiving.asia","actor_via_sso":false,"log_type":"token"}	2026-04-03 23:21:36.447846+00	
00000000-0000-0000-0000-000000000000	e6be2f93-1f83-43a2-ab5e-463cfa8b0bba	{"action":"token_refreshed","actor_id":"780bcf0c-f47f-498e-a129-35583df2a8a1","actor_username":"contact@prodiving.asia","actor_via_sso":false,"log_type":"token"}	2026-04-03 23:31:49.554734+00	
00000000-0000-0000-0000-000000000000	a688ff12-9efe-4375-9942-f062b3ae28ec	{"action":"token_revoked","actor_id":"780bcf0c-f47f-498e-a129-35583df2a8a1","actor_username":"contact@prodiving.asia","actor_via_sso":false,"log_type":"token"}	2026-04-03 23:31:49.580433+00	
00000000-0000-0000-0000-000000000000	e67a1372-6240-4cc0-99c2-692fb3d7c8bd	{"action":"login","actor_id":"780bcf0c-f47f-498e-a129-35583df2a8a1","actor_username":"contact@prodiving.asia","actor_via_sso":false,"log_type":"account","traits":{"provider":"email"}}	2026-04-03 23:41:22.770619+00	
00000000-0000-0000-0000-000000000000	02410a61-ec80-427e-bd64-badac128fe41	{"action":"login","actor_id":"780bcf0c-f47f-498e-a129-35583df2a8a1","actor_username":"contact@prodiving.asia","actor_via_sso":false,"log_type":"account","traits":{"provider":"email"}}	2026-04-03 23:48:33.834641+00	
00000000-0000-0000-0000-000000000000	07cf4855-4bc6-4db2-b219-fba51076391c	{"action":"token_refreshed","actor_id":"780bcf0c-f47f-498e-a129-35583df2a8a1","actor_username":"contact@prodiving.asia","actor_via_sso":false,"log_type":"token"}	2026-04-04 00:20:12.19693+00	
00000000-0000-0000-0000-000000000000	33102026-490e-480f-a3f5-dd61368b25d0	{"action":"token_revoked","actor_id":"780bcf0c-f47f-498e-a129-35583df2a8a1","actor_username":"contact@prodiving.asia","actor_via_sso":false,"log_type":"token"}	2026-04-04 00:20:12.22426+00	
00000000-0000-0000-0000-000000000000	a8b9c038-9dab-4769-bec5-d78a19fef44f	{"action":"token_refreshed","actor_id":"780bcf0c-f47f-498e-a129-35583df2a8a1","actor_username":"contact@prodiving.asia","actor_via_sso":false,"log_type":"token"}	2026-04-04 00:39:57.46707+00	
00000000-0000-0000-0000-000000000000	54880d4d-457d-46f5-87d8-e0c5953cb123	{"action":"token_revoked","actor_id":"780bcf0c-f47f-498e-a129-35583df2a8a1","actor_username":"contact@prodiving.asia","actor_via_sso":false,"log_type":"token"}	2026-04-04 00:39:57.503291+00	
00000000-0000-0000-0000-000000000000	8379008b-68d2-401b-a033-fde7d42dfbb1	{"action":"token_refreshed","actor_id":"780bcf0c-f47f-498e-a129-35583df2a8a1","actor_username":"contact@prodiving.asia","actor_via_sso":false,"log_type":"token"}	2026-04-04 00:57:24.089992+00	
00000000-0000-0000-0000-000000000000	a3c17049-8e9a-4ccc-85ea-45fcb6987116	{"action":"token_revoked","actor_id":"780bcf0c-f47f-498e-a129-35583df2a8a1","actor_username":"contact@prodiving.asia","actor_via_sso":false,"log_type":"token"}	2026-04-04 00:57:24.126484+00	
00000000-0000-0000-0000-000000000000	2dae2faa-a1e6-4d8f-b1d8-5e3f274d7c42	{"action":"token_refreshed","actor_id":"780bcf0c-f47f-498e-a129-35583df2a8a1","actor_username":"contact@prodiving.asia","actor_via_sso":false,"log_type":"token"}	2026-04-04 01:18:46.189094+00	
00000000-0000-0000-0000-000000000000	6605a618-97f3-497b-be9c-2eec7814d125	{"action":"token_revoked","actor_id":"780bcf0c-f47f-498e-a129-35583df2a8a1","actor_username":"contact@prodiving.asia","actor_via_sso":false,"log_type":"token"}	2026-04-04 01:18:46.223508+00	
00000000-0000-0000-0000-000000000000	b670911c-3c6a-44a1-bcc4-f47ef4fa7f71	{"action":"token_refreshed","actor_id":"780bcf0c-f47f-498e-a129-35583df2a8a1","actor_username":"contact@prodiving.asia","actor_via_sso":false,"log_type":"token"}	2026-04-04 03:15:45.594005+00	
00000000-0000-0000-0000-000000000000	f5723a28-8eb5-483c-a51a-e6390bc3b789	{"action":"token_revoked","actor_id":"780bcf0c-f47f-498e-a129-35583df2a8a1","actor_username":"contact@prodiving.asia","actor_via_sso":false,"log_type":"token"}	2026-04-04 03:15:45.620615+00	
00000000-0000-0000-0000-000000000000	88b05811-da1e-4f61-840a-c6dcaa4f8273	{"action":"token_refreshed","actor_id":"780bcf0c-f47f-498e-a129-35583df2a8a1","actor_username":"contact@prodiving.asia","actor_via_sso":false,"log_type":"token"}	2026-04-04 03:26:40.773259+00	
00000000-0000-0000-0000-000000000000	331c26a6-0b3d-428b-8ea3-410868fadb7b	{"action":"token_revoked","actor_id":"780bcf0c-f47f-498e-a129-35583df2a8a1","actor_username":"contact@prodiving.asia","actor_via_sso":false,"log_type":"token"}	2026-04-04 03:26:40.795413+00	
00000000-0000-0000-0000-000000000000	222f86dd-b1ed-494c-9471-fec2df8e7364	{"action":"login","actor_id":"780bcf0c-f47f-498e-a129-35583df2a8a1","actor_username":"contact@prodiving.asia","actor_via_sso":false,"log_type":"account","traits":{"provider":"email"}}	2026-04-04 03:31:42.501356+00	
00000000-0000-0000-0000-000000000000	dc262a91-5939-47a5-9643-87445816b544	{"action":"token_refreshed","actor_id":"780bcf0c-f47f-498e-a129-35583df2a8a1","actor_username":"contact@prodiving.asia","actor_via_sso":false,"log_type":"token"}	2026-04-04 03:42:22.724853+00	
00000000-0000-0000-0000-000000000000	c9293aa2-56fe-46aa-97b3-356ae7d60251	{"action":"token_revoked","actor_id":"780bcf0c-f47f-498e-a129-35583df2a8a1","actor_username":"contact@prodiving.asia","actor_via_sso":false,"log_type":"token"}	2026-04-04 03:42:22.753159+00	
00000000-0000-0000-0000-000000000000	23be599d-1175-4858-9c98-82b0f1742019	{"action":"token_refreshed","actor_id":"780bcf0c-f47f-498e-a129-35583df2a8a1","actor_username":"contact@prodiving.asia","actor_via_sso":false,"log_type":"token"}	2026-04-04 04:25:18.183787+00	
00000000-0000-0000-0000-000000000000	20f9bde7-d787-4b74-bbec-2006e1ea995b	{"action":"token_revoked","actor_id":"780bcf0c-f47f-498e-a129-35583df2a8a1","actor_username":"contact@prodiving.asia","actor_via_sso":false,"log_type":"token"}	2026-04-04 04:25:18.211448+00	
00000000-0000-0000-0000-000000000000	ee833e61-2799-4f82-9247-b0854c89e19a	{"action":"token_refreshed","actor_id":"780bcf0c-f47f-498e-a129-35583df2a8a1","actor_username":"contact@prodiving.asia","actor_via_sso":false,"log_type":"token"}	2026-04-04 04:29:42.856916+00	
00000000-0000-0000-0000-000000000000	27068407-d4e0-4b1f-a30e-228db5d232e1	{"action":"token_revoked","actor_id":"780bcf0c-f47f-498e-a129-35583df2a8a1","actor_username":"contact@prodiving.asia","actor_via_sso":false,"log_type":"token"}	2026-04-04 04:29:42.870782+00	
00000000-0000-0000-0000-000000000000	a7db5920-fbbb-4470-af62-594c4ed85626	{"action":"token_refreshed","actor_id":"780bcf0c-f47f-498e-a129-35583df2a8a1","actor_username":"contact@prodiving.asia","actor_via_sso":false,"log_type":"token"}	2026-04-04 04:40:55.60875+00	
00000000-0000-0000-0000-000000000000	c832d27d-6732-4505-bfa7-70169c84b043	{"action":"token_revoked","actor_id":"780bcf0c-f47f-498e-a129-35583df2a8a1","actor_username":"contact@prodiving.asia","actor_via_sso":false,"log_type":"token"}	2026-04-04 04:40:55.634571+00	
00000000-0000-0000-0000-000000000000	b884e3cc-e41c-4a0f-befe-42c45f46f479	{"action":"token_refreshed","actor_id":"780bcf0c-f47f-498e-a129-35583df2a8a1","actor_username":"contact@prodiving.asia","actor_via_sso":false,"log_type":"token"}	2026-04-04 05:27:49.015691+00	
00000000-0000-0000-0000-000000000000	3dade46f-f3c5-4222-a8a1-ce7f1e4fbe4a	{"action":"token_revoked","actor_id":"780bcf0c-f47f-498e-a129-35583df2a8a1","actor_username":"contact@prodiving.asia","actor_via_sso":false,"log_type":"token"}	2026-04-04 05:27:49.036024+00	
00000000-0000-0000-0000-000000000000	2beec555-a187-47ce-9548-e86082d0bfb7	{"action":"token_refreshed","actor_id":"780bcf0c-f47f-498e-a129-35583df2a8a1","actor_username":"contact@prodiving.asia","actor_via_sso":false,"log_type":"token"}	2026-04-04 06:26:26.655418+00	
00000000-0000-0000-0000-000000000000	367275d1-3533-49ef-8448-a528dbf10e45	{"action":"token_revoked","actor_id":"780bcf0c-f47f-498e-a129-35583df2a8a1","actor_username":"contact@prodiving.asia","actor_via_sso":false,"log_type":"token"}	2026-04-04 06:26:26.683328+00	
00000000-0000-0000-0000-000000000000	6cc0671b-125e-4a05-b360-de062fc4251d	{"action":"token_refreshed","actor_id":"780bcf0c-f47f-498e-a129-35583df2a8a1","actor_username":"contact@prodiving.asia","actor_via_sso":false,"log_type":"token"}	2026-04-04 06:27:20.285176+00	
00000000-0000-0000-0000-000000000000	7fa6894c-f68e-47af-b634-77a7f888d5a6	{"action":"token_revoked","actor_id":"780bcf0c-f47f-498e-a129-35583df2a8a1","actor_username":"contact@prodiving.asia","actor_via_sso":false,"log_type":"token"}	2026-04-04 06:27:20.295944+00	
00000000-0000-0000-0000-000000000000	03a6f8c8-107a-4298-9a97-8e2b96ca43ae	{"action":"token_refreshed","actor_id":"780bcf0c-f47f-498e-a129-35583df2a8a1","actor_username":"contact@prodiving.asia","actor_via_sso":false,"log_type":"token"}	2026-04-04 07:24:58.273596+00	
00000000-0000-0000-0000-000000000000	8a948d4d-88c2-4c90-9027-adaea303629e	{"action":"token_revoked","actor_id":"780bcf0c-f47f-498e-a129-35583df2a8a1","actor_username":"contact@prodiving.asia","actor_via_sso":false,"log_type":"token"}	2026-04-04 07:24:58.308694+00	
00000000-0000-0000-0000-000000000000	5fc4d894-03a3-4ae9-89ea-35eb6e99b56d	{"action":"token_refreshed","actor_id":"780bcf0c-f47f-498e-a129-35583df2a8a1","actor_username":"contact@prodiving.asia","actor_via_sso":false,"log_type":"token"}	2026-04-04 07:25:54.521422+00	
00000000-0000-0000-0000-000000000000	4408f289-9e88-41d2-a2c6-c06ae974407b	{"action":"token_revoked","actor_id":"780bcf0c-f47f-498e-a129-35583df2a8a1","actor_username":"contact@prodiving.asia","actor_via_sso":false,"log_type":"token"}	2026-04-04 07:25:54.533557+00	
00000000-0000-0000-0000-000000000000	5b9126b7-ca96-4678-8a00-3d81430b17b0	{"action":"token_refreshed","actor_id":"780bcf0c-f47f-498e-a129-35583df2a8a1","actor_username":"contact@prodiving.asia","actor_via_sso":false,"log_type":"token"}	2026-04-04 08:24:09.327983+00	
00000000-0000-0000-0000-000000000000	ac838585-036d-4482-a137-22181e4aefe6	{"action":"token_revoked","actor_id":"780bcf0c-f47f-498e-a129-35583df2a8a1","actor_username":"contact@prodiving.asia","actor_via_sso":false,"log_type":"token"}	2026-04-04 08:24:09.363426+00	
00000000-0000-0000-0000-000000000000	9275488d-7cb5-479e-9d53-2ab8af64035c	{"action":"logout","actor_id":"780bcf0c-f47f-498e-a129-35583df2a8a1","actor_username":"contact@prodiving.asia","actor_via_sso":false,"log_type":"account"}	2026-04-04 08:52:24.60978+00	
00000000-0000-0000-0000-000000000000	00efe735-0615-4a55-bb7b-d6ba5ffead81	{"action":"login","actor_id":"780bcf0c-f47f-498e-a129-35583df2a8a1","actor_username":"contact@prodiving.asia","actor_via_sso":false,"log_type":"account","traits":{"provider":"email"}}	2026-04-04 09:04:42.860112+00	
00000000-0000-0000-0000-000000000000	aeff0547-d25d-4d20-9988-7c51d5b3995c	{"action":"logout","actor_id":"780bcf0c-f47f-498e-a129-35583df2a8a1","actor_username":"contact@prodiving.asia","actor_via_sso":false,"log_type":"account"}	2026-04-04 09:07:33.199733+00	
00000000-0000-0000-0000-000000000000	9c102b44-b354-4d78-b898-ab3753376e74	{"action":"login","actor_id":"1379a8ab-4fe0-48d4-876e-b6b697c1dc46","actor_username":"bas@divinginasia.com","actor_via_sso":false,"log_type":"account","traits":{"provider":"email"}}	2026-04-04 09:07:50.045756+00	
00000000-0000-0000-0000-000000000000	e0fd5f97-1a36-4db3-9801-ec415f4af61e	{"action":"logout","actor_id":"1379a8ab-4fe0-48d4-876e-b6b697c1dc46","actor_username":"bas@divinginasia.com","actor_via_sso":false,"log_type":"account"}	2026-04-04 09:08:11.195976+00	
00000000-0000-0000-0000-000000000000	ce6960c1-63c2-4b67-952a-722f29f6acba	{"action":"login","actor_id":"1379a8ab-4fe0-48d4-876e-b6b697c1dc46","actor_username":"bas@divinginasia.com","actor_via_sso":false,"log_type":"account","traits":{"provider":"email"}}	2026-04-04 09:08:25.5678+00	
00000000-0000-0000-0000-000000000000	2618675c-7b97-483d-ba7f-e704202caeff	{"action":"logout","actor_id":"1379a8ab-4fe0-48d4-876e-b6b697c1dc46","actor_username":"bas@divinginasia.com","actor_via_sso":false,"log_type":"account"}	2026-04-04 09:08:31.627075+00	
00000000-0000-0000-0000-000000000000	ff94a9a8-d7c5-4e3a-98fb-e5398449b020	{"action":"login","actor_id":"1379a8ab-4fe0-48d4-876e-b6b697c1dc46","actor_username":"bas@divinginasia.com","actor_via_sso":false,"log_type":"account","traits":{"provider":"email"}}	2026-04-04 09:17:25.023608+00	
00000000-0000-0000-0000-000000000000	52e743f4-6a9d-4f02-b8cc-d901dee31b99	{"action":"login","actor_id":"780bcf0c-f47f-498e-a129-35583df2a8a1","actor_username":"contact@prodiving.asia","actor_via_sso":false,"log_type":"account","traits":{"provider":"email"}}	2026-04-04 09:19:58.92497+00	
00000000-0000-0000-0000-000000000000	a66a4c96-5c95-4c8b-b4f5-5b6e0eb7ffde	{"action":"login","actor_id":"780bcf0c-f47f-498e-a129-35583df2a8a1","actor_username":"contact@prodiving.asia","actor_via_sso":false,"log_type":"account","traits":{"provider":"email"}}	2026-04-04 09:26:38.315828+00	
00000000-0000-0000-0000-000000000000	66d12659-68f2-462f-990a-0d77dfc7f6f3	{"action":"login","actor_id":"780bcf0c-f47f-498e-a129-35583df2a8a1","actor_username":"contact@prodiving.asia","actor_via_sso":false,"log_type":"account","traits":{"provider":"email"}}	2026-04-04 09:27:40.608526+00	
00000000-0000-0000-0000-000000000000	b5236e23-9d63-49ed-9612-0fc7d3671b63	{"action":"login","actor_id":"780bcf0c-f47f-498e-a129-35583df2a8a1","actor_username":"contact@prodiving.asia","actor_via_sso":false,"log_type":"account","traits":{"provider":"email"}}	2026-04-04 09:29:37.990094+00	
00000000-0000-0000-0000-000000000000	76ce2c97-123f-48b0-9b0b-94f55955817d	{"action":"token_refreshed","actor_id":"1379a8ab-4fe0-48d4-876e-b6b697c1dc46","actor_username":"bas@divinginasia.com","actor_via_sso":false,"log_type":"token"}	2026-04-04 10:15:57.079899+00	
00000000-0000-0000-0000-000000000000	1d4ca162-0b25-4b38-b4b3-03711fda2536	{"action":"token_revoked","actor_id":"1379a8ab-4fe0-48d4-876e-b6b697c1dc46","actor_username":"bas@divinginasia.com","actor_via_sso":false,"log_type":"token"}	2026-04-04 10:15:57.106106+00	
00000000-0000-0000-0000-000000000000	9069ea14-73d4-4d52-bc64-e805a92d4218	{"action":"token_refreshed","actor_id":"780bcf0c-f47f-498e-a129-35583df2a8a1","actor_username":"contact@prodiving.asia","actor_via_sso":false,"log_type":"token"}	2026-04-04 10:29:05.980241+00	
00000000-0000-0000-0000-000000000000	41efa71c-4995-4c3e-b329-7d58153b2500	{"action":"token_revoked","actor_id":"780bcf0c-f47f-498e-a129-35583df2a8a1","actor_username":"contact@prodiving.asia","actor_via_sso":false,"log_type":"token"}	2026-04-04 10:29:06.005622+00	
00000000-0000-0000-0000-000000000000	b2fa8ee9-4fa5-4cab-a05e-776d55a30bdb	{"action":"token_refreshed","actor_id":"780bcf0c-f47f-498e-a129-35583df2a8a1","actor_username":"contact@prodiving.asia","actor_via_sso":false,"log_type":"token"}	2026-04-04 10:49:52.704136+00	
00000000-0000-0000-0000-000000000000	63c68a27-5abb-4573-9066-96f63eb43809	{"action":"token_revoked","actor_id":"780bcf0c-f47f-498e-a129-35583df2a8a1","actor_username":"contact@prodiving.asia","actor_via_sso":false,"log_type":"token"}	2026-04-04 10:49:52.729505+00	
00000000-0000-0000-0000-000000000000	b9f51a52-380e-417f-bc9c-8ae94698adc5	{"action":"token_refreshed","actor_id":"780bcf0c-f47f-498e-a129-35583df2a8a1","actor_username":"contact@prodiving.asia","actor_via_sso":false,"log_type":"token"}	2026-04-04 12:07:22.799367+00	
00000000-0000-0000-0000-000000000000	16609a24-96e4-49f5-b1bb-f515713ffc1d	{"action":"token_revoked","actor_id":"780bcf0c-f47f-498e-a129-35583df2a8a1","actor_username":"contact@prodiving.asia","actor_via_sso":false,"log_type":"token"}	2026-04-04 12:07:22.824964+00	
00000000-0000-0000-0000-000000000000	46a48bd5-860e-4d13-8569-a6be632588b4	{"action":"token_refreshed","actor_id":"780bcf0c-f47f-498e-a129-35583df2a8a1","actor_username":"contact@prodiving.asia","actor_via_sso":false,"log_type":"token"}	2026-04-04 13:06:14.15655+00	
00000000-0000-0000-0000-000000000000	6fdfd29e-8b82-492a-a4d3-c31679a56e45	{"action":"token_revoked","actor_id":"780bcf0c-f47f-498e-a129-35583df2a8a1","actor_username":"contact@prodiving.asia","actor_via_sso":false,"log_type":"token"}	2026-04-04 13:06:14.172499+00	
00000000-0000-0000-0000-000000000000	170d1b4e-9572-4d40-8d70-861fe4ae1d69	{"action":"token_refreshed","actor_id":"780bcf0c-f47f-498e-a129-35583df2a8a1","actor_username":"contact@prodiving.asia","actor_via_sso":false,"log_type":"token"}	2026-04-04 14:40:36.750169+00	
00000000-0000-0000-0000-000000000000	b80b32a8-5979-46e4-9f19-1dbfd42af046	{"action":"token_revoked","actor_id":"780bcf0c-f47f-498e-a129-35583df2a8a1","actor_username":"contact@prodiving.asia","actor_via_sso":false,"log_type":"token"}	2026-04-04 14:40:36.777928+00	
00000000-0000-0000-0000-000000000000	575c04ec-23d8-4a33-8ab4-46293c14f0ad	{"action":"token_refreshed","actor_id":"1379a8ab-4fe0-48d4-876e-b6b697c1dc46","actor_username":"bas@divinginasia.com","actor_via_sso":false,"log_type":"token"}	2026-04-04 14:40:38.956817+00	
00000000-0000-0000-0000-000000000000	d25692fd-1be5-4363-af97-a68f5b29e3a0	{"action":"token_revoked","actor_id":"1379a8ab-4fe0-48d4-876e-b6b697c1dc46","actor_username":"bas@divinginasia.com","actor_via_sso":false,"log_type":"token"}	2026-04-04 14:40:38.958971+00	
00000000-0000-0000-0000-000000000000	3043fac9-0a85-43fc-8922-71379060dd15	{"action":"logout","actor_id":"1379a8ab-4fe0-48d4-876e-b6b697c1dc46","actor_username":"bas@divinginasia.com","actor_via_sso":false,"log_type":"account"}	2026-04-04 15:00:10.45999+00	
00000000-0000-0000-0000-000000000000	f25c5d12-a17a-4810-9ae5-e35e0507cbe2	{"action":"login","actor_id":"780bcf0c-f47f-498e-a129-35583df2a8a1","actor_username":"contact@prodiving.asia","actor_via_sso":false,"log_type":"account","traits":{"provider":"email"}}	2026-04-04 15:00:27.2594+00	
00000000-0000-0000-0000-000000000000	994398e5-c445-43b7-857b-b5d9ae5beff9	{"action":"token_refreshed","actor_id":"780bcf0c-f47f-498e-a129-35583df2a8a1","actor_username":"contact@prodiving.asia","actor_via_sso":false,"log_type":"token"}	2026-04-04 15:42:37.107274+00	
00000000-0000-0000-0000-000000000000	695c13e3-de34-4537-b70f-533828c53ca2	{"action":"token_revoked","actor_id":"780bcf0c-f47f-498e-a129-35583df2a8a1","actor_username":"contact@prodiving.asia","actor_via_sso":false,"log_type":"token"}	2026-04-04 15:42:37.139776+00	
00000000-0000-0000-0000-000000000000	eb81f4a2-6f6a-4904-bc50-1bbf4822045b	{"action":"token_refreshed","actor_id":"780bcf0c-f47f-498e-a129-35583df2a8a1","actor_username":"contact@prodiving.asia","actor_via_sso":false,"log_type":"token"}	2026-04-04 15:52:19.114317+00	
00000000-0000-0000-0000-000000000000	5379eeb2-e228-4472-b848-f3fa90845922	{"action":"token_revoked","actor_id":"780bcf0c-f47f-498e-a129-35583df2a8a1","actor_username":"contact@prodiving.asia","actor_via_sso":false,"log_type":"token"}	2026-04-04 15:52:19.37413+00	
00000000-0000-0000-0000-000000000000	e8be9463-7725-472c-b510-193b444fc22b	{"action":"token_refreshed","actor_id":"780bcf0c-f47f-498e-a129-35583df2a8a1","actor_username":"contact@prodiving.asia","actor_via_sso":false,"log_type":"token"}	2026-04-04 15:53:12.55068+00	
00000000-0000-0000-0000-000000000000	cb73c125-387a-4a7b-b762-29cba29d5953	{"action":"token_revoked","actor_id":"780bcf0c-f47f-498e-a129-35583df2a8a1","actor_username":"contact@prodiving.asia","actor_via_sso":false,"log_type":"token"}	2026-04-04 15:53:12.566742+00	
00000000-0000-0000-0000-000000000000	e1c1a09a-9e4b-4d19-b328-99101fa78bc3	{"action":"token_refreshed","actor_id":"780bcf0c-f47f-498e-a129-35583df2a8a1","actor_username":"contact@prodiving.asia","actor_via_sso":false,"log_type":"token"}	2026-04-04 15:58:57.899543+00	
00000000-0000-0000-0000-000000000000	f6658306-aefe-4f10-916f-b2d97aa709b5	{"action":"token_revoked","actor_id":"780bcf0c-f47f-498e-a129-35583df2a8a1","actor_username":"contact@prodiving.asia","actor_via_sso":false,"log_type":"token"}	2026-04-04 15:58:57.919324+00	
00000000-0000-0000-0000-000000000000	6a977c85-b56c-467a-8a59-be3320da6cf7	{"action":"token_refreshed","actor_id":"780bcf0c-f47f-498e-a129-35583df2a8a1","actor_username":"contact@prodiving.asia","actor_via_sso":false,"log_type":"token"}	2026-04-04 16:50:50.375022+00	
00000000-0000-0000-0000-000000000000	213c42ac-2b79-469d-887f-c07b94d3aa44	{"action":"token_revoked","actor_id":"780bcf0c-f47f-498e-a129-35583df2a8a1","actor_username":"contact@prodiving.asia","actor_via_sso":false,"log_type":"token"}	2026-04-04 16:50:50.400353+00	
00000000-0000-0000-0000-000000000000	6754d1a6-59dd-4f9f-950b-70196287faf6	{"action":"token_refreshed","actor_id":"780bcf0c-f47f-498e-a129-35583df2a8a1","actor_username":"contact@prodiving.asia","actor_via_sso":false,"log_type":"token"}	2026-04-04 16:57:31.960923+00	
00000000-0000-0000-0000-000000000000	77bb6f5e-41cf-4fe8-8920-7ccb403d6531	{"action":"token_revoked","actor_id":"780bcf0c-f47f-498e-a129-35583df2a8a1","actor_username":"contact@prodiving.asia","actor_via_sso":false,"log_type":"token"}	2026-04-04 16:57:31.977148+00	
00000000-0000-0000-0000-000000000000	fe0b4df3-8c61-4d3e-94c5-79b3a8b7187d	{"action":"token_refreshed","actor_id":"780bcf0c-f47f-498e-a129-35583df2a8a1","actor_username":"contact@prodiving.asia","actor_via_sso":false,"log_type":"token"}	2026-04-04 16:57:48.16666+00	
00000000-0000-0000-0000-000000000000	4c04f96c-fb94-4b00-a080-6899ddf985be	{"action":"token_revoked","actor_id":"780bcf0c-f47f-498e-a129-35583df2a8a1","actor_username":"contact@prodiving.asia","actor_via_sso":false,"log_type":"token"}	2026-04-04 16:57:48.168793+00	
00000000-0000-0000-0000-000000000000	1918c612-2e77-4943-bdf2-bc3cc1d62b08	{"action":"logout","actor_id":"780bcf0c-f47f-498e-a129-35583df2a8a1","actor_username":"contact@prodiving.asia","actor_via_sso":false,"log_type":"account"}	2026-04-04 17:51:52.277895+00	
00000000-0000-0000-0000-000000000000	839f5840-cf12-4f08-be16-ce2add7478e2	{"action":"login","actor_id":"780bcf0c-f47f-498e-a129-35583df2a8a1","actor_username":"contact@prodiving.asia","actor_via_sso":false,"log_type":"account","traits":{"provider":"email"}}	2026-04-04 17:52:21.352196+00	
00000000-0000-0000-0000-000000000000	be136173-0fcc-4605-9d6f-efa75a2f7bc1	{"action":"login","actor_id":"780bcf0c-f47f-498e-a129-35583df2a8a1","actor_username":"contact@prodiving.asia","actor_via_sso":false,"log_type":"account","traits":{"provider":"email"}}	2026-04-04 17:54:52.141233+00	
\.


--
-- TOC entry 4694 (class 0 OID 19403)
-- Dependencies: 402
-- Data for Name: custom_oauth_providers; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--

COPY auth.custom_oauth_providers (id, provider_type, identifier, name, client_id, client_secret, acceptable_client_ids, scopes, pkce_enabled, attribute_mapping, authorization_params, enabled, email_optional, issuer, discovery_url, skip_nonce_check, cached_discovery, discovery_cached_at, authorization_url, token_url, userinfo_url, jwks_uri, created_at, updated_at) FROM stdin;
\.


--
-- TOC entry 4672 (class 0 OID 16883)
-- Dependencies: 376
-- Data for Name: flow_state; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--

COPY auth.flow_state (id, user_id, auth_code, code_challenge_method, code_challenge, provider_type, provider_access_token, provider_refresh_token, created_at, updated_at, authentication_method, auth_code_issued_at, invite_token, referrer, oauth_client_state_id, linking_target_id, email_optional) FROM stdin;
\.


--
-- TOC entry 4663 (class 0 OID 16681)
-- Dependencies: 367
-- Data for Name: identities; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--

COPY auth.identities (provider_id, user_id, identity_data, provider, last_sign_in_at, created_at, updated_at, id) FROM stdin;
3a679996-7773-4b9b-a3fe-93c031266ef9	3a679996-7773-4b9b-a3fe-93c031266ef9	{"sub": "3a679996-7773-4b9b-a3fe-93c031266ef9", "email": "peter@onemedia.asia", "email_verified": false, "phone_verified": false}	email	2026-02-23 19:06:16.790149+00	2026-02-23 19:06:16.790712+00	2026-02-23 19:06:16.790712+00	7d510fd5-5dc0-431e-a143-f3fb4fda6e61
d314da05-5a66-49b4-bb53-034981d83690	d314da05-5a66-49b4-bb53-034981d83690	{"sub": "d314da05-5a66-49b4-bb53-034981d83690", "email": "onemediaasia@duck.com", "email_verified": false, "phone_verified": false}	email	2026-03-06 03:23:01.971188+00	2026-03-06 03:23:01.971237+00	2026-03-06 03:23:01.971237+00	29792d2d-69b0-4b5c-9d48-75c1b66d1cf8
780bcf0c-f47f-498e-a129-35583df2a8a1	780bcf0c-f47f-498e-a129-35583df2a8a1	{"sub": "780bcf0c-f47f-498e-a129-35583df2a8a1", "email": "contact@prodiving.asia", "email_verified": true, "phone_verified": false}	email	2026-03-08 10:34:57.467606+00	2026-03-08 10:34:57.467657+00	2026-03-08 10:34:57.467657+00	d1aa6d14-63a5-480a-bb4f-7444a8acb442
72346843-d7ff-4a0e-bc28-007db9c763f3	72346843-d7ff-4a0e-bc28-007db9c763f3	{"sub": "72346843-d7ff-4a0e-bc28-007db9c763f3", "email": "petergreaney@gmail.com", "email_verified": true, "phone_verified": false}	email	2026-03-09 17:32:38.118637+00	2026-03-09 17:32:38.118689+00	2026-03-09 17:32:38.118689+00	654becb0-ad8e-48d9-9ac5-5920cc022cc7
1379a8ab-4fe0-48d4-876e-b6b697c1dc46	1379a8ab-4fe0-48d4-876e-b6b697c1dc46	{"sub": "1379a8ab-4fe0-48d4-876e-b6b697c1dc46", "email": "bas@divinginasia.com", "email_verified": false, "phone_verified": false}	email	2026-04-03 20:04:23.651747+00	2026-04-03 20:04:23.651807+00	2026-04-03 20:04:23.651807+00	84b8675f-885b-4ead-ad2c-795fe4967b81
\.


--
-- TOC entry 4660 (class 0 OID 16522)
-- Dependencies: 361
-- Data for Name: instances; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--

COPY auth.instances (id, uuid, raw_base_config, created_at, updated_at) FROM stdin;
\.


--
-- TOC entry 4667 (class 0 OID 16770)
-- Dependencies: 371
-- Data for Name: mfa_amr_claims; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--

COPY auth.mfa_amr_claims (session_id, created_at, updated_at, authentication_method, id) FROM stdin;
817d44a6-6627-4aa1-af79-37f439e139e8	2026-03-08 10:54:36.325849+00	2026-03-08 10:54:36.325849+00	password	d87e8c99-dc0e-4668-8956-fe57927d5872
96276606-8915-4b95-915b-1d29c14e60f9	2026-03-08 11:01:22.101732+00	2026-03-08 11:01:22.101732+00	password	bf2f62bd-e538-4523-bc60-bbf6ee30e927
2370c64d-7ab0-4b89-8e15-c3623296eb89	2026-03-16 14:01:43.94604+00	2026-03-16 14:01:43.94604+00	password	9c62fa2a-e2a8-441f-b8ad-1f25d501ee7f
6bb3fe0e-d46e-4fd4-960a-7c173a93f0af	2026-03-09 17:32:53.219101+00	2026-03-09 17:32:53.219101+00	otp	f35039ba-ed6e-46b8-ab33-24d07090919a
815825ae-7917-4f88-a473-5d4356345cb4	2026-04-04 17:52:21.421852+00	2026-04-04 17:52:21.421852+00	password	ab733c73-d4ec-4a3a-850a-23f84688e47b
c475dcef-b1ed-4887-9b42-0ee9ccf81b4c	2026-04-04 17:54:52.249077+00	2026-04-04 17:54:52.249077+00	password	b8e2343f-c7c6-4afb-ac24-d0b9659cd73e
e134ff0c-f285-4787-a9ef-7a6b7789c63b	2026-04-03 20:30:15.849724+00	2026-04-03 20:30:15.849724+00	password	a3f42e5f-c960-4d59-843e-77c24f073e3e
41bf5fed-f4d8-469d-8461-061e3235788a	2026-04-03 23:04:40.741175+00	2026-04-03 23:04:40.741175+00	password	338c7831-8af4-4914-be03-caa8806aa33d
\.


--
-- TOC entry 4666 (class 0 OID 16758)
-- Dependencies: 370
-- Data for Name: mfa_challenges; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--

COPY auth.mfa_challenges (id, factor_id, created_at, verified_at, ip_address, otp_code, web_authn_session_data) FROM stdin;
\.


--
-- TOC entry 4665 (class 0 OID 16745)
-- Dependencies: 369
-- Data for Name: mfa_factors; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--

COPY auth.mfa_factors (id, user_id, friendly_name, factor_type, status, created_at, updated_at, secret, phone, last_challenged_at, web_authn_credential, web_authn_aaguid, last_webauthn_challenge_data) FROM stdin;
\.


--
-- TOC entry 4675 (class 0 OID 16995)
-- Dependencies: 379
-- Data for Name: oauth_authorizations; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--

COPY auth.oauth_authorizations (id, authorization_id, client_id, user_id, redirect_uri, scope, state, resource, code_challenge, code_challenge_method, response_type, status, authorization_code, created_at, expires_at, approved_at, nonce) FROM stdin;
\.


--
-- TOC entry 4677 (class 0 OID 17068)
-- Dependencies: 381
-- Data for Name: oauth_client_states; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--

COPY auth.oauth_client_states (id, provider_type, code_verifier, created_at) FROM stdin;
\.


--
-- TOC entry 4674 (class 0 OID 16965)
-- Dependencies: 378
-- Data for Name: oauth_clients; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--

COPY auth.oauth_clients (id, client_secret_hash, registration_type, redirect_uris, grant_types, client_name, client_uri, logo_uri, created_at, updated_at, deleted_at, client_type, token_endpoint_auth_method) FROM stdin;
\.


--
-- TOC entry 4676 (class 0 OID 17028)
-- Dependencies: 380
-- Data for Name: oauth_consents; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--

COPY auth.oauth_consents (id, user_id, client_id, scopes, granted_at, revoked_at) FROM stdin;
\.


--
-- TOC entry 4673 (class 0 OID 16933)
-- Dependencies: 377
-- Data for Name: one_time_tokens; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--

COPY auth.one_time_tokens (id, user_id, token_type, token_hash, relates_to, created_at, updated_at) FROM stdin;
\.


--
-- TOC entry 4659 (class 0 OID 16511)
-- Dependencies: 360
-- Data for Name: refresh_tokens; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--

COPY auth.refresh_tokens (instance_id, id, token, user_id, revoked, created_at, updated_at, parent, session_id) FROM stdin;
00000000-0000-0000-0000-000000000000	451	nswqmvhimj4x	3a679996-7773-4b9b-a3fe-93c031266ef9	t	2026-03-16 14:01:43.932041+00	2026-03-21 15:31:39.201553+00	\N	2370c64d-7ab0-4b89-8e15-c3623296eb89
00000000-0000-0000-0000-000000000000	931	rq6ygo3kkdzz	d314da05-5a66-49b4-bb53-034981d83690	f	2026-04-03 23:04:40.703064+00	2026-04-03 23:04:40.703064+00	\N	41bf5fed-f4d8-469d-8461-061e3235788a
00000000-0000-0000-0000-000000000000	250	jxxliienmnz7	3a679996-7773-4b9b-a3fe-93c031266ef9	f	2026-03-08 11:01:22.080073+00	2026-03-08 11:01:22.080073+00	\N	96276606-8915-4b95-915b-1d29c14e60f9
00000000-0000-0000-0000-000000000000	261	r5smx6vbeoe3	72346843-d7ff-4a0e-bc28-007db9c763f3	f	2026-03-09 17:32:53.202778+00	2026-03-09 17:32:53.202778+00	\N	6bb3fe0e-d46e-4fd4-960a-7c173a93f0af
00000000-0000-0000-0000-000000000000	978	qhnbwq5viz6k	780bcf0c-f47f-498e-a129-35583df2a8a1	f	2026-04-04 17:54:52.216922+00	2026-04-04 17:54:52.216922+00	\N	c475dcef-b1ed-4887-9b42-0ee9ccf81b4c
00000000-0000-0000-0000-000000000000	582	o7oczuvswnyd	3a679996-7773-4b9b-a3fe-93c031266ef9	f	2026-03-21 15:31:39.201922+00	2026-03-21 15:31:39.201922+00	nswqmvhimj4x	2370c64d-7ab0-4b89-8e15-c3623296eb89
00000000-0000-0000-0000-000000000000	248	xirvyk5i3rpo	3a679996-7773-4b9b-a3fe-93c031266ef9	f	2026-03-08 10:54:36.277145+00	2026-03-08 10:54:36.277145+00	\N	817d44a6-6627-4aa1-af79-37f439e139e8
00000000-0000-0000-0000-000000000000	977	tyx5ignrdtsh	780bcf0c-f47f-498e-a129-35583df2a8a1	f	2026-04-04 17:52:21.390948+00	2026-04-04 17:52:21.390948+00	\N	815825ae-7917-4f88-a473-5d4356345cb4
00000000-0000-0000-0000-000000000000	917	2p3cdki5arwn	d314da05-5a66-49b4-bb53-034981d83690	f	2026-04-03 20:30:15.823449+00	2026-04-03 20:30:15.823449+00	\N	e134ff0c-f285-4787-a9ef-7a6b7789c63b
\.


--
-- TOC entry 4670 (class 0 OID 16812)
-- Dependencies: 374
-- Data for Name: saml_providers; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--

COPY auth.saml_providers (id, sso_provider_id, entity_id, metadata_xml, metadata_url, attribute_mapping, created_at, updated_at, name_id_format) FROM stdin;
\.


--
-- TOC entry 4671 (class 0 OID 16830)
-- Dependencies: 375
-- Data for Name: saml_relay_states; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--

COPY auth.saml_relay_states (id, sso_provider_id, request_id, for_email, redirect_to, created_at, updated_at, flow_state_id) FROM stdin;
\.


--
-- TOC entry 4662 (class 0 OID 16537)
-- Dependencies: 363
-- Data for Name: schema_migrations; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--

COPY auth.schema_migrations (version) FROM stdin;
20171026211738
20171026211808
20171026211834
20180103212743
20180108183307
20180119214651
20180125194653
00
20210710035447
20210722035447
20210730183235
20210909172000
20210927181326
20211122151130
20211124214934
20211202183645
20220114185221
20220114185340
20220224000811
20220323170000
20220429102000
20220531120530
20220614074223
20220811173540
20221003041349
20221003041400
20221011041400
20221020193600
20221021073300
20221021082433
20221027105023
20221114143122
20221114143410
20221125140132
20221208132122
20221215195500
20221215195800
20221215195900
20230116124310
20230116124412
20230131181311
20230322519590
20230402418590
20230411005111
20230508135423
20230523124323
20230818113222
20230914180801
20231027141322
20231114161723
20231117164230
20240115144230
20240214120130
20240306115329
20240314092811
20240427152123
20240612123726
20240729123726
20240802193726
20240806073726
20241009103726
20250717082212
20250731150234
20250804100000
20250901200500
20250903112500
20250904133000
20250925093508
20251007112900
20251104100000
20251111201300
20251201000000
20260115000000
20260121000000
20260219120000
20260302000000
\.


--
-- TOC entry 4664 (class 0 OID 16711)
-- Dependencies: 368
-- Data for Name: sessions; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--

COPY auth.sessions (id, user_id, created_at, updated_at, factor_id, aal, not_after, refreshed_at, user_agent, ip, tag, oauth_client_id, refresh_token_hmac_key, refresh_token_counter, scopes) FROM stdin;
6bb3fe0e-d46e-4fd4-960a-7c173a93f0af	72346843-d7ff-4a0e-bc28-007db9c763f3	2026-03-09 17:32:53.185788+00	2026-03-09 17:32:53.185788+00	\N	aal1	\N	\N	Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/145.0.0.0 Safari/537.36	101.128.99.146	\N	\N	\N	\N	\N
2370c64d-7ab0-4b89-8e15-c3623296eb89	3a679996-7773-4b9b-a3fe-93c031266ef9	2026-03-16 14:01:43.923656+00	2026-03-21 15:31:39.208615+00	\N	aal1	\N	2026-03-21 15:31:39.208517	Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/145.0.0.0 Safari/537.36	101.128.96.234	\N	\N	\N	\N	\N
817d44a6-6627-4aa1-af79-37f439e139e8	3a679996-7773-4b9b-a3fe-93c031266ef9	2026-03-08 10:54:36.184611+00	2026-03-08 10:54:36.184611+00	\N	aal1	\N	\N	Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/145.0.0.0 Safari/537.36	101.128.99.146	\N	\N	\N	\N	\N
96276606-8915-4b95-915b-1d29c14e60f9	3a679996-7773-4b9b-a3fe-93c031266ef9	2026-03-08 11:01:22.06219+00	2026-03-08 11:01:22.06219+00	\N	aal1	\N	\N	Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/145.0.0.0 Safari/537.36	101.128.99.146	\N	\N	\N	\N	\N
815825ae-7917-4f88-a473-5d4356345cb4	780bcf0c-f47f-498e-a129-35583df2a8a1	2026-04-04 17:52:21.365636+00	2026-04-04 17:52:21.365636+00	\N	aal1	\N	\N	Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/146.0.0.0 Safari/537.36	101.128.99.38	\N	\N	\N	\N	\N
c475dcef-b1ed-4887-9b42-0ee9ccf81b4c	780bcf0c-f47f-498e-a129-35583df2a8a1	2026-04-04 17:54:52.175322+00	2026-04-04 17:54:52.175322+00	\N	aal1	\N	\N	Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/146.0.0.0 Safari/537.36	101.128.99.38	\N	\N	\N	\N	\N
41bf5fed-f4d8-469d-8461-061e3235788a	d314da05-5a66-49b4-bb53-034981d83690	2026-04-03 23:04:40.678316+00	2026-04-03 23:04:40.678316+00	\N	aal1	\N	\N	Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/146.0.0.0 Safari/537.36	101.128.99.38	\N	\N	\N	\N	\N
e134ff0c-f285-4787-a9ef-7a6b7789c63b	d314da05-5a66-49b4-bb53-034981d83690	2026-04-03 20:30:15.804667+00	2026-04-03 20:30:15.804667+00	\N	aal1	\N	\N	Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/146.0.0.0 Safari/537.36	101.128.99.38	\N	\N	\N	\N	\N
\.


--
-- TOC entry 4669 (class 0 OID 16797)
-- Dependencies: 373
-- Data for Name: sso_domains; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--

COPY auth.sso_domains (id, sso_provider_id, domain, created_at, updated_at) FROM stdin;
\.


--
-- TOC entry 4668 (class 0 OID 16788)
-- Dependencies: 372
-- Data for Name: sso_providers; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--

COPY auth.sso_providers (id, resource_id, created_at, updated_at, disabled) FROM stdin;
\.


--
-- TOC entry 4657 (class 0 OID 16499)
-- Dependencies: 358
-- Data for Name: users; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--

COPY auth.users (instance_id, id, aud, role, email, encrypted_password, email_confirmed_at, invited_at, confirmation_token, confirmation_sent_at, recovery_token, recovery_sent_at, email_change_token_new, email_change, email_change_sent_at, last_sign_in_at, raw_app_meta_data, raw_user_meta_data, is_super_admin, created_at, updated_at, phone, phone_confirmed_at, phone_change, phone_change_token, phone_change_sent_at, email_change_token_current, email_change_confirm_status, banned_until, reauthentication_token, reauthentication_sent_at, is_sso_user, deleted_at, is_anonymous) FROM stdin;
00000000-0000-0000-0000-000000000000	72346843-d7ff-4a0e-bc28-007db9c763f3	authenticated	authenticated	petergreaney@gmail.com	$2a$10$4WUT4HYtgZ.qgIdXqlb9TesFcqMqwxl9hIaLMT8XMxvV72BPXYhoi	2026-03-09 17:32:53.178291+00	\N		2026-03-09 17:32:38.131965+00		\N			\N	2026-03-09 17:32:53.185695+00	{"provider": "email", "providers": ["email"]}	{"sub": "72346843-d7ff-4a0e-bc28-007db9c763f3", "email": "petergreaney@gmail.com", "email_verified": true, "phone_verified": false}	\N	2026-03-09 17:32:38.09638+00	2026-03-09 17:32:53.217946+00	\N	\N			\N		0	\N		\N	f	\N	f
00000000-0000-0000-0000-000000000000	3a679996-7773-4b9b-a3fe-93c031266ef9	authenticated	authenticated	peter@onemedia.asia	$2a$10$eHPwyjtaeagsC1qQlR9ua.r3m5CNZBxNP90AZst0dOjp.EGn2Ha0u	2026-02-23 19:06:16.795809+00	\N		\N		\N			\N	2026-03-16 14:01:43.921604+00	{"provider": "email", "providers": ["email"]}	{"email_verified": true}	\N	2026-02-23 19:06:16.781079+00	2026-03-21 15:31:39.204122+00	\N	\N			\N		0	\N		\N	f	\N	f
00000000-0000-0000-0000-000000000000	780bcf0c-f47f-498e-a129-35583df2a8a1	authenticated	authenticated	contact@prodiving.asia	$2a$10$Ha7WygmI/H6Stlid.N8creR3zScYQsa4vNeW1z6LWOECtNB.Q42KG	2026-03-08 11:01:07.325378+00	\N		2026-03-08 10:36:00.394138+00		2026-04-03 20:12:56.061153+00			\N	2026-04-04 17:54:52.168566+00	{"provider": "email", "providers": ["email"]}	{"sub": "780bcf0c-f47f-498e-a129-35583df2a8a1", "email": "contact@prodiving.asia", "email_verified": true, "phone_verified": false}	\N	2026-03-08 10:34:57.440368+00	2026-04-04 17:54:52.242337+00	\N	\N			\N		0	\N		\N	f	\N	f
00000000-0000-0000-0000-000000000000	d314da05-5a66-49b4-bb53-034981d83690	authenticated	authenticated	onemediaasia@duck.com	$2a$10$KdCGydIUURW23W1WuLoQhezcRFLIUXaEJ7oaPj8Gp6koKDrdHxi7.	2026-03-28 21:24:26.947947+00	\N		2026-03-06 03:23:01.991881+00		2026-03-28 21:25:26.18734+00			\N	2026-04-03 23:04:40.678204+00	{"provider": "email", "providers": ["email"]}	{"sub": "d314da05-5a66-49b4-bb53-034981d83690", "email": "onemediaasia@duck.com", "email_verified": true, "phone_verified": false}	\N	2026-03-06 03:23:01.94793+00	2026-04-03 23:04:40.734577+00	\N	\N			\N		0	\N		\N	f	\N	f
00000000-0000-0000-0000-000000000000	1379a8ab-4fe0-48d4-876e-b6b697c1dc46	authenticated	authenticated	bas@divinginasia.com	$2a$10$JlqA8a7g6fBZf6lNf25YGOEmGWM1vJ3Z5m2h9MbpkBMdq3PD.cIx6	2026-04-03 20:04:23.676732+00	\N		\N		\N			\N	2026-04-04 09:17:25.044676+00	{"provider": "email", "providers": ["email"]}	{"email_verified": true}	\N	2026-04-03 20:04:23.62941+00	2026-04-04 14:40:38.966438+00	\N	\N			\N		0	\N		\N	f	\N	f
\.


--
-- TOC entry 4708 (class 0 OID 27345)
-- Dependencies: 418
-- Data for Name: webauthn_challenges; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--

COPY auth.webauthn_challenges (id, user_id, challenge_type, session_data, created_at, expires_at) FROM stdin;
\.


--
-- TOC entry 4707 (class 0 OID 27322)
-- Dependencies: 417
-- Data for Name: webauthn_credentials; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--

COPY auth.webauthn_credentials (id, user_id, credential_id, public_key, attestation_type, aaguid, sign_count, transports, backup_eligible, backed_up, friendly_name, created_at, updated_at, last_used_at) FROM stdin;
\.


--
-- TOC entry 4692 (class 0 OID 18209)
-- Dependencies: 400
-- Data for Name: admin_settings; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.admin_settings (id, setting_key, setting_value, updated_at) FROM stdin;
\.


--
-- TOC entry 4695 (class 0 OID 19445)
-- Dependencies: 403
-- Data for Name: affiliate_clicks; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.affiliate_clicks (id, hotel_name, hotel_url, affiliate_id, clicked_at, referrer, user_agent, ip_address) FROM stdin;
29c7e978-f1d3-4169-8698-2a882926b728	Test Hotel	https://www.trip.com/hotel/1?allianceid=7864578&sid=295439656	7864578	2026-03-06 10:40:48.830694+00	https://www.example.com	Mozilla/5.0	\N
8d9ff5f1-23ee-4dee-bb5b-b14fcbcde919	Trip.com Test Hotel	https://www.trip.com/hotels/detail/?allianceid=7864578&sid=295439656	7864578	2026-03-06 10:45:57.53846+00	https://yourwebsite.com	\N	\N
\.


--
-- TOC entry 4690 (class 0 OID 18180)
-- Dependencies: 398
-- Data for Name: booking_inquiries; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.booking_inquiries (id, name, email, phone, course_title, preferred_date, experience_level, message, created_at, status, notes, internal_notes, deposit, total) FROM stdin;
d5f7f1c9-46c6-4639-a909-9a88b8987750	Alice Example	alice@example.com	1234567890	Open Water Diver	2026-03-10	Beginner	Excited to start!	2026-02-28 20:17:51.316463+00	pending	\N	\N	0	0
afeed6eb-8be5-4ebb-af19-f21d13bdaff5	Test User	test@example.com	999999999	Open Water	2026-03-15	\N	\N	2026-03-14 10:45:28.505+00	pending	test	\N	0	0
24369725-7944-407a-bd0a-53ae8b75d0d5	Bob Diver	bob@divemail.com	0987654321	Advanced Diver	2026-03-15	Intermediate	Looking to improve skills.	2026-02-28 20:17:51.316463+00	\N	\N	\N	0	0
40b7ac5c-cb53-485c-b10c-17d42aa1cb27	confirmed	p@p.com,	44444444444	open water	2026-04-01	test	testr	2026-03-27 14:38:58+00	pending	\N	test notes	0	0
bbb59f0e-5662-4661-b6f4-9298706885fd	Peter Greaney	petergreaney@gmail.com	\N	Course Information	\N	\N	rest	2026-04-03 19:17:11.314+00	pending	\N	\N	0	0
8aa4193f-18c4-407d-b947-6ac5935a9dc3	Peter Greaney	petergreaney@gmail.com	\N	Course Information	\N	\N	w	2026-04-03 21:45:02.91+00	pending	\N	\N	0	0
2bca8690-46de-4a95-b3f0-63badb1ad6ce	Peter Greaney	petergreaney@gmail.com	\N	Course Information	\N	\N	reset	2026-04-04 01:23:22.105+00	pending	\N	\N	0	0
f98e538c-5c42-4570-93d9-1517c75c6a98	Peter Greaney	petergreaney@gmail.com	\N	Course Information	\N	\N	s	2026-04-04 02:33:17.649+00	pending	\N	\N	0	0
ed9a45c9-63c8-47de-adda-4b3eee54c946	Peter Greaney	onemediaasia@duck.com	\N	Course Information	\N	\N	dsfd	2026-04-04 03:30:21.892+00	pending	\N	\N	0	0
cca5f913-c4e2-438c-a60f-9ef490d206a1	sebastian van riemsdijk	bas@onemedia.asia	\N	Course Information	\N	\N	s	2026-04-04 04:21:29.333+00	pending	\N	\N	0	0
ec34d613-b635-4813-90af-e15287346042	Peter Greaney	petergreaney@gmail.com	\N	Course Information	\N	\N	d	2026-04-04 06:27:32.984+00	pending	\N	\N	0	0
58bcf243-3b05-49cb-a030-96c9087c1404	Peter Greaney	onemediaasia@duck.com	\N	Course Information	\N	\N	S	2026-04-04 06:37:44.986+00	pending	\N	\N	0	0
d86896ff-8cfa-4dc0-acc6-9bf95fcee3c6	One Asia	petergreaney@gmail.com	\N	Course Information	\N	\N	s	2026-04-04 09:38:42.366+00	pending	\N	\N	0	0
2e57deff-37c9-46d1-92ba-8e12497f96e0	Peter Greaney	petergreaney@gmail.com	\N	Course Information	\N	\N	d	2026-04-04 09:41:18.037+00	pending	\N	\N	0	0
7c3cfd1d-2dd1-47f2-98aa-57342d9484b9	Peter Greaney	petergreaney@gmail.com	\N	Course Information	\N	\N	test	2026-04-04 10:10:10.411+00	pending	\N	\N	0	0
b9af2b44-3516-4de0-80ab-f7733afc5943	Peter Greaney	petergreaney@gmail.com	\N	Course Information	\N	\N	s	2026-04-04 14:40:53.036+00	pending	\N	\N	0	0
f90ed750-448b-40f7-9695-a156345e0420	Peter Greaney	petergreaney@gmail.com	\N	Course Information	\N	\N	d	2026-04-04 14:53:38.052+00	pending	\N	\N	0	0
c172c4fd-f630-4690-a373-161121095c73	Peter Greaney	petergreaney@gmail.com	\N	Course Information	\N	\N	d	2026-04-04 14:54:34.912+00	pending	\N	\N	0	0
\.


--
-- TOC entry 4703 (class 0 OID 25846)
-- Dependencies: 413
-- Data for Name: bookings; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.bookings (id, name, email, phone, item_type, course_title, preferred_date, experience_level, message, payment_choice, addons, addons_json, addons_total, subtotal_amount, total_payable_now, internal_notes, status, created_at, updated_at, deposit_amount, total_amount, due_amount, bank_transfer_details) FROM stdin;
b278f742-f5d8-4f28-8d45-98d6ff17e181	Peter Greaney	petergreaney@gmail.com	0639230132	\N	Sail Rock	\N	\N	\N	\N	\N	\N	0	\N	\N	\N	confirmed	2026-04-01 12:35:24.567899+00	2026-04-01 17:15:44.87+00	\N	\N	\N	\N
4037828a-bb1d-4fbf-8915-d6150566aba3	Peter Greaney	petergreaney@gmail.com	0639230132	\N	Chumphon Pinnacle	2026-04-16	very experienced	yesfef	\N	\N	\N	0	\N	\N	\N	confirmed	2026-04-01 02:06:59.634448+00	2026-04-01 02:41:15.053+00	\N	\N	\N	\N
edb1b969-8fe0-4192-b88f-4b977dafd767	james tester Greaney	petergreaney@gmail.com	+353910235458	course	PADI Open Water Course + 3 Fun Dives	2026-04-30	intermediate	test calendar\n\nBooking Source: direct	\N	N/A (course booking)	[]	0	13700	2740	\N	confirmed	2026-04-01 03:03:38.994473+00	2026-04-01 03:04:43.628+00	2740	13700	10960	\N
1dcd0399-ec0a-42d3-b5b1-42fed2c93dc9	sebastian van riemsdijk	bas@onemedia.asia	+6281353833289	course	PADI Open Water Course + 4 Fun Dives	2026-04-17	intermediate	test 17/04/ical\n\nBooking Source: direct	\N	N/A (course booking)	[]	0	14600	2920	\N	confirmed	2026-04-01 03:19:19.25895+00	2026-04-01 04:39:00.974+00	2920	14600	11680	\N
a11309dd-bd1a-4dbb-bb76-4ce4a4ea5642	Peter Greaney	petergreaney@gmail.com	+66639230132	course	PADI Open Water Course	2026-04-01	\N	d\n\nBooking Source: direct	\N	N/A (course booking)	[]	0	11000	2200	\N	confirmed	2026-04-01 16:02:25.992782+00	2026-04-01 17:44:20.27+00	2200	11000	8800	\N
8537ad00-04af-4531-b303-28c14f1bb979	Peter Greaney	petergreaney@gmail.com	+66639230132	course	PADI Open Water Course	2026-04-01	\N	No additional message\n\nBooking Source: direct	\N	N/A (course booking)	[]	0	11000	2200	s	confirmed	2026-04-01 04:40:19.573843+00	2026-04-01 04:43:33.645+00	2200	11000	8800	\N
db5d7321-c293-42f6-a16c-b7f52705e860	Peter Greaney	petergreaney@gmail.com	0639230132	\N	Shark Island	2026-04-18	very experienced	test11111	\N	\N	\N	0	\N	\N	\N	confirmed	2026-04-01 04:50:40.476917+00	2026-04-01 04:51:18.714+00	\N	\N	\N	\N
8059b469-49ae-4413-b542-650b58e2adcd	Test User	testuser@example.com	1234567890	\N	Open Water Diver	2026-04-02	\N	Test booking for calendar feed	\N	\N	\N	\N	\N	\N	\N	confirmed	2026-04-01 05:16:53.105519+00	2026-04-01 06:12:00.84+00	\N	\N	\N	\N
f423aabe-b479-45d5-86b3-08c843d41206	Peter Greaney	petergreaney@gmail.com	0639230132	\N	Chumphon Pinnacle	\N	\N	\N	\N	\N	\N	0	\N	\N	\N	confirmed	2026-04-01 06:12:38.584655+00	2026-04-01 06:15:58.66+00	\N	\N	\N	\N
04e9bfd9-3585-42b7-81e3-3abd4758fc52	Peter Greaney	petergreaney@gmail.com	+66639230132	course	Emergency First Response (EFR) + 6 Fun Dives	2026-05-09	beginner	9/may\n\nBooking Source: direct	\N	N/A (course booking)	[]	0	8900	1780	\N	confirmed	2026-04-01 06:47:05.78589+00	2026-04-01 06:47:53.431+00	1780	8900	7120	\N
f1c2296d-fa5c-42ec-a477-8eb3bc040bad	Peter Greaney	petergreaney@gmail.com	+66639230132	course	PADI Open Water Course + 7 Fun Dives	2026-04-01	none	test\n\nBooking Source: direct	\N	N/A (course booking)	[]	0	17300	3460	\N	confirmed	2026-04-01 07:44:37.312799+00	2026-04-01 07:45:02.515+00	3460	17300	13840	\N
105d36b8-510a-4830-a9f9-d3dfa43edf17	Peter Greaney	petergreaney@gmail.com	0639230132	\N	Chumphon Pinnacle	2026-04-24	d	d	\N	\N	\N	0	\N	\N	\N	confirmed	2026-04-01 07:04:39.979579+00	2026-04-01 12:07:35.29+00	\N	\N	\N	\N
7f6b9568-099f-412d-9ec1-958df719c58a	Peter Greaney	petergreaney@gmail.com	+66639230132	course	PADI Open Water Course	2026-04-01	\N	No additional message\n\nBooking Source: direct	\N	N/A (course booking)	[]	0	11000	2200	\N	confirmed	2026-04-01 20:06:00.90705+00	2026-04-01 20:10:07.672+00	2200	11000	8800	\N
53e784da-ec4f-49bd-8e12-98e9bf18638c	Peter Greaney	petergreaney@gmail.com	0639230132	\N	Sail Rock	\N	\N	\N	\N	\N	\N	0	\N	\N	\N	confirmed	2026-04-01 12:57:09.958021+00	2026-04-01 17:14:18.788+00	\N	\N	\N	\N
1cc92398-34c2-42b1-ab9f-807f33ff4df2	Peter Greaney	petergreaney@gmail.com	+66639230132	course	PADI Open Water Scuba Instructor	2026-04-01	\N	No additional message\n\nBooking Source: direct	\N	N/A (course booking)	[]	0	68900	13780	\N	confirmed	2026-04-01 12:45:04.075109+00	2026-04-01 17:14:51.63+00	13780	68900	55120	\N
981c499f-7ea6-4ea8-9dc0-5d624a29be09	Peter Greaney	petergreaney@gmail.com	0639230132	\N	Sail Rock	2026-04-17	very experienced	test	\N	\N	\N	0	\N	\N	\N	confirmed	2026-04-01 12:39:39.722145+00	2026-04-01 17:14:54.596+00	\N	\N	\N	\N
7ff17e4c-7e47-46e3-bdf1-2fc832fac85f	Peter Greaney	petergreaney@gmail.com	+66639230132	course	PADI Open Water Course	2026-04-01	\N	No additional message\n\nBooking Source: direct	\N	N/A (course booking)	[]	0	11000	2200	\N	confirmed	2026-04-01 17:47:32.23373+00	2026-04-01 17:48:49.172+00	2200	11000	8800	\N
d4f2de76-447d-494e-9521-2e629a0aa3a5	Peter Greaney	petergreaney@gmail.com	+66639230132	course	PADI Open Water Course + 2 Fun Dives	2026-04-01	beginner	wewwewe\n\nBooking Source: direct	\N	N/A (course booking)	[]	0	12800	2560	\N	confirmed	2026-04-01 18:02:55.779858+00	2026-04-01 18:03:32.431+00	2560	12800	10240	\N
59534e76-e5ff-4ac5-b478-3125620c941d	Peter Greaney	petergreaney@gmail.com	+66639230132	course	PADI Open Water Course + 2 Fun Dives	2026-04-18	\N	18/04\n\nBooking Source: direct	\N	N/A (course booking)	[]	0	12800	2560	\N	confirmed	2026-04-01 18:05:17.34497+00	2026-04-01 18:51:19.732+00	2560	12800	10240	\N
471da6b0-6063-45af-9b89-9e36f87467a2	Peter Greaney	petergreaney@gmail.com	+66639230132	course	PADI Open Water Course	2026-04-01	\N	No additional message\n\nBooking Source: direct	\N	N/A (course booking)	[]	0	11000	2200	\N	pending	2026-04-01 19:22:53.843998+00	2026-04-01 19:22:53.843998+00	2200	11000	8800	\N
e539103d-8e23-49bb-aff4-0ac929b6cf39	Peter Greaney	petergreaney@gmail.com	+66639230132	course	PADI Open Water Course	2026-04-01	\N	No additional message\n\nBooking Source: direct	\N	N/A (course booking)	[]	0	11000	2200	\N	pending	2026-04-01 19:27:15.703892+00	2026-04-01 19:27:15.703892+00	2200	11000	8800	\N
0c37b50c-b1fc-4d36-ad03-17ae17b9e381	Peter Greaney	petergreaney@gmail.com	+66639230132	course	PADI Open Water Course	2026-04-01	\N	No additional message\n\nBooking Source: direct	\N	N/A (course booking)	[]	0	11000	2200	\N	pending	2026-04-01 19:27:33.207863+00	2026-04-01 19:27:33.207863+00	2200	11000	8800	\N
d91dd765-9e7d-410f-81b7-25c081c6ab30	Peter Greaney	petergreaney@gmail.com	+66639230132	course	PADI Open Water Course	2026-04-01	\N	No additional message\n\nBooking Source: direct	\N	N/A (course booking)	[]	0	11000	2200	\N	pending	2026-04-01 19:27:49.576827+00	2026-04-01 19:27:49.576827+00	2200	11000	8800	\N
d6fb3d34-a902-44fa-a885-de689d7dcfa7	Peter Greaney	petergreaney@gmail.com	+66639230132	course	PADI Open Water Course	2026-04-01	\N	No additional message\n\nBooking Source: direct	\N	N/A (course booking)	[]	0	11000	2200	\N	pending	2026-04-01 19:28:35.988026+00	2026-04-01 19:28:35.988026+00	2200	11000	8800	\N
564ac6da-7362-4710-a7d5-5947c184ef40	Peter Greaney	petergreaney@gmail.com	+66639230132	course	Fish Identification Specialty	2026-04-01	beginner	222222\n\nBooking Source: direct	\N	N/A (course booking)	[]	0	8000	1600	\N	confirmed	2026-04-01 20:15:35.594114+00	2026-04-01 20:19:50.814+00	1600	8000	6400	\N
9745aefc-4143-4eda-86e0-9bba655b5b89	Peter Greaney	peter@onemedia.asia	+66639230132	course	PADI Scuba Diver Course + 2 Fun Dives	2026-04-01	beginner	tell me  moer\n\nBooking Source: direct	\N	N/A (course booking)	[]	0	10300	2060	\N	confirmed	2026-04-01 20:25:37.086472+00	2026-04-01 20:26:07.954+00	2060	10300	8240	\N
fde2a16a-227a-4fec-bb22-1b7643d6fb98	Peter Greaney	petergreaney@gmail.com	+66639230132	course	PADI Open Water Course	2026-04-01	\N	No additional message\n\nBooking Source: direct	\N	N/A (course booking)	[]	0	11000	2200	\N	confirmed	2026-04-01 21:06:37.501612+00	2026-04-01 21:07:17.222+00	2200	11000	8800	\N
bd2d788e-db52-4d85-a974-6d3e53a4c8d1	sebastian van riemsdijk	bas@onemedia.asia	+6281353833289	course	PADI Open Water Course	2026-04-01	\N	No additional message\n\nBooking Source: direct	\N	N/A (course booking)	[]	0	11000	2200	\N	confirmed	2026-04-01 21:22:07.345157+00	2026-04-03 23:41:36.391+00	2200	11000	8800	\N
40c837a4-e1e3-43b7-9e9f-bbd8040b7c7d	Peter Greaney	petergreaney@gmail.com	+66639230132	course	PADI Open Water Course	2026-04-01	\N	No additional message\n\nBooking Source: direct	\N	N/A (course booking)	[]	0	11000	2200	\N	confirmed	2026-04-01 19:28:43.797533+00	2026-04-04 02:31:05.312+00	2200	11000	8800	\N
5b8ef38c-0df2-43c7-ab03-35f87d145fbb	Peter Greaney	petergreaney@gmail.com	0639230132	\N	Chumphon Pinnacle	\N	\N	\N	\N	\N	\N	0	\N	\N	\N	confirmed	2026-04-01 20:43:53.502084+00	2026-04-04 03:41:25.643+00	\N	\N	\N	\N
ac3fc3ab-a25f-49e2-af91-4d83e4923c59	One Media Asia	petergreaney@gmail.com	+6281353833289	dive	Fun Dive (2 dives)	2026-04-01	\N	No additional message\n\nBooking Source: direct	\N	None	[]	0	1800	360	\N	confirmed	2026-04-01 20:13:36.388699+00	2026-04-04 03:58:51.221+00	360	1800	1440	\N
248d7c65-eedb-4079-b5fb-c103d3a76c0b	Peter Greaney	petergreaney@gmail.com	+66639230132	course	PADI Open Water Course	2026-04-02	\N	No additional message\n\nBooking Source: direct	\N	N/A (course booking)	[]	0	11000	2200	\N	confirmed	2026-04-02 00:26:34.428658+00	2026-04-02 00:28:07.616+00	2200	11000	8800	\N
073fba3d-da72-47c7-9f39-705e320f3781	Peter Greaney	petergreaney@gmail.com	+66639230132	course	PADI Open Water Course	2026-04-02	none	s\n\nBooking Source: direct	\N	N/A (course booking)	[]	0	11000	2200	\N	confirmed	2026-04-02 00:34:55.895985+00	2026-04-03 12:52:27.891+00	2200	11000	8800	\N
4c241738-876a-45d1-94be-4fe52df55454	Peter Greaney	petergreaney@gmail.com	+66639230132	course	PADI Open Water Course	2026-04-03	\N	No additional message\n\nBooking Source: direct	\N	N/A (course booking)	[]	0	11000	2200	\N	confirmed	2026-04-03 21:43:58.787809+00	2026-04-03 21:44:41.04+00	2200	11000	8800	\N
0b218f76-e65b-4450-a3fd-5201cbe141d8	Peter Greaney	petergreaney@gmail.com	0639230132	\N	Green Rock	\N	dsfs	dsfds	\N	\N	\N	0	\N	\N	yesy	confirmed	2026-04-02 00:37:42.23162+00	2026-04-03 13:05:34.509+00	\N	\N	\N	nno
3685d0b5-4494-4bfe-8985-96965a7a8fa3	frid@2106-Peter Greaney	petergreaney@gmail.com	+66639230132	course	PADI Open Water Course + 2 Fun Dives	2026-04-11	beginner	test new forms\n\nBooking Source: direct	\N	N/A (course booking)	[]	0	12800	2560	\N	confirmed	2026-04-03 13:06:35.953181+00	2026-04-03 13:36:27.337+00	2560	12800	10240	\N
71167189-863b-40d0-a970-1a0c70e025e1	Peter Greaney	petergreaney@gmail.com	+66639230132	course	PADI Open Water Course + 1 Fun Dives	2026-04-10	beginner	sadsw\n\nBooking Source: direct	\N	N/A (course booking)	[]	0	12000	2400	\N	confirmed	2026-04-02 00:13:59.793815+00	2026-04-03 13:39:27.623+00	2400	12000	9600	\N
c6f27185-3ad2-4124-9bea-8d6b37da2757	sebastian van riemsdijk	petergreaney@gmail.com	+66639230132	course	PADI Open Water Course	2026-04-25	beginner	test 2140\n\nBooking Source: direct	\N	N/A (course booking)	[]	0	11000	2200	\N	confirmed	2026-04-03 13:40:15.180429+00	2026-04-03 13:40:57.874+00	2200	11000	8800	\N
1f34847e-b2f4-42c4-bf65-bde16cc744b3	Peter Greaney	petergreaney@gmail.com	+66639230132	course	PADI Open Water Course + 3 Fun Dives	2026-06-09	none	test cal\n\nBooking Source: direct	\N	N/A (course booking)	[]	0	13700	2740	\N	confirmed	2026-04-04 04:23:20.714205+00	2026-04-04 04:23:36.575+00	2740	13700	10960	\N
4118eba8-73b5-4061-923f-2f61555692b8	Peter Greaney	petergreaney@gmail.com	+66639230132	course	PADI Open Water Course	2026-04-03	\N	No additional message\n\nBooking Source: direct	\N	N/A (course booking)	[]	0	11000	2200	\N	confirmed	2026-04-03 17:29:23.428249+00	2026-04-03 17:30:30.5+00	2200	11000	8800	\N
0e00352b-9ded-4791-8607-f0a66a7b74c2	Peter Greaney	petergreaney@gmail.com	0639230132	\N	Chumphon Pinnacle	2026-04-30	very experienced	test modeal	\N	\N	\N	0	\N	\N	\N	confirmed	2026-04-03 21:54:53.366358+00	2026-04-04 01:11:15.57+00	\N	\N	\N	\N
6dc5ce08-8da9-4a57-8a6a-563efff03f98	Peter Greaney	petergreaney@gmail.com	0639230132	\N	Chumphon Pinnacle	2026-04-25	very experienced	test new254	\N	\N	\N	0	\N	\N	\N	confirmed	2026-04-03 14:04:47.775088+00	2026-04-03 18:08:33.944+00	\N	\N	\N	\N
bc6c0425-9878-4ff1-8a51-912f3561c495	Peter Greaney	petergreaney@gmail.com	+66639230132	course	PADI Open Water Course + 3 Fun Dives	2026-04-25	beginner	test 321\n\nBooking Source: direct	\N	N/A (course booking)	[]	0	13700	2740	\N	confirmed	2026-04-03 19:12:25.351521+00	2026-04-03 19:12:44.301+00	2740	13700	10960	\N
f10b4ebd-ba0d-4351-b827-8acc39826923	Peter Greaney	petergreaney@gmail.com	0639230132	\N	Chumphon Pinnacle	2026-04-24	very experienced	rest	\N	\N	\N	0	\N	\N	\N	confirmed	2026-04-03 19:13:32.139068+00	2026-04-03 20:34:58.597+00	\N	\N	\N	\N
d39ff781-71e8-4ba1-b3db-d7ea4e8770a3	Peter Greaney	petergreaney@gmail.com	+66639230132	course	PADI Open Water Course	2026-04-03	\N	No additional message\n\nBooking Source: direct	\N	N/A (course booking)	[]	0	11000	2200	efe	confirmed	2026-04-03 18:02:00.575302+00	2026-04-03 20:51:27.923+00	2200	11000	8800	helloefef
70c1480e-f060-48b0-a172-910d6e6f7070	Peter Greaney	petergreaney@gmail.com	+66639230132	course	PADI Open Water Course	2026-04-01	\N	No additional message\n\nBooking Source: direct	\N	N/A (course booking)	[]	0	11000	2200	\N	confirmed	2026-04-01 21:50:01.000029+00	2026-04-03 21:10:46.424+00	2200	11000	8800	\N
0a939256-9bd5-4e86-bb64-61f611eb71d8	Peter Greaney	petergreaney@gmail.com	0639230132	\N	Green Rock	\N	\N	\N	\N	\N	\N	0	\N	\N	\N	pending	2026-04-04 08:12:19.373141+00	2026-04-04 08:12:19.373141+00	\N	\N	\N	\N
6641c1bf-c612-4d7d-82b1-74698672c90e	Peter Greaney	petergreaney@gmail.com	+66639230132	course	PADI Open Water Course + 2 Fun Dives	2026-04-25	beginner	test am\n\nBooking Source: direct	\N	N/A (course booking)	[]	0	12800	2560	\N	confirmed	2026-04-04 01:23:55.329889+00	2026-04-04 02:30:56.921+00	2560	12800	10240	dsdhello
ab9427a8-d526-4d4d-8985-1347db620515	Peter Greaney	onemediaasia@duck.com	+66639230132	course	PADI Open Water Course + 2 Fun Dives	2026-04-18	intermediate	test new system\n\nBooking Source: direct	\N	N/A (course booking)	[]	0	12800	2560	\N	pending	2026-04-04 08:52:55.43048+00	2026-04-04 08:52:55.43048+00	2560	12800	10240	\N
459cd077-3d60-4686-a107-f1cf3a629ff3	Peter Greaney	petergreaney@gmail.com	+66639230132	course	PADI Open Water Course	2026-04-04	beginner	TEST\n\nBooking Source: direct	\N	N/A (course booking)	[]	0	11000	2200	\N	pending	2026-04-04 09:03:24.098109+00	2026-04-04 09:03:24.098109+00	2200	11000	8800	\N
8cb2641c-2d81-4e9c-9088-dff7f31ea570	Peter Greaney	petergreaney@gmail.com	0639230132	\N	Buoyancy World	2026-04-18	ghrhtt	test	\N	\N	\N	0	\N	\N	\N	confirmed	2026-04-04 09:15:07.795538+00	2026-04-04 09:33:14.887+00	\N	\N	\N	\N
bd08a2ab-9cc6-434b-8692-108e27a61472	Peter Greaney	petergreaney@gmail.com	+66639230132	course	PADI Divemaster + 1 Fun Dives	2026-04-04	\N	No additional message\n\nBooking Source: direct	\N	N/A (course booking)	[]	0	42000	8400	\N	cancelled	2026-04-04 03:30:43.32292+00	2026-04-04 03:56:54.108+00	8400	42000	33600	\N
56e55333-3af9-4151-93b6-35d0009e842c	Peter Greaney	petergreaney@gmail.com	+66639230132	course	PADI Open Water Course	2026-04-04	\N	No additional message\n\nBooking Source: direct	\N	N/A (course booking)	[]	0	11000	2200	\N	confirmed	2026-04-04 14:41:09.649621+00	2026-04-04 14:45:27.957+00	2200	11000	8800	\N
884b2072-6caa-4b41-932f-1b664c4c3004	Peter Greaney	petergreaney@gmail.com	+66639230132	course	PADI Open Water Course	2026-04-04	\N	No additional message\n\nBooking Source: direct	\N	N/A (course booking)	[]	0	11000	2200	\N	confirmed	2026-04-04 09:42:02.652051+00	2026-04-04 16:27:32.095+00	2200	11000	8800	\N
\.


--
-- TOC entry 4700 (class 0 OID 25416)
-- Dependencies: 408
-- Data for Name: course_prices; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.course_prices (id, course, price_thb, price_usd, price_eur, created_at, updated_at) FROM stdin;
5c3c8a09-d951-4911-af1c-0c5b515da7ff	Open Water	11000	320	290	2026-03-12 19:23:07.4228+00	2026-03-12 19:23:07.4228+00
81ebabf5-fc0e-4647-ad1d-a611e9a399ce	Advanced	9500	275	250	2026-03-12 19:23:07.4228+00	2026-03-12 19:23:07.4228+00
68023650-2e68-440b-97e8-f4289ea0a1e6	Rescue	10000	290	265	2026-03-12 19:23:07.4228+00	2026-03-12 19:23:07.4228+00
2b284fe7-7fdd-4092-9e4d-283b61bfebaa	Divemaster	41000	1190	1090	2026-03-12 19:23:07.4228+00	2026-03-12 19:23:07.4228+00
3e140cd0-7f3b-4584-b972-52b61cd9c213	Instructor	68900	1710	1560	2026-03-12 19:23:07.4228+00	2026-03-12 19:23:07.4228+00
059247ac-81ef-4d3e-bd88-6f42a1857759	Scuba Review	2500	72	66	2026-03-12 19:23:07.4228+00	2026-03-12 19:23:07.4228+00
77454311-32ab-4713-9fa2-d4fce4babd39	Discover Scuba	2500	72	66	2026-03-12 19:23:07.4228+00	2026-03-12 19:23:07.4228+00
120c5452-bbc8-4f51-ac42-1ee063fb24ff	Discover Scuba Deluxe	5000	144	132	2026-03-12 19:23:07.4228+00	2026-03-12 19:23:07.4228+00
1a101a46-c3f1-4c25-b355-ac93942e55a8	EFR	3500	130	120	2026-03-12 19:23:07.4228+00	2026-03-12 19:23:07.4228+00
8835d789-327a-4076-9691-4502d9af681d	Open Water	11000	320	290	2026-03-12 19:23:14.187375+00	2026-03-12 19:23:14.187375+00
f04afbb0-ab77-4a76-ac59-9de4605f758d	Advanced	9500	275	250	2026-03-12 19:23:14.187375+00	2026-03-12 19:23:14.187375+00
076f36f8-b6a1-4c68-9110-2cbd5e389573	Rescue	10000	290	265	2026-03-12 19:23:14.187375+00	2026-03-12 19:23:14.187375+00
43350826-96b4-4828-8fc2-43db4fffbceb	Divemaster	41000	1190	1090	2026-03-12 19:23:14.187375+00	2026-03-12 19:23:14.187375+00
15d49d03-2063-42a9-9500-5bf5026a371b	Instructor	68900	1710	1560	2026-03-12 19:23:14.187375+00	2026-03-12 19:23:14.187375+00
80e88f0b-c97a-4f5a-8bf4-251be93d504b	Scuba Review	2500	72	66	2026-03-12 19:23:14.187375+00	2026-03-12 19:23:14.187375+00
c1a81364-39af-4997-bd9c-0e4b8a662fa6	Discover Scuba	2500	72	66	2026-03-12 19:23:14.187375+00	2026-03-12 19:23:14.187375+00
8bf53ed6-13f8-4309-aac2-7f25cf1bbbca	Discover Scuba Deluxe	5000	144	132	2026-03-12 19:23:14.187375+00	2026-03-12 19:23:14.187375+00
383a00ac-e7ad-4720-86d8-3816e3d94415	EFR	3500	130	120	2026-03-12 19:23:14.187375+00	2026-03-12 19:23:14.187375+00
ea47867b-72a7-46a3-a31e-6ab54cbacb5c	Open Water	11000	320	290	2026-03-12 19:39:16.81881+00	2026-03-12 19:39:16.81881+00
e337d690-1108-4a2d-93b7-610f71eabbee	Advanced	9500	275	250	2026-03-12 19:39:16.81881+00	2026-03-12 19:39:16.81881+00
45340c72-8e1b-49d1-b9e6-0adea371b7e5	Rescue	10000	290	265	2026-03-12 19:39:16.81881+00	2026-03-12 19:39:16.81881+00
ee2015a6-c112-4271-93f5-2c3146b7e0e4	Divemaster	41000	1190	1090	2026-03-12 19:39:16.81881+00	2026-03-12 19:39:16.81881+00
4b2e7ee3-27f0-468d-98a4-ea08dc84ed68	Instructor	68900	1710	1560	2026-03-12 19:39:16.81881+00	2026-03-12 19:39:16.81881+00
5f699c9f-2e62-4587-846f-49f97387300e	Discover Scuba	2500	72	66	2026-03-12 19:39:16.81881+00	2026-03-12 19:39:16.81881+00
f8c72a5a-2c81-4478-8734-6ddb9d4102dc	Discover Scuba Deluxe	5000	144	132	2026-03-12 19:39:16.81881+00	2026-03-12 19:39:16.81881+00
9d2c9bc6-22a2-4dff-b9af-990483eb03b8	EFR	3500	130	120	2026-03-12 19:39:16.81881+00	2026-03-12 19:39:16.81881+00
f42d31e4-b522-498a-9274-39d5fa33053a	Open Water	11000	320	290	2026-03-12 19:49:28.328887+00	2026-03-12 19:49:28.328887+00
dc74b179-e453-4a98-b421-eb23063f00c5	Advanced	9500	275	250	2026-03-12 19:49:28.328887+00	2026-03-12 19:49:28.328887+00
9cbe9f61-f843-414b-b209-bfddf9dde48c	Rescue	10000	290	265	2026-03-12 19:49:28.328887+00	2026-03-12 19:49:28.328887+00
5c418421-a859-46b8-ac58-48ed6ceb4edf	Divemaster	41000	1190	1090	2026-03-12 19:49:28.328887+00	2026-03-12 19:49:28.328887+00
4b87de1f-2ba0-46b6-9ab0-4b8dbaff6238	Instructor	68900	1710	1560	2026-03-12 19:49:28.328887+00	2026-03-12 19:49:28.328887+00
b578fbfd-ea85-47d2-9886-c05b6ae88fc6	Scuba Review	2500	72	66	2026-03-12 19:49:28.328887+00	2026-03-12 19:49:28.328887+00
7dce1df0-75df-4eb8-9bf3-77f45da6e258	Discover Scuba	2500	72	66	2026-03-12 19:49:28.328887+00	2026-03-12 19:49:28.328887+00
f6d00094-0b26-4a81-98d1-deb80cd73ead	Discover Scuba Deluxe	5000	144	132	2026-03-12 19:49:28.328887+00	2026-03-12 19:49:28.328887+00
70510851-c47e-4dbf-be7d-62ce7fa03844	EFR	3500	130	120	2026-03-12 19:49:28.328887+00	2026-03-12 19:49:28.328887+00
cafc628a-6147-4186-a3fb-d66927c0a5b3	Open Water	11000	320	290	2026-03-14 15:17:04.440244+00	2026-03-14 15:17:04.440244+00
c54db4b7-2b5d-4a85-8f6a-ed48243f458c	Advanced	9500	275	250	2026-03-14 15:17:04.440244+00	2026-03-14 15:17:04.440244+00
4543f3b5-29a7-472a-8b30-6049394668d3	Rescue	10000	290	265	2026-03-14 15:17:04.440244+00	2026-03-14 15:17:04.440244+00
2ad414e0-2892-4d86-820f-fa5cd26f6d2f	Divemaster	41000	1190	1090	2026-03-14 15:17:04.440244+00	2026-03-14 15:17:04.440244+00
f96b4b3c-5b4f-465d-ac93-94c0475d1006	Instructor	68900	1710	1560	2026-03-14 15:17:04.440244+00	2026-03-14 15:17:04.440244+00
37daab5d-76c9-4baf-9196-ff1cc146082c	Scuba Review	2500	72	66	2026-03-14 15:17:04.440244+00	2026-03-14 15:17:04.440244+00
0e14509a-254c-494e-ac6f-5a1ad67b5dcd	Discover Scuba	2500	72	66	2026-03-14 15:17:04.440244+00	2026-03-14 15:17:04.440244+00
7e6c2035-948b-464a-8d49-1294c9a89e10	Discover Scuba Deluxe	5000	144	132	2026-03-14 15:17:04.440244+00	2026-03-14 15:17:04.440244+00
479b636f-b5bc-4620-bb28-a70f8be05efa	EFR	3500	130	120	2026-03-14 15:17:04.440244+00	2026-03-14 15:17:04.440244+00
1b827edd-c565-4f75-a629-e5ce64e3911f	Open Water	11000	320	290	2026-03-14 17:41:54.641096+00	2026-03-14 17:41:54.641096+00
72e286da-7e0e-4161-b120-f8fc68c23bc9	Advanced	9500	275	250	2026-03-14 17:41:54.641096+00	2026-03-14 17:41:54.641096+00
5846a882-2470-4925-82e7-5be34b17987d	Rescue	10000	290	265	2026-03-14 17:41:54.641096+00	2026-03-14 17:41:54.641096+00
ddc05978-5d1b-4b5a-9bd8-60244491d6bb	Divemaster	41000	1190	1090	2026-03-14 17:41:54.641096+00	2026-03-14 17:41:54.641096+00
402671ba-849c-42b5-939e-8fbb3d8368f1	Instructor	68900	1710	1560	2026-03-14 17:41:54.641096+00	2026-03-14 17:41:54.641096+00
6f9f88db-a8e5-4502-a8aa-fc635cdd1ecf	Scuba Review	2500	72	66	2026-03-14 17:41:54.641096+00	2026-03-14 17:41:54.641096+00
b0fc3416-f61c-48f1-9b03-f731cf56decb	Discover Scuba	2500	72	66	2026-03-14 17:41:54.641096+00	2026-03-14 17:41:54.641096+00
c717de8c-15ef-4dd7-a876-a9ce6325c516	Discover Scuba Deluxe	5000	144	132	2026-03-14 17:41:54.641096+00	2026-03-14 17:41:54.641096+00
2d8d065d-7b89-4f65-be83-df7ee2794397	EFR	3500	130	120	2026-03-14 17:41:54.641096+00	2026-03-14 17:41:54.641096+00
69d2bb93-37ce-4c1c-aa12-3eada908d574	Open Water	11000	320	290	2026-03-14 18:40:11.450497+00	2026-03-14 18:40:11.450497+00
56117d98-195a-4355-a66a-16a98a02f72d	Advanced	9500	275	250	2026-03-14 18:40:11.450497+00	2026-03-14 18:40:11.450497+00
a2e149e6-3832-4526-a95b-208d036818a4	Rescue	10000	290	265	2026-03-14 18:40:11.450497+00	2026-03-14 18:40:11.450497+00
a1a21758-2a74-40e3-9bdf-ea09e6d853a0	Divemaster	41000	1190	1090	2026-03-14 18:40:11.450497+00	2026-03-14 18:40:11.450497+00
c3975afd-bdac-403e-bd3b-e796e3bd43f0	Instructor	68900	1710	1560	2026-03-14 18:40:11.450497+00	2026-03-14 18:40:11.450497+00
9d67f499-02a0-4105-92c5-ab4bb997bca3	Scuba Review	2500	72	66	2026-03-14 18:40:11.450497+00	2026-03-14 18:40:11.450497+00
f05ba512-ea55-4a6b-85a1-45bc513a60a1	Discover Scuba	2500	72	66	2026-03-14 18:40:11.450497+00	2026-03-14 18:40:11.450497+00
b101985a-2cec-432f-8f30-9a22e5a88a97	Discover Scuba Deluxe	5000	144	132	2026-03-14 18:40:11.450497+00	2026-03-14 18:40:11.450497+00
0ae106a1-9387-4b87-b24c-cff047a0d689	EFR	3500	130	120	2026-03-14 18:40:11.450497+00	2026-03-14 18:40:11.450497+00
01988a59-1a8f-4513-80fa-c53144b05a07	Scuba Review	2500	72	66	2026-03-12 19:39:16.81881+00	2026-03-12 19:39:16.81881+00
\.


--
-- TOC entry 4709 (class 0 OID 27410)
-- Dependencies: 419
-- Data for Name: dive_site_pages; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.dive_site_pages (slug, title, content, created_at, updated_at) FROM stdin;
sail-rock	Sail Rock	{"overview": "Sail Rock is the most famous dive site in the Gulf of Thailand, known for its vertical chimney and abundant marine life.", "divingTips": "Bring a torch for the chimney and watch for strong currents.", "quickFacts": ["Max depth: 40m", "Visibility: 10-30m", "Level: All"], "whatYouCanSee": "Large schools of fish, barracuda, and sometimes whale sharks.", "marineLifeHighlights": ["Whale shark", "Barracuda", "Grouper", "Batfish"]}	2026-03-21 13:43:41.781816+00	2026-03-21 13:43:41.781816+00
chumphon-pinnacle	Chumphon Pinnacle	{"overview": "A deep pinnacle with stunning anemone gardens and pelagic visitors.", "divingTips": "Best dived in the morning; watch your depth.", "quickFacts": ["Max depth: 35m", "Visibility: 10-25m", "Level: Intermediate+"], "whatYouCanSee": "Anemone fields, trevally, and occasional whale sharks.", "marineLifeHighlights": ["Trevally", "Batfish", "Whale shark"]}	2026-03-21 13:43:41.781816+00	2026-03-21 13:43:41.781816+00
white-rock	White Rock	{"overview": "A popular site for all levels, featuring boulders, sandy patches, and plenty of marine life.", "divingTips": "Great for night dives; look for sleeping parrotfish.", "quickFacts": ["Max depth: 22m", "Visibility: 8-20m", "Level: All"], "whatYouCanSee": "Blue-spotted stingrays, turtles, and moray eels.", "marineLifeHighlights": ["Blue-spotted stingray", "Turtle", "Moray eel"]}	2026-03-21 13:43:41.781816+00	2026-03-21 13:43:41.781816+00
\.


--
-- TOC entry 4704 (class 0 OID 27031)
-- Dependencies: 414
-- Data for Name: emails; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.emails (id, subject, sender, body, assigned_to, status, created_at) FROM stdin;
\.


--
-- TOC entry 4702 (class 0 OID 25592)
-- Dependencies: 412
-- Data for Name: newdiving; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.newdiving (id, dive_name, location, depth, created_at) FROM stdin;
\.


--
-- TOC entry 4696 (class 0 OID 25242)
-- Dependencies: 404
-- Data for Name: page_content; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.page_content (id, page_slug, locale, section_key, content_type, content_value, updated_by, created_at, updated_at) FROM stdin;
794a0347-c205-4a3f-a5da-da4d4f26078e	contact	nl	form_email_label	text	Email	contact@prodiving.asia	2026-03-12 10:14:37.06477+00	2026-03-14 18:57:12.645596+00
92336773-dba4-458c-a11f-4744c3388c6e	dive-sites/chumphon-pinnacle	nl	overview	text	Chumphon Pinnacle is een van de meest spectaculaire diepduiklocaties van Koh Tao, op ongeveer 30 minuten varen uit de kust. Deze granieten rotstop rijst steil op vanaf de oceaanbodem en vormt een natuurlijke schoonmaakplek voor grote zeedieren. De locatie staat vooral bekend om de betrouwbare walvishaaiwaarnemingen — deze zachte reuzen cruisen hier regelmatig door de diepte. Indrukwekkende scholen giant trevally en chevron-barracuda zorgen voor spectaculaire taferelen, terwijl adelaarsroggen en andere pelagische soorten extra dynamiek toevoegen. De structuur van de pinnacle biedt fraaie doorgangen en geweldige mogelijkheden voor onderwaterfotografie.test	\N	2026-03-28 20:47:21.080002+00	2026-03-28 20:47:21.080002+00
c77950d2-2388-458c-a7e0-9f98f40e0369	rescue	nl	price_thb	text	10000	seed-script	2026-03-14 11:19:45.578131+00	2026-03-28 14:24:16.617176+00
72ee0fec-2fdc-4483-9fdd-0d8b449cd616	dive-sites/sail-rock	en	overview	text	rwst xirebt	contact@prodiving.asia	2026-03-20 09:07:19.116003+00	2026-03-28 20:54:03.477122+00
4f7902a8-218b-4b19-ab54-6aaa0785f8f9	dive-sites/sail-rock	en	marine_life_highlights	text	marine	\N	2026-03-20 09:07:19.116003+00	2026-03-28 20:54:03.477122+00
c2172572-e8fe-4683-a277-bdd1ad6dce4c	dive-sites/sail-rock	en	diving_tips	text	get up early	contact@prodiving.asia	2026-03-20 09:07:19.116003+00	2026-03-28 20:54:03.477122+00
4a558bdc-6145-4e54-a949-9040b5f748f8	fun-diving	nl	fun_diving_marine_life_body	text	From massive whale sharks and graceful sea turtles to colorful reef fish and fascinating macro life, Koh Tao's waters host an incredible variety of marine species. Every dive brings new discoveries and unforgettable encounters.	\N	2026-03-19 11:41:01.371023+00	2026-03-30 11:23:47.936366+00
ec612241-0a19-4d9e-b309-62efc7d9a747	things-to-do	en	title	text	Things to do on Koh Tao	\N	2026-03-28 13:31:13.441375+00	2026-03-28 13:31:13.441375+00
bb271912-9ede-4539-a76f-46d76086fb3b	open-water	en	course_overview	text	The Open Water course combines knowledge development, confined water dives (pool) and open water dives. You'll learn equipment setup, basic underwater skills, buoyancy control and dive planning. Our instructors keep groups small and emphasize safety and fun.	contact@prodiving.asia	2026-03-09 17:57:14.068604+00	2026-03-19 09:21:17.460626+00
62d44777-3468-489f-b795-f3b71f3cb2de	open-water	en	duration	text	3-4 days	contact@prodiving.asia	2026-03-10 12:04:54.885159+00	2026-03-19 09:06:29.499911+00
ee869776-08de-4e08-8a63-0d2af2a3a483	rescue	en	course_overview	text	The Rescue Diver course teaches you to prevent and manage diving emergencies, perform rescues and work confidently as part of a dive team.	seed-script	2026-03-19 08:46:20.615861+00	2026-03-28 14:24:16.326594+00
a90e5938-8acb-4279-912c-2523d19ab6e3	rescue	nl	hero_title	text	PADI Rescue Diver	seed-script	2026-03-14 11:19:45.578131+00	2026-03-28 14:24:16.617176+00
5f12ed38-1fdd-40b2-b300-825cd7c2a0be	things-to-do	en	subtitle	text	Discover adventure, relaxation, and island culture - there is more than just diving!	\N	2026-03-28 13:31:13.441375+00	2026-03-28 13:31:13.441375+00
8d8e6e52-c67f-4c09-bc96-580e845043d3	open-water	nl	hero_title	text	Open Water-cuurse	contact@prodiving.asia	2026-03-09 17:57:14.068604+00	2026-03-19 09:26:12.870657+00
632e3812-8988-453a-ac58-13e2508d4ea2	open-water	en	hero_subtitle	text	The world's most popular scuba course. Learn the fundamentals of scuba diving and get certified to dive independently with a buddy, to 18 metres/60 feet.	contact@prodiving.asia	2026-03-09 17:57:14.068604+00	2026-03-19 09:06:29.499911+00
7ab36fbb-6acb-49a4-9878-37da3a3de977	home	en	course_efr_description	textarea	Why not Learn CPR, first aid, and emergency response skills essential for divers and non-divers.	contact@prodiving.asia	2026-03-12 10:01:50.741687+00	2026-03-27 10:04:26.98066+00
c9c40e12-091f-43d9-a9b1-1478a48735f1	open-water	nl	hero_subtitle	text	De PADI Open Water Diver-cursus is de populairste duikcursus ter wereld. Je leert de basis van het duiken en behaalt je brevet om zelfstandig met een buddy te duiken tot 18 meter/60 voet..	contact@prodiving.asia	2026-03-09 17:57:14.068604+00	2026-03-27 10:22:44.612036+00
299aa0b5-402a-450c-934a-583d5d19dddc	open-water	en	hero_title	text	PADI Open Water Course 	contact@prodiving.asia	2026-03-09 17:57:14.068604+00	2026-03-27 13:16:49.363197+00
0d4e193b-224f-48e0-9d81-3d66aa4695d9	home	en	course_rescue_duration	text	3 days	contact@prodiving.asia	2026-03-12 10:01:50.741687+00	2026-03-16 18:01:39.262481+00
2f6140c7-f240-4d62-8042-31eb6ebd87f8	home	en	course_rescue_price_usd	text	290	contact@prodiving.asia	2026-03-12 13:33:29.379002+00	2026-03-16 18:01:39.262481+00
e92ddf41-f1fb-4cc8-ad5c-204b302e4a54	things-to-do	en	activities_title	text	Popular activities	\N	2026-03-28 13:31:13.441375+00	2026-03-28 13:31:13.441375+00
2b568344-ef97-4a8a-b075-47372880d4b2	things-to-do	en	activities_list	text	Take a snorkeling tour to hidden bays\nJoin a Thai cooking class\nRent a kayak or paddleboard\nExplore the island hiking trails\nRelax with a beach massage\nJoin a yoga or fitness class\nEnjoy sunset views from a rooftop bar\nVisit local art galleries and markets	\N	2026-03-28 13:31:13.441375+00	2026-03-28 13:31:13.441375+00
33473547-da30-4437-8cd7-891107ce3ab0	home	en	hero_title	text	Dive Koh Tao with Diving in Asia.	contact@prodiving.asia	2026-03-12 10:01:50.741687+00	2026-03-16 18:01:39.262481+00
779cbd58-48f6-4e93-9c4c-6b8985070615	things-to-do	en	cta_fun_diving	text	Go fun diving	\N	2026-03-28 13:31:13.441375+00	2026-03-28 13:31:13.441375+00
de1e8b4e-8c76-4b77-9002-a5fba9b694d1	things-to-do	en	cta_beaches	text	Discover beaches	\N	2026-03-28 13:31:13.441375+00	2026-03-28 13:31:13.441375+00
f85354db-ea23-406a-9990-d0f577e37a82	open-water	en	price_eur	text	2900	contact@prodiving.asia	2026-03-10 12:04:54.885159+00	2026-03-19 10:25:21.584591+00
d68b8342-6ec2-47cd-a0a5-0d31a681958d	home	nl	about_paragraph_1	textarea	Koh Tao is niet alleen de meest populaire bestemming in Thailand voor je duikvakantie, maar ook om bijna al je PADI duik certificaties te kunnen halen van beginner tot Instructeur.	contact@prodiving.asia	2026-03-12 10:57:14.010608+00	2026-03-14 18:50:05.442579+00
3e0cd172-d7b4-4b72-b5c8-494fea80f57b	home	nl	courses_section_subtitle	textarea	Kies voor beginner cursussen tot professioneel duik training op Koh Tao.	contact@prodiving.asia	2026-03-12 10:57:14.010608+00	2026-03-14 18:50:05.442579+00
66f9b2d4-2cb9-4668-b883-ba10eaef2fbe	rescue	nl	price_usd	text	290	seed-script	2026-03-14 11:19:45.578131+00	2026-03-28 14:24:16.617176+00
8857efac-e9da-49b5-b9ae-b68f93ee0a8d	open-water	en	price_thb	text	11000	contact@prodiving.asia	2026-03-10 12:04:54.885159+00	2026-03-19 10:26:26.930759+00
a57f7f1b-f4ee-4cdb-a563-37bc42570564	contact	nl	form_subject_label	text	Onderwerp	contact@prodiving.asia	2026-03-12 10:14:37.06477+00	2026-03-14 18:57:12.645596+00
0243b066-5737-40fb-957b-188816e7def6	contact	nl	subject_option_1	text	Cursus informatie	contact@prodiving.asia	2026-03-12 13:34:35.256812+00	2026-03-14 18:57:12.645596+00
dcfbbffd-eeba-40d7-9013-01439f1d6e25	contact	nl	subject_option_2	text	Duik trip boeking	contact@prodiving.asia	2026-03-12 13:34:35.256812+00	2026-03-14 18:57:12.645596+00
c7420425-cd45-44b2-96c5-353d6ea9729d	contact	nl	subject_option_3	text	Uitrusting verhuur	contact@prodiving.asia	2026-03-12 13:34:35.256812+00	2026-03-14 18:57:12.645596+00
1b1a053c-14af-4a5e-8d85-e254c554d2de	contact	nl	subject_option_4	text	Algemene vragen	contact@prodiving.asia	2026-03-12 13:34:35.256812+00	2026-03-14 18:57:12.645596+00
a385f00e-f33e-4a5d-bb61-433539ddff24	contact	nl	form_message_label	text	Bericht	contact@prodiving.asia	2026-03-12 10:14:37.06477+00	2026-03-14 18:57:12.645596+00
eb2670eb-dd0e-4762-91cf-e6fafcad042a	contact	nl	form_submit_label	text	Stuur bericht	contact@prodiving.asia	2026-03-12 10:14:37.06477+00	2026-03-14 18:57:12.645596+00
ba2d18d4-0e8c-4fc9-a821-98a84ba71a9c	contact	nl	form_sending_label	text	Sending...	contact@prodiving.asia	2026-03-12 10:14:37.06477+00	2026-03-14 18:57:12.645596+00
06647a81-36b5-4bbe-bbfa-8e13c2435e94	home	en	course_rescue_level	text	rescue	contact@prodiving.asia	2026-03-12 10:01:50.741687+00	2026-03-27 12:17:14.230573+00
ed9a8160-2b36-466f-98cc-3045d578a8f8	open-water	en	main	text	main test	\N	2026-03-19 07:01:07.673854+00	2026-03-19 10:32:52.236347+00
f6523b65-6d26-4aae-ac0e-0e8acbce0842	dive-sites/sail-rock	nl	overview	text	Dutch overview content here	\N	2026-03-20 09:07:19.116003+00	2026-03-20 09:07:19.116003+00
2b889acc-88e1-476e-b0ff-56fe767ab8b0	things-to-do	en	cta_viewpoints	text	Viewpoints	\N	2026-03-28 13:31:13.441375+00	2026-03-28 13:31:13.441375+00
ad6c35cc-b778-4404-a44f-ec57008b8454	dive-sites/chumphon-pinnacle	nl	quick_facts_depth	text	15-30m	\N	2026-03-28 20:47:21.080002+00	2026-03-28 20:47:21.080002+00
778d7c99-28bf-43a7-a10e-552bfee07c19	open-water	en	price_usd	text	320	contact@prodiving.asia	2026-03-10 12:04:54.885159+00	2026-03-19 09:06:29.499911+00
e3f6a727-1af5-4a00-a3bf-2a2a6c667428	dive-sites/chumphon-pinnacle	nl	quick_facts_difficulty	text	Gevorderd	\N	2026-03-28 20:47:21.080002+00	2026-03-28 20:47:21.080002+00
cf27e590-b019-4757-994f-5044ce4e0fb7	home	en	about_sites_line	textarea	WHITE ROCK - TWINS - GREEN ROCK - CHUMPHON PINNACLE - SAIL ROCK - SOUTHWEST PINNACLE - AND MORE	contact@prodiving.asia	2026-03-12 10:01:50.741687+00	2026-03-16 18:01:39.262481+00
7ff035fa-63d9-447b-95c3-d3fd95d5d576	home	en	about_map_alt	text	Map of Koh Tao and dive sites	contact@prodiving.asia	2026-03-12 10:01:50.741687+00	2026-03-16 18:01:39.262481+00
8bcf3a0c-63ea-46f8-a72f-3093cefc4111	home	en	about_title	textarea	From PADI Open Water certifications to PADI Divemaster internships	contact@prodiving.asia	2026-03-12 10:01:50.741687+00	2026-03-16 18:01:39.262481+00
d6b77613-6947-4ee6-9d3b-85c55236aec9	home	en	courses_section_title	text	Our Diving Courses	contact@prodiving.asia	2026-03-12 10:01:50.741687+00	2026-03-16 18:01:39.262481+00
446e54a5-f0cc-4da5-a764-f4cc6a8810ec	home	en	gallery_headline	text	Check out the photography of our happy customers.	contact@prodiving.asia	2026-03-12 13:33:29.379002+00	2026-03-16 18:01:39.262481+00
533626db-0cc2-475f-aa77-3d5a9d7aa381	open-water	nl	duration	text	3-4 days	contact@prodiving.asia	2026-03-12 14:50:04.862246+00	2026-03-19 09:07:24.603478+00
0f438398-09c3-4f9d-a7dd-eca81c95e718	open-water	nl	price_eur	text	290	contact@prodiving.asia	2026-03-12 14:50:04.862246+00	2026-03-19 09:07:24.603478+00
fe9e3024-af59-434a-807a-d8b9e88adedb	open-water	nl	price_thb	text	11000	contact@prodiving.asia	2026-03-12 14:50:04.862246+00	2026-03-19 09:07:24.603478+00
8d976d52-425f-4dbc-8219-468bb258edc2	open-water	nl	price_usd	text	320	contact@prodiving.asia	2026-03-12 14:50:04.862246+00	2026-03-19 09:07:24.603478+00
e3047f7b-cd8a-492c-972b-12ca63660f21	things-to-do	en	note	text	Koh Tao is more than just diving - there is plenty to explore on land and at sea.	\N	2026-03-28 13:31:13.441375+00	2026-03-28 13:31:13.441375+00
3d572a4d-dfa6-4427-b017-38da49167dbd	things-to-do	en	ideas_title	text	Need more ideas?	\N	2026-03-28 13:31:13.441375+00	2026-03-28 13:31:13.441375+00
d7e0c9b7-a5e5-401e-ab4a-3828f9727326	dive-sites/sail-rock	nl	ready_to_dive	text	Dutch ready to dive content here	\N	2026-03-20 09:07:19.116003+00	2026-03-20 09:07:19.116003+00
250def09-0abf-4d59-a291-d9d1fbddf54a	accommodation	en	bookStay	text	Book Your Stay	\N	2026-03-27 11:51:48.105016+00	2026-03-28 20:55:30.812602+00
b4b4726c-6676-4614-8b33-e59f5cfa96bb	home	nl	about_paragraph_2	textarea	Gecertificeerd voor het leven en wereldwijd geaccepteerd tegen de beste prijzen in Azië. PADI Open Water Cursus voor 11000 Bath, nu inclusief 4 nachten accommodatie.	contact@prodiving.asia	2026-03-12 10:57:14.010608+00	2026-03-14 18:50:05.442579+00
22724b80-b6c0-4d76-96f5-7c41de82a172	dive-sites/sail-rock	nl	marine_life_highlights	text	Dutch marine life highlights here gtest	contact@prodiving.asia	2026-03-20 09:07:19.116003+00	2026-03-23 11:39:56.859897+00
f282e3cd-bb9a-4b4d-a7da-ac0ef9ae3025	dive-sites/sail-rock	nl	quick_facts	text	Dutch quick facts here test	\N	2026-03-20 09:07:19.116003+00	2026-03-23 11:44:59.534359+00
abaa7169-c665-446d-896e-6845aacc9763	open-water	nl	course_overview	text	De Open Water-cursus combineert theorie, beschut water-training (zwembad) en buitenwaterduiken.. Je leert uitrusting opbouwen, basisvaardigheden onder water, drijfvermogen en duikplanning. Onze instructeurs werken met kleine groepen en leggen de nadruk op veiligheid en plezier. test	contact@prodiving.asia	2026-03-09 17:57:14.068604+00	2026-03-27 11:08:22.48645+00
7448662c-2be8-4476-959c-f64b3f2aac89	home	nl	gallery_subtitle	textarea	Ontdek onze adembenemende schoonheid van Koh Tao in onze foto galerij.	contact@prodiving.asia	2026-03-12 10:57:14.010608+00	2026-03-14 18:50:05.442579+00
5889bbe5-cac8-49b6-b899-af5bd51064ce	home	nl	course_open_water_title	text	PADI Open Water Duiker Cursus	contact@prodiving.asia	2026-03-12 10:57:14.010608+00	2026-03-14 18:50:05.442579+00
29fb7603-6087-4447-a71e-8ce852a4b644	home	nl	course_open_water_level	text	Beginner	contact@prodiving.asia	2026-03-12 10:57:14.010608+00	2026-03-14 18:50:05.442579+00
2fab1d1a-3931-4ae2-acff-2572f88dd044	home	nl	course_efr_description	textarea	Learn CPR, first aid, and emergency response skills essential for divers and non-divers.	contact@prodiving.asia	2026-03-12 10:57:14.010608+00	2026-03-14 18:50:05.442579+00
b19f0493-3d2a-408f-b604-db98397ae2c1	contact	nl	section_title	text	Contact ons in het Nederlands	contact@prodiving.asia	2026-03-12 10:14:37.06477+00	2026-03-14 18:57:12.645596+00
42768b52-4452-4ded-9588-4a16a85c3660	contact	nl	section_subtitle	textarea	Ready to explore the underwater world? Contact Bas to book your diving adventure on Koh Tao.	contact@prodiving.asia	2026-03-12 10:14:37.06477+00	2026-03-14 18:57:12.645596+00
e6292335-be40-416f-be3a-0885f36bad63	contact	nl	details_title	text	Contact gegevens	contact@prodiving.asia	2026-03-12 10:14:37.06477+00	2026-03-14 18:57:12.645596+00
03f482f4-2c59-4248-9283-6a74691f4156	contact	nl	location_title	text	Locatie	contact@prodiving.asia	2026-03-12 10:14:37.06477+00	2026-03-14 18:57:12.645596+00
ccf3de3a-53a0-4f15-9b02-53a01846e6bb	contact	nl	location_line_1	text	Sairee Beach, Koh Tao	contact@prodiving.asia	2026-03-12 10:14:37.06477+00	2026-03-14 18:57:12.645596+00
f8f74aa4-c74d-4190-a532-2753c4902603	contact	nl	location_line_2	text	Surat Thani 84360, Thailand	contact@prodiving.asia	2026-03-12 10:14:37.06477+00	2026-03-14 18:57:12.645596+00
c6e80b04-e811-4b57-944c-d18d2a1bb9f2	contact	nl	phone_title	text	Telefoon	contact@prodiving.asia	2026-03-12 10:14:37.06477+00	2026-03-14 18:57:12.645596+00
93dd2eaa-b639-483c-8b4b-c5366897f138	contact	nl	phone_line_1	text	+66 77 456 789	contact@prodiving.asia	2026-03-12 10:14:37.06477+00	2026-03-14 18:57:12.645596+00
f81af0ac-e0ac-4cab-a934-75f7a1feb743	contact	nl	phone_line_2	text	+66 89 123 4567	contact@prodiving.asia	2026-03-12 10:14:37.06477+00	2026-03-14 18:57:12.645596+00
3059561a-f01f-4fd5-a8d7-26ddb09d62f6	contact	nl	email_title	text	Email	contact@prodiving.asia	2026-03-12 10:14:37.06477+00	2026-03-14 18:57:12.645596+00
6e596252-e1e7-4c90-a694-538395aa7c64	contact	nl	email_value	text	contact@prodiving.asia	contact@prodiving.asia	2026-03-12 10:14:37.06477+00	2026-03-14 18:57:12.645596+00
8e51c5aa-e9ea-40bc-a543-25fa6d7ef237	contact	nl	opening_hours_title	text	Openings uren	contact@prodiving.asia	2026-03-12 10:14:37.06477+00	2026-03-14 18:57:12.645596+00
7cd4a144-cbd4-49f1-a254-e7f0eb8f71a8	home	nl	course_rescue_title	text	PADI Rescue Diver Cursus	contact@prodiving.asia	2026-03-12 10:57:14.010608+00	2026-03-14 18:50:05.442579+00
e12839d0-a894-4e05-b7be-47af6bfc420b	home	nl	course_rescue_level	text	Advanced	contact@prodiving.asia	2026-03-12 10:57:14.010608+00	2026-03-14 18:50:05.442579+00
236d1e9d-ae55-4d0b-9d55-216b90b25b87	home	nl	course_rescue_duration	text	3 dagen	contact@prodiving.asia	2026-03-12 10:57:14.010608+00	2026-03-14 18:50:05.442579+00
3d767dd0-eeaa-4551-bdb2-8f65ff806fec	home	nl	course_divemaster_price_usd	text	1190	contact@prodiving.asia	2026-03-12 10:57:14.010608+00	2026-03-14 18:50:05.442579+00
031eab71-5d9a-4abc-9afb-843b57ea4d03	home	nl	course_divemaster_price_eur	text	1090	contact@prodiving.asia	2026-03-12 10:57:14.010608+00	2026-03-14 18:50:05.442579+00
c90b1770-3f75-4cb0-b9c8-c01fa3ed83a8	home	nl	course_instructor_price	text	฿68,900	contact@prodiving.asia	2026-03-12 10:57:14.010608+00	2026-03-14 18:50:05.442579+00
903e7581-fc41-4bd7-9ae7-380ae4c1374a	home	nl	course_instructor_price_usd	text	1710	contact@prodiving.asia	2026-03-12 10:57:14.010608+00	2026-03-14 18:50:05.442579+00
7f57d435-eb27-48d6-ad22-c62e73a138f1	home	nl	course_instructor_price_eur	text	1560	contact@prodiving.asia	2026-03-12 10:57:14.010608+00	2026-03-14 18:50:05.442579+00
608ea314-1be0-41bc-a22b-a8d8ed4da7bf	things-to-do	en	ideas_list	text	Take a day trip to Koh Nang Yuan for snorkeling and iconic views\nTry rock climbing or bouldering for land-based adventure\nTaste street food at the Sairee night market	\N	2026-03-28 13:31:13.441375+00	2026-03-28 13:31:13.441375+00
e341a419-df40-4f47-bb73-aa7e61b92fe2	contact	nl	footer_line_2	textarea	Discover the magic beneath the waves in Thailand's diving paradise. test	contact@prodiving.asia	2026-03-12 10:14:37.06477+00	2026-03-14 18:57:12.645596+00
aab3ccd7-7692-4546-9e81-ba5f9d8441ea	things-to-do	en	more_inspiration	text	For more inspiration, check out our	\N	2026-03-28 13:31:13.441375+00	2026-03-28 13:31:13.441375+00
622cf347-ccba-4f8f-bb0b-2a1917fbbfc1	divemaster	nl	hero_title	text	PADI Divemaster-cursus	contact@prodiving.asia	2026-03-12 15:13:41.90407+00	2026-03-28 13:24:35.370944+00
d5d10d3c-64b7-462d-89c1-bc25617e6c34	things-to-do	en	activity_guide	text	activity guide	\N	2026-03-28 13:31:13.441375+00	2026-03-28 13:31:13.441375+00
7839503f-9ae5-4bb9-91ca-59138d169300	idc	en	hero_title	text	Instructor Training	\N	2026-03-19 11:46:43.890108+00	2026-03-28 13:07:53.76759+00
6a5eb16f-097a-44dc-b681-bf28d66a8444	home	en	about_paragraph_2	textarea	Lifetime certifications valid worldwide, at a surprisingly low price. Earn your PADI diving certification here for 9000 baht, now including 4 nights accommodation in the course price.	contact@prodiving.asia	2026-03-12 10:01:50.741687+00	2026-03-16 18:01:39.262481+00
4a53dfcd-bec6-4875-b3d7-2b30c46c0fef	dive-sites/chumphon-pinnacle	nl	quick_facts_location	text	30 minuten uit de kust	\N	2026-03-28 20:47:21.080002+00	2026-03-28 20:47:21.080002+00
2f070f0d-9f5a-4cce-a4ff-dd5b5ee20329	dive-sites/chumphon-pinnacle	nl	quick_facts_best_time	text	Hele jaar, piekseizoen december-april	\N	2026-03-28 20:47:21.080002+00	2026-03-28 20:47:21.080002+00
b1e6b472-f665-4257-94e0-3f75030aa1c0	home	nl	course_open_water_duration	text	3-4 dagen	contact@prodiving.asia	2026-03-12 10:57:14.010608+00	2026-03-14 18:50:05.442579+00
5379e386-e23b-497a-8d3c-484a77d6950a	home	nl	course_open_water_max_depth	text	18m	contact@prodiving.asia	2026-03-12 10:57:14.010608+00	2026-03-14 18:50:05.442579+00
20d75181-2df1-44e6-8263-742e9b9b8fec	things-to-do	nl	title	text	Wat te doen op Koh Tao	\N	2026-03-28 13:31:13.441375+00	2026-03-28 13:31:13.441375+00
82676135-ea9e-4b9e-b159-76f6b869d4be	things-to-do	nl	subtitle	text	Ontdek avontuur, ontspanning en eilandcultuur - er is meer dan alleen duiken!	\N	2026-03-28 13:31:13.441375+00	2026-03-28 13:31:13.441375+00
3c2b947d-2aea-43a6-aa3c-d85e7687b082	home	en	courses_section_subtitle	textarea	Choose from beginner experiences to professional dive training on Koh Tao.	contact@prodiving.asia	2026-03-12 10:01:50.741687+00	2026-03-16 18:01:39.262481+00
96badf74-e15e-4693-a7de-e2118f4baf9d	home	en	gallery_subtitle	textarea	Experience the breathtaking beauty of Koh Tao’s underwater world in our photo gallery	contact@prodiving.asia	2026-03-12 13:33:29.379002+00	2026-03-16 18:01:39.262481+00
f6bae03d-4359-4fe6-b13a-6554afe90004	home	en	course_open_water_title	text	PADI Open Water Course	contact@prodiving.asia	2026-03-12 10:01:50.741687+00	2026-03-16 18:01:39.262481+00
d954a1b4-bcaa-4d99-8cfd-163a29c41e6c	home	en	course_open_water_level	text	Beginner	contact@prodiving.asia	2026-03-12 10:01:50.741687+00	2026-03-16 18:01:39.262481+00
f8aa02c1-a7c7-4e96-a875-e449ac2bf233	home	en	course_open_water_duration	text	3-4 days	contact@prodiving.asia	2026-03-12 10:01:50.741687+00	2026-03-16 18:01:39.262481+00
fea0c121-7e73-4c51-b6c6-818a86c0e440	home	en	about_paragraph_1	textarea	The Island Koh Tao is not only a top destination in Thailand for your diving holiday, but also ideal for completing almost all PADI dive certifications, for both beginners and experienced divers.	contact@prodiving.asia	2026-03-12 10:01:50.741687+00	2026-03-27 11:40:08.616377+00
9eb1367c-04f2-4587-90e2-f9034ccfa35f	home	en	course_open_water_max_depth	text	18m	contact@prodiving.asia	2026-03-12 10:01:50.741687+00	2026-03-16 18:01:39.262481+00
7aabb7b1-974b-41d5-be39-d4b6f385e695	home	en	course_open_water_price	text	฿11,000 (approximate rate at time of booking)	contact@prodiving.asia	2026-03-12 10:01:50.741687+00	2026-03-16 18:01:39.262481+00
adf25394-4a67-4f09-b3f1-8d321ca0c158	home	en	course_discover_scuba_deluxe_level	text	Beginner	contact@prodiving.asia	2026-03-12 10:01:50.741687+00	2026-03-16 18:01:39.262481+00
cddec770-d071-4d3f-ba49-3e966b012436	home	nl	course_open_water_price	text	฿11,000	contact@prodiving.asia	2026-03-12 10:57:14.010608+00	2026-03-14 18:50:05.442579+00
e4ca2171-29e4-4e6f-a9e8-e2d69caa9a55	home	nl	course_open_water_price_usd	text	320	contact@prodiving.asia	2026-03-12 10:57:14.010608+00	2026-03-14 18:50:05.442579+00
d790103b-b4f0-4ca5-9f7e-4026182a0132	idc	en	course_overview	text	Program Overview.The Instructor pathway trains experienced divers to teach and certify new divers. The IDC includes teaching presentations, student evaluations and practical teaching experience with support from experienced staff instructors.\n\nPrerequisites\nPrerequisite: PADI Divemaster (or equivalent), current EFR, and a minimum number of logged dives as required by PADI. Candidates must complete Instructor exams and assessments.\n\nWhat you'll learn\nTeaching and presentation skills\nCourse management and student evaluation\nRisk management and leadership\nMarketing and business development for instructors\nInclusions\nIDC materials and PADI registration\nPractical teaching sessions and mentoring\nExam preparation and exam fees (where applicable).\n	\N	2026-03-19 11:48:36.578382+00	2026-03-28 13:07:53.76759+00
f5d51115-8bfe-4588-852c-021ad46f5fc2	home	nl	course_open_water_price_eur	text	290	contact@prodiving.asia	2026-03-12 10:57:14.010608+00	2026-03-14 18:50:05.442579+00
a7bfe98e-90fe-458a-bd51-25f68932c5f6	home	nl	course_open_water_description	textarea	Leer de basis van het scuba duiken en behaal je brevet voor je leven lang.	contact@prodiving.asia	2026-03-12 10:57:14.010608+00	2026-03-14 18:50:05.442579+00
d9216991-75de-426d-9e94-61fd14db7221	home	nl	course_instructor_description	textarea	Train to teach scuba professionally and build a dive career anywhere in the world.	contact@prodiving.asia	2026-03-12 10:57:14.010608+00	2026-03-14 18:50:05.442579+00
d0ba8d10-90eb-4053-a976-443589671b32	home	nl	course_discover_scuba_title	text	Discover Scuba Diving (DSD)	contact@prodiving.asia	2026-03-12 10:57:14.010608+00	2026-03-14 18:50:05.442579+00
20eb4605-b561-4fb3-a58b-465a95a6e47f	home	nl	course_discover_scuba_level	text	Beginner	contact@prodiving.asia	2026-03-12 10:57:14.010608+00	2026-03-14 18:50:05.442579+00
de057eb8-d21a-4b3e-96fc-c5a0f57f5b9e	home	nl	course_discover_scuba_duration	text	1 dag	contact@prodiving.asia	2026-03-12 10:57:14.010608+00	2026-03-14 18:50:05.442579+00
5f07123e-9f47-46de-ba14-abb765c2cb49	home	nl	course_discover_scuba_max_depth	text	12m	contact@prodiving.asia	2026-03-12 10:57:14.010608+00	2026-03-14 18:50:05.442579+00
95e0dcc8-bc20-45fc-9381-a9e69babe8bd	home	nl	course_discover_scuba_price	text	฿2,500	contact@prodiving.asia	2026-03-12 10:57:14.010608+00	2026-03-14 18:50:05.442579+00
3341b89c-46ea-4480-af2f-6b72183d4b83	home	nl	course_discover_scuba_price_usd	text	72	contact@prodiving.asia	2026-03-12 10:57:14.010608+00	2026-03-14 18:50:05.442579+00
ebeaa00c-2c57-4c2f-a830-3b7abb0d5dbd	home	nl	course_discover_scuba_price_eur	text	66	contact@prodiving.asia	2026-03-12 10:57:14.010608+00	2026-03-14 18:50:05.442579+00
45b8886e-fd77-4d62-bb20-8a58e8d17b9d	home	nl	course_discover_scuba_description	textarea	No certification required. The perfect first step to experience scuba diving safely.	contact@prodiving.asia	2026-03-12 10:57:14.010608+00	2026-03-14 18:50:05.442579+00
9a5c9429-e13c-415f-adcc-3dc55be51393	home	nl	course_discover_scuba_deluxe_title	text	Discover Scuba Diving Deluxe	contact@prodiving.asia	2026-03-12 10:57:14.010608+00	2026-03-14 18:50:05.442579+00
f04396a5-7c5d-4027-8213-78b5ff3168fb	home	nl	course_discover_scuba_deluxe_level	text	Beginner	contact@prodiving.asia	2026-03-12 10:57:14.010608+00	2026-03-14 18:50:05.442579+00
9de7e12a-4685-4193-b25b-56d215f0883c	dive-sites/chumphon-pinnacle	nl	what_you_can_see	text	Walvishaaien\nScholen trevally\nAdelaarsroggen\nChevron-barracuda	\N	2026-03-28 20:47:21.080002+00	2026-03-28 20:47:21.080002+00
c0bf58f9-53b4-4c7c-bb4d-01998e0bc399	dive-sites/chumphon-pinnacle	nl	marine_life_highlights	text	Walvishaaien (regelmatige waarnemingen)\nGrote scholen giant trevally\nChevron-barracuda\nAdelaarsroggen\nScholen horsmakreel en fusilier\nReuzenbarracuda\nKingfish\nDiverse rifvissen	\N	2026-03-28 20:47:21.080002+00	2026-03-28 20:47:21.080002+00
b27a3f6d-c042-4a3e-8ff8-e6ce889fc85c	dive-sites/chumphon-pinnacle	nl	diving_tips	text	Gevorderde certificering aanbevolen door diepte en stroming\nVroege ochtendtrips vergroten de kans op walvishaaiwaarnemingen\nGroothoeklens aanbevolen voor grote onderwerpen\nBlijf bij je gids bij matige stroming\nPerfect voor specialisatiecursus diepduiken\nWalvishaaien zijn het actiefst bij opkomend tij\nNeem een goede onderwatercamera mee	\N	2026-03-28 20:47:21.080002+00	2026-03-28 20:47:21.080002+00
29974927-5d07-4a21-9db3-bc86993753ca	contact	nl	opening_hours_line_1	text	Daily: 07:00 - 19:00	contact@prodiving.asia	2026-03-12 10:14:37.06477+00	2026-03-14 18:57:12.645596+00
dfea0987-5872-4212-9aa2-6cc09645bd0b	home	en	course_open_water_description	textarea	Learn the fundamentals of scuba diving and become a certified diver for life.	contact@prodiving.asia	2026-03-12 10:01:50.741687+00	2026-03-16 18:01:39.262481+00
44deb547-90fe-4a40-93d1-ae50922eb860	home	en	course_advanced_title	text	Advanced Open Water	contact@prodiving.asia	2026-03-12 10:01:50.741687+00	2026-03-16 18:01:39.262481+00
29e62db7-114f-403d-843b-6442481d3209	dive-sites/chumphon-pinnacle	nl	images	text	/images/chumphon-pinnacle-top.webp\n/images/photo-1682686580849-3e7f67df4015.avif\n/images/photo-1613853250147-2f73e55c1561.avif\n/images/photo-1618865181016-a80ad83a06d3.avif\n/images/photo-1647825194145-2d94e259c745.avif\n/images/photo-1659518893171-b15e20a8e201.avif\n/images/photo-1682687982423-295485af248a.avif	\N	2026-03-28 20:47:21.080002+00	2026-03-28 20:47:21.080002+00
88352f04-e09a-4e55-951e-e74749e30ba8	home	en	course_advanced_level	text	Intermediate	contact@prodiving.asia	2026-03-12 10:01:50.741687+00	2026-03-16 18:01:39.262481+00
c14bf443-9b57-4e43-ade1-268454f48751	home	en	course_advanced_duration	text	2 days	contact@prodiving.asia	2026-03-12 10:01:50.741687+00	2026-03-16 18:01:39.262481+00
5a6b37f3-b01c-43ed-82cd-eae127c88bd4	home	en	course_advanced_max_depth	text	30m	contact@prodiving.asia	2026-03-12 10:01:50.741687+00	2026-03-16 18:01:39.262481+00
fba15d13-37af-449e-892d-c4bc6b22c293	home	en	course_efr_level	text	First Aid	contact@prodiving.asia	2026-03-12 10:01:50.741687+00	2026-03-16 18:01:39.262481+00
7d857d69-26ea-4b86-8fad-4e42a48e77b7	home	en	course_efr_duration	text	1 day	contact@prodiving.asia	2026-03-12 10:01:50.741687+00	2026-03-16 18:01:39.262481+00
9884864e-84a6-4d18-aa76-2ffeab9c13a5	home	en	course_efr_max_depth	text	N/A	contact@prodiving.asia	2026-03-12 10:01:50.741687+00	2026-03-16 18:01:39.262481+00
ff297d1b-8d28-4156-bd72-14bb00e947da	home	en	course_efr_price	text	฿3,500	contact@prodiving.asia	2026-03-12 10:01:50.741687+00	2026-03-16 18:01:39.262481+00
7d308898-2e44-46ea-9296-e9a006bed489	home	en	course_efr_price_usd	text	130	contact@prodiving.asia	2026-03-12 13:33:29.379002+00	2026-03-16 18:01:39.262481+00
8b8b7872-00b9-4330-81d1-b274d2e18598	contact	nl	opening_hours_line_2	text	Emergency: 24/7	contact@prodiving.asia	2026-03-12 10:14:37.06477+00	2026-03-14 18:57:12.645596+00
35540f5b-db3c-4453-8893-28d8ce3bb339	contact	nl	follow_title	text	Volg ons	contact@prodiving.asia	2026-03-12 10:14:37.06477+00	2026-03-14 18:57:12.645596+00
bf0d140f-67dc-447b-b8aa-7977b18b79f1	contact	nl	form_title	text	Stuur ons een bericht	contact@prodiving.asia	2026-03-12 10:14:37.06477+00	2026-03-14 18:57:12.645596+00
2f21146f-93e5-4729-8aa9-2d99d8d3ef63	contact	nl	form_first_name_label	text	Voornaam	contact@prodiving.asia	2026-03-12 10:14:37.06477+00	2026-03-14 18:57:12.645596+00
ea65323c-5e71-4405-ae48-b5676bf26daf	contact	nl	form_last_name_label	text	Achternaam	contact@prodiving.asia	2026-03-12 10:14:37.06477+00	2026-03-14 18:57:12.645596+00
829ad101-7873-4585-854a-36384dc2f064	contact	nl	footer_line_1	textarea	© 2026 Pro Diving Asia. All rights reserved. Powered by One Media Asia @ www.onemedia.asia	contact@prodiving.asia	2026-03-12 10:14:37.06477+00	2026-03-14 18:57:12.645596+00
70acc181-6d89-4330-a9e4-47b49b83de14	open-water	nl	main	text	main test	\N	2026-03-28 13:10:40.754266+00	2026-03-28 13:10:40.754266+00
24f78bfe-02c8-4a3a-806f-54996eef1794	home	nl	about_headline	text	Een klein eiland,  21 km², hagelwitte stranden, turquoise baaien en omringd door meer dan 15 duik plekken..	contact@prodiving.asia	2026-03-12 10:57:14.010608+00	2026-03-19 11:20:46.954052+00
865fb6c2-60a1-49ee-a8a9-1432953efa69	accommodation	nl	heroTitle	text	Verblijf bij ons op Koh Tao	\N	2026-03-27 11:51:48.105016+00	2026-03-28 20:56:02.462461+00
c1954c23-dd7c-48dc-ac74-99f759baa49c	home	nl	hero_primary_cta	text	Boek nu	contact@prodiving.asia	2026-03-12 10:57:14.010608+00	2026-03-14 18:50:05.442579+00
fd177409-56c4-47b4-b09a-71f08166b9d3	home	nl	hero_secondary_cta	text	Cursussen	contact@prodiving.asia	2026-03-12 10:57:14.010608+00	2026-03-14 18:50:05.442579+00
4413d7ef-1092-4c04-9f63-847ffa3a431e	home	nl	about_sites_line	textarea	CHUMPHON PINNACLE- SOUTHWEST PINNACLE - WHITE ROCK - TWINS - GREEN ROCK - SAIL ROCK - en meer.	contact@prodiving.asia	2026-03-12 10:57:14.010608+00	2026-03-14 18:50:05.442579+00
09d4c8e7-5105-4364-8594-65e2131881b4	home	nl	about_map_alt	text	Map van Koh Tao en duik plekken	contact@prodiving.asia	2026-03-12 10:57:14.010608+00	2026-03-14 18:50:05.442579+00
ab2879fa-5a5c-4bee-b06a-d5fa7bfcf2c1	home	nl	about_title	textarea	Van PADI Open Water certificatie tot PADI Open Water Scuba Instructeur.	contact@prodiving.asia	2026-03-12 10:57:14.010608+00	2026-03-14 18:50:05.442579+00
817caf17-9a4c-4cb6-b4fd-18d3a19f407a	home	nl	courses_section_title	text	Onze duik cursussen	contact@prodiving.asia	2026-03-12 10:57:14.010608+00	2026-03-14 18:50:05.442579+00
d817228c-ead6-4cba-926a-66e168ffa3c0	home	nl	course_divemaster_duration	text	2-4 weken	contact@prodiving.asia	2026-03-12 10:57:14.010608+00	2026-03-14 18:50:05.442579+00
cf561b32-e763-4e63-ac43-2df9bc10f732	home	nl	course_divemaster_max_depth	text	40m	contact@prodiving.asia	2026-03-12 10:57:14.010608+00	2026-03-14 18:50:05.442579+00
780e1263-d696-4b0f-b5eb-d0180cf5ac6c	home	nl	course_divemaster_price	text	฿41,000	contact@prodiving.asia	2026-03-12 10:57:14.010608+00	2026-03-14 18:50:05.442579+00
eb61fc50-7648-453c-ab45-ef6958a04aff	home	nl	hero_title	text	Duiken op Koh Tao met Diving in Asia	contact@prodiving.asia	2026-03-12 10:57:14.010608+00	2026-03-14 18:50:05.442579+00
388f12b0-4713-4e6b-a7ea-8d02dfd78eec	home	nl	hero_subtitle	textarea	Ontdek eerste klas duiken, vriendelijke instructeurs en een onvergetelijk onderwater avontuur op Koh Tao.	contact@prodiving.asia	2026-03-12 10:57:14.010608+00	2026-03-14 18:50:05.442579+00
ca28cec5-36b7-42f7-a580-b8845cfa81fd	home	en	course_efr_price_eur	text	120	contact@prodiving.asia	2026-03-12 13:33:29.379002+00	2026-03-16 18:01:39.262481+00
a225d70e-5eec-4e28-bd2b-53f8b10aea05	home	en	course_rescue_title	text	PADI Rescue Diver	contact@prodiving.asia	2026-03-12 10:01:50.741687+00	2026-03-16 18:01:39.262481+00
485dda76-6c11-4752-b5ca-18d3408bffd2	home	en	course_rescue_max_depth	text	30m	contact@prodiving.asia	2026-03-12 10:01:50.741687+00	2026-03-16 18:01:39.262481+00
d1879037-89de-486e-9c6a-8da1f9c64662	home	en	course_open_water_price_usd	text	320	contact@prodiving.asia	2026-03-12 13:33:29.379002+00	2026-03-16 18:01:39.262481+00
4d4cde9d-a07d-4cb0-84e6-9c7e62f99273	home	en	course_open_water_price_eur	text	290	contact@prodiving.asia	2026-03-12 13:33:29.379002+00	2026-03-16 18:01:39.262481+00
0efb7de3-0606-452f-b9df-b3c73916ae3e	rescue	nl	main	text	De Rescue Diver-cursus leert je duiknoodsituaties te voorkomen en te beheersen, reddingen uit te voeren en met vertrouwen als onderdeel van een duikteam te werken.	seed-script	2026-03-19 09:27:05.848954+00	2026-03-28 14:24:16.617176+00
66573a76-6a26-4507-887a-4765fe41fe9c	scuba-review	en	course_overview	text	Quick knowledge review followed by confined and open water skill practice. twst	contact@prodiving.asia	2026-03-14 19:44:35.703938+00	2026-03-27 16:34:52.782657+00
8cf7c436-53f5-4892-acf9-2340883237c8	scuba-review	en	duration	text	1-2 days	contact@prodiving.asia	2026-03-14 19:44:35.703938+00	2026-03-27 16:34:52.782657+00
0b015e1b-fea1-4c7c-ab79-06dccb61482f	scuba-review	en	hero_subtitle	text	Haven't dived in a while? no problemRefresh your skills with a professional instructor.	contact@prodiving.asia	2026-03-14 19:44:35.703938+00	2026-03-27 16:34:52.782657+00
a27ef69d-474a-44bf-9179-a1321f21fde9	scuba-review	en	hero_title	text	Scuba Review / ReActivate	contact@prodiving.asia	2026-03-14 19:44:35.703938+00	2026-03-27 16:34:52.782657+00
f141a8fb-9434-418f-8c97-523228ed7ec9	scuba-review	en	price_eur	text	66	contact@prodiving.asia	2026-03-14 19:44:35.703938+00	2026-03-27 16:34:52.782657+00
a2826ab0-3ef3-4e8b-aa4e-d1a14a28ad1f	scuba-review	en	price_thb	text	2510	contact@prodiving.asia	2026-03-14 19:44:35.703938+00	2026-03-27 16:34:52.782657+00
95e83846-50a3-4e83-80ab-31d6d4982bf9	scuba-review	en	price_usd	text	72	contact@prodiving.asia	2026-03-14 19:44:35.703938+00	2026-03-27 16:34:52.782657+00
2454a76d-c750-4d6b-b8a2-cb622dd57d05	divemaster	en	hero_subtitle	text	Begin your professional diving career. Learn leadership, supervision, and dive management skills. tThe t	contact@prodiving.asia	2026-03-10 05:43:53.838953+00	2026-03-28 20:49:15.98589+00
6c537c29-39b2-4327-8cca-e55f783d4b79	mango-bay	en	diving_tips	text	Perfect for beginners and training dives\nAlso excellent for snorkeling\nLook for grazers in seagrass and reef life\nGreat spot for underwater photography\nCalm water ideal for learning buoyancy\nMultiple coral bommies to explore\nSuitable for longer dives\nPerfect for Open Water certification dives	\N	2026-03-27 13:40:10.789117+00	2026-03-28 12:47:09.516174+00
95195695-d38a-4c3e-8023-63d45e8ab658	home	nl	course_advanced_max_depth	text	30m	contact@prodiving.asia	2026-03-12 10:57:14.010608+00	2026-03-14 18:50:05.442579+00
be60a8d0-e384-49bc-9acc-2d3f18e1660d	home	nl	course_advanced_price	text	฿9,500	contact@prodiving.asia	2026-03-12 10:57:14.010608+00	2026-03-14 18:50:05.442579+00
7388e248-bb49-4cfd-9a77-1da541de20a5	home	nl	course_advanced_price_usd	text	275	contact@prodiving.asia	2026-03-12 10:57:14.010608+00	2026-03-14 18:50:05.442579+00
aae95737-79ea-4098-a1cb-e3c87ee5c743	home	nl	course_advanced_price_eur	text	250	contact@prodiving.asia	2026-03-12 10:57:14.010608+00	2026-03-14 18:50:05.442579+00
055525b2-75ea-45eb-95f9-aa3f60bb4f05	specialty/night-diver	en	hero_subtitle	text	Experience the underwater world after dark — a completely different perspective.	contact@prodiving.asia	2026-03-12 10:27:14.506533+00	2026-03-12 10:27:41.009635+00
ab5c6529-94b8-4b77-b738-4f85a24fe301	specialty/night-diver	en	price_thb	text	6500	contact@prodiving.asia	2026-03-12 10:27:14.506533+00	2026-03-12 10:27:41.009635+00
1ff8efc4-83ea-40a3-b15d-7fbc5e1e043a	specialty/night-diver	en	price_usd	text	188	contact@prodiving.asia	2026-03-12 10:27:14.506533+00	2026-03-12 10:27:41.009635+00
19be12c4-7e59-4c1f-8444-dc00649f0c03	specialty/night-diver	en	price_eur	text	172	contact@prodiving.asia	2026-03-12 10:27:14.506533+00	2026-03-12 10:27:41.009635+00
7c78b3c6-535e-418c-b4d9-92fa8794c5da	specialty/night-diver	en	duration	text	2 days	contact@prodiving.asia	2026-03-12 10:27:14.506533+00	2026-03-12 10:27:41.009635+00
17bfae90-61c5-407e-a4b2-4f6e992fec53	home	nl	course_advanced_description	textarea	Build confidence underwater, improve navigation, and unlock deeper dive adventures.Versterk je vertrouwen onderwater en verleg je grenzen.	contact@prodiving.asia	2026-03-12 10:57:14.010608+00	2026-03-14 18:50:05.442579+00
24253be4-997b-4076-af12-23d3b74221ab	home	nl	course_efr_title	text	Emergency First Response Cursus	contact@prodiving.asia	2026-03-12 10:57:14.010608+00	2026-03-14 18:50:05.442579+00
7f47c07d-56c4-4138-bf60-dea1e1ae653e	home	nl	course_efr_level	text	First Aid	contact@prodiving.asia	2026-03-12 10:57:14.010608+00	2026-03-14 18:50:05.442579+00
81ba8988-d9d7-46f2-8e4e-945adb42ab4e	home	nl	course_efr_duration	text	1 day	contact@prodiving.asia	2026-03-12 10:57:14.010608+00	2026-03-14 18:50:05.442579+00
f54f96d7-2c6d-4c81-8fcb-36476f3cfc36	home	nl	course_efr_max_depth	text	N/A	contact@prodiving.asia	2026-03-12 10:57:14.010608+00	2026-03-14 18:50:05.442579+00
c50b27ce-991d-48db-a9c7-77eba0b31f97	home	nl	course_efr_price	text	฿3,500	contact@prodiving.asia	2026-03-12 10:57:14.010608+00	2026-03-14 18:50:05.442579+00
2d118e07-26ed-40d8-916c-69460122e91f	divemaster	en	hero_title	text	PADI Divemaster Course	contact@prodiving.asia	2026-03-10 05:43:53.838953+00	2026-03-28 20:49:15.98589+00
54f57b9c-27aa-47b9-9319-2925812cdfa9	discover-scuba	en	hero_title	text	Discover Scuba Diving (DSD)	seed-script	2026-03-27 10:52:08.104218+00	2026-03-28 16:44:59.316524+00
2413da27-5601-4a9c-9787-cc665e20f5fc	home	en	course_instructor_max_depth	text	40m	contact@prodiving.asia	2026-03-12 10:01:50.741687+00	2026-03-16 18:01:39.262481+00
cceb7213-ff60-42b1-9c17-5d065493c7d7	home	en	course_instructor_price	text	฿68,900	contact@prodiving.asia	2026-03-12 10:01:50.741687+00	2026-03-16 18:01:39.262481+00
eb26e5bc-fb5c-41af-aa39-1160cba6cc28	home	nl	course_efr_price_usd	text	130	contact@prodiving.asia	2026-03-12 10:57:14.010608+00	2026-03-14 18:50:05.442579+00
6a8162e6-e659-4043-8f93-d44a27a5b179	home	nl	course_efr_price_eur	text	120	contact@prodiving.asia	2026-03-12 10:57:14.010608+00	2026-03-14 18:50:05.442579+00
7225e1d1-f7e4-457e-ad17-36d8a505e9b5	home	en	course_instructor_price_usd	text	1710	contact@prodiving.asia	2026-03-12 13:33:29.379002+00	2026-03-16 18:01:39.262481+00
38baeacd-76ee-4563-9a9a-4872e29b89c8	home	en	course_instructor_price_eur	text	1560	contact@prodiving.asia	2026-03-12 13:33:29.379002+00	2026-03-16 18:01:39.262481+00
2f13d468-41b9-4e57-9c57-5525db7a65b2	home	en	course_divemaster_max_depth	text	40m	contact@prodiving.asia	2026-03-12 10:01:50.741687+00	2026-03-16 18:01:39.262481+00
8580f2dd-f5d5-4141-acd1-1e854d6ca237	scuba-review	nl	course_overview	text	Quick knowledge review followed by confined and open water skill practice. twst	\N	2026-03-28 13:10:40.754266+00	2026-03-28 13:10:40.754266+00
f477a9ca-d62f-4903-b287-3d9f347931eb	scuba-review	nl	duration	text	1-2 days	\N	2026-03-28 13:10:40.754266+00	2026-03-28 13:10:40.754266+00
5ec928ee-ec53-4687-9634-598cbffae812	specialty/night-diver	en	course_overview	text	Experiece Complete 3 night dives and learn to navigate, communicate, and manage buoyancy in the dark.	contact@prodiving.asia	2026-03-12 10:27:14.506533+00	2026-03-27 09:56:18.852821+00
15879881-e6ad-45aa-810b-846442c1ccc3	mango-bay	en	images	text	/images/mango-bay.webp	\N	2026-03-27 16:24:21.72643+00	2026-03-28 12:47:09.516174+00
dde591f0-0629-48e0-8f83-7aaca2bec2c3	specialty/night-diver	en	hero_title	text	Night Diver Specialty Course	contact@prodiving.asia	2026-03-12 10:27:14.506533+00	2026-03-27 09:56:50.040346+00
32464573-033a-4577-82bc-944f332f0753	mango-bay	nl	marine_life_highlights	text	Gezond rifecosysteem\nKleurrijke harde en zachte koralen\nZeeanemonen\nRijk onderwaterleven	\N	2026-03-27 13:40:10.789117+00	2026-03-28 12:47:09.516174+00
7dea3b64-dc62-4b11-8395-f6a19176238e	contact	en	footer_line_1	textarea	Copyright © 2026 Pro Diving Asia. All rights reserved. Powered by One Media Asia @ www.onemedia.asia	contact@prodiving.asia	2026-03-12 14:31:13.936296+00	2026-03-27 15:36:52.774606+00
e88a5576-4128-4541-8b39-2e0714e5127b	discover-scuba-deluxe	nl	hero_title	text	Discover Scuba Diving Deluxe. dutch	\N	2026-03-19 11:07:40.674469+00	2026-03-27 13:13:36.994736+00
bd8b3820-5b6e-4c76-9476-e66b0e976c26	contact	en	footer_line_2	textarea	Discover the magic beneath the waves in Thailand's diving paradise.	contact@prodiving.asia	2026-03-12 14:31:13.936296+00	2026-03-27 15:36:52.774606+00
5c713fe5-25dc-4f28-bd6a-542ff9c58c5f	contact	en	form_email_label	text	Emailsdsdsdsds	contact@prodiving.asia	2026-03-12 14:31:13.936296+00	2026-03-27 15:36:52.774606+00
d3fc0bb9-ae99-4c46-acaa-c727afdb8df6	scuba-review	nl	hero_subtitle	text	Haven't dived in a while? no problemRefresh your skills with a professional instructor.	\N	2026-03-28 13:10:40.754266+00	2026-03-28 13:10:40.754266+00
ac027a22-0789-43bc-925d-98a856dcf9be	scuba-review	nl	hero_title	text	Scuba Review / ReActivate	\N	2026-03-28 13:10:40.754266+00	2026-03-28 13:10:40.754266+00
66d6c2fc-58a1-41d2-a079-729f802008f2	scuba-review	nl	price_eur	text	66	\N	2026-03-28 13:10:40.754266+00	2026-03-28 13:10:40.754266+00
4c644169-7cd2-4ca6-af22-4bfa30707a4a	scuba-review	nl	price_thb	text	2510	\N	2026-03-28 13:10:40.754266+00	2026-03-28 13:10:40.754266+00
4ff24bae-97f4-42fb-96db-148d93068ade	scuba-review	nl	price_usd	text	72	\N	2026-03-28 13:10:40.754266+00	2026-03-28 13:10:40.754266+00
b7be4ef0-2853-4f76-b983-2a13a3886d68	specialty/night-diver	nl	hero_subtitle	text	Experience the underwater world after dark — a completely different perspective.	\N	2026-03-28 13:10:40.754266+00	2026-03-28 13:10:40.754266+00
cd87b081-c636-4661-8803-c1143b947543	discover-scuba	en	price_thb	text	2500	seed-script	2026-03-27 10:52:08.104218+00	2026-03-28 16:44:59.316524+00
17535187-e943-449f-b9f5-82aead486e78	discover-scuba	en	price_usd	text	72	seed-script	2026-03-27 10:52:08.104218+00	2026-03-28 16:44:59.316524+00
1a126263-84cf-4cb5-8e67-9aec50565b07	home	en	hero_primary_cta	text	Book Now	contact@prodiving.asia	2026-03-12 10:01:50.741687+00	2026-03-16 18:01:39.262481+00
2f125d5b-b915-401c-8062-ecc2a9b4f461	home	en	hero_secondary_cta	text	Courses	contact@prodiving.asia	2026-03-12 10:01:50.741687+00	2026-03-16 18:01:39.262481+00
af6a9bcc-a08c-4950-98f1-824abd033b79	home	en	about_headline	textarea	Small island, 21 km², lush and surrounded by more than 15 dive sites.	contact@prodiving.asia	2026-03-12 10:01:50.741687+00	2026-03-16 18:01:39.262481+00
a050d323-72a8-4a93-9662-428bf2d04d39	home	en	course_rescue_price	text	฿10,000	contact@prodiving.asia	2026-03-12 10:01:50.741687+00	2026-03-16 18:01:39.262481+00
cabc8147-f76d-4185-852b-c7106adf9c43	home	en	course_rescue_price_eur	text	265	contact@prodiving.asia	2026-03-12 13:33:29.379002+00	2026-03-16 18:01:39.262481+00
e227e860-45bb-4e9d-a746-e1e05012d61f	home	en	course_rescue_description	textarea	Learn to prevent and manage dive emergencies while becoming a stronger, more aware diver.	contact@prodiving.asia	2026-03-12 10:01:50.741687+00	2026-03-16 18:01:39.262481+00
29e521f3-ae32-44a6-882e-3cef9c2df14a	discover-scuba-deluxe	en	hero_title	text	Discover Scuba Deluxe Course	\N	2026-03-19 12:11:37.004243+00	2026-03-27 10:58:34.403207+00
d3ed0e57-2b1a-406c-9f58-7a87eb890f7e	home	en	course_divemaster_level	text	Professional	contact@prodiving.asia	2026-03-12 10:01:50.741687+00	2026-03-16 18:01:39.262481+00
f5f5527d-dab2-4dc1-a706-cad242fb1e88	home	en	course_divemaster_duration	text	2-4 weeks	contact@prodiving.asia	2026-03-12 10:01:50.741687+00	2026-03-16 18:01:39.262481+00
2c871938-cb7b-47fc-94be-5ce842c8abcc	weather	nl	hero_subtitle	text	When is the best time to visit and dive at Koh Tao?	contact@prodiving.asia	2026-03-12 18:28:13.575925+00	2026-03-12 18:28:13.575925+00
b691b6ff-ccde-4f3c-859b-34927f078f3a	weather	nl	best_months	text	March – September	contact@prodiving.asia	2026-03-12 18:28:13.575925+00	2026-03-12 18:28:13.575925+00
b7e223b4-c088-44bb-ae80-6753b812137f	weather	nl	avg_visibility	text	10–25m	contact@prodiving.asia	2026-03-12 18:28:13.575925+00	2026-03-12 18:28:13.575925+00
3b452a0f-2f74-4c97-8374-17adc8f2d970	home	nl	course_advanced_level	text	Tussenliggend	contact@prodiving.asia	2026-03-12 10:57:14.010608+00	2026-03-14 18:50:05.442579+00
a234a6b2-7ff1-4427-b2fd-6ec78b74f482	home	nl	course_advanced_duration	text	2 dagen	contact@prodiving.asia	2026-03-12 10:57:14.010608+00	2026-03-14 18:50:05.442579+00
0cbf6ad4-5565-4878-a2a3-b4e81bfe68cc	home	nl	course_rescue_max_depth	text	30m	contact@prodiving.asia	2026-03-12 10:57:14.010608+00	2026-03-14 18:50:05.442579+00
8aa73a57-1f56-4321-b84b-0dd2baca60d1	home	nl	course_rescue_price	text	฿10,000	contact@prodiving.asia	2026-03-12 10:57:14.010608+00	2026-03-14 18:50:05.442579+00
61f17bcb-2afd-4945-8bfe-98bedb39845b	home	nl	course_advanced_title	text	Advanced Open Water..	contact@prodiving.asia	2026-03-12 10:57:14.010608+00	2026-03-27 13:37:55.758877+00
add9bb79-cfb1-4905-8423-9c97bbd8f9ea	accommodation	en	heroTitle	text	Stay With Us In Koh Tao	\N	2026-03-19 11:38:09.488403+00	2026-03-28 20:55:30.812602+00
5ae98585-333f-4311-adeb-b1dd49ee6726	home	nl	course_rescue_price_usd	text	290	contact@prodiving.asia	2026-03-12 10:57:14.010608+00	2026-03-14 18:50:05.442579+00
672d4557-5720-4516-a5e5-06b127515e52	home	nl	course_rescue_price_eur	text	265	contact@prodiving.asia	2026-03-12 10:57:14.010608+00	2026-03-14 18:50:05.442579+00
b70d3220-501b-47f5-9ef0-018c2a4084f2	home	nl	course_rescue_description	textarea	Learn to prevent and manage dive emergencies while becoming a stronger, more aware diver.	contact@prodiving.asia	2026-03-12 10:57:14.010608+00	2026-03-14 18:50:05.442579+00
ed90e241-f138-4f66-b5f5-1243fce07d03	home	nl	course_divemaster_title	text	PADI Divemaster Cursus	contact@prodiving.asia	2026-03-12 10:57:14.010608+00	2026-03-14 18:50:05.442579+00
ca12841c-1e85-4994-873a-5939f57a36b7	home	nl	course_divemaster_level	text	Professioneel	contact@prodiving.asia	2026-03-12 10:57:14.010608+00	2026-03-14 18:50:05.442579+00
01217185-2131-4a71-b029-9bb3c3d830e3	home	en	course_divemaster_title	text	PADI Divemaster	contact@prodiving.asia	2026-03-12 10:01:50.741687+00	2026-03-19 09:00:18.344369+00
a2f38241-4686-47db-86fc-254082077b74	home	nl	course_divemaster_description	textarea	Start your professional dive career and train to lead certified divers underwater.	contact@prodiving.asia	2026-03-12 10:57:14.010608+00	2026-03-14 18:50:05.442579+00
18868f86-1be9-41c3-aecf-fb6ee4f281a1	main	en	contact	text	Your contact info here	\N	2026-03-19 09:30:15.75136+00	2026-03-19 09:30:15.75136+00
c8789bcc-b998-4623-a901-86359638909c	home	nl	course_instructor_title	text	PADI Instructeurs Cursus	contact@prodiving.asia	2026-03-12 10:57:14.010608+00	2026-03-14 18:50:05.442579+00
7c3c4e97-3b4d-4302-b5b1-9a75463d339d	home	nl	course_instructor_level	text	Professioneel	contact@prodiving.asia	2026-03-12 10:57:14.010608+00	2026-03-14 18:50:05.442579+00
83c877f2-1d59-463f-ace3-af7eed378e7b	home	nl	course_instructor_duration	text	2-3 weken	contact@prodiving.asia	2026-03-12 10:57:14.010608+00	2026-03-14 18:50:05.442579+00
ef7c0548-fdab-43c5-96c0-490cfe545911	home	nl	course_instructor_max_depth	text	40m	contact@prodiving.asia	2026-03-12 10:57:14.010608+00	2026-03-14 18:50:05.442579+00
7dcc8982-bf0e-4778-bc40-88072edf24f6	home	en	course_divemaster_price_eur	text	1090	contact@prodiving.asia	2026-03-12 13:33:29.379002+00	2026-03-16 18:01:39.262481+00
46fbce53-0c70-406a-ba64-062bc0a0fefe	home	en	course_divemaster_description	textarea	Start your professional dive career and train to lead certified divers underwater.	contact@prodiving.asia	2026-03-12 10:01:50.741687+00	2026-03-16 18:01:39.262481+00
0e4051a0-92f9-49b3-837b-5edd3059bf42	home	en	course_instructor_title	text	PADI Instructor	contact@prodiving.asia	2026-03-12 10:01:50.741687+00	2026-03-16 18:01:39.262481+00
7d248508-f2dc-49a5-a40a-8f3498523cf9	weather	nl	avg_water_temp	text	29–30°C	contact@prodiving.asia	2026-03-12 18:28:13.575925+00	2026-03-27 09:36:16.208845+00
57859014-b94f-4f54-828d-28045d1b6629	weather	nl	intro	textarea	yesy Koh Tao has a tropical climate with two main seasons. The best diving conditions are typically from March to September.	contact@prodiving.asia	2026-03-12 18:28:13.575925+00	2026-03-27 10:07:14.810098+00
eb1b1f69-19ec-4979-8cd5-c200a8314c52	weather	nl	hero_title	text	Koh Tao Weather -  (nl)	contact@prodiving.asia	2026-03-12 18:28:13.575925+00	2026-03-27 10:29:05.476188+00
8a37b384-502d-4947-8c7f-d43504dedcdb	home	en	hero_subtitle	textarea	Discover world-class diving, friendly instructors, and unforgettable underwater adventures on Koh Tao.	contact@prodiving.asia	2026-03-12 10:01:50.741687+00	2026-03-16 18:01:39.262481+00
fcefe891-114b-42d9-b099-afa0c6ce65fd	specialty/night-diver	nl	price_thb	text	6500	\N	2026-03-28 13:10:40.754266+00	2026-03-28 13:10:40.754266+00
7cb9acf3-4fc6-4b55-98ec-64a1bc77ced2	specialty/night-diver	nl	price_usd	text	188	\N	2026-03-28 13:10:40.754266+00	2026-03-28 13:10:40.754266+00
9610e28b-1af7-4166-b16a-43bc4e7170eb	accommodation	nl	bookStay	text	Boek verblijf	\N	2026-03-27 11:51:48.105016+00	2026-03-28 20:56:02.462461+00
8a55f972-ccac-44eb-8cc0-6a3121b25848	discover-scuba	en	price_eur	text	66	seed-script	2026-03-27 10:52:08.104218+00	2026-03-28 16:44:59.316524+00
d7cb8cb9-a448-4f60-8c23-479cb9e9d32e	accommodation	nl	ctaBody	text	Voeg accommodatie toe aan je duiktrip en stuur direct je aanvraag.	\N	2026-03-27 11:51:48.105016+00	2026-03-28 20:56:02.462461+00
54d53058-35e8-4b28-abc9-2f25ec73b06d	home	en	course_advanced_price	text	฿9,500	contact@prodiving.asia	2026-03-12 10:01:50.741687+00	2026-03-16 18:01:39.262481+00
07a78d66-b4af-41a8-afa1-8c407b81ff1b	home	en	course_advanced_price_usd	text	275	contact@prodiving.asia	2026-03-12 13:33:29.379002+00	2026-03-16 18:01:39.262481+00
8a5f21c0-0bad-476a-8339-38f64daf3462	home	en	course_advanced_price_eur	text	250	contact@prodiving.asia	2026-03-12 13:33:29.379002+00	2026-03-16 18:01:39.262481+00
b5b44ea1-8127-439d-bcfc-182ce16ea097	home	en	course_advanced_description	textarea	Build confidence underwater, improve navigation, and unlock deeper dive adventures.	contact@prodiving.asia	2026-03-12 10:01:50.741687+00	2026-03-16 18:01:39.262481+00
b53f5381-c55e-4cb9-92a3-9a6770dbb5ea	home	en	course_efr_title	text	Emergency First Response	contact@prodiving.asia	2026-03-12 10:01:50.741687+00	2026-03-16 18:01:39.262481+00
0296f192-c9a9-4faa-8062-2fdce7f615c2	home	en	course_divemaster_price	text	฿41,000	contact@prodiving.asia	2026-03-12 10:01:50.741687+00	2026-03-16 18:01:39.262481+00
c01e30cd-086c-4d78-97a9-afa93470a1d3	home	en	course_divemaster_price_usd	text	1190	contact@prodiving.asia	2026-03-12 13:33:29.379002+00	2026-03-16 18:01:39.262481+00
40bf86b2-9446-483e-9f03-3b10bd0806ec	divemaster	nl	price_thb	text	41000	contact@prodiving.asia	2026-03-12 15:13:41.90407+00	2026-03-28 13:24:35.370944+00
30df76bb-c852-42cf-a4e8-e5720d7bf891	divemaster	nl	price_usd	text	1190	contact@prodiving.asia	2026-03-12 15:13:41.90407+00	2026-03-28 13:24:35.370944+00
9c2e2099-df2c-4e49-8d99-80457873d925	htms-sattakut	en	diving_tips	text	Advanced certification required for wreck diving Excellent site for wreck diving specialty course Respect the historical significance of the site Use wreck diving techniques and penetration skills Stay with your guide when exploring the interior Perfect for underwater photography Conserve air due to depth and exploration Look for the ship's historical features	\N	2026-03-27 13:40:10.789117+00	2026-03-28 20:54:03.477122+00
2b774b19-9be2-4698-b862-92b96f05a68c	fun-diving	nl	fun_diving_hero_title	text	Fun Diving Course	\N	2026-03-19 11:39:25.538933+00	2026-03-30 11:23:47.936366+00
c457fffb-44b5-497b-a4ab-839a4a8290af	discover-scuba	en	course_overview	text	Discover Scuba Diving is designed for non-certified divers who want to safely experience real scuba diving with a professional instructor. You start with a simple briefing and essential skills in confined water, then continue to shallow open water for your first dive. test	seed-script	2026-03-27 10:52:08.104218+00	2026-03-28 16:44:59.316524+00
67a6c47f-01c8-442b-ac0c-eaaeb02d9448	htms-sattakut	en	images	text	/images/htms-sattakut.jpg /images/htms-sattakut-wreck.jpg /images/wreck.jpg	\N	2026-03-27 16:24:21.72643+00	2026-03-28 20:54:03.477122+00
f0544a59-d753-4432-82e6-cd057e3987a3	scuba-diver	nl	price_eur	text	225	contact@prodiving.asia	2026-03-12 14:55:52.765748+00	2026-03-28 14:21:05.68676+00
a493c3c5-d25f-4ac3-85f8-5640fb497a90	dive-sites/chumphon-pinnacle	en	quick_facts_difficulty	text	Advanced	\N	2026-03-28 20:43:16.430069+00	2026-03-28 20:54:03.477122+00
9ad54f99-5336-4d43-85cf-f9c67c7b6eaa	discover-scuba	nl	hero_subtitle	text	Ervaar hoe het is om onder water te ademen, zonder brevet nodig. Dit beginnersprogramma is de perfecte eerste duikervaring op Koh Tao.	seed-script	2026-03-28 13:10:40.754266+00	2026-03-28 14:24:16.326594+00
c13332cd-1c48-4407-a50a-5be5d420a6ab	discover-scuba	nl	price_thb	text	2500	seed-script	2026-03-28 13:10:40.754266+00	2026-03-28 14:24:16.326594+00
7c508ef2-6018-4666-80da-e3301d656465	dive-sites/chumphon-pinnacle	en	quick_facts_location	text	30 minutes offshore	\N	2026-03-28 20:43:16.430069+00	2026-03-28 20:54:03.477122+00
9274108c-5901-4e45-88db-c3c95620830a	advanced	en	course_overview	text	The PADI Advanced Open Water course improves your underwater skills through hands-on dives. Includes Deep, Navigation, Peak Performance Buoyancy, and two electives like Night or Wreck diving.	seed-script	2026-03-19 09:34:01.457905+00	2026-03-28 14:24:15.888987+00
12254160-0b57-4eff-a0bd-9dc4a1a76d73	scuba-diver	nl	hero_title	text	PADI Scuba Diver-cursus	seed-script	2026-03-12 14:55:52.765748+00	2026-03-28 14:24:15.888987+00
bc5624b2-9d42-428f-8b93-94f37cf3d6c5	home	en	course_discover_scuba_title	text	Discover Scuba Diving (DSD)	contact@prodiving.asia	2026-03-12 10:01:50.741687+00	2026-03-16 18:01:39.262481+00
f7e83d2c-b02e-40f7-8643-53bd5d5c552f	scuba-diver	nl	hero_subtitle	text	Ontdek de onderwaterwereld met vertrouwen. De PADI Scuba Diver-cursus is perfect voor wie duiken wil proberen voordat je voor volledige certificering gaat.	seed-script	2026-03-12 14:55:52.765748+00	2026-03-28 14:24:15.888987+00
745c48e9-17bc-4b68-9626-a5f82bee183e	scuba-diver	nl	price_usd	text	245	contact@prodiving.asia	2026-03-12 14:55:52.765748+00	2026-03-28 14:21:05.68676+00
71bd7b12-d532-4311-a4bd-60982998451d	discover-scuba-deluxe	en	course_overview	text	The Course Overview\nDiscover Scuba Diving Deluxe is ideal if you want more than a short try dive. You begin with foundational skills in a controlled environment and then continue to multiple open water dives around Koh Tao with your instructor.	\N	2026-03-19 12:13:52.569181+00	2026-03-27 11:00:11.161657+00
29f1dd30-0bb5-42dd-b2dd-589806a5db4c	specialty/night-diver	nl	price_eur	text	172	\N	2026-03-28 13:10:40.754266+00	2026-03-28 13:10:40.754266+00
0b98bcd2-dc6e-4a25-bd10-3680c3ea4b91	contact	en	details_title	text	Contact Us	contact@prodiving.asia	2026-03-12 14:31:13.936296+00	2026-03-27 15:36:52.774606+00
6c07c701-ff06-445b-97f6-da7c185f1155	home	en	course_discover_scuba_max_depth	text	12m	contact@prodiving.asia	2026-03-12 10:01:50.741687+00	2026-03-16 18:01:39.262481+00
6a91bd2b-3c8c-462e-8505-e39b5c44fce9	home	en	course_discover_scuba_price	text	฿2,500	contact@prodiving.asia	2026-03-12 10:01:50.741687+00	2026-03-16 18:01:39.262481+00
a3364269-9128-4306-8d73-85182fd4789f	home	en	course_discover_scuba_price_usd	text	72	contact@prodiving.asia	2026-03-12 13:33:29.379002+00	2026-03-16 18:01:39.262481+00
d15a339d-1b6a-44d2-8baf-5a7cce004af2	home	en	course_discover_scuba_price_eur	text	66	contact@prodiving.asia	2026-03-12 13:33:29.379002+00	2026-03-16 18:01:39.262481+00
1e982a94-d6ee-4aed-8110-41b4884d63d2	home	en	course_discover_scuba_description	textarea	No certification required. The perfect first step to experience scuba diving safely.	contact@prodiving.asia	2026-03-12 10:01:50.741687+00	2026-03-16 18:01:39.262481+00
539752c6-5728-435a-b792-3d04ac985f42	specialty/night-diver	nl	duration	text	2 days	\N	2026-03-28 13:10:40.754266+00	2026-03-28 13:10:40.754266+00
ef245e05-496b-475f-abc0-ce4d26021eb0	specialty/night-diver	nl	course_overview	text	Experiece Complete 3 night dives and learn to navigate, communicate, and manage buoyancy in the dark.	\N	2026-03-28 13:10:40.754266+00	2026-03-28 13:10:40.754266+00
a8e5088c-5243-49f7-b9b2-b6628e22048e	specialty/night-diver	nl	hero_title	text	Night Diver Specialty Course	\N	2026-03-28 13:10:40.754266+00	2026-03-28 13:10:40.754266+00
72e6c422-8364-4e94-9cde-d19bc867b36f	scuba-diver	nl	price_thb	text	8500	seed-script	2026-03-12 14:55:52.765748+00	2026-03-28 14:24:15.888987+00
242a1201-37eb-4772-ac12-f61c83728bc7	accommodation	nl	bookOurAccommodation	text	Book Our Accommodation	\N	2026-03-27 11:51:48.105016+00	2026-03-28 20:56:02.462461+00
afe5a93c-5932-4033-a6e0-6d2f7f821184	home	en	course_discover_scuba_deluxe_title	text	Discover Scuba Diving Deluxe	contact@prodiving.asia	2026-03-12 10:01:50.741687+00	2026-03-16 18:01:39.262481+00
b1711a13-378a-402a-95c3-627585458fe1	contact	en	email_title	text	Email	contact@prodiving.asia	2026-03-12 14:31:13.936296+00	2026-03-27 15:36:52.774606+00
76c65934-1ce7-4a38-b74d-3f1943606b59	contact	en	email_value	text	contact@prodiving.asia.	contact@prodiving.asia	2026-03-12 14:31:13.936296+00	2026-03-27 15:36:52.774606+00
16bd2e40-40e1-4859-a6a3-8126582f542d	contact	en	follow_title	text	Follow Us	contact@prodiving.asia	2026-03-12 14:31:13.936296+00	2026-03-27 15:36:52.774606+00
074463b8-0ce9-4b91-941f-2cdb6078a096	contact	en	location_line_1	text	Sairee Beach, Koh Tao	contact@prodiving.asia	2026-03-12 14:31:13.936296+00	2026-03-27 15:36:52.774606+00
4d611d27-7f32-4b9d-bee6-cd44b388c4a5	contact	en	location_line_2	text	Surat Thani 84360, Thailand	contact@prodiving.asia	2026-03-12 14:31:13.936296+00	2026-03-27 15:36:52.774606+00
bc8d9bac-85b9-4626-a8fe-a48e92b051fb	dive-sites/chumphon-pinnacle	en	quick_facts_best_time	text	Year-round, peak season December-April	\N	2026-03-28 20:43:16.430069+00	2026-03-28 20:54:03.477122+00
509fad39-2aa5-4e0c-b555-8558e5a4c88d	dive-sites/chumphon-pinnacle	en	what_you_can_see	text	Whalesharks Trevally Schools Eagle Rays Chevron Barracuda	\N	2026-03-28 20:43:16.430069+00	2026-03-28 20:54:03.477122+00
7d796134-4fb0-4a57-b322-4e03ca140c18	dive-sites/chumphon-pinnacle	en	marine_life_highlights	text	Whalesharks (regular sightings) Giant Trevally schools Chevron Barracuda Eagle Rays Scad and Fusilier schools Giant Barracuda Kingfish Various reef fish species	\N	2026-03-28 20:43:16.430069+00	2026-03-28 20:54:03.477122+00
9f6affd4-7554-4f01-ad83-6403de981887	scuba-diver	en	price_usd	text	245	contact@prodiving.asia	2026-03-12 14:56:23.775431+00	2026-03-12 14:56:23.775431+00
8d194e45-5f51-458d-bff9-b08205b0734c	scuba-diver	en	price_eur	text	225	contact@prodiving.asia	2026-03-12 14:56:23.775431+00	2026-03-12 14:56:23.775431+00
c19ec633-8dda-4273-9565-799e968f416c	fun-diving	en	fun_diving_hero_title	text	Fun Diving Koh Tao	\N	2026-03-27 12:57:03.657442+00	2026-03-27 12:57:03.657442+00
7d682a55-bd72-4583-bc37-1eace2e1d6ab	fun-diving	en	fun_diving_hero_subtitle	text	Experience the best of Koh Tao's underwater world with our professionally guided fun dive trips. Discover colorful coral reefs, meet amazing marine life, and make unforgettable memories.	\N	2026-03-27 12:57:03.657442+00	2026-03-27 12:57:03.657442+00
7dfd162f-6d61-4dd1-a750-a5f2a5caf57a	fun-diving	en	fun_diving_hero_cta	text	Go Fun Diving Koh Tao	\N	2026-03-27 12:57:03.657442+00	2026-03-27 12:57:03.657442+00
1abb690e-f452-46cc-b01b-bb3b4894a35d	scuba-diver	en	hero_title	text	PADI Scuba Diver Course	seed-script	2026-03-12 14:56:23.775431+00	2026-03-28 14:24:15.888987+00
47c6dccd-0a4d-4bc1-98e9-4d1c929ed369	accommodation	nl	accommodationType	text	Accommodatietype	\N	2026-03-27 11:51:48.105016+00	2026-03-28 20:56:02.462461+00
d23ea9cf-88a4-4109-a110-bbe75b3d2afc	fun-diving	en	fun_diving_hero_cta2	text	Book a Course	\N	2026-03-27 12:57:03.657442+00	2026-03-27 12:57:03.657442+00
b860a266-d508-4c06-b620-3bdc95988ce3	discover-scuba-deluxe	nl	couurse_overview	text	o moe dutch	\N	2026-03-19 13:13:56.983549+00	2026-03-27 10:33:57.16039+00
d9916909-9ddd-4717-8e98-48990d84bf43	fun-diving	en	fun_diving_overview_title	text	From Breathtaking Shipwrecks to Exotic Marine Life	\N	2026-03-27 12:57:03.657442+00	2026-03-27 12:57:03.657442+00
51e45cd7-93f7-4b00-82d2-39834acdb24e	dive-sites/sail-rock	nl	diving_tips	text	get upearly	\N	2026-03-20 09:07:19.116003+00	2026-03-27 13:20:53.920935+00
2a87b4dd-12dc-4d3c-b88f-252711fc1677	accommodation	nl	continueBooking	text	Ga verder naar boekingsformulier	\N	2026-03-27 11:51:48.105016+00	2026-03-28 20:56:02.462461+00
a2364c10-d382-48ad-b9ae-8ea3a8645bbe	home	en	course_instructor_level	text	Professional	contact@prodiving.asia	2026-03-12 10:01:50.741687+00	2026-03-16 18:01:39.262481+00
be1bf30a-0613-4eb8-8090-51d1912364ce	home	en	course_instructor_duration	text	2-3 weeks	contact@prodiving.asia	2026-03-12 10:01:50.741687+00	2026-03-16 18:01:39.262481+00
d9a412e4-b2e5-4def-98a0-d27709c51fe4	home	en	course_instructor_description	textarea	Train to teach scuba professionally and build a dive career anywhere in the world.	contact@prodiving.asia	2026-03-12 10:01:50.741687+00	2026-03-16 18:01:39.262481+00
3876fd55-4c4f-464a-8da2-85442be12d27	home	en	course_discover_scuba_level	text	Beginner	contact@prodiving.asia	2026-03-12 10:01:50.741687+00	2026-03-16 18:01:39.262481+00
2b73247a-ebb4-44bf-adfe-7f4b3c11d084	home	en	course_discover_scuba_duration	text	1 day	contact@prodiving.asia	2026-03-12 10:01:50.741687+00	2026-03-16 18:01:39.262481+00
8a3f066f-d598-47b7-8945-c541da1043fe	home	en	course_discover_scuba_deluxe_duration	text	1-2 days	contact@prodiving.asia	2026-03-12 10:01:50.741687+00	2026-03-16 18:01:39.262481+00
7d44da53-83b6-4fc7-aaf0-f9885eb19fd8	home	en	course_discover_scuba_deluxe_max_depth	text	12m	contact@prodiving.asia	2026-03-12 10:01:50.741687+00	2026-03-16 18:01:39.262481+00
b51fc365-8182-4d33-bded-f8e625a11107	home	en	course_discover_scuba_deluxe_price	text	฿5,000	contact@prodiving.asia	2026-03-12 10:01:50.741687+00	2026-03-16 18:01:39.262481+00
7f52d976-549d-4d6d-a9ba-224e61846931	home	en	course_discover_scuba_deluxe_price_usd	text	144	contact@prodiving.asia	2026-03-12 13:33:29.379002+00	2026-03-16 18:01:39.262481+00
0049ecce-51e0-4b5f-9e24-bca20f6966cb	rescue	en	hero_title	text	PADI Rescue Diver	seed-script	2026-03-19 08:09:14.307416+00	2026-03-28 14:24:16.326594+00
40121e90-043c-409e-9b2c-34f05d18aede	home	nl	gallery_headline	text	Kijk naar onze foto’s van gelukkige studenten.	contact@prodiving.asia	2026-03-12 10:57:14.010608+00	2026-03-14 18:50:05.442579+00
95d64176-7690-4983-bc6e-840571539a83	home	nl	course_discover_scuba_deluxe_duration	text	1-2 dagen	contact@prodiving.asia	2026-03-12 10:57:14.010608+00	2026-03-14 18:50:05.442579+00
3b7d8f9b-47ab-4a5c-b158-9f82e28f9c8f	home	nl	course_discover_scuba_deluxe_max_depth	text	12m	contact@prodiving.asia	2026-03-12 10:57:14.010608+00	2026-03-14 18:50:05.442579+00
5808367f-6f58-4e24-95e0-e83566e03152	home	nl	course_discover_scuba_deluxe_price	text	฿5,000	contact@prodiving.asia	2026-03-12 10:57:14.010608+00	2026-03-14 18:50:05.442579+00
a269ba83-3088-4f42-b113-2fcafc870bc1	home	nl	course_discover_scuba_deluxe_price_usd	text	144	contact@prodiving.asia	2026-03-12 10:57:14.010608+00	2026-03-14 18:50:05.442579+00
407592e0-8f1d-4fb8-8965-361e1c7bc4f1	home	nl	course_discover_scuba_deluxe_price_eur	text	132	contact@prodiving.asia	2026-03-12 10:57:14.010608+00	2026-03-14 18:50:05.442579+00
b2104be7-cd9e-40f6-a444-2a8e1eb5231f	home	nl	course_discover_scuba_deluxe_description	textarea	Extended DSD with 3 dives for more underwater time and a more relaxed pace.	contact@prodiving.asia	2026-03-12 10:57:14.010608+00	2026-03-14 18:50:05.442579+00
759d0f67-316c-4077-9c58-886f50130988	home	en	course_discover_scuba_deluxe_price_eur	text	132	contact@prodiving.asia	2026-03-12 13:33:29.379002+00	2026-03-16 18:01:39.262481+00
3092077f-9cbb-46c6-8916-01c861e2dab3	fun-diving	en	fun_diving_overview_body	text	Koh Tao's fun dives have it all! We take pride in offering you a personalized, relaxed, and enjoyable fun diving experience. We're dedicated to showcasing the finest underwater marvels tailored to your level of training and experience, ensuring your dives align with your specific interests.	\N	2026-03-27 12:57:03.657442+00	2026-03-27 12:57:03.657442+00
17b8d074-f634-4ded-ad0c-0db4b97c35e6	fun-diving	en	fun_diving_world_class_title	text	World-Class Dive Sites	\N	2026-03-27 12:57:03.657442+00	2026-03-27 12:57:03.657442+00
b8dfd3d7-3f90-491f-8ffb-dc9022bdca31	home	en	course_discover_scuba_deluxe_description	textarea	Ecluxsive Excl Extended DSD with 3 dives for more underwater time and a more relaxed pace.	contact@prodiving.asia	2026-03-12 10:01:50.741687+00	2026-03-27 12:00:29.330869+00
0f08c70f-1e6e-455b-b7ec-aeabe0987318	skills-covered	en	skillscovered	text		\N	2026-03-27 12:19:27.32903+00	2026-03-27 12:19:27.32903+00
47bd1a15-43d9-402d-8b71-440c8d22e400	fun-diving	en	fun_diving_world_class_body	text	Beneath the turquoise water surrounding Koh Tao lies a world of colorful coral reefs, teeming marine life from macro creatures to turtles and if you're lucky, the majestic whale shark. With over 25 captivating dive sites, there's boundless diversity to explore.	\N	2026-03-27 12:57:03.657442+00	2026-03-27 12:57:03.657442+00
f30fb6dd-0d84-41f6-b80a-283419c63e3a	fun-diving	en	fun_diving_expert_title	text	Expert Dive Professionals	\N	2026-03-27 12:57:03.657442+00	2026-03-27 12:57:03.657442+00
a6153744-f21a-4bea-8d5d-98042c4f8c74	fun-diving	en	fun_diving_expert_body	text	Our dive team comprises seasoned and highly knowledgeable dive professionals who have immersed themselves in the local reef ecology and dive sites. Their expertise ensures a safe and enriching diving experience for you.	\N	2026-03-27 12:57:03.657442+00	2026-03-27 12:57:03.657442+00
b1e0f364-2905-474a-8e3b-f0dc2ebb09c0	fun-diving	en	fun_diving_marine_life_title	text	Diverse Marine Life	\N	2026-03-27 12:57:03.657442+00	2026-03-27 12:57:03.657442+00
7006c08a-90fa-4c42-a293-93633cf8bc43	discover-scuba	nl	price_usd	text	72	seed-script	2026-03-28 13:10:40.754266+00	2026-03-28 14:24:16.326594+00
232fcdb2-fd1c-4513-aa85-4872b330cfa9	Diving tips	en	divig-tips	text	tip1	\N	2026-03-27 12:53:37.830623+00	2026-03-27 15:35:56.209368+00
8db12f97-8657-47e6-b4ed-2331aee0cba8	Diving tips	en	diving-tips	text	tip 2	\N	2026-03-27 12:48:26.113092+00	2026-03-27 15:35:56.209368+00
e4e92006-b4f4-4cf4-8f6d-7e106c49e215	fun-diving	en	fun_diving_marine_life_body	text	From massive whale sharks and graceful sea turtles to colorful reef fish and fascinating macro life, Koh Tao's waters host an incredible variety of marine species. Every dive brings new discoveries and unforgettable encounters.	\N	2026-03-27 12:57:03.657442+00	2026-03-27 12:57:03.657442+00
a7631f79-5c0a-4e4b-ba3d-1a7c5eeda961	fun-diving	en	fun_diving_flexible_title	text	Flexible Schedule	\N	2026-03-27 12:57:03.657442+00	2026-03-27 12:57:03.657442+00
d9c4b1d6-0647-4f84-a588-182ffab13117	fun-diving	en	fun_diving_flexible_body	text	We run two dive trips a day - morning and afternoon - on our spacious customized dive boats. After an exhilarating day of diving, unwind with refreshing drinks and share your incredible underwater experiences over a stunning sunset.	\N	2026-03-27 12:57:03.657442+00	2026-03-27 12:57:03.657442+00
6d60751b-f2d8-4f7a-b2a6-560849ca8b8b	fun-diving	en	fun_diving_ready_title	text	Ready to Explore?	\N	2026-03-27 12:57:03.657442+00	2026-03-27 12:57:03.657442+00
83f1749d-68c6-43a1-9b7c-f8c9c88cbb86	fun-diving	en	fun_diving_ready_body	text	Whether you're a newly certified Open Water diver or an experienced technical diver, we have the perfect dive sites and packages for you. Book your fun diving adventure today!	\N	2026-03-27 12:57:03.657442+00	2026-03-27 12:57:03.657442+00
ade9a635-cfc1-4a19-9948-d9953178e26c	fun-diving	en	fun_diving_ready_cta2	text	Explore Dive Sites	\N	2026-03-27 12:57:03.657442+00	2026-03-27 12:57:03.657442+00
1a847e95-7dca-4d58-823a-6abd9c0be8b0	fun-diving	en	fun_diving_trips_title	text	Trips & Programs	\N	2026-03-27 12:57:03.657442+00	2026-03-27 12:57:03.657442+00
2e1b9b85-8e96-4750-b842-f1ddffaf303a	fun-diving	en	fun_diving_sites_title	text	Best Koh Tao Fun Diving Trips	\N	2026-03-27 12:57:03.657442+00	2026-03-27 12:57:03.657442+00
b7e2dc75-7ad7-4ce9-9e21-929b44bb2345	fun-diving	en	fun_diving_all_sites_title	text	All Dive Sites	\N	2026-03-27 12:57:03.657442+00	2026-03-27 12:57:03.657442+00
9e231a44-ba0a-421e-b471-49e56c1d5b41	fun-diving	en	fun_diving_marine_tab_title	text	Discover the Underwater World	\N	2026-03-27 12:57:03.657442+00	2026-03-27 12:57:03.657442+00
0d7b99ab-5c00-4805-9c7e-7c0a1e7391a0	dive-sites/chumphon-pinnacle	en	diving_tips	text	Advanced certification recommended due to depth and current Early morning departures maximize wildlife sightings Wide-angle photography lens recommended for large subjects Stay with your dive guide in moderate currents Perfect for deep diving specialty courses Whalesharks are most active during incoming tides Bring a good quality underwater camera	\N	2026-03-28 20:43:16.430069+00	2026-03-28 20:54:03.477122+00
02294405-a785-4612-9a93-a1e38fc1dd22	fun-diving	en	fun_diving_ready_cta1	text	View Pricing & Schedules	\N	2026-03-27 12:57:03.657442+00	2026-03-27 13:12:21.590858+00
24dccb6a-d5a4-4c5b-8117-dad62370e6eb	fun-diving	nl	fun_diving_expert_body	text	Our dive team comprises seasoned and highly knowledgeable dive professionals who have immersed themselves in the local reef ecology and dive sites. Their expertise ensures a safe and enriching diving experience for you.	\N	2026-03-28 13:10:40.754266+00	2026-03-30 11:23:47.936366+00
5c3d5f58-3297-430c-b90b-de5172cb93e0	main	nl	contact	text	Your contact info here	\N	2026-03-28 13:10:40.754266+00	2026-03-28 13:10:40.754266+00
748baa23-cd63-49a6-b124-02ae20b224b5	discover-scuba-deluxe	nl	course_overview	text	The Course Overview\nDiscover Scuba Diving Deluxe is ideal if you want more than a short try dive. You begin with foundational skills in a controlled environment and then continue to multiple open water dives around Koh Tao with your instructor.	\N	2026-03-28 13:10:40.754266+00	2026-03-28 13:10:40.754266+00
103cf350-bd43-4d95-b5bd-2accc8410575	skills-covered	nl	skillscovered	text		\N	2026-03-28 13:10:40.754266+00	2026-03-28 13:10:40.754266+00
79caea19-b7db-41b2-972c-05e530aed5ce	sail-rock	en	overview	text	Koh Tao's premier deep dive site featuring large schools of fish, whalesharks, and giant barracuda. Sail Rock is widely regarded as the Gulf of Thailand's premier scuba diving site. Located 40 minutes offshore, this impressive granite pinnacle rises from the deep blue ocean to within 18 meters of the surface. The site is famous for its 'Chimney' - a distinctive vertical swim-through that creates a natural vortex attracting large pelagic fish. Whalesharks are frequently sighted cruising the depths, and the site hosts massive schools of snapper, fusiliers, and chevron barracuda. Eagle rays and sailfish are also common visitors, making this a truly spectacular deep diving experience.	\N	2026-03-27 13:40:10.789117+00	2026-03-28 12:47:09.516174+00
82add889-bccc-4db4-a2a1-7617a7ce599f	sail-rock	en	quick_facts_depth	text	18-40m	\N	2026-03-27 13:40:10.789117+00	2026-03-28 12:47:09.516174+00
72676072-e6ba-45be-8618-7f1278c71c4d	sail-rock	en	quick_facts_difficulty	text	Advanced	\N	2026-03-27 13:40:10.789117+00	2026-03-28 12:47:09.516174+00
5bf7f916-aca7-43f2-a7f7-219651e59804	Diving tips	nl	divig-tips	text	tip1	\N	2026-03-28 13:10:40.754266+00	2026-03-28 13:10:40.754266+00
db1194a3-5a93-4273-9fc7-e6fdfc444cb6	Diving tips	nl	diving-tips	text	tip 2	\N	2026-03-28 13:10:40.754266+00	2026-03-28 13:10:40.754266+00
41285609-d1f4-4521-934e-0c51e6ed3b83	sail-rock	nl	quick_facts_best_time	text	Hele jaar, beste periode in droogseizoen (december-mei)	\N	2026-03-27 13:40:10.789117+00	2026-03-28 12:47:09.516174+00
1abf5a53-9d56-4cbe-8840-afce15e14266	discover-scuba	nl	course_overview	text	Discover Scuba Diving is gemaakt voor niet-gecertificeerde duikers die veilig willen kennismaken met echt duiken onder begeleiding van een professionele instructeur. Je start met een korte briefing en basisvaardigheden in beschut water, daarna ga je naar ondiep open water.	seed-script	2026-03-28 13:10:40.754266+00	2026-03-28 14:24:16.326594+00
8b11da61-d1ce-4307-9bcc-adfd0d1d2376	discover-scuba	nl	price_eur	text	66	seed-script	2026-03-28 13:10:40.754266+00	2026-03-28 14:24:16.326594+00
971fcab2-633f-4ba2-bfec-e32e140cf45b	discover-scuba	nl	duration	text	1 dag	seed-script	2026-03-28 13:10:40.754266+00	2026-03-28 14:24:16.326594+00
d10153f7-64d1-4767-af2c-c1c8f696b151	things-to-do	nl	activities_title	text	Populaire activiteiten	\N	2026-03-28 13:31:13.441375+00	2026-03-28 13:31:13.441375+00
cb4836de-9f12-4f98-81ba-e0a8c38adef9	things-to-do	nl	activities_list	text	Maak een snorkeltour naar verborgen baaien\nVolg een Thaise kookles\nHuur een kajak of paddleboard\nVerken de wandelroutes op het eiland\nOntspan met een massage op het strand\nDoe mee aan een yoga- of fitnessles\nGeniet van de zonsondergang bij een rooftop bar\nBezoek lokale kunstgaleries en markten	\N	2026-03-28 13:31:13.441375+00	2026-03-28 13:31:13.441375+00
9b1ba421-5a2f-44f2-877d-dfc283c0a548	things-to-do	nl	cta_fun_diving	text	Ga fun diven	\N	2026-03-28 13:31:13.441375+00	2026-03-28 13:31:13.441375+00
727b7e73-5723-4611-b987-1fec918f2fa1	things-to-do	nl	cta_beaches	text	Ontdek stranden	\N	2026-03-28 13:31:13.441375+00	2026-03-28 13:31:13.441375+00
506185e6-5339-4db9-b469-786b6429a579	things-to-do	nl	cta_viewpoints	text	Uitzichtpunten	\N	2026-03-28 13:31:13.441375+00	2026-03-28 13:31:13.441375+00
21800c9e-2c20-411e-937f-ff6772bef7cb	things-to-do	nl	note	text	Koh Tao is meer dan alleen duiken - er is genoeg te ontdekken op land en zee.	\N	2026-03-28 13:31:13.441375+00	2026-03-28 13:31:13.441375+00
5c082150-491d-4b6e-bae3-3129e8b2bff4	things-to-do	nl	ideas_title	text	Meer ideeen nodig?	\N	2026-03-28 13:31:13.441375+00	2026-03-28 13:31:13.441375+00
78cfd969-0fb1-4176-916f-c6e97ce716aa	things-to-do	nl	ideas_list	text	Maak een dagtrip naar Koh Nang Yuan voor snorkelen en iconische uitzichten\nProbeer rotsklimmen of boulderen voor avontuur op het land\nProef streetfood op de avondmarkt in Sairee	\N	2026-03-28 13:31:13.441375+00	2026-03-28 13:31:13.441375+00
f07c531b-6ce2-44d2-8ce7-2ddba10fe3ad	things-to-do	nl	more_inspiration	text	Voor meer inspiratie, bekijk onze	\N	2026-03-28 13:31:13.441375+00	2026-03-28 13:31:13.441375+00
65130931-7a50-4891-bd22-22300779a1b5	things-to-do	nl	activity_guide	text	gids met activiteiten	\N	2026-03-28 13:31:13.441375+00	2026-03-28 13:31:13.441375+00
d0375a64-2d3d-4c01-b187-4d4f2b3c8719	koh-tao-info	en	title	text	About Koh Tao	\N	2026-03-28 13:31:13.441375+00	2026-03-28 13:31:13.441375+00
28078d3b-fa9a-4890-8604-1e0c4af7f643	koh-tao-info	en	description	text	Koh Tao, which means "Turtle Island", is a small paradise in the Gulf of Thailand known for crystal-clear water, colorful coral reefs, and a laid-back island vibe. It is one of the best diving destinations in the world and offers activities for every type of traveler.	\N	2026-03-28 13:31:13.441375+00	2026-03-28 13:31:13.441375+00
bc463758-090c-48ed-8261-1df2648cfc64	koh-tao-info	en	facts_list	text	Location: 70 km off the east coast of Southern Thailand\nFamous for: diving, snorkeling, beautiful beaches, and marine life\nBest travel season: February to October\nPopular areas: Sairee Beach, Chalok Baan Kao, Mae Haad	\N	2026-03-28 13:31:13.441375+00	2026-03-28 13:31:13.441375+00
7ab3f5d3-de21-462c-8092-5b827e29b249	koh-tao-info	en	highlights_title	text	Island highlights	\N	2026-03-28 13:31:13.441375+00	2026-03-28 13:31:13.441375+00
033aa712-7064-4158-a2fd-bf9b9f250499	koh-tao-info	en	highlights_list	text	World-class dive sites and dive schools\nBeautiful viewpoints and hiking routes\nRelaxed nightlife and beach bars\nFresh seafood and Thai cuisine\nFriendly local community	\N	2026-03-28 13:31:13.441375+00	2026-03-28 13:31:13.441375+00
2a50c6f1-c7ab-471e-a158-bada72e6983e	koh-tao-info	nl	title	text	Over Koh Tao	\N	2026-03-28 13:31:13.441375+00	2026-03-28 13:31:13.441375+00
8223cb5c-9cc9-429f-95f2-e2791c084d69	koh-tao-info	nl	description	text	Koh Tao, wat "Schildpadeiland" betekent, is een klein paradijs in de Golf van Thailand dat bekendstaat om kristalhelder water, kleurrijke koraalriffen en een ontspannen eilandsfeer. Het is een van de beste duikbestemmingen ter wereld en biedt activiteiten voor ieder type reiziger.	\N	2026-03-28 13:31:13.441375+00	2026-03-28 13:31:13.441375+00
8b35ed6a-66d6-4fa6-9fdf-80d45c51fb1d	koh-tao-info	nl	facts_list	text	Locatie: 70 km uit de oostkust van Zuid-Thailand\nBeroemd om: duiken, snorkelen, mooie stranden en zeeleven\nBeste reistijd: februari t/m oktober\nPopulaire gebieden: Sairee Beach, Chalok Baan Kao, Mae Haad	\N	2026-03-28 13:31:13.441375+00	2026-03-28 13:31:13.441375+00
1a86be35-585a-45d9-8309-166d8518e0a3	koh-tao-info	nl	highlights_title	text	Hoogtepunten van het eiland	\N	2026-03-28 13:31:13.441375+00	2026-03-28 13:31:13.441375+00
339c9e9d-8780-44d2-865c-5ae6fcd4bbd2	koh-tao-info	nl	highlights_list	text	Duiklocaties en duikscholen van wereldklasse\nPrachtige uitzichtpunten en wandelroutes\nOntspannen uitgaansleven en strandbars\nVerse seafood en Thaise keuken\nVriendelijke lokale gemeenschap	\N	2026-03-28 13:31:13.441375+00	2026-03-28 13:31:13.441375+00
eac8a563-1b6c-4630-ba65-a1613f55ebee	medical-services	en	title	text	Medical services on Koh Tao	\N	2026-03-28 13:46:34.702478+00	2026-03-28 13:46:34.702478+00
919c06b6-05eb-4522-ba11-eff3aea84595	medical-services	en	subtitle	text	Healthcare and emergency services, available 24/7.	\N	2026-03-28 13:46:34.702478+00	2026-03-28 13:46:34.702478+00
55bfc953-b9a5-445f-ac38-f22a0401584a	medical-services	en	care_title	text	Care & emergencies	\N	2026-03-28 13:46:34.702478+00	2026-03-28 13:46:34.702478+00
6f46e4c3-b1c3-4545-8aa1-4a233a188724	medical-services	en	care_list	text	Multiple clinics and pharmacies in Mae Haad and Sairee\nBasic care and first aid available\nEmergency services: call 1669\nNearest hospital is on Koh Samui (boat transfer required for serious cases)\nRecompression chamber for diving emergencies	\N	2026-03-28 13:46:34.702478+00	2026-03-28 13:46:34.702478+00
3e472400-ec8b-4735-a44d-3740cb3a6262	medical-services	en	insurance	text	Comprehensive travel insurance is strongly recommended. Bring essential prescription medication yourself, as availability may be limited.	\N	2026-03-28 13:46:34.702478+00	2026-03-28 13:46:34.702478+00
0dfff36b-2cd3-4e93-a0c7-b70027927a15	medical-services	en	cta_travel_info	text	Travel information	\N	2026-03-28 13:46:34.702478+00	2026-03-28 13:46:34.702478+00
89489a38-c4f7-40af-b1be-72a28ef6110f	medical-services	en	cta_wellness	text	Wellness activities	\N	2026-03-28 13:46:34.702478+00	2026-03-28 13:46:34.702478+00
9098629f-01c7-4a76-80d0-4ea3c71ff872	medical-services	en	important_title	text	Important information	\N	2026-03-28 13:46:34.702478+00	2026-03-28 13:46:34.702478+00
85262e37-8a0f-4076-86c9-38a6b3d9f05d	medical-services	en	important_list	text	Arrange travel and health insurance before arrival\nMalaria prevention may be useful - consult a doctor\nThe sun is strong - use high-SPF sunscreen\nDehydration is common - drink enough water	\N	2026-03-28 13:46:34.702478+00	2026-03-28 13:46:34.702478+00
b6a01878-a55b-4e84-befc-1eeecca4ffdc	medical-services	nl	care_list	text	Meerdere klinieken en apotheken in Mae Haad en Sairee.\nBasiszorg en eerste hulp beschikbaar\nNooddiensten: bel 1669\nDichtstbijzijnde ziekenhuis ligt op Koh Samui (boottransfer nodig bij ernstige gevallen)\nRecompressiekamer voor duiknoodgevallen	\N	2026-03-28 13:46:34.702478+00	2026-03-28 14:56:21.792803+00
ea481a97-feaa-4bbc-9bb5-0983453ad9c0	medical-services	nl	care_title	text	Zorg & noodgevallen	\N	2026-03-28 13:46:34.702478+00	2026-03-28 14:56:21.792803+00
ec4e4b23-c619-4824-8875-6555921ec5ca	medical-services	nl	cta_travel_info	text	Reisinformatie	\N	2026-03-28 13:46:34.702478+00	2026-03-28 14:56:21.792803+00
682d681c-c133-4326-b74c-bfe0233d3060	medical-services	nl	cta_wellness	text	Wellnessactiviteiten	\N	2026-03-28 13:46:34.702478+00	2026-03-28 14:56:21.792803+00
a01014ad-e81c-4ae9-b59d-5f965e91e8f0	medical-services	nl	subtitle	text	Gezondheidszorg en nooddiensten, 24/7 beschikbaar.	\N	2026-03-28 13:46:34.702478+00	2026-03-28 14:56:21.792803+00
0ce02689-d114-42d7-803c-6574437788bb	idc	nl	course_overview	text	translate Program Overview.The Instructor pathway trains experienced divers to teach and certify new divers. The IDC includes teaching presentations, student evaluations and practical teaching experience with support from experienced staff instructors.\n\nPrerequisites\nPrerequisite: PADI Divemaster (or equivalent), current EFR, and a minimum number of logged dives as required by PADI. Candidates must complete Instructor exams and assessments.\n\nWhat you'll learn\nTeaching and presentation skills\nCourse management and student evaluation\nRisk management and leadership\nMarketing and business development for instructors\nInclusions\nIDC materials and PADI registration\nPractical teaching sessions and mentoring\nExam preparation and exam fees (where applicable).\n	\N	2026-03-28 13:10:40.754266+00	2026-03-28 13:14:49.524577+00
15effe06-b46a-4b4d-b50c-28273ecdb988	idc	nl	hero_title	text	Instructor Training	\N	2026-03-28 13:10:40.754266+00	2026-03-28 13:14:49.524577+00
0cb8a816-042c-478a-bf00-232c78bbb53d	sail-rock	en	images	text	/images/sailrock.webp\n/images/photo-1613853250147-2f73e55c1561.avif\n/images/photo-1618865181016-a80ad83a06d3.avif\n/images/photo-1647825194145-2d94e259c745.avif\n/images/photo-1682686580849-3e7f67df4015.avif\n/images/photo-1682687982423-295485af248a.avif	\N	2026-03-27 15:18:53.136052+00	2026-03-28 12:47:09.516174+00
8e845eb8-1935-45b9-a402-51b8d9daa4dc	viewpoints-koh-tao	en	cta_discover_beaches	text	Discover beaches and more	\N	2026-03-28 13:42:12.192138+00	2026-03-28 13:46:35.031208+00
463ac779-2e9c-4a75-8727-50e8669b38cf	viewpoints-koh-tao	en	cta_hiking_activities	text	Hiking & activities	\N	2026-03-28 13:42:12.192138+00	2026-03-28 13:46:35.031208+00
81519439-a416-4f65-a0ab-fb596c85a187	viewpoints-koh-tao	en	hiking_tips_list	text	Start early for sunrise and cooler temperatures\nWear sturdy shoes and bring enough water\nTrails can be steep and slippery after rain\nBest light for photography: early morning and sunset	\N	2026-03-28 13:42:12.192138+00	2026-03-28 13:46:35.031208+00
3d3b6201-179e-4476-8f25-e5cc1d8e7ab0	viewpoints-koh-tao	en	hiking_tips_title	text	Hiking tips	\N	2026-03-28 13:42:12.192138+00	2026-03-28 13:46:35.031208+00
f423a6a5-48da-427b-b1c6-acba3fa32b2f	viewpoints-koh-tao	en	note	text	Most viewpoints require a short hike. Bring water, sun protection, and a camera!	\N	2026-03-28 13:42:12.192138+00	2026-03-28 13:46:35.031208+00
d128874d-70ed-42c8-b833-053d891002c5	viewpoints-koh-tao	en	section_title	text	Island viewpoints	\N	2026-03-28 13:42:12.192138+00	2026-03-28 13:46:35.031208+00
fd496fe9-9d13-4f35-9680-4fa21deb264b	sail-rock	nl	images	text	/images/sailrock.webp\n/images/photo-1613853250147-2f73e55c1561.avif\n/images/photo-1618865181016-a80ad83a06d3.avif\n/images/photo-1647825194145-2d94e259c745.avif\n/images/photo-1682686580849-3e7f67df4015.avif\n/images/photo-1682687982423-295485af248a.avif	\N	2026-03-27 15:18:53.136052+00	2026-03-28 12:47:09.516174+00
50577f6f-e20f-4b0e-8fd3-694db0efd0ab	contact	en	form_first_name_label	text	First Name	contact@prodiving.asia	2026-03-12 14:31:13.936296+00	2026-03-27 15:36:52.774606+00
25073ad5-051e-4029-9152-980735a84a91	htms-sattakut	nl	images	text	/images/htms-sattakut.jpg\n/images/htms-sattakut-wreck.jpg\n/images/wreck.jpeg	\N	2026-03-27 16:24:21.72643+00	2026-03-28 12:47:09.516174+00
14a44422-451f-4b14-bbcf-8d9a4e2ed4b4	japanese-gardens	en	overview	text	Japanese Gardens is a beautiful dive site near Koh Nang Yuan, known for its diverse coral reef and abundant marine life. Suitable for all levels.	\N	2026-03-27 13:40:10.789117+00	2026-03-28 12:47:09.516174+00
65cd73fa-66e6-4c92-8487-ca07f8f46ec6	japanese-gardens	en	quick_facts_depth	text	5-18m	\N	2026-03-27 13:40:10.789117+00	2026-03-28 12:47:09.516174+00
8f8528f0-e8c5-48a3-bd80-f3d15259e905	contact	en	form_last_name_label	text	Last Name	contact@prodiving.asia	2026-03-12 14:31:13.936296+00	2026-03-27 15:36:52.774606+00
cf3d89d7-f72b-4777-a379-880dc856c3a1	contact	en	form_message_label	text	Message	contact@prodiving.asia	2026-03-12 14:31:13.936296+00	2026-03-27 15:36:52.774606+00
bfd3a9b0-d0ee-4d65-81aa-98107f3b01d8	contact	en	form_sending_label	text	Sending...	contact@prodiving.asia	2026-03-12 14:31:13.936296+00	2026-03-27 15:36:52.774606+00
a1e892a1-6fc7-4ddb-b7d0-7a321aa81776	contact	en	form_subject_label	text	Subject	contact@prodiving.asia	2026-03-12 14:31:13.936296+00	2026-03-27 15:36:52.774606+00
4ab8f713-2e0f-4f9a-a37f-261175282d4e	contact	en	form_submit_label	text	Send Message	contact@prodiving.asia	2026-03-12 14:31:13.936296+00	2026-03-27 15:36:52.774606+00
df1c7a82-46a0-4a69-a575-a75203d7e53d	contact	en	form_title	text	Send Us a Message	contact@prodiving.asia	2026-03-12 14:31:13.936296+00	2026-03-27 15:36:52.774606+00
c60d84bb-bb7b-4eae-844b-dff9357d4d37	japanese-gardens	en	quick_facts_difficulty	text	Beginner to Intermediate	\N	2026-03-27 13:40:10.789117+00	2026-03-28 12:47:09.516174+00
086f6c0d-8c98-4b1e-a000-b3c490851e33	japanese-gardens	en	quick_facts_location	text	Near Koh Nang Yuan	\N	2026-03-27 13:40:10.789117+00	2026-03-28 12:47:09.516174+00
8d0a7553-e1e1-4c0c-a217-82a7b62c7123	japanese-gardens	en	quick_facts_best_time	text	Year-round, best visibility November-May	\N	2026-03-27 13:40:10.789117+00	2026-03-28 12:47:09.516174+00
5c2f8c5b-298a-4fef-989b-8ae6b18340e3	viewpoints-koh-tao	nl	title	text	Uitzichtpunten op Koh Tao 	\N	2026-03-28 13:42:12.192138+00	2026-03-28 13:50:12.131579+00
7ba06491-389f-4dfb-9901-0476afd19343	dive-sites/sail-rock	en	quick_facts	text	<p>25-40 temperature</p>	\N	2026-03-20 09:07:19.116003+00	2026-03-28 20:10:44.702835+00
0cdd9117-30be-41a8-884f-98d33ff644d6	contact	en	location_title	text	Location	contact@prodiving.asia	2026-03-12 14:31:13.936296+00	2026-03-27 15:36:52.774606+00
38c41b15-53b2-46e3-babc-d379eda65784	contact	en	opening_hours_line_1	text	Daily: 07:00 - 19:00	contact@prodiving.asia	2026-03-12 14:31:13.936296+00	2026-03-27 15:36:52.774606+00
5ed563e9-1eb4-4ded-b9d1-e0f99f7b7468	contact	en	opening_hours_line_2	text	Emergency: 24/7	contact@prodiving.asia	2026-03-12 14:31:13.936296+00	2026-03-27 15:36:52.774606+00
672450bc-01d1-49d6-a19d-0c50a5fc1089	contact	en	opening_hours_title	text	Opening Hours	contact@prodiving.asia	2026-03-12 14:31:13.936296+00	2026-03-27 15:36:52.774606+00
12c01303-3b55-4748-9a0f-7c2d780f7784	contact	en	phone_line_1	text	+66 77 456 789	contact@prodiving.asia	2026-03-12 14:31:13.936296+00	2026-03-27 15:36:52.774606+00
f58c8e1e-f0f9-4e1b-8a9b-a768a553644a	contact	en	phone_line_2	text	+66 89 123 4567	contact@prodiving.asia	2026-03-12 14:31:13.936296+00	2026-03-27 15:36:52.774606+00
f6983d66-d398-4375-89a5-2e73135ae9d6	contact	en	phone_title	text	Phone	contact@prodiving.asia	2026-03-12 14:31:13.936296+00	2026-03-27 15:36:52.774606+00
2ee304f1-f256-4c84-8e34-14af1ae19d2f	contact	en	section_subtitle	textarea	Ready to explore the underwater world? Contact Bas to book your diving adventure on Koh Tao.	contact@prodiving.asia	2026-03-12 14:31:13.936296+00	2026-03-27 15:36:52.774606+00
a3ef8bed-9927-4173-805d-c2832ad0773c	contact	en	section_title	text	Get in Touch with us	contact@prodiving.asia	2026-03-12 14:31:13.936296+00	2026-03-27 15:36:52.774606+00
30faff9c-2d62-4a8d-9121-258f0c105889	dive-sites/sail-rock	en	ready_to_dive	text	<p>Your ready to dive content here</p>	\N	2026-03-20 09:07:19.116003+00	2026-03-28 20:10:44.702835+00
7efd63bc-1ad0-4eeb-9ce6-7363ed9f22c6	contact	en	subject_option_1	text	Course Information	contact@prodiving.asia	2026-03-12 14:31:13.936296+00	2026-03-27 15:36:52.774606+00
0a3d99fc-cda6-415c-80ea-a0a6b6c530a9	contact	en	subject_option_2	text	Dive Trip Booking	contact@prodiving.asia	2026-03-12 14:31:13.936296+00	2026-03-27 15:36:52.774606+00
dae75d0f-1ac5-4623-b031-bc336acb0416	contact	en	subject_option_3	text	Equipment Rental	contact@prodiving.asia	2026-03-12 14:31:13.936296+00	2026-03-27 15:36:52.774606+00
d9957e6b-9664-4263-832f-66b1cd82ea50	contact	en	subject_option_4	text	General Question	contact@prodiving.asia	2026-03-12 14:31:13.936296+00	2026-03-27 15:36:52.774606+00
61fe941a-84f3-40f9-9bce-7a6083acc63c	accommodation	en	whyStayTitle	text	Why stay with us?	\N	2026-03-27 11:51:48.105016+00	2026-03-28 20:55:30.812602+00
544520af-2e24-42ef-a1ae-c8a86001bd79	instructor	en	hero_title	text	PADI Open Water Scuba Instructor	\N	2026-03-28 13:19:45.973231+00	2026-03-28 13:19:45.973231+00
09861b9b-e693-4b4d-a70a-63cdffead851	instructor	en	hero_subtitle	text	Train to become a PADI Instructor and teach divers worldwide. The Instructor Development Course (IDC) prepares candidates to lead courses and certify students.	\N	2026-03-28 13:19:45.973231+00	2026-03-28 13:19:45.973231+00
dc7f40df-a9d1-40a2-8ae8-660347e6a837	instructor	en	cta_primary	text	Enquire About Instructor	\N	2026-03-28 13:19:45.973231+00	2026-03-28 13:19:45.973231+00
c212d728-0e56-4d5d-9b9a-50fa3e8638ee	instructor	en	section_overview_title	text	Program Overview	\N	2026-03-28 13:19:45.973231+00	2026-03-28 13:19:45.973231+00
4ab338dd-6bec-4a90-be61-d725d26ae27e	instructor	en	section_overview_body	text	The Instructor pathway trains experienced divers to teach and certify new divers. The IDC includes teaching presentations, student evaluations and practical teaching experience with support from experienced staff instructors.	\N	2026-03-28 13:19:45.973231+00	2026-03-28 13:19:45.973231+00
e21d10d4-f6b9-4939-96e1-4ab1c4ed58e1	instructor	en	section_prereq_title	text	Prerequisites	\N	2026-03-28 13:19:45.973231+00	2026-03-28 13:19:45.973231+00
25dd7c42-7ac4-4350-84a2-9ea0364bafbe	instructor	en	section_prereq_body	text	Prerequisite: PADI Divemaster (or equivalent), current EFR, and a minimum number of logged dives as required by PADI. Candidates must complete Instructor exams and assessments.	\N	2026-03-28 13:19:45.973231+00	2026-03-28 13:19:45.973231+00
2cca68c9-f968-45c6-8815-418e6ed7369b	instructor	en	section_learn_title	text	What you'll learn	\N	2026-03-28 13:19:45.973231+00	2026-03-28 13:19:45.973231+00
7151fd72-7a6e-4636-8b3d-d8ca5fe32b57	sail-rock	nl	quick_facts_depth	text	18-40m	\N	2026-03-27 13:40:10.789117+00	2026-03-28 12:47:09.516174+00
7a12b04c-e868-45dd-ae8f-969292d61c82	instructor	en	section_learn_items	text	Teaching and presentation skills\nCourse management and student evaluation\nRisk management and leadership\nMarketing and business development for instructors	\N	2026-03-28 13:19:45.973231+00	2026-03-28 13:19:45.973231+00
add47335-d445-4cca-83e4-26df8cce77ca	instructor	en	section_inclusions_title	text	Inclusions	\N	2026-03-28 13:19:45.973231+00	2026-03-28 13:19:45.973231+00
5694c7b8-d8c2-4747-bae6-9c8f32699063	instructor	en	section_inclusions_items	text	IDC materials and PADI registration\nPractical teaching sessions and mentoring\nExam preparation and exam fees (where applicable)	\N	2026-03-28 13:19:45.973231+00	2026-03-28 13:19:45.973231+00
b9246c09-5b6c-4ca9-a151-1f50c493a6e9	instructor	en	faq_title	text	FAQ	\N	2026-03-28 13:19:45.973231+00	2026-03-28 13:19:45.973231+00
3b3aedce-cd69-4df4-aa4d-337ae2054429	instructor	en	faq_1_q	text	How do I enrol in the IDC on Koh Tao?	\N	2026-03-28 13:19:45.973231+00	2026-03-28 13:19:45.973231+00
6aa8b00c-5125-4d03-910f-c791f498378d	instructor	en	faq_1_a	text	Contact us for course dates, schedule options and the application process. We can guide you step-by-step from prerequisites to enrollment.	\N	2026-03-28 13:19:45.973231+00	2026-03-28 13:19:45.973231+00
7ea14de7-bb71-4221-8275-86d1bdc485cf	instructor	en	faq_2_q	text	Can I work as a PADI Instructor right after completing IDC?	\N	2026-03-28 13:19:45.973231+00	2026-03-28 13:19:45.973231+00
62fd9edd-00f7-411a-ac05-9d7f7d8dbd5e	sail-rock	nl	quick_facts_difficulty	text	Gevorderd	\N	2026-03-27 13:40:10.789117+00	2026-03-28 12:47:09.516174+00
c6cbd81d-ea82-4336-a75c-22851df228ad	instructor	en	faq_2_a	text	Yes. After completing the IDC and passing the Instructor Examination (IE), you earn the PADI Open Water Scuba Instructor certification and can teach professionally.	\N	2026-03-28 13:19:45.973231+00	2026-03-28 13:19:45.973231+00
73a3c98d-48af-4452-ae2f-022d6819c0b8	instructor	en	faq_3_q	text	Can I continue professional training after the IDC?	\N	2026-03-28 13:19:45.973231+00	2026-03-28 13:19:45.973231+00
c38741b3-4f7f-4b03-bdf7-1996738e2175	instructor	en	faq_3_a	text	Absolutely. After instructor certification, you can continue with pro-level development such as MSDT and beyond, depending on your experience and goals.	\N	2026-03-28 13:19:45.973231+00	2026-03-28 13:19:45.973231+00
4e5c6378-4c9b-4a3d-9677-ff3f547c5d5c	instructor	en	faq_4_q	text	Why choose Koh Tao for an IDC?	\N	2026-03-28 13:19:45.973231+00	2026-03-28 13:19:45.973231+00
73c4b4f9-16ab-4056-8339-1082e35370ac	instructor	en	faq_4_a	text	Koh Tao combines excellent dive sites, experienced instructors, affordable living costs and a strong dive community, making it one of the best places to build a dive career.	\N	2026-03-28 13:19:45.973231+00	2026-03-28 13:19:45.973231+00
7eb834fe-394b-4fb5-b7c4-afb103e76347	accommodation	nl	chooseBooking	text	Kies je accommodatie-optie	\N	2026-03-27 11:51:48.105016+00	2026-03-28 20:56:02.462461+00
59b0d87e-a6cb-4d9a-836a-582fd9a058d1	accommodation	nl	close	text	Sluiten	\N	2026-03-27 11:51:48.105016+00	2026-03-28 20:56:02.462461+00
252b2ad1-da2b-4be2-95e6-dd5bd156a2a9	sail-rock	en	quick_facts_location	text	40 minutes offshore	\N	2026-03-27 13:40:10.789117+00	2026-03-28 12:47:09.516174+00
c02dc353-2384-43c6-8c69-5ca52d3e45c8	sail-rock	en	quick_facts_best_time	text	Year-round, best in dry season (December-May)	\N	2026-03-27 13:40:10.789117+00	2026-03-28 12:47:09.516174+00
7acfa8c8-b604-4034-83af-469c9d40209f	sail-rock	en	what_you_can_see	text	Whalesharks\nGiant Barracuda\nMalabar Grouper\nSailfish	\N	2026-03-27 13:40:10.789117+00	2026-03-28 12:47:09.516174+00
95c9e48a-71cf-4c25-a808-a361af060ebc	sail-rock	en	marine_life_highlights	text	Whalesharks (frequent sightings)\nGiant Barracuda schools\nMalabar Grouper\nSailfish and Eagle Rays\nChevron Barracuda\nLarge Snapper and Fusilier schools\nKing Mackerel\nBrown Marbled Grouper	\N	2026-03-27 13:40:10.789117+00	2026-03-28 12:47:09.516174+00
fb80625f-c12d-40d2-bf0a-b4803ccf0217	sail-rock	en	diving_tips	text	Advanced certification required - this is a deep dive site\nStrong current awareness essential - stay with your guide\nUse a dive computer for accurate depth and time monitoring\nWhalesharks are most active in the morning - early boat departure recommended\nBring a wide-angle lens for photographing large pelagics\nConserve air due to depth and potential current\nPerfect for deep specialty course dives	\N	2026-03-27 13:40:10.789117+00	2026-03-28 12:47:09.516174+00
52586636-16e5-49a1-b63c-7b884255c108	sail-rock	nl	overview	text	Dé top-diepduiklocatie van Koh Tao met grote visscholen, walvishaaien en reuzenbarracuda's. Sail Rock wordt algemeen beschouwd als de beste duiksite in de Golf van Thailand. Deze imposante granieten rotspiek ligt op ongeveer 40 minuten varen van Koh Tao en stijgt op vanuit diepblauw water tot circa 18 meter onder het oppervlak. De site is beroemd om de 'Chimney': een verticale doorgang die een natuurlijke stroming creëert en grote pelagische vissen aantrekt. Walvishaaien worden hier regelmatig gezien, samen met enorme scholen snappers, fusiliers en chevron-barracuda's. Ook adelaarsroggen en zeilvissen verschijnen hier vaak, wat het een spectaculaire diepduikervaring maakt.	\N	2026-03-27 13:40:10.789117+00	2026-03-28 12:47:09.516174+00
8b5500ac-6680-4eb3-8652-6854854111e3	instructor	en	sidebar_title	text	Course Details	\N	2026-03-28 13:19:45.973231+00	2026-03-28 13:19:45.973231+00
548fe8a7-815b-4ebb-bf3b-ff867121f9a5	instructor	en	sidebar_badge	text	Pro Level	\N	2026-03-28 13:19:45.973231+00	2026-03-28 13:19:45.973231+00
2d35717f-66bc-48f3-91d9-4591abdaf36b	instructor	en	sidebar_subtitle	text	IDC · Instructor Examination · Practical Teaching	\N	2026-03-28 13:19:45.973231+00	2026-03-28 13:19:45.973231+00
233fffb1-a6c9-43c9-a780-898ecae26f58	instructor	en	price_thb	text	68900	\N	2026-03-28 13:19:45.973231+00	2026-03-28 13:19:45.973231+00
0374820d-1944-45c1-93bd-8dc0567ec282	instructor	en	sidebar_note	text	Contact us for a tailored Instructor pathway and exam dates.	\N	2026-03-28 13:19:45.973231+00	2026-03-28 13:19:45.973231+00
6d52b6bb-891c-41fc-960c-fb0b712220b9	instructor	en	sidebar_cta	text	Enquire / Apply	\N	2026-03-28 13:19:45.973231+00	2026-03-28 13:19:45.973231+00
a4d72171-3407-4f2e-a602-2fb674213fae	instructor	en	next_steps_title	text	Next steps	\N	2026-03-28 13:19:45.973231+00	2026-03-28 13:19:45.973231+00
c8d72ab6-35d5-45bc-a10e-360ed0bedf1f	instructor	en	next_steps_body	text	Send your diving resume and preferred start dates. We'll guide you through IDC prerequisites, schedules and placement opportunities.	\N	2026-03-28 13:19:45.973231+00	2026-03-28 13:19:45.973231+00
7d96a417-8a1c-4935-a145-1579ca51bb3b	instructor	en	contact_cta	text	Get in touch to book/enquire	\N	2026-03-28 13:19:45.973231+00	2026-03-28 13:19:45.973231+00
6487b2d6-05e6-4180-9044-fb79d2a0ce27	instructor	en	contact_hint	text	Or use the form below to send a booking request directly.	\N	2026-03-28 13:19:45.973231+00	2026-03-28 13:19:45.973231+00
0153671c-fc29-4197-90d1-b4827336b2ad	instructor	en	bottom_cta	text	Send Booking Request	\N	2026-03-28 13:19:45.973231+00	2026-03-28 13:19:45.973231+00
9160be98-c2a6-44f8-80eb-f4910e1b32fa	instructor	nl	hero_title	text	PADI Open Water Scuba Instructor	\N	2026-03-28 13:19:45.973231+00	2026-03-28 13:19:45.973231+00
43f90542-8de7-43cc-adce-5d5ca40ec6ab	instructor	nl	hero_subtitle	text	Train om PADI-instructeur te worden en duikers wereldwijd op te leiden. De Instructor Development Course (IDC) bereidt je voor om cursussen te leiden en cursisten te certificeren.	\N	2026-03-28 13:19:45.973231+00	2026-03-28 13:19:45.973231+00
8c8dd4d9-340d-4439-9004-a50b2bf188aa	instructor	nl	cta_primary	text	Informatie over Instructor	\N	2026-03-28 13:19:45.973231+00	2026-03-28 13:19:45.973231+00
7e3ec3ea-13ac-4141-91af-85ba2cd0399a	instructor	nl	section_overview_title	text	Programmaoverzicht	\N	2026-03-28 13:19:45.973231+00	2026-03-28 13:19:45.973231+00
66067372-3933-497c-85fe-b8f3d59c8101	instructor	nl	section_overview_body	text	Het Instructor-traject leidt ervaren duikers op om nieuwe duikers op te leiden en te certificeren. De IDC omvat lespresentaties, studentbeoordelingen en praktijkervaring in lesgeven, met begeleiding van ervaren stafinstructeurs.	\N	2026-03-28 13:19:45.973231+00	2026-03-28 13:19:45.973231+00
a6638b35-4551-4181-b231-fe702a52f8b7	instructor	nl	section_prereq_title	text	Toelatingseisen	\N	2026-03-28 13:19:45.973231+00	2026-03-28 13:19:45.973231+00
6beb96de-ee42-4260-b5f0-4fe99fb20e7d	instructor	nl	section_prereq_body	text	Vereisten: PADI Divemaster (of gelijkwaardig), geldige EFR en een minimumaantal gelogde duiken volgens PADI-richtlijnen. Kandidaten moeten de Instructor-examens en beoordelingen succesvol afronden.	\N	2026-03-28 13:19:45.973231+00	2026-03-28 13:19:45.973231+00
830c3c36-a670-4e49-91ce-cdad08c33b74	instructor	nl	section_learn_title	text	Wat je leert	\N	2026-03-28 13:19:45.973231+00	2026-03-28 13:19:45.973231+00
d09adbca-3a49-48fd-955d-a73ac66cfd7d	instructor	nl	section_learn_items	text	Didactische en presentatievaardigheden\nCursusmanagement en studentbeoordeling\nRisicobeheer en leiderschap\nMarketing en zakelijke ontwikkeling voor instructeurs	\N	2026-03-28 13:19:45.973231+00	2026-03-28 13:19:45.973231+00
3d6d1e4d-b44c-477b-a773-0fa33dff7ee3	instructor	nl	section_inclusions_title	text	Inbegrepen	\N	2026-03-28 13:19:45.973231+00	2026-03-28 13:19:45.973231+00
1f236810-4e7a-476c-b2db-1a203a9d13e9	instructor	nl	section_inclusions_items	text	IDC-materialen en PADI-registratie\nPraktijklessen en mentoring\nExamenvoorbereiding en examenkosten (waar van toepassing)	\N	2026-03-28 13:19:45.973231+00	2026-03-28 13:19:45.973231+00
3951ccd5-feeb-48b0-a4ef-4eed29f607dc	instructor	nl	faq_title	text	FAQ	\N	2026-03-28 13:19:45.973231+00	2026-03-28 13:19:45.973231+00
89e41cbf-61dc-4ad6-a22c-ddbca646e727	instructor	nl	faq_1_q	text	Hoe schrijf ik me in voor de IDC op Koh Tao?	\N	2026-03-28 13:19:45.973231+00	2026-03-28 13:19:45.973231+00
56a9b18d-1fa6-450e-9055-c5ced5bba88f	instructor	nl	faq_1_a	text	Neem contact met ons op voor cursusdata, planning en het aanmeldproces. We begeleiden je stap voor stap van vereisten tot inschrijving.	\N	2026-03-28 13:19:45.973231+00	2026-03-28 13:19:45.973231+00
1800f65e-c4c7-483d-a2b7-bc298eec5fa9	instructor	nl	faq_2_q	text	Kan ik direct na de IDC als PADI-instructeur werken?	\N	2026-03-28 13:19:45.973231+00	2026-03-28 13:19:45.973231+00
4fbb55e4-451f-43cd-8077-79568964a274	instructor	nl	faq_2_a	text	Ja. Na afronding van de IDC en het behalen van het Instructor Examination (IE) ontvang je de PADI Open Water Scuba Instructor-certificering en kun je professioneel lesgeven.	\N	2026-03-28 13:19:45.973231+00	2026-03-28 13:19:45.973231+00
420ebf12-491d-43ae-b9ff-a3881cbdc32a	instructor	nl	faq_3_q	text	Kan ik na de IDC doorgaan met professionele training?	\N	2026-03-28 13:19:45.973231+00	2026-03-28 13:19:45.973231+00
0ee5f50f-de10-4caf-a3cc-094d60ca5d38	instructor	nl	faq_3_a	text	Absoluut. Na je instructeurscertificering kun je verder doorgroeien met pro-level trajecten zoals MSDT en meer, afhankelijk van je ervaring en doelen.	\N	2026-03-28 13:19:45.973231+00	2026-03-28 13:19:45.973231+00
6a4d417a-ebaf-4492-8982-80e5f5380868	instructor	nl	faq_4_q	text	Waarom Koh Tao kiezen voor een IDC?	\N	2026-03-28 13:19:45.973231+00	2026-03-28 13:19:45.973231+00
a0434acb-1e1f-44d4-b17e-d4657322fb75	instructor	nl	faq_4_a	text	Koh Tao combineert uitstekende duiklocaties, ervaren instructeurs, lagere kosten van levensonderhoud en een sterke duikcommunity. Daardoor is het een van de beste plekken om een duikcarriere op te bouwen.	\N	2026-03-28 13:19:45.973231+00	2026-03-28 13:19:45.973231+00
c3ff00ac-cd29-473b-8310-0c1e17deae8c	instructor	nl	sidebar_title	text	Cursusdetails	\N	2026-03-28 13:19:45.973231+00	2026-03-28 13:19:45.973231+00
3c138d37-2050-4e15-b5c8-33f43d2ef515	instructor	nl	sidebar_badge	text	Pro Niveau	\N	2026-03-28 13:19:45.973231+00	2026-03-28 13:19:45.973231+00
cdc0f367-67fa-414b-b82d-e7e21af2954f	instructor	nl	sidebar_subtitle	text	IDC · Instructor Examination · Praktijkles	\N	2026-03-28 13:19:45.973231+00	2026-03-28 13:19:45.973231+00
90d7678e-3b28-492a-be4f-b8deb6b0e4ad	instructor	nl	price_thb	text	68900	\N	2026-03-28 13:19:45.973231+00	2026-03-28 13:19:45.973231+00
2df87bad-9a55-4ad7-ba68-c7442575b498	instructor	nl	sidebar_note	text	Neem contact op voor een persoonlijk Instructor-traject en examendata.	\N	2026-03-28 13:19:45.973231+00	2026-03-28 13:19:45.973231+00
baa0faaf-953d-4c63-8157-dbe5b84b320c	instructor	nl	sidebar_cta	text	Informatie / Aanmelden	\N	2026-03-28 13:19:45.973231+00	2026-03-28 13:19:45.973231+00
a87da226-39d0-456b-bcd3-c2d31ddc3d3d	instructor	nl	next_steps_title	text	Volgende stappen	\N	2026-03-28 13:19:45.973231+00	2026-03-28 13:19:45.973231+00
eb57df41-0583-446c-bff5-5a1a836a451d	instructor	nl	next_steps_body	text	Stuur je duik-cv en gewenste startdata. Wij begeleiden je door IDC-vereisten, planning en doorgroeimogelijkheden.	\N	2026-03-28 13:19:45.973231+00	2026-03-28 13:19:45.973231+00
ca4b032c-d61c-44d3-b50c-3a718b7d0d92	instructor	nl	contact_cta	text	Neem contact op voor boeking/informatie	\N	2026-03-28 13:19:45.973231+00	2026-03-28 13:19:45.973231+00
342a971f-996d-4c15-959f-2bfcc6205b0d	instructor	nl	contact_hint	text	Of gebruik onderstaand formulier om direct een boekingsaanvraag te sturen.	\N	2026-03-28 13:19:45.973231+00	2026-03-28 13:19:45.973231+00
b132c534-46c4-484b-9745-2aed1222b8c2	instructor	nl	bottom_cta	text	Stuur boekingsaanvraag	\N	2026-03-28 13:19:45.973231+00	2026-03-28 13:19:45.973231+00
63c49dfa-5783-4b32-b9b8-5ab6267ed7e9	accommodation	en	accommodationType	text	Accommodation type	\N	2026-03-27 11:51:48.105016+00	2026-03-28 20:55:30.812602+00
f24bff8e-bd2a-4eb0-a5c2-5e101699b658	accommodation	en	bookOurAccommodation	text	Book Our Accommodation	\N	2026-03-27 11:51:48.105016+00	2026-03-28 20:55:30.812602+00
3b862557-d640-41d6-ad87-38412ebb91d3	accommodation	en	chooseBooking	text	Choose your accommodation option	\N	2026-03-27 11:51:48.105016+00	2026-03-28 20:55:30.812602+00
3e6a069a-c8a1-4585-b301-20649dc9345e	accommodation	en	chooseBookingBody	text	Choose Book Our Accommodation to fill your room details below.	\N	2026-03-27 11:51:48.105016+00	2026-03-28 20:55:30.812602+00
393a933c-c212-4240-8880-11087d1d94b8	accommodation	en	close	text	Close	\N	2026-03-27 11:51:48.105016+00	2026-03-28 20:55:30.812602+00
428c5efd-5a59-49d1-907e-ec9992df007c	accommodation	en	continueBooking	text	Continue to booking form	\N	2026-03-27 11:51:48.105016+00	2026-03-28 20:55:30.812602+00
8de3c09f-c3a5-42b7-a2a0-5163defad575	accommodation	en	ctaBody	text	Add accommodation to your dive trip and send your request directly.	\N	2026-03-27 11:51:48.105016+00	2026-03-28 20:55:30.812602+00
a095b517-b4f7-43fe-929d-043ea1e47635	msdt-program	en	hero_title	text	PADI Master Scuba Diver Trainer (MSDT) Program	\N	2026-03-28 13:22:02.219507+00	2026-03-28 13:22:02.219507+00
d2cc1178-58a8-4e85-9633-10d6a8c70151	msdt-program	en	hero_subtitle	text	The PADI MSDT Program is designed for instructors who want to take their teaching career to the next level. This program provides you with the skills, experience, and certifications to teach a wide range of PADI specialty courses, making you more employable and confident as a dive professional.	\N	2026-03-28 13:22:02.219507+00	2026-03-28 13:22:02.219507+00
037202cd-04ea-4f10-a25a-bd9c303cec69	msdt-program	en	why_title	text	Why Become an MSDT?	\N	2026-03-28 13:22:02.219507+00	2026-03-28 13:22:02.219507+00
68163cb9-b14c-4552-bdfa-1dd75dee2d53	msdt-program	en	why_items	text	Teach at least five PADI Specialty courses\nGain hands-on experience through team teaching and mentorship\nIncrease your employability and earning potential\nStand out to dive centers and resorts worldwide\nEnhance your confidence and teaching skills	\N	2026-03-28 13:22:02.219507+00	2026-03-28 13:22:02.219507+00
a9c0e241-488f-4f85-9c49-9ea16732355d	msdt-program	en	overview_title	text	Program Overview	\N	2026-03-28 13:22:02.219507+00	2026-03-28 13:22:02.219507+00
693d71d6-1750-4510-88ad-48ded8ccdd3b	msdt-program	en	overview_items	text	Choose five PADI Specialty Instructor ratings (e.g., Deep, Wreck, Nitrox, Night, Sidemount, etc.)\nParticipate in hands-on workshops and real-world teaching scenarios\nTeam teach with experienced Course Directors and Staff Instructors\nReceive guidance on course standards, logistics, and student management\nLog at least 25 certifications to qualify for the MSDT rating	\N	2026-03-28 13:22:02.219507+00	2026-03-28 13:22:02.219507+00
332eae67-58e2-4f07-94a6-c25229afdb55	msdt-program	en	prereq_title	text	Prerequisites	\N	2026-03-28 13:22:02.219507+00	2026-03-28 13:22:02.219507+00
dc4cde9a-d685-4987-9509-7a75c43cf8c2	msdt-program	en	prereq_items	text	PADI Open Water Scuba Instructor (OWSI) certification\nCurrent EFR Instructor\nMinimum 25 PADI student certifications (to apply for MSDT rating)\nMinimum age: 18 years	\N	2026-03-28 13:22:02.219507+00	2026-03-28 13:22:02.219507+00
da8efb20-a524-4eb5-bba0-a52a6e681301	msdt-program	en	included_title	text	What's Included	\N	2026-03-28 13:22:02.219507+00	2026-03-28 13:22:02.219507+00
e9c251df-3edb-450d-bfee-a18bc0dc5aa1	msdt-program	en	included_items	text	Five PADI Specialty Instructor courses\nTeam teaching and mentorship\nAll required training materials\nGuidance on application process\nAccess to experienced Course Directors	\N	2026-03-28 13:22:02.219507+00	2026-03-28 13:22:02.219507+00
5e31dfcb-a77f-4cd6-a8af-b1ca5c57e201	msdt-program	en	enroll_title	text	How to Enroll	\N	2026-03-28 13:22:02.219507+00	2026-03-28 13:22:02.219507+00
8aa32e77-f319-4666-acd6-1081a9b05c0c	msdt-program	en	enroll_body	text	Ready to become a PADI Master Scuba Diver Trainer? Contact us for course dates, pricing, and to discuss your specialty choices.	\N	2026-03-28 13:22:02.219507+00	2026-03-28 13:22:02.219507+00
42d42e5b-8cb3-4b5a-84bb-1a8082d50a5f	msdt-program	en	enroll_cta	text	Enquire / Book Now	\N	2026-03-28 13:22:02.219507+00	2026-03-28 13:22:02.219507+00
7816b1b4-8c02-45b8-8f55-e811b4c94e49	msdt-program	nl	hero_title	text	PADI Master Scuba Diver Trainer (MSDT) Programma	\N	2026-03-28 13:22:02.219507+00	2026-03-28 13:22:02.219507+00
f4631d19-8c39-4472-8db5-4e5898e0611d	msdt-program	nl	hero_subtitle	text	Het PADI MSDT-programma is ontwikkeld voor instructeurs die hun lescarriere naar een hoger niveau willen brengen. Dit programma geeft je de vaardigheden, ervaring en certificeringen om een breed aanbod aan PADI-specialtycursussen te geven.	\N	2026-03-28 13:22:02.219507+00	2026-03-28 13:22:02.219507+00
0213f285-684d-4d8e-9505-7336dd66c613	msdt-program	nl	why_title	text	Waarom MSDT worden?	\N	2026-03-28 13:22:02.219507+00	2026-03-28 13:22:02.219507+00
a25cb722-f02b-41af-a502-c569debb67ee	msdt-program	nl	why_items	text	Geef minimaal vijf PADI Specialty-cursussen\nDoe praktijkervaring op via team teaching en mentoring\nVergroot je inzetbaarheid en verdienpotentieel\nVal op bij duikcentra en resorts wereldwijd\nVersterk je zelfvertrouwen en lesvaardigheden	\N	2026-03-28 13:22:02.219507+00	2026-03-28 13:22:02.219507+00
591a76bc-f92f-4f50-a0d1-dd8aef039bb3	msdt-program	nl	overview_title	text	Programmaoverzicht	\N	2026-03-28 13:22:02.219507+00	2026-03-28 13:22:02.219507+00
a4965e95-a207-4fd9-8c73-fb18a0a5bd06	msdt-program	nl	overview_items	text	Kies vijf PADI Specialty Instructor-ratings (bijv. Deep, Wreck, Nitrox, Night, Sidemount)\nVolg praktijkworkshops en realistische lessituaties\nWerk in teamverband met ervaren Course Directors en Staff Instructors\nOntvang begeleiding over standards, logistiek en studentmanagement\nLog minimaal 25 certificeringen om in aanmerking te komen voor de MSDT-rating	\N	2026-03-28 13:22:02.219507+00	2026-03-28 13:22:02.219507+00
fdbe7274-2ee0-4736-8313-d153644f945d	msdt-program	nl	prereq_title	text	Toelatingseisen	\N	2026-03-28 13:22:02.219507+00	2026-03-28 13:22:02.219507+00
bcadeeb9-010f-42b6-af46-27032057643a	msdt-program	nl	prereq_items	text	PADI Open Water Scuba Instructor (OWSI)-certificering\nGeldige EFR Instructor-status\nMinimaal 25 PADI-studentcertificeringen (voor MSDT-aanvraag)\nMinimumleeftijd: 18 jaar	\N	2026-03-28 13:22:02.219507+00	2026-03-28 13:22:02.219507+00
25b6ea56-bad8-4822-9c80-6aef957e3ed6	msdt-program	nl	included_title	text	Wat is inbegrepen	\N	2026-03-28 13:22:02.219507+00	2026-03-28 13:22:02.219507+00
98e2f03e-3879-49ec-85a3-dc967abc9b7a	msdt-program	nl	included_items	text	Vijf PADI Specialty Instructor-cursussen\nTeam teaching en mentoring\nAlle benodigde trainingsmaterialen\nBegeleiding bij het aanvraagproces\nToegang tot ervaren Course Directors	\N	2026-03-28 13:22:02.219507+00	2026-03-28 13:22:02.219507+00
b22ea58b-174e-4616-8fd1-98cf65c4efa6	msdt-program	nl	enroll_title	text	Hoe schrijf je je in	\N	2026-03-28 13:22:02.219507+00	2026-03-28 13:22:02.219507+00
254416e9-c446-4bc2-925a-3e27e79b0e53	msdt-program	nl	enroll_body	text	Klaar om PADI Master Scuba Diver Trainer te worden? Neem contact op voor cursusdata, prijzen en advies over je specialty-keuzes.	\N	2026-03-28 13:22:02.219507+00	2026-03-28 13:22:02.219507+00
9bc9052f-3bd2-443c-8882-043d6e4de27b	msdt-program	nl	enroll_cta	text	Informatie / Boek nu	\N	2026-03-28 13:22:02.219507+00	2026-03-28 13:22:02.219507+00
57ecb474-ffae-41eb-bf3e-28a71bf156e5	accommodation	en	ctaButton	text	Stay with us at our resort accommodation	\N	2026-03-27 11:51:48.105016+00	2026-03-28 20:55:30.812602+00
b9872598-b0c5-42a6-bb3b-867830890736	accommodation	en	ctaTitle	text	Ready to plan your stay?	\N	2026-03-27 11:51:48.105016+00	2026-03-28 20:55:30.812602+00
c6fb2182-0c78-4b75-a6c9-3d251b394219	food-drink	en	title	text	Food & drinks on Koh Tao	\N	2026-03-28 13:42:12.192138+00	2026-03-28 13:42:12.192138+00
8d679a49-2920-4096-b939-c18e156fef70	food-drink	en	subtitle	text	Discover delicious Thai dishes, fresh seafood, and sunset beach bars.	\N	2026-03-28 13:42:12.192138+00	2026-03-28 13:42:12.192138+00
d2287f53-b937-40e9-b4ef-8db21f1acd0f	food-drink	en	highlights_title	text	Culinary highlights	\N	2026-03-28 13:42:12.192138+00	2026-03-28 13:42:12.192138+00
5866c920-2ede-459d-bd61-e85767335958	food-drink	en	highlights_list	text	Wide range of Thai and international restaurants\nFresh seafood available at many beachfront spots\nStreet food stalls for quick and affordable meals\nMany vegetarian and vegan options\nBeach bars and cafes for sunset drinks	\N	2026-03-28 13:42:12.192138+00	2026-03-28 13:42:12.192138+00
ffa696ed-e047-4a62-bfec-285810f2ae69	food-drink	en	intro	text	Try local favorites like Pad Thai, Som Tam, and freshly grilled fish. On Koh Tao you will find everything from simple beach shacks to upscale restaurants.	\N	2026-03-28 13:42:12.192138+00	2026-03-28 13:42:12.192138+00
949c4af3-3bf0-482e-a9cf-ff6b05cbc93c	food-drink	en	cta_more_activities	text	More activities	\N	2026-03-28 13:42:12.192138+00	2026-03-28 13:42:12.192138+00
ff2d92dd-4c41-4abd-956b-409d03ffc5c7	food-drink	en	cta_find_stay	text	Find accommodation	\N	2026-03-28 13:42:12.192138+00	2026-03-28 13:42:12.192138+00
632733c1-81ea-47aa-87ee-a488dcca6d1a	food-drink	en	tip	text	Tip: tap water is not drinkable - buy bottled water or refill at water stations.	\N	2026-03-28 13:42:12.192138+00	2026-03-28 13:42:12.192138+00
080034ae-6bed-4d26-bbab-145dfeaaed46	food-drink	en	taste_title	text	Must-try dishes	\N	2026-03-28 13:42:12.192138+00	2026-03-28 13:42:12.192138+00
f28d3332-f2fb-406a-b27e-99ce0961701f	viewpoints-koh-tao	nl	cta_discover_beaches	text	Ontdek stranden	\N	2026-03-28 13:42:12.192138+00	2026-03-28 13:50:12.131579+00
5874780a-d21a-4cde-b311-1cc3ddfe4e11	marine-life-page	en	label_size	text	Size	seed-script	2026-03-28 14:15:08.526272+00	2026-03-28 14:15:08.526272+00
1659a08b-6607-4926-8386-008455b30c8e	marine-life-page	en	label_habitat	text	Habitat	seed-script	2026-03-28 14:15:08.526272+00	2026-03-28 14:15:08.526272+00
988aeedc-69c7-4edf-8c6b-fe67482ac7de	pro-level-courses	en	page_title	text	Pro Level Courses & Instructor Specialties	\N	2026-03-28 13:23:24.29037+00	2026-03-28 13:23:24.29037+00
2ed34070-d2bf-4b08-9b8b-1d245f130ee3	pro-level-courses	en	page_subtitle	text	Professional training programs and instructor specialty courses available on Koh Tao. Click a course to view details or enquire.	\N	2026-03-28 13:23:24.29037+00	2026-03-28 13:23:24.29037+00
b58cc91a-a1f2-4f5e-bca6-68f27538d74c	pro-level-courses	en	card_description	text	Professional development and instructor-level specialty training.	\N	2026-03-28 13:23:24.29037+00	2026-03-28 13:23:24.29037+00
bd441dee-3993-4519-bcd4-f483edca4c21	pro-level-courses	en	view_button	text	View	\N	2026-03-28 13:23:24.29037+00	2026-03-28 13:23:24.29037+00
cfda051f-ec4d-4619-8f91-0df023db9c7a	pro-level-courses	en	enquire_button	text	Enquire	\N	2026-03-28 13:23:24.29037+00	2026-03-28 13:23:24.29037+00
63647127-9ed6-47c1-b3de-2e76be25032b	accommodation	en	details	text	Additional details	\N	2026-03-27 11:51:48.105016+00	2026-03-28 20:55:30.812602+00
52d661f8-8c90-45ed-bd21-c9512355b39d	shark-island	en	overview	text	Shark Island is located on Koh Tao's south coast and is renowned for its spectacular coral formations and marine biodiversity. The site features beautiful soft purple tree corals, vibrant gorgonians including sea fans and dynamic sea whips that sway gracefully in the current. Black-tip reef sharks are commonly sighted cruising the reef, giving the site its name. The underwater landscape includes coral-encrusted boulders and sandy patches, creating diverse habitats for marine life. This site is particularly popular with underwater photographers due to its colorful subjects and excellent visibility.	\N	2026-03-27 13:40:10.789117+00	2026-03-31 17:53:58.616512+00
bae484dc-1ade-42a9-a3b1-833122855011	shark-island	en	quick_facts_depth	text	10-20m	\N	2026-03-27 13:40:10.789117+00	2026-03-31 17:53:58.616512+00
69d17e0d-b4a4-4f38-949e-0b9c5b1914d3	shark-island	en	quick_facts_difficulty	text	Beginner-Intermediate	\N	2026-03-27 13:40:10.789117+00	2026-03-31 17:53:58.616512+00
840a8be2-16f6-4499-a96f-0a438e969f5f	shark-island	en	quick_facts_location	text	South coast	\N	2026-03-27 13:40:10.789117+00	2026-03-31 17:53:58.616512+00
794d33a7-7098-4eeb-8e56-780413015590	shark-island	en	quick_facts_best_time	text	Year-round, excellent during dry season	\N	2026-03-27 13:40:10.789117+00	2026-03-31 17:53:58.616512+00
b422310d-1957-4b36-9d6f-b0c51d6a5070	accommodation	en	featuresTitle	text	What To Expect	\N	2026-03-27 11:51:48.105016+00	2026-03-28 20:55:30.812602+00
aca9de8c-bfb2-4e6d-9f1f-c97370abc712	accommodation	en	heroSubtitle	text	Choose from cozy rooms, family-friendly suites, and bungalows in great locations close to our diving operations.	\N	2026-03-27 11:51:48.105016+00	2026-03-28 20:55:30.812602+00
3520cc09-aa8d-4144-b3d7-98f80c0a9321	accommodation	en	nights	text	Number of nights	\N	2026-03-27 11:51:48.105016+00	2026-03-28 20:55:30.812602+00
83a17987-d9dd-456a-a1e7-9ecb1fca4e97	accommodation	en	people	text	Number of people	\N	2026-03-27 11:51:48.105016+00	2026-03-28 20:55:30.812602+00
c22802ad-9ada-43bd-85c8-6c22b46c4ca3	accommodation	en	pricingNote	text	Rates vary by season. Contact us for current availability and exact pricing.	\N	2026-03-27 11:51:48.105016+00	2026-03-28 20:55:30.812602+00
bdbffef5-fe26-44e3-8584-446afe0aca3e	accommodation	en	roomsIntro	text	Whether you are looking for a budget-friendly room or more space for family travel, we can match you with the right option.	\N	2026-03-27 11:51:48.105016+00	2026-03-28 20:55:30.812602+00
be622cc3-eda4-477d-8ca6-05681f4e7acf	accommodation	en	roomsTitle	text	Our Rooms	\N	2026-03-27 11:51:48.105016+00	2026-03-28 20:55:30.812602+00
ad21d239-a7d8-455d-a221-01f3418e4777	sail-rock	nl	quick_facts_location	text	40 minuten uit de kust	\N	2026-03-27 13:40:10.789117+00	2026-03-28 12:47:09.516174+00
0f34883e-6e8a-4d07-af1c-2811082ca7d0	sail-rock	nl	what_you_can_see	text	Walvishaaien\nReuzenbarracuda\nMalabar tandbaars\nZeilvis	\N	2026-03-27 13:40:10.789117+00	2026-03-28 12:47:09.516174+00
7ebcd89d-eb4f-41b9-a909-6db46b0d884f	sail-rock	nl	marine_life_highlights	text	Walvishaaien (regelmatige waarnemingen)\nScholen reuzenbarracuda\nMalabar tandbaars\nZeilvis en adelaarsrog\nChevron-barracuda\nGrote scholen snapper en fusilier\nKoningsmakreel\nGemarmerde tandbaars	\N	2026-03-27 13:40:10.789117+00	2026-03-28 12:47:09.516174+00
608b7633-a1fd-4821-9af6-f679c20b2f36	sail-rock	nl	diving_tips	text	Gevorderde certificering vereist - dit is een diepduiksite\nStromingsbewustzijn is essentieel - blijf bij je gids\nGebruik een duikcomputer voor nauwkeurige diepte- en tijdsbewaking\nWalvishaaien zijn vaak actiever in de ochtend - vroeg vertrek aanbevolen\nNeem een groothoeklens mee voor grote pelagische soorten\nSpaar lucht in verband met diepte en mogelijke stroming\nPerfect voor specialisaties in diepduiken	\N	2026-03-27 13:40:10.789117+00	2026-03-28 12:47:09.516174+00
0c23f552-7ba2-4b97-8286-3c7bab3fef25	shark-island	nl	overview	text	Shark Island ligt aan de zuidkust van Koh Tao en staat bekend om spectaculaire koraalformaties en hoge biodiversiteit. Je vindt hier prachtige paarse zachte boomkoralen en kleurrijke gorgonen, waaronder grote zeewaaiers en dynamische zweepkoralen die meebewegen met de stroming. Zwartpuntrifhaaien worden hier regelmatig gezien terwijl ze langs het rif trekken - daar dankt de site haar naam aan. Het onderwaterlandschap met met koraal bedekte rotsblokken en zandstroken creëert gevarieerde habitats. Door de kleur en het vaak goede zicht is dit een favoriete plek voor onderwaterfotografie.	\N	2026-03-27 13:40:10.789117+00	2026-03-28 12:47:09.516174+00
a878ed7f-44c6-4d41-9cc4-ba89cb30060d	shark-island	nl	quick_facts_depth	text	8-20m	\N	2026-03-27 13:40:10.789117+00	2026-03-28 12:47:09.516174+00
2d58bbcf-88b7-49e6-88a0-d1f7fc7f1b2e	shark-island	nl	quick_facts_difficulty	text	Beginner-gemiddeld	\N	2026-03-27 13:40:10.789117+00	2026-03-28 12:47:09.516174+00
6f33c3ae-f87e-4e75-b1d4-b19861f28960	shark-island	nl	quick_facts_location	text	Zuidkust	\N	2026-03-27 13:40:10.789117+00	2026-03-28 12:47:09.516174+00
50ab3aa8-b43e-4a61-b223-441ed64c03d7	shark-island	nl	quick_facts_best_time	text	Hele jaar, uitstekend in droogseizoen	\N	2026-03-27 13:40:10.789117+00	2026-03-28 12:47:09.516174+00
7b8adfaf-cd3a-4072-ba7f-fc24ff13c61f	shark-island	nl	what_you_can_see	text	Zeewaaiers\nZwepkoralen\nZwartpuntrifhaaien\nTropische vissen	\N	2026-03-27 13:40:10.789117+00	2026-03-28 12:47:09.516174+00
14d39d8e-b530-4cf6-b1f1-7b3ca66081d9	shark-island	nl	marine_life_highlights	text	Zwartpuntrifhaaien\nDiverse rifvissen\nGorgoon-zeewaaiers\nZachte boomkoralen\nAnthias\nPapegaaivissen en lipvissen\nMurenen\nNaaktslakken en andere ongewervelden	\N	2026-03-27 13:40:10.789117+00	2026-03-28 12:47:09.516174+00
39118e5f-0e28-4d32-8b38-55863ea60800	shark-island	nl	diving_tips	text	Geschikt voor alle brevetniveaus\nUitstekend voor onderwaterfotografie\nZoek haaien in het blauwe water boven het rif\nVerken de koraalformaties met zorg\nGeweldige locatie voor observatie van onderwaterleven\nPerfect voor langere duiken\nGoede plek om fotografietechniek te oefenen\nSpaar energie voor de terugzwem	\N	2026-03-27 13:40:10.789117+00	2026-03-28 12:47:09.516174+00
b2557321-57ea-46af-8afd-d06db86809e2	shark-island	nl	images	text	/images/sharkisand.jpg\n/images/blacktip-reef-shark.jpg	\N	2026-03-27 16:24:21.72643+00	2026-03-28 12:47:09.516174+00
574701a8-726c-4a7e-b53d-bb4b695a6f52	japanese-gardens	nl	quick_facts_difficulty	text	Beginner tot Gemiddeld	\N	2026-03-27 13:40:10.789117+00	2026-03-28 12:47:09.516174+00
d81d5c8c-e9c2-4ba9-812b-ea6de0c87b83	pro-level-courses	en	footer_title	text	Enquire / Book a Pro Course	\N	2026-03-28 13:23:24.29037+00	2026-03-28 13:23:24.29037+00
efd79d32-1bdc-4d00-af94-9bbe597f7cd4	pro-level-courses	en	footer_body	text	Complete the form below and we'll reply with availability and pricing.	\N	2026-03-28 13:23:24.29037+00	2026-03-28 13:23:24.29037+00
9890eb90-82a2-474a-8543-5d3212f9bdcc	pro-level-courses	en	footer_cta	text	Go to booking page	\N	2026-03-28 13:23:24.29037+00	2026-03-28 13:23:24.29037+00
e5be5c95-0690-464f-ab09-950a8ef4e6fd	pro-level-courses	en	courses_list	text	PADI Divemaster Course|/courses/divemaster\nPADI Instructor Course|/courses/instructor\nEFR Instructor Course\nPADI MSDT Program|/courses/msdt-program\nIDC Staff Instructor\nPADI IDC Schedule\nInstructor Specialties\nAWARE Fish ID\nBoat Instructor\nDeep Instructor\nDPV Instructor\nEmergency O2 Provider\nEquipment Instructor\nNight Diving Instructor\nNitrox Instructor\nSearch & Recovery\nSelf Reliant Instructor\nSidemount Instructor\nUnderwater Naturalist\nUnderwater Navigator\nWreck Instructor\nMSDT Instructor Specialty courses Koh Tao - Sidemount	\N	2026-03-28 13:23:24.29037+00	2026-03-28 13:23:24.29037+00
8e012c54-a062-4b9f-8884-f3e82fd827a3	pro-level-courses	nl	page_title	text	Pro Level Cursussen & Instructor-specialties	\N	2026-03-28 13:23:24.29037+00	2026-03-28 13:23:24.29037+00
c80f83f8-869c-4bcf-a6b7-d7f3f66d5488	pro-level-courses	nl	page_subtitle	text	Professionele trainingsprogramma's en instructor-specialtycursussen op Koh Tao. Klik op een cursus voor details of informatie.	\N	2026-03-28 13:23:24.29037+00	2026-03-28 13:23:24.29037+00
91c09c19-ddb9-4073-95b2-0aa809992d3d	pro-level-courses	nl	card_description	text	Professionele ontwikkeling en specialtytraining op instructeursniveau.	\N	2026-03-28 13:23:24.29037+00	2026-03-28 13:23:24.29037+00
98298257-0555-4569-a5d2-db307ad8119f	pro-level-courses	nl	view_button	text	Bekijken	\N	2026-03-28 13:23:24.29037+00	2026-03-28 13:23:24.29037+00
b0e6f167-a0e2-4ec7-8369-c7fac810e0e4	pro-level-courses	nl	enquire_button	text	Informatie	\N	2026-03-28 13:23:24.29037+00	2026-03-28 13:23:24.29037+00
149ba278-5717-4bac-9e4a-687461e3bb96	pro-level-courses	nl	footer_title	text	Informatie / Boek een pro-cursus	\N	2026-03-28 13:23:24.29037+00	2026-03-28 13:23:24.29037+00
99ede9fc-3cfc-4fd7-9330-1b642c272281	pro-level-courses	nl	footer_body	text	Vul het formulier in en wij reageren met beschikbaarheid en prijzen.	\N	2026-03-28 13:23:24.29037+00	2026-03-28 13:23:24.29037+00
e2b0125b-2e75-4782-af7d-e0cb6367291a	pro-level-courses	nl	footer_cta	text	Naar boekingspagina	\N	2026-03-28 13:23:24.29037+00	2026-03-28 13:23:24.29037+00
135056a7-4af4-4582-8062-c6fe175a75a8	pro-level-courses	nl	courses_list	text	PADI Divemaster-cursus|/courses/divemaster\nPADI Instructor-cursus|/courses/instructor\nEFR Instructor-cursus\nPADI MSDT-programma|/courses/msdt-program\nIDC Staff Instructor\nPADI IDC-schema\nInstructor-specialties\nAWARE Fish ID\nBoot Instructor\nDeep Instructor\nDPV Instructor\nEmergency O2 Provider\nEquipment Instructor\nNight Diving Instructor\nNitrox Instructor\nSearch & Recovery\nSelf Reliant Instructor\nSidemount Instructor\nUnderwater Naturalist\nUnderwater Navigator\nWreck Instructor\nMSDT Instructor Specialty-cursussen Koh Tao - Sidemount	\N	2026-03-28 13:23:24.29037+00	2026-03-28 13:23:24.29037+00
95826ca9-b617-4ef4-b628-a300d2d27d76	food-drink	en	tastes_list	text	Pad Thai - stir-fried rice noodles with shrimp or chicken\nSom Tam - spicy green papaya salad\nFresh grilled fish with lime and chili\nMango sticky rice for dessert	\N	2026-03-28 13:42:12.192138+00	2026-03-28 13:42:12.192138+00
8a745abd-dd0e-49e5-943a-b99a9ac3f676	food-drink	nl	title	text	Eten & drinken op Koh Tao	\N	2026-03-28 13:42:12.192138+00	2026-03-28 13:42:12.192138+00
0aded3f1-bcc0-4e08-a825-e6a8b11d4909	food-drink	nl	subtitle	text	Ontdek heerlijke Thaise gerechten, verse seafood en strandbars bij zonsondergang.	\N	2026-03-28 13:42:12.192138+00	2026-03-28 13:42:12.192138+00
e68bdb53-2dd7-442b-be08-67b32051db46	food-drink	nl	highlights_title	text	Culinaire highlights	\N	2026-03-28 13:42:12.192138+00	2026-03-28 13:42:12.192138+00
a0b1f5fc-a502-44c6-8b1c-1932c60ecc52	food-drink	nl	highlights_list	text	Groot aanbod aan Thaise en internationale restaurants\nVerse seafood bij veel plekken aan het strand\nStreetfood-kraampjes voor snelle en betaalbare maaltijden\nVeel vegetarische en vegan opties\nStrandbars en cafes voor drankjes bij zonsondergang	\N	2026-03-28 13:42:12.192138+00	2026-03-28 13:42:12.192138+00
1c4f161e-af4f-42ed-8690-681a0e0ec499	food-drink	nl	intro	text	Probeer lokale favorieten zoals Pad Thai, Som Tam en vers gegrilde vis. Op Koh Tao vind je alles: van eenvoudige strandtentjes tot luxe restaurants.	\N	2026-03-28 13:42:12.192138+00	2026-03-28 13:42:12.192138+00
bc8ac321-1af0-4317-9b28-71b6f6f01d37	food-drink	nl	cta_more_activities	text	Meer activiteiten	\N	2026-03-28 13:42:12.192138+00	2026-03-28 13:42:12.192138+00
8f3992b9-459c-4a99-b4cd-5a1c8622d7f6	food-drink	nl	cta_find_stay	text	Zoek verblijf	\N	2026-03-28 13:42:12.192138+00	2026-03-28 13:42:12.192138+00
51920226-be02-402c-97e0-0ccd59abce7b	food-drink	nl	tip	text	Tip: kraanwater is niet drinkbaar - koop flessenwater of vul bij waterpunten.	\N	2026-03-28 13:42:12.192138+00	2026-03-28 13:42:12.192138+00
0df78e69-5520-4c79-b458-2d45327da4d4	food-drink	nl	taste_title	text	Aanraders om te proeven	\N	2026-03-28 13:42:12.192138+00	2026-03-28 13:42:12.192138+00
9fbfee4e-b4e1-4953-8eb2-99622c3e4d71	twins-pinnacle	nl	quick_facts_best_time	text	Hele jaar, beste november-mei	\N	2026-03-27 13:40:10.789117+00	2026-03-28 12:47:09.516174+00
5dc40cc3-be59-4381-98bc-9d03476e3e7f	twins-pinnacle	nl	what_you_can_see	text	Zadel-anemoonvis\nNaaktslakken\nPijpvissen\nGele koffervis\nLongface emperor\nVlindervissen\nKeizersvissen\nRifvissen\nMurenen\nTrevally\nBlauwgestippelde pijlstaartrog\nSnappers\nTandbaarzen\nPapegaaivissen\nBannerfish\nZeeschildpadden\nScribbled filefish\nAnemoonvissen\nKoffervissen en wratslakken	\N	2026-03-27 13:40:10.789117+00	2026-03-28 12:47:09.516174+00
b41500b1-ece2-42f9-a0c5-9fdebc810220	food-drink	nl	tastes_list	text	Pad Thai - gebakken rijstnoedels met garnalen of kip\nSom Tam - pittige groene papajasalade\nVerse gegrilde vis met limoen en chili\nMango sticky rice als dessert	\N	2026-03-28 13:42:12.192138+00	2026-03-28 13:42:12.192138+00
17b37fd0-ab5c-4f01-9943-f2b5c945697e	how-to-get-here	en	title	text	How to get to Koh Tao	\N	2026-03-28 13:42:12.192138+00	2026-03-28 13:42:12.192138+00
61b59a3a-4160-4efa-ab55-1263f85d2190	how-to-get-here	en	subtitle	text	Different routes to reach this island paradise.	\N	2026-03-28 13:42:12.192138+00	2026-03-28 13:42:12.192138+00
559ddef4-1905-49d2-91d0-a1e5c5ac806d	twins-pinnacle	nl	images	text	/images/twins-header.png	\N	2026-03-27 16:24:21.72643+00	2026-03-28 12:47:09.516174+00
4a2e5cd9-6c68-4bfe-8974-fd26cfc4d6e8	how-to-get-here	en	options_title	text	Travel options	\N	2026-03-28 13:42:12.192138+00	2026-03-28 13:42:12.192138+00
766bd6fe-5071-4ec2-aa71-6eee768072df	how-to-get-here	en	options_list	text	By ferry:|Koh Tao is only accessible by boat. Ferries depart from Chumphon, Surat Thani, Koh Samui, and Koh Phangan. Popular operators include Lomprayah, Songserm, and Seatran.\nBy train:|Take a train from Bangkok to Chumphon and transfer to the ferry there.\nBy bus:|Buses from Bangkok and other cities connect to ferry terminals in Chumphon and Surat Thani.\nBy plane:|Fly to Koh Samui, Chumphon, or Surat Thani and then take a ferry to Koh Tao.	\N	2026-03-28 13:42:12.192138+00	2026-03-28 13:42:12.192138+00
ea7ed4f0-e2c5-447c-bd85-2d308e020772	how-to-get-here	en	cta_book_stay	text	Book accommodation	\N	2026-03-28 13:42:12.192138+00	2026-03-28 13:42:12.192138+00
dbb46424-ff1d-4893-b470-b5af16075928	how-to-get-here	en	cta_visa_info	text	Visa information	\N	2026-03-28 13:42:12.192138+00	2026-03-28 13:42:12.192138+00
42596e12-cef7-419b-af18-aba46f28e3c8	how-to-get-here	en	tip	text	Tip: book ferry tickets early during high season. Most ferries arrive at Mae Haad Pier.	\N	2026-03-28 13:42:12.192138+00	2026-03-28 13:42:12.192138+00
c2a47ff7-dbb6-4608-b4c8-382f8b33e5d4	how-to-get-here	en	ferry_title	text	Ferry options	\N	2026-03-28 13:42:12.192138+00	2026-03-28 13:42:12.192138+00
38b02db5-30c0-43e2-aff5-c5a478b94c91	how-to-get-here	en	ferry_options_list	text	Speed boat:|1-1.5 hours, more expensive but faster\nNight ferry:|Cheaper option, arrival in the morning\nDay ferry:|Standard option with scenic views\n|Check operator websites for schedules and discounts	\N	2026-03-28 13:42:12.192138+00	2026-03-28 13:42:12.192138+00
90af961c-ba64-4a62-9f17-3ad4750fea57	how-to-get-here	nl	title	text	Hoe kom je op Koh Tao	\N	2026-03-28 13:42:12.192138+00	2026-03-28 13:42:12.192138+00
a6ab514e-bfd2-4fb4-95b0-30f7640d3c37	how-to-get-here	nl	subtitle	text	Verschillende routes om dit eilandparadijs te bereiken.	\N	2026-03-28 13:42:12.192138+00	2026-03-28 13:42:12.192138+00
ebc91174-b693-4ea7-a1e6-bbde5734144a	how-to-get-here	nl	options_title	text	Reisopties	\N	2026-03-28 13:42:12.192138+00	2026-03-28 13:42:12.192138+00
aa7b85aa-2316-4f9e-965a-b89452862dc4	accommodation	en	viewPictures	text	View Pictures	\N	2026-03-27 11:51:48.105016+00	2026-03-28 20:55:30.812602+00
d7ae1822-6967-4476-baae-9f2a08fbb904	accommodation	en	viewRooms	text	View Rooms	\N	2026-03-27 11:51:48.105016+00	2026-03-28 20:55:30.812602+00
74b6c96b-3719-402b-9692-ffdc2ba021c6	accommodation	en	whyStayBody	text	You stay close to the dive center, boats, and restaurants. Less travel time means more time enjoying Koh Tao.	\N	2026-03-27 11:51:48.105016+00	2026-03-28 20:55:30.812602+00
d35e2e5a-f66c-448b-ab36-303ab684a5f2	htms-sattakut	nl	overview	text	HTMS Sattakut is een fascinerend voormalig US Navy-schip uit de Tweede Wereldoorlog dat in 2011 bewust is afgezonken om een kunstmatig rif te vormen. Dit wrak van circa 30 meter ligt tussen Koh Tao en Koh Nang Yuan op 18-30 meter diepte. Inmiddels is het uitgegroeid tot een levendig rif, bedekt met koralen en bewoond door uiteenlopend onderwaterleven. De scheepsstructuur biedt interessante doorgangen, van machinekamer tot brug. Grote tandbaarzen, snappers en barracuda's gebruiken het wrak als leefgebied, waardoor dit een topbestemming is voor wrakduiken in Zuidoost-Azië.	\N	2026-03-27 13:40:10.789117+00	2026-03-28 12:47:09.516174+00
9f2eaea0-a94f-4b38-9c66-9502d1147902	htms-sattakut	nl	quick_facts_depth	text	18-30m	\N	2026-03-27 13:40:10.789117+00	2026-03-28 12:47:09.516174+00
3e232b74-b812-439a-80de-00cce12c9620	htms-sattakut	nl	quick_facts_difficulty	text	Gevorderd	\N	2026-03-27 13:40:10.789117+00	2026-03-28 12:47:09.516174+00
228bd395-8bc0-49b0-a158-3b7d3a643bac	htms-sattakut	nl	quick_facts_location	text	Tussen de eilanden	\N	2026-03-27 13:40:10.789117+00	2026-03-28 12:47:09.516174+00
b5e38b36-b82d-4e28-bd30-1152e63d35b1	htms-sattakut	nl	quick_facts_best_time	text	Hele jaar, beste in droogseizoen	\N	2026-03-27 13:40:10.789117+00	2026-03-28 12:47:09.516174+00
fffd0f72-d57f-4f05-8cc9-4db03bef6548	htms-sattakut	nl	what_you_can_see	text	Wrakduiken\nOnderwaterleven\nDoorgangen\nHistorische waarde	\N	2026-03-27 13:40:10.789117+00	2026-03-28 12:47:09.516174+00
c06e77a6-68e8-43f2-9316-24a1be3a755f	htms-sattakut	nl	marine_life_highlights	text	Malabar tandbaarzen (resident)\nReuzenbarracuda\nScholen snapper en fusilier\nMurenen\nKoraalduivels en schorpioenvissen\nKoraalgroei op wrakstructuur\nDiverse rifvissen\nKogelvissen en trekkervissen	\N	2026-03-27 13:40:10.789117+00	2026-03-28 12:47:09.516174+00
99b0e0f1-f152-4a1f-be44-5c22d09a746c	htms-sattakut	nl	diving_tips	text	Gevorderde certificering vereist voor wrakduiken\nUitstekende site voor wrakspecialisaties\nRespecteer de historische betekenis van deze locatie\nGebruik passende wrakduiktechnieken en penetratievaardigheden\nBlijf bij je gids bij verkenning van het interieur\nZeer geschikt voor onderwaterfotografie\nSpaar lucht door diepte en verkenning\nLet op de historische kenmerken van het schip	\N	2026-03-27 13:40:10.789117+00	2026-03-28 12:47:09.516174+00
0dd02144-940e-440d-861d-f8146318accb	japanese-gardens	en	what_you_can_see	text	Pink Tailed Triggerfish\nOcellated Eagle Rays\nColorful Corals\nMarbled Octopus	\N	2026-03-27 13:40:10.789117+00	2026-03-28 12:47:09.516174+00
dfe054d0-30fa-4336-aa7d-889dee7f433b	japanese-gardens	en	marine_life_highlights	text	Pink-tailed Triggerfish (unique to this site)\nOcellated Eagle Rays\nMarbled Octopus\nBlue-ringed Octopus\nNudibranchs and flatworms\nParrotfish and wrasse\nAnthias and damselfish\nMoray eels and lionfish	\N	2026-03-27 13:40:10.789117+00	2026-03-28 12:47:09.516174+00
0a831527-f1b5-465a-a19f-52773961a780	japanese-gardens	en	diving_tips	text	Best time is November-May for visibility.\nLook for unique triggerfish and octopus.\nGreat for underwater photography.	\N	2026-03-27 13:40:10.789117+00	2026-03-28 12:47:09.516174+00
72d82e68-672e-4de5-a9bc-6460a9b96534	japanese-gardens	en	images	text	/images/japanandwins.jpg	\N	2026-03-27 16:24:21.72643+00	2026-03-28 12:47:09.516174+00
24f43f07-3cfc-4482-b658-559437520168	japanese-gardens	nl	overview	text	Japanese Gardens is een prachtige duiklocatie bij Koh Nang Yuan, bekend om diverse koraalriffen en rijk onderwaterleven. Geschikt voor alle niveaus.	\N	2026-03-27 13:40:10.789117+00	2026-03-28 12:47:09.516174+00
e5a62be5-a053-4fe2-ba24-2084486ef709	japanese-gardens	nl	quick_facts_depth	text	5-18m	\N	2026-03-27 13:40:10.789117+00	2026-03-28 12:47:09.516174+00
c3a67015-70cd-400b-9b1a-1a3c529b332c	japanese-gardens	nl	quick_facts_location	text	Bij Koh Nang Yuan	\N	2026-03-27 13:40:10.789117+00	2026-03-28 12:47:09.516174+00
cac28bd2-0b92-48f1-a021-4a3dc384453a	japanese-gardens	nl	quick_facts_best_time	text	Hele jaar, beste zicht november-mei	\N	2026-03-27 13:40:10.789117+00	2026-03-28 12:47:09.516174+00
c9c50843-14a7-4bf4-b668-294f39c4030d	japanese-gardens	nl	what_you_can_see	text	Pink-tailed triggerfish\nOcellated adelaarsrog\nKleurrijk koraal\nGemarmerde octopus	\N	2026-03-27 13:40:10.789117+00	2026-03-28 12:47:09.516174+00
6df5948d-24c8-4746-a4cf-24f517eb60fc	japanese-gardens	nl	marine_life_highlights	text	Pink-tailed triggerfish\nOcellated adelaarsrog\nGemarmerde octopus\nBlue-ringed octopus\nNaaktslakken en platwormen\nPapegaaivissen en lipvissen\nAnthias en juffervissen\nMurenen en koraalduivels	\N	2026-03-27 13:40:10.789117+00	2026-03-28 12:47:09.516174+00
1f98b30a-2470-4207-81b5-a7512f1bb0bd	japanese-gardens	nl	diving_tips	text	Beste periode november-mei voor zicht\nZoek naar unieke triggerfish en octopus\nGeweldig voor onderwaterfotografie	\N	2026-03-27 13:40:10.789117+00	2026-03-28 12:47:09.516174+00
ea548842-78fb-4d1e-8d7e-53e3c1b3f83b	japanese-gardens	nl	images	text	/images/japanandwins.jpg	\N	2026-03-27 16:24:21.72643+00	2026-03-28 12:47:09.516174+00
005e4743-5299-4e06-a427-cc5efe2edf73	mango-bay	en	overview	text	Shallow coral reefs perfect for relaxed diving with thriving marine ecosystems.	\N	2026-03-27 13:40:10.789117+00	2026-03-28 12:47:09.516174+00
87269ae0-dce9-48b1-9a79-987cd3558975	mango-bay	en	quick_facts_depth	text	5-18m	\N	2026-03-27 13:40:10.789117+00	2026-03-28 12:47:09.516174+00
cfb0e4fa-5273-4f00-8930-a2148232e5c6	mango-bay	en	quick_facts_difficulty	text	Beginner	\N	2026-03-27 13:40:10.789117+00	2026-03-28 12:47:09.516174+00
aa0ee47a-909d-497f-b799-1e27e93162e0	mango-bay	en	quick_facts_location	text	West coast bay	\N	2026-03-27 13:40:10.789117+00	2026-03-28 12:47:09.516174+00
b934f19c-8769-4964-8b7c-b230920c03c6	mango-bay	en	quick_facts_best_time	text	Year-round, best during calm weather	\N	2026-03-27 13:40:10.789117+00	2026-03-28 12:47:09.516174+00
885c6a5a-8378-4edd-97b6-3e26e1644883	mango-bay	en	what_you_can_see	text	Colorful reef fish\nClownfish and anemones\nParrotfish and wrasse\nButterflyfish\nAngelfish species\nSmall reef sharks	\N	2026-03-27 13:40:10.789117+00	2026-03-28 12:47:09.516174+00
2ab23068-089b-42e8-b4b0-94e800cf2b7b	mango-bay	en	marine_life_highlights	text	Healthy reef ecosystem\nColorful hard and soft corals\nSea anemones\nAbundant marine life	\N	2026-03-27 13:40:10.789117+00	2026-03-28 12:47:09.516174+00
b53313e0-8118-49c8-a9ba-9264a22cad3d	mango-bay	nl	overview	text	Ondiepe koraalriffen perfect voor ontspannen duiken met een bloeiend marien ecosysteem.	\N	2026-03-27 13:40:10.789117+00	2026-03-28 12:47:09.516174+00
378d947a-34f6-469a-8b21-139ea2b2d335	mango-bay	nl	quick_facts_depth	text	5-18m	\N	2026-03-27 13:40:10.789117+00	2026-03-28 12:47:09.516174+00
b849c750-93e6-4296-89e5-eb390d2d0ef3	mango-bay	nl	quick_facts_difficulty	text	Beginner	\N	2026-03-27 13:40:10.789117+00	2026-03-28 12:47:09.516174+00
7eb2f774-d55b-4acd-af56-615ecee7251d	mango-bay	nl	quick_facts_location	text	Baai aan westkust	\N	2026-03-27 13:40:10.789117+00	2026-03-28 12:47:09.516174+00
c228ea4c-2e7c-4901-ba97-0f2da326b2d7	mango-bay	nl	quick_facts_best_time	text	Hele jaar, beste bij kalm weer	\N	2026-03-27 13:40:10.789117+00	2026-03-28 12:47:09.516174+00
ddb85249-d58c-4bdc-9e51-0dfa47e567c5	mango-bay	nl	what_you_can_see	text	Kleurrijke rifvissen\nAnemoonvissen\nPapegaaivissen en lipvissen\nVlindervissen\nKeizersvissen\nKleine rifhaaien	\N	2026-03-27 13:40:10.789117+00	2026-03-28 12:47:09.516174+00
cd03ec7d-6209-42a4-8ae4-6e990182eb21	mango-bay	nl	diving_tips	text	Perfect voor beginners en trainingsduiken\nOok uitstekend om te snorkelen\nZoek grazers in zeegras en rifleven\nToplocatie voor onderwaterfotografie\nKalm water ideaal voor trim- en drijfvermogen\nMeerdere koraalbommies om te verkennen\nGeschikt voor langere duiken\nPerfect voor Open Water trainingsduiken	\N	2026-03-27 13:40:10.789117+00	2026-03-28 12:47:09.516174+00
bdc97da9-67fa-4a31-8599-bbef255bff28	mango-bay	nl	images	text	/images/mango-bay.webp	\N	2026-03-27 16:24:21.72643+00	2026-03-28 12:47:09.516174+00
84d54909-d2c8-4768-8b3b-a95bb629f80a	twins-pinnacle	en	quick_facts_depth	text	6-18m	\N	2026-03-27 13:40:10.789117+00	2026-03-28 12:47:09.516174+00
f0abe249-eb4c-4e42-a78d-0dbf4cee5f6f	twins-pinnacle	en	quick_facts_difficulty	text	Beginner to Intermediate	\N	2026-03-27 13:40:10.789117+00	2026-03-28 12:47:09.516174+00
30908456-fbac-4a3b-b8f0-c8704ddfa5e4	twins-pinnacle	en	quick_facts_location	text	West coast of Koh Nang Yuan	\N	2026-03-27 13:40:10.789117+00	2026-03-28 12:47:09.516174+00
51ea82b2-031a-492c-92e2-4b28eb5d88f8	twins-pinnacle	en	quick_facts_best_time	text	Year-round, best November-May	\N	2026-03-27 13:40:10.789117+00	2026-03-28 12:47:09.516174+00
aee6e7d5-40e9-4b96-a047-09bbd29d5142	twins-pinnacle	en	what_you_can_see	text	Saddleback clownfish and Sebae anemones\nNudibranchs\nPipefish\nYellow boxfish\nLongface emperor\nWhite’s butterflyfish\nAngelfish\nReef fish\nMoray eels\nTrevally\nBluespotted ribbon tail ray\nSnapper\nGroupers\nParrotfish\nBannerfish\nSea turtles\nScribbled filefish\nAnemonefish\nBoxfish and wart slugs	\N	2026-03-27 13:40:10.789117+00	2026-03-28 12:47:09.516174+00
d0d46b96-dadc-487f-9f98-9a8a41e4e67b	twins-pinnacle	en	marine_life_highlights	text	Three granite pinnacles\nArch and rock formations\nRich marine life\nPerfect for training\nCalm conditions\nAnemones with clownfish	\N	2026-03-27 13:40:10.789117+00	2026-03-28 12:47:09.516174+00
8365cd43-7d54-4918-a872-e81cfe803e62	twins-pinnacle	en	diving_tips	text	Perfect for Open Water divers and training dives\nExplore the deeper west pinnacle first\nNavigate to the middle pinnacle and check the arch on the north side\nLook under overhangs at the shallow pinnacle\nDon’t miss the famous clownfish with Sebae anemone\nNote: there is a stone circle around the clownfish - do not enter\nGreat for macro photography\nPractice buoyancy on the arch and rock formations\nNearby Buoyancy World is dedicated to buoyancy skills\nExcellent for marine awareness\nEasy navigation thanks to the three peaks	\N	2026-03-27 13:40:10.789117+00	2026-03-28 12:47:09.516174+00
e7da6615-99dc-4833-b7b1-3d20b31b1cd1	twins-pinnacle	en	images	text	/images/twins-header.png	\N	2026-03-27 16:24:21.72643+00	2026-03-28 12:47:09.516174+00
5f14a07d-ba97-448d-8938-66094c490283	twins-pinnacle	nl	overview	text	Twins Pinnacle is de populairste duiksite van Koh Tao, met drie granieten pinnacles, rijk onderwaterleven en geschikt voor alle brevetniveaus.	\N	2026-03-27 13:40:10.789117+00	2026-03-28 12:47:09.516174+00
94d8fc06-e13e-4b8e-95bf-2f9a1d5df7d9	twins-pinnacle	nl	quick_facts_depth	text	6-18m	\N	2026-03-27 13:40:10.789117+00	2026-03-28 12:47:09.516174+00
3ed7303f-fad2-422c-a6e1-c28de2607589	twins-pinnacle	nl	quick_facts_difficulty	text	Beginner tot Gemiddeld	\N	2026-03-27 13:40:10.789117+00	2026-03-28 12:47:09.516174+00
f632c8f3-0e25-451b-9bbe-e7068f3a9499	twins-pinnacle	nl	quick_facts_location	text	Westkust van Koh Nang Yuan	\N	2026-03-27 13:40:10.789117+00	2026-03-28 12:47:09.516174+00
cfbb244a-9308-48d1-af1c-d1ff0baaa07a	twins-pinnacle	nl	marine_life_highlights	text	Drie granieten pinnacles\nBogen en rotsformaties\nRijk onderwaterleven\nPerfect voor training\nRustige omstandigheden\nAnemonen met clownfish	\N	2026-03-27 13:40:10.789117+00	2026-03-28 12:47:09.516174+00
f8af0163-509c-404e-b8b3-5e8bb49d3edc	twins-pinnacle	nl	diving_tips	text	Perfect voor Open Water en trainingsduiken\nVerken eerst de diepere westelijke pinnacle\nNavigeer naar de middelste pinnacle en bekijk de boog aan de noordkant\nKijk onder overhangen bij de ondiepe pinnacle\nMis de beroemde clownfish met Sebae-anemoon niet\nLet op: er is een steencirkel rond de clownfish - niet binnengaan\nGeweldig voor macrofotografie\nOefen drijfvermogen bij de bogen en rotsformaties\nBuoyancy World in de buurt is gewijd aan drijfvermogen\nUitstekend voor mariene bewustwording\nEenvoudige navigatie dankzij drie pieken	\N	2026-03-27 13:40:10.789117+00	2026-03-28 12:47:09.516174+00
f87c9b89-d803-4d26-b068-cfc84846d370	divemaster	en	course_overview	text	The Divemaster program develops your dive leadership skills including supervising dive activities, assisting instructors, and guiding certified divers.	contact@prodiving.asia	2026-03-10 05:43:53.838953+00	2026-03-28 20:49:15.98589+00
cabd7877-cdbd-4088-bea2-def3aa10605d	divemaster	en	price_thb	text	41000	contact@prodiving.asia	2026-03-10 05:43:53.838953+00	2026-03-28 20:49:15.98589+00
0a61f5b1-09d6-45b3-b51c-7a8c8aca35b6	chumphon-pinnacle	nl	images	text	/images/chumphon-pinnacle-top.webp\n/images/photo-1682686580849-3e7f67df4015.avif\n/images/photo-1613853250147-2f73e55c1561.avif\n/images/photo-1618865181016-a80ad83a06d3.avif\n/images/photo-1647825194145-2d94e259c745.avif\n/images/photo-1659518893171-b15e20a8e201.avif\n/images/photo-1682687982423-295485af248a.avif	\N	2026-03-27 17:57:19.248922+00	2026-03-28 12:47:09.516174+00
9800892c-118f-4888-97a1-b4947620383c	accommodation	nl	heroSubtitle	text	Kies uit gezellige kamers, familiekamers en bungalows op toplocaties vlak bij onze duikactiviteiten. 	\N	2026-03-27 11:51:48.105016+00	2026-03-28 20:56:02.462461+00
14d504a9-7cbb-4d8f-8025-ae9fe844bf3f	accommodation	nl	nights	text	Aantal nachten	\N	2026-03-27 11:51:48.105016+00	2026-03-28 20:56:02.462461+00
da0016d2-ec22-4c04-a85a-2502b38ff331	accommodation	nl	people	text	Aantal personen	\N	2026-03-27 11:51:48.105016+00	2026-03-28 20:56:02.462461+00
745501d3-b37c-4845-ae8b-80d91c1adeef	chumphon-pinnacle	nl	overview	text	Chumphon Pinnacle is een van de meest spectaculaire diepduiklocaties van Koh Tao, op ongeveer 30 minuten varen uit de kust. Deze granieten rotstop rijst steil op vanaf de oceaanbodem en vormt een natuurlijke schoonmaakplek voor grote zeedieren. De locatie staat vooral bekend om de betrouwbare walvishaaiwaarnemingen — deze zachte reuzen cruisen hier regelmatig door de diepte. Indrukwekkende scholen giant trevally en chevron-barracuda zorgen voor spectaculaire taferelen, terwijl adelaarsroggen en andere pelagische soorten extra dynamiek toevoegen. De structuur van de pinnacle biedt fraaie doorgangen en geweldige mogelijkheden voor onderwaterfotografie.	\N	2026-03-27 13:40:10.789117+00	2026-03-28 21:03:37.497664+00
116277c4-f5bf-42c7-b786-be802c0dacb9	twins-pinnacle	en	overview	text	Twins Pinnacle is the most popular dive site on Koh Tao, featuring three granite pinnacles, abundant marine life, and suitable for all certification levels.	\N	2026-03-27 13:40:10.789117+00	2026-03-31 18:15:13.733654+00
f5624147-60b6-442e-ba52-f88bad24b63b	divemaster	en	duration	text	2-4 weeks	contact@prodiving.asia	2026-03-10 05:43:53.838953+00	2026-03-28 20:49:15.98589+00
4e8e0ddd-5c94-4c59-965c-bde1fa32c3b0	divemaster	en	price_eur	text	1090	contact@prodiving.asia	2026-03-10 05:43:53.838953+00	2026-03-28 20:49:15.98589+00
555f3d22-4341-4e10-8f41-f71dc43ae789	divemaster	en	price_usd	text	1190	contact@prodiving.asia	2026-03-10 05:43:53.838953+00	2026-03-28 20:49:15.98589+00
7b61d68b-4c07-4269-9851-40a4e9e21af4	south-west-pinnacle	nl	overview	text	South West Pinnacle is een diepe offshore duiklocatie met meerdere granieten pinnacles en rotsblokken die vanaf de bodem omhoogkomen. De site ligt op 30-40 minuten varen van Koh Tao en staat bekend om spannende blue-water-ontmoetingen en sterke kans op pelagische soorten. Je ziet hier vaak scholen barracuda, trevally en makreel, met af en toe walvishaaien en brydevinvissen. Door de diepte en mogelijke stroming is dit een uitdagende maar zeer belonende duik voor ervaren duikers.	\N	2026-03-27 13:40:10.789117+00	2026-03-28 12:47:09.516174+00
c41b67cd-8ada-47d1-b4ee-588f47cdc9b8	south-west-pinnacle	nl	quick_facts_depth	text	15-35m	\N	2026-03-27 13:40:10.789117+00	2026-03-28 12:47:09.516174+00
730598af-6e58-4030-bab5-d3b070b4bff5	south-west-pinnacle	nl	quick_facts_difficulty	text	Gevorderd	\N	2026-03-27 13:40:10.789117+00	2026-03-28 12:47:09.516174+00
ea85596c-2727-4ec7-8027-f993f4e34b68	south-west-pinnacle	nl	quick_facts_location	text	30-40 minuten offshore	\N	2026-03-27 13:40:10.789117+00	2026-03-28 12:47:09.516174+00
2bc68c8c-4368-45e7-a1c9-0d1b28204509	south-west-pinnacle	nl	quick_facts_best_time	text	Hele jaar, beste periode bij kalme zee	\N	2026-03-27 13:40:10.789117+00	2026-03-28 12:47:09.516174+00
c40a94e4-fdbf-44c0-8e1d-3669b754237e	south-west-pinnacle	nl	what_you_can_see	text	Walvishaaien\nBrydevinvissen\nReuzenbarracuda\nKoningsmakreel	\N	2026-03-27 13:40:10.789117+00	2026-03-28 12:47:09.516174+00
375e7a75-c7fe-45ac-aab0-c52dadb7f920	south-west-pinnacle	nl	marine_life_highlights	text	Af en toe ontmoetingen met walvishaaien\nBrydevinvissen in gunstige seizoensperiodes\nGrote scholen barracuda en makreel\nTrevally, rifvissen en jagende pelagische soorten bij stromingslijnen	\N	2026-03-27 13:40:10.789117+00	2026-03-28 12:47:09.516174+00
22ebb9c4-4611-4ede-83da-425c12f37551	south-west-pinnacle	nl	diving_tips	text	Geschikt voor gevorderde duikers met ervaring in diepe en driftduiken\nGebruik een SMB en blijf tijdens de opstijging bij de groep\nPlan je gasvoorraad zorgvuldig door diepte en stroming\nLuister goed naar de briefing omdat entry en pickup per dag verschillen	\N	2026-03-27 13:40:10.789117+00	2026-03-28 12:47:09.516174+00
3c368335-cb4a-44ce-8648-74a35c8fbae2	south-west-pinnacle	nl	images	text	/images/photo-1682686580849-3e7f67df4015.avif	\N	2026-03-27 16:24:21.72643+00	2026-03-28 12:47:09.516174+00
21aed9fa-6882-45ab-8059-f8e3f4be57c2	divemaster	nl	hero_subtitle	text	Begin je professionele duikcarriere. Leer leiderschaps-, supervisie- en duikbeheervaardigheden.	contact@prodiving.asia	2026-03-12 15:13:41.90407+00	2026-03-28 13:24:35.370944+00
24645d8d-3b4d-4d87-98f6-778057b5f596	divemaster	nl	course_overview	text	Het Divemaster-programma ontwikkelt je duikleiderschapsvaardigheden, waaronder het superviseren van duikactiviteiten, assisteren van instructeurs en begeleiden van gecertificeerde duikers.	contact@prodiving.asia	2026-03-12 15:13:41.90407+00	2026-03-28 13:24:35.370944+00
c96c03e1-2a06-4451-8e56-7f8d74d72987	divemaster	nl	price_eur	text	1090	contact@prodiving.asia	2026-03-12 15:13:41.90407+00	2026-03-28 13:24:35.370944+00
2ea1e023-7cd3-41d9-989d-6e51f9e332b2	divemaster	nl	duration	text	2-4 weken	contact@prodiving.asia	2026-03-12 15:13:41.90407+00	2026-03-28 13:24:35.370944+00
d450af69-146a-42ad-bb75-d1ad764a9f23	how-to-get-here	nl	options_list	text	Met de ferry:|Koh Tao is alleen per boot bereikbaar. Ferries vertrekken vanaf Chumphon, Surat Thani, Koh Samui en Koh Phangan. Bekende aanbieders zijn Lomprayah, Songserm en Seatran.\nMet de trein:|Reis met de trein van Bangkok naar Chumphon en stap daar over op de ferry.\nMet de bus:|Bussen vanuit Bangkok en andere steden sluiten aan op ferryterminals in Chumphon en Surat Thani.\nMet het vliegtuig:|Vlieg naar Koh Samui, Chumphon of Surat Thani en neem daarna de ferry naar Koh Tao.	\N	2026-03-28 13:42:12.192138+00	2026-03-28 13:42:12.192138+00
fe2a0fbb-3f46-4249-a9da-427a9508c7bd	how-to-get-here	nl	cta_book_stay	text	Boek verblijf	\N	2026-03-28 13:42:12.192138+00	2026-03-28 13:42:12.192138+00
c8e7892a-7a6a-4342-9e2e-ff9562a8ca16	how-to-get-here	nl	cta_visa_info	text	Visuminformatie	\N	2026-03-28 13:42:12.192138+00	2026-03-28 13:42:12.192138+00
171ddd3f-1315-4779-baf3-0dbeafee0be8	how-to-get-here	nl	tip	text	Tip: boek ferrytickets in het hoogseizoen op tijd. De meeste ferries komen aan bij Mae Haad Pier.	\N	2026-03-28 13:42:12.192138+00	2026-03-28 13:42:12.192138+00
b5dee780-3880-40ce-b4b1-6a356a325407	how-to-get-here	nl	ferry_title	text	Ferry-opties	\N	2026-03-28 13:42:12.192138+00	2026-03-28 13:42:12.192138+00
ad4ae1df-3c85-4a0a-ac06-f886d1a246a7	how-to-get-here	nl	ferry_options_list	text	Speedboot:|1-1,5 uur, duurder maar sneller\nNachtferry:|Goedkopere optie, aankomst in de ochtend\nDagferry:|Standaardoptie met mooie uitzichten\n|Bekijk websites van operators voor schema's en kortingen	\N	2026-03-28 13:42:12.192138+00	2026-03-28 13:42:12.192138+00
9befb7d0-c888-4073-8e2a-e9d0dd7a5ceb	weather-koh-tao	en	title	text	Weather on Koh Tao	\N	2026-03-28 13:46:34.702478+00	2026-03-28 13:46:34.702478+00
d4b2ec3c-f424-4def-a268-3a82d7a84c04	weather-koh-tao	en	subtitle	text	Plan your trip with insight into Koh Tao's tropical climate.	\N	2026-03-28 13:46:34.702478+00	2026-03-28 13:46:34.702478+00
0f4e9385-d80a-4257-b493-6ba054705979	weather-koh-tao	en	climate_title	text	Climate & seasons	\N	2026-03-28 13:46:34.702478+00	2026-03-28 13:46:34.702478+00
3c2d4428-6df1-4321-a0b7-0b480cde42da	weather-koh-tao	en	climate_list	text	Dry season: February to October, warm and sunny\nRainy season: November to January, short but heavy showers\nAverage temperature: 28-32C\nSea temperature: 27-30C	\N	2026-03-28 13:46:34.702478+00	2026-03-28 13:46:34.702478+00
69dcd32f-4a6e-4e36-942e-4098a721b000	accommodation	nl	roomsTitle	text	Onze kamers	\N	2026-03-27 11:51:48.105016+00	2026-03-28 20:56:02.462461+00
7f16478e-1d7f-4576-b242-dd093ddebda5	accommodation	nl	viewPictures	text	Bekijk foto's	\N	2026-03-27 11:51:48.105016+00	2026-03-28 20:56:02.462461+00
6c28b269-8d4b-4796-9505-4f982bef8d88	accommodation	nl	viewRooms	text	Bekijk kamers	\N	2026-03-27 11:51:48.105016+00	2026-03-28 20:56:02.462461+00
8fa3f2b7-ab20-42fc-a09c-51b6404e7652	accommodation	nl	whyStayBody	text	Je verblijft dicht bij het duikcentrum, boten en restaurants. Dat betekent minder reistijd en meer tijd om van Koh Tao te genieten.	\N	2026-03-27 11:51:48.105016+00	2026-03-28 20:56:02.462461+00
3d9dfe06-aa39-4b0c-8ac2-947af6c96793	accommodation	nl	whyStayTitle	text	Waarom bij ons verblijven?	\N	2026-03-27 11:51:48.105016+00	2026-03-28 20:56:02.462461+00
4a2e8eae-3fc4-4e43-afe3-c4e28c3d1bdc	south-west-pinnacle	en	quick_facts_depth	text	15-35m	\N	2026-03-27 13:40:10.789117+00	2026-03-31 17:55:41.76794+00
452b313c-c429-473d-9064-ab384798fea3	south-west-pinnacle	en	quick_facts_difficulty	text	Advanced	\N	2026-03-27 13:40:10.789117+00	2026-03-31 17:55:41.76794+00
09c24450-93be-4c8e-9ffb-f721e9e285ea	south-west-pinnacle	en	quick_facts_location	text	30-40 minutes offshore	\N	2026-03-27 13:40:10.789117+00	2026-03-31 17:55:41.76794+00
aa5d85fe-21c6-4664-a82e-acf9d12ee991	weather-koh-tao	en	paragraph	text	Most activities are possible year-round, but check the forecast before planning a boat trip. The dry season usually offers the best diving conditions with calm seas and good visibility.	\N	2026-03-28 13:46:34.702478+00	2026-03-28 13:46:34.702478+00
19b36262-d720-41a4-9b62-0e498297f534	weather-koh-tao	en	cta_plan_activities	text	Plan activities	\N	2026-03-28 13:46:34.702478+00	2026-03-28 13:46:34.702478+00
e0d983aa-1b10-4dfa-aafe-846753006bb0	weather-koh-tao	en	cta_go_diving	text	Go diving	\N	2026-03-28 13:46:34.702478+00	2026-03-28 13:46:34.702478+00
b6b7e1f0-729d-461a-a09d-e86bdb1e5c46	weather-koh-tao	en	packing_title	text	What to pack	\N	2026-03-28 13:46:34.702478+00	2026-03-28 13:46:34.702478+00
a2b74745-8c75-4096-bc64-d18cf1b407ad	weather-koh-tao	en	packing_list	text	High-SPF reef-safe sunscreen\nLightweight, breathable clothing\nRain jacket or poncho (for rainy season)\nWaterproof bag for electronics\nCap/hat and sunglasses\nQuick-dry clothing for water activities	\N	2026-03-28 13:46:34.702478+00	2026-03-28 13:46:34.702478+00
b6e0e5c1-5977-4b76-afa9-99626df66af3	weather-koh-tao	nl	title	text	Weer op Koh Tao	\N	2026-03-28 13:46:34.702478+00	2026-03-28 13:46:34.702478+00
2058021d-f7fb-4bae-a309-27b4fa50c527	weather-koh-tao	nl	subtitle	text	Plan je reis met inzicht in het tropische klimaat van Koh Tao.	\N	2026-03-28 13:46:34.702478+00	2026-03-28 13:46:34.702478+00
b856a051-1b2c-43d2-adf9-bc0544b8cec3	weather-koh-tao	nl	climate_title	text	Klimaat & seizoenen	\N	2026-03-28 13:46:34.702478+00	2026-03-28 13:46:34.702478+00
846ecbd2-9f9c-4a1f-b6d9-cade8a2e3d48	weather-koh-tao	nl	climate_list	text	Droog seizoen: februari t/m oktober, warm en zonnig\nRegenseizoen: november t/m januari, korte maar hevige buien\nGemiddelde temperatuur: 28-32C\nZeetemperatuur: 27-30C	\N	2026-03-28 13:46:34.702478+00	2026-03-28 13:46:34.702478+00
1bcc5c9d-2c41-43d5-8d4d-c9622f86d451	weather-koh-tao	nl	paragraph	text	De meeste activiteiten zijn het hele jaar mogelijk, maar controleer de voorspelling voordat je een boottrip plant. Het droge seizoen biedt meestal de beste duikomstandigheden met kalme zee en goed zicht.	\N	2026-03-28 13:46:34.702478+00	2026-03-28 13:46:34.702478+00
6113f2de-430d-4ab8-ad5c-bf2d5d49daaa	weather-koh-tao	nl	cta_plan_activities	text	Plan activiteiten	\N	2026-03-28 13:46:34.702478+00	2026-03-28 13:46:34.702478+00
d4e92f41-f926-4827-b376-db91f8a7667b	weather-koh-tao	nl	cta_go_diving	text	Ga duiken	\N	2026-03-28 13:46:34.702478+00	2026-03-28 13:46:34.702478+00
9aa883ee-7f95-467d-903e-dd6d229f986a	weather-koh-tao	nl	packing_title	text	Wat neem je mee	\N	2026-03-28 13:46:34.702478+00	2026-03-28 13:46:34.702478+00
6e0eb155-5cc0-4927-80ab-b5a5be1ce4d7	weather-koh-tao	nl	packing_list	text	Zonnebrand met hoge SPF (reef-safe)\nLichte, ademende kleding\nRegenjas of poncho (voor het regenseizoen)\nWaterdichte tas voor elektronica\nPet/hoed en zonnebril\nSneldrogende kleding voor wateractiviteiten	\N	2026-03-28 13:46:34.702478+00	2026-03-28 13:46:34.702478+00
d3a1bb6c-e30d-4f45-b7ed-31abfe66b499	viewpoints-koh-tao	en	points_list	text	John-Suwan Viewpoint:|Panoramic views over Chalok Baan Kao and Shark Bay.\nFraggle Rock:|Views over Sairee Beach and the west coast.\nLove Koh Tao Viewpoint:|Perfect for sunrise and photos.\nMango Viewpoint:|Wide views over the north of the island.	\N	2026-03-28 13:42:12.192138+00	2026-03-28 13:46:35.031208+00
52232a8d-29c2-40ee-8208-a331c1dd3158	viewpoints-koh-tao	en	subtitle	text	Breathtaking panoramas and unforgettable photo moments.	\N	2026-03-28 13:42:12.192138+00	2026-03-28 13:46:35.031208+00
3b37baaf-46e3-4dcd-a0dd-0636305c761c	viewpoints-koh-tao	en	title	text	Viewpoints on Koh Tao	\N	2026-03-28 13:42:12.192138+00	2026-03-28 13:46:35.031208+00
85bc7d99-a6e9-4ba0-af3d-8db244391d8a	accommodation	nl	chooseBookingBody	text	Kies Book Our Accommodation om hieronder je kamergegevens in te vullen.	\N	2026-03-27 11:51:48.105016+00	2026-03-28 20:56:02.462461+00
008b6201-325c-4da0-847b-a71cbd8dd58e	accommodation	nl	ctaButton	text	Stay with us at our resort accommodation	\N	2026-03-27 11:51:48.105016+00	2026-03-28 20:56:02.462461+00
32af5303-2af5-4fd2-9398-4bfe79c3c719	accommodation	nl	ctaTitle	text	Klaar om je verblijf te plannen?	\N	2026-03-27 11:51:48.105016+00	2026-03-28 20:56:02.462461+00
8ce95934-46b8-4338-ab39-3b76c511cfbc	accommodation	nl	details	text	Extra details	\N	2026-03-27 11:51:48.105016+00	2026-03-28 20:56:02.462461+00
1d70ebab-c491-49e3-a73f-487e3cf4a9b4	accommodation	nl	featuresTitle	text	Wat je kunt verwachten	\N	2026-03-27 11:51:48.105016+00	2026-03-28 20:56:02.462461+00
f58317ff-cc0e-4032-95f3-67d48d2a1489	accommodation	nl	pricingNote	text	Prijzen variëren per seizoen. Neem contact op voor actuele beschikbaarheid en tarieven.	\N	2026-03-27 11:51:48.105016+00	2026-03-28 20:56:02.462461+00
85d02c38-faf0-49e6-a55b-69dbc0d8d5a0	accommodation	nl	roomsIntro	text	Of je nu een budgetvriendelijke kamer zoekt of een ruimere familiekamer, we helpen je graag met de beste match voor jouw reis.	\N	2026-03-27 11:51:48.105016+00	2026-03-28 20:56:02.462461+00
21ba486c-cec8-42c3-9ce5-72d2f97845a0	viewpoints-koh-tao	nl	cta_hiking_activities	text	Wandelen & activiteiten	\N	2026-03-28 13:42:12.192138+00	2026-03-28 13:50:12.131579+00
3567488c-df47-48eb-bc40-575f24c89ec5	viewpoints-koh-tao	nl	hiking_tips_list	text	Begin vroeg voor zonsopkomst en koelere temperaturen\nDraag stevige schoenen en neem voldoende water mee\nPaden kunnen steil en glad zijn na regen\nBeste licht voor fotografie: vroeg in de ochtend en bij zonsondergang	\N	2026-03-28 13:42:12.192138+00	2026-03-28 13:50:12.131579+00
bf289a74-05fe-42dc-a192-a9ba5b60810a	viewpoints-koh-tao	nl	hiking_tips_title	text	Wandeltips	\N	2026-03-28 13:42:12.192138+00	2026-03-28 13:50:12.131579+00
b0a96aa6-ea47-47fd-926d-6bfcbd8a5d25	viewpoints-koh-tao	nl	note	text	Voor de meeste uitzichtpunten is een korte wandeling nodig. Neem water, zonbescherming en een camera mee!	\N	2026-03-28 13:42:12.192138+00	2026-03-28 13:50:12.131579+00
c2348108-e889-4ba0-8696-6ac79d9424e7	viewpoints-koh-tao	nl	points_list	text	John-Suwan Viewpoint:|Panoramisch uitzicht over Chalok Baan Kao en Shark Bay.\nFraggle Rock:|Uitzicht over Sairee Beach en de westkust.\nLove Koh Tao Viewpoint:|Perfect voor zonsopkomst en foto's.\nMango Viewpoint:|Weids uitzicht over het noorden van het eiland.	\N	2026-03-28 13:42:12.192138+00	2026-03-28 13:50:12.131579+00
e4e69f03-9043-442d-82df-3aaf24c2788b	viewpoints-koh-tao	nl	section_title	text	Uitzichtpunten op het eiland	\N	2026-03-28 13:42:12.192138+00	2026-03-28 13:50:12.131579+00
0baac768-6adf-44d8-98d3-7ea22ba34f14	viewpoints-koh-tao	nl	subtitle	text	Adembenemende panorama's en onvergetelijke fotomomenten.	\N	2026-03-28 13:42:12.192138+00	2026-03-28 13:50:12.131579+00
e9b9c088-c163-4463-a091-26539c94e37a	koh-tao-dive-sites	en	hero_title	text	Dive sites around Koh Tao	seed-script	2026-03-28 14:03:22.715903+00	2026-03-28 14:03:22.715903+00
d1353d29-da46-437a-b104-ba36920d23cb	koh-tao-dive-sites	en	hero_text	text	Discover more than 25 incredible dive sites around Koh Tao, from shallow coral reefs to deep ocean pinnacles. Every site offers unique underwater experiences and rich marine life.	seed-script	2026-03-28 14:03:22.715903+00	2026-03-28 14:03:22.715903+00
0835cb2c-63bd-4f80-b52b-169fb7003bac	koh-tao-dive-sites	en	book_dive	text	Book your dive	seed-script	2026-03-28 14:03:22.715903+00	2026-03-28 14:03:22.715903+00
3e689698-1cc4-4a4d-9875-865d58675eea	koh-tao-dive-sites	en	overview_title	text	Best dive sites around Koh Tao	seed-script	2026-03-28 14:03:22.715903+00	2026-03-28 14:03:22.715903+00
126230c8-bafa-4ea5-98a6-45a49cd2b443	koh-tao-dive-sites	en	overview_text	text	Koh Tao has over 25 excellent dive sites with varied topography and abundant marine life. Each site is unique and offers something different for every diver level, with enough variety to keep experienced divers engaged for weeks.	seed-script	2026-03-28 14:03:22.715903+00	2026-03-28 14:03:22.715903+00
48d334d3-c1b7-4a27-9c1f-d880e16bb4ed	koh-tao-dive-sites	en	stat1_title	text	25+ sites	seed-script	2026-03-28 14:03:22.715903+00	2026-03-28 14:03:22.715903+00
cc5d2f5f-0bf3-4d8d-9ad4-3a0efa8a298b	koh-tao-dive-sites	en	stat1_text	text	From shallow bays to deep pinnacles	seed-script	2026-03-28 14:03:22.715903+00	2026-03-28 14:03:22.715903+00
8b1aeffc-f53e-4697-b022-3abc79c8edfa	koh-tao-dive-sites	en	stat2_title	text	Diverse marine life	seed-script	2026-03-28 14:03:22.715903+00	2026-03-28 14:03:22.715903+00
5fd89c2f-db78-432a-be5a-8801ca525a91	koh-tao-dive-sites	en	stat2_text	text	Whale sharks, rays, and coral reefs	seed-script	2026-03-28 14:03:22.715903+00	2026-03-28 14:03:22.715903+00
346fdbaa-038c-418d-80e4-a1a33b7cbc0e	koh-tao-dive-sites	en	stat3_title	text	Artificial reefs	seed-script	2026-03-28 14:03:22.715903+00	2026-03-28 14:03:22.715903+00
6e7f5bb8-4d0a-44ae-9972-7cae42933858	koh-tao-dive-sites	en	stat3_text	text	Wrecks and structures for unique dives	seed-script	2026-03-28 14:03:22.715903+00	2026-03-28 14:03:22.715903+00
2ce26c2a-582e-4387-b8c1-f2adaa0d44be	koh-tao-dive-sites	en	stat4_title	text	All levels	seed-script	2026-03-28 14:03:22.715903+00	2026-03-28 14:03:22.715903+00
1e7c0276-b89a-49ab-8d4f-42bb9f24fa26	koh-tao-dive-sites	en	stat4_text	text	Sites for beginners through advanced divers	seed-script	2026-03-28 14:03:22.715903+00	2026-03-28 14:03:22.715903+00
0d6a2fb6-b841-4b57-86b8-3e1c9b59915f	koh-tao-dive-sites	en	deep_title	text	Deep dive sites for advanced divers	seed-script	2026-03-28 14:03:22.715903+00	2026-03-28 14:03:22.715903+00
d69749ba-abb3-440e-a5fa-1e2347970181	koh-tao-dive-sites	en	deep_sites	text	Sail Rock|/dive-sites/sail-rock|Koh Tao's flagship deep dive site with huge fish schools, whale sharks, and giant barracuda.|18-40m|Whale sharks,Giant barracuda,Malabar grouper,Sailfish|Gevorderd|40 minutes offshore\nChumphon Pinnacle|/dive-sites/chumphon-pinnacle|Granite pinnacle with excellent whale shark sightings and large schools of trevally.|15-30m|Whale sharks,Trevally schools,Eagle rays,Chevron barracuda|Gevorderd|30 minutes offshore\nSouth West Pinnacle|/dive-sites/south-west-pinnacle|Deep pinnacle known for whale sharks, Bryde's whales, and large pelagic fish.|15-35m|Whale sharks,Bryde's whales,Giant barracuda,Spanish mackerel|Gevorderd|30-40 minutes offshore	seed-script	2026-03-28 14:03:22.715903+00	2026-03-28 14:03:22.715903+00
07c7d16f-6ac1-476b-949a-8392ace1b52f	koh-tao-dive-sites	en	coral_title	text	Beautiful coral reef sites	seed-script	2026-03-28 14:03:22.715903+00	2026-03-28 14:03:22.715903+00
d84b1f22-527f-4002-8816-25f2e8e11473	koh-tao-dive-sites	en	coral_sites	text	Japanese Gardens||Varied coral reefs with colorful marine life and swim-throughs.|12-25m|Pink-tailed triggerfish,Ocellated eagle ray,Colorful coral,Marbled octopus|Gemiddeld|Near Koh Nang Yuan\nShark Island||Beautiful purple soft corals and gorgonians with abundant marine life.|8-20m|Sea fans,Whip corals,Blacktip reef sharks,Tropical fish|Beginner-Gemiddeld|South coast\nMango Bay||Shallow coral reefs ideal for relaxed diving with a healthy ecosystem.|5-18m|Colorful coral,Reef fish,Sea anemones|Beginner|Bay on west coast	seed-script	2026-03-28 14:03:22.715903+00	2026-03-28 14:03:22.715903+00
247be6a7-e9b3-4871-8acf-e44c9cbe6ecd	koh-tao-dive-sites	en	artificial_title	text	Artificial dive sites	seed-script	2026-03-28 14:03:22.715903+00	2026-03-28 14:03:22.715903+00
298bf7c2-2994-4400-a9a1-94696c180461	koh-tao-dive-sites	en	artificial_sites	text	HTMS Sattakut||Former WWII US Navy ship donated by the Thai Navy, now a thriving artificial reef.|18-30m|Wreck exploration,Marine life,Swim-throughs,Historic value|Gevorderd|Between the islands\nJunkyard Reef||Artificial steel structures with healthy coral growth and diverse marine life.|8-15m|Artificial structures,Healthy coral,Diverse fish species,Conservation project|Beginner-Gemiddeld|West coast\nBuoyancy World||Concrete blocks and pipes that create new ecosystems for marine life.|5-12m|Concrete structures,New coral growth,Small marine life,Educational|Beginner|Aow Leuk	seed-script	2026-03-28 14:03:22.715903+00	2026-03-28 14:03:22.715903+00
79ac74ab-b0d3-4d84-8703-0e9987fd3e81	koh-tao-dive-sites	en	shallow_title	text	Shallow dive sites for beginners	seed-script	2026-03-28 14:03:22.715903+00	2026-03-28 14:03:22.715903+00
5f4be3ea-a4b1-4005-8988-356e3e595947	chumphon-pinnacle	nl	quick_facts_depth	text	15-30m	\N	2026-03-27 13:40:10.789117+00	2026-03-28 21:03:37.497664+00
45b15d15-a0c5-40d7-b4af-cec1d81009c0	chumphon-pinnacle	nl	quick_facts_difficulty	text	Gevorderd	\N	2026-03-27 13:40:10.789117+00	2026-03-28 21:03:37.497664+00
aa57fcc8-2d91-4c4f-a881-7064f3879c46	koh-tao-dive-sites	en	shallow_sites	text	Aow Leuk||Shallow bay with coral gardens and easy diving conditions.|3-10m|Coral gardens,Tropical fish,Easy entry,Training site|Beginner|West coast\nHin Ngam||Shallow reef with artificial structures and abundant marine life.|5-12m|Artificial reefs,Colorful fish,Safe diving,Photography|Beginner|West coast\nTanote Bay||East-coast dive site with macro opportunities and colorful reef life.|8-15m|Frogfish,Pipefish,Macro photography,Colorful reef|Gemiddeld|East coast	seed-script	2026-03-28 14:03:22.715903+00	2026-03-28 14:03:22.715903+00
b93af4e4-9dd7-4ee3-9293-9be8c83ef0d8	koh-tao-dive-sites	en	depth_label	text	Depth	seed-script	2026-03-28 14:03:22.715903+00	2026-03-28 14:03:22.715903+00
6234d0db-2829-43c6-b996-76a6104df04c	koh-tao-dive-sites	en	booking_title	text	Discover Koh Tao’s underwater world	seed-script	2026-03-28 14:03:22.715903+00	2026-03-28 14:03:22.715903+00
4b8471b5-ef77-4b1e-9963-e552778f6045	koh-tao-dive-sites	en	booking_text	text	Ready to explore Koh Tao’s amazing dive sites? Our experienced guides take you to the best spots for your level and interests.	seed-script	2026-03-28 14:03:22.715903+00	2026-03-28 14:03:22.715903+00
d3695084-a269-49e7-80c4-dfb76f76d2c1	koh-tao-dive-sites	nl	hero_title	text	Duiklocaties op Koh Tao	seed-script	2026-03-28 14:03:22.715903+00	2026-03-28 14:03:22.715903+00
71c1563a-6e37-4705-90f2-5c137a95dca4	koh-tao-dive-sites	nl	hero_text	text	Ontdek meer dan 25 geweldige duiklocaties rond Koh Tao, van ondiepe koraalriffen tot diepe oceaanpinnacles. Elke plek biedt unieke onderwaterervaringen en rijk zeeleven.	seed-script	2026-03-28 14:03:22.715903+00	2026-03-28 14:03:22.715903+00
af7a152f-514f-4d32-921b-9a41c832f3f7	koh-tao-dive-sites	nl	book_dive	text	Boek je duik	seed-script	2026-03-28 14:03:22.715903+00	2026-03-28 14:03:22.715903+00
3dae53cb-2e03-4d6a-aa8a-b09cf08feae4	koh-tao-dive-sites	nl	overview_title	text	Beste duiklocaties op Koh Tao	seed-script	2026-03-28 14:03:22.715903+00	2026-03-28 14:03:22.715903+00
5bad5f86-7eda-44f6-954c-082bfe4ebb25	koh-tao-dive-sites	nl	overview_text	text	Koh Tao heeft meer dan 25 uitstekende duiklocaties met gevarieerde topografie en een overvloed aan zeeleven. Elke plek is uniek en biedt duikers van elk niveau iets anders, met genoeg variatie om ook ervaren duikers wekenlang te boeien.	seed-script	2026-03-28 14:03:22.715903+00	2026-03-28 14:03:22.715903+00
8a0811ad-0241-4fa8-9d66-a32107420cc1	koh-tao-dive-sites	nl	stat1_title	text	25+ locaties	seed-script	2026-03-28 14:03:22.715903+00	2026-03-28 14:03:22.715903+00
45832a6f-7cd1-4135-8e99-1dec3c689b10	koh-tao-dive-sites	nl	stat1_text	text	Van ondiepe baaien tot diepe pinnacles	seed-script	2026-03-28 14:03:22.715903+00	2026-03-28 14:03:22.715903+00
23b50263-f8e6-4dbe-bdd7-714e0d3bbf0b	koh-tao-dive-sites	nl	stat2_title	text	Divers zeeleven	seed-script	2026-03-28 14:03:22.715903+00	2026-03-28 14:03:22.715903+00
e1f4103f-ead0-411a-b8a0-d7df31a34c91	koh-tao-dive-sites	nl	stat2_text	text	Walvishaaien, roggen en koraalriffen	seed-script	2026-03-28 14:03:22.715903+00	2026-03-28 14:03:22.715903+00
44319f1d-0953-448b-9e5c-c43b4ad31cf3	koh-tao-dive-sites	nl	stat3_title	text	Kunstmatige riffen	seed-script	2026-03-28 14:03:22.715903+00	2026-03-28 14:03:22.715903+00
e943f7e0-6f7e-4053-8cff-817e5f95b641	koh-tao-dive-sites	nl	stat3_text	text	Wrakken en structuren voor unieke duiken	seed-script	2026-03-28 14:03:22.715903+00	2026-03-28 14:03:22.715903+00
23a312a6-51cd-429f-acd0-8e7d7f724682	koh-tao-dive-sites	nl	stat4_title	text	Alle niveaus	seed-script	2026-03-28 14:03:22.715903+00	2026-03-28 14:03:22.715903+00
cd6222b5-26d5-4a90-b2ec-29ec7646a05c	koh-tao-dive-sites	nl	stat4_text	text	Locaties voor beginners tot gevorderde duikers	seed-script	2026-03-28 14:03:22.715903+00	2026-03-28 14:03:22.715903+00
a5b2c8bc-188f-47e9-96ed-2350fa53f354	koh-tao-dive-sites	nl	deep_title	text	Diepe duiklocaties voor gevorderde duikers	seed-script	2026-03-28 14:03:22.715903+00	2026-03-28 14:03:22.715903+00
ee38a07a-357e-40dd-a794-4bee4061e175	koh-tao-dive-sites	nl	deep_sites	text	Sail Rock|/dive-sites/sail-rock|De belangrijkste diepe duiklocatie van Koh Tao met grote visscholen, walvishaaien en reuzenbarracuda.|18-40m|Walvishaaien,Reuzenbarracuda,Malabar grouper,Zeilvis|Gevorderd|40 minuten offshore\nChumphon Pinnacle|/dive-sites/chumphon-pinnacle|Granieten pinnacle met uitstekende kansen op walvishaaien en grote scholen trevally.|15-30m|Walvishaaien,Trevally-scholen,Adelaarsroggen,Chevron-barracuda|Gevorderd|30 minuten offshore\nSouth West Pinnacle|/dive-sites/south-west-pinnacle|Diepe pinnacle, bekend om walvishaaien, brydevinvissen en grote pelagische vis.|15-35m|Walvishaaien,Brydevinvissen,Reuzenbarracuda,Koningsmakreel|Gevorderd|30-40 minuten offshore	seed-script	2026-03-28 14:03:22.715903+00	2026-03-28 14:03:22.715903+00
cceed104-79bb-48a2-899f-977658267cd7	koh-tao-dive-sites	nl	coral_title	text	Prachtige koraalrif-locaties	seed-script	2026-03-28 14:03:22.715903+00	2026-03-28 14:03:22.715903+00
ecd0dfd5-d490-4f2c-bc59-488af9753909	koh-tao-dive-sites	nl	coral_sites	text	Japanese Gardens||Gevarieerde koraalriffen met kleurrijk zeeleven en swim-throughs.|12-25m|Pink-tailed triggerfish,Ocellated adelaarsrog,Kleurrijk koraal,Gemarmerde octopus|Gemiddeld|Bij Koh Nang Yuan\nShark Island||Prachtige paarse boomkoralen en gorgonen met veel zeeleven.|8-20m|Zeewaaiers,Zweepkoralen,Zwartpuntrifhaaien,Tropische vissen|Beginner-Gemiddeld|Zuidkust\nMango Bay||Ondiepe koraalriffen, ideaal voor ontspannen duiken met een gezond ecosysteem.|5-18m|Kleurrijk koraal,Rifvissen,Zeeanemonen|Beginner|Baai aan westkust	seed-script	2026-03-28 14:03:22.715903+00	2026-03-28 14:03:22.715903+00
625d33d7-7fe5-4111-b257-bd87fc3b4e98	koh-tao-dive-sites	nl	artificial_title	text	Kunstmatige duiklocaties	seed-script	2026-03-28 14:03:22.715903+00	2026-03-28 14:03:22.715903+00
9f560327-0d21-407d-bd69-6af29ce3ff49	koh-tao-dive-sites	nl	artificial_sites	text	HTMS Sattakut||Voormalig Amerikaans marineschip uit WOII, geschonken door de Thaise marine en nu een bloeiend kunstmatig rif.|18-30m|Wrakverkenning,Marien leven,Swim-throughs,Historische waarde|Gevorderd|Tussen de eilanden\nJunkyard Reef||Kunstmatige stalen structuren met gezond koraal en divers zeeleven.|8-15m|Kunstmatige structuren,Gezond koraal,Diverse vissoorten,Natuurproject|Beginner-Gemiddeld|Westkust\nBuoyancy World||Betonblokken en buizen die nieuwe ecosystemen voor zeeleven vormen.|5-12m|Betonstructuren,Nieuwe koraalgroei,Klein zeeleven,Educatief|Beginner|Aow Leuk	seed-script	2026-03-28 14:03:22.715903+00	2026-03-28 14:03:22.715903+00
d4cd6728-9ce3-4c47-8af9-67e7f0ed8278	koh-tao-dive-sites	nl	shallow_title	text	Ondiepe duiklocaties voor beginners	seed-script	2026-03-28 14:03:22.715903+00	2026-03-28 14:03:22.715903+00
d94f0ccf-483e-4952-8a55-bc5ed9d5d35f	koh-tao-dive-sites	nl	shallow_sites	text	Aow Leuk||Ondiepe baai met koraaltuinen en makkelijke duikomstandigheden.|3-10m|Koraaltuinen,Tropische vissen,Makkelijke toegang,Trainingslocatie|Beginner|Westkust\nHin Ngam||Ondiep rif met kunstmatige structuren en veel zeeleven.|5-12m|Kunstmatige riffen,Kleurrijke vissen,Veilig duiken,Fotografie|Beginner|Westkust\nTanote Bay||Duiklocatie aan de oostkant met macrokansen en kleurrijk rifleven.|8-15m|Hengelaarsvis,Pijpvis,Macrofotografie,Kleurrijk rif|Gemiddeld|Oostkust	seed-script	2026-03-28 14:03:22.715903+00	2026-03-28 14:03:22.715903+00
d47fa96d-e0e7-46fb-a68f-194c799dba1a	koh-tao-dive-sites	nl	depth_label	text	Diepte	seed-script	2026-03-28 14:03:22.715903+00	2026-03-28 14:03:22.715903+00
784dad31-f0e1-4234-a9d5-ab36bcbe32d2	koh-tao-dive-sites	nl	booking_title	text	Ontdek de onderwaterwereld van Koh Tao	seed-script	2026-03-28 14:03:22.715903+00	2026-03-28 14:03:22.715903+00
13f319de-5212-4945-a874-ca75b3d901d5	koh-tao-dive-sites	nl	booking_text	text	Klaar om de geweldige duiklocaties van Koh Tao te ontdekken? Onze ervaren gidsen nemen je mee naar de beste plekken voor jouw niveau en interesses.	seed-script	2026-03-28 14:03:22.715903+00	2026-03-28 14:03:22.715903+00
05d10118-2264-47f4-b021-e912eaa74d60	chumphon-pinnacle	nl	quick_facts_location	text	30 minuten uit de kust	\N	2026-03-27 13:40:10.789117+00	2026-03-28 21:03:37.497664+00
bc5cb9ef-9bff-48c8-81c7-d3950ff1db0c	chumphon-pinnacle	nl	quick_facts_best_time	text	Hele jaar, piekseizoen december-april	\N	2026-03-27 13:40:10.789117+00	2026-03-28 21:03:37.497664+00
26ab0f83-3f44-4515-a49e-d9107346fc9e	chumphon-pinnacle	nl	what_you_can_see	text	Walvishaaien\nScholen trevally\nAdelaarsroggen\nChevron-barracuda	\N	2026-03-27 13:40:10.789117+00	2026-03-28 21:03:37.497664+00
b450e1e2-edb9-46ad-9b62-5aa595df0771	chumphon-pinnacle	nl	marine_life_highlights	text	Walvishaaien (regelmatige waarnemingen)\nGrote scholen giant trevally\nChevron-barracuda\nAdelaarsroggen\nScholen horsmakreel en fusilier\nReuzenbarracuda\nKingfish\nDiverse rifvissen	\N	2026-03-27 13:40:10.789117+00	2026-03-28 21:03:37.497664+00
d4c2acde-85ca-4e39-9d96-987c3e44bc94	chumphon-pinnacle	nl	diving_tips	text	Gevorderde certificering aanbevolen door diepte en stroming\nVroege ochtendtrips vergroten de kans op walvishaaiwaarnemingen\nGroothoeklens aanbevolen voor grote onderwerpen\nBlijf bij je gids bij matige stroming\nPerfect voor specialisatiecursus diepduiken\nWalvishaaien zijn het actiefst bij opkomend tij\nNeem een goede onderwatercamera mee	\N	2026-03-27 13:40:10.789117+00	2026-03-28 21:03:37.497664+00
3a4f1be2-2d06-4ed7-b693-19118ead72d0	fun-diving	nl	fun_diving_overview_body	text	Koh Tao's fun dives have it all! We take pride in offering you a personalized, relaxed, and enjoyable fun diving experience. We're dedicated to showcasing the finest underwater marvels tailored to your level of training and experience, ensuring your dives align with your specific interests.	\N	2026-03-28 13:10:40.754266+00	2026-03-30 11:23:47.936366+00
6baa9120-b06d-44f3-90c3-a0adb1677299	fun-diving	nl	fun_diving_overview_title	text	From Breathtaking Shipwrecks to Exotic Marine Life	\N	2026-03-28 13:10:40.754266+00	2026-03-30 11:23:47.936366+00
6ba21f32-1e12-4eae-b962-e5c47c4a59ec	fun-diving	nl	fun_diving_ready_body	text	Whether you're a newly certified Open Water diver or an experienced technical diver, we have the perfect dive sites and packages for you. Book your fun diving adventure today!	\N	2026-03-28 13:10:40.754266+00	2026-03-30 11:23:47.936366+00
d794c004-eeef-43fa-b217-4d12fe37cb9e	fun-diving	nl	fun_diving_ready_cta1	text	View Pricing & Schedules	\N	2026-03-28 13:10:40.754266+00	2026-03-30 11:23:47.936366+00
4a5fc776-53c4-4600-aed2-0652c593936f	fun-diving	nl	fun_diving_ready_cta2	text	Explore Dive Sites	\N	2026-03-28 13:10:40.754266+00	2026-03-30 11:23:47.936366+00
6b26de82-89ba-4f88-bdcc-530c37a31916	fun-diving	nl	fun_diving_ready_title	text	Ready to Explore?	\N	2026-03-28 13:10:40.754266+00	2026-03-30 11:23:47.936366+00
a1e94a2f-80af-44db-aae5-ee9cdc92d471	fun-diving	nl	fun_diving_sites_title	text	Best Koh Tao Fun Diving Trips	\N	2026-03-28 13:10:40.754266+00	2026-03-30 11:23:47.936366+00
92184591-a7c8-4054-8799-374584eb4b0c	fun-diving	nl	fun_diving_trips_title	text	Trips & Programs	\N	2026-03-28 13:10:40.754266+00	2026-03-30 11:23:47.936366+00
e7988854-21b6-4a92-986e-e07fef778abf	fun-diving	nl	fun_diving_world_class_body	text	Beneath the turquoise water surrounding Koh Tao lies a world of colorful coral reefs, teeming marine life from macro creatures to turtles and if you're lucky, the majestic whale shark. With over 25 captivating dive sites, there's boundless diversity to explore.	\N	2026-03-28 13:10:40.754266+00	2026-03-30 11:23:47.936366+00
34158276-5139-46dc-8d57-5245c371e9d1	fun-diving	nl	fun_diving_world_class_title	text	World-Class Dive Sites	\N	2026-03-28 13:10:40.754266+00	2026-03-30 11:23:47.936366+00
1e9742ad-6bb1-47d1-86d1-b29c9c6593c5	mastersc	en	msdst	text	est	\N	2026-03-29 16:33:45.723818+00	2026-03-29 16:36:44.393773+00
bcb5d6c3-35c7-471e-a264-43551f20b9d9	nudibranchs	en	description	text	Colorful sea slugs with incredible patterns and shapes, perfect for macro photography.	seed-script	2026-03-28 14:15:08.09076+00	2026-03-28 14:15:08.09076+00
636acd64-5050-404f-aec2-2753a356c9de	nudibranchs	en	size	text	1-15cm depending on species	seed-script	2026-03-28 14:15:08.09076+00	2026-03-28 14:15:08.09076+00
2859752b-cf62-403c-b97a-c275695537c1	nudibranchs	en	habitat	text	Coral reefs, sandy flats, rocky zones	seed-script	2026-03-28 14:15:08.09076+00	2026-03-28 14:15:08.09076+00
dd99c3d5-0133-4ae6-9fa6-f2e55ef946f7	nudibranchs	en	conservation_status	text	Not evaluated	seed-script	2026-03-28 14:15:08.09076+00	2026-03-28 14:15:08.09076+00
9c409a77-fe6c-4b9c-b223-e0d9c19b8bb8	nudibranchs	en	diet	text	Sponges, hydroids, tunicates, other nudibranchs	seed-script	2026-03-28 14:15:08.09076+00	2026-03-28 14:15:08.09076+00
dd4524b6-6e15-4a6e-9135-b22ea378f5d4	nudibranchs	en	behavior	text	Slow grazers that often feed on specialized prey; some display warning colors due to toxicity; hermaphroditic.	seed-script	2026-03-28 14:15:08.09076+00	2026-03-28 14:15:08.09076+00
fe7a7221-c0bb-4b54-a061-e93004b8413b	nudibranchs	en	best_time	text	Year-round, especially after stronger currents	seed-script	2026-03-28 14:15:08.09076+00	2026-03-28 14:15:08.09076+00
466ef95b-c886-48e1-9302-d86089f27bfe	nudibranchs	en	frequency	text	Common in suitable habitat with patient observation	seed-script	2026-03-28 14:15:08.09076+00	2026-03-28 14:15:08.09076+00
7594fe99-b511-4132-be90-a8af12e266ea	nudibranchs	en	detailed_description	text	Nudibranchs are living artworks found throughout Koh Tao’s reefs. These shell-less mollusks show huge variation in color, pattern, and body shape. With hundreds of species, from fingertip size to nearly hand-sized, they remain endlessly fascinating for macro photographers and marine life enthusiasts. Their variety and photogenic behavior make them favorite subjects in underwater photography.	seed-script	2026-03-28 14:15:08.09076+00	2026-03-28 14:15:08.09076+00
df84337c-5016-4bb1-804e-21a0bb233584	nudibranchs	en	interesting_facts	text	Nudibranchs include hundreds of species with spectacular color variation\nMany species are toxic and advertise this with bright warning colors\nMost nudibranchs are hermaphrodites with both male and female organs\nThey often eat highly specialized prey - some sponges, others hydroids\nTheir shape and color make them ideal macro subjects\nNew species are still being discovered in tropical waters	seed-script	2026-03-28 14:15:08.09076+00	2026-03-28 14:15:08.09076+00
3ef1aab7-d3f3-47b9-bf3f-855ebfef1572	nudibranchs	en	photography_tips	text	Use macro lenses (30-60mm) to fill the frame with detail\nManual focus is essential for sharpness on tiny subjects\nUse a focus light to reveal detail clearly\nShoot close-ups of gills, rhinophores, and texture\nBe patient and wait for a clean position\nGood lighting brings out color and pattern beautifully	seed-script	2026-03-28 14:15:08.09076+00	2026-03-28 14:15:08.09076+00
6c04da42-31e8-47f1-aa0a-94369eec06cd	nudibranchs	nl	description	text	Kleurrijke zeenaaktslakken met ongelooflijke patronen en vormen, perfect voor macrofotografie.	seed-script	2026-03-28 14:15:08.09076+00	2026-03-28 14:15:08.09076+00
699089b8-2256-4f51-a41c-80e240ef2157	nudibranchs	nl	size	text	1-15cm afhankelijk van soort	seed-script	2026-03-28 14:15:08.09076+00	2026-03-28 14:15:08.09076+00
c51f5057-ac25-4505-82e5-d481034ab014	nudibranchs	nl	habitat	text	Koraalriffen, zandvlaktes, rotsachtige zones	seed-script	2026-03-28 14:15:08.09076+00	2026-03-28 14:15:08.09076+00
c7f697cc-1ec4-4c28-a0e7-8b7321eb7302	nudibranchs	nl	conservation_status	text	Niet geëvalueerd	seed-script	2026-03-28 14:15:08.09076+00	2026-03-28 14:15:08.09076+00
bb87c112-421c-4a83-ae14-d878b5100d60	nudibranchs	nl	diet	text	Sponzen, hydroïdpoliepen, zakpijpen, andere naaktslakken	seed-script	2026-03-28 14:15:08.09076+00	2026-03-28 14:15:08.09076+00
5376625b-6f7c-4c1f-b72d-63b5c8f4edc9	nudibranchs	nl	behavior	text	Langzame grazers die vaak gespecialiseerd voedsel eten; sommige tonen waarschuwingskleuren vanwege giftigheid; hermafrodiet.	seed-script	2026-03-28 14:15:08.09076+00	2026-03-28 14:15:08.09076+00
75dc98b5-2bce-4bd0-b0ef-9637206bea29	nudibranchs	nl	best_time	text	Hele jaar, vooral na sterkere stroming	seed-script	2026-03-28 14:15:08.09076+00	2026-03-28 14:15:08.09076+00
ada04a3d-22d7-4ccc-a7b6-2b2f3cac202f	nudibranchs	nl	frequency	text	Veelvoorkomend in geschikt habitat bij geduldige observatie	seed-script	2026-03-28 14:15:08.09076+00	2026-03-28 14:15:08.09076+00
25edd023-8316-452f-9254-c0b9228c97bc	nudibranchs	nl	detailed_description	text	Naaktslakken zijn levende kunstwerkjes die je overal op de riffen van Koh Tao kunt vinden. Deze schelploze weekdieren tonen een enorme variatie in kleur, patroon en lichaamsvorm. Met honderden soorten, van vingertopformaat tot bijna handgroot, blijven ze eindeloos boeiend voor macrofotografen en natuurliefhebbers. Juist door hun variatie en fotogenieke gedrag zijn ze geliefde onderwerpen in onderwaterfotografie.	seed-script	2026-03-28 14:15:08.09076+00	2026-03-28 14:15:08.09076+00
acde86af-0778-41fc-8b47-365823762171	nudibranchs	nl	interesting_facts	text	Naaktslakken bestaan in honderden soorten met spectaculaire kleurvariaties\nVeel soorten zijn giftig en waarschuwen daarvoor met felle kleuren\nDe meeste naaktslakken zijn hermafrodiet met zowel mannelijke als vrouwelijke organen\nZe eten vaak zeer specifieke prooien - sommige sponzen, andere hydroïden\nDoor hun vorm en kleur zijn ze ideale macro-onderwerpen\nIn tropische wateren worden nog steeds nieuwe soorten ontdekt	seed-script	2026-03-28 14:15:08.09076+00	2026-03-28 14:15:08.09076+00
40e3df47-b9c1-45b0-8f08-a1b450b6f0e1	hawksbill-sea-turtle	nl	best_time	text	Hele jaar	seed-script	2026-03-28 14:15:08.526272+00	2026-03-28 14:15:08.526272+00
bd2198c8-deb0-4ad9-8589-d182c89cce65	hawksbill-sea-turtle	nl	frequency	text	Minder vaak gezien dan groene zeeschildpadden	seed-script	2026-03-28 14:15:08.526272+00	2026-03-28 14:15:08.526272+00
f81e609b-3afe-48cb-ad0b-db4a25ec29b5	hawksbill-sea-turtle	nl	detailed_description	text	De karetschildpad is een ernstig bedreigde soort met een karakteristieke snavelbek die perfect is aangepast om sponzen en andere kleine organismen uit spleten te halen. Hun prachtige schild heeft overlappende schubben die een mozaïekpatroon vormen. Ze spelen een belangrijke rol in het rifecosysteem door sponsgroei te beperken. Karetschildpadden zijn veel schuwer dan groene zeeschildpadden en vereisen rustige, geduldige observatie. Hun aanwezigheid is een teken van een gezond rif, waardoor elke waarneming extra bijzonder is voor duikers en snorkelaars.	seed-script	2026-03-28 14:15:08.526272+00	2026-03-28 14:15:08.526272+00
2bc6c975-0855-49e6-af4d-fec9f8d297b2	hawksbill-sea-turtle	nl	interesting_facts	text	Karetschildpadden hebben een snavelachtige bek voor het eten van sponzen\nHun schild werd vroeger gebruikt voor schildpadproducten (nu illegaal)\nZe kunnen tot 35 minuten onder water blijven\nVrouwtjes nestelen elke 2-3 jaar en leggen 3-5 legsels per seizoen\nZe hebben een van de mooiste schildpatronen van alle zeeschildpadden\nKaretschildpadden zijn de meest tropische van alle zeeschildpaddensoorten	seed-script	2026-03-28 14:15:08.526272+00	2026-03-28 14:15:08.526272+00
975c353b-fe07-470c-b1ad-44d59fbd6b45	marine-life-page	en	label_season	text	Best season	seed-script	2026-03-28 14:15:08.526272+00	2026-03-28 14:15:08.526272+00
d4c87382-1293-468e-a160-d82e29bc0f71	nudibranchs	nl	photography_tips	text	Gebruik macrolenzen (30-60mm) om het frame met detail te vullen\nHandmatige focus is essentieel voor scherpte op kleine onderwerpen\nGebruik focuslicht om details goed uit te lichten\nFotografeer close-up voor kieuwen, voelsprieten en textuur\nWees geduldig en wacht op een goede positie\nGoede belichting laat kleuren en patronen echt uitkomen	seed-script	2026-03-28 14:15:08.09076+00	2026-03-28 14:15:08.09076+00
b7e51059-39db-4c97-b6c2-473e40de7c16	green-sea-turtle	en	description	text	Herbivorous sea turtles that graze on seagrass and algae, helping maintain healthy marine ecosystems.	seed-script	2026-03-28 14:15:08.09076+00	2026-03-28 14:15:08.09076+00
74f0c18d-37ea-4f22-b223-fef6e2b265d2	green-sea-turtle	en	size	text	Up to 1.5m (5ft), 150-200kg	seed-script	2026-03-28 14:15:08.09076+00	2026-03-28 14:15:08.09076+00
56d2830d-0038-4258-a450-c4ce4d527729	green-sea-turtle	en	habitat	text	Shallow coastal waters, seagrass beds, coral reefs	seed-script	2026-03-28 14:15:08.09076+00	2026-03-28 14:15:08.09076+00
8cbf9938-951f-44f5-9c98-f47205a64c20	green-sea-turtle	en	conservation_status	text	Endangered	seed-script	2026-03-28 14:15:08.09076+00	2026-03-28 14:15:08.09076+00
15de0039-4332-4c6a-8e70-e43a7251d8b1	green-sea-turtle	en	diet	text	Seagrass, algae, marine plants	seed-script	2026-03-28 14:15:08.09076+00	2026-03-28 14:15:08.09076+00
47da24d8-3ad8-4c9d-8a26-2bf335c8a265	green-sea-turtle	en	behavior	text	Spends most of its time grazing on seagrass beds and migrates long distances to nest. Juveniles make a dangerous journey from beach to sea.	seed-script	2026-03-28 14:15:08.09076+00	2026-03-28 14:15:08.09076+00
a34b7f20-0c8b-4d8d-8381-97c8909d2744	green-sea-turtle	en	best_time	text	Year-round, especially in shallow bays	seed-script	2026-03-28 14:15:08.09076+00	2026-03-28 14:15:08.09076+00
bda18b67-66b2-4452-bb99-b83b993570f5	green-sea-turtle	en	frequency	text	Common in suitable habitats	seed-script	2026-03-28 14:15:08.09076+00	2026-03-28 14:15:08.09076+00
64e4086a-c4bc-4b79-9fcc-0a420948c107	green-sea-turtle	en	detailed_description	text	The green sea turtle is one of the most common sea turtle species around Koh Tao and plays an important role in the health of seagrass beds and coral reefs. These calm herbivores spend their days grazing on seagrass and algae, keeping these habitats in balance. Adults are often seen in shallow bays and reef areas, while hatchlings are sometimes observed during their risky journey from nesting beaches to open sea. Conservation efforts in Thailand have helped protect these ancient ocean travelers, and encountering one in the wild is always special.	seed-script	2026-03-28 14:15:08.09076+00	2026-03-28 14:15:08.09076+00
cd4264ea-cca4-41b4-8b13-4a3827f5c73f	green-sea-turtle	en	interesting_facts	text	Green sea turtles can live up to 80 years\nThey are named after their green body fat, not their shell\nFemales return to the beach where they hatched to lay eggs\nWhile resting, they can hold their breath for up to 7 hours\nHatchlings must reach the ocean within 72 hours to survive\nThey migrate thousands of kilometers between feeding and nesting areas	seed-script	2026-03-28 14:15:08.09076+00	2026-03-28 14:15:08.09076+00
033bd779-f638-4263-92e6-bff66ae06998	green-sea-turtle	en	photography_tips	text	Approach slowly and avoid sudden movements\nShoot at water level for a stronger perspective\nInclude the turtle’s habitat in your composition\nUse natural light and avoid flash\nBe patient and let the turtle come to you\nRespect their space and never chase them	seed-script	2026-03-28 14:15:08.09076+00	2026-03-28 14:15:08.09076+00
b967e6a3-2cb8-4d75-aa0b-b360ef8dcab6	green-sea-turtle	nl	description	text	Plantenetende zeeschildpadden die op zeegras en algen grazen en zo gezonde mariëne ecosystemen helpen behouden.	seed-script	2026-03-28 14:15:08.09076+00	2026-03-28 14:15:08.09076+00
690525f0-554b-4f46-a16d-89c2592ef4f6	green-sea-turtle	nl	size	text	Tot 1,5m (5ft), 150-200kg	seed-script	2026-03-28 14:15:08.09076+00	2026-03-28 14:15:08.09076+00
90bc5bdc-742f-4f2d-8f29-0538eb64ba1d	green-sea-turtle	nl	habitat	text	Ondiep kustwater, zeegrasvelden, koraalriffen	seed-script	2026-03-28 14:15:08.09076+00	2026-03-28 14:15:08.09076+00
71212ef3-4a77-4a1f-8c3a-b70f167db977	green-sea-turtle	nl	conservation_status	text	Bedreigd	seed-script	2026-03-28 14:15:08.09076+00	2026-03-28 14:15:08.09076+00
6c5ef2f2-86a8-410d-bf7a-1f3b8e1d8f1a	green-sea-turtle	nl	diet	text	Zeegras, algen, zeeplanten	seed-script	2026-03-28 14:15:08.09076+00	2026-03-28 14:15:08.09076+00
02204905-af91-4373-b112-ea1fccc8032d	green-sea-turtle	nl	behavior	text	Brengt het grootste deel van de tijd grazend door op zeegrasvelden en migreert over lange afstanden om te nestelen. Jonge schildpadden maken een gevaarlijke tocht van strand naar zee.	seed-script	2026-03-28 14:15:08.09076+00	2026-03-28 14:15:08.09076+00
a79f29c4-d5a5-456b-bab6-b9efba9b37b0	green-sea-turtle	nl	best_time	text	Hele jaar, vooral in ondiepe baaien	seed-script	2026-03-28 14:15:08.09076+00	2026-03-28 14:15:08.09076+00
8fc56b24-4ee1-4f7c-88be-a99ae95bc484	green-sea-turtle	nl	frequency	text	Veelvoorkomend in geschikte leefgebieden	seed-script	2026-03-28 14:15:08.09076+00	2026-03-28 14:15:08.09076+00
edcabbb9-f357-446c-b7af-520fc22c813b	green-sea-turtle	nl	detailed_description	text	De groene zeeschildpad is een van de meest voorkomende zeeschildpadden rond Koh Tao en speelt een belangrijke rol in de gezondheid van zeegrasvelden en koraalriffen. Deze rustige planteneters brengen hun dagen door met grazen op zeegras en algen, waardoor deze habitats in balans blijven. Volwassen dieren worden vaak gezien in ondiepe baaien en rifgebieden, terwijl jonge schildpadjes soms te zien zijn tijdens hun risicovolle tocht van het neststrand naar open zee. Beschermingsmaatregelen in Thailand hebben geholpen deze oeroude zeereizigers te beschermen, en een ontmoeting in het wild blijft altijd bijzonder.	seed-script	2026-03-28 14:15:08.09076+00	2026-03-28 14:15:08.09076+00
e6e75472-0160-4c0e-8f22-c568493bb22b	green-sea-turtle	nl	interesting_facts	text	Groene zeeschildpadden kunnen tot 80 jaar oud worden\nZe zijn genoemd naar hun groene lichaamsvet, niet naar hun schild\nVrouwtjes keren terug naar het strand waar ze zelf uitkwamen om eieren te leggen\nTijdens rust kunnen ze tot 7 uur hun adem inhouden\nJonge schildpadjes moeten binnen 72 uur de zee bereiken om te overleven\nZe migreren duizenden kilometers tussen foerageer- en nestgebieden	seed-script	2026-03-28 14:15:08.09076+00	2026-03-28 14:15:08.09076+00
7de8ead2-67e0-487c-ad38-888e2034d23c	green-sea-turtle	nl	photography_tips	text	Benader langzaam en vermijd plotselinge bewegingen\nFotografeer op waterniveau voor een sterke perspectiefwerking\nNeem ook de leefomgeving van de schildpad mee in je compositie\nGebruik natuurlijk licht en vermijd flits\nWees geduldig en laat de schildpad naar jou toe komen\nRespecteer hun ruimte en jaag ze niet op	seed-script	2026-03-28 14:15:08.09076+00	2026-03-28 14:15:08.09076+00
92a50ab7-fdf5-4d90-9cfd-d84af0a509b4	blacktip-reef-shark	en	description	text	A common reef shark with distinctive black fin tips, important for maintaining a healthy coral reef ecosystem.	seed-script	2026-03-28 14:15:08.09076+00	2026-03-28 14:15:08.09076+00
e72861de-e7b4-4fc9-830b-ec37b4d23015	blacktip-reef-shark	en	size	text	Up to 2m (6.5ft), 13kg	seed-script	2026-03-28 14:15:08.09076+00	2026-03-28 14:15:08.09076+00
fc9e37f6-2895-4637-a2e5-e570355c5c13	blacktip-reef-shark	en	habitat	text	Coral reefs, shallow coastal waters	seed-script	2026-03-28 14:15:08.09076+00	2026-03-28 14:15:08.09076+00
2e48d1d6-bec6-4fdc-b6f9-d288fa8626ab	blacktip-reef-shark	en	conservation_status	text	Near threatened	seed-script	2026-03-28 14:15:08.09076+00	2026-03-28 14:15:08.09076+00
a981b8e4-1d57-4ef2-9aed-ea35a1940d6d	blacktip-reef-shark	en	diet	text	Fish, crustaceans, cephalopods	seed-script	2026-03-28 14:15:08.09076+00	2026-03-28 14:15:08.09076+00
31c9dc1a-fa70-4e75-83f4-6310755a880f	blacktip-reef-shark	en	behavior	text	An active daytime hunter that rests in caves at night. Plays an important role in regulating reef fish populations.	seed-script	2026-03-28 14:15:08.09076+00	2026-03-28 14:15:08.09076+00
305bbe31-75ee-411e-bc7a-b50375c5ccc8	blacktip-reef-shark	en	best_time	text	Year-round, especially during breeding season	seed-script	2026-03-28 14:15:08.526272+00	2026-03-28 14:15:08.526272+00
1355cb37-6769-41d7-9be3-6bad109cfcdd	blacktip-reef-shark	en	frequency	text	Very common on shallow reefs	seed-script	2026-03-28 14:15:08.526272+00	2026-03-28 14:15:08.526272+00
76e08b8d-0894-41a5-94d3-384d7b9394e2	hawksbill-sea-turtle	nl	photography_tips	text	Ga uiterst voorzichtig te werk - ze zijn erg schuw\nFotografeer op afstand om verstoring te voorkomen\nNeem de karakteristieke snavel duidelijk op in je foto's\nLeg het mooie patroon van het schild vast\nGebruik natuurlijk licht en indien mogelijk een langere lens\nWees voorbereid op snelle, plotselinge bewegingen	seed-script	2026-03-28 14:15:08.526272+00	2026-03-28 14:15:08.526272+00
1ef6656c-c38b-4a19-a1cb-f99f1c836c7d	blacktip-reef-shark	en	detailed_description	text	The blacktip reef shark is one of the most commonly seen shark species on Koh Tao reefs and is crucial for ecological balance. The species is named for the black tips on its fins. During the day they actively patrol the reef and sometimes rest in small caves. They are generally not aggressive toward humans and offer an exciting yet safe diving experience. During breeding season, juveniles are seen more frequently, creating great opportunities for divers and snorkelers.	seed-script	2026-03-28 14:15:08.526272+00	2026-03-28 14:15:08.526272+00
c7cbb4b9-e0a2-4903-b532-8f19673ec618	blacktip-reef-shark	en	interesting_facts	text	Blacktip reef sharks can live up to 12 years\nThey give birth to live young (viviparous)\nFemales can have up to 4 pups per litter\nThey are mainly active during the day\nDespite their name, they are usually harmless to humans\nThey help keep reef fish populations in balance	seed-script	2026-03-28 14:15:08.526272+00	2026-03-28 14:15:08.526272+00
42f2d8c3-ab77-41c7-bc43-af8c7b772836	blacktip-reef-shark	en	photography_tips	text	Approach slowly and calmly\nShoot from below for powerful fin silhouettes\nMake sure the black fin tips are clearly visible\nUse ambient light for natural colors\nBe patient and let the shark come to you\nCapture both swimming and resting behavior	seed-script	2026-03-28 14:15:08.526272+00	2026-03-28 14:15:08.526272+00
6b2d0569-82bc-4b37-b45c-35218b4e1973	blacktip-reef-shark	nl	description	text	Veelvoorkomende rifhaai met herkenbare zwarte puntjes op de vinnen, belangrijk voor een gezond koraalrifecosysteem.	seed-script	2026-03-28 14:15:08.526272+00	2026-03-28 14:15:08.526272+00
1b9b1a98-9c6b-48a8-a89f-306217802878	blacktip-reef-shark	nl	size	text	Tot 2m (6,5ft), 13kg	seed-script	2026-03-28 14:15:08.526272+00	2026-03-28 14:15:08.526272+00
dc8e43c8-518d-4bf7-ba83-9f9345481d51	blacktip-reef-shark	nl	habitat	text	Koraalriffen, ondiep kustwater	seed-script	2026-03-28 14:15:08.526272+00	2026-03-28 14:15:08.526272+00
e7d01a39-5e24-4224-bcc1-0975af0f508a	blacktip-reef-shark	nl	conservation_status	text	Bijna bedreigd	seed-script	2026-03-28 14:15:08.526272+00	2026-03-28 14:15:08.526272+00
ada017a2-6e77-4cb8-9e43-f2edb8f98d5a	blacktip-reef-shark	nl	diet	text	Vis, schaaldieren, koppotigen	seed-script	2026-03-28 14:15:08.526272+00	2026-03-28 14:15:08.526272+00
2e8e0abb-4223-4696-8671-9e6329b71015	blacktip-reef-shark	nl	behavior	text	Actieve jager overdag, rust 's nachts in grotten. Speelt een belangrijke rol in het reguleren van vispopulaties op riffen.	seed-script	2026-03-28 14:15:08.526272+00	2026-03-28 14:15:08.526272+00
86a7fef5-df87-469b-a64a-138b8f412296	blacktip-reef-shark	nl	best_time	text	Hele jaar, vooral tijdens het voortplantingsseizoen	seed-script	2026-03-28 14:15:08.526272+00	2026-03-28 14:15:08.526272+00
6ddb4ba9-a060-4069-8642-59bbc11caa35	blacktip-reef-shark	nl	frequency	text	Zeer veelvoorkomend op ondiepe riffen	seed-script	2026-03-28 14:15:08.526272+00	2026-03-28 14:15:08.526272+00
d19d7b90-491a-4af2-a297-53aa59726f35	blacktip-reef-shark	nl	detailed_description	text	De zwartpuntrifhaai is een van de meest geziene haaisoorten op de riffen van Koh Tao en is cruciaal voor de ecologische balans. De soort is genoemd naar de zwarte uiteinden van de vinnen. Overdag patrouilleren ze actief over het rif en rusten ze soms in kleine grotten. Ze zijn doorgaans niet agressief richting mensen en zorgen voor een spannende maar veilige duikervaring. Tijdens het voortplantingsseizoen zijn jonge haaien extra vaak te zien, wat mooie fotokansen geeft voor duikers en snorkelaars.	seed-script	2026-03-28 14:15:08.526272+00	2026-03-28 14:15:08.526272+00
bc044511-c055-477e-add2-12b26dabcb37	blacktip-reef-shark	nl	interesting_facts	text	Zwartpuntrifhaaien kunnen tot 12 jaar oud worden\nZe krijgen levende jongen (levendbarend)\nVrouwtjes kunnen tot 4 jongen per worp krijgen\nZe zijn vooral overdag actief\nOndanks hun naam zijn ze meestal ongevaarlijk voor mensen\nZe helpen vispopulaties op koraalriffen in balans te houden	seed-script	2026-03-28 14:15:08.526272+00	2026-03-28 14:15:08.526272+00
96d4d22c-398f-45fd-8786-4bd634f95777	blacktip-reef-shark	nl	photography_tips	text	Benader langzaam en rustig\nFotografeer van onderen voor krachtige vinbeelden\nZorg dat de zwarte vinpunten duidelijk in beeld zijn\nGebruik beschikbaar licht voor natuurlijke kleuren\nWees geduldig en laat de haai naar jou toe komen\nLeg zowel zwemmend als rustend gedrag vast	seed-script	2026-03-28 14:15:08.526272+00	2026-03-28 14:15:08.526272+00
9701270b-f641-4979-bc14-0325fbebe9ad	hawksbill-sea-turtle	en	description	text	A beautiful sea turtle with a distinctive beak-shaped mouth, known for feeding on sponges and its colorful shell.	seed-script	2026-03-28 14:15:08.526272+00	2026-03-28 14:15:08.526272+00
dc4adb26-91ab-4bfa-b53f-3165cc79031e	hawksbill-sea-turtle	en	size	text	Up to 1m (3.3ft), 50-80kg	seed-script	2026-03-28 14:15:08.526272+00	2026-03-28 14:15:08.526272+00
2a29f380-5860-4dd2-9058-aa5e42cd26e2	hawksbill-sea-turtle	en	habitat	text	Coral reefs, rocky zones, coastal waters	seed-script	2026-03-28 14:15:08.526272+00	2026-03-28 14:15:08.526272+00
d674d6cb-24c0-41d8-8ae0-762a53de971d	hawksbill-sea-turtle	en	conservation_status	text	Critically endangered	seed-script	2026-03-28 14:15:08.526272+00	2026-03-28 14:15:08.526272+00
7b8989eb-69b0-40f8-836b-275002414651	hawksbill-sea-turtle	en	diet	text	Sponges, tunicates, jellyfish	seed-script	2026-03-28 14:15:08.526272+00	2026-03-28 14:15:08.526272+00
93c83e1f-b365-464b-981a-82ec4f5e2f99	hawksbill-sea-turtle	en	behavior	text	A specialized sponge feeder that helps regulate sponge populations on reefs. Much shyer and harder to approach than other turtles.	seed-script	2026-03-28 14:15:08.526272+00	2026-03-28 14:15:08.526272+00
14f15813-8b99-4da0-b383-4afbbe90b805	hawksbill-sea-turtle	en	best_time	text	Year-round	seed-script	2026-03-28 14:15:08.526272+00	2026-03-28 14:15:08.526272+00
26f20cca-3177-414d-8919-9b5c637dede0	hawksbill-sea-turtle	en	frequency	text	Seen less often than green sea turtles	seed-script	2026-03-28 14:15:08.526272+00	2026-03-28 14:15:08.526272+00
21ca4c69-393d-4910-a47e-ed4eb2072d8a	hawksbill-sea-turtle	en	detailed_description	text	The hawksbill sea turtle is a critically endangered species with a distinctive beak perfectly adapted to extracting sponges and small organisms from crevices. Their beautiful shell has overlapping scutes that create a mosaic pattern. They play an important role in reef ecosystems by controlling sponge growth. Hawksbills are much shyer than green turtles and require calm, patient observation. Their presence is a sign of a healthy reef, making every sighting especially memorable for divers and snorkelers.	seed-script	2026-03-28 14:15:08.526272+00	2026-03-28 14:15:08.526272+00
e4bdb942-8cc7-45e2-90e6-d5be7afe02b3	hawksbill-sea-turtle	en	interesting_facts	text	Hawksbills have a beak-like mouth adapted for eating sponges\nTheir shell was historically used for tortoiseshell products (now illegal)\nThey can stay underwater for up to 35 minutes\nFemales nest every 2-3 years and lay 3-5 clutches per season\nThey have one of the most beautiful shell patterns of all sea turtles\nHawksbills are the most tropical of all sea turtle species	seed-script	2026-03-28 14:15:08.526272+00	2026-03-28 14:15:08.526272+00
ddb4fd43-f29f-4d86-b4e1-4456d7120df8	hawksbill-sea-turtle	en	photography_tips	text	Approach with extreme care - they are very shy\nPhotograph from a distance to avoid disturbance\nCapture the distinctive beak clearly in your shots\nHighlight the shell’s beautiful pattern\nUse natural light and, if possible, a longer lens\nBe ready for quick, sudden movements	seed-script	2026-03-28 14:15:08.526272+00	2026-03-28 14:15:08.526272+00
a8aa3992-e95e-43b3-9af0-89b8f59cd3d4	hawksbill-sea-turtle	nl	description	text	Prachtige zeeschildpad met een kenmerkende snavelvormige bek, bekend om het eten van sponzen en het kleurrijke schild.	seed-script	2026-03-28 14:15:08.526272+00	2026-03-28 14:15:08.526272+00
7aac77d2-7771-479c-b8d8-b0891ddf9a3e	hawksbill-sea-turtle	nl	size	text	Tot 1m (3,3ft), 50-80kg	seed-script	2026-03-28 14:15:08.526272+00	2026-03-28 14:15:08.526272+00
9862baa4-ccdc-4bff-b16b-823f148badda	hawksbill-sea-turtle	nl	habitat	text	Koraalriffen, rotsachtige zones, kustwater	seed-script	2026-03-28 14:15:08.526272+00	2026-03-28 14:15:08.526272+00
6955e2fe-ff5c-44a0-8054-8e8f8972ca9e	hawksbill-sea-turtle	nl	conservation_status	text	Ernstig bedreigd	seed-script	2026-03-28 14:15:08.526272+00	2026-03-28 14:15:08.526272+00
1e42bbe4-c077-411d-a6e1-35bc3c2ad835	hawksbill-sea-turtle	nl	diet	text	Sponzen, zakpijpen, kwallen	seed-script	2026-03-28 14:15:08.526272+00	2026-03-28 14:15:08.526272+00
826f467d-2906-4d88-b826-3974f80a2309	hawksbill-sea-turtle	nl	behavior	text	Gespecialiseerde sponseter die sponspopulaties op riffen helpt reguleren. Veel schuwer en moeilijker te benaderen dan andere schildpadden.	seed-script	2026-03-28 14:15:08.526272+00	2026-03-28 14:15:08.526272+00
48e0ccaf-5a13-4599-ac4e-40f95b7936ad	marine-life-page	en	label_more	text	More info	seed-script	2026-03-28 14:15:08.526272+00	2026-03-28 14:15:08.526272+00
f3fbb444-69a6-404c-bc8f-9b50c4239cc1	marine-life-page	en	hero_title	text	Marine life of Koh Tao	seed-script	2026-03-28 14:15:08.526272+00	2026-03-28 14:15:08.526272+00
022dee60-ed5d-41e5-abe7-336fa27947a1	marine-life-page	en	hero_text	text	Discover the impressive biodiversity of Koh Tao’s underwater world, with over 350 fish species and remarkable marine animals.	seed-script	2026-03-28 14:15:08.526272+00	2026-03-28 14:15:08.526272+00
e225ade2-0311-48e5-8509-9ece5449fb71	marine-life-page	en	intro_title	text	Marine life around Koh Tao	seed-script	2026-03-28 14:15:08.526272+00	2026-03-28 14:15:08.526272+00
6d3cc7c7-ba3e-40d9-a393-13dc5b475d39	marine-life-page	en	intro_text	text	The tropical waters around Koh Tao are rich in marine life and biodiversity. With stable water temperatures between 26-29°C year-round, the sea is an ideal habitat for diverse fauna and flora. From gentle giants like whale sharks to tiny macro species, Koh Tao offers encounters with some of the most fascinating sea creatures in the world.	seed-script	2026-03-28 14:15:08.526272+00	2026-03-28 14:15:08.526272+00
f6e90cd9-d599-4cc9-ad39-35e72584c180	marine-life-page	en	pelagic_title	text	Pelagic species	seed-script	2026-03-28 14:15:08.526272+00	2026-03-28 14:15:08.526272+00
74b596ea-bc53-4c3b-aadb-51e253ac2768	marine-life-page	en	sharks_title	text	Reef sharks	seed-script	2026-03-28 14:15:08.526272+00	2026-03-28 14:15:08.526272+00
e5cdddd9-270e-4147-80e2-ef7c37df6d71	marine-life-page	en	turtles_title	text	Sea turtles	seed-script	2026-03-28 14:15:08.526272+00	2026-03-28 14:15:08.526272+00
2936e4a1-26e6-4732-9af8-103a150f6062	marine-life-page	en	macro_title	text	Macro marine life	seed-script	2026-03-28 14:15:08.526272+00	2026-03-28 14:15:08.526272+00
dc7776e4-84de-4481-91e2-9dc1fbebf8a4	marine-life-page	en	cta_title	text	Ready to experience Koh Tao marine life?	seed-script	2026-03-28 14:15:08.842017+00	2026-03-28 14:15:08.842017+00
cc28475a-1ddd-4ccd-b7f9-abe7efc234e8	marine-life-page	en	cta_text	text	Join our PADI-certified courses and fun dive trips to see these incredible animals up close in their natural habitat.	seed-script	2026-03-28 14:15:08.842017+00	2026-03-28 14:15:08.842017+00
51eb2417-bf3f-4f6f-a5f0-5eb470460a3d	marine-life-page	en	cta_courses	text	View courses	seed-script	2026-03-28 14:15:08.842017+00	2026-03-28 14:15:08.842017+00
e1b637fa-864b-4921-8f90-17e5cd74fd72	marine-life-page	en	cta_fun_dives	text	Fun dive trips	seed-script	2026-03-28 14:15:08.842017+00	2026-03-28 14:15:08.842017+00
49490690-c59b-4592-811a-72edf6efc606	marine-life-page	en	pelagic_species	text	Whale shark|The largest fish in the world. These gentle giants are regularly spotted in deeper waters around Koh Tao, especially during plankton blooms.|Up to 12m|Deep offshore water|Year-round, peak Nov-Mar|/marine-life/whaleshark\nGreat barracuda|Impressive predators that hunt in schools around offshore pinnacles at speeds up to 40 km/h.|Up to 2m|Deep pinnacles|Year-round|/marine-life/great-barracuda\nManta rays|Elegant plankton feeders that perform spectacular looping movements while feeding.|Wingspan up to 7m|Deep water|Nov-Mar|\nMalabar grouper|Large predatory grouper living in deeper water, known for ambush hunting.|Up to 2.3m, 100kg|Deep reefs and pinnacles|Year-round|/marine-life/malabar-grouper	seed-script	2026-03-28 14:15:08.842017+00	2026-03-28 14:15:08.842017+00
a99458ca-545e-4367-8704-ab398fa8c63b	marine-life-page	en	reef_sharks	text	Blacktip reef shark|Common reef sharks with distinctive black fin tips, often hunting in shallow water.|Up to 2m|Coral reefs|Year-round|/marine-life/black-tip-reef-shark\nGrey reef shark|Shyer reef sharks that prefer deeper water and are seen less often.|Up to 2.5m|Deep reefs|Year-round|	seed-script	2026-03-28 14:15:08.842017+00	2026-03-28 14:15:08.842017+00
77d363b0-7090-47f6-aba5-eda0dab9ab63	marine-life-page	en	sea_turtles	text	Green sea turtle|Herbivorous sea turtles that graze on seagrass and algae, often seen in shallow bays.|Up to 1.5m|Shallow bays and reefs|Year-round|/marine-life/green-sea-turtle\nHawksbill sea turtle|Beautiful turtles with a distinctive beak-like mouth, known for feeding on sponges.|Up to 1m|Coral reefs|Year-round|/marine-life/hawksbill-sea-turtle	seed-script	2026-03-28 14:15:08.842017+00	2026-03-28 14:15:08.842017+00
c058f2b3-d0a1-4c02-a2b8-10d0dbcbc8dc	marine-life-page	en	macro_life	text	Nudibranchs|Colorful sea slugs with unique patterns and shapes, perfect for macro photography.|1-15cm|Coral reefs|Year-round|/marine-life/nudibranchs\nBanded sea krait|Venomous sea snakes that hunt fish and eels in shallow water.|Up to 1.5m|Shallow reefs|Year-round|/marine-life/banded-sea-krait\nBearded scorpionfish|Master of camouflage with venomous spines, perfectly disguised as coral.|Up to 30cm|Coral reefs|Year-round|/marine-life/bearded-scorpion-fish\nCephalopods|Intelligent octopuses and cuttlefish, masters of camouflage and problem solving.|5cm-3m|Coral reefs and deep water|Year-round|/marine-life/cephalopods	seed-script	2026-03-28 14:15:08.842017+00	2026-03-28 14:15:08.842017+00
f5716042-4a6d-429e-85de-24f6bef940ec	marine-life-page	nl	label_size	text	Grootte	seed-script	2026-03-28 14:15:08.842017+00	2026-03-28 14:15:08.842017+00
f718f620-5c29-446e-a2ab-e3da0fd8ddab	marine-life-page	nl	label_habitat	text	Habitat	seed-script	2026-03-28 14:15:08.842017+00	2026-03-28 14:15:08.842017+00
f31ba3cb-78fe-4eb5-96a6-7e9de899c351	marine-life-page	nl	label_season	text	Beste periode	seed-script	2026-03-28 14:15:08.842017+00	2026-03-28 14:15:08.842017+00
133fbb2a-9020-4efb-a68f-fd3dacc3cf85	marine-life-page	nl	label_more	text	Meer info	seed-script	2026-03-28 14:15:08.842017+00	2026-03-28 14:15:08.842017+00
3d318b4e-85c4-45b4-9ab2-08b4b153e999	marine-life-page	nl	hero_title	text	Marien leven van Koh Tao	seed-script	2026-03-28 14:15:08.842017+00	2026-03-28 14:15:08.842017+00
b0201152-5f7e-4592-8c36-bdbc73b9cf62	marine-life-page	nl	hero_text	text	Ontdek de indrukwekkende biodiversiteit van Koh Tao’s onderwaterwereld, met meer dan 350 vissoorten en bijzondere zeedieren.	seed-script	2026-03-28 14:15:08.842017+00	2026-03-28 14:15:08.842017+00
aabe96d1-984a-423d-b0a6-106cde995eef	marine-life-page	nl	intro_title	text	Marien leven op Koh Tao	seed-script	2026-03-28 14:15:08.842017+00	2026-03-28 14:15:08.842017+00
7812a0a4-5735-406f-b9b7-43ad644504c3	marine-life-page	nl	intro_text	text	De tropische wateren rond Koh Tao kennen een enorme rijkdom aan zeeleven en biodiversiteit. Met stabiele watertemperaturen tussen 26-29°C het hele jaar door vormt de zee een ideaal leefgebied voor diverse soorten fauna en flora. Van vriendelijke reuzen zoals walvishaaien tot kleine macrosoorten: Koh Tao biedt ontmoetingen met enkele van de meest fascinerende zeedieren ter wereld.	seed-script	2026-03-28 14:15:08.842017+00	2026-03-28 14:15:08.842017+00
9096fdca-7ef4-49aa-9cb4-29494fc939a5	marine-life-page	nl	pelagic_title	text	Pelagische soorten	seed-script	2026-03-28 14:15:08.842017+00	2026-03-28 14:15:08.842017+00
27629ffe-8103-42f3-a061-761977390e4b	marine-life-page	nl	sharks_title	text	Rifhaaien	seed-script	2026-03-28 14:15:08.842017+00	2026-03-28 14:15:08.842017+00
f1904384-d1aa-402b-846a-258960597a23	marine-life-page	nl	turtles_title	text	Zeeschildpadden	seed-script	2026-03-28 14:15:08.842017+00	2026-03-28 14:15:08.842017+00
8407346b-0e95-43df-a1ee-81fd444fdc0a	marine-life-page	nl	macro_title	text	Macro marien leven	seed-script	2026-03-28 14:15:08.842017+00	2026-03-28 14:15:08.842017+00
94ac0153-2fc6-48e3-b03e-24918d659296	marine-life-page	nl	cta_title	text	Klaar om het mariëne leven van Koh Tao te beleven?	seed-script	2026-03-28 14:15:08.842017+00	2026-03-28 14:15:08.842017+00
61d78486-4427-4eeb-9e2f-e2f41844b922	marine-life-page	nl	cta_text	text	Doe mee met onze PADI-gecertificeerde cursussen en fun dive trips om deze geweldige dieren van dichtbij in hun natuurlijke habitat te zien.	seed-script	2026-03-28 14:15:08.842017+00	2026-03-28 14:15:08.842017+00
14800687-fdc3-4c75-83dd-90da0742be4a	marine-life-page	nl	cta_courses	text	Bekijk cursussen	seed-script	2026-03-28 14:15:08.842017+00	2026-03-28 14:15:08.842017+00
b03a6782-c970-4fae-b48c-b8091eb7bac4	marine-life-page	nl	cta_fun_dives	text	Fun dive trips	seed-script	2026-03-28 14:15:08.842017+00	2026-03-28 14:15:08.842017+00
7672903c-a208-4bba-86c6-bf3734555b14	fun-diving	nl	fun_diving_all_sites_title	text	All Dive Sites	\N	2026-03-28 13:10:40.754266+00	2026-03-30 11:23:47.936366+00
ab6f77d6-a314-476c-84f7-efee423c7458	marine-life-page	nl	pelagic_species	text	Walvishaai|De grootste vis ter wereld. Deze vriendelijke reuzen worden regelmatig gezien in diepere wateren rond Koh Tao, vooral tijdens planktonbloei.|Tot 12m|Diep water uit de kust|Hele jaar, piek nov-mrt|/marine-life/whaleshark\nGrote barracuda|Indrukwekkende roofvissen die in groepen jagen rond rotspieken uit de kust, met snelheden tot 40 km/u.|Tot 2m|Diepe rotspieken|Hele jaar|/marine-life/great-barracuda\nMantaroggen|Elegante planktoneters die tijdens het voeden spectaculaire draaibewegingen maken.|Spanwijdte tot 7m|Diepe wateren|Nov-Mar|\nMalabar tandbaars|Grote roofzuchtige tandbaars die in dieper water leeft en bekendstaat om hinderlaagjacht.|Tot 2,3m, 100kg|Diepe riffen en rotspieken|Hele jaar|/marine-life/malabar-grouper	seed-script	2026-03-28 14:15:08.842017+00	2026-03-28 14:15:08.842017+00
15464b83-a304-420b-802e-ca70a6a5fe4a	marine-life-page	nl	reef_sharks	text	Zwartpuntrifhaai|Veelvoorkomende rifhaaien met kenmerkende zwarte vinpunten, vaak jagend in ondiep water.|Tot 2m|Koraalriffen|Hele jaar|/marine-life/black-tip-reef-shark\nGrijze rifhaai|Schuwere rifhaaien die dieper water verkiezen en minder vaak worden gezien.|Tot 2,5m|Diepe riffen|Hele jaar|	seed-script	2026-03-28 14:15:08.842017+00	2026-03-28 14:15:08.842017+00
08f45c60-84e4-4dc9-b499-e7f0dd9e0c69	marine-life-page	nl	sea_turtles	text	Groene zeeschildpad|Plantenetende zeeschildpadden die grazen op zeegras en algen, vaak gezien in ondiepe baaien.|Tot 1,5m|Ondiepe baaien en riffen|Hele jaar|/marine-life/green-sea-turtle\nKaretschildpad|Mooie schildpadden met een kenmerkende snavelvormige bek, bekend om het eten van sponsen.|Tot 1m|Koraalriffen|Hele jaar|/marine-life/hawksbill-sea-turtle	seed-script	2026-03-28 14:15:08.842017+00	2026-03-28 14:15:08.842017+00
f623290a-834b-4b8f-a7bb-7312a51722ea	marine-life-page	nl	macro_life	text	Naaktslakken|Kleurrijke zeenaaktslakken met bijzondere patronen en vormen, perfect voor macrofotografie.|1-15cm|Koraalriffen|Hele jaar|/marine-life/nudibranchs\nGebandeerde zeekrait|Giftige zeeslangen die in ondiep water op vis en paling jagen.|Tot 1,5m|Ondiepe riffen|Hele jaar|/marine-life/banded-sea-krait\nBaardschorpioenvis|Meester in camouflage met giftige stekels, perfect vermomd als koraal.|Tot 30cm|Koraalriffen|Hele jaar|/marine-life/bearded-scorpion-fish\nKoppotigen|Intelligente octopussen en inktvissen, meesters in camouflage en probleemoplossing.|5cm-3m|Koraalriffen en diep water|Hele jaar|/marine-life/cephalopods	seed-script	2026-03-28 14:15:08.842017+00	2026-03-28 14:15:08.842017+00
8b20513e-fe3d-4273-8e27-636223162af1	dive-sites/twins-pinnacle	en	overview	text		\N	2026-03-31 17:44:30.907201+00	2026-03-31 17:54:49.644632+00
e587728b-9926-4e3e-b1e5-ef5023c2d2f2	dive-sites/twins-pinnacle	en	quick_facts_depth	text		\N	2026-03-31 17:44:30.907201+00	2026-03-31 17:54:49.644632+00
f1d55188-32b9-494a-bb8e-271aeeb8ae40	dive-sites/twins-pinnacle	en	quick_facts_difficulty	text		\N	2026-03-31 17:44:30.907201+00	2026-03-31 17:54:49.644632+00
7107c8f7-84eb-40eb-a028-d5860765165c	dive-sites/twins-pinnacle	en	quick_facts_location	text		\N	2026-03-31 17:44:30.907201+00	2026-03-31 17:54:49.644632+00
a6ae12ad-65e1-4e2d-86a5-5deed9a02454	dive-sites/twins-pinnacle	en	quick_facts_best_time	text		\N	2026-03-31 17:44:30.907201+00	2026-03-31 17:54:49.644632+00
b0b9c9fb-7d15-49b8-8931-045ef6a38061	dive-sites/twins-pinnacle	en	marine_life_highlights	text	\n\nThree granite pinnacles\n\nArch and rock formations\n\nRich marine life\n\nPerfect for training\n\nCalm conditions\n\nAnemones with clownfish\n\ntest	\N	2026-03-31 17:44:30.907201+00	2026-03-31 17:54:49.644632+00
973aa118-cf42-48ba-aad6-268f3330055e	dive-sites/twins-pinnacle	en	diving_tips	text		\N	2026-03-31 17:44:30.907201+00	2026-03-31 17:54:49.644632+00
153d7421-6a50-4ed5-8768-867bb95d4258	dive-sites/south-west-pinnacle	en	what_you_can_see	text		\N	2026-03-31 17:55:41.76794+00	2026-03-31 17:55:41.76794+00
a4a88fdc-752a-4daf-ae28-f697389b68e3	scuba-diver	en	duration	text	2-3 days	seed-script	2026-03-12 14:56:23.775431+00	2026-03-28 14:24:15.888987+00
64db0c38-9fca-4407-b2a9-cae9b39a9766	scuba-diver	nl	section_1_title	text	Wat je leert	seed-script	2026-03-28 14:22:37.204447+00	2026-03-28 14:24:16.326594+00
d65e551c-bf7f-4392-a3e9-18d06b241a66	scuba-diver	nl	section_1_content	text	Basis duiktheorie en -fysica\nCorrect gebruik van duikuitrusting\nFundamentele duikvaardigheden en veiligheidsprocedures\nOnderwatercommunicatie en buddy-systeem\nVerkenning van ondiep water en rifbewustzijn\nMilieubewustzijn en mariene natuurbescherming	seed-script	2026-03-28 14:22:37.204447+00	2026-03-28 14:24:16.326594+00
10531341-effe-40fd-806e-7b86984c5429	scuba-diver	nl	section_2_title	text	Cursusopbouw	seed-script	2026-03-28 14:22:37.204447+00	2026-03-28 14:24:16.326594+00
bafcb3c3-646f-45b6-889e-db309e380570	scuba-diver	nl	section_2_content	text	De cursus bestaat uit theorielessen, training in beschut water en buitenwaterduiken. Je maakt 2 buitenwaterduiken in water tot maximaal 12 meter (40 voet), waardoor de cursus voor de meeste mensen toegankelijk is.	seed-script	2026-03-28 14:22:37.204447+00	2026-03-28 14:24:16.326594+00
4fc52284-fa3c-4d9d-b6f2-784a1eaf5492	scuba-diver	nl	section_3_title	text	Waarom kiezen voor Scuba Diver?	seed-script	2026-03-28 14:22:37.204447+00	2026-03-28 14:24:16.326594+00
77149770-db12-4201-b22f-ccec61920421	scuba-diver	nl	section_3_content	text	Kortere cursus dan de volledige Open Water-cursus\nPerfecte introductie tot duiken\nOp te waarderen naar Open Water-certificering\nLeuke en ontspannen leeromgeving\nVerken de prachtige riffen van Koh Tao	seed-script	2026-03-28 14:22:37.204447+00	2026-03-28 14:24:16.326594+00
930911c2-411b-49e6-b725-5db83ade4dcc	discover-scuba	en	duration	text	1 day	seed-script	2026-03-27 10:52:08.104218+00	2026-03-28 16:44:59.316524+00
c44e42a2-eb09-4861-9c00-c8d01a20f357	discover-scuba	en	hero_subtitle	text	Explore the thrill of breathing underwater with no certification required. This beginner program is the perfect first dive experience on Koh Tao.	seed-script	2026-03-27 10:52:08.104218+00	2026-03-28 16:44:59.316524+00
4a09b2d6-03c9-47ce-9cb7-729fec98b0d4	discover-scuba	en	section_1_title	text	How it works	seed-script	2026-03-28 14:22:37.204447+00	2026-03-28 16:44:59.316524+00
102bda87-0ebb-4c52-88fa-e7b649bfba42	discover-scuba	en	section_2_title	text	What is included	seed-script	2026-03-28 14:22:37.204447+00	2026-03-28 16:44:59.316524+00
3b3bf9a2-1fce-42c9-8996-9675f1fec08f	advanced	en	hero_title	text	PADI Advanced Open Water Course	seed-script	2026-03-19 09:21:42.200963+00	2026-03-28 14:24:15.888987+00
cef5770d-f0b0-43d2-bb19-fca7d4881bf6	advanced	en	hero_subtitle	text	Expand your skills with five Adventure Dives including deep and navigation. Perfect for exploring deeper dive sites.	seed-script	2026-03-28 14:22:36.581793+00	2026-03-28 14:24:15.888987+00
8b9b29cd-285a-4078-b600-2e78108bb113	advanced	en	price_thb	text	9500	seed-script	2026-03-28 14:22:36.581793+00	2026-03-28 14:24:15.888987+00
d0401e27-5646-43d2-9b6d-ef796b130696	advanced	en	price_usd	text	275	seed-script	2026-03-28 14:22:36.581793+00	2026-03-28 14:24:15.888987+00
b3c225f2-afee-4a8a-ba03-eacd64f9c896	advanced	en	price_eur	text	250	seed-script	2026-03-28 14:22:36.581793+00	2026-03-28 14:24:15.888987+00
82e7acc0-ca3b-4381-830e-ee35371a98f5	advanced	en	duration	text	2 days	seed-script	2026-03-28 14:22:36.581793+00	2026-03-28 14:24:15.888987+00
c43d84f3-7ffb-4837-b1f9-74932c8adc46	advanced	en	section_1_title	text	What you'll do	seed-script	2026-03-28 14:22:36.581793+00	2026-03-28 14:24:15.888987+00
cf6f89ba-3390-4145-ac12-ee8c66796367	advanced	en	section_1_content	text	5 adventure dives (can be done over 2-3 days)\nPractice deep dive techniques and navigation\nImprove buoyancy and comfort underwater\nChoose electives: Night, Wreck, Fish ID, Photography, etc.	seed-script	2026-03-28 14:22:36.581793+00	2026-03-28 14:24:15.888987+00
800bf2aa-814f-4fcf-b5bb-7929d5b0c780	advanced	en	section_2_title	text	Prerequisites	seed-script	2026-03-28 14:22:36.581793+00	2026-03-28 14:24:15.888987+00
02ebb95c-6aeb-4761-95d8-ca06f827846f	advanced	en	section_2_content	text	Open Water Diver certification (or equivalent) and minimum age of 12.	seed-script	2026-03-28 14:22:36.581793+00	2026-03-28 14:24:15.888987+00
87b9f6d6-a8d3-49d8-a315-99db7b9d9bd5	advanced	en	section_3_title	text	Inclusions	seed-script	2026-03-28 14:22:36.581793+00	2026-03-28 14:24:15.888987+00
91de904a-ee45-4cc8-983b-8bd881762370	advanced	en	section_3_content	text	Course materials & PADI certification\nAll equipment rental\nBoat fees where applicable\nProfessional instruction	seed-script	2026-03-28 14:22:36.581793+00	2026-03-28 14:24:15.888987+00
fecb92b1-98d1-45a5-8607-1021698d7ff3	advanced	en	faq_1_question	text	Do I need to take a test?	seed-script	2026-03-28 14:22:36.581793+00	2026-03-28 14:24:15.888987+00
41b760b0-9258-4d88-9238-608ff3cd81bd	advanced	en	faq_1_answer	text	No exam required! The Advanced course is all about experience and practice.	seed-script	2026-03-28 14:22:36.581793+00	2026-03-28 14:24:15.888987+00
39a03f5d-0c75-4c83-a3ad-10579c9eb1c9	advanced	en	faq_2_question	text	Can I choose my Adventure Dives?	seed-script	2026-03-28 14:22:36.581793+00	2026-03-28 14:24:15.888987+00
f7a816d6-e0b0-414e-b272-b3d58c480812	advanced	en	faq_2_answer	text	Deep and Navigation are required. You choose 3 electives from options like Night, Wreck, Peak Performance Buoyancy, Fish ID, and more.	seed-script	2026-03-28 14:22:36.581793+00	2026-03-28 14:24:15.888987+00
14900645-ccd4-46f0-a36d-c0016d087415	advanced	nl	hero_title	text	PADI Advanced Open Water-cursus	seed-script	2026-03-19 11:03:35.689961+00	2026-03-28 14:24:15.888987+00
50900f89-fee3-41ad-9198-8add97d3df89	advanced	nl	hero_subtitle	text	Breid je vaardigheden uit met vijf Adventure Dives, waaronder diepduiken en navigatie. Perfect voor het verkennen van diepere duiklocaties.	seed-script	2026-03-28 14:22:36.581793+00	2026-03-28 14:24:15.888987+00
ebe41703-06ba-4b5d-8d57-c2486bb51af1	discover-scuba	nl	faq_3_answer	text	Je krijgt een korte uitleg, veiligheidsbriefing en oefent basisvaardigheden voordat je je eerste buitenwaterduik maakt met je instructeur.	seed-script	2026-03-28 14:22:37.204447+00	2026-03-28 14:24:16.326594+00
242265f4-d1af-46fb-8f68-8d500b1b3fdc	rescue	en	price_eur	text	265	seed-script	2026-03-28 14:22:37.204447+00	2026-03-28 14:24:16.617176+00
81beca01-265d-450f-a110-ffbabd7f6695	rescue	en	duration	text	3 days	seed-script	2026-03-28 14:22:37.579329+00	2026-03-28 14:24:16.617176+00
a07342ee-927a-4bde-b7e5-86fb52fdb459	rescue	en	section_1_title	text	Skills covered	seed-script	2026-03-28 14:22:37.579329+00	2026-03-28 14:24:16.617176+00
ca75a8ca-398a-4e45-af52-b7b2dd834fa5	rescue	en	section_1_content	text	Self-rescue and diver stress recognition\nRescue scenarios and techniques\nEmergency management and equipment\nRescue breathing and casualty care	seed-script	2026-03-28 14:22:37.579329+00	2026-03-28 14:24:16.617176+00
f1b3e35c-7865-4b89-b9bc-42365ce3444d	rescue	en	section_2_title	text	Structure and prerequisites	seed-script	2026-03-28 14:22:37.579329+00	2026-03-28 14:24:16.617176+00
398619f6-ccd0-441c-96ed-288eb8a8e75a	rescue	en	section_2_content	text	Duration: Typically 3 days including pool and open water sessions. Prerequisite: EFR (or equivalent) and Open Water certification.	seed-script	2026-03-28 14:22:37.579329+00	2026-03-28 14:24:16.617176+00
00452f93-e18a-4c79-95a0-6ec5118644fe	rescue	en	section_3_title	text	Inclusions	seed-script	2026-03-28 14:22:37.579329+00	2026-03-28 14:24:16.617176+00
f3227a86-16a9-4827-b7da-befd5c372ba8	discover-scuba	en	faq_3_answer	text	You will receive a short orientation, safety briefing and basic skills coaching before going for your first open water dive with your instructor.	seed-script	2026-03-28 14:22:37.204447+00	2026-03-28 16:44:59.316524+00
aab0e6fa-a90e-4109-b0ec-40e883671378	discover-scuba	en	faq_3_question	text	What can I expect on the day?	seed-script	2026-03-28 14:22:37.204447+00	2026-03-28 16:44:59.316524+00
d72f6eda-b876-4640-8124-759a02adc517	discover-scuba	en	faq_4_answer	text	Deluxe is an extended experience with extra dives and more underwater time, ideal if you want a deeper introduction before starting Open Water.	seed-script	2026-03-28 14:22:37.204447+00	2026-03-28 16:44:59.316524+00
c64ec2d3-54d7-42b6-a3de-2ea27780bf18	discover-scuba	en	faq_4_question	text	What is the DSD Deluxe option?	seed-script	2026-03-28 14:22:37.204447+00	2026-03-28 16:44:59.316524+00
5cf806b0-6c15-42ba-9a76-3354dfb5e503	discover-scuba	en	section_1_content	text	Step 1: Briefing and skills in confined water\nStep 2: First open water dive with close supervision	seed-script	2026-03-28 14:22:37.204447+00	2026-03-28 16:44:59.316524+00
fc7e46c2-76e3-4a86-83f7-a9e51c6028e4	discover-scuba	en	section_2_content	text	Certified scuba dive professional\nUse of all scuba equipment\nMaximum 4 guests per instructor group\nOption to add extra dives	seed-script	2026-03-28 14:22:37.204447+00	2026-03-28 16:44:59.316524+00
3b7611df-7997-4b67-85d2-f27266d8dffc	advanced	nl	course_overview	text	De PADI Advanced Open Water-cursus verbetert je onderwatervaardigheden door middel van praktijkduiken. Inclusief Deep, Navigation, Peak Performance Buoyancy en twee keuzevakken zoals Night of Wreck diving.	seed-script	2026-03-19 10:59:35.022677+00	2026-03-28 14:24:15.888987+00
04557acd-02bb-4163-9e35-a34df4ffdb19	advanced	nl	price_thb	text	9500	seed-script	2026-03-28 14:22:36.581793+00	2026-03-28 14:24:15.888987+00
5ff6a034-5ebd-4d51-ad40-396e73d000fc	advanced	nl	price_usd	text	275	seed-script	2026-03-28 14:22:36.581793+00	2026-03-28 14:24:15.888987+00
2c599def-cc87-43f9-9bc3-032b1be8955f	advanced	nl	price_eur	text	250	seed-script	2026-03-28 14:22:36.581793+00	2026-03-28 14:24:15.888987+00
85505fce-decf-46ab-a62a-7ba2ab6318a9	advanced	nl	duration	text	2 dagen	seed-script	2026-03-28 14:22:36.581793+00	2026-03-28 14:24:15.888987+00
14c9b450-bca8-44dd-b7ff-d8fbee308fd2	advanced	nl	section_1_title	text	Wat je doet	seed-script	2026-03-28 14:22:36.581793+00	2026-03-28 14:24:15.888987+00
5c995f8b-39e7-481d-a075-2f308d082b83	advanced	nl	section_1_content	text	5 adventureduiken (kan in 2-3 dagen)\nOefenen van diepduiktechnieken en navigatie\nVerbeteren van drijfvermogen en comfort onder water\nKies keuzevakken: Night, Wreck, Fish ID, Fotografie, etc.	seed-script	2026-03-28 14:22:36.581793+00	2026-03-28 14:24:15.888987+00
cd69ec10-3d53-4079-a15c-21363b4dd3d8	advanced	nl	section_2_title	text	Vereisten	seed-script	2026-03-28 14:22:36.581793+00	2026-03-28 14:24:15.888987+00
00480ad4-c08f-448c-ad4c-11c3213168cd	advanced	nl	section_2_content	text	Open Water Diver-brevet (of gelijkwaardig) en minimumleeftijd van 12 jaar.	seed-script	2026-03-28 14:22:36.581793+00	2026-03-28 14:24:15.888987+00
201cb9e5-275b-4c4a-9ba0-83b3bb5cb1e6	advanced	nl	section_3_title	text	Inbegrepen	seed-script	2026-03-28 14:22:36.581793+00	2026-03-28 14:24:15.888987+00
e26444dc-8510-4cb1-a4e2-d5975404fda3	advanced	nl	section_3_content	text	Lesmateriaal en PADI-certificering\nHuur van alle uitrusting\nBootkosten waar van toepassing\nProfessionele instructie	seed-script	2026-03-28 14:22:36.581793+00	2026-03-28 14:24:15.888987+00
e72a33d8-f218-45a0-b7b9-ad9e9725c9ba	advanced	nl	faq_1_question	text	Moet ik een test doen?	seed-script	2026-03-28 14:22:36.581793+00	2026-03-28 14:24:15.888987+00
93e6fd59-9f8b-4c94-986b-f2d395a5f16c	advanced	nl	faq_1_answer	text	Geen examen vereist! De Advanced-cursus draait helemaal om ervaring en praktijk.	seed-script	2026-03-28 14:22:36.581793+00	2026-03-28 14:24:15.888987+00
8edc2d69-1913-4c31-a8c6-879e50af2340	advanced	nl	faq_2_question	text	Kan ik mijn Adventure Dives kiezen?	seed-script	2026-03-28 14:22:36.581793+00	2026-03-28 14:24:15.888987+00
e69f4bfa-e137-40dd-ab8d-f1f61f5be0b6	advanced	nl	faq_2_answer	text	Deep en Navigation zijn verplicht. Je kiest 3 keuzevakken uit opties zoals Night, Wreck, Peak Performance Buoyancy, Fish ID, en meer.	seed-script	2026-03-28 14:22:36.581793+00	2026-03-28 14:24:15.888987+00
e23628ba-caf0-4a35-8c6f-fd4089ca8c27	scuba-diver	en	hero_subtitle	text	Experience the underwater world with confidence. The PADI Scuba Diver course is perfect for those who want to try scuba diving before committing to full certification.	seed-script	2026-03-12 14:56:23.775431+00	2026-03-28 14:24:15.888987+00
e87b47e1-184c-4c8e-8d13-6ce8188856fd	scuba-diver	en	course_overview	text	The PADI Scuba Diver course introduces you to the underwater world in a fun and relaxed way. You'll learn basic scuba diving skills and explore shallow reefs, giving you the confidence to continue your diving journey. This course serves as an introduction to scuba diving and can lead to full Open Water certification.	seed-script	2026-03-12 14:56:23.775431+00	2026-03-28 14:24:15.888987+00
944fe760-7ab7-4b4c-a989-4e7364d09b2b	scuba-diver	en	price_thb	text	8500	seed-script	2026-03-12 14:56:23.775431+00	2026-03-28 14:24:15.888987+00
1258e780-4378-4e70-bd72-69d61a1b784b	scuba-diver	en	section_1_title	text	What you'll learn	seed-script	2026-03-28 14:22:36.581793+00	2026-03-28 14:24:15.888987+00
0c0feab7-7ea2-40a5-a8fe-7c63c361ef03	scuba-diver	en	section_1_content	text	Basic scuba diving theory and physics\nProper use of scuba equipment\nFundamental diving skills and safety procedures\nUnderwater communication and buddy system\nShallow water exploration and reef appreciation\nEnvironmental awareness and marine conservation	seed-script	2026-03-28 14:22:36.581793+00	2026-03-28 14:24:15.888987+00
7c4b0cb2-2a40-4862-b89a-3ea56675630b	scuba-diver	en	section_2_title	text	Course structure	seed-script	2026-03-28 14:22:36.581793+00	2026-03-28 14:24:15.888987+00
9a5f6f5d-cdea-4063-945b-a901b29fcd7e	scuba-diver	en	section_2_content	text	The course includes classroom sessions, confined water training, and open water dives. You'll complete 2 open water dives in waters no deeper than 12 meters (40 feet), making it accessible for most people.	seed-script	2026-03-28 14:22:36.581793+00	2026-03-28 14:24:15.888987+00
c2fba529-066e-46b2-b0fe-d2fdf849cf7c	scuba-diver	en	section_3_title	text	Why choose Scuba Diver?	seed-script	2026-03-28 14:22:36.581793+00	2026-03-28 14:24:15.888987+00
c0a67e89-da42-4395-9786-406cadffb6ed	scuba-diver	en	section_3_content	text	Shorter commitment than full Open Water course\nPerfect introduction to scuba diving\nCan be upgraded to Open Water certification\nFun and relaxed learning environment\nExplore beautiful Koh Tao reefs	seed-script	2026-03-28 14:22:36.581793+00	2026-03-28 14:24:15.888987+00
3828c23f-d1a6-40be-a1d7-d143ca80e4d3	scuba-diver	nl	course_overview	text	De PADI Scuba Diver-cursus laat je op een leuke en ontspannen manier kennismaken met de onderwaterwereld. Je leert basisvaardigheden voor duiken en verkent ondiepe riffen, zodat je met vertrouwen verder kunt in je duikavontuur. Deze cursus is een introductie tot duiken en kan worden opgewaardeerd naar volledige Open Water-certificering.	seed-script	2026-03-12 14:55:52.765748+00	2026-03-28 14:24:15.888987+00
03af01be-80ce-4b82-b72f-95563f1a6e38	scuba-diver	nl	duration	text	2-3 dagen	seed-script	2026-03-12 14:55:52.765748+00	2026-03-28 14:24:15.888987+00
0e4782a1-72f3-4404-952c-22272137cd0c	htms-sattakut	en	quick_facts_location	text	Between islands	\N	2026-03-27 13:40:10.789117+00	2026-03-28 20:54:03.477122+00
0ac5aa44-b2fb-400c-a5a6-9c8b02fef403	htms-sattakut	en	quick_facts_best_time	text	Year-round, best during dry season	\N	2026-03-27 13:40:10.789117+00	2026-03-28 20:54:03.477122+00
55ac80b6-039b-49ce-85fa-015d6cddd006	htms-sattakut	en	what_you_can_see	text	Wreck Exploration Marine Life Swim-throughs Historical Significance	\N	2026-03-27 13:40:10.789117+00	2026-03-28 20:54:03.477122+00
f62a7064-8f45-4baf-a02e-9e41f2c7af52	discover-scuba	nl	hero_title	text	Discover Scuba Diving (DSD)	seed-script	2026-03-28 13:10:40.754266+00	2026-03-28 14:24:16.326594+00
19d5ed8f-e9ba-437e-a7ea-45c4dba18396	discover-scuba	nl	section_1_title	text	Hoe werkt het?	seed-script	2026-03-28 14:22:37.204447+00	2026-03-28 14:24:16.326594+00
ea8a6d93-5d2b-4996-a34c-9237fffbcc84	discover-scuba	nl	section_1_content	text	Stap 1: Briefing en basisvaardigheden in beschut water\nStap 2: Eerste buitenwaterduik onder directe begeleiding	seed-script	2026-03-28 14:22:37.204447+00	2026-03-28 14:24:16.326594+00
dfa135d6-0342-477f-803d-c6ebfc5807aa	discover-scuba	nl	section_2_title	text	Wat is inbegrepen?	seed-script	2026-03-28 14:22:37.204447+00	2026-03-28 14:24:16.326594+00
b743e1e4-b189-41ab-ae38-ff91700c33d1	discover-scuba	en	faq_1_question	text	What is Discover Scuba Diving (DSD)?	seed-script	2026-03-28 14:22:37.204447+00	2026-03-28 16:44:59.316524+00
64517512-5063-4446-b93e-af4dcf91f43c	discover-scuba	nl	section_2_content	text	Gecertificeerde duikprofessional\nGebruik van alle duikuitrusting\nMaximaal 4 deelnemers per instructeursgroep\nMogelijkheid om extra duiken toe te voegen	seed-script	2026-03-28 14:22:37.204447+00	2026-03-28 14:24:16.326594+00
7612c148-d298-4c55-b2de-5ebaefa455fc	discover-scuba	nl	faq_1_question	text	Wat is Discover Scuba Diving (DSD)?	seed-script	2026-03-28 14:22:37.204447+00	2026-03-28 14:24:16.326594+00
3255d5d3-95f2-4893-9ae5-4802994372a1	discover-scuba	nl	faq_1_answer	text	DSD is een beginnerservaring waarmee niet-gecertificeerde duikers in een gecontroleerde, veilige omgeving kunnen kennismaken met duiken voordat ze een volledige cursus volgen.	seed-script	2026-03-28 14:22:37.204447+00	2026-03-28 14:24:16.326594+00
a4d2908d-8d15-4d90-a9c0-b081019108f6	discover-scuba	nl	faq_2_question	text	Heb ik een brevet nodig om mee te doen?	seed-script	2026-03-28 14:22:37.204447+00	2026-03-28 14:24:16.326594+00
f82d0d8a-b03a-477c-85ef-cfa5591076d8	discover-scuba	nl	faq_2_answer	text	Nee. DSD is juist bedoeld voor beginners en mensen die nog nooit hebben gedoken.	seed-script	2026-03-28 14:22:37.204447+00	2026-03-28 14:24:16.326594+00
3a13343c-6f95-4dc5-a7f5-184dc97524bb	discover-scuba	nl	faq_3_question	text	Wat kan ik op de dag zelf verwachten?	seed-script	2026-03-28 14:22:37.204447+00	2026-03-28 14:24:16.326594+00
a4ea3d30-58c1-4792-a6f7-f3661532fc4d	discover-scuba	nl	faq_4_question	text	Wat is de DSD Deluxe-optie?	seed-script	2026-03-28 14:22:37.204447+00	2026-03-28 14:24:16.326594+00
d7f001bc-665a-4d0c-aaa8-ce0185925390	discover-scuba	nl	faq_4_answer	text	Deluxe is een uitgebreidere ervaring met extra duiken en meer tijd onder water, ideaal als je daarna mogelijk verder wilt met Open Water.	seed-script	2026-03-28 14:22:37.204447+00	2026-03-28 14:24:16.326594+00
c3f17ca1-3085-487f-8483-0b0a49b37d6e	rescue	en	hero_subtitle	text	Develop the skills and confidence to manage dive emergencies and assist others. The Rescue Diver course is an important step for all serious divers.	seed-script	2026-03-28 14:22:37.204447+00	2026-03-28 14:24:16.326594+00
83a707c3-fe65-42d5-82e5-678cef3916db	rescue	en	main	text	The Rescue Diver course teaches you to prevent and manage diving emergencies, perform rescues and work confidently as part of a dive team.	seed-script	2026-03-28 14:24:16.326594+00	2026-03-28 14:24:16.326594+00
c54c6688-132e-4d0d-887c-21d0f7ca6184	rescue	en	price_thb	text	10000	seed-script	2026-03-28 14:22:37.204447+00	2026-03-28 14:24:16.326594+00
66476e63-27b5-4572-b373-a73c9143219e	rescue	en	price_usd	text	290	seed-script	2026-03-28 14:22:37.204447+00	2026-03-28 14:24:16.326594+00
7cae873e-3025-4523-870d-b0c1d04b240b	rescue	en	section_3_content	text	Course materials and certification\nRescue skills training in pool and open water\nAll equipment rental	seed-script	2026-03-28 14:22:37.579329+00	2026-03-28 14:24:16.617176+00
c8c62430-966f-40c2-859b-21b52f1dd913	rescue	en	faq_1_question	text	Is Rescue difficult?	seed-script	2026-03-28 14:22:37.579329+00	2026-03-28 14:24:16.617176+00
b233ebb7-ee87-4b2b-bdcc-c74e50a8b6b3	rescue	en	faq_1_answer	text	The course is challenging but instructors support you step-by-step. Good fitness and comfort in the water help.	seed-script	2026-03-28 14:22:37.579329+00	2026-03-28 14:24:16.617176+00
5a49d6e4-731d-450b-aaff-8037ec2c4f00	rescue	nl	hero_subtitle	text	Ontwikkel de vaardigheden en het vertrouwen om duiknoodsituaties te beheersen en anderen te helpen. De Rescue Diver-cursus is een belangrijke stap voor serieuze duikers.	seed-script	2026-03-14 11:19:45.578131+00	2026-03-28 14:24:16.617176+00
1b939feb-cccc-4c10-8feb-cbe4a6a69b05	rescue	nl	course_overview	text	De Rescue Diver-cursus leert je duiknoodsituaties te voorkomen en te beheersen, reddingen uit te voeren en met vertrouwen als onderdeel van een duikteam te werken.	seed-script	2026-03-14 11:19:45.578131+00	2026-03-28 14:24:16.617176+00
10e64cff-49d9-4632-8e25-dc4884b0961b	rescue	nl	price_eur	text	265	seed-script	2026-03-14 11:19:45.578131+00	2026-03-28 14:24:16.617176+00
4e37dfd3-548f-4830-b51c-2f4800618ded	rescue	nl	duration	text	3 dagen	seed-script	2026-03-14 11:19:45.578131+00	2026-03-28 14:24:16.617176+00
2893567f-4b60-4f14-b667-3f1f23a51a44	rescue	nl	section_1_title	text	Behandelde vaardigheden	seed-script	2026-03-28 14:22:37.579329+00	2026-03-28 14:24:16.617176+00
65a64f05-d2e8-496d-9039-1d7d602b5fe7	rescue	nl	section_1_content	text	Zelfredding en herkennen van duikerstress\nReddingsscenario's en technieken\nNoodmanagement en uitrusting\nReddingsbeademing en slachtofferzorg	seed-script	2026-03-28 14:22:37.579329+00	2026-03-28 14:24:16.617176+00
f4ebefa7-737b-4419-9c2a-005f73330b37	rescue	nl	section_2_title	text	Opbouw en vereisten vooraf	seed-script	2026-03-28 14:22:37.579329+00	2026-03-28 14:24:16.617176+00
f533994f-4c37-4378-b1d7-ea975dfeb8e1	rescue	nl	section_2_content	text	Duur: meestal 3 dagen met zwembad- en buitenwatersessies. Vereist: EFR (of gelijkwaardig) en een Open Water-brevet.	seed-script	2026-03-28 14:22:37.579329+00	2026-03-28 14:24:16.617176+00
e4960fc1-d343-4cba-ac66-0937b0d90172	rescue	nl	section_3_title	text	Inbegrepen	seed-script	2026-03-28 14:22:37.579329+00	2026-03-28 14:24:16.617176+00
dfa8e9a9-1288-454d-82a6-9b1c093e29c6	rescue	nl	section_3_content	text	Lesmateriaal en certificering\nReddingsvaardigheidstraining in zwembad en buitenwater\nHuur van alle uitrusting	seed-script	2026-03-28 14:22:37.579329+00	2026-03-28 14:24:16.617176+00
96ff3e9b-5b98-4f71-8298-63a0bfe881a1	rescue	nl	faq_1_question	text	Is Rescue moeilijk?	seed-script	2026-03-28 14:22:37.579329+00	2026-03-28 14:24:16.617176+00
2c963379-49c9-4092-ab07-c8055ffbe940	rescue	nl	faq_1_answer	text	De cursus is uitdagend, maar instructeurs begeleiden je stap voor stap. Een goede conditie en comfort in het water helpen.	seed-script	2026-03-28 14:22:37.579329+00	2026-03-28 14:24:16.617176+00
ed31f6c1-cb0d-4871-b4ac-28a329441372	medical-services	nl	important_list	text	Regel een reis- en zorgverzekering voordat je aankomt\nMalariapreventie kan zinvol zijn - overleg met een arts\nDe zon is sterk - gebruik zonnebrand met hoge SPF\nUitdroging komt vaak voor - drink voldoende water	\N	2026-03-28 13:46:34.702478+00	2026-03-28 14:56:21.792803+00
9c18215b-9729-4e36-8254-33cd1d981874	medical-services	nl	important_title	text	Belangrijke informatie	\N	2026-03-28 13:46:34.702478+00	2026-03-28 14:56:21.792803+00
2b21dce5-ad8c-41e2-8633-67065892d8e8	medical-services	nl	insurance	text	Een goede reisverzekering wordt sterk aangeraden. Neem noodzakelijke medicijnen op recept zelf mee, beschikbaarheid kan beperkt zijn.	\N	2026-03-28 13:46:34.702478+00	2026-03-28 14:56:21.792803+00
44a2a0ab-ae4c-49cb-a3dd-ab1c3e155ec7	medical-services	nl	title	text	Medische zorg op Koh Tao	\N	2026-03-28 13:46:34.702478+00	2026-03-28 14:56:21.792803+00
39684071-66f8-4d8d-a46c-81dfcc3ad8ed	fun-diving	nl	fun_diving_expert_title	text	Expert Dive Professionals	\N	2026-03-28 13:10:40.754266+00	2026-03-30 11:23:47.936366+00
fc740a93-733e-44ec-8e25-e66ff7c0de5a	discover-scuba	en	faq_1_answer	text	DSD is a beginner experience that allows non-certified divers to try scuba diving in a controlled and supervised environment before committing to a full course.	seed-script	2026-03-28 14:22:37.204447+00	2026-03-28 16:44:59.316524+00
063a2aa4-b2df-414c-a261-7ecd4c4cc40c	discover-scuba	en	faq_2_answer	text	No. DSD is specifically designed for first-time divers and beginners.	seed-script	2026-03-28 14:22:37.204447+00	2026-03-28 16:44:59.316524+00
3a208b92-9b09-4cc2-821b-8254a1cf0e81	discover-scuba	en	faq_2_question	text	Do I need a certification to join DSD?	seed-script	2026-03-28 14:22:37.204447+00	2026-03-28 16:44:59.316524+00
c98e6ab7-ad85-4097-90c2-80fa7aa3668e	fun-diving	nl	fun_diving_flexible_body	text	We run two dive trips a day - morning and afternoon - on our spacious customized dive boats. After an exhilarating day of diving, unwind with refreshing drinks and share your incredible underwater experiences over a stunning sunset.	\N	2026-03-28 13:10:40.754266+00	2026-03-30 11:23:47.936366+00
469d379a-e906-43f5-9679-a8de9ed320a4	fun-diving	nl	fun_diving_flexible_title	text	Flexible Schedule	\N	2026-03-19 11:41:03.125014+00	2026-03-30 11:23:47.936366+00
eb146898-fe33-4477-b8b9-e7563022a474	fun-diving	nl	fun_diving_hero_cta	text	Go Fun Diving Koh Tao	\N	2026-03-28 13:10:40.754266+00	2026-03-30 11:23:47.936366+00
b8d5c3a4-c540-42b3-a864-83df2269e8c8	fun-diving	nl	fun_diving_hero_cta2	text	Book a Course	\N	2026-03-28 13:10:40.754266+00	2026-03-30 11:23:47.936366+00
7142d169-acf5-4921-80a3-759340672b79	fun-diving	nl	fun_diving_hero_subtitle	text	Experience the best of Koh Tao's underwater world with our professionally guided fun dive trips. Discover colorful coral reefs, meet amazing marine life, and make unforgettable memories.	\N	2026-03-28 13:10:40.754266+00	2026-03-30 11:23:47.936366+00
7625db55-dbe1-417b-b898-42f2911f7a32	htms-sattakut	en	overview	text	HTMS Sattakut is a fascinating WWII-era ex-US Navy vessel deliberately sunk in 2011 to create an artificial reef. This 30-meter long wreck lies between Koh Tao and Koh Nang Yuan at depths of 18-30 meters. The wreck has become a thriving artificial reef, completely covered in corals and home to a diverse array of marine life. The ship's structure provides excellent swim-through opportunities, from the engine room to the bridge. Large groupers, snappers, and barracuda now call this wreck home, and it's become a premier wreck diving destination in Southeast Asia. tets	\N	2026-03-27 13:40:10.789117+00	2026-03-28 20:54:03.477122+00
98b4cd95-a0c0-4570-b205-d855dbe8060c	htms-sattakut	en	quick_facts_depth	text	18-30m	\N	2026-03-27 13:40:10.789117+00	2026-03-28 20:54:03.477122+00
b4f31a9a-e0a4-4159-9d33-fc6872a5bcc2	htms-sattakut	en	quick_facts_difficulty	text	Advanced	\N	2026-03-27 13:40:10.789117+00	2026-03-28 20:54:03.477122+00
d3ca836b-0d59-439a-8d27-112325078ca0	htms-sattakut	en	marine_life_highlights	text	Malabar Groupers (resident) Giant Barracuda Snapper and Fusilier schools Moray Eels Lionfish and scorpionfish Coral growth on wreck structure Various reef fish species Puffers and triggerfish	\N	2026-03-27 13:40:10.789117+00	2026-03-28 20:54:03.477122+00
efe16dd9-f9e9-46e5-bcdd-22d0959118be	fun-diving	nl	fun_diving_marine_life_title	text	Diverse Marine Life	\N	2026-03-19 11:40:33.007131+00	2026-03-30 11:23:47.936366+00
6cb338a6-0887-4418-bd38-1b79e3d688b3	fun-diving	nl	fun_diving_marine_tab_title	text	Discover the Underwater World	\N	2026-03-28 13:10:40.754266+00	2026-03-30 11:23:47.936366+00
e5e2cc48-5035-42c1-9a63-aee3a1ce32d8	south-west-pinnacle	en	what_you_can_see	text	Whale sharks Bryde's whales Giant barracuda Spanish mackerel	\N	2026-03-27 13:40:10.789117+00	2026-03-28 20:54:03.477122+00
db9106fd-107e-4be2-85b1-e2c6b6bcc49a	shark-island	en	images	text	/images/sharkisand.jpg /images/blacktip-reef-shark.jpg	\N	2026-03-27 16:24:21.72643+00	2026-03-28 20:52:28.810735+00
a4ca0603-cc1c-4b1d-9340-6c605a5d2821	shark-island	en	what_you_can_see	text	Sea Fans Dynamic Sea Whips Black Tip Reef Sharks Tropical Fish	\N	2026-03-27 13:40:10.789117+00	2026-03-31 17:53:58.616512+00
ccd70a92-bcf3-4397-850c-94dea0e76435	shark-island	en	marine_life_highlights	text	Black-tip Reef Sharks Diverse reef fish Gorgonian sea fans Soft tree corals Anthias and anthias Parrotfish and wrasse Moray eels Nudibranchs and invertebrates	\N	2026-03-27 13:40:10.789117+00	2026-03-31 17:53:58.616512+00
60b01a55-43ac-47ff-a94c-6fc8a0ece4b4	shark-island	en	diving_tips	text	Suitable for all certification levels Excellent for underwater photography Look for sharks in the blue water above the reef Explore the coral formations carefully Great for marine life observation Perfect for extended dives Good site for practicing photography techniques Conserve energy for the return swim	\N	2026-03-27 13:40:10.789117+00	2026-03-31 17:53:58.616512+00
a97dc56c-0df3-4e9d-b36f-72429817614f	chumphon-pinnacle	en	quick_facts_difficulty	text	Advanced	\N	2026-03-27 13:40:10.789117+00	2026-04-04 10:11:01.553119+00
f93a3bb5-407d-4489-82bc-9c3b991d0d64	admin-finance	en	default_currency	text	USD	\N	2026-03-28 18:33:20.274249+00	2026-04-01 15:46:59.715749+00
949ffc0b-1a6b-43d0-ae54-58e318b071d9	admin-finance	en	paypal_link	text	https://paypal.me/prodivingasia	\N	2026-03-28 18:33:20.274249+00	2026-04-01 15:47:10.473571+00
0ae4a1b5-3b03-4d3d-85f3-8863551fb98d	admin-finance	en	course_deposit_rate	text	5	\N	2026-03-28 18:33:20.274249+00	2026-04-01 15:47:10.473571+00
3ef8e382-6f34-44bb-8733-22896d580e6a	admin-finance	en	default_deposit_amount	text	2000	\N	2026-03-28 18:33:20.274249+00	2026-04-01 15:47:10.473571+00
8a05ec15-2671-4040-a369-a451dc16b769	admin-finance	en	bank_transfer_details	textarea	hello	\N	2026-03-28 18:33:20.274249+00	2026-04-01 15:47:10.473571+00
f2278559-b2e3-44e7-918e-c969c6aff6a5	chumphon-pinnacle	en	quick_facts_depth	text	15-30m	\N	2026-03-27 13:40:10.789117+00	2026-04-04 10:11:01.553119+00
c73228a8-efe3-48c0-99b0-01bbc29cbef3	chumphon-pinnacle	en	images	text	/images/chumphon-pinnacle-top.webp /images/photo-1682686580849-3e7f67df4015.avif /images/photo-1613853250147-2f73e55c1561.avif /images/photo-1618865181016-a80ad83a06d3.avif /images/photo-1647825194145-2d94e259c745.avif /images/photo-1659518893171-b15e20a8e201.avif /images/photo-1682687982423-295485af248a.avif	\N	2026-03-27 14:44:46.785028+00	2026-03-28 20:53:36.669148+00
5e3b4408-0680-4afc-b98d-d54cf833aed0	south-west-pinnacle	en	overview	text	South West Pinnacle is a deep offshore dive site made up of multiple granite pinnacles and boulders rising from the seabed. Located 30-40 minutes from Koh Tao, it is known for exciting blue-water encounters and strong pelagic potential. The site often features schools of barracuda, trevally, and mackerel, with occasional visits from whale sharks and Bryde's whales. Due to depth and current exposure, it offers a rewarding challenge for experienced divers..	\N	2026-03-27 13:40:10.789117+00	2026-03-31 17:55:41.76794+00
d14639ce-4451-4105-bfa8-a75b8cbfaf69	south-west-pinnacle	en	quick_facts_best_time	text	Year-round, best in calm season	\N	2026-03-27 13:40:10.789117+00	2026-03-31 17:55:41.76794+00
2e7537e2-331f-4037-ad5e-865e017188e8	south-west-pinnacle	en	marine_life_highlights	text	Occasional whale shark encounters Bryde's whales in favorable seasonal windows Large schools of barracuda and mackerel Trevally, reef fish, and hunting pelagics in current lines	\N	2026-03-27 13:40:10.789117+00	2026-03-31 17:55:41.76794+00
3cd94a29-0326-4ad9-a4f3-772558b75a65	south-west-pinnacle	en	diving_tips	text	Best suited for advanced divers with deep and drift experience Use delayed SMB and stay with the group during ascent Plan gas carefully due to depth and current exposure Listen closely to briefing because entry and pickup can vary by conditions	\N	2026-03-27 13:40:10.789117+00	2026-03-31 17:55:41.76794+00
bfbd776c-f947-4537-a7cc-21f5014fefc6	dive-sites/chumphon-pinnacle	en	images	text	/images/chumphon-pinnacle-top.webp /images/photo-1682686580849-3e7f67df4015.avif /images/photo-1613853250147-2f73e55c1561.avif /images/photo-1618865181016-a80ad83a06d3.avif /images/photo-1647825194145-2d94e259c745.avif /images/photo-1659518893171-b15e20a8e201.avif /images/photo-1682687982423-295485af248a.avif	\N	2026-03-28 20:43:16.430069+00	2026-03-28 20:47:03.618356+00
8336ba7d-e66c-4ec8-a72f-f2125bf8e181	south-west-pinnacle	en	images	text	/images/photo-1682686580849-3e7f67df4015.avif	\N	2026-03-27 16:24:21.72643+00	2026-03-28 20:54:03.477122+00
714299ef-df84-4681-8d58-359ac29be98a	dive-sites/chumphon-pinnacle	en	overview	text	Chumphon Pinnacle is one of Koh Tao's most spectacular deep dive sites, located 30 minutes offshore. This granite pinnacle rises dramatically from the deep ocean floor, creating a natural cleaning station for large marine life. The site is particularly famous for its reliable whaleshark sightings, with these gentle giants often cruising the depths. Massive schools of trevally and chevron barracuda create mesmerizing displays, while eagle rays and other pelagics add to the excitement. The pinnacle's structure provides excellent swim-through opportunities and superb photographic subjects.\n dssfd	\N	2026-03-28 20:43:16.430069+00	2026-03-28 20:54:03.477122+00
384d5bc6-a416-4f11-9baa-7845e2ff183b	dive-sites/chumphon-pinnacle	en	quick_facts_depth	text	15-30m	\N	2026-03-28 20:43:16.430069+00	2026-03-28 20:54:03.477122+00
6a247a9b-1bed-4315-8073-078462e1c4c5	chumphon-pinnacle	en	quick_facts_location	text	30 minutes offshore	\N	2026-03-27 13:40:10.789117+00	2026-04-04 10:11:01.553119+00
efdcca35-f28e-45d7-96aa-3db37f181878	chumphon-pinnacle	en	quick_facts_best_time	text	Year-round, peak season December-April	\N	2026-03-27 13:40:10.789117+00	2026-04-04 10:11:01.553119+00
8dd5840e-4066-4ca9-917f-797468e7e84f	chumphon-pinnacle	en	what_you_can_see	text	Whalesharks Trevally Schools Eagle Rays Chevron Barracuda	\N	2026-03-27 13:40:10.789117+00	2026-04-04 10:11:01.553119+00
6e43fd2e-979b-4881-81f6-9087572fdc3c	chumphon-pinnacle	en	marine_life_highlights	text	Whalesharks (regular sightings) Giant Trevally schools Chevron Barracuda Eagle Rays Scad and Fusilier schools Giant Barracuda Kingfish Various reef fish species	\N	2026-03-27 13:40:10.789117+00	2026-04-04 10:11:01.553119+00
528ae0fe-d9cd-4f83-b843-67cd97d38782	chumphon-pinnacle	en	diving_tips	text	Advanced certification recommended due to depth and current Early morning departures maximize wildlife sightings Wide-angle photography lens recommended for large subjects Stay with your dive guide in moderate currents Perfect for deep diving specialty courses Whalesharks are most active during incoming tides Bring a good quality underwater camera	\N	2026-03-27 13:40:10.789117+00	2026-04-04 10:11:01.553119+00
05faf1d0-0fb7-4b09-9928-c7b9480ad993	chumphon-pinnacle	en	overview	text	Chumphon Pinnacle is one of Koh Tao's most spectacular deep dive sites, located 30 minutes offshore. This granite pinnacle rises dramatically from the deep ocean floor, creating a natural cleaning station for large marine life. The site is particularly famous for its reliable whaleshark sightings, with these gentle giants often cruising the depths. Massive schools of trevally and chevron barracuda create mesmerizing displays, while eagle rays and other pelagics add to the excitement. The pinnacle's structure provides excellent swim-through opportunities and superb photographic subjects.	\N	2026-03-27 13:40:10.789117+00	2026-04-04 10:11:01.553119+00
\.


--
-- TOC entry 4697 (class 0 OID 25261)
-- Dependencies: 405
-- Data for Name: page_metadata; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.page_metadata (id, page_slug, has_seo, is_secured, updated_at, created_at, draft_status, published_at) FROM stdin;
fda84d82-2700-4788-8cd5-4d310e9b241a	advanced	f	f	2026-03-10 07:01:40.568787+00	2026-03-10 07:01:40.568787+00	published	\N
a22568cb-419b-4654-9448-32aa18d2f4cf	rescue	f	f	2026-03-10 07:01:40.568787+00	2026-03-10 07:01:40.568787+00	published	\N
ddbf78a0-5b2c-4304-b428-1d5238da19f5	efr	f	f	2026-03-10 07:01:40.568787+00	2026-03-10 07:01:40.568787+00	published	\N
be33cd3e-fd50-41f3-b98c-f7614c20a18e	instructor	f	f	2026-03-10 07:01:40.568787+00	2026-03-10 07:01:40.568787+00	published	\N
a3d950cf-5dbc-4380-9662-28261fe20605	discover-scuba	f	f	2026-03-10 07:01:40.568787+00	2026-03-10 07:01:40.568787+00	published	\N
8edd92af-a6e8-4c66-856b-2fafc2d9d726	scuba-review	f	f	2026-03-10 07:01:40.568787+00	2026-03-10 07:01:40.568787+00	published	\N
bcca4ebb-80c9-4185-8b8f-0fd9efc62e80	specialty/night-diver	f	f	2026-03-12 10:27:40.636663+00	2026-03-12 10:27:15.016133+00	published	\N
4c9714fc-4984-4985-bef5-281784462532	scuba-diver	f	f	2026-03-12 14:56:23.51007+00	2026-03-10 07:01:40.568787+00	published	\N
93dd98d9-61e7-45d4-95b1-4cd49f721ceb	divemaster	f	f	2026-03-12 15:13:41.601863+00	2026-03-10 07:01:40.568787+00	published	\N
224a4d53-f429-4a49-9645-6b50b9470fbe	contact	f	f	2026-03-12 16:06:25.666729+00	2026-03-12 13:34:35.733369+00	published	2026-03-12 14:31:13.822+00
5d19fbb9-0a86-42a5-a4e7-100aaeb62853	open-water	f	f	2026-03-12 17:26:17.305085+00	2026-03-10 07:01:40.568787+00	published	2026-03-12 13:54:05.22+00
cdd60d58-4524-4aa6-999f-ff05618173ca	home	t	f	2026-03-12 20:14:31.775429+00	2026-03-12 10:08:56.994737+00	published	2026-03-12 14:30:41.306+00
\.


--
-- TOC entry 4699 (class 0 OID 25296)
-- Dependencies: 407
-- Data for Name: page_security; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.page_security (id, page_slug, is_secured, require_auth, require_admin, allowed_roles, ip_whitelist, rate_limit_enabled, rate_limit_requests, rate_limit_window, csrf_protection, xss_protection, content_security_policy, updated_by, updated_at, created_at) FROM stdin;
43d1c7ff-e434-43df-a994-fddfa471c0fb	home	f	f	f	{}		t	100	60	t	t	default-src 'self'; script-src 'self' 'unsafe-inline'; style-src 'self' 'unsafe-inline';	contact@prodiving.asia	2026-03-12 20:14:31.540903+00	2026-03-12 19:58:40.816971+00
\.


--
-- TOC entry 4698 (class 0 OID 25275)
-- Dependencies: 406
-- Data for Name: page_seo; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.page_seo (id, page_slug, meta_title, meta_description, meta_keywords, canonical_url, robots, og_title, og_description, og_image, og_type, twitter_card, twitter_title, twitter_description, twitter_image, schema_type, schema_json, updated_by, updated_at, created_at) FROM stdin;
6c16d07c-91ca-44d4-a253-340236ed9652	home					index, follow				website	summary_large_image				WebPage	\N	contact@prodiving.asia	2026-03-12 14:29:23.295663+00	2026-03-12 10:08:57.187845+00
\.


--
-- TOC entry 4693 (class 0 OID 18228)
-- Dependencies: 401
-- Data for Name: profiles; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.profiles (id, full_name, phone, experience_level, created_at, updated_at) FROM stdin;
\.


--
-- TOC entry 4715 (class 0 OID 34187)
-- Dependencies: 428
-- Data for Name: project_tasks; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.project_tasks (id, title, assigned_to, status, created_at, updated_at) FROM stdin;
\.


--
-- TOC entry 4710 (class 0 OID 32095)
-- Dependencies: 423
-- Data for Name: role_change_audit; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.role_change_audit (id, action, target_user_id, role, changed_by, changed_by_email, note, created_at) FROM stdin;
8df48d46-6e70-4d92-8e28-159e229bc19a	add	d314da05-5a66-49b4-bb53-034981d83690	admin	780bcf0c-f47f-498e-a129-35583df2a8a1	contact@prodiving.asia	\N	2026-03-28 21:23:43.00832+00
33899a6b-c298-4f28-b961-188fec1bfb5a	remove	d314da05-5a66-49b4-bb53-034981d83690	admin	780bcf0c-f47f-498e-a129-35583df2a8a1	contact@prodiving.asia	\N	2026-03-28 21:29:13.753233+00
c36aa697-7f46-496d-9924-ccbdcd8b8923	add	d314da05-5a66-49b4-bb53-034981d83690	admin	780bcf0c-f47f-498e-a129-35583df2a8a1	contact@prodiving.asia	\N	2026-03-28 21:29:31.91899+00
379aa495-3e73-44e0-b71f-f9dbac341cdd	add	8f3dd95e-2571-4b71-9058-dc706c7e2ec2	admin	780bcf0c-f47f-498e-a129-35583df2a8a1	contact@prodiving.asia	\N	2026-03-28 21:42:20.69577+00
\.


--
-- TOC entry 4691 (class 0 OID 18195)
-- Dependencies: 399
-- Data for Name: user_roles; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.user_roles (id, user_id, role, created_at) FROM stdin;
9ff6f272-92d5-4c39-a8c8-c3c210098967	d314da05-5a66-49b4-bb53-034981d83690	admin	2026-03-28 21:29:31.371289+00
3b87a350-58a0-4f62-ac5f-0b9313de235d	3a679996-7773-4b9b-a3fe-93c031266ef9	admin	2026-03-28 22:01:14.901444+00
c08b8361-8e4b-4492-8cb4-1b230dc67d45	1379a8ab-4fe0-48d4-876e-b6b697c1dc46	admin	2026-04-03 20:07:18+00
\.


--
-- TOC entry 4705 (class 0 OID 27041)
-- Dependencies: 415
-- Data for Name: users; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.users (id, email, name) FROM stdin;
c08b8361-8e4b-4492-8cb4-1b230dc67d45	contact@prodiving.asia	Contact
d314da05-5a66-49b4-bb53-034981d83690	bas@divinginsia.com	bas
\.


--
-- TOC entry 4706 (class 0 OID 27122)
-- Dependencies: 416
-- Data for Name: vouchers; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.vouchers (id, booking_id, voucher_code, generated_at, generated_by, downloaded, downloaded_at, notes) FROM stdin;
\.


--
-- TOC entry 4711 (class 0 OID 32187)
-- Dependencies: 424
-- Data for Name: messages_2026_04_01; Type: TABLE DATA; Schema: realtime; Owner: supabase_admin
--

COPY realtime.messages_2026_04_01 (topic, extension, payload, event, private, updated_at, inserted_at, id) FROM stdin;
\.


--
-- TOC entry 4712 (class 0 OID 33309)
-- Dependencies: 425
-- Data for Name: messages_2026_04_02; Type: TABLE DATA; Schema: realtime; Owner: supabase_admin
--

COPY realtime.messages_2026_04_02 (topic, extension, payload, event, private, updated_at, inserted_at, id) FROM stdin;
\.


--
-- TOC entry 4713 (class 0 OID 33322)
-- Dependencies: 426
-- Data for Name: messages_2026_04_03; Type: TABLE DATA; Schema: realtime; Owner: supabase_admin
--

COPY realtime.messages_2026_04_03 (topic, extension, payload, event, private, updated_at, inserted_at, id) FROM stdin;
\.


--
-- TOC entry 4714 (class 0 OID 34151)
-- Dependencies: 427
-- Data for Name: messages_2026_04_04; Type: TABLE DATA; Schema: realtime; Owner: supabase_admin
--

COPY realtime.messages_2026_04_04 (topic, extension, payload, event, private, updated_at, inserted_at, id) FROM stdin;
\.


--
-- TOC entry 4716 (class 0 OID 35323)
-- Dependencies: 429
-- Data for Name: messages_2026_04_05; Type: TABLE DATA; Schema: realtime; Owner: supabase_admin
--

COPY realtime.messages_2026_04_05 (topic, extension, payload, event, private, updated_at, inserted_at, id) FROM stdin;
\.


--
-- TOC entry 4717 (class 0 OID 36448)
-- Dependencies: 430
-- Data for Name: messages_2026_04_06; Type: TABLE DATA; Schema: realtime; Owner: supabase_admin
--

COPY realtime.messages_2026_04_06 (topic, extension, payload, event, private, updated_at, inserted_at, id) FROM stdin;
\.


--
-- TOC entry 4718 (class 0 OID 36487)
-- Dependencies: 431
-- Data for Name: messages_2026_04_07; Type: TABLE DATA; Schema: realtime; Owner: supabase_admin
--

COPY realtime.messages_2026_04_07 (topic, extension, payload, event, private, updated_at, inserted_at, id) FROM stdin;
\.


--
-- TOC entry 4686 (class 0 OID 17267)
-- Dependencies: 390
-- Data for Name: schema_migrations; Type: TABLE DATA; Schema: realtime; Owner: supabase_admin
--

COPY realtime.schema_migrations (version, inserted_at) FROM stdin;
20211116024918	2026-02-23 16:30:45
20211116045059	2026-02-23 16:30:46
20211116050929	2026-02-23 16:30:47
20211116051442	2026-02-23 16:30:48
20211116212300	2026-02-23 16:30:49
20211116213355	2026-02-23 16:30:49
20211116213934	2026-02-23 16:30:50
20211116214523	2026-02-23 16:30:51
20211122062447	2026-02-23 16:30:52
20211124070109	2026-02-23 16:30:52
20211202204204	2026-02-23 16:30:53
20211202204605	2026-02-23 16:30:54
20211210212804	2026-02-23 16:30:56
20211228014915	2026-02-23 16:30:57
20220107221237	2026-02-23 16:30:57
20220228202821	2026-02-23 16:30:58
20220312004840	2026-02-23 16:30:59
20220603231003	2026-02-23 16:31:00
20220603232444	2026-02-23 16:31:00
20220615214548	2026-02-23 16:31:01
20220712093339	2026-02-23 16:31:02
20220908172859	2026-02-23 16:31:03
20220916233421	2026-02-23 16:31:03
20230119133233	2026-02-23 16:31:04
20230128025114	2026-02-23 16:31:05
20230128025212	2026-02-23 16:31:06
20230227211149	2026-02-23 16:31:06
20230228184745	2026-02-23 16:31:07
20230308225145	2026-02-23 16:31:08
20230328144023	2026-02-23 16:31:08
20231018144023	2026-02-23 16:31:09
20231204144023	2026-02-23 16:31:10
20231204144024	2026-02-23 16:31:11
20231204144025	2026-02-23 16:31:12
20240108234812	2026-02-23 16:31:12
20240109165339	2026-02-23 16:31:13
20240227174441	2026-02-23 16:31:14
20240311171622	2026-02-23 16:31:15
20240321100241	2026-02-23 16:31:17
20240401105812	2026-02-23 16:31:19
20240418121054	2026-02-23 16:31:20
20240523004032	2026-02-23 16:31:22
20240618124746	2026-02-23 16:31:23
20240801235015	2026-02-23 16:31:24
20240805133720	2026-02-23 16:31:24
20240827160934	2026-02-23 16:31:25
20240919163303	2026-02-23 16:31:26
20240919163305	2026-02-23 16:31:27
20241019105805	2026-02-23 16:31:27
20241030150047	2026-02-23 16:31:30
20241108114728	2026-02-23 16:31:31
20241121104152	2026-02-23 16:31:31
20241130184212	2026-02-23 16:31:32
20241220035512	2026-02-23 16:31:33
20241220123912	2026-02-23 16:31:34
20241224161212	2026-02-23 16:31:34
20250107150512	2026-02-23 16:31:35
20250110162412	2026-02-23 16:31:36
20250123174212	2026-02-23 16:31:36
20250128220012	2026-02-23 16:31:37
20250506224012	2026-02-23 16:31:38
20250523164012	2026-02-23 16:31:38
20250714121412	2026-02-23 16:31:39
20250905041441	2026-02-23 16:31:40
20251103001201	2026-02-23 16:31:40
20251120212548	2026-02-23 16:31:41
20251120215549	2026-02-23 16:31:42
20260218120000	2026-02-27 15:11:20
\.


--
-- TOC entry 4688 (class 0 OID 17289)
-- Dependencies: 393
-- Data for Name: subscription; Type: TABLE DATA; Schema: realtime; Owner: supabase_admin
--

COPY realtime.subscription (id, subscription_id, entity, filters, claims, created_at, action_filter) FROM stdin;
\.


--
-- TOC entry 4679 (class 0 OID 17086)
-- Dependencies: 383
-- Data for Name: buckets; Type: TABLE DATA; Schema: storage; Owner: supabase_storage_admin
--

COPY storage.buckets (id, name, owner, created_at, updated_at, public, avif_autodetection, file_size_limit, allowed_mime_types, owner_id, type) FROM stdin;
\.


--
-- TOC entry 4683 (class 0 OID 17206)
-- Dependencies: 387
-- Data for Name: buckets_analytics; Type: TABLE DATA; Schema: storage; Owner: supabase_storage_admin
--

COPY storage.buckets_analytics (name, type, format, created_at, updated_at, id, deleted_at) FROM stdin;
\.


--
-- TOC entry 4684 (class 0 OID 17219)
-- Dependencies: 388
-- Data for Name: buckets_vectors; Type: TABLE DATA; Schema: storage; Owner: supabase_storage_admin
--

COPY storage.buckets_vectors (id, type, created_at, updated_at) FROM stdin;
\.


--
-- TOC entry 4678 (class 0 OID 17078)
-- Dependencies: 382
-- Data for Name: migrations; Type: TABLE DATA; Schema: storage; Owner: supabase_storage_admin
--

COPY storage.migrations (id, name, hash, executed_at) FROM stdin;
0	create-migrations-table	e18db593bcde2aca2a408c4d1100f6abba2195df	2026-02-23 14:48:47.927406
1	initialmigration	6ab16121fbaa08bbd11b712d05f358f9b555d777	2026-02-23 14:48:47.962668
2	storage-schema	f6a1fa2c93cbcd16d4e487b362e45fca157a8dbd	2026-02-23 14:48:47.971387
3	pathtoken-column	2cb1b0004b817b29d5b0a971af16bafeede4b70d	2026-02-23 14:48:48.037795
4	add-migrations-rls	427c5b63fe1c5937495d9c635c263ee7a5905058	2026-02-23 14:48:48.056207
5	add-size-functions	79e081a1455b63666c1294a440f8ad4b1e6a7f84	2026-02-23 14:48:48.065742
6	change-column-name-in-get-size	ded78e2f1b5d7e616117897e6443a925965b30d2	2026-02-23 14:48:48.076601
7	add-rls-to-buckets	e7e7f86adbc51049f341dfe8d30256c1abca17aa	2026-02-23 14:48:48.086637
8	add-public-to-buckets	fd670db39ed65f9d08b01db09d6202503ca2bab3	2026-02-23 14:48:48.095546
9	fix-search-function	af597a1b590c70519b464a4ab3be54490712796b	2026-02-23 14:48:48.104584
10	search-files-search-function	b595f05e92f7e91211af1bbfe9c6a13bb3391e16	2026-02-23 14:48:48.114616
11	add-trigger-to-auto-update-updated_at-column	7425bdb14366d1739fa8a18c83100636d74dcaa2	2026-02-23 14:48:48.124339
12	add-automatic-avif-detection-flag	8e92e1266eb29518b6a4c5313ab8f29dd0d08df9	2026-02-23 14:48:48.133864
13	add-bucket-custom-limits	cce962054138135cd9a8c4bcd531598684b25e7d	2026-02-23 14:48:48.142698
14	use-bytes-for-max-size	941c41b346f9802b411f06f30e972ad4744dad27	2026-02-23 14:48:48.152921
15	add-can-insert-object-function	934146bc38ead475f4ef4b555c524ee5d66799e5	2026-02-23 14:48:48.188755
16	add-version	76debf38d3fd07dcfc747ca49096457d95b1221b	2026-02-23 14:48:48.19816
17	drop-owner-foreign-key	f1cbb288f1b7a4c1eb8c38504b80ae2a0153d101	2026-02-23 14:48:48.211479
18	add_owner_id_column_deprecate_owner	e7a511b379110b08e2f214be852c35414749fe66	2026-02-23 14:48:48.220259
19	alter-default-value-objects-id	02e5e22a78626187e00d173dc45f58fa66a4f043	2026-02-23 14:48:48.230358
20	list-objects-with-delimiter	cd694ae708e51ba82bf012bba00caf4f3b6393b7	2026-02-23 14:48:48.239147
21	s3-multipart-uploads	8c804d4a566c40cd1e4cc5b3725a664a9303657f	2026-02-23 14:48:48.24939
22	s3-multipart-uploads-big-ints	9737dc258d2397953c9953d9b86920b8be0cdb73	2026-02-23 14:48:48.267645
23	optimize-search-function	9d7e604cddc4b56a5422dc68c9313f4a1b6f132c	2026-02-23 14:48:48.286422
24	operation-function	8312e37c2bf9e76bbe841aa5fda889206d2bf8aa	2026-02-23 14:48:48.295835
25	custom-metadata	d974c6057c3db1c1f847afa0e291e6165693b990	2026-02-23 14:48:48.304744
26	objects-prefixes	215cabcb7f78121892a5a2037a09fedf9a1ae322	2026-02-23 14:48:48.313746
27	search-v2	859ba38092ac96eb3964d83bf53ccc0b141663a6	2026-02-23 14:48:48.322403
28	object-bucket-name-sorting	c73a2b5b5d4041e39705814fd3a1b95502d38ce4	2026-02-23 14:48:48.330788
29	create-prefixes	ad2c1207f76703d11a9f9007f821620017a66c21	2026-02-23 14:48:48.339231
30	update-object-levels	2be814ff05c8252fdfdc7cfb4b7f5c7e17f0bed6	2026-02-23 14:48:48.347668
31	objects-level-index	b40367c14c3440ec75f19bbce2d71e914ddd3da0	2026-02-23 14:48:48.356364
32	backward-compatible-index-on-objects	e0c37182b0f7aee3efd823298fb3c76f1042c0f7	2026-02-23 14:48:48.364756
33	backward-compatible-index-on-prefixes	b480e99ed951e0900f033ec4eb34b5bdcb4e3d49	2026-02-23 14:48:48.374757
34	optimize-search-function-v1	ca80a3dc7bfef894df17108785ce29a7fc8ee456	2026-02-23 14:48:48.383285
35	add-insert-trigger-prefixes	458fe0ffd07ec53f5e3ce9df51bfdf4861929ccc	2026-02-23 14:48:48.391808
36	optimise-existing-functions	6ae5fca6af5c55abe95369cd4f93985d1814ca8f	2026-02-23 14:48:48.400432
37	add-bucket-name-length-trigger	3944135b4e3e8b22d6d4cbb568fe3b0b51df15c1	2026-02-23 14:48:48.409033
38	iceberg-catalog-flag-on-buckets	02716b81ceec9705aed84aa1501657095b32e5c5	2026-02-23 14:48:48.418585
39	add-search-v2-sort-support	6706c5f2928846abee18461279799ad12b279b78	2026-02-23 14:48:48.432761
40	fix-prefix-race-conditions-optimized	7ad69982ae2d372b21f48fc4829ae9752c518f6b	2026-02-23 14:48:48.441422
41	add-object-level-update-trigger	07fcf1a22165849b7a029deed059ffcde08d1ae0	2026-02-23 14:48:48.451703
42	rollback-prefix-triggers	771479077764adc09e2ea2043eb627503c034cd4	2026-02-23 14:48:48.460433
43	fix-object-level	84b35d6caca9d937478ad8a797491f38b8c2979f	2026-02-23 14:48:48.469105
44	vector-bucket-type	99c20c0ffd52bb1ff1f32fb992f3b351e3ef8fb3	2026-02-23 14:48:48.478412
45	vector-buckets	049e27196d77a7cb76497a85afae669d8b230953	2026-02-23 14:48:48.487835
46	buckets-objects-grants	fedeb96d60fefd8e02ab3ded9fbde05632f84aed	2026-02-23 14:48:48.502371
47	iceberg-table-metadata	649df56855c24d8b36dd4cc1aeb8251aa9ad42c2	2026-02-23 14:48:48.512035
48	iceberg-catalog-ids	e0e8b460c609b9999ccd0df9ad14294613eed939	2026-02-23 14:48:48.520941
49	buckets-objects-grants-postgres	072b1195d0d5a2f888af6b2302a1938dd94b8b3d	2026-02-23 14:48:48.540042
50	search-v2-optimised	6323ac4f850aa14e7387eb32102869578b5bd478	2026-02-23 14:48:48.549709
51	index-backward-compatible-search	2ee395d433f76e38bcd3856debaf6e0e5b674011	2026-02-23 14:48:48.75994
52	drop-not-used-indexes-and-functions	5cc44c8696749ac11dd0dc37f2a3802075f3a171	2026-02-23 14:48:48.763134
53	drop-index-lower-name	d0cb18777d9e2a98ebe0bc5cc7a42e57ebe41854	2026-02-23 14:48:48.779763
54	drop-index-object-level	6289e048b1472da17c31a7eba1ded625a6457e67	2026-02-23 14:48:48.78483
55	prevent-direct-deletes	262a4798d5e0f2e7c8970232e03ce8be695d5819	2026-02-23 14:48:48.787793
56	fix-optimized-search-function	cb58526ebc23048049fd5bf2fd148d18b04a2073	2026-02-23 14:48:48.797755
\.


--
-- TOC entry 4680 (class 0 OID 17096)
-- Dependencies: 384
-- Data for Name: objects; Type: TABLE DATA; Schema: storage; Owner: supabase_storage_admin
--

COPY storage.objects (id, bucket_id, name, owner, created_at, updated_at, last_accessed_at, metadata, version, owner_id, user_metadata) FROM stdin;
\.


--
-- TOC entry 4681 (class 0 OID 17145)
-- Dependencies: 385
-- Data for Name: s3_multipart_uploads; Type: TABLE DATA; Schema: storage; Owner: supabase_storage_admin
--

COPY storage.s3_multipart_uploads (id, in_progress_size, upload_signature, bucket_id, key, version, owner_id, created_at, user_metadata) FROM stdin;
\.


--
-- TOC entry 4682 (class 0 OID 17159)
-- Dependencies: 386
-- Data for Name: s3_multipart_uploads_parts; Type: TABLE DATA; Schema: storage; Owner: supabase_storage_admin
--

COPY storage.s3_multipart_uploads_parts (id, upload_id, size, part_number, bucket_id, key, etag, owner_id, version, created_at) FROM stdin;
\.


--
-- TOC entry 4685 (class 0 OID 17229)
-- Dependencies: 389
-- Data for Name: vector_indexes; Type: TABLE DATA; Schema: storage; Owner: supabase_storage_admin
--

COPY storage.vector_indexes (id, name, bucket_id, data_type, dimension, distance_metric, metadata_configuration, created_at, updated_at) FROM stdin;
\.


--
-- TOC entry 4689 (class 0 OID 17454)
-- Dependencies: 397
-- Data for Name: schema_migrations; Type: TABLE DATA; Schema: supabase_migrations; Owner: postgres
--

COPY supabase_migrations.schema_migrations (version, statements, name) FROM stdin;
20260103162408	{"-- Create a table for course booking inquiries\nCREATE TABLE public.booking_inquiries (\n  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,\n  name TEXT NOT NULL,\n  email TEXT NOT NULL,\n  phone TEXT,\n  course_title TEXT NOT NULL,\n  preferred_date DATE,\n  experience_level TEXT,\n  message TEXT,\n  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()\n)","-- Enable Row Level Security\nALTER TABLE public.booking_inquiries ENABLE ROW LEVEL SECURITY","-- Allow anyone to insert booking inquiries (public form)\nCREATE POLICY \\"Anyone can submit booking inquiries\\"\nON public.booking_inquiries\nFOR INSERT\nWITH CHECK (true)","-- Only authenticated admins should read bookings (for now, allow service role only)\n-- This keeps customer data private]"}	ed9b5565-706d-4654-a958-189ff286078b
20260105031400	{"-- Create enum for app roles\nCREATE TYPE public.app_role AS ENUM ('admin', 'user')","-- Create user_roles table for admin access control\nCREATE TABLE public.user_roles (\n    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),\n    user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,\n    role app_role NOT NULL,\n    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),\n    UNIQUE (user_id, role)\n)","-- Create admin_settings table for notification email\nCREATE TABLE public.admin_settings (\n    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),\n    setting_key TEXT NOT NULL UNIQUE,\n    setting_value TEXT NOT NULL,\n    updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()\n)","-- Enable RLS on both tables\nALTER TABLE public.user_roles ENABLE ROW LEVEL SECURITY","ALTER TABLE public.admin_settings ENABLE ROW LEVEL SECURITY","-- Create security definer function to check roles\nCREATE OR REPLACE FUNCTION public.has_role(_user_id UUID, _role app_role)\nRETURNS BOOLEAN\nLANGUAGE sql\nSTABLE\nSECURITY DEFINER\nSET search_path = public\nAS $$\n  SELECT EXISTS (\n    SELECT 1\n    FROM public.user_roles\n    WHERE user_id = _user_id\n      AND role = _role\n  )\n$$","-- RLS policies for user_roles (only admins can view/manage)\nCREATE POLICY \\"Admins can view all roles\\"\nON public.user_roles\nFOR SELECT\nTO authenticated\nUSING (public.has_role(auth.uid(), 'admin'))","CREATE POLICY \\"Admins can manage roles\\"\nON public.user_roles\nFOR ALL\nTO authenticated\nUSING (public.has_role(auth.uid(), 'admin'))","-- RLS policies for admin_settings\nCREATE POLICY \\"Admins can view settings\\"\nON public.admin_settings\nFOR SELECT\nTO authenticated\nUSING (public.has_role(auth.uid(), 'admin'))","CREATE POLICY \\"Admins can manage settings\\"\nON public.admin_settings\nFOR ALL\nTO authenticated\nUSING (public.has_role(auth.uid(), 'admin'))","-- Allow admins to view booking inquiries\nCREATE POLICY \\"Admins can view booking inquiries\\"\nON public.booking_inquiries\nFOR SELECT\nTO authenticated\nUSING (public.has_role(auth.uid(), 'admin'))","-- Allow admins to delete booking inquiries\nCREATE POLICY \\"Admins can delete booking inquiries\\"\nON public.booking_inquiries\nFOR DELETE\nTO authenticated\nUSING (public.has_role(auth.uid(), 'admin'))","-- Allow admins to update booking inquiries\nCREATE POLICY \\"Admins can update booking inquiries\\"\nON public.booking_inquiries\nFOR UPDATE\nTO authenticated\nUSING (public.has_role(auth.uid(), 'admin'))"}	b503faa8-ecc1-487f-88d7-0332123e5197
20260221161938	{"-- Create a table for user profiles\nCREATE TABLE public.profiles (\n  id UUID REFERENCES auth.users ON DELETE CASCADE NOT NULL PRIMARY KEY,\n  full_name TEXT,\n  phone TEXT,\n  experience_level TEXT,\n  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),\n  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()\n)","-- Enable Row Level Security\nALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY","-- Create policies\nCREATE POLICY \\"Users can view own profile\\"\nON public.profiles FOR SELECT\nUSING (auth.uid() = id)","CREATE POLICY \\"Users can update own profile\\"\nON public.profiles FOR UPDATE\nUSING (auth.uid() = id)","CREATE POLICY \\"Users can insert own profile\\"\nON public.profiles FOR INSERT\nWITH CHECK (auth.uid() = id)","-- Create a trigger to handle updated_at\nCREATE OR REPLACE FUNCTION public.handle_updated_at()\nRETURNS TRIGGER AS $$\nBEGIN\n  NEW.updated_at = now();\n  RETURN NEW;\nEND;\n$$ LANGUAGE plpgsql","CREATE TRIGGER handle_updated_at\n  BEFORE UPDATE ON public.profiles\n  FOR EACH ROW\n  EXECUTE FUNCTION public.handle_updated_at()"}	add_user_profiles
20260310120000	{"-- Create page_metadata table for tracking page properties\nCREATE TABLE IF NOT EXISTS page_metadata (\n  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),\n  page_slug TEXT UNIQUE NOT NULL,\n  has_seo BOOLEAN DEFAULT FALSE,\n  is_secured BOOLEAN DEFAULT FALSE,\n  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),\n  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()\n)","-- Create page_seo table for SEO and meta tags\nCREATE TABLE IF NOT EXISTS page_seo (\n  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),\n  page_slug TEXT UNIQUE NOT NULL,\n  \n  -- Basic SEO\n  meta_title TEXT,\n  meta_description TEXT,\n  meta_keywords TEXT,\n  canonical_url TEXT,\n  robots TEXT DEFAULT 'index, follow',\n  \n  -- Open Graph (Facebook)\n  og_title TEXT,\n  og_description TEXT,\n  og_image TEXT,\n  og_type TEXT DEFAULT 'website',\n  \n  -- Twitter Card\n  twitter_card TEXT DEFAULT 'summary_large_image',\n  twitter_title TEXT,\n  twitter_description TEXT,\n  twitter_image TEXT,\n  \n  -- Structured Data\n  schema_type TEXT DEFAULT 'WebPage',\n  schema_json JSONB,\n  \n  -- Metadata\n  updated_by TEXT,\n  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),\n  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),\n  \n  CONSTRAINT fk_page_metadata FOREIGN KEY (page_slug) REFERENCES page_metadata(page_slug) ON DELETE CASCADE\n)","-- Create page_security table for security settings\nCREATE TABLE IF NOT EXISTS page_security (\n  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),\n  page_slug TEXT UNIQUE NOT NULL,\n  \n  -- Basic Security\n  is_secured BOOLEAN DEFAULT FALSE,\n  require_auth BOOLEAN DEFAULT FALSE,\n  require_admin BOOLEAN DEFAULT FALSE,\n  allowed_roles TEXT[],\n  \n  -- IP Whitelist\n  ip_whitelist TEXT,\n  \n  -- Rate Limiting\n  rate_limit_enabled BOOLEAN DEFAULT TRUE,\n  rate_limit_requests INTEGER DEFAULT 100,\n  rate_limit_window INTEGER DEFAULT 60,\n  \n  -- Protection\n  csrf_protection BOOLEAN DEFAULT TRUE,\n  xss_protection BOOLEAN DEFAULT TRUE,\n  content_security_policy TEXT,\n  \n  -- Metadata\n  updated_by TEXT,\n  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),\n  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),\n  \n  CONSTRAINT fk_page_metadata FOREIGN KEY (page_slug) REFERENCES page_metadata(page_slug) ON DELETE CASCADE\n)","-- Create indexes for better query performance\nCREATE INDEX IF NOT EXISTS idx_page_metadata_slug ON page_metadata(page_slug)","CREATE INDEX IF NOT EXISTS idx_page_seo_slug ON page_seo(page_slug)","CREATE INDEX IF NOT EXISTS idx_page_security_slug ON page_security(page_slug)","CREATE INDEX IF NOT EXISTS idx_page_metadata_secured ON page_metadata(is_secured)","CREATE INDEX IF NOT EXISTS idx_page_metadata_has_seo ON page_metadata(has_seo)","-- Create updated_at triggers\nCREATE OR REPLACE FUNCTION update_updated_at_column()\nRETURNS TRIGGER AS $$\nBEGIN\n  NEW.updated_at = NOW();\n  RETURN NEW;\nEND;\n$$ LANGUAGE plpgsql","CREATE TRIGGER update_page_metadata_updated_at\n  BEFORE UPDATE ON page_metadata\n  FOR EACH ROW\n  EXECUTE FUNCTION update_updated_at_column()","CREATE TRIGGER update_page_seo_updated_at\n  BEFORE UPDATE ON page_seo\n  FOR EACH ROW\n  EXECUTE FUNCTION update_updated_at_column()","CREATE TRIGGER update_page_security_updated_at\n  BEFORE UPDATE ON page_security\n  FOR EACH ROW\n  EXECUTE FUNCTION update_updated_at_column()","-- Enable Row Level Security\nALTER TABLE page_metadata ENABLE ROW LEVEL SECURITY","ALTER TABLE page_seo ENABLE ROW LEVEL SECURITY","ALTER TABLE page_security ENABLE ROW LEVEL SECURITY","-- Create policies for admin access\nCREATE POLICY \\"Allow public read access to page_metadata\\"\n  ON page_metadata FOR SELECT\n  TO public\n  USING (true)","CREATE POLICY \\"Allow public read access to page_seo\\"\n  ON page_seo FOR SELECT\n  TO public\n  USING (true)","CREATE POLICY \\"Allow authenticated users to manage page_metadata\\"\n  ON page_metadata FOR ALL\n  TO authenticated\n  USING (true)\n  WITH CHECK (true)","CREATE POLICY \\"Allow authenticated users to manage page_seo\\"\n  ON page_seo FOR ALL\n  TO authenticated\n  USING (true)\n  WITH CHECK (true)","CREATE POLICY \\"Allow authenticated users to manage page_security\\"\n  ON page_security FOR ALL\n  TO authenticated\n  USING (true)\n  WITH CHECK (true)","-- Insert initial page metadata for existing pages\nINSERT INTO page_metadata (page_slug, has_seo, is_secured) VALUES\n('open-water', FALSE, FALSE),\n('advanced', FALSE, FALSE),\n('rescue', FALSE, FALSE),\n('efr', FALSE, FALSE),\n('divemaster', FALSE, FALSE),\n('instructor', FALSE, FALSE),\n('discover-scuba', FALSE, FALSE),\n('scuba-diver', FALSE, FALSE),\n('scuba-review', FALSE, FALSE)\nON CONFLICT (page_slug) DO NOTHING","COMMENT ON TABLE page_metadata IS 'Tracks metadata and properties for all website pages'","COMMENT ON TABLE page_seo IS 'Stores SEO and meta tag configurations for pages'","COMMENT ON TABLE page_security IS 'Manages security settings and access controls for pages'"}	create_page_management_tables
20260310000000	{"-- Create page_content table for admin-editable content\nCREATE TABLE IF NOT EXISTS public.page_content (\n  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,\n  page_slug TEXT NOT NULL,\n  locale TEXT NOT NULL DEFAULT 'en',\n  section_key TEXT NOT NULL,\n  content_type TEXT NOT NULL DEFAULT 'text', -- text, richtext, html\n  content_value TEXT NOT NULL,\n  updated_by TEXT,\n  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,\n  updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,\n  \n  UNIQUE(page_slug, locale, section_key)\n)","-- Enable RLS\nALTER TABLE public.page_content ENABLE ROW LEVEL SECURITY","-- Public can read\nCREATE POLICY \\"Allow public read access to page_content\\"\n  ON public.page_content FOR SELECT\n  USING (true)","-- Only authenticated users can insert/update\nCREATE POLICY \\"Allow authenticated users to manage page_content\\"\n  ON public.page_content FOR ALL\n  USING (auth.role() = 'authenticated')","-- Create index for fast lookups\nCREATE INDEX idx_page_content_lookup ON public.page_content(page_slug, locale, section_key)","-- Create updated_at trigger\nCREATE OR REPLACE FUNCTION update_updated_at_column()\nRETURNS TRIGGER AS $$\nBEGIN\n  NEW.updated_at = timezone('utc'::text, now());\n  RETURN NEW;\nEND;\n$$ language 'plpgsql'","CREATE TRIGGER update_page_content_updated_at\n  BEFORE UPDATE ON public.page_content\n  FOR EACH ROW\n  EXECUTE FUNCTION update_updated_at_column()","-- Insert default content for Open Water page\nINSERT INTO public.page_content (page_slug, locale, section_key, content_type, content_value) VALUES\n  ('open-water', 'en', 'hero_title', 'text', 'PADI Open Water Course'),\n  ('open-water', 'en', 'hero_subtitle', 'text', 'The PADI Open Water Diver course is the world''s most popular scuba course. Learn the fundamentals of scuba diving and get certified to dive independently with a buddy, to 18 metres/60 feet.'),\n  ('open-water', 'en', 'course_overview', 'text', 'The Open Water course combines knowledge development, confined water dives (pool) and open water dives. You''ll learn equipment setup, basic underwater skills, buoyancy control and dive planning. Our instructors keep groups small and emphasize safety and fun.'),\n  ('open-water', 'nl', 'hero_title', 'text', 'PADI Open Water-cursus'),\n  ('open-water', 'nl', 'hero_subtitle', 'text', 'De PADI Open Water Diver-cursus is de populairste duikcursus ter wereld. Je leert de basis van het duiken en behaalt je brevet om zelfstandig met een buddy te duiken tot 18 meter/60 voet.'),\n  ('open-water', 'nl', 'course_overview', 'text', 'De Open Water-cursus combineert theorie, beschut water-training (zwembad) en buitenwaterduiken. Je leert uitrusting opbouwen, basisvaardigheden onder water, drijfvermogen en duikplanning. Onze instructeurs werken met kleine groepen en leggen de nadruk op veiligheid en plezier.')\nON CONFLICT (page_slug, locale, section_key) DO NOTHING"}	create_page_content
\.


--
-- TOC entry 3893 (class 0 OID 16612)
-- Dependencies: 364
-- Data for Name: secrets; Type: TABLE DATA; Schema: vault; Owner: supabase_admin
--

COPY vault.secrets (id, name, description, secret, key_id, nonce, created_at, updated_at) FROM stdin;
\.


--
-- TOC entry 4958 (class 0 OID 0)
-- Dependencies: 359
-- Name: refresh_tokens_id_seq; Type: SEQUENCE SET; Schema: auth; Owner: supabase_auth_admin
--

SELECT pg_catalog.setval('auth.refresh_tokens_id_seq', 978, true);


--
-- TOC entry 4959 (class 0 OID 0)
-- Dependencies: 411
-- Name: newdiving_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.newdiving_id_seq', 1, false);


--
-- TOC entry 4960 (class 0 OID 0)
-- Dependencies: 392
-- Name: subscription_id_seq; Type: SEQUENCE SET; Schema: realtime; Owner: supabase_admin
--

SELECT pg_catalog.setval('realtime.subscription_id_seq', 26106, true);


--
-- TOC entry 4183 (class 2606 OID 16783)
-- Name: mfa_amr_claims amr_id_pk; Type: CONSTRAINT; Schema: auth; Owner: supabase_auth_admin
--

ALTER TABLE ONLY auth.mfa_amr_claims
    ADD CONSTRAINT amr_id_pk PRIMARY KEY (id);


--
-- TOC entry 4152 (class 2606 OID 16535)
-- Name: audit_log_entries audit_log_entries_pkey; Type: CONSTRAINT; Schema: auth; Owner: supabase_auth_admin
--

ALTER TABLE ONLY auth.audit_log_entries
    ADD CONSTRAINT audit_log_entries_pkey PRIMARY KEY (id);


--
-- TOC entry 4287 (class 2606 OID 19440)
-- Name: custom_oauth_providers custom_oauth_providers_identifier_key; Type: CONSTRAINT; Schema: auth; Owner: supabase_auth_admin
--

ALTER TABLE ONLY auth.custom_oauth_providers
    ADD CONSTRAINT custom_oauth_providers_identifier_key UNIQUE (identifier);


--
-- TOC entry 4289 (class 2606 OID 19438)
-- Name: custom_oauth_providers custom_oauth_providers_pkey; Type: CONSTRAINT; Schema: auth; Owner: supabase_auth_admin
--

ALTER TABLE ONLY auth.custom_oauth_providers
    ADD CONSTRAINT custom_oauth_providers_pkey PRIMARY KEY (id);


--
-- TOC entry 4206 (class 2606 OID 16889)
-- Name: flow_state flow_state_pkey; Type: CONSTRAINT; Schema: auth; Owner: supabase_auth_admin
--

ALTER TABLE ONLY auth.flow_state
    ADD CONSTRAINT flow_state_pkey PRIMARY KEY (id);


--
-- TOC entry 4161 (class 2606 OID 16907)
-- Name: identities identities_pkey; Type: CONSTRAINT; Schema: auth; Owner: supabase_auth_admin
--

ALTER TABLE ONLY auth.identities
    ADD CONSTRAINT identities_pkey PRIMARY KEY (id);


--
-- TOC entry 4163 (class 2606 OID 16917)
-- Name: identities identities_provider_id_provider_unique; Type: CONSTRAINT; Schema: auth; Owner: supabase_auth_admin
--

ALTER TABLE ONLY auth.identities
    ADD CONSTRAINT identities_provider_id_provider_unique UNIQUE (provider_id, provider);


--
-- TOC entry 4150 (class 2606 OID 16528)
-- Name: instances instances_pkey; Type: CONSTRAINT; Schema: auth; Owner: supabase_auth_admin
--

ALTER TABLE ONLY auth.instances
    ADD CONSTRAINT instances_pkey PRIMARY KEY (id);


--
-- TOC entry 4185 (class 2606 OID 16776)
-- Name: mfa_amr_claims mfa_amr_claims_session_id_authentication_method_pkey; Type: CONSTRAINT; Schema: auth; Owner: supabase_auth_admin
--

ALTER TABLE ONLY auth.mfa_amr_claims
    ADD CONSTRAINT mfa_amr_claims_session_id_authentication_method_pkey UNIQUE (session_id, authentication_method);


--
-- TOC entry 4181 (class 2606 OID 16764)
-- Name: mfa_challenges mfa_challenges_pkey; Type: CONSTRAINT; Schema: auth; Owner: supabase_auth_admin
--

ALTER TABLE ONLY auth.mfa_challenges
    ADD CONSTRAINT mfa_challenges_pkey PRIMARY KEY (id);


--
-- TOC entry 4173 (class 2606 OID 16957)
-- Name: mfa_factors mfa_factors_last_challenged_at_key; Type: CONSTRAINT; Schema: auth; Owner: supabase_auth_admin
--

ALTER TABLE ONLY auth.mfa_factors
    ADD CONSTRAINT mfa_factors_last_challenged_at_key UNIQUE (last_challenged_at);


--
-- TOC entry 4175 (class 2606 OID 16751)
-- Name: mfa_factors mfa_factors_pkey; Type: CONSTRAINT; Schema: auth; Owner: supabase_auth_admin
--

ALTER TABLE ONLY auth.mfa_factors
    ADD CONSTRAINT mfa_factors_pkey PRIMARY KEY (id);


--
-- TOC entry 4219 (class 2606 OID 17016)
-- Name: oauth_authorizations oauth_authorizations_authorization_code_key; Type: CONSTRAINT; Schema: auth; Owner: supabase_auth_admin
--

ALTER TABLE ONLY auth.oauth_authorizations
    ADD CONSTRAINT oauth_authorizations_authorization_code_key UNIQUE (authorization_code);


--
-- TOC entry 4221 (class 2606 OID 17014)
-- Name: oauth_authorizations oauth_authorizations_authorization_id_key; Type: CONSTRAINT; Schema: auth; Owner: supabase_auth_admin
--

ALTER TABLE ONLY auth.oauth_authorizations
    ADD CONSTRAINT oauth_authorizations_authorization_id_key UNIQUE (authorization_id);


--
-- TOC entry 4223 (class 2606 OID 17012)
-- Name: oauth_authorizations oauth_authorizations_pkey; Type: CONSTRAINT; Schema: auth; Owner: supabase_auth_admin
--

ALTER TABLE ONLY auth.oauth_authorizations
    ADD CONSTRAINT oauth_authorizations_pkey PRIMARY KEY (id);


--
-- TOC entry 4233 (class 2606 OID 17074)
-- Name: oauth_client_states oauth_client_states_pkey; Type: CONSTRAINT; Schema: auth; Owner: supabase_auth_admin
--

ALTER TABLE ONLY auth.oauth_client_states
    ADD CONSTRAINT oauth_client_states_pkey PRIMARY KEY (id);


--
-- TOC entry 4216 (class 2606 OID 16976)
-- Name: oauth_clients oauth_clients_pkey; Type: CONSTRAINT; Schema: auth; Owner: supabase_auth_admin
--

ALTER TABLE ONLY auth.oauth_clients
    ADD CONSTRAINT oauth_clients_pkey PRIMARY KEY (id);


--
-- TOC entry 4227 (class 2606 OID 17038)
-- Name: oauth_consents oauth_consents_pkey; Type: CONSTRAINT; Schema: auth; Owner: supabase_auth_admin
--

ALTER TABLE ONLY auth.oauth_consents
    ADD CONSTRAINT oauth_consents_pkey PRIMARY KEY (id);


--
-- TOC entry 4229 (class 2606 OID 17040)
-- Name: oauth_consents oauth_consents_user_client_unique; Type: CONSTRAINT; Schema: auth; Owner: supabase_auth_admin
--

ALTER TABLE ONLY auth.oauth_consents
    ADD CONSTRAINT oauth_consents_user_client_unique UNIQUE (user_id, client_id);


--
-- TOC entry 4210 (class 2606 OID 16942)
-- Name: one_time_tokens one_time_tokens_pkey; Type: CONSTRAINT; Schema: auth; Owner: supabase_auth_admin
--

ALTER TABLE ONLY auth.one_time_tokens
    ADD CONSTRAINT one_time_tokens_pkey PRIMARY KEY (id);


--
-- TOC entry 4144 (class 2606 OID 16518)
-- Name: refresh_tokens refresh_tokens_pkey; Type: CONSTRAINT; Schema: auth; Owner: supabase_auth_admin
--

ALTER TABLE ONLY auth.refresh_tokens
    ADD CONSTRAINT refresh_tokens_pkey PRIMARY KEY (id);


--
-- TOC entry 4147 (class 2606 OID 16694)
-- Name: refresh_tokens refresh_tokens_token_unique; Type: CONSTRAINT; Schema: auth; Owner: supabase_auth_admin
--

ALTER TABLE ONLY auth.refresh_tokens
    ADD CONSTRAINT refresh_tokens_token_unique UNIQUE (token);


--
-- TOC entry 4195 (class 2606 OID 16823)
-- Name: saml_providers saml_providers_entity_id_key; Type: CONSTRAINT; Schema: auth; Owner: supabase_auth_admin
--

ALTER TABLE ONLY auth.saml_providers
    ADD CONSTRAINT saml_providers_entity_id_key UNIQUE (entity_id);


--
-- TOC entry 4197 (class 2606 OID 16821)
-- Name: saml_providers saml_providers_pkey; Type: CONSTRAINT; Schema: auth; Owner: supabase_auth_admin
--

ALTER TABLE ONLY auth.saml_providers
    ADD CONSTRAINT saml_providers_pkey PRIMARY KEY (id);


--
-- TOC entry 4202 (class 2606 OID 16837)
-- Name: saml_relay_states saml_relay_states_pkey; Type: CONSTRAINT; Schema: auth; Owner: supabase_auth_admin
--

ALTER TABLE ONLY auth.saml_relay_states
    ADD CONSTRAINT saml_relay_states_pkey PRIMARY KEY (id);


--
-- TOC entry 4155 (class 2606 OID 16541)
-- Name: schema_migrations schema_migrations_pkey; Type: CONSTRAINT; Schema: auth; Owner: supabase_auth_admin
--

ALTER TABLE ONLY auth.schema_migrations
    ADD CONSTRAINT schema_migrations_pkey PRIMARY KEY (version);


--
-- TOC entry 4168 (class 2606 OID 16715)
-- Name: sessions sessions_pkey; Type: CONSTRAINT; Schema: auth; Owner: supabase_auth_admin
--

ALTER TABLE ONLY auth.sessions
    ADD CONSTRAINT sessions_pkey PRIMARY KEY (id);


--
-- TOC entry 4192 (class 2606 OID 16804)
-- Name: sso_domains sso_domains_pkey; Type: CONSTRAINT; Schema: auth; Owner: supabase_auth_admin
--

ALTER TABLE ONLY auth.sso_domains
    ADD CONSTRAINT sso_domains_pkey PRIMARY KEY (id);


--
-- TOC entry 4187 (class 2606 OID 16795)
-- Name: sso_providers sso_providers_pkey; Type: CONSTRAINT; Schema: auth; Owner: supabase_auth_admin
--

ALTER TABLE ONLY auth.sso_providers
    ADD CONSTRAINT sso_providers_pkey PRIMARY KEY (id);


--
-- TOC entry 4137 (class 2606 OID 16877)
-- Name: users users_phone_key; Type: CONSTRAINT; Schema: auth; Owner: supabase_auth_admin
--

ALTER TABLE ONLY auth.users
    ADD CONSTRAINT users_phone_key UNIQUE (phone);


--
-- TOC entry 4139 (class 2606 OID 16505)
-- Name: users users_pkey; Type: CONSTRAINT; Schema: auth; Owner: supabase_auth_admin
--

ALTER TABLE ONLY auth.users
    ADD CONSTRAINT users_pkey PRIMARY KEY (id);


--
-- TOC entry 4338 (class 2606 OID 27354)
-- Name: webauthn_challenges webauthn_challenges_pkey; Type: CONSTRAINT; Schema: auth; Owner: supabase_auth_admin
--

ALTER TABLE ONLY auth.webauthn_challenges
    ADD CONSTRAINT webauthn_challenges_pkey PRIMARY KEY (id);


--
-- TOC entry 4334 (class 2606 OID 27337)
-- Name: webauthn_credentials webauthn_credentials_pkey; Type: CONSTRAINT; Schema: auth; Owner: supabase_auth_admin
--

ALTER TABLE ONLY auth.webauthn_credentials
    ADD CONSTRAINT webauthn_credentials_pkey PRIMARY KEY (id);


--
-- TOC entry 4278 (class 2606 OID 18217)
-- Name: admin_settings admin_settings_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.admin_settings
    ADD CONSTRAINT admin_settings_pkey PRIMARY KEY (id);


--
-- TOC entry 4280 (class 2606 OID 18219)
-- Name: admin_settings admin_settings_setting_key_key; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.admin_settings
    ADD CONSTRAINT admin_settings_setting_key_key UNIQUE (setting_key);


--
-- TOC entry 4292 (class 2606 OID 19453)
-- Name: affiliate_clicks affiliate_clicks_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.affiliate_clicks
    ADD CONSTRAINT affiliate_clicks_pkey PRIMARY KEY (id);


--
-- TOC entry 4272 (class 2606 OID 18188)
-- Name: booking_inquiries booking_inquiries_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.booking_inquiries
    ADD CONSTRAINT booking_inquiries_pkey PRIMARY KEY (id);


--
-- TOC entry 4321 (class 2606 OID 25856)
-- Name: bookings bookings_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.bookings
    ADD CONSTRAINT bookings_pkey PRIMARY KEY (id);


--
-- TOC entry 4317 (class 2606 OID 25425)
-- Name: course_prices course_prices_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.course_prices
    ADD CONSTRAINT course_prices_pkey PRIMARY KEY (id);


--
-- TOC entry 4341 (class 2606 OID 27421)
-- Name: dive_site_pages dive_site_pages_slug_key; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.dive_site_pages
    ADD CONSTRAINT dive_site_pages_slug_key UNIQUE (slug);


--
-- TOC entry 4323 (class 2606 OID 27040)
-- Name: emails emails_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.emails
    ADD CONSTRAINT emails_pkey PRIMARY KEY (id);


--
-- TOC entry 4319 (class 2606 OID 25600)
-- Name: newdiving newdiving_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.newdiving
    ADD CONSTRAINT newdiving_pkey PRIMARY KEY (id);


--
-- TOC entry 4295 (class 2606 OID 25255)
-- Name: page_content page_content_page_slug_locale_section_key_key; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.page_content
    ADD CONSTRAINT page_content_page_slug_locale_section_key_key UNIQUE (page_slug, locale, section_key);


--
-- TOC entry 4297 (class 2606 OID 25253)
-- Name: page_content page_content_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.page_content
    ADD CONSTRAINT page_content_pkey PRIMARY KEY (id);


--
-- TOC entry 4303 (class 2606 OID 25274)
-- Name: page_metadata page_metadata_page_slug_key; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.page_metadata
    ADD CONSTRAINT page_metadata_page_slug_key UNIQUE (page_slug);


--
-- TOC entry 4305 (class 2606 OID 25272)
-- Name: page_metadata page_metadata_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.page_metadata
    ADD CONSTRAINT page_metadata_pkey PRIMARY KEY (id);


--
-- TOC entry 4313 (class 2606 OID 25315)
-- Name: page_security page_security_page_slug_key; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.page_security
    ADD CONSTRAINT page_security_page_slug_key UNIQUE (page_slug);


--
-- TOC entry 4315 (class 2606 OID 25313)
-- Name: page_security page_security_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.page_security
    ADD CONSTRAINT page_security_pkey PRIMARY KEY (id);


--
-- TOC entry 4308 (class 2606 OID 25290)
-- Name: page_seo page_seo_page_slug_key; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.page_seo
    ADD CONSTRAINT page_seo_page_slug_key UNIQUE (page_slug);


--
-- TOC entry 4310 (class 2606 OID 25288)
-- Name: page_seo page_seo_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.page_seo
    ADD CONSTRAINT page_seo_pkey PRIMARY KEY (id);


--
-- TOC entry 4282 (class 2606 OID 18236)
-- Name: profiles profiles_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.profiles
    ADD CONSTRAINT profiles_pkey PRIMARY KEY (id);


--
-- TOC entry 4360 (class 2606 OID 34197)
-- Name: project_tasks project_tasks_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.project_tasks
    ADD CONSTRAINT project_tasks_pkey PRIMARY KEY (id);


--
-- TOC entry 4345 (class 2606 OID 32104)
-- Name: role_change_audit role_change_audit_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.role_change_audit
    ADD CONSTRAINT role_change_audit_pkey PRIMARY KEY (id);


--
-- TOC entry 4274 (class 2606 OID 18201)
-- Name: user_roles user_roles_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.user_roles
    ADD CONSTRAINT user_roles_pkey PRIMARY KEY (id);


--
-- TOC entry 4276 (class 2606 OID 18203)
-- Name: user_roles user_roles_user_id_role_key; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.user_roles
    ADD CONSTRAINT user_roles_user_id_role_key UNIQUE (user_id, role);


--
-- TOC entry 4325 (class 2606 OID 27050)
-- Name: users users_email_key; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_email_key UNIQUE (email);


--
-- TOC entry 4327 (class 2606 OID 27048)
-- Name: users users_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_pkey PRIMARY KEY (id);


--
-- TOC entry 4329 (class 2606 OID 27131)
-- Name: vouchers vouchers_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.vouchers
    ADD CONSTRAINT vouchers_pkey PRIMARY KEY (id);


--
-- TOC entry 4331 (class 2606 OID 27133)
-- Name: vouchers vouchers_voucher_code_key; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.vouchers
    ADD CONSTRAINT vouchers_voucher_code_key UNIQUE (voucher_code);


--
-- TOC entry 4268 (class 2606 OID 17443)
-- Name: messages messages_pkey; Type: CONSTRAINT; Schema: realtime; Owner: supabase_realtime_admin
--

ALTER TABLE ONLY realtime.messages
    ADD CONSTRAINT messages_pkey PRIMARY KEY (id, inserted_at);


--
-- TOC entry 4348 (class 2606 OID 32195)
-- Name: messages_2026_04_01 messages_2026_04_01_pkey; Type: CONSTRAINT; Schema: realtime; Owner: supabase_admin
--

ALTER TABLE ONLY realtime.messages_2026_04_01
    ADD CONSTRAINT messages_2026_04_01_pkey PRIMARY KEY (id, inserted_at);


--
-- TOC entry 4351 (class 2606 OID 33317)
-- Name: messages_2026_04_02 messages_2026_04_02_pkey; Type: CONSTRAINT; Schema: realtime; Owner: supabase_admin
--

ALTER TABLE ONLY realtime.messages_2026_04_02
    ADD CONSTRAINT messages_2026_04_02_pkey PRIMARY KEY (id, inserted_at);


--
-- TOC entry 4354 (class 2606 OID 33330)
-- Name: messages_2026_04_03 messages_2026_04_03_pkey; Type: CONSTRAINT; Schema: realtime; Owner: supabase_admin
--

ALTER TABLE ONLY realtime.messages_2026_04_03
    ADD CONSTRAINT messages_2026_04_03_pkey PRIMARY KEY (id, inserted_at);


--
-- TOC entry 4357 (class 2606 OID 34159)
-- Name: messages_2026_04_04 messages_2026_04_04_pkey; Type: CONSTRAINT; Schema: realtime; Owner: supabase_admin
--

ALTER TABLE ONLY realtime.messages_2026_04_04
    ADD CONSTRAINT messages_2026_04_04_pkey PRIMARY KEY (id, inserted_at);


--
-- TOC entry 4363 (class 2606 OID 35331)
-- Name: messages_2026_04_05 messages_2026_04_05_pkey; Type: CONSTRAINT; Schema: realtime; Owner: supabase_admin
--

ALTER TABLE ONLY realtime.messages_2026_04_05
    ADD CONSTRAINT messages_2026_04_05_pkey PRIMARY KEY (id, inserted_at);


--
-- TOC entry 4366 (class 2606 OID 36456)
-- Name: messages_2026_04_06 messages_2026_04_06_pkey; Type: CONSTRAINT; Schema: realtime; Owner: supabase_admin
--

ALTER TABLE ONLY realtime.messages_2026_04_06
    ADD CONSTRAINT messages_2026_04_06_pkey PRIMARY KEY (id, inserted_at);


--
-- TOC entry 4369 (class 2606 OID 36495)
-- Name: messages_2026_04_07 messages_2026_04_07_pkey; Type: CONSTRAINT; Schema: realtime; Owner: supabase_admin
--

ALTER TABLE ONLY realtime.messages_2026_04_07
    ADD CONSTRAINT messages_2026_04_07_pkey PRIMARY KEY (id, inserted_at);


--
-- TOC entry 4264 (class 2606 OID 17297)
-- Name: subscription pk_subscription; Type: CONSTRAINT; Schema: realtime; Owner: supabase_admin
--

ALTER TABLE ONLY realtime.subscription
    ADD CONSTRAINT pk_subscription PRIMARY KEY (id);


--
-- TOC entry 4261 (class 2606 OID 17271)
-- Name: schema_migrations schema_migrations_pkey; Type: CONSTRAINT; Schema: realtime; Owner: supabase_admin
--

ALTER TABLE ONLY realtime.schema_migrations
    ADD CONSTRAINT schema_migrations_pkey PRIMARY KEY (version);


--
-- TOC entry 4253 (class 2606 OID 17252)
-- Name: buckets_analytics buckets_analytics_pkey; Type: CONSTRAINT; Schema: storage; Owner: supabase_storage_admin
--

ALTER TABLE ONLY storage.buckets_analytics
    ADD CONSTRAINT buckets_analytics_pkey PRIMARY KEY (id);


--
-- TOC entry 4240 (class 2606 OID 17094)
-- Name: buckets buckets_pkey; Type: CONSTRAINT; Schema: storage; Owner: supabase_storage_admin
--

ALTER TABLE ONLY storage.buckets
    ADD CONSTRAINT buckets_pkey PRIMARY KEY (id);


--
-- TOC entry 4256 (class 2606 OID 17228)
-- Name: buckets_vectors buckets_vectors_pkey; Type: CONSTRAINT; Schema: storage; Owner: supabase_storage_admin
--

ALTER TABLE ONLY storage.buckets_vectors
    ADD CONSTRAINT buckets_vectors_pkey PRIMARY KEY (id);


--
-- TOC entry 4235 (class 2606 OID 17085)
-- Name: migrations migrations_name_key; Type: CONSTRAINT; Schema: storage; Owner: supabase_storage_admin
--

ALTER TABLE ONLY storage.migrations
    ADD CONSTRAINT migrations_name_key UNIQUE (name);


--
-- TOC entry 4237 (class 2606 OID 17083)
-- Name: migrations migrations_pkey; Type: CONSTRAINT; Schema: storage; Owner: supabase_storage_admin
--

ALTER TABLE ONLY storage.migrations
    ADD CONSTRAINT migrations_pkey PRIMARY KEY (id);


--
-- TOC entry 4246 (class 2606 OID 17106)
-- Name: objects objects_pkey; Type: CONSTRAINT; Schema: storage; Owner: supabase_storage_admin
--

ALTER TABLE ONLY storage.objects
    ADD CONSTRAINT objects_pkey PRIMARY KEY (id);


--
-- TOC entry 4251 (class 2606 OID 17168)
-- Name: s3_multipart_uploads_parts s3_multipart_uploads_parts_pkey; Type: CONSTRAINT; Schema: storage; Owner: supabase_storage_admin
--

ALTER TABLE ONLY storage.s3_multipart_uploads_parts
    ADD CONSTRAINT s3_multipart_uploads_parts_pkey PRIMARY KEY (id);


--
-- TOC entry 4249 (class 2606 OID 17153)
-- Name: s3_multipart_uploads s3_multipart_uploads_pkey; Type: CONSTRAINT; Schema: storage; Owner: supabase_storage_admin
--

ALTER TABLE ONLY storage.s3_multipart_uploads
    ADD CONSTRAINT s3_multipart_uploads_pkey PRIMARY KEY (id);


--
-- TOC entry 4259 (class 2606 OID 17238)
-- Name: vector_indexes vector_indexes_pkey; Type: CONSTRAINT; Schema: storage; Owner: supabase_storage_admin
--

ALTER TABLE ONLY storage.vector_indexes
    ADD CONSTRAINT vector_indexes_pkey PRIMARY KEY (id);


--
-- TOC entry 4270 (class 2606 OID 17460)
-- Name: schema_migrations schema_migrations_pkey; Type: CONSTRAINT; Schema: supabase_migrations; Owner: postgres
--

ALTER TABLE ONLY supabase_migrations.schema_migrations
    ADD CONSTRAINT schema_migrations_pkey PRIMARY KEY (version);


--
-- TOC entry 4153 (class 1259 OID 16536)
-- Name: audit_logs_instance_id_idx; Type: INDEX; Schema: auth; Owner: supabase_auth_admin
--

CREATE INDEX audit_logs_instance_id_idx ON auth.audit_log_entries USING btree (instance_id);


--
-- TOC entry 4127 (class 1259 OID 16704)
-- Name: confirmation_token_idx; Type: INDEX; Schema: auth; Owner: supabase_auth_admin
--

CREATE UNIQUE INDEX confirmation_token_idx ON auth.users USING btree (confirmation_token) WHERE ((confirmation_token)::text !~ '^[0-9 ]*$'::text);


--
-- TOC entry 4283 (class 1259 OID 19444)
-- Name: custom_oauth_providers_created_at_idx; Type: INDEX; Schema: auth; Owner: supabase_auth_admin
--

CREATE INDEX custom_oauth_providers_created_at_idx ON auth.custom_oauth_providers USING btree (created_at);


--
-- TOC entry 4284 (class 1259 OID 19443)
-- Name: custom_oauth_providers_enabled_idx; Type: INDEX; Schema: auth; Owner: supabase_auth_admin
--

CREATE INDEX custom_oauth_providers_enabled_idx ON auth.custom_oauth_providers USING btree (enabled);


--
-- TOC entry 4285 (class 1259 OID 19441)
-- Name: custom_oauth_providers_identifier_idx; Type: INDEX; Schema: auth; Owner: supabase_auth_admin
--

CREATE INDEX custom_oauth_providers_identifier_idx ON auth.custom_oauth_providers USING btree (identifier);


--
-- TOC entry 4290 (class 1259 OID 19442)
-- Name: custom_oauth_providers_provider_type_idx; Type: INDEX; Schema: auth; Owner: supabase_auth_admin
--

CREATE INDEX custom_oauth_providers_provider_type_idx ON auth.custom_oauth_providers USING btree (provider_type);


--
-- TOC entry 4128 (class 1259 OID 16706)
-- Name: email_change_token_current_idx; Type: INDEX; Schema: auth; Owner: supabase_auth_admin
--

CREATE UNIQUE INDEX email_change_token_current_idx ON auth.users USING btree (email_change_token_current) WHERE ((email_change_token_current)::text !~ '^[0-9 ]*$'::text);


--
-- TOC entry 4129 (class 1259 OID 16707)
-- Name: email_change_token_new_idx; Type: INDEX; Schema: auth; Owner: supabase_auth_admin
--

CREATE UNIQUE INDEX email_change_token_new_idx ON auth.users USING btree (email_change_token_new) WHERE ((email_change_token_new)::text !~ '^[0-9 ]*$'::text);


--
-- TOC entry 4171 (class 1259 OID 16785)
-- Name: factor_id_created_at_idx; Type: INDEX; Schema: auth; Owner: supabase_auth_admin
--

CREATE INDEX factor_id_created_at_idx ON auth.mfa_factors USING btree (user_id, created_at);


--
-- TOC entry 4204 (class 1259 OID 16893)
-- Name: flow_state_created_at_idx; Type: INDEX; Schema: auth; Owner: supabase_auth_admin
--

CREATE INDEX flow_state_created_at_idx ON auth.flow_state USING btree (created_at DESC);


--
-- TOC entry 4159 (class 1259 OID 16873)
-- Name: identities_email_idx; Type: INDEX; Schema: auth; Owner: supabase_auth_admin
--

CREATE INDEX identities_email_idx ON auth.identities USING btree (email text_pattern_ops);


--
-- TOC entry 4961 (class 0 OID 0)
-- Dependencies: 4159
-- Name: INDEX identities_email_idx; Type: COMMENT; Schema: auth; Owner: supabase_auth_admin
--

COMMENT ON INDEX auth.identities_email_idx IS 'Auth: Ensures indexed queries on the email column';


--
-- TOC entry 4164 (class 1259 OID 16701)
-- Name: identities_user_id_idx; Type: INDEX; Schema: auth; Owner: supabase_auth_admin
--

CREATE INDEX identities_user_id_idx ON auth.identities USING btree (user_id);


--
-- TOC entry 4207 (class 1259 OID 16890)
-- Name: idx_auth_code; Type: INDEX; Schema: auth; Owner: supabase_auth_admin
--

CREATE INDEX idx_auth_code ON auth.flow_state USING btree (auth_code);


--
-- TOC entry 4231 (class 1259 OID 17075)
-- Name: idx_oauth_client_states_created_at; Type: INDEX; Schema: auth; Owner: supabase_auth_admin
--

CREATE INDEX idx_oauth_client_states_created_at ON auth.oauth_client_states USING btree (created_at);


--
-- TOC entry 4208 (class 1259 OID 16891)
-- Name: idx_user_id_auth_method; Type: INDEX; Schema: auth; Owner: supabase_auth_admin
--

CREATE INDEX idx_user_id_auth_method ON auth.flow_state USING btree (user_id, authentication_method);


--
-- TOC entry 4179 (class 1259 OID 16896)
-- Name: mfa_challenge_created_at_idx; Type: INDEX; Schema: auth; Owner: supabase_auth_admin
--

CREATE INDEX mfa_challenge_created_at_idx ON auth.mfa_challenges USING btree (created_at DESC);


--
-- TOC entry 4176 (class 1259 OID 16757)
-- Name: mfa_factors_user_friendly_name_unique; Type: INDEX; Schema: auth; Owner: supabase_auth_admin
--

CREATE UNIQUE INDEX mfa_factors_user_friendly_name_unique ON auth.mfa_factors USING btree (friendly_name, user_id) WHERE (TRIM(BOTH FROM friendly_name) <> ''::text);


--
-- TOC entry 4177 (class 1259 OID 16902)
-- Name: mfa_factors_user_id_idx; Type: INDEX; Schema: auth; Owner: supabase_auth_admin
--

CREATE INDEX mfa_factors_user_id_idx ON auth.mfa_factors USING btree (user_id);


--
-- TOC entry 4217 (class 1259 OID 17027)
-- Name: oauth_auth_pending_exp_idx; Type: INDEX; Schema: auth; Owner: supabase_auth_admin
--

CREATE INDEX oauth_auth_pending_exp_idx ON auth.oauth_authorizations USING btree (expires_at) WHERE (status = 'pending'::auth.oauth_authorization_status);


--
-- TOC entry 4214 (class 1259 OID 16980)
-- Name: oauth_clients_deleted_at_idx; Type: INDEX; Schema: auth; Owner: supabase_auth_admin
--

CREATE INDEX oauth_clients_deleted_at_idx ON auth.oauth_clients USING btree (deleted_at);


--
-- TOC entry 4224 (class 1259 OID 17053)
-- Name: oauth_consents_active_client_idx; Type: INDEX; Schema: auth; Owner: supabase_auth_admin
--

CREATE INDEX oauth_consents_active_client_idx ON auth.oauth_consents USING btree (client_id) WHERE (revoked_at IS NULL);


--
-- TOC entry 4225 (class 1259 OID 17051)
-- Name: oauth_consents_active_user_client_idx; Type: INDEX; Schema: auth; Owner: supabase_auth_admin
--

CREATE INDEX oauth_consents_active_user_client_idx ON auth.oauth_consents USING btree (user_id, client_id) WHERE (revoked_at IS NULL);


--
-- TOC entry 4230 (class 1259 OID 17052)
-- Name: oauth_consents_user_order_idx; Type: INDEX; Schema: auth; Owner: supabase_auth_admin
--

CREATE INDEX oauth_consents_user_order_idx ON auth.oauth_consents USING btree (user_id, granted_at DESC);


--
-- TOC entry 4211 (class 1259 OID 16949)
-- Name: one_time_tokens_relates_to_hash_idx; Type: INDEX; Schema: auth; Owner: supabase_auth_admin
--

CREATE INDEX one_time_tokens_relates_to_hash_idx ON auth.one_time_tokens USING hash (relates_to);


--
-- TOC entry 4212 (class 1259 OID 16948)
-- Name: one_time_tokens_token_hash_hash_idx; Type: INDEX; Schema: auth; Owner: supabase_auth_admin
--

CREATE INDEX one_time_tokens_token_hash_hash_idx ON auth.one_time_tokens USING hash (token_hash);


--
-- TOC entry 4213 (class 1259 OID 16950)
-- Name: one_time_tokens_user_id_token_type_key; Type: INDEX; Schema: auth; Owner: supabase_auth_admin
--

CREATE UNIQUE INDEX one_time_tokens_user_id_token_type_key ON auth.one_time_tokens USING btree (user_id, token_type);


--
-- TOC entry 4130 (class 1259 OID 16708)
-- Name: reauthentication_token_idx; Type: INDEX; Schema: auth; Owner: supabase_auth_admin
--

CREATE UNIQUE INDEX reauthentication_token_idx ON auth.users USING btree (reauthentication_token) WHERE ((reauthentication_token)::text !~ '^[0-9 ]*$'::text);


--
-- TOC entry 4131 (class 1259 OID 16705)
-- Name: recovery_token_idx; Type: INDEX; Schema: auth; Owner: supabase_auth_admin
--

CREATE UNIQUE INDEX recovery_token_idx ON auth.users USING btree (recovery_token) WHERE ((recovery_token)::text !~ '^[0-9 ]*$'::text);


--
-- TOC entry 4140 (class 1259 OID 16519)
-- Name: refresh_tokens_instance_id_idx; Type: INDEX; Schema: auth; Owner: supabase_auth_admin
--

CREATE INDEX refresh_tokens_instance_id_idx ON auth.refresh_tokens USING btree (instance_id);


--
-- TOC entry 4141 (class 1259 OID 16520)
-- Name: refresh_tokens_instance_id_user_id_idx; Type: INDEX; Schema: auth; Owner: supabase_auth_admin
--

CREATE INDEX refresh_tokens_instance_id_user_id_idx ON auth.refresh_tokens USING btree (instance_id, user_id);


--
-- TOC entry 4142 (class 1259 OID 16700)
-- Name: refresh_tokens_parent_idx; Type: INDEX; Schema: auth; Owner: supabase_auth_admin
--

CREATE INDEX refresh_tokens_parent_idx ON auth.refresh_tokens USING btree (parent);


--
-- TOC entry 4145 (class 1259 OID 16787)
-- Name: refresh_tokens_session_id_revoked_idx; Type: INDEX; Schema: auth; Owner: supabase_auth_admin
--

CREATE INDEX refresh_tokens_session_id_revoked_idx ON auth.refresh_tokens USING btree (session_id, revoked);


--
-- TOC entry 4148 (class 1259 OID 16892)
-- Name: refresh_tokens_updated_at_idx; Type: INDEX; Schema: auth; Owner: supabase_auth_admin
--

CREATE INDEX refresh_tokens_updated_at_idx ON auth.refresh_tokens USING btree (updated_at DESC);


--
-- TOC entry 4198 (class 1259 OID 16829)
-- Name: saml_providers_sso_provider_id_idx; Type: INDEX; Schema: auth; Owner: supabase_auth_admin
--

CREATE INDEX saml_providers_sso_provider_id_idx ON auth.saml_providers USING btree (sso_provider_id);


--
-- TOC entry 4199 (class 1259 OID 16894)
-- Name: saml_relay_states_created_at_idx; Type: INDEX; Schema: auth; Owner: supabase_auth_admin
--

CREATE INDEX saml_relay_states_created_at_idx ON auth.saml_relay_states USING btree (created_at DESC);


--
-- TOC entry 4200 (class 1259 OID 16844)
-- Name: saml_relay_states_for_email_idx; Type: INDEX; Schema: auth; Owner: supabase_auth_admin
--

CREATE INDEX saml_relay_states_for_email_idx ON auth.saml_relay_states USING btree (for_email);


--
-- TOC entry 4203 (class 1259 OID 16843)
-- Name: saml_relay_states_sso_provider_id_idx; Type: INDEX; Schema: auth; Owner: supabase_auth_admin
--

CREATE INDEX saml_relay_states_sso_provider_id_idx ON auth.saml_relay_states USING btree (sso_provider_id);


--
-- TOC entry 4165 (class 1259 OID 16895)
-- Name: sessions_not_after_idx; Type: INDEX; Schema: auth; Owner: supabase_auth_admin
--

CREATE INDEX sessions_not_after_idx ON auth.sessions USING btree (not_after DESC);


--
-- TOC entry 4166 (class 1259 OID 17065)
-- Name: sessions_oauth_client_id_idx; Type: INDEX; Schema: auth; Owner: supabase_auth_admin
--

CREATE INDEX sessions_oauth_client_id_idx ON auth.sessions USING btree (oauth_client_id);


--
-- TOC entry 4169 (class 1259 OID 16786)
-- Name: sessions_user_id_idx; Type: INDEX; Schema: auth; Owner: supabase_auth_admin
--

CREATE INDEX sessions_user_id_idx ON auth.sessions USING btree (user_id);


--
-- TOC entry 4190 (class 1259 OID 16811)
-- Name: sso_domains_domain_idx; Type: INDEX; Schema: auth; Owner: supabase_auth_admin
--

CREATE UNIQUE INDEX sso_domains_domain_idx ON auth.sso_domains USING btree (lower(domain));


--
-- TOC entry 4193 (class 1259 OID 16810)
-- Name: sso_domains_sso_provider_id_idx; Type: INDEX; Schema: auth; Owner: supabase_auth_admin
--

CREATE INDEX sso_domains_sso_provider_id_idx ON auth.sso_domains USING btree (sso_provider_id);


--
-- TOC entry 4188 (class 1259 OID 16796)
-- Name: sso_providers_resource_id_idx; Type: INDEX; Schema: auth; Owner: supabase_auth_admin
--

CREATE UNIQUE INDEX sso_providers_resource_id_idx ON auth.sso_providers USING btree (lower(resource_id));


--
-- TOC entry 4189 (class 1259 OID 16958)
-- Name: sso_providers_resource_id_pattern_idx; Type: INDEX; Schema: auth; Owner: supabase_auth_admin
--

CREATE INDEX sso_providers_resource_id_pattern_idx ON auth.sso_providers USING btree (resource_id text_pattern_ops);


--
-- TOC entry 4178 (class 1259 OID 16955)
-- Name: unique_phone_factor_per_user; Type: INDEX; Schema: auth; Owner: supabase_auth_admin
--

CREATE UNIQUE INDEX unique_phone_factor_per_user ON auth.mfa_factors USING btree (user_id, phone);


--
-- TOC entry 4170 (class 1259 OID 16784)
-- Name: user_id_created_at_idx; Type: INDEX; Schema: auth; Owner: supabase_auth_admin
--

CREATE INDEX user_id_created_at_idx ON auth.sessions USING btree (user_id, created_at);


--
-- TOC entry 4132 (class 1259 OID 16864)
-- Name: users_email_partial_key; Type: INDEX; Schema: auth; Owner: supabase_auth_admin
--

CREATE UNIQUE INDEX users_email_partial_key ON auth.users USING btree (email) WHERE (is_sso_user = false);


--
-- TOC entry 4962 (class 0 OID 0)
-- Dependencies: 4132
-- Name: INDEX users_email_partial_key; Type: COMMENT; Schema: auth; Owner: supabase_auth_admin
--

COMMENT ON INDEX auth.users_email_partial_key IS 'Auth: A partial unique index that applies only when is_sso_user is false';


--
-- TOC entry 4133 (class 1259 OID 16702)
-- Name: users_instance_id_email_idx; Type: INDEX; Schema: auth; Owner: supabase_auth_admin
--

CREATE INDEX users_instance_id_email_idx ON auth.users USING btree (instance_id, lower((email)::text));


--
-- TOC entry 4134 (class 1259 OID 16509)
-- Name: users_instance_id_idx; Type: INDEX; Schema: auth; Owner: supabase_auth_admin
--

CREATE INDEX users_instance_id_idx ON auth.users USING btree (instance_id);


--
-- TOC entry 4135 (class 1259 OID 16919)
-- Name: users_is_anonymous_idx; Type: INDEX; Schema: auth; Owner: supabase_auth_admin
--

CREATE INDEX users_is_anonymous_idx ON auth.users USING btree (is_anonymous);


--
-- TOC entry 4336 (class 1259 OID 27361)
-- Name: webauthn_challenges_expires_at_idx; Type: INDEX; Schema: auth; Owner: supabase_auth_admin
--

CREATE INDEX webauthn_challenges_expires_at_idx ON auth.webauthn_challenges USING btree (expires_at);


--
-- TOC entry 4339 (class 1259 OID 27360)
-- Name: webauthn_challenges_user_id_idx; Type: INDEX; Schema: auth; Owner: supabase_auth_admin
--

CREATE INDEX webauthn_challenges_user_id_idx ON auth.webauthn_challenges USING btree (user_id);


--
-- TOC entry 4332 (class 1259 OID 27343)
-- Name: webauthn_credentials_credential_id_key; Type: INDEX; Schema: auth; Owner: supabase_auth_admin
--

CREATE UNIQUE INDEX webauthn_credentials_credential_id_key ON auth.webauthn_credentials USING btree (credential_id);


--
-- TOC entry 4335 (class 1259 OID 27344)
-- Name: webauthn_credentials_user_id_idx; Type: INDEX; Schema: auth; Owner: supabase_auth_admin
--

CREATE INDEX webauthn_credentials_user_id_idx ON auth.webauthn_credentials USING btree (user_id);


--
-- TOC entry 4293 (class 1259 OID 25258)
-- Name: idx_page_content_lookup; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX idx_page_content_lookup ON public.page_content USING btree (page_slug, locale, section_key);


--
-- TOC entry 4298 (class 1259 OID 25345)
-- Name: idx_page_metadata_draft_status; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX idx_page_metadata_draft_status ON public.page_metadata USING btree (draft_status);


--
-- TOC entry 4299 (class 1259 OID 25325)
-- Name: idx_page_metadata_has_seo; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX idx_page_metadata_has_seo ON public.page_metadata USING btree (has_seo);


--
-- TOC entry 4300 (class 1259 OID 25324)
-- Name: idx_page_metadata_secured; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX idx_page_metadata_secured ON public.page_metadata USING btree (is_secured);


--
-- TOC entry 4301 (class 1259 OID 25321)
-- Name: idx_page_metadata_slug; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX idx_page_metadata_slug ON public.page_metadata USING btree (page_slug);


--
-- TOC entry 4311 (class 1259 OID 25323)
-- Name: idx_page_security_slug; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX idx_page_security_slug ON public.page_security USING btree (page_slug);


--
-- TOC entry 4306 (class 1259 OID 25322)
-- Name: idx_page_seo_slug; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX idx_page_seo_slug ON public.page_seo USING btree (page_slug);


--
-- TOC entry 4358 (class 1259 OID 34203)
-- Name: idx_project_tasks_assigned_to; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX idx_project_tasks_assigned_to ON public.project_tasks USING btree (assigned_to);


--
-- TOC entry 4342 (class 1259 OID 32105)
-- Name: idx_role_change_audit_created_at; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX idx_role_change_audit_created_at ON public.role_change_audit USING btree (created_at DESC);


--
-- TOC entry 4343 (class 1259 OID 32106)
-- Name: idx_role_change_audit_target_user; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX idx_role_change_audit_target_user ON public.role_change_audit USING btree (target_user_id);


--
-- TOC entry 4262 (class 1259 OID 17444)
-- Name: ix_realtime_subscription_entity; Type: INDEX; Schema: realtime; Owner: supabase_admin
--

CREATE INDEX ix_realtime_subscription_entity ON realtime.subscription USING btree (entity);


--
-- TOC entry 4266 (class 1259 OID 17445)
-- Name: messages_inserted_at_topic_index; Type: INDEX; Schema: realtime; Owner: supabase_realtime_admin
--

CREATE INDEX messages_inserted_at_topic_index ON ONLY realtime.messages USING btree (inserted_at DESC, topic) WHERE ((extension = 'broadcast'::text) AND (private IS TRUE));


--
-- TOC entry 4346 (class 1259 OID 32196)
-- Name: messages_2026_04_01_inserted_at_topic_idx; Type: INDEX; Schema: realtime; Owner: supabase_admin
--

CREATE INDEX messages_2026_04_01_inserted_at_topic_idx ON realtime.messages_2026_04_01 USING btree (inserted_at DESC, topic) WHERE ((extension = 'broadcast'::text) AND (private IS TRUE));


--
-- TOC entry 4349 (class 1259 OID 33318)
-- Name: messages_2026_04_02_inserted_at_topic_idx; Type: INDEX; Schema: realtime; Owner: supabase_admin
--

CREATE INDEX messages_2026_04_02_inserted_at_topic_idx ON realtime.messages_2026_04_02 USING btree (inserted_at DESC, topic) WHERE ((extension = 'broadcast'::text) AND (private IS TRUE));


--
-- TOC entry 4352 (class 1259 OID 33331)
-- Name: messages_2026_04_03_inserted_at_topic_idx; Type: INDEX; Schema: realtime; Owner: supabase_admin
--

CREATE INDEX messages_2026_04_03_inserted_at_topic_idx ON realtime.messages_2026_04_03 USING btree (inserted_at DESC, topic) WHERE ((extension = 'broadcast'::text) AND (private IS TRUE));


--
-- TOC entry 4355 (class 1259 OID 34160)
-- Name: messages_2026_04_04_inserted_at_topic_idx; Type: INDEX; Schema: realtime; Owner: supabase_admin
--

CREATE INDEX messages_2026_04_04_inserted_at_topic_idx ON realtime.messages_2026_04_04 USING btree (inserted_at DESC, topic) WHERE ((extension = 'broadcast'::text) AND (private IS TRUE));


--
-- TOC entry 4361 (class 1259 OID 35332)
-- Name: messages_2026_04_05_inserted_at_topic_idx; Type: INDEX; Schema: realtime; Owner: supabase_admin
--

CREATE INDEX messages_2026_04_05_inserted_at_topic_idx ON realtime.messages_2026_04_05 USING btree (inserted_at DESC, topic) WHERE ((extension = 'broadcast'::text) AND (private IS TRUE));


--
-- TOC entry 4364 (class 1259 OID 36457)
-- Name: messages_2026_04_06_inserted_at_topic_idx; Type: INDEX; Schema: realtime; Owner: supabase_admin
--

CREATE INDEX messages_2026_04_06_inserted_at_topic_idx ON realtime.messages_2026_04_06 USING btree (inserted_at DESC, topic) WHERE ((extension = 'broadcast'::text) AND (private IS TRUE));


--
-- TOC entry 4367 (class 1259 OID 36496)
-- Name: messages_2026_04_07_inserted_at_topic_idx; Type: INDEX; Schema: realtime; Owner: supabase_admin
--

CREATE INDEX messages_2026_04_07_inserted_at_topic_idx ON realtime.messages_2026_04_07 USING btree (inserted_at DESC, topic) WHERE ((extension = 'broadcast'::text) AND (private IS TRUE));


--
-- TOC entry 4265 (class 1259 OID 17448)
-- Name: subscription_subscription_id_entity_filters_action_filter_key; Type: INDEX; Schema: realtime; Owner: supabase_admin
--

CREATE UNIQUE INDEX subscription_subscription_id_entity_filters_action_filter_key ON realtime.subscription USING btree (subscription_id, entity, filters, action_filter);


--
-- TOC entry 4238 (class 1259 OID 17095)
-- Name: bname; Type: INDEX; Schema: storage; Owner: supabase_storage_admin
--

CREATE UNIQUE INDEX bname ON storage.buckets USING btree (name);


--
-- TOC entry 4241 (class 1259 OID 17112)
-- Name: bucketid_objname; Type: INDEX; Schema: storage; Owner: supabase_storage_admin
--

CREATE UNIQUE INDEX bucketid_objname ON storage.objects USING btree (bucket_id, name);


--
-- TOC entry 4254 (class 1259 OID 17253)
-- Name: buckets_analytics_unique_name_idx; Type: INDEX; Schema: storage; Owner: supabase_storage_admin
--

CREATE UNIQUE INDEX buckets_analytics_unique_name_idx ON storage.buckets_analytics USING btree (name) WHERE (deleted_at IS NULL);


--
-- TOC entry 4247 (class 1259 OID 17179)
-- Name: idx_multipart_uploads_list; Type: INDEX; Schema: storage; Owner: supabase_storage_admin
--

CREATE INDEX idx_multipart_uploads_list ON storage.s3_multipart_uploads USING btree (bucket_id, key, created_at);


--
-- TOC entry 4242 (class 1259 OID 17144)
-- Name: idx_objects_bucket_id_name; Type: INDEX; Schema: storage; Owner: supabase_storage_admin
--

CREATE INDEX idx_objects_bucket_id_name ON storage.objects USING btree (bucket_id, name COLLATE "C");


--
-- TOC entry 4243 (class 1259 OID 17260)
-- Name: idx_objects_bucket_id_name_lower; Type: INDEX; Schema: storage; Owner: supabase_storage_admin
--

CREATE INDEX idx_objects_bucket_id_name_lower ON storage.objects USING btree (bucket_id, lower(name) COLLATE "C");


--
-- TOC entry 4244 (class 1259 OID 17113)
-- Name: name_prefix_search; Type: INDEX; Schema: storage; Owner: supabase_storage_admin
--

CREATE INDEX name_prefix_search ON storage.objects USING btree (name text_pattern_ops);


--
-- TOC entry 4257 (class 1259 OID 17244)
-- Name: vector_indexes_name_bucket_id_idx; Type: INDEX; Schema: storage; Owner: supabase_storage_admin
--

CREATE UNIQUE INDEX vector_indexes_name_bucket_id_idx ON storage.vector_indexes USING btree (name, bucket_id);


--
-- TOC entry 4370 (class 0 OID 0)
-- Name: messages_2026_04_01_inserted_at_topic_idx; Type: INDEX ATTACH; Schema: realtime; Owner: supabase_realtime_admin
--

ALTER INDEX realtime.messages_inserted_at_topic_index ATTACH PARTITION realtime.messages_2026_04_01_inserted_at_topic_idx;


--
-- TOC entry 4371 (class 0 OID 0)
-- Name: messages_2026_04_01_pkey; Type: INDEX ATTACH; Schema: realtime; Owner: supabase_realtime_admin
--

ALTER INDEX realtime.messages_pkey ATTACH PARTITION realtime.messages_2026_04_01_pkey;


--
-- TOC entry 4372 (class 0 OID 0)
-- Name: messages_2026_04_02_inserted_at_topic_idx; Type: INDEX ATTACH; Schema: realtime; Owner: supabase_realtime_admin
--

ALTER INDEX realtime.messages_inserted_at_topic_index ATTACH PARTITION realtime.messages_2026_04_02_inserted_at_topic_idx;


--
-- TOC entry 4373 (class 0 OID 0)
-- Name: messages_2026_04_02_pkey; Type: INDEX ATTACH; Schema: realtime; Owner: supabase_realtime_admin
--

ALTER INDEX realtime.messages_pkey ATTACH PARTITION realtime.messages_2026_04_02_pkey;


--
-- TOC entry 4374 (class 0 OID 0)
-- Name: messages_2026_04_03_inserted_at_topic_idx; Type: INDEX ATTACH; Schema: realtime; Owner: supabase_realtime_admin
--

ALTER INDEX realtime.messages_inserted_at_topic_index ATTACH PARTITION realtime.messages_2026_04_03_inserted_at_topic_idx;


--
-- TOC entry 4375 (class 0 OID 0)
-- Name: messages_2026_04_03_pkey; Type: INDEX ATTACH; Schema: realtime; Owner: supabase_realtime_admin
--

ALTER INDEX realtime.messages_pkey ATTACH PARTITION realtime.messages_2026_04_03_pkey;


--
-- TOC entry 4376 (class 0 OID 0)
-- Name: messages_2026_04_04_inserted_at_topic_idx; Type: INDEX ATTACH; Schema: realtime; Owner: supabase_realtime_admin
--

ALTER INDEX realtime.messages_inserted_at_topic_index ATTACH PARTITION realtime.messages_2026_04_04_inserted_at_topic_idx;


--
-- TOC entry 4377 (class 0 OID 0)
-- Name: messages_2026_04_04_pkey; Type: INDEX ATTACH; Schema: realtime; Owner: supabase_realtime_admin
--

ALTER INDEX realtime.messages_pkey ATTACH PARTITION realtime.messages_2026_04_04_pkey;


--
-- TOC entry 4378 (class 0 OID 0)
-- Name: messages_2026_04_05_inserted_at_topic_idx; Type: INDEX ATTACH; Schema: realtime; Owner: supabase_realtime_admin
--

ALTER INDEX realtime.messages_inserted_at_topic_index ATTACH PARTITION realtime.messages_2026_04_05_inserted_at_topic_idx;


--
-- TOC entry 4379 (class 0 OID 0)
-- Name: messages_2026_04_05_pkey; Type: INDEX ATTACH; Schema: realtime; Owner: supabase_realtime_admin
--

ALTER INDEX realtime.messages_pkey ATTACH PARTITION realtime.messages_2026_04_05_pkey;


--
-- TOC entry 4380 (class 0 OID 0)
-- Name: messages_2026_04_06_inserted_at_topic_idx; Type: INDEX ATTACH; Schema: realtime; Owner: supabase_realtime_admin
--

ALTER INDEX realtime.messages_inserted_at_topic_index ATTACH PARTITION realtime.messages_2026_04_06_inserted_at_topic_idx;


--
-- TOC entry 4381 (class 0 OID 0)
-- Name: messages_2026_04_06_pkey; Type: INDEX ATTACH; Schema: realtime; Owner: supabase_realtime_admin
--

ALTER INDEX realtime.messages_pkey ATTACH PARTITION realtime.messages_2026_04_06_pkey;


--
-- TOC entry 4382 (class 0 OID 0)
-- Name: messages_2026_04_07_inserted_at_topic_idx; Type: INDEX ATTACH; Schema: realtime; Owner: supabase_realtime_admin
--

ALTER INDEX realtime.messages_inserted_at_topic_index ATTACH PARTITION realtime.messages_2026_04_07_inserted_at_topic_idx;


--
-- TOC entry 4383 (class 0 OID 0)
-- Name: messages_2026_04_07_pkey; Type: INDEX ATTACH; Schema: realtime; Owner: supabase_realtime_admin
--

ALTER INDEX realtime.messages_pkey ATTACH PARTITION realtime.messages_2026_04_07_pkey;


--
-- TOC entry 4418 (class 2620 OID 18246)
-- Name: profiles handle_updated_at; Type: TRIGGER; Schema: public; Owner: postgres
--

CREATE TRIGGER handle_updated_at BEFORE UPDATE ON public.profiles FOR EACH ROW EXECUTE FUNCTION public.handle_updated_at();


--
-- TOC entry 4423 (class 2620 OID 27422)
-- Name: dive_site_pages update_dive_site_pages_updated_at; Type: TRIGGER; Schema: public; Owner: postgres
--

CREATE TRIGGER update_dive_site_pages_updated_at BEFORE UPDATE ON public.dive_site_pages FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();


--
-- TOC entry 4419 (class 2620 OID 25260)
-- Name: page_content update_page_content_updated_at; Type: TRIGGER; Schema: public; Owner: postgres
--

CREATE TRIGGER update_page_content_updated_at BEFORE UPDATE ON public.page_content FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();


--
-- TOC entry 4420 (class 2620 OID 25326)
-- Name: page_metadata update_page_metadata_updated_at; Type: TRIGGER; Schema: public; Owner: postgres
--

CREATE TRIGGER update_page_metadata_updated_at BEFORE UPDATE ON public.page_metadata FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();


--
-- TOC entry 4422 (class 2620 OID 25328)
-- Name: page_security update_page_security_updated_at; Type: TRIGGER; Schema: public; Owner: postgres
--

CREATE TRIGGER update_page_security_updated_at BEFORE UPDATE ON public.page_security FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();


--
-- TOC entry 4421 (class 2620 OID 25327)
-- Name: page_seo update_page_seo_updated_at; Type: TRIGGER; Schema: public; Owner: postgres
--

CREATE TRIGGER update_page_seo_updated_at BEFORE UPDATE ON public.page_seo FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();


--
-- TOC entry 4417 (class 2620 OID 17302)
-- Name: subscription tr_check_filters; Type: TRIGGER; Schema: realtime; Owner: supabase_admin
--

CREATE TRIGGER tr_check_filters BEFORE INSERT OR UPDATE ON realtime.subscription FOR EACH ROW EXECUTE FUNCTION realtime.subscription_check_filters();


--
-- TOC entry 4413 (class 2620 OID 17198)
-- Name: buckets enforce_bucket_name_length_trigger; Type: TRIGGER; Schema: storage; Owner: supabase_storage_admin
--

CREATE TRIGGER enforce_bucket_name_length_trigger BEFORE INSERT OR UPDATE OF name ON storage.buckets FOR EACH ROW EXECUTE FUNCTION storage.enforce_bucket_name_length();


--
-- TOC entry 4414 (class 2620 OID 17262)
-- Name: buckets protect_buckets_delete; Type: TRIGGER; Schema: storage; Owner: supabase_storage_admin
--

CREATE TRIGGER protect_buckets_delete BEFORE DELETE ON storage.buckets FOR EACH STATEMENT EXECUTE FUNCTION storage.protect_delete();


--
-- TOC entry 4415 (class 2620 OID 17263)
-- Name: objects protect_objects_delete; Type: TRIGGER; Schema: storage; Owner: supabase_storage_admin
--

CREATE TRIGGER protect_objects_delete BEFORE DELETE ON storage.objects FOR EACH STATEMENT EXECUTE FUNCTION storage.protect_delete();


--
-- TOC entry 4416 (class 2620 OID 17132)
-- Name: objects update_objects_updated_at; Type: TRIGGER; Schema: storage; Owner: supabase_storage_admin
--

CREATE TRIGGER update_objects_updated_at BEFORE UPDATE ON storage.objects FOR EACH ROW EXECUTE FUNCTION storage.update_updated_at_column();


--
-- TOC entry 4385 (class 2606 OID 16688)
-- Name: identities identities_user_id_fkey; Type: FK CONSTRAINT; Schema: auth; Owner: supabase_auth_admin
--

ALTER TABLE ONLY auth.identities
    ADD CONSTRAINT identities_user_id_fkey FOREIGN KEY (user_id) REFERENCES auth.users(id) ON DELETE CASCADE;


--
-- TOC entry 4390 (class 2606 OID 16777)
-- Name: mfa_amr_claims mfa_amr_claims_session_id_fkey; Type: FK CONSTRAINT; Schema: auth; Owner: supabase_auth_admin
--

ALTER TABLE ONLY auth.mfa_amr_claims
    ADD CONSTRAINT mfa_amr_claims_session_id_fkey FOREIGN KEY (session_id) REFERENCES auth.sessions(id) ON DELETE CASCADE;


--
-- TOC entry 4389 (class 2606 OID 16765)
-- Name: mfa_challenges mfa_challenges_auth_factor_id_fkey; Type: FK CONSTRAINT; Schema: auth; Owner: supabase_auth_admin
--

ALTER TABLE ONLY auth.mfa_challenges
    ADD CONSTRAINT mfa_challenges_auth_factor_id_fkey FOREIGN KEY (factor_id) REFERENCES auth.mfa_factors(id) ON DELETE CASCADE;


--
-- TOC entry 4388 (class 2606 OID 16752)
-- Name: mfa_factors mfa_factors_user_id_fkey; Type: FK CONSTRAINT; Schema: auth; Owner: supabase_auth_admin
--

ALTER TABLE ONLY auth.mfa_factors
    ADD CONSTRAINT mfa_factors_user_id_fkey FOREIGN KEY (user_id) REFERENCES auth.users(id) ON DELETE CASCADE;


--
-- TOC entry 4396 (class 2606 OID 17017)
-- Name: oauth_authorizations oauth_authorizations_client_id_fkey; Type: FK CONSTRAINT; Schema: auth; Owner: supabase_auth_admin
--

ALTER TABLE ONLY auth.oauth_authorizations
    ADD CONSTRAINT oauth_authorizations_client_id_fkey FOREIGN KEY (client_id) REFERENCES auth.oauth_clients(id) ON DELETE CASCADE;


--
-- TOC entry 4397 (class 2606 OID 17022)
-- Name: oauth_authorizations oauth_authorizations_user_id_fkey; Type: FK CONSTRAINT; Schema: auth; Owner: supabase_auth_admin
--

ALTER TABLE ONLY auth.oauth_authorizations
    ADD CONSTRAINT oauth_authorizations_user_id_fkey FOREIGN KEY (user_id) REFERENCES auth.users(id) ON DELETE CASCADE;


--
-- TOC entry 4398 (class 2606 OID 17046)
-- Name: oauth_consents oauth_consents_client_id_fkey; Type: FK CONSTRAINT; Schema: auth; Owner: supabase_auth_admin
--

ALTER TABLE ONLY auth.oauth_consents
    ADD CONSTRAINT oauth_consents_client_id_fkey FOREIGN KEY (client_id) REFERENCES auth.oauth_clients(id) ON DELETE CASCADE;


--
-- TOC entry 4399 (class 2606 OID 17041)
-- Name: oauth_consents oauth_consents_user_id_fkey; Type: FK CONSTRAINT; Schema: auth; Owner: supabase_auth_admin
--

ALTER TABLE ONLY auth.oauth_consents
    ADD CONSTRAINT oauth_consents_user_id_fkey FOREIGN KEY (user_id) REFERENCES auth.users(id) ON DELETE CASCADE;


--
-- TOC entry 4395 (class 2606 OID 16943)
-- Name: one_time_tokens one_time_tokens_user_id_fkey; Type: FK CONSTRAINT; Schema: auth; Owner: supabase_auth_admin
--

ALTER TABLE ONLY auth.one_time_tokens
    ADD CONSTRAINT one_time_tokens_user_id_fkey FOREIGN KEY (user_id) REFERENCES auth.users(id) ON DELETE CASCADE;


--
-- TOC entry 4384 (class 2606 OID 16721)
-- Name: refresh_tokens refresh_tokens_session_id_fkey; Type: FK CONSTRAINT; Schema: auth; Owner: supabase_auth_admin
--

ALTER TABLE ONLY auth.refresh_tokens
    ADD CONSTRAINT refresh_tokens_session_id_fkey FOREIGN KEY (session_id) REFERENCES auth.sessions(id) ON DELETE CASCADE;


--
-- TOC entry 4392 (class 2606 OID 16824)
-- Name: saml_providers saml_providers_sso_provider_id_fkey; Type: FK CONSTRAINT; Schema: auth; Owner: supabase_auth_admin
--

ALTER TABLE ONLY auth.saml_providers
    ADD CONSTRAINT saml_providers_sso_provider_id_fkey FOREIGN KEY (sso_provider_id) REFERENCES auth.sso_providers(id) ON DELETE CASCADE;


--
-- TOC entry 4393 (class 2606 OID 16897)
-- Name: saml_relay_states saml_relay_states_flow_state_id_fkey; Type: FK CONSTRAINT; Schema: auth; Owner: supabase_auth_admin
--

ALTER TABLE ONLY auth.saml_relay_states
    ADD CONSTRAINT saml_relay_states_flow_state_id_fkey FOREIGN KEY (flow_state_id) REFERENCES auth.flow_state(id) ON DELETE CASCADE;


--
-- TOC entry 4394 (class 2606 OID 16838)
-- Name: saml_relay_states saml_relay_states_sso_provider_id_fkey; Type: FK CONSTRAINT; Schema: auth; Owner: supabase_auth_admin
--

ALTER TABLE ONLY auth.saml_relay_states
    ADD CONSTRAINT saml_relay_states_sso_provider_id_fkey FOREIGN KEY (sso_provider_id) REFERENCES auth.sso_providers(id) ON DELETE CASCADE;


--
-- TOC entry 4386 (class 2606 OID 17060)
-- Name: sessions sessions_oauth_client_id_fkey; Type: FK CONSTRAINT; Schema: auth; Owner: supabase_auth_admin
--

ALTER TABLE ONLY auth.sessions
    ADD CONSTRAINT sessions_oauth_client_id_fkey FOREIGN KEY (oauth_client_id) REFERENCES auth.oauth_clients(id) ON DELETE CASCADE;


--
-- TOC entry 4387 (class 2606 OID 16716)
-- Name: sessions sessions_user_id_fkey; Type: FK CONSTRAINT; Schema: auth; Owner: supabase_auth_admin
--

ALTER TABLE ONLY auth.sessions
    ADD CONSTRAINT sessions_user_id_fkey FOREIGN KEY (user_id) REFERENCES auth.users(id) ON DELETE CASCADE;


--
-- TOC entry 4391 (class 2606 OID 16805)
-- Name: sso_domains sso_domains_sso_provider_id_fkey; Type: FK CONSTRAINT; Schema: auth; Owner: supabase_auth_admin
--

ALTER TABLE ONLY auth.sso_domains
    ADD CONSTRAINT sso_domains_sso_provider_id_fkey FOREIGN KEY (sso_provider_id) REFERENCES auth.sso_providers(id) ON DELETE CASCADE;


--
-- TOC entry 4411 (class 2606 OID 27355)
-- Name: webauthn_challenges webauthn_challenges_user_id_fkey; Type: FK CONSTRAINT; Schema: auth; Owner: supabase_auth_admin
--

ALTER TABLE ONLY auth.webauthn_challenges
    ADD CONSTRAINT webauthn_challenges_user_id_fkey FOREIGN KEY (user_id) REFERENCES auth.users(id) ON DELETE CASCADE;


--
-- TOC entry 4410 (class 2606 OID 27338)
-- Name: webauthn_credentials webauthn_credentials_user_id_fkey; Type: FK CONSTRAINT; Schema: auth; Owner: supabase_auth_admin
--

ALTER TABLE ONLY auth.webauthn_credentials
    ADD CONSTRAINT webauthn_credentials_user_id_fkey FOREIGN KEY (user_id) REFERENCES auth.users(id) ON DELETE CASCADE;


--
-- TOC entry 4408 (class 2606 OID 25316)
-- Name: page_security fk_page_metadata; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.page_security
    ADD CONSTRAINT fk_page_metadata FOREIGN KEY (page_slug) REFERENCES public.page_metadata(page_slug) ON DELETE CASCADE;


--
-- TOC entry 4407 (class 2606 OID 25291)
-- Name: page_seo fk_page_metadata; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.page_seo
    ADD CONSTRAINT fk_page_metadata FOREIGN KEY (page_slug) REFERENCES public.page_metadata(page_slug) ON DELETE CASCADE;


--
-- TOC entry 4406 (class 2606 OID 18237)
-- Name: profiles profiles_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.profiles
    ADD CONSTRAINT profiles_id_fkey FOREIGN KEY (id) REFERENCES auth.users(id) ON DELETE CASCADE;


--
-- TOC entry 4412 (class 2606 OID 34198)
-- Name: project_tasks project_tasks_assigned_to_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.project_tasks
    ADD CONSTRAINT project_tasks_assigned_to_fkey FOREIGN KEY (assigned_to) REFERENCES public.users(id) ON DELETE SET NULL;


--
-- TOC entry 4405 (class 2606 OID 18204)
-- Name: user_roles user_roles_user_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.user_roles
    ADD CONSTRAINT user_roles_user_id_fkey FOREIGN KEY (user_id) REFERENCES auth.users(id) ON DELETE CASCADE;


--
-- TOC entry 4409 (class 2606 OID 27134)
-- Name: vouchers vouchers_booking_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.vouchers
    ADD CONSTRAINT vouchers_booking_id_fkey FOREIGN KEY (booking_id) REFERENCES public.booking_inquiries(id);


--
-- TOC entry 4400 (class 2606 OID 17107)
-- Name: objects objects_bucketId_fkey; Type: FK CONSTRAINT; Schema: storage; Owner: supabase_storage_admin
--

ALTER TABLE ONLY storage.objects
    ADD CONSTRAINT "objects_bucketId_fkey" FOREIGN KEY (bucket_id) REFERENCES storage.buckets(id);


--
-- TOC entry 4401 (class 2606 OID 17154)
-- Name: s3_multipart_uploads s3_multipart_uploads_bucket_id_fkey; Type: FK CONSTRAINT; Schema: storage; Owner: supabase_storage_admin
--

ALTER TABLE ONLY storage.s3_multipart_uploads
    ADD CONSTRAINT s3_multipart_uploads_bucket_id_fkey FOREIGN KEY (bucket_id) REFERENCES storage.buckets(id);


--
-- TOC entry 4402 (class 2606 OID 17174)
-- Name: s3_multipart_uploads_parts s3_multipart_uploads_parts_bucket_id_fkey; Type: FK CONSTRAINT; Schema: storage; Owner: supabase_storage_admin
--

ALTER TABLE ONLY storage.s3_multipart_uploads_parts
    ADD CONSTRAINT s3_multipart_uploads_parts_bucket_id_fkey FOREIGN KEY (bucket_id) REFERENCES storage.buckets(id);


--
-- TOC entry 4403 (class 2606 OID 17169)
-- Name: s3_multipart_uploads_parts s3_multipart_uploads_parts_upload_id_fkey; Type: FK CONSTRAINT; Schema: storage; Owner: supabase_storage_admin
--

ALTER TABLE ONLY storage.s3_multipart_uploads_parts
    ADD CONSTRAINT s3_multipart_uploads_parts_upload_id_fkey FOREIGN KEY (upload_id) REFERENCES storage.s3_multipart_uploads(id) ON DELETE CASCADE;


--
-- TOC entry 4404 (class 2606 OID 17239)
-- Name: vector_indexes vector_indexes_bucket_id_fkey; Type: FK CONSTRAINT; Schema: storage; Owner: supabase_storage_admin
--

ALTER TABLE ONLY storage.vector_indexes
    ADD CONSTRAINT vector_indexes_bucket_id_fkey FOREIGN KEY (bucket_id) REFERENCES storage.buckets_vectors(id);


--
-- TOC entry 4577 (class 0 OID 16529)
-- Dependencies: 362
-- Name: audit_log_entries; Type: ROW SECURITY; Schema: auth; Owner: supabase_auth_admin
--

ALTER TABLE auth.audit_log_entries ENABLE ROW LEVEL SECURITY;

--
-- TOC entry 4588 (class 0 OID 16883)
-- Dependencies: 376
-- Name: flow_state; Type: ROW SECURITY; Schema: auth; Owner: supabase_auth_admin
--

ALTER TABLE auth.flow_state ENABLE ROW LEVEL SECURITY;

--
-- TOC entry 4579 (class 0 OID 16681)
-- Dependencies: 367
-- Name: identities; Type: ROW SECURITY; Schema: auth; Owner: supabase_auth_admin
--

ALTER TABLE auth.identities ENABLE ROW LEVEL SECURITY;

--
-- TOC entry 4576 (class 0 OID 16522)
-- Dependencies: 361
-- Name: instances; Type: ROW SECURITY; Schema: auth; Owner: supabase_auth_admin
--

ALTER TABLE auth.instances ENABLE ROW LEVEL SECURITY;

--
-- TOC entry 4583 (class 0 OID 16770)
-- Dependencies: 371
-- Name: mfa_amr_claims; Type: ROW SECURITY; Schema: auth; Owner: supabase_auth_admin
--

ALTER TABLE auth.mfa_amr_claims ENABLE ROW LEVEL SECURITY;

--
-- TOC entry 4582 (class 0 OID 16758)
-- Dependencies: 370
-- Name: mfa_challenges; Type: ROW SECURITY; Schema: auth; Owner: supabase_auth_admin
--

ALTER TABLE auth.mfa_challenges ENABLE ROW LEVEL SECURITY;

--
-- TOC entry 4581 (class 0 OID 16745)
-- Dependencies: 369
-- Name: mfa_factors; Type: ROW SECURITY; Schema: auth; Owner: supabase_auth_admin
--

ALTER TABLE auth.mfa_factors ENABLE ROW LEVEL SECURITY;

--
-- TOC entry 4589 (class 0 OID 16933)
-- Dependencies: 377
-- Name: one_time_tokens; Type: ROW SECURITY; Schema: auth; Owner: supabase_auth_admin
--

ALTER TABLE auth.one_time_tokens ENABLE ROW LEVEL SECURITY;

--
-- TOC entry 4575 (class 0 OID 16511)
-- Dependencies: 360
-- Name: refresh_tokens; Type: ROW SECURITY; Schema: auth; Owner: supabase_auth_admin
--

ALTER TABLE auth.refresh_tokens ENABLE ROW LEVEL SECURITY;

--
-- TOC entry 4586 (class 0 OID 16812)
-- Dependencies: 374
-- Name: saml_providers; Type: ROW SECURITY; Schema: auth; Owner: supabase_auth_admin
--

ALTER TABLE auth.saml_providers ENABLE ROW LEVEL SECURITY;

--
-- TOC entry 4587 (class 0 OID 16830)
-- Dependencies: 375
-- Name: saml_relay_states; Type: ROW SECURITY; Schema: auth; Owner: supabase_auth_admin
--

ALTER TABLE auth.saml_relay_states ENABLE ROW LEVEL SECURITY;

--
-- TOC entry 4578 (class 0 OID 16537)
-- Dependencies: 363
-- Name: schema_migrations; Type: ROW SECURITY; Schema: auth; Owner: supabase_auth_admin
--

ALTER TABLE auth.schema_migrations ENABLE ROW LEVEL SECURITY;

--
-- TOC entry 4580 (class 0 OID 16711)
-- Dependencies: 368
-- Name: sessions; Type: ROW SECURITY; Schema: auth; Owner: supabase_auth_admin
--

ALTER TABLE auth.sessions ENABLE ROW LEVEL SECURITY;

--
-- TOC entry 4585 (class 0 OID 16797)
-- Dependencies: 373
-- Name: sso_domains; Type: ROW SECURITY; Schema: auth; Owner: supabase_auth_admin
--

ALTER TABLE auth.sso_domains ENABLE ROW LEVEL SECURITY;

--
-- TOC entry 4584 (class 0 OID 16788)
-- Dependencies: 372
-- Name: sso_providers; Type: ROW SECURITY; Schema: auth; Owner: supabase_auth_admin
--

ALTER TABLE auth.sso_providers ENABLE ROW LEVEL SECURITY;

--
-- TOC entry 4574 (class 0 OID 16499)
-- Dependencies: 358
-- Name: users; Type: ROW SECURITY; Schema: auth; Owner: supabase_auth_admin
--

ALTER TABLE auth.users ENABLE ROW LEVEL SECURITY;

--
-- TOC entry 4634 (class 3256 OID 18226)
-- Name: booking_inquiries Admins can delete booking inquiries; Type: POLICY; Schema: public; Owner: postgres
--

CREATE POLICY "Admins can delete booking inquiries" ON public.booking_inquiries FOR DELETE TO authenticated USING (public.has_role(auth.uid(), 'admin'::public.app_role));


--
-- TOC entry 4630 (class 3256 OID 18222)
-- Name: user_roles Admins can manage roles; Type: POLICY; Schema: public; Owner: postgres
--

CREATE POLICY "Admins can manage roles" ON public.user_roles TO authenticated USING (public.has_role(auth.uid(), 'admin'::public.app_role));


--
-- TOC entry 4632 (class 3256 OID 18224)
-- Name: admin_settings Admins can manage settings; Type: POLICY; Schema: public; Owner: postgres
--

CREATE POLICY "Admins can manage settings" ON public.admin_settings TO authenticated USING (public.has_role(auth.uid(), 'admin'::public.app_role));


--
-- TOC entry 4635 (class 3256 OID 18227)
-- Name: booking_inquiries Admins can update booking inquiries; Type: POLICY; Schema: public; Owner: postgres
--

CREATE POLICY "Admins can update booking inquiries" ON public.booking_inquiries FOR UPDATE TO authenticated USING (public.has_role(auth.uid(), 'admin'::public.app_role));


--
-- TOC entry 4629 (class 3256 OID 18221)
-- Name: user_roles Admins can view all roles; Type: POLICY; Schema: public; Owner: postgres
--

CREATE POLICY "Admins can view all roles" ON public.user_roles FOR SELECT TO authenticated USING (public.has_role(auth.uid(), 'admin'::public.app_role));


--
-- TOC entry 4633 (class 3256 OID 18225)
-- Name: booking_inquiries Admins can view booking inquiries; Type: POLICY; Schema: public; Owner: postgres
--

CREATE POLICY "Admins can view booking inquiries" ON public.booking_inquiries FOR SELECT TO authenticated USING (public.has_role(auth.uid(), 'admin'::public.app_role));


--
-- TOC entry 4649 (class 3256 OID 32107)
-- Name: role_change_audit Admins can view role change audit; Type: POLICY; Schema: public; Owner: postgres
--

CREATE POLICY "Admins can view role change audit" ON public.role_change_audit FOR SELECT TO authenticated USING (public.has_role(auth.uid(), 'admin'::public.app_role));


--
-- TOC entry 4631 (class 3256 OID 18223)
-- Name: admin_settings Admins can view settings; Type: POLICY; Schema: public; Owner: postgres
--

CREATE POLICY "Admins can view settings" ON public.admin_settings FOR SELECT TO authenticated USING (public.has_role(auth.uid(), 'admin'::public.app_role));


--
-- TOC entry 4647 (class 3256 OID 27272)
-- Name: page_content Allow all; Type: POLICY; Schema: public; Owner: postgres
--

CREATE POLICY "Allow all" ON public.page_content USING (true);


--
-- TOC entry 4648 (class 3256 OID 25859)
-- Name: bookings Allow all updates on bookings; Type: POLICY; Schema: public; Owner: postgres
--

CREATE POLICY "Allow all updates on bookings" ON public.bookings FOR UPDATE USING (true);


--
-- TOC entry 4643 (class 3256 OID 18254)
-- Name: booking_inquiries Allow authenticated users to delete bookings; Type: POLICY; Schema: public; Owner: postgres
--

CREATE POLICY "Allow authenticated users to delete bookings" ON public.booking_inquiries FOR DELETE USING ((auth.uid() IS NOT NULL));


--
-- TOC entry 4641 (class 3256 OID 18252)
-- Name: booking_inquiries Allow authenticated users to insert bookings; Type: POLICY; Schema: public; Owner: postgres
--

CREATE POLICY "Allow authenticated users to insert bookings" ON public.booking_inquiries FOR INSERT WITH CHECK ((auth.uid() IS NOT NULL));


--
-- TOC entry 4619 (class 3256 OID 25257)
-- Name: page_content Allow authenticated users to manage page_content; Type: POLICY; Schema: public; Owner: postgres
--

CREATE POLICY "Allow authenticated users to manage page_content" ON public.page_content USING ((auth.role() = 'authenticated'::text));


--
-- TOC entry 4625 (class 3256 OID 25331)
-- Name: page_metadata Allow authenticated users to manage page_metadata; Type: POLICY; Schema: public; Owner: postgres
--

CREATE POLICY "Allow authenticated users to manage page_metadata" ON public.page_metadata TO authenticated USING (true) WITH CHECK (true);


--
-- TOC entry 4627 (class 3256 OID 25333)
-- Name: page_security Allow authenticated users to manage page_security; Type: POLICY; Schema: public; Owner: postgres
--

CREATE POLICY "Allow authenticated users to manage page_security" ON public.page_security TO authenticated USING (true) WITH CHECK (true);


--
-- TOC entry 4626 (class 3256 OID 25332)
-- Name: page_seo Allow authenticated users to manage page_seo; Type: POLICY; Schema: public; Owner: postgres
--

CREATE POLICY "Allow authenticated users to manage page_seo" ON public.page_seo TO authenticated USING (true) WITH CHECK (true);


--
-- TOC entry 4642 (class 3256 OID 18253)
-- Name: booking_inquiries Allow authenticated users to update bookings; Type: POLICY; Schema: public; Owner: postgres
--

CREATE POLICY "Allow authenticated users to update bookings" ON public.booking_inquiries FOR UPDATE USING ((auth.uid() IS NOT NULL));


--
-- TOC entry 4640 (class 3256 OID 18251)
-- Name: booking_inquiries Allow authenticated users to view all bookings; Type: POLICY; Schema: public; Owner: postgres
--

CREATE POLICY "Allow authenticated users to view all bookings" ON public.booking_inquiries FOR SELECT USING ((auth.uid() IS NOT NULL));


--
-- TOC entry 4623 (class 3256 OID 25329)
-- Name: page_metadata Allow public read access to page_metadata; Type: POLICY; Schema: public; Owner: postgres
--

CREATE POLICY "Allow public read access to page_metadata" ON public.page_metadata FOR SELECT USING (true);


--
-- TOC entry 4624 (class 3256 OID 25330)
-- Name: page_seo Allow public read access to page_seo; Type: POLICY; Schema: public; Owner: postgres
--

CREATE POLICY "Allow public read access to page_seo" ON public.page_seo FOR SELECT USING (true);


--
-- TOC entry 4650 (class 3256 OID 27083)
-- Name: emails Allow read access to emails for all; Type: POLICY; Schema: public; Owner: postgres
--

CREATE POLICY "Allow read access to emails for all" ON public.emails FOR SELECT USING (true);


--
-- TOC entry 4645 (class 3256 OID 25601)
-- Name: newdiving Allow select for all; Type: POLICY; Schema: public; Owner: postgres
--

CREATE POLICY "Allow select for all" ON public.newdiving FOR SELECT USING (true);


--
-- TOC entry 4617 (class 3256 OID 19454)
-- Name: affiliate_clicks Anyone can insert affiliate clicks; Type: POLICY; Schema: public; Owner: postgres
--

CREATE POLICY "Anyone can insert affiliate clicks" ON public.affiliate_clicks FOR INSERT TO authenticated, anon WITH CHECK (true);


--
-- TOC entry 4628 (class 3256 OID 18189)
-- Name: booking_inquiries Anyone can submit booking inquiries; Type: POLICY; Schema: public; Owner: postgres
--

CREATE POLICY "Anyone can submit booking inquiries" ON public.booking_inquiries FOR INSERT WITH CHECK (true);


--
-- TOC entry 4622 (class 3256 OID 19456)
-- Name: affiliate_clicks Anyone can view affiliate clicks; Type: POLICY; Schema: public; Owner: postgres
--

CREATE POLICY "Anyone can view affiliate clicks" ON public.affiliate_clicks FOR SELECT TO authenticated, anon USING (true);


--
-- TOC entry 4644 (class 3256 OID 19510)
-- Name: booking_inquiries Authenticated insert bookings; Type: POLICY; Schema: public; Owner: postgres
--

CREATE POLICY "Authenticated insert bookings" ON public.booking_inquiries FOR INSERT WITH CHECK ((auth.uid() IS NOT NULL));


--
-- TOC entry 4639 (class 3256 OID 19509)
-- Name: booking_inquiries Authenticated select bookings; Type: POLICY; Schema: public; Owner: postgres
--

CREATE POLICY "Authenticated select bookings" ON public.booking_inquiries FOR SELECT USING ((auth.uid() IS NOT NULL));


--
-- TOC entry 4620 (class 3256 OID 25590)
-- Name: booking_inquiries Enable read access for all users; Type: POLICY; Schema: public; Owner: postgres
--

CREATE POLICY "Enable read access for all users" ON public.booking_inquiries FOR SELECT USING (true);


--
-- TOC entry 4621 (class 3256 OID 27165)
-- Name: emails Enable read access for all users; Type: POLICY; Schema: public; Owner: postgres
--

CREATE POLICY "Enable read access for all users" ON public.emails FOR SELECT USING (true);


--
-- TOC entry 4618 (class 3256 OID 25256)
-- Name: page_content Enable read access for all users; Type: POLICY; Schema: public; Owner: postgres
--

CREATE POLICY "Enable read access for all users" ON public.page_content FOR SELECT USING (true);


--
-- TOC entry 4646 (class 3256 OID 25632)
-- Name: booking_inquiries Policy to implement Time To Live (TTL); Type: POLICY; Schema: public; Owner: postgres
--

CREATE POLICY "Policy to implement Time To Live (TTL)" ON public.booking_inquiries USING ((created_at > (CURRENT_TIMESTAMP - '1 day'::interval)));


--
-- TOC entry 4638 (class 3256 OID 18244)
-- Name: profiles Users can insert own profile; Type: POLICY; Schema: public; Owner: postgres
--

CREATE POLICY "Users can insert own profile" ON public.profiles FOR INSERT WITH CHECK ((auth.uid() = id));


--
-- TOC entry 4637 (class 3256 OID 18243)
-- Name: profiles Users can update own profile; Type: POLICY; Schema: public; Owner: postgres
--

CREATE POLICY "Users can update own profile" ON public.profiles FOR UPDATE USING ((auth.uid() = id));


--
-- TOC entry 4636 (class 3256 OID 18242)
-- Name: profiles Users can view own profile; Type: POLICY; Schema: public; Owner: postgres
--

CREATE POLICY "Users can view own profile" ON public.profiles FOR SELECT USING ((auth.uid() = id));


--
-- TOC entry 4601 (class 0 OID 18209)
-- Dependencies: 400
-- Name: admin_settings; Type: ROW SECURITY; Schema: public; Owner: postgres
--

ALTER TABLE public.admin_settings ENABLE ROW LEVEL SECURITY;

--
-- TOC entry 4603 (class 0 OID 19445)
-- Dependencies: 403
-- Name: affiliate_clicks; Type: ROW SECURITY; Schema: public; Owner: postgres
--

ALTER TABLE public.affiliate_clicks ENABLE ROW LEVEL SECURITY;

--
-- TOC entry 4599 (class 0 OID 18180)
-- Dependencies: 398
-- Name: booking_inquiries; Type: ROW SECURITY; Schema: public; Owner: postgres
--

ALTER TABLE public.booking_inquiries ENABLE ROW LEVEL SECURITY;

--
-- TOC entry 4610 (class 0 OID 25846)
-- Dependencies: 413
-- Name: bookings; Type: ROW SECURITY; Schema: public; Owner: postgres
--

ALTER TABLE public.bookings ENABLE ROW LEVEL SECURITY;

--
-- TOC entry 4608 (class 0 OID 25416)
-- Dependencies: 408
-- Name: course_prices; Type: ROW SECURITY; Schema: public; Owner: postgres
--

ALTER TABLE public.course_prices ENABLE ROW LEVEL SECURITY;

--
-- TOC entry 4614 (class 0 OID 27410)
-- Dependencies: 419
-- Name: dive_site_pages; Type: ROW SECURITY; Schema: public; Owner: postgres
--

ALTER TABLE public.dive_site_pages ENABLE ROW LEVEL SECURITY;

--
-- TOC entry 4611 (class 0 OID 27031)
-- Dependencies: 414
-- Name: emails; Type: ROW SECURITY; Schema: public; Owner: postgres
--

ALTER TABLE public.emails ENABLE ROW LEVEL SECURITY;

--
-- TOC entry 4609 (class 0 OID 25592)
-- Dependencies: 412
-- Name: newdiving; Type: ROW SECURITY; Schema: public; Owner: postgres
--

ALTER TABLE public.newdiving ENABLE ROW LEVEL SECURITY;

--
-- TOC entry 4604 (class 0 OID 25242)
-- Dependencies: 404
-- Name: page_content; Type: ROW SECURITY; Schema: public; Owner: postgres
--

ALTER TABLE public.page_content ENABLE ROW LEVEL SECURITY;

--
-- TOC entry 4605 (class 0 OID 25261)
-- Dependencies: 405
-- Name: page_metadata; Type: ROW SECURITY; Schema: public; Owner: postgres
--

ALTER TABLE public.page_metadata ENABLE ROW LEVEL SECURITY;

--
-- TOC entry 4607 (class 0 OID 25296)
-- Dependencies: 407
-- Name: page_security; Type: ROW SECURITY; Schema: public; Owner: postgres
--

ALTER TABLE public.page_security ENABLE ROW LEVEL SECURITY;

--
-- TOC entry 4606 (class 0 OID 25275)
-- Dependencies: 406
-- Name: page_seo; Type: ROW SECURITY; Schema: public; Owner: postgres
--

ALTER TABLE public.page_seo ENABLE ROW LEVEL SECURITY;

--
-- TOC entry 4602 (class 0 OID 18228)
-- Dependencies: 401
-- Name: profiles; Type: ROW SECURITY; Schema: public; Owner: postgres
--

ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;

--
-- TOC entry 4616 (class 0 OID 34187)
-- Dependencies: 428
-- Name: project_tasks; Type: ROW SECURITY; Schema: public; Owner: postgres
--

ALTER TABLE public.project_tasks ENABLE ROW LEVEL SECURITY;

--
-- TOC entry 4615 (class 0 OID 32095)
-- Dependencies: 423
-- Name: role_change_audit; Type: ROW SECURITY; Schema: public; Owner: postgres
--

ALTER TABLE public.role_change_audit ENABLE ROW LEVEL SECURITY;

--
-- TOC entry 4600 (class 0 OID 18195)
-- Dependencies: 399
-- Name: user_roles; Type: ROW SECURITY; Schema: public; Owner: postgres
--

ALTER TABLE public.user_roles ENABLE ROW LEVEL SECURITY;

--
-- TOC entry 4612 (class 0 OID 27041)
-- Dependencies: 415
-- Name: users; Type: ROW SECURITY; Schema: public; Owner: postgres
--

ALTER TABLE public.users ENABLE ROW LEVEL SECURITY;

--
-- TOC entry 4613 (class 0 OID 27122)
-- Dependencies: 416
-- Name: vouchers; Type: ROW SECURITY; Schema: public; Owner: postgres
--

ALTER TABLE public.vouchers ENABLE ROW LEVEL SECURITY;

--
-- TOC entry 4598 (class 0 OID 17429)
-- Dependencies: 396
-- Name: messages; Type: ROW SECURITY; Schema: realtime; Owner: supabase_realtime_admin
--

ALTER TABLE realtime.messages ENABLE ROW LEVEL SECURITY;

--
-- TOC entry 4591 (class 0 OID 17086)
-- Dependencies: 383
-- Name: buckets; Type: ROW SECURITY; Schema: storage; Owner: supabase_storage_admin
--

ALTER TABLE storage.buckets ENABLE ROW LEVEL SECURITY;

--
-- TOC entry 4595 (class 0 OID 17206)
-- Dependencies: 387
-- Name: buckets_analytics; Type: ROW SECURITY; Schema: storage; Owner: supabase_storage_admin
--

ALTER TABLE storage.buckets_analytics ENABLE ROW LEVEL SECURITY;

--
-- TOC entry 4596 (class 0 OID 17219)
-- Dependencies: 388
-- Name: buckets_vectors; Type: ROW SECURITY; Schema: storage; Owner: supabase_storage_admin
--

ALTER TABLE storage.buckets_vectors ENABLE ROW LEVEL SECURITY;

--
-- TOC entry 4590 (class 0 OID 17078)
-- Dependencies: 382
-- Name: migrations; Type: ROW SECURITY; Schema: storage; Owner: supabase_storage_admin
--

ALTER TABLE storage.migrations ENABLE ROW LEVEL SECURITY;

--
-- TOC entry 4592 (class 0 OID 17096)
-- Dependencies: 384
-- Name: objects; Type: ROW SECURITY; Schema: storage; Owner: supabase_storage_admin
--

ALTER TABLE storage.objects ENABLE ROW LEVEL SECURITY;

--
-- TOC entry 4593 (class 0 OID 17145)
-- Dependencies: 385
-- Name: s3_multipart_uploads; Type: ROW SECURITY; Schema: storage; Owner: supabase_storage_admin
--

ALTER TABLE storage.s3_multipart_uploads ENABLE ROW LEVEL SECURITY;

--
-- TOC entry 4594 (class 0 OID 17159)
-- Dependencies: 386
-- Name: s3_multipart_uploads_parts; Type: ROW SECURITY; Schema: storage; Owner: supabase_storage_admin
--

ALTER TABLE storage.s3_multipart_uploads_parts ENABLE ROW LEVEL SECURITY;

--
-- TOC entry 4597 (class 0 OID 17229)
-- Dependencies: 389
-- Name: vector_indexes; Type: ROW SECURITY; Schema: storage; Owner: supabase_storage_admin
--

ALTER TABLE storage.vector_indexes ENABLE ROW LEVEL SECURITY;

--
-- TOC entry 4651 (class 6104 OID 16430)
-- Name: supabase_realtime; Type: PUBLICATION; Schema: -; Owner: postgres
--

CREATE PUBLICATION supabase_realtime WITH (publish = 'insert, update, delete, truncate');


ALTER PUBLICATION supabase_realtime OWNER TO postgres;

--
-- TOC entry 4652 (class 6104 OID 30945)
-- Name: supabase_realtime_messages_publication; Type: PUBLICATION; Schema: -; Owner: supabase_admin
--

CREATE PUBLICATION supabase_realtime_messages_publication WITH (publish = 'insert, update, delete, truncate');


ALTER PUBLICATION supabase_realtime_messages_publication OWNER TO supabase_admin;

--
-- TOC entry 4655 (class 6106 OID 28617)
-- Name: supabase_realtime course_prices; Type: PUBLICATION TABLE; Schema: public; Owner: postgres
--

ALTER PUBLICATION supabase_realtime ADD TABLE ONLY public.course_prices;


--
-- TOC entry 4653 (class 6106 OID 28615)
-- Name: supabase_realtime dive_site_pages; Type: PUBLICATION TABLE; Schema: public; Owner: postgres
--

ALTER PUBLICATION supabase_realtime ADD TABLE ONLY public.dive_site_pages;


--
-- TOC entry 4654 (class 6106 OID 28616)
-- Name: supabase_realtime page_content; Type: PUBLICATION TABLE; Schema: public; Owner: postgres
--

ALTER PUBLICATION supabase_realtime ADD TABLE ONLY public.page_content;


--
-- TOC entry 4656 (class 6106 OID 30946)
-- Name: supabase_realtime_messages_publication messages; Type: PUBLICATION TABLE; Schema: realtime; Owner: supabase_admin
--

ALTER PUBLICATION supabase_realtime_messages_publication ADD TABLE ONLY realtime.messages;


--
-- TOC entry 4724 (class 0 OID 0)
-- Dependencies: 41
-- Name: SCHEMA auth; Type: ACL; Schema: -; Owner: supabase_admin
--

GRANT USAGE ON SCHEMA auth TO anon;
GRANT USAGE ON SCHEMA auth TO authenticated;
GRANT USAGE ON SCHEMA auth TO service_role;
GRANT ALL ON SCHEMA auth TO supabase_auth_admin;
GRANT ALL ON SCHEMA auth TO dashboard_user;
GRANT USAGE ON SCHEMA auth TO postgres;


--
-- TOC entry 4725 (class 0 OID 0)
-- Dependencies: 27
-- Name: SCHEMA extensions; Type: ACL; Schema: -; Owner: postgres
--

GRANT USAGE ON SCHEMA extensions TO anon;
GRANT USAGE ON SCHEMA extensions TO authenticated;
GRANT USAGE ON SCHEMA extensions TO service_role;
GRANT ALL ON SCHEMA extensions TO dashboard_user;


--
-- TOC entry 4726 (class 0 OID 0)
-- Dependencies: 43
-- Name: SCHEMA public; Type: ACL; Schema: -; Owner: pg_database_owner
--

GRANT USAGE ON SCHEMA public TO postgres;
GRANT USAGE ON SCHEMA public TO anon;
GRANT USAGE ON SCHEMA public TO authenticated;
GRANT USAGE ON SCHEMA public TO service_role;


--
-- TOC entry 4727 (class 0 OID 0)
-- Dependencies: 17
-- Name: SCHEMA realtime; Type: ACL; Schema: -; Owner: supabase_admin
--

GRANT USAGE ON SCHEMA realtime TO postgres;
GRANT USAGE ON SCHEMA realtime TO anon;
GRANT USAGE ON SCHEMA realtime TO authenticated;
GRANT USAGE ON SCHEMA realtime TO service_role;
GRANT ALL ON SCHEMA realtime TO supabase_realtime_admin;


--
-- TOC entry 4728 (class 0 OID 0)
-- Dependencies: 42
-- Name: SCHEMA storage; Type: ACL; Schema: -; Owner: supabase_admin
--

GRANT USAGE ON SCHEMA storage TO postgres WITH GRANT OPTION;
GRANT USAGE ON SCHEMA storage TO anon;
GRANT USAGE ON SCHEMA storage TO authenticated;
GRANT USAGE ON SCHEMA storage TO service_role;
GRANT ALL ON SCHEMA storage TO supabase_storage_admin WITH GRANT OPTION;
GRANT ALL ON SCHEMA storage TO dashboard_user;


--
-- TOC entry 4729 (class 0 OID 0)
-- Dependencies: 36
-- Name: SCHEMA vault; Type: ACL; Schema: -; Owner: supabase_admin
--

GRANT USAGE ON SCHEMA vault TO postgres WITH GRANT OPTION;
GRANT USAGE ON SCHEMA vault TO service_role;


--
-- TOC entry 4740 (class 0 OID 0)
-- Dependencies: 580
-- Name: FUNCTION email(); Type: ACL; Schema: auth; Owner: supabase_auth_admin
--

GRANT ALL ON FUNCTION auth.email() TO dashboard_user;


--
-- TOC entry 4741 (class 0 OID 0)
-- Dependencies: 572
-- Name: FUNCTION jwt(); Type: ACL; Schema: auth; Owner: supabase_auth_admin
--

GRANT ALL ON FUNCTION auth.jwt() TO postgres;
GRANT ALL ON FUNCTION auth.jwt() TO dashboard_user;


--
-- TOC entry 4743 (class 0 OID 0)
-- Dependencies: 578
-- Name: FUNCTION role(); Type: ACL; Schema: auth; Owner: supabase_auth_admin
--

GRANT ALL ON FUNCTION auth.role() TO dashboard_user;


--
-- TOC entry 4745 (class 0 OID 0)
-- Dependencies: 584
-- Name: FUNCTION uid(); Type: ACL; Schema: auth; Owner: supabase_auth_admin
--

GRANT ALL ON FUNCTION auth.uid() TO dashboard_user;


--
-- TOC entry 4746 (class 0 OID 0)
-- Dependencies: 478
-- Name: FUNCTION armor(bytea); Type: ACL; Schema: extensions; Owner: postgres
--

REVOKE ALL ON FUNCTION extensions.armor(bytea) FROM postgres;
GRANT ALL ON FUNCTION extensions.armor(bytea) TO postgres WITH GRANT OPTION;
GRANT ALL ON FUNCTION extensions.armor(bytea) TO dashboard_user;


--
-- TOC entry 4747 (class 0 OID 0)
-- Dependencies: 441
-- Name: FUNCTION armor(bytea, text[], text[]); Type: ACL; Schema: extensions; Owner: postgres
--

REVOKE ALL ON FUNCTION extensions.armor(bytea, text[], text[]) FROM postgres;
GRANT ALL ON FUNCTION extensions.armor(bytea, text[], text[]) TO postgres WITH GRANT OPTION;
GRANT ALL ON FUNCTION extensions.armor(bytea, text[], text[]) TO dashboard_user;


--
-- TOC entry 4748 (class 0 OID 0)
-- Dependencies: 583
-- Name: FUNCTION bytea_to_text(data bytea); Type: ACL; Schema: extensions; Owner: supabase_admin
--

GRANT ALL ON FUNCTION extensions.bytea_to_text(data bytea) TO postgres WITH GRANT OPTION;


--
-- TOC entry 4749 (class 0 OID 0)
-- Dependencies: 516
-- Name: FUNCTION crypt(text, text); Type: ACL; Schema: extensions; Owner: postgres
--

REVOKE ALL ON FUNCTION extensions.crypt(text, text) FROM postgres;
GRANT ALL ON FUNCTION extensions.crypt(text, text) TO postgres WITH GRANT OPTION;
GRANT ALL ON FUNCTION extensions.crypt(text, text) TO dashboard_user;


--
-- TOC entry 4750 (class 0 OID 0)
-- Dependencies: 522
-- Name: FUNCTION dearmor(text); Type: ACL; Schema: extensions; Owner: postgres
--

REVOKE ALL ON FUNCTION extensions.dearmor(text) FROM postgres;
GRANT ALL ON FUNCTION extensions.dearmor(text) TO postgres WITH GRANT OPTION;
GRANT ALL ON FUNCTION extensions.dearmor(text) TO dashboard_user;


--
-- TOC entry 4751 (class 0 OID 0)
-- Dependencies: 449
-- Name: FUNCTION decrypt(bytea, bytea, text); Type: ACL; Schema: extensions; Owner: postgres
--

REVOKE ALL ON FUNCTION extensions.decrypt(bytea, bytea, text) FROM postgres;
GRANT ALL ON FUNCTION extensions.decrypt(bytea, bytea, text) TO postgres WITH GRANT OPTION;
GRANT ALL ON FUNCTION extensions.decrypt(bytea, bytea, text) TO dashboard_user;


--
-- TOC entry 4752 (class 0 OID 0)
-- Dependencies: 463
-- Name: FUNCTION decrypt_iv(bytea, bytea, bytea, text); Type: ACL; Schema: extensions; Owner: postgres
--

REVOKE ALL ON FUNCTION extensions.decrypt_iv(bytea, bytea, bytea, text) FROM postgres;
GRANT ALL ON FUNCTION extensions.decrypt_iv(bytea, bytea, bytea, text) TO postgres WITH GRANT OPTION;
GRANT ALL ON FUNCTION extensions.decrypt_iv(bytea, bytea, bytea, text) TO dashboard_user;


--
-- TOC entry 4753 (class 0 OID 0)
-- Dependencies: 585
-- Name: FUNCTION digest(bytea, text); Type: ACL; Schema: extensions; Owner: postgres
--

REVOKE ALL ON FUNCTION extensions.digest(bytea, text) FROM postgres;
GRANT ALL ON FUNCTION extensions.digest(bytea, text) TO postgres WITH GRANT OPTION;
GRANT ALL ON FUNCTION extensions.digest(bytea, text) TO dashboard_user;


--
-- TOC entry 4754 (class 0 OID 0)
-- Dependencies: 525
-- Name: FUNCTION digest(text, text); Type: ACL; Schema: extensions; Owner: postgres
--

REVOKE ALL ON FUNCTION extensions.digest(text, text) FROM postgres;
GRANT ALL ON FUNCTION extensions.digest(text, text) TO postgres WITH GRANT OPTION;
GRANT ALL ON FUNCTION extensions.digest(text, text) TO dashboard_user;


--
-- TOC entry 4755 (class 0 OID 0)
-- Dependencies: 540
-- Name: FUNCTION encrypt(bytea, bytea, text); Type: ACL; Schema: extensions; Owner: postgres
--

REVOKE ALL ON FUNCTION extensions.encrypt(bytea, bytea, text) FROM postgres;
GRANT ALL ON FUNCTION extensions.encrypt(bytea, bytea, text) TO postgres WITH GRANT OPTION;
GRANT ALL ON FUNCTION extensions.encrypt(bytea, bytea, text) TO dashboard_user;


--
-- TOC entry 4756 (class 0 OID 0)
-- Dependencies: 582
-- Name: FUNCTION encrypt_iv(bytea, bytea, bytea, text); Type: ACL; Schema: extensions; Owner: postgres
--

REVOKE ALL ON FUNCTION extensions.encrypt_iv(bytea, bytea, bytea, text) FROM postgres;
GRANT ALL ON FUNCTION extensions.encrypt_iv(bytea, bytea, bytea, text) TO postgres WITH GRANT OPTION;
GRANT ALL ON FUNCTION extensions.encrypt_iv(bytea, bytea, bytea, text) TO dashboard_user;


--
-- TOC entry 4757 (class 0 OID 0)
-- Dependencies: 506
-- Name: FUNCTION gen_random_bytes(integer); Type: ACL; Schema: extensions; Owner: postgres
--

REVOKE ALL ON FUNCTION extensions.gen_random_bytes(integer) FROM postgres;
GRANT ALL ON FUNCTION extensions.gen_random_bytes(integer) TO postgres WITH GRANT OPTION;
GRANT ALL ON FUNCTION extensions.gen_random_bytes(integer) TO dashboard_user;


--
-- TOC entry 4758 (class 0 OID 0)
-- Dependencies: 569
-- Name: FUNCTION gen_random_uuid(); Type: ACL; Schema: extensions; Owner: postgres
--

REVOKE ALL ON FUNCTION extensions.gen_random_uuid() FROM postgres;
GRANT ALL ON FUNCTION extensions.gen_random_uuid() TO postgres WITH GRANT OPTION;
GRANT ALL ON FUNCTION extensions.gen_random_uuid() TO dashboard_user;


--
-- TOC entry 4759 (class 0 OID 0)
-- Dependencies: 452
-- Name: FUNCTION gen_salt(text); Type: ACL; Schema: extensions; Owner: postgres
--

REVOKE ALL ON FUNCTION extensions.gen_salt(text) FROM postgres;
GRANT ALL ON FUNCTION extensions.gen_salt(text) TO postgres WITH GRANT OPTION;
GRANT ALL ON FUNCTION extensions.gen_salt(text) TO dashboard_user;


--
-- TOC entry 4760 (class 0 OID 0)
-- Dependencies: 483
-- Name: FUNCTION gen_salt(text, integer); Type: ACL; Schema: extensions; Owner: postgres
--

REVOKE ALL ON FUNCTION extensions.gen_salt(text, integer) FROM postgres;
GRANT ALL ON FUNCTION extensions.gen_salt(text, integer) TO postgres WITH GRANT OPTION;
GRANT ALL ON FUNCTION extensions.gen_salt(text, integer) TO dashboard_user;


--
-- TOC entry 4762 (class 0 OID 0)
-- Dependencies: 575
-- Name: FUNCTION grant_pg_cron_access(); Type: ACL; Schema: extensions; Owner: supabase_admin
--

REVOKE ALL ON FUNCTION extensions.grant_pg_cron_access() FROM supabase_admin;
GRANT ALL ON FUNCTION extensions.grant_pg_cron_access() TO supabase_admin WITH GRANT OPTION;
GRANT ALL ON FUNCTION extensions.grant_pg_cron_access() TO dashboard_user;


--
-- TOC entry 4764 (class 0 OID 0)
-- Dependencies: 512
-- Name: FUNCTION grant_pg_graphql_access(); Type: ACL; Schema: extensions; Owner: supabase_admin
--

GRANT ALL ON FUNCTION extensions.grant_pg_graphql_access() TO postgres WITH GRANT OPTION;


--
-- TOC entry 4766 (class 0 OID 0)
-- Dependencies: 480
-- Name: FUNCTION grant_pg_net_access(); Type: ACL; Schema: extensions; Owner: supabase_admin
--

REVOKE ALL ON FUNCTION extensions.grant_pg_net_access() FROM supabase_admin;
GRANT ALL ON FUNCTION extensions.grant_pg_net_access() TO supabase_admin WITH GRANT OPTION;
GRANT ALL ON FUNCTION extensions.grant_pg_net_access() TO dashboard_user;


--
-- TOC entry 4767 (class 0 OID 0)
-- Dependencies: 477
-- Name: FUNCTION hmac(bytea, bytea, text); Type: ACL; Schema: extensions; Owner: postgres
--

REVOKE ALL ON FUNCTION extensions.hmac(bytea, bytea, text) FROM postgres;
GRANT ALL ON FUNCTION extensions.hmac(bytea, bytea, text) TO postgres WITH GRANT OPTION;
GRANT ALL ON FUNCTION extensions.hmac(bytea, bytea, text) TO dashboard_user;


--
-- TOC entry 4768 (class 0 OID 0)
-- Dependencies: 581
-- Name: FUNCTION hmac(text, text, text); Type: ACL; Schema: extensions; Owner: postgres
--

REVOKE ALL ON FUNCTION extensions.hmac(text, text, text) FROM postgres;
GRANT ALL ON FUNCTION extensions.hmac(text, text, text) TO postgres WITH GRANT OPTION;
GRANT ALL ON FUNCTION extensions.hmac(text, text, text) TO dashboard_user;


--
-- TOC entry 4769 (class 0 OID 0)
-- Dependencies: 445
-- Name: FUNCTION http(request extensions.http_request); Type: ACL; Schema: extensions; Owner: supabase_admin
--

GRANT ALL ON FUNCTION extensions.http(request extensions.http_request) TO postgres WITH GRANT OPTION;


--
-- TOC entry 4770 (class 0 OID 0)
-- Dependencies: 528
-- Name: FUNCTION http_delete(uri character varying); Type: ACL; Schema: extensions; Owner: supabase_admin
--

GRANT ALL ON FUNCTION extensions.http_delete(uri character varying) TO postgres WITH GRANT OPTION;


--
-- TOC entry 4771 (class 0 OID 0)
-- Dependencies: 567
-- Name: FUNCTION http_delete(uri character varying, content character varying, content_type character varying); Type: ACL; Schema: extensions; Owner: supabase_admin
--

GRANT ALL ON FUNCTION extensions.http_delete(uri character varying, content character varying, content_type character varying) TO postgres WITH GRANT OPTION;


--
-- TOC entry 4772 (class 0 OID 0)
-- Dependencies: 500
-- Name: FUNCTION http_get(uri character varying); Type: ACL; Schema: extensions; Owner: supabase_admin
--

GRANT ALL ON FUNCTION extensions.http_get(uri character varying) TO postgres WITH GRANT OPTION;


--
-- TOC entry 4773 (class 0 OID 0)
-- Dependencies: 475
-- Name: FUNCTION http_get(uri character varying, data jsonb); Type: ACL; Schema: extensions; Owner: supabase_admin
--

GRANT ALL ON FUNCTION extensions.http_get(uri character varying, data jsonb) TO postgres WITH GRANT OPTION;


--
-- TOC entry 4774 (class 0 OID 0)
-- Dependencies: 447
-- Name: FUNCTION http_head(uri character varying); Type: ACL; Schema: extensions; Owner: supabase_admin
--

GRANT ALL ON FUNCTION extensions.http_head(uri character varying) TO postgres WITH GRANT OPTION;


--
-- TOC entry 4775 (class 0 OID 0)
-- Dependencies: 466
-- Name: FUNCTION http_header(field character varying, value character varying); Type: ACL; Schema: extensions; Owner: supabase_admin
--

GRANT ALL ON FUNCTION extensions.http_header(field character varying, value character varying) TO postgres WITH GRANT OPTION;


--
-- TOC entry 4776 (class 0 OID 0)
-- Dependencies: 547
-- Name: FUNCTION http_list_curlopt(); Type: ACL; Schema: extensions; Owner: supabase_admin
--

GRANT ALL ON FUNCTION extensions.http_list_curlopt() TO postgres WITH GRANT OPTION;


--
-- TOC entry 4777 (class 0 OID 0)
-- Dependencies: 554
-- Name: FUNCTION http_patch(uri character varying, content character varying, content_type character varying); Type: ACL; Schema: extensions; Owner: supabase_admin
--

GRANT ALL ON FUNCTION extensions.http_patch(uri character varying, content character varying, content_type character varying) TO postgres WITH GRANT OPTION;


--
-- TOC entry 4778 (class 0 OID 0)
-- Dependencies: 492
-- Name: FUNCTION http_post(uri character varying, data jsonb); Type: ACL; Schema: extensions; Owner: supabase_admin
--

GRANT ALL ON FUNCTION extensions.http_post(uri character varying, data jsonb) TO postgres WITH GRANT OPTION;


--
-- TOC entry 4779 (class 0 OID 0)
-- Dependencies: 530
-- Name: FUNCTION http_post(uri character varying, content character varying, content_type character varying); Type: ACL; Schema: extensions; Owner: supabase_admin
--

GRANT ALL ON FUNCTION extensions.http_post(uri character varying, content character varying, content_type character varying) TO postgres WITH GRANT OPTION;


--
-- TOC entry 4780 (class 0 OID 0)
-- Dependencies: 455
-- Name: FUNCTION http_put(uri character varying, content character varying, content_type character varying); Type: ACL; Schema: extensions; Owner: supabase_admin
--

GRANT ALL ON FUNCTION extensions.http_put(uri character varying, content character varying, content_type character varying) TO postgres WITH GRANT OPTION;


--
-- TOC entry 4781 (class 0 OID 0)
-- Dependencies: 482
-- Name: FUNCTION http_reset_curlopt(); Type: ACL; Schema: extensions; Owner: supabase_admin
--

GRANT ALL ON FUNCTION extensions.http_reset_curlopt() TO postgres WITH GRANT OPTION;


--
-- TOC entry 4782 (class 0 OID 0)
-- Dependencies: 479
-- Name: FUNCTION http_set_curlopt(curlopt character varying, value character varying); Type: ACL; Schema: extensions; Owner: supabase_admin
--

GRANT ALL ON FUNCTION extensions.http_set_curlopt(curlopt character varying, value character varying) TO postgres WITH GRANT OPTION;


--
-- TOC entry 4783 (class 0 OID 0)
-- Dependencies: 498
-- Name: FUNCTION hypopg(OUT indexname text, OUT indexrelid oid, OUT indrelid oid, OUT innatts integer, OUT indisunique boolean, OUT indkey int2vector, OUT indcollation oidvector, OUT indclass oidvector, OUT indoption oidvector, OUT indexprs pg_node_tree, OUT indpred pg_node_tree, OUT amid oid); Type: ACL; Schema: extensions; Owner: supabase_admin
--

GRANT ALL ON FUNCTION extensions.hypopg(OUT indexname text, OUT indexrelid oid, OUT indrelid oid, OUT innatts integer, OUT indisunique boolean, OUT indkey int2vector, OUT indcollation oidvector, OUT indclass oidvector, OUT indoption oidvector, OUT indexprs pg_node_tree, OUT indpred pg_node_tree, OUT amid oid) TO postgres WITH GRANT OPTION;


--
-- TOC entry 4784 (class 0 OID 0)
-- Dependencies: 520
-- Name: FUNCTION hypopg_create_index(sql_order text, OUT indexrelid oid, OUT indexname text); Type: ACL; Schema: extensions; Owner: supabase_admin
--

GRANT ALL ON FUNCTION extensions.hypopg_create_index(sql_order text, OUT indexrelid oid, OUT indexname text) TO postgres WITH GRANT OPTION;


--
-- TOC entry 4785 (class 0 OID 0)
-- Dependencies: 496
-- Name: FUNCTION hypopg_drop_index(indexid oid); Type: ACL; Schema: extensions; Owner: supabase_admin
--

GRANT ALL ON FUNCTION extensions.hypopg_drop_index(indexid oid) TO postgres WITH GRANT OPTION;


--
-- TOC entry 4786 (class 0 OID 0)
-- Dependencies: 527
-- Name: FUNCTION hypopg_get_indexdef(indexid oid); Type: ACL; Schema: extensions; Owner: supabase_admin
--

GRANT ALL ON FUNCTION extensions.hypopg_get_indexdef(indexid oid) TO postgres WITH GRANT OPTION;


--
-- TOC entry 4787 (class 0 OID 0)
-- Dependencies: 491
-- Name: FUNCTION hypopg_hidden_indexes(); Type: ACL; Schema: extensions; Owner: supabase_admin
--

GRANT ALL ON FUNCTION extensions.hypopg_hidden_indexes() TO postgres WITH GRANT OPTION;


--
-- TOC entry 4788 (class 0 OID 0)
-- Dependencies: 468
-- Name: FUNCTION hypopg_hide_index(indexid oid); Type: ACL; Schema: extensions; Owner: supabase_admin
--

GRANT ALL ON FUNCTION extensions.hypopg_hide_index(indexid oid) TO postgres WITH GRANT OPTION;


--
-- TOC entry 4789 (class 0 OID 0)
-- Dependencies: 438
-- Name: FUNCTION hypopg_relation_size(indexid oid); Type: ACL; Schema: extensions; Owner: supabase_admin
--

GRANT ALL ON FUNCTION extensions.hypopg_relation_size(indexid oid) TO postgres WITH GRANT OPTION;


--
-- TOC entry 4790 (class 0 OID 0)
-- Dependencies: 548
-- Name: FUNCTION hypopg_reset(); Type: ACL; Schema: extensions; Owner: supabase_admin
--

GRANT ALL ON FUNCTION extensions.hypopg_reset() TO postgres WITH GRANT OPTION;


--
-- TOC entry 4791 (class 0 OID 0)
-- Dependencies: 551
-- Name: FUNCTION hypopg_reset_index(); Type: ACL; Schema: extensions; Owner: supabase_admin
--

GRANT ALL ON FUNCTION extensions.hypopg_reset_index() TO postgres WITH GRANT OPTION;


--
-- TOC entry 4792 (class 0 OID 0)
-- Dependencies: 539
-- Name: FUNCTION hypopg_unhide_all_indexes(); Type: ACL; Schema: extensions; Owner: supabase_admin
--

GRANT ALL ON FUNCTION extensions.hypopg_unhide_all_indexes() TO postgres WITH GRANT OPTION;


--
-- TOC entry 4793 (class 0 OID 0)
-- Dependencies: 568
-- Name: FUNCTION hypopg_unhide_index(indexid oid); Type: ACL; Schema: extensions; Owner: supabase_admin
--

GRANT ALL ON FUNCTION extensions.hypopg_unhide_index(indexid oid) TO postgres WITH GRANT OPTION;


--
-- TOC entry 4794 (class 0 OID 0)
-- Dependencies: 451
-- Name: FUNCTION index_advisor(query text); Type: ACL; Schema: extensions; Owner: supabase_admin
--

GRANT ALL ON FUNCTION extensions.index_advisor(query text) TO postgres WITH GRANT OPTION;


--
-- TOC entry 4795 (class 0 OID 0)
-- Dependencies: 450
-- Name: FUNCTION pg_stat_statements(showtext boolean, OUT userid oid, OUT dbid oid, OUT toplevel boolean, OUT queryid bigint, OUT query text, OUT plans bigint, OUT total_plan_time double precision, OUT min_plan_time double precision, OUT max_plan_time double precision, OUT mean_plan_time double precision, OUT stddev_plan_time double precision, OUT calls bigint, OUT total_exec_time double precision, OUT min_exec_time double precision, OUT max_exec_time double precision, OUT mean_exec_time double precision, OUT stddev_exec_time double precision, OUT rows bigint, OUT shared_blks_hit bigint, OUT shared_blks_read bigint, OUT shared_blks_dirtied bigint, OUT shared_blks_written bigint, OUT local_blks_hit bigint, OUT local_blks_read bigint, OUT local_blks_dirtied bigint, OUT local_blks_written bigint, OUT temp_blks_read bigint, OUT temp_blks_written bigint, OUT shared_blk_read_time double precision, OUT shared_blk_write_time double precision, OUT local_blk_read_time double precision, OUT local_blk_write_time double precision, OUT temp_blk_read_time double precision, OUT temp_blk_write_time double precision, OUT wal_records bigint, OUT wal_fpi bigint, OUT wal_bytes numeric, OUT jit_functions bigint, OUT jit_generation_time double precision, OUT jit_inlining_count bigint, OUT jit_inlining_time double precision, OUT jit_optimization_count bigint, OUT jit_optimization_time double precision, OUT jit_emission_count bigint, OUT jit_emission_time double precision, OUT jit_deform_count bigint, OUT jit_deform_time double precision, OUT stats_since timestamp with time zone, OUT minmax_stats_since timestamp with time zone); Type: ACL; Schema: extensions; Owner: postgres
--

REVOKE ALL ON FUNCTION extensions.pg_stat_statements(showtext boolean, OUT userid oid, OUT dbid oid, OUT toplevel boolean, OUT queryid bigint, OUT query text, OUT plans bigint, OUT total_plan_time double precision, OUT min_plan_time double precision, OUT max_plan_time double precision, OUT mean_plan_time double precision, OUT stddev_plan_time double precision, OUT calls bigint, OUT total_exec_time double precision, OUT min_exec_time double precision, OUT max_exec_time double precision, OUT mean_exec_time double precision, OUT stddev_exec_time double precision, OUT rows bigint, OUT shared_blks_hit bigint, OUT shared_blks_read bigint, OUT shared_blks_dirtied bigint, OUT shared_blks_written bigint, OUT local_blks_hit bigint, OUT local_blks_read bigint, OUT local_blks_dirtied bigint, OUT local_blks_written bigint, OUT temp_blks_read bigint, OUT temp_blks_written bigint, OUT shared_blk_read_time double precision, OUT shared_blk_write_time double precision, OUT local_blk_read_time double precision, OUT local_blk_write_time double precision, OUT temp_blk_read_time double precision, OUT temp_blk_write_time double precision, OUT wal_records bigint, OUT wal_fpi bigint, OUT wal_bytes numeric, OUT jit_functions bigint, OUT jit_generation_time double precision, OUT jit_inlining_count bigint, OUT jit_inlining_time double precision, OUT jit_optimization_count bigint, OUT jit_optimization_time double precision, OUT jit_emission_count bigint, OUT jit_emission_time double precision, OUT jit_deform_count bigint, OUT jit_deform_time double precision, OUT stats_since timestamp with time zone, OUT minmax_stats_since timestamp with time zone) FROM postgres;
GRANT ALL ON FUNCTION extensions.pg_stat_statements(showtext boolean, OUT userid oid, OUT dbid oid, OUT toplevel boolean, OUT queryid bigint, OUT query text, OUT plans bigint, OUT total_plan_time double precision, OUT min_plan_time double precision, OUT max_plan_time double precision, OUT mean_plan_time double precision, OUT stddev_plan_time double precision, OUT calls bigint, OUT total_exec_time double precision, OUT min_exec_time double precision, OUT max_exec_time double precision, OUT mean_exec_time double precision, OUT stddev_exec_time double precision, OUT rows bigint, OUT shared_blks_hit bigint, OUT shared_blks_read bigint, OUT shared_blks_dirtied bigint, OUT shared_blks_written bigint, OUT local_blks_hit bigint, OUT local_blks_read bigint, OUT local_blks_dirtied bigint, OUT local_blks_written bigint, OUT temp_blks_read bigint, OUT temp_blks_written bigint, OUT shared_blk_read_time double precision, OUT shared_blk_write_time double precision, OUT local_blk_read_time double precision, OUT local_blk_write_time double precision, OUT temp_blk_read_time double precision, OUT temp_blk_write_time double precision, OUT wal_records bigint, OUT wal_fpi bigint, OUT wal_bytes numeric, OUT jit_functions bigint, OUT jit_generation_time double precision, OUT jit_inlining_count bigint, OUT jit_inlining_time double precision, OUT jit_optimization_count bigint, OUT jit_optimization_time double precision, OUT jit_emission_count bigint, OUT jit_emission_time double precision, OUT jit_deform_count bigint, OUT jit_deform_time double precision, OUT stats_since timestamp with time zone, OUT minmax_stats_since timestamp with time zone) TO postgres WITH GRANT OPTION;
GRANT ALL ON FUNCTION extensions.pg_stat_statements(showtext boolean, OUT userid oid, OUT dbid oid, OUT toplevel boolean, OUT queryid bigint, OUT query text, OUT plans bigint, OUT total_plan_time double precision, OUT min_plan_time double precision, OUT max_plan_time double precision, OUT mean_plan_time double precision, OUT stddev_plan_time double precision, OUT calls bigint, OUT total_exec_time double precision, OUT min_exec_time double precision, OUT max_exec_time double precision, OUT mean_exec_time double precision, OUT stddev_exec_time double precision, OUT rows bigint, OUT shared_blks_hit bigint, OUT shared_blks_read bigint, OUT shared_blks_dirtied bigint, OUT shared_blks_written bigint, OUT local_blks_hit bigint, OUT local_blks_read bigint, OUT local_blks_dirtied bigint, OUT local_blks_written bigint, OUT temp_blks_read bigint, OUT temp_blks_written bigint, OUT shared_blk_read_time double precision, OUT shared_blk_write_time double precision, OUT local_blk_read_time double precision, OUT local_blk_write_time double precision, OUT temp_blk_read_time double precision, OUT temp_blk_write_time double precision, OUT wal_records bigint, OUT wal_fpi bigint, OUT wal_bytes numeric, OUT jit_functions bigint, OUT jit_generation_time double precision, OUT jit_inlining_count bigint, OUT jit_inlining_time double precision, OUT jit_optimization_count bigint, OUT jit_optimization_time double precision, OUT jit_emission_count bigint, OUT jit_emission_time double precision, OUT jit_deform_count bigint, OUT jit_deform_time double precision, OUT stats_since timestamp with time zone, OUT minmax_stats_since timestamp with time zone) TO dashboard_user;


--
-- TOC entry 4796 (class 0 OID 0)
-- Dependencies: 488
-- Name: FUNCTION pg_stat_statements_info(OUT dealloc bigint, OUT stats_reset timestamp with time zone); Type: ACL; Schema: extensions; Owner: postgres
--

REVOKE ALL ON FUNCTION extensions.pg_stat_statements_info(OUT dealloc bigint, OUT stats_reset timestamp with time zone) FROM postgres;
GRANT ALL ON FUNCTION extensions.pg_stat_statements_info(OUT dealloc bigint, OUT stats_reset timestamp with time zone) TO postgres WITH GRANT OPTION;
GRANT ALL ON FUNCTION extensions.pg_stat_statements_info(OUT dealloc bigint, OUT stats_reset timestamp with time zone) TO dashboard_user;


--
-- TOC entry 4797 (class 0 OID 0)
-- Dependencies: 509
-- Name: FUNCTION pg_stat_statements_reset(userid oid, dbid oid, queryid bigint, minmax_only boolean); Type: ACL; Schema: extensions; Owner: postgres
--

REVOKE ALL ON FUNCTION extensions.pg_stat_statements_reset(userid oid, dbid oid, queryid bigint, minmax_only boolean) FROM postgres;
GRANT ALL ON FUNCTION extensions.pg_stat_statements_reset(userid oid, dbid oid, queryid bigint, minmax_only boolean) TO postgres WITH GRANT OPTION;
GRANT ALL ON FUNCTION extensions.pg_stat_statements_reset(userid oid, dbid oid, queryid bigint, minmax_only boolean) TO dashboard_user;


--
-- TOC entry 4798 (class 0 OID 0)
-- Dependencies: 486
-- Name: FUNCTION pgp_armor_headers(text, OUT key text, OUT value text); Type: ACL; Schema: extensions; Owner: postgres
--

REVOKE ALL ON FUNCTION extensions.pgp_armor_headers(text, OUT key text, OUT value text) FROM postgres;
GRANT ALL ON FUNCTION extensions.pgp_armor_headers(text, OUT key text, OUT value text) TO postgres WITH GRANT OPTION;
GRANT ALL ON FUNCTION extensions.pgp_armor_headers(text, OUT key text, OUT value text) TO dashboard_user;


--
-- TOC entry 4799 (class 0 OID 0)
-- Dependencies: 489
-- Name: FUNCTION pgp_key_id(bytea); Type: ACL; Schema: extensions; Owner: postgres
--

REVOKE ALL ON FUNCTION extensions.pgp_key_id(bytea) FROM postgres;
GRANT ALL ON FUNCTION extensions.pgp_key_id(bytea) TO postgres WITH GRANT OPTION;
GRANT ALL ON FUNCTION extensions.pgp_key_id(bytea) TO dashboard_user;


--
-- TOC entry 4800 (class 0 OID 0)
-- Dependencies: 566
-- Name: FUNCTION pgp_pub_decrypt(bytea, bytea); Type: ACL; Schema: extensions; Owner: postgres
--

REVOKE ALL ON FUNCTION extensions.pgp_pub_decrypt(bytea, bytea) FROM postgres;
GRANT ALL ON FUNCTION extensions.pgp_pub_decrypt(bytea, bytea) TO postgres WITH GRANT OPTION;
GRANT ALL ON FUNCTION extensions.pgp_pub_decrypt(bytea, bytea) TO dashboard_user;


--
-- TOC entry 4801 (class 0 OID 0)
-- Dependencies: 484
-- Name: FUNCTION pgp_pub_decrypt(bytea, bytea, text); Type: ACL; Schema: extensions; Owner: postgres
--

REVOKE ALL ON FUNCTION extensions.pgp_pub_decrypt(bytea, bytea, text) FROM postgres;
GRANT ALL ON FUNCTION extensions.pgp_pub_decrypt(bytea, bytea, text) TO postgres WITH GRANT OPTION;
GRANT ALL ON FUNCTION extensions.pgp_pub_decrypt(bytea, bytea, text) TO dashboard_user;


--
-- TOC entry 4802 (class 0 OID 0)
-- Dependencies: 541
-- Name: FUNCTION pgp_pub_decrypt(bytea, bytea, text, text); Type: ACL; Schema: extensions; Owner: postgres
--

REVOKE ALL ON FUNCTION extensions.pgp_pub_decrypt(bytea, bytea, text, text) FROM postgres;
GRANT ALL ON FUNCTION extensions.pgp_pub_decrypt(bytea, bytea, text, text) TO postgres WITH GRANT OPTION;
GRANT ALL ON FUNCTION extensions.pgp_pub_decrypt(bytea, bytea, text, text) TO dashboard_user;


--
-- TOC entry 4803 (class 0 OID 0)
-- Dependencies: 571
-- Name: FUNCTION pgp_pub_decrypt_bytea(bytea, bytea); Type: ACL; Schema: extensions; Owner: postgres
--

REVOKE ALL ON FUNCTION extensions.pgp_pub_decrypt_bytea(bytea, bytea) FROM postgres;
GRANT ALL ON FUNCTION extensions.pgp_pub_decrypt_bytea(bytea, bytea) TO postgres WITH GRANT OPTION;
GRANT ALL ON FUNCTION extensions.pgp_pub_decrypt_bytea(bytea, bytea) TO dashboard_user;


--
-- TOC entry 4804 (class 0 OID 0)
-- Dependencies: 501
-- Name: FUNCTION pgp_pub_decrypt_bytea(bytea, bytea, text); Type: ACL; Schema: extensions; Owner: postgres
--

REVOKE ALL ON FUNCTION extensions.pgp_pub_decrypt_bytea(bytea, bytea, text) FROM postgres;
GRANT ALL ON FUNCTION extensions.pgp_pub_decrypt_bytea(bytea, bytea, text) TO postgres WITH GRANT OPTION;
GRANT ALL ON FUNCTION extensions.pgp_pub_decrypt_bytea(bytea, bytea, text) TO dashboard_user;


--
-- TOC entry 4805 (class 0 OID 0)
-- Dependencies: 514
-- Name: FUNCTION pgp_pub_decrypt_bytea(bytea, bytea, text, text); Type: ACL; Schema: extensions; Owner: postgres
--

REVOKE ALL ON FUNCTION extensions.pgp_pub_decrypt_bytea(bytea, bytea, text, text) FROM postgres;
GRANT ALL ON FUNCTION extensions.pgp_pub_decrypt_bytea(bytea, bytea, text, text) TO postgres WITH GRANT OPTION;
GRANT ALL ON FUNCTION extensions.pgp_pub_decrypt_bytea(bytea, bytea, text, text) TO dashboard_user;


--
-- TOC entry 4806 (class 0 OID 0)
-- Dependencies: 564
-- Name: FUNCTION pgp_pub_encrypt(text, bytea); Type: ACL; Schema: extensions; Owner: postgres
--

REVOKE ALL ON FUNCTION extensions.pgp_pub_encrypt(text, bytea) FROM postgres;
GRANT ALL ON FUNCTION extensions.pgp_pub_encrypt(text, bytea) TO postgres WITH GRANT OPTION;
GRANT ALL ON FUNCTION extensions.pgp_pub_encrypt(text, bytea) TO dashboard_user;


--
-- TOC entry 4807 (class 0 OID 0)
-- Dependencies: 437
-- Name: FUNCTION pgp_pub_encrypt(text, bytea, text); Type: ACL; Schema: extensions; Owner: postgres
--

REVOKE ALL ON FUNCTION extensions.pgp_pub_encrypt(text, bytea, text) FROM postgres;
GRANT ALL ON FUNCTION extensions.pgp_pub_encrypt(text, bytea, text) TO postgres WITH GRANT OPTION;
GRANT ALL ON FUNCTION extensions.pgp_pub_encrypt(text, bytea, text) TO dashboard_user;


--
-- TOC entry 4808 (class 0 OID 0)
-- Dependencies: 457
-- Name: FUNCTION pgp_pub_encrypt_bytea(bytea, bytea); Type: ACL; Schema: extensions; Owner: postgres
--

REVOKE ALL ON FUNCTION extensions.pgp_pub_encrypt_bytea(bytea, bytea) FROM postgres;
GRANT ALL ON FUNCTION extensions.pgp_pub_encrypt_bytea(bytea, bytea) TO postgres WITH GRANT OPTION;
GRANT ALL ON FUNCTION extensions.pgp_pub_encrypt_bytea(bytea, bytea) TO dashboard_user;


--
-- TOC entry 4809 (class 0 OID 0)
-- Dependencies: 573
-- Name: FUNCTION pgp_pub_encrypt_bytea(bytea, bytea, text); Type: ACL; Schema: extensions; Owner: postgres
--

REVOKE ALL ON FUNCTION extensions.pgp_pub_encrypt_bytea(bytea, bytea, text) FROM postgres;
GRANT ALL ON FUNCTION extensions.pgp_pub_encrypt_bytea(bytea, bytea, text) TO postgres WITH GRANT OPTION;
GRANT ALL ON FUNCTION extensions.pgp_pub_encrypt_bytea(bytea, bytea, text) TO dashboard_user;


--
-- TOC entry 4810 (class 0 OID 0)
-- Dependencies: 495
-- Name: FUNCTION pgp_sym_decrypt(bytea, text); Type: ACL; Schema: extensions; Owner: postgres
--

REVOKE ALL ON FUNCTION extensions.pgp_sym_decrypt(bytea, text) FROM postgres;
GRANT ALL ON FUNCTION extensions.pgp_sym_decrypt(bytea, text) TO postgres WITH GRANT OPTION;
GRANT ALL ON FUNCTION extensions.pgp_sym_decrypt(bytea, text) TO dashboard_user;


--
-- TOC entry 4811 (class 0 OID 0)
-- Dependencies: 490
-- Name: FUNCTION pgp_sym_decrypt(bytea, text, text); Type: ACL; Schema: extensions; Owner: postgres
--

REVOKE ALL ON FUNCTION extensions.pgp_sym_decrypt(bytea, text, text) FROM postgres;
GRANT ALL ON FUNCTION extensions.pgp_sym_decrypt(bytea, text, text) TO postgres WITH GRANT OPTION;
GRANT ALL ON FUNCTION extensions.pgp_sym_decrypt(bytea, text, text) TO dashboard_user;


--
-- TOC entry 4812 (class 0 OID 0)
-- Dependencies: 476
-- Name: FUNCTION pgp_sym_decrypt_bytea(bytea, text); Type: ACL; Schema: extensions; Owner: postgres
--

REVOKE ALL ON FUNCTION extensions.pgp_sym_decrypt_bytea(bytea, text) FROM postgres;
GRANT ALL ON FUNCTION extensions.pgp_sym_decrypt_bytea(bytea, text) TO postgres WITH GRANT OPTION;
GRANT ALL ON FUNCTION extensions.pgp_sym_decrypt_bytea(bytea, text) TO dashboard_user;


--
-- TOC entry 4813 (class 0 OID 0)
-- Dependencies: 561
-- Name: FUNCTION pgp_sym_decrypt_bytea(bytea, text, text); Type: ACL; Schema: extensions; Owner: postgres
--

REVOKE ALL ON FUNCTION extensions.pgp_sym_decrypt_bytea(bytea, text, text) FROM postgres;
GRANT ALL ON FUNCTION extensions.pgp_sym_decrypt_bytea(bytea, text, text) TO postgres WITH GRANT OPTION;
GRANT ALL ON FUNCTION extensions.pgp_sym_decrypt_bytea(bytea, text, text) TO dashboard_user;


--
-- TOC entry 4814 (class 0 OID 0)
-- Dependencies: 563
-- Name: FUNCTION pgp_sym_encrypt(text, text); Type: ACL; Schema: extensions; Owner: postgres
--

REVOKE ALL ON FUNCTION extensions.pgp_sym_encrypt(text, text) FROM postgres;
GRANT ALL ON FUNCTION extensions.pgp_sym_encrypt(text, text) TO postgres WITH GRANT OPTION;
GRANT ALL ON FUNCTION extensions.pgp_sym_encrypt(text, text) TO dashboard_user;


--
-- TOC entry 4815 (class 0 OID 0)
-- Dependencies: 493
-- Name: FUNCTION pgp_sym_encrypt(text, text, text); Type: ACL; Schema: extensions; Owner: postgres
--

REVOKE ALL ON FUNCTION extensions.pgp_sym_encrypt(text, text, text) FROM postgres;
GRANT ALL ON FUNCTION extensions.pgp_sym_encrypt(text, text, text) TO postgres WITH GRANT OPTION;
GRANT ALL ON FUNCTION extensions.pgp_sym_encrypt(text, text, text) TO dashboard_user;


--
-- TOC entry 4816 (class 0 OID 0)
-- Dependencies: 565
-- Name: FUNCTION pgp_sym_encrypt_bytea(bytea, text); Type: ACL; Schema: extensions; Owner: postgres
--

REVOKE ALL ON FUNCTION extensions.pgp_sym_encrypt_bytea(bytea, text) FROM postgres;
GRANT ALL ON FUNCTION extensions.pgp_sym_encrypt_bytea(bytea, text) TO postgres WITH GRANT OPTION;
GRANT ALL ON FUNCTION extensions.pgp_sym_encrypt_bytea(bytea, text) TO dashboard_user;


--
-- TOC entry 4817 (class 0 OID 0)
-- Dependencies: 562
-- Name: FUNCTION pgp_sym_encrypt_bytea(bytea, text, text); Type: ACL; Schema: extensions; Owner: postgres
--

REVOKE ALL ON FUNCTION extensions.pgp_sym_encrypt_bytea(bytea, text, text) FROM postgres;
GRANT ALL ON FUNCTION extensions.pgp_sym_encrypt_bytea(bytea, text, text) TO postgres WITH GRANT OPTION;
GRANT ALL ON FUNCTION extensions.pgp_sym_encrypt_bytea(bytea, text, text) TO dashboard_user;


--
-- TOC entry 4818 (class 0 OID 0)
-- Dependencies: 443
-- Name: FUNCTION pgrst_ddl_watch(); Type: ACL; Schema: extensions; Owner: supabase_admin
--

GRANT ALL ON FUNCTION extensions.pgrst_ddl_watch() TO postgres WITH GRANT OPTION;


--
-- TOC entry 4819 (class 0 OID 0)
-- Dependencies: 456
-- Name: FUNCTION pgrst_drop_watch(); Type: ACL; Schema: extensions; Owner: supabase_admin
--

GRANT ALL ON FUNCTION extensions.pgrst_drop_watch() TO postgres WITH GRANT OPTION;


--
-- TOC entry 4821 (class 0 OID 0)
-- Dependencies: 503
-- Name: FUNCTION set_graphql_placeholder(); Type: ACL; Schema: extensions; Owner: supabase_admin
--

GRANT ALL ON FUNCTION extensions.set_graphql_placeholder() TO postgres WITH GRANT OPTION;


--
-- TOC entry 4822 (class 0 OID 0)
-- Dependencies: 464
-- Name: FUNCTION text_to_bytea(data text); Type: ACL; Schema: extensions; Owner: supabase_admin
--

GRANT ALL ON FUNCTION extensions.text_to_bytea(data text) TO postgres WITH GRANT OPTION;


--
-- TOC entry 4823 (class 0 OID 0)
-- Dependencies: 558
-- Name: FUNCTION urlencode(string bytea); Type: ACL; Schema: extensions; Owner: supabase_admin
--

GRANT ALL ON FUNCTION extensions.urlencode(string bytea) TO postgres WITH GRANT OPTION;


--
-- TOC entry 4824 (class 0 OID 0)
-- Dependencies: 550
-- Name: FUNCTION urlencode(data jsonb); Type: ACL; Schema: extensions; Owner: supabase_admin
--

GRANT ALL ON FUNCTION extensions.urlencode(data jsonb) TO postgres WITH GRANT OPTION;


--
-- TOC entry 4825 (class 0 OID 0)
-- Dependencies: 511
-- Name: FUNCTION urlencode(string character varying); Type: ACL; Schema: extensions; Owner: supabase_admin
--

GRANT ALL ON FUNCTION extensions.urlencode(string character varying) TO postgres WITH GRANT OPTION;


--
-- TOC entry 4826 (class 0 OID 0)
-- Dependencies: 472
-- Name: FUNCTION uuid_generate_v1(); Type: ACL; Schema: extensions; Owner: postgres
--

REVOKE ALL ON FUNCTION extensions.uuid_generate_v1() FROM postgres;
GRANT ALL ON FUNCTION extensions.uuid_generate_v1() TO postgres WITH GRANT OPTION;
GRANT ALL ON FUNCTION extensions.uuid_generate_v1() TO dashboard_user;


--
-- TOC entry 4827 (class 0 OID 0)
-- Dependencies: 471
-- Name: FUNCTION uuid_generate_v1mc(); Type: ACL; Schema: extensions; Owner: postgres
--

REVOKE ALL ON FUNCTION extensions.uuid_generate_v1mc() FROM postgres;
GRANT ALL ON FUNCTION extensions.uuid_generate_v1mc() TO postgres WITH GRANT OPTION;
GRANT ALL ON FUNCTION extensions.uuid_generate_v1mc() TO dashboard_user;


--
-- TOC entry 4828 (class 0 OID 0)
-- Dependencies: 532
-- Name: FUNCTION uuid_generate_v3(namespace uuid, name text); Type: ACL; Schema: extensions; Owner: postgres
--

REVOKE ALL ON FUNCTION extensions.uuid_generate_v3(namespace uuid, name text) FROM postgres;
GRANT ALL ON FUNCTION extensions.uuid_generate_v3(namespace uuid, name text) TO postgres WITH GRANT OPTION;
GRANT ALL ON FUNCTION extensions.uuid_generate_v3(namespace uuid, name text) TO dashboard_user;


--
-- TOC entry 4829 (class 0 OID 0)
-- Dependencies: 557
-- Name: FUNCTION uuid_generate_v4(); Type: ACL; Schema: extensions; Owner: postgres
--

REVOKE ALL ON FUNCTION extensions.uuid_generate_v4() FROM postgres;
GRANT ALL ON FUNCTION extensions.uuid_generate_v4() TO postgres WITH GRANT OPTION;
GRANT ALL ON FUNCTION extensions.uuid_generate_v4() TO dashboard_user;


--
-- TOC entry 4830 (class 0 OID 0)
-- Dependencies: 570
-- Name: FUNCTION uuid_generate_v5(namespace uuid, name text); Type: ACL; Schema: extensions; Owner: postgres
--

REVOKE ALL ON FUNCTION extensions.uuid_generate_v5(namespace uuid, name text) FROM postgres;
GRANT ALL ON FUNCTION extensions.uuid_generate_v5(namespace uuid, name text) TO postgres WITH GRANT OPTION;
GRANT ALL ON FUNCTION extensions.uuid_generate_v5(namespace uuid, name text) TO dashboard_user;


--
-- TOC entry 4831 (class 0 OID 0)
-- Dependencies: 529
-- Name: FUNCTION uuid_nil(); Type: ACL; Schema: extensions; Owner: postgres
--

REVOKE ALL ON FUNCTION extensions.uuid_nil() FROM postgres;
GRANT ALL ON FUNCTION extensions.uuid_nil() TO postgres WITH GRANT OPTION;
GRANT ALL ON FUNCTION extensions.uuid_nil() TO dashboard_user;


--
-- TOC entry 4832 (class 0 OID 0)
-- Dependencies: 499
-- Name: FUNCTION uuid_ns_dns(); Type: ACL; Schema: extensions; Owner: postgres
--

REVOKE ALL ON FUNCTION extensions.uuid_ns_dns() FROM postgres;
GRANT ALL ON FUNCTION extensions.uuid_ns_dns() TO postgres WITH GRANT OPTION;
GRANT ALL ON FUNCTION extensions.uuid_ns_dns() TO dashboard_user;


--
-- TOC entry 4833 (class 0 OID 0)
-- Dependencies: 436
-- Name: FUNCTION uuid_ns_oid(); Type: ACL; Schema: extensions; Owner: postgres
--

REVOKE ALL ON FUNCTION extensions.uuid_ns_oid() FROM postgres;
GRANT ALL ON FUNCTION extensions.uuid_ns_oid() TO postgres WITH GRANT OPTION;
GRANT ALL ON FUNCTION extensions.uuid_ns_oid() TO dashboard_user;


--
-- TOC entry 4834 (class 0 OID 0)
-- Dependencies: 549
-- Name: FUNCTION uuid_ns_url(); Type: ACL; Schema: extensions; Owner: postgres
--

REVOKE ALL ON FUNCTION extensions.uuid_ns_url() FROM postgres;
GRANT ALL ON FUNCTION extensions.uuid_ns_url() TO postgres WITH GRANT OPTION;
GRANT ALL ON FUNCTION extensions.uuid_ns_url() TO dashboard_user;


--
-- TOC entry 4835 (class 0 OID 0)
-- Dependencies: 461
-- Name: FUNCTION uuid_ns_x500(); Type: ACL; Schema: extensions; Owner: postgres
--

REVOKE ALL ON FUNCTION extensions.uuid_ns_x500() FROM postgres;
GRANT ALL ON FUNCTION extensions.uuid_ns_x500() TO postgres WITH GRANT OPTION;
GRANT ALL ON FUNCTION extensions.uuid_ns_x500() TO dashboard_user;


--
-- TOC entry 4836 (class 0 OID 0)
-- Dependencies: 523
-- Name: FUNCTION graphql("operationName" text, query text, variables jsonb, extensions jsonb); Type: ACL; Schema: graphql_public; Owner: supabase_admin
--

GRANT ALL ON FUNCTION graphql_public.graphql("operationName" text, query text, variables jsonb, extensions jsonb) TO postgres;
GRANT ALL ON FUNCTION graphql_public.graphql("operationName" text, query text, variables jsonb, extensions jsonb) TO anon;
GRANT ALL ON FUNCTION graphql_public.graphql("operationName" text, query text, variables jsonb, extensions jsonb) TO authenticated;
GRANT ALL ON FUNCTION graphql_public.graphql("operationName" text, query text, variables jsonb, extensions jsonb) TO service_role;


--
-- TOC entry 4837 (class 0 OID 0)
-- Dependencies: 453
-- Name: FUNCTION pg_reload_conf(); Type: ACL; Schema: pg_catalog; Owner: supabase_admin
--

GRANT ALL ON FUNCTION pg_catalog.pg_reload_conf() TO postgres WITH GRANT OPTION;


--
-- TOC entry 4838 (class 0 OID 0)
-- Dependencies: 458
-- Name: FUNCTION get_auth(p_usename text); Type: ACL; Schema: pgbouncer; Owner: supabase_admin
--

REVOKE ALL ON FUNCTION pgbouncer.get_auth(p_usename text) FROM PUBLIC;
GRANT ALL ON FUNCTION pgbouncer.get_auth(p_usename text) TO pgbouncer;


--
-- TOC entry 4839 (class 0 OID 0)
-- Dependencies: 439
-- Name: FUNCTION handle_updated_at(); Type: ACL; Schema: public; Owner: postgres
--

GRANT ALL ON FUNCTION public.handle_updated_at() TO anon;
GRANT ALL ON FUNCTION public.handle_updated_at() TO authenticated;
GRANT ALL ON FUNCTION public.handle_updated_at() TO service_role;


--
-- TOC entry 4840 (class 0 OID 0)
-- Dependencies: 434
-- Name: FUNCTION has_role(_user_id uuid, _role public.app_role); Type: ACL; Schema: public; Owner: postgres
--

GRANT ALL ON FUNCTION public.has_role(_user_id uuid, _role public.app_role) TO anon;
GRANT ALL ON FUNCTION public.has_role(_user_id uuid, _role public.app_role) TO authenticated;
GRANT ALL ON FUNCTION public.has_role(_user_id uuid, _role public.app_role) TO service_role;


--
-- TOC entry 4841 (class 0 OID 0)
-- Dependencies: 487
-- Name: FUNCTION rls_auto_enable(); Type: ACL; Schema: public; Owner: postgres
--

GRANT ALL ON FUNCTION public.rls_auto_enable() TO anon;
GRANT ALL ON FUNCTION public.rls_auto_enable() TO authenticated;
GRANT ALL ON FUNCTION public.rls_auto_enable() TO service_role;


--
-- TOC entry 4842 (class 0 OID 0)
-- Dependencies: 469
-- Name: FUNCTION set_booking_user_id(); Type: ACL; Schema: public; Owner: postgres
--

GRANT ALL ON FUNCTION public.set_booking_user_id() TO service_role;


--
-- TOC entry 4843 (class 0 OID 0)
-- Dependencies: 444
-- Name: FUNCTION set_bookings_updated_at(); Type: ACL; Schema: public; Owner: postgres
--

GRANT ALL ON FUNCTION public.set_bookings_updated_at() TO anon;
GRANT ALL ON FUNCTION public.set_bookings_updated_at() TO authenticated;
GRANT ALL ON FUNCTION public.set_bookings_updated_at() TO service_role;


--
-- TOC entry 4844 (class 0 OID 0)
-- Dependencies: 454
-- Name: FUNCTION update_booking_notes(p_booking_id uuid, p_notes text); Type: ACL; Schema: public; Owner: postgres
--

GRANT ALL ON FUNCTION public.update_booking_notes(p_booking_id uuid, p_notes text) TO anon;
GRANT ALL ON FUNCTION public.update_booking_notes(p_booking_id uuid, p_notes text) TO authenticated;
GRANT ALL ON FUNCTION public.update_booking_notes(p_booking_id uuid, p_notes text) TO service_role;


--
-- TOC entry 4845 (class 0 OID 0)
-- Dependencies: 446
-- Name: FUNCTION update_updated_at_column(); Type: ACL; Schema: public; Owner: postgres
--

GRANT ALL ON FUNCTION public.update_updated_at_column() TO anon;
GRANT ALL ON FUNCTION public.update_updated_at_column() TO authenticated;
GRANT ALL ON FUNCTION public.update_updated_at_column() TO service_role;


--
-- TOC entry 4846 (class 0 OID 0)
-- Dependencies: 470
-- Name: FUNCTION apply_rls(wal jsonb, max_record_bytes integer); Type: ACL; Schema: realtime; Owner: supabase_admin
--

GRANT ALL ON FUNCTION realtime.apply_rls(wal jsonb, max_record_bytes integer) TO postgres;
GRANT ALL ON FUNCTION realtime.apply_rls(wal jsonb, max_record_bytes integer) TO dashboard_user;
GRANT ALL ON FUNCTION realtime.apply_rls(wal jsonb, max_record_bytes integer) TO anon;
GRANT ALL ON FUNCTION realtime.apply_rls(wal jsonb, max_record_bytes integer) TO authenticated;
GRANT ALL ON FUNCTION realtime.apply_rls(wal jsonb, max_record_bytes integer) TO service_role;
GRANT ALL ON FUNCTION realtime.apply_rls(wal jsonb, max_record_bytes integer) TO supabase_realtime_admin;


--
-- TOC entry 4847 (class 0 OID 0)
-- Dependencies: 577
-- Name: FUNCTION broadcast_changes(topic_name text, event_name text, operation text, table_name text, table_schema text, new record, old record, level text); Type: ACL; Schema: realtime; Owner: supabase_admin
--

GRANT ALL ON FUNCTION realtime.broadcast_changes(topic_name text, event_name text, operation text, table_name text, table_schema text, new record, old record, level text) TO postgres;
GRANT ALL ON FUNCTION realtime.broadcast_changes(topic_name text, event_name text, operation text, table_name text, table_schema text, new record, old record, level text) TO dashboard_user;


--
-- TOC entry 4848 (class 0 OID 0)
-- Dependencies: 545
-- Name: FUNCTION build_prepared_statement_sql(prepared_statement_name text, entity regclass, columns realtime.wal_column[]); Type: ACL; Schema: realtime; Owner: supabase_admin
--

GRANT ALL ON FUNCTION realtime.build_prepared_statement_sql(prepared_statement_name text, entity regclass, columns realtime.wal_column[]) TO postgres;
GRANT ALL ON FUNCTION realtime.build_prepared_statement_sql(prepared_statement_name text, entity regclass, columns realtime.wal_column[]) TO dashboard_user;
GRANT ALL ON FUNCTION realtime.build_prepared_statement_sql(prepared_statement_name text, entity regclass, columns realtime.wal_column[]) TO anon;
GRANT ALL ON FUNCTION realtime.build_prepared_statement_sql(prepared_statement_name text, entity regclass, columns realtime.wal_column[]) TO authenticated;
GRANT ALL ON FUNCTION realtime.build_prepared_statement_sql(prepared_statement_name text, entity regclass, columns realtime.wal_column[]) TO service_role;
GRANT ALL ON FUNCTION realtime.build_prepared_statement_sql(prepared_statement_name text, entity regclass, columns realtime.wal_column[]) TO supabase_realtime_admin;


--
-- TOC entry 4849 (class 0 OID 0)
-- Dependencies: 459
-- Name: FUNCTION "cast"(val text, type_ regtype); Type: ACL; Schema: realtime; Owner: supabase_admin
--

GRANT ALL ON FUNCTION realtime."cast"(val text, type_ regtype) TO postgres;
GRANT ALL ON FUNCTION realtime."cast"(val text, type_ regtype) TO dashboard_user;
GRANT ALL ON FUNCTION realtime."cast"(val text, type_ regtype) TO anon;
GRANT ALL ON FUNCTION realtime."cast"(val text, type_ regtype) TO authenticated;
GRANT ALL ON FUNCTION realtime."cast"(val text, type_ regtype) TO service_role;
GRANT ALL ON FUNCTION realtime."cast"(val text, type_ regtype) TO supabase_realtime_admin;


--
-- TOC entry 4850 (class 0 OID 0)
-- Dependencies: 494
-- Name: FUNCTION check_equality_op(op realtime.equality_op, type_ regtype, val_1 text, val_2 text); Type: ACL; Schema: realtime; Owner: supabase_admin
--

GRANT ALL ON FUNCTION realtime.check_equality_op(op realtime.equality_op, type_ regtype, val_1 text, val_2 text) TO postgres;
GRANT ALL ON FUNCTION realtime.check_equality_op(op realtime.equality_op, type_ regtype, val_1 text, val_2 text) TO dashboard_user;
GRANT ALL ON FUNCTION realtime.check_equality_op(op realtime.equality_op, type_ regtype, val_1 text, val_2 text) TO anon;
GRANT ALL ON FUNCTION realtime.check_equality_op(op realtime.equality_op, type_ regtype, val_1 text, val_2 text) TO authenticated;
GRANT ALL ON FUNCTION realtime.check_equality_op(op realtime.equality_op, type_ regtype, val_1 text, val_2 text) TO service_role;
GRANT ALL ON FUNCTION realtime.check_equality_op(op realtime.equality_op, type_ regtype, val_1 text, val_2 text) TO supabase_realtime_admin;


--
-- TOC entry 4851 (class 0 OID 0)
-- Dependencies: 526
-- Name: FUNCTION is_visible_through_filters(columns realtime.wal_column[], filters realtime.user_defined_filter[]); Type: ACL; Schema: realtime; Owner: supabase_admin
--

GRANT ALL ON FUNCTION realtime.is_visible_through_filters(columns realtime.wal_column[], filters realtime.user_defined_filter[]) TO postgres;
GRANT ALL ON FUNCTION realtime.is_visible_through_filters(columns realtime.wal_column[], filters realtime.user_defined_filter[]) TO dashboard_user;
GRANT ALL ON FUNCTION realtime.is_visible_through_filters(columns realtime.wal_column[], filters realtime.user_defined_filter[]) TO anon;
GRANT ALL ON FUNCTION realtime.is_visible_through_filters(columns realtime.wal_column[], filters realtime.user_defined_filter[]) TO authenticated;
GRANT ALL ON FUNCTION realtime.is_visible_through_filters(columns realtime.wal_column[], filters realtime.user_defined_filter[]) TO service_role;
GRANT ALL ON FUNCTION realtime.is_visible_through_filters(columns realtime.wal_column[], filters realtime.user_defined_filter[]) TO supabase_realtime_admin;


--
-- TOC entry 4852 (class 0 OID 0)
-- Dependencies: 485
-- Name: FUNCTION list_changes(publication name, slot_name name, max_changes integer, max_record_bytes integer); Type: ACL; Schema: realtime; Owner: supabase_admin
--

GRANT ALL ON FUNCTION realtime.list_changes(publication name, slot_name name, max_changes integer, max_record_bytes integer) TO postgres;
GRANT ALL ON FUNCTION realtime.list_changes(publication name, slot_name name, max_changes integer, max_record_bytes integer) TO dashboard_user;
GRANT ALL ON FUNCTION realtime.list_changes(publication name, slot_name name, max_changes integer, max_record_bytes integer) TO anon;
GRANT ALL ON FUNCTION realtime.list_changes(publication name, slot_name name, max_changes integer, max_record_bytes integer) TO authenticated;
GRANT ALL ON FUNCTION realtime.list_changes(publication name, slot_name name, max_changes integer, max_record_bytes integer) TO service_role;
GRANT ALL ON FUNCTION realtime.list_changes(publication name, slot_name name, max_changes integer, max_record_bytes integer) TO supabase_realtime_admin;


--
-- TOC entry 4853 (class 0 OID 0)
-- Dependencies: 556
-- Name: FUNCTION quote_wal2json(entity regclass); Type: ACL; Schema: realtime; Owner: supabase_admin
--

GRANT ALL ON FUNCTION realtime.quote_wal2json(entity regclass) TO postgres;
GRANT ALL ON FUNCTION realtime.quote_wal2json(entity regclass) TO dashboard_user;
GRANT ALL ON FUNCTION realtime.quote_wal2json(entity regclass) TO anon;
GRANT ALL ON FUNCTION realtime.quote_wal2json(entity regclass) TO authenticated;
GRANT ALL ON FUNCTION realtime.quote_wal2json(entity regclass) TO service_role;
GRANT ALL ON FUNCTION realtime.quote_wal2json(entity regclass) TO supabase_realtime_admin;


--
-- TOC entry 4854 (class 0 OID 0)
-- Dependencies: 544
-- Name: FUNCTION send(payload jsonb, event text, topic text, private boolean); Type: ACL; Schema: realtime; Owner: supabase_admin
--

GRANT ALL ON FUNCTION realtime.send(payload jsonb, event text, topic text, private boolean) TO postgres;
GRANT ALL ON FUNCTION realtime.send(payload jsonb, event text, topic text, private boolean) TO dashboard_user;


--
-- TOC entry 4855 (class 0 OID 0)
-- Dependencies: 517
-- Name: FUNCTION subscription_check_filters(); Type: ACL; Schema: realtime; Owner: supabase_admin
--

GRANT ALL ON FUNCTION realtime.subscription_check_filters() TO postgres;
GRANT ALL ON FUNCTION realtime.subscription_check_filters() TO dashboard_user;
GRANT ALL ON FUNCTION realtime.subscription_check_filters() TO anon;
GRANT ALL ON FUNCTION realtime.subscription_check_filters() TO authenticated;
GRANT ALL ON FUNCTION realtime.subscription_check_filters() TO service_role;
GRANT ALL ON FUNCTION realtime.subscription_check_filters() TO supabase_realtime_admin;


--
-- TOC entry 4856 (class 0 OID 0)
-- Dependencies: 507
-- Name: FUNCTION to_regrole(role_name text); Type: ACL; Schema: realtime; Owner: supabase_admin
--

GRANT ALL ON FUNCTION realtime.to_regrole(role_name text) TO postgres;
GRANT ALL ON FUNCTION realtime.to_regrole(role_name text) TO dashboard_user;
GRANT ALL ON FUNCTION realtime.to_regrole(role_name text) TO anon;
GRANT ALL ON FUNCTION realtime.to_regrole(role_name text) TO authenticated;
GRANT ALL ON FUNCTION realtime.to_regrole(role_name text) TO service_role;
GRANT ALL ON FUNCTION realtime.to_regrole(role_name text) TO supabase_realtime_admin;


--
-- TOC entry 4857 (class 0 OID 0)
-- Dependencies: 518
-- Name: FUNCTION topic(); Type: ACL; Schema: realtime; Owner: supabase_realtime_admin
--

GRANT ALL ON FUNCTION realtime.topic() TO postgres;
GRANT ALL ON FUNCTION realtime.topic() TO dashboard_user;


--
-- TOC entry 4858 (class 0 OID 0)
-- Dependencies: 546
-- Name: FUNCTION _crypto_aead_det_decrypt(message bytea, additional bytea, key_id bigint, context bytea, nonce bytea); Type: ACL; Schema: vault; Owner: supabase_admin
--

GRANT ALL ON FUNCTION vault._crypto_aead_det_decrypt(message bytea, additional bytea, key_id bigint, context bytea, nonce bytea) TO postgres WITH GRANT OPTION;
GRANT ALL ON FUNCTION vault._crypto_aead_det_decrypt(message bytea, additional bytea, key_id bigint, context bytea, nonce bytea) TO service_role;


--
-- TOC entry 4859 (class 0 OID 0)
-- Dependencies: 542
-- Name: FUNCTION create_secret(new_secret text, new_name text, new_description text, new_key_id uuid); Type: ACL; Schema: vault; Owner: supabase_admin
--

GRANT ALL ON FUNCTION vault.create_secret(new_secret text, new_name text, new_description text, new_key_id uuid) TO postgres WITH GRANT OPTION;
GRANT ALL ON FUNCTION vault.create_secret(new_secret text, new_name text, new_description text, new_key_id uuid) TO service_role;


--
-- TOC entry 4860 (class 0 OID 0)
-- Dependencies: 559
-- Name: FUNCTION update_secret(secret_id uuid, new_secret text, new_name text, new_description text, new_key_id uuid); Type: ACL; Schema: vault; Owner: supabase_admin
--

GRANT ALL ON FUNCTION vault.update_secret(secret_id uuid, new_secret text, new_name text, new_description text, new_key_id uuid) TO postgres WITH GRANT OPTION;
GRANT ALL ON FUNCTION vault.update_secret(secret_id uuid, new_secret text, new_name text, new_description text, new_key_id uuid) TO service_role;


--
-- TOC entry 4862 (class 0 OID 0)
-- Dependencies: 362
-- Name: TABLE audit_log_entries; Type: ACL; Schema: auth; Owner: supabase_auth_admin
--

GRANT ALL ON TABLE auth.audit_log_entries TO dashboard_user;
GRANT INSERT,REFERENCES,DELETE,TRIGGER,TRUNCATE,MAINTAIN,UPDATE ON TABLE auth.audit_log_entries TO postgres;
GRANT SELECT ON TABLE auth.audit_log_entries TO postgres WITH GRANT OPTION;


--
-- TOC entry 4863 (class 0 OID 0)
-- Dependencies: 402
-- Name: TABLE custom_oauth_providers; Type: ACL; Schema: auth; Owner: supabase_auth_admin
--

GRANT ALL ON TABLE auth.custom_oauth_providers TO postgres;
GRANT ALL ON TABLE auth.custom_oauth_providers TO dashboard_user;


--
-- TOC entry 4865 (class 0 OID 0)
-- Dependencies: 376
-- Name: TABLE flow_state; Type: ACL; Schema: auth; Owner: supabase_auth_admin
--

GRANT INSERT,REFERENCES,DELETE,TRIGGER,TRUNCATE,MAINTAIN,UPDATE ON TABLE auth.flow_state TO postgres;
GRANT SELECT ON TABLE auth.flow_state TO postgres WITH GRANT OPTION;
GRANT ALL ON TABLE auth.flow_state TO dashboard_user;


--
-- TOC entry 4868 (class 0 OID 0)
-- Dependencies: 367
-- Name: TABLE identities; Type: ACL; Schema: auth; Owner: supabase_auth_admin
--

GRANT INSERT,REFERENCES,DELETE,TRIGGER,TRUNCATE,MAINTAIN,UPDATE ON TABLE auth.identities TO postgres;
GRANT SELECT ON TABLE auth.identities TO postgres WITH GRANT OPTION;
GRANT ALL ON TABLE auth.identities TO dashboard_user;


--
-- TOC entry 4870 (class 0 OID 0)
-- Dependencies: 361
-- Name: TABLE instances; Type: ACL; Schema: auth; Owner: supabase_auth_admin
--

GRANT ALL ON TABLE auth.instances TO dashboard_user;
GRANT INSERT,REFERENCES,DELETE,TRIGGER,TRUNCATE,MAINTAIN,UPDATE ON TABLE auth.instances TO postgres;
GRANT SELECT ON TABLE auth.instances TO postgres WITH GRANT OPTION;


--
-- TOC entry 4872 (class 0 OID 0)
-- Dependencies: 371
-- Name: TABLE mfa_amr_claims; Type: ACL; Schema: auth; Owner: supabase_auth_admin
--

GRANT INSERT,REFERENCES,DELETE,TRIGGER,TRUNCATE,MAINTAIN,UPDATE ON TABLE auth.mfa_amr_claims TO postgres;
GRANT SELECT ON TABLE auth.mfa_amr_claims TO postgres WITH GRANT OPTION;
GRANT ALL ON TABLE auth.mfa_amr_claims TO dashboard_user;


--
-- TOC entry 4874 (class 0 OID 0)
-- Dependencies: 370
-- Name: TABLE mfa_challenges; Type: ACL; Schema: auth; Owner: supabase_auth_admin
--

GRANT INSERT,REFERENCES,DELETE,TRIGGER,TRUNCATE,MAINTAIN,UPDATE ON TABLE auth.mfa_challenges TO postgres;
GRANT SELECT ON TABLE auth.mfa_challenges TO postgres WITH GRANT OPTION;
GRANT ALL ON TABLE auth.mfa_challenges TO dashboard_user;


--
-- TOC entry 4877 (class 0 OID 0)
-- Dependencies: 369
-- Name: TABLE mfa_factors; Type: ACL; Schema: auth; Owner: supabase_auth_admin
--

GRANT INSERT,REFERENCES,DELETE,TRIGGER,TRUNCATE,MAINTAIN,UPDATE ON TABLE auth.mfa_factors TO postgres;
GRANT SELECT ON TABLE auth.mfa_factors TO postgres WITH GRANT OPTION;
GRANT ALL ON TABLE auth.mfa_factors TO dashboard_user;


--
-- TOC entry 4878 (class 0 OID 0)
-- Dependencies: 379
-- Name: TABLE oauth_authorizations; Type: ACL; Schema: auth; Owner: supabase_auth_admin
--

GRANT ALL ON TABLE auth.oauth_authorizations TO postgres;
GRANT ALL ON TABLE auth.oauth_authorizations TO dashboard_user;


--
-- TOC entry 4880 (class 0 OID 0)
-- Dependencies: 381
-- Name: TABLE oauth_client_states; Type: ACL; Schema: auth; Owner: supabase_auth_admin
--

GRANT ALL ON TABLE auth.oauth_client_states TO postgres;
GRANT ALL ON TABLE auth.oauth_client_states TO dashboard_user;


--
-- TOC entry 4881 (class 0 OID 0)
-- Dependencies: 378
-- Name: TABLE oauth_clients; Type: ACL; Schema: auth; Owner: supabase_auth_admin
--

GRANT ALL ON TABLE auth.oauth_clients TO postgres;
GRANT ALL ON TABLE auth.oauth_clients TO dashboard_user;


--
-- TOC entry 4882 (class 0 OID 0)
-- Dependencies: 380
-- Name: TABLE oauth_consents; Type: ACL; Schema: auth; Owner: supabase_auth_admin
--

GRANT ALL ON TABLE auth.oauth_consents TO postgres;
GRANT ALL ON TABLE auth.oauth_consents TO dashboard_user;


--
-- TOC entry 4883 (class 0 OID 0)
-- Dependencies: 377
-- Name: TABLE one_time_tokens; Type: ACL; Schema: auth; Owner: supabase_auth_admin
--

GRANT INSERT,REFERENCES,DELETE,TRIGGER,TRUNCATE,MAINTAIN,UPDATE ON TABLE auth.one_time_tokens TO postgres;
GRANT SELECT ON TABLE auth.one_time_tokens TO postgres WITH GRANT OPTION;
GRANT ALL ON TABLE auth.one_time_tokens TO dashboard_user;


--
-- TOC entry 4885 (class 0 OID 0)
-- Dependencies: 360
-- Name: TABLE refresh_tokens; Type: ACL; Schema: auth; Owner: supabase_auth_admin
--

GRANT ALL ON TABLE auth.refresh_tokens TO dashboard_user;
GRANT INSERT,REFERENCES,DELETE,TRIGGER,TRUNCATE,MAINTAIN,UPDATE ON TABLE auth.refresh_tokens TO postgres;
GRANT SELECT ON TABLE auth.refresh_tokens TO postgres WITH GRANT OPTION;


--
-- TOC entry 4887 (class 0 OID 0)
-- Dependencies: 359
-- Name: SEQUENCE refresh_tokens_id_seq; Type: ACL; Schema: auth; Owner: supabase_auth_admin
--

GRANT ALL ON SEQUENCE auth.refresh_tokens_id_seq TO dashboard_user;
GRANT ALL ON SEQUENCE auth.refresh_tokens_id_seq TO postgres;


--
-- TOC entry 4889 (class 0 OID 0)
-- Dependencies: 374
-- Name: TABLE saml_providers; Type: ACL; Schema: auth; Owner: supabase_auth_admin
--

GRANT INSERT,REFERENCES,DELETE,TRIGGER,TRUNCATE,MAINTAIN,UPDATE ON TABLE auth.saml_providers TO postgres;
GRANT SELECT ON TABLE auth.saml_providers TO postgres WITH GRANT OPTION;
GRANT ALL ON TABLE auth.saml_providers TO dashboard_user;


--
-- TOC entry 4891 (class 0 OID 0)
-- Dependencies: 375
-- Name: TABLE saml_relay_states; Type: ACL; Schema: auth; Owner: supabase_auth_admin
--

GRANT INSERT,REFERENCES,DELETE,TRIGGER,TRUNCATE,MAINTAIN,UPDATE ON TABLE auth.saml_relay_states TO postgres;
GRANT SELECT ON TABLE auth.saml_relay_states TO postgres WITH GRANT OPTION;
GRANT ALL ON TABLE auth.saml_relay_states TO dashboard_user;


--
-- TOC entry 4893 (class 0 OID 0)
-- Dependencies: 363
-- Name: TABLE schema_migrations; Type: ACL; Schema: auth; Owner: supabase_auth_admin
--

GRANT SELECT ON TABLE auth.schema_migrations TO postgres WITH GRANT OPTION;


--
-- TOC entry 4898 (class 0 OID 0)
-- Dependencies: 368
-- Name: TABLE sessions; Type: ACL; Schema: auth; Owner: supabase_auth_admin
--

GRANT INSERT,REFERENCES,DELETE,TRIGGER,TRUNCATE,MAINTAIN,UPDATE ON TABLE auth.sessions TO postgres;
GRANT SELECT ON TABLE auth.sessions TO postgres WITH GRANT OPTION;
GRANT ALL ON TABLE auth.sessions TO dashboard_user;


--
-- TOC entry 4900 (class 0 OID 0)
-- Dependencies: 373
-- Name: TABLE sso_domains; Type: ACL; Schema: auth; Owner: supabase_auth_admin
--

GRANT INSERT,REFERENCES,DELETE,TRIGGER,TRUNCATE,MAINTAIN,UPDATE ON TABLE auth.sso_domains TO postgres;
GRANT SELECT ON TABLE auth.sso_domains TO postgres WITH GRANT OPTION;
GRANT ALL ON TABLE auth.sso_domains TO dashboard_user;


--
-- TOC entry 4903 (class 0 OID 0)
-- Dependencies: 372
-- Name: TABLE sso_providers; Type: ACL; Schema: auth; Owner: supabase_auth_admin
--

GRANT INSERT,REFERENCES,DELETE,TRIGGER,TRUNCATE,MAINTAIN,UPDATE ON TABLE auth.sso_providers TO postgres;
GRANT SELECT ON TABLE auth.sso_providers TO postgres WITH GRANT OPTION;
GRANT ALL ON TABLE auth.sso_providers TO dashboard_user;


--
-- TOC entry 4906 (class 0 OID 0)
-- Dependencies: 358
-- Name: TABLE users; Type: ACL; Schema: auth; Owner: supabase_auth_admin
--

GRANT ALL ON TABLE auth.users TO dashboard_user;
GRANT INSERT,REFERENCES,DELETE,TRIGGER,TRUNCATE,MAINTAIN,UPDATE ON TABLE auth.users TO postgres;
GRANT SELECT ON TABLE auth.users TO postgres WITH GRANT OPTION;


--
-- TOC entry 4907 (class 0 OID 0)
-- Dependencies: 418
-- Name: TABLE webauthn_challenges; Type: ACL; Schema: auth; Owner: supabase_auth_admin
--

GRANT ALL ON TABLE auth.webauthn_challenges TO postgres;
GRANT ALL ON TABLE auth.webauthn_challenges TO dashboard_user;


--
-- TOC entry 4908 (class 0 OID 0)
-- Dependencies: 417
-- Name: TABLE webauthn_credentials; Type: ACL; Schema: auth; Owner: supabase_auth_admin
--

GRANT ALL ON TABLE auth.webauthn_credentials TO postgres;
GRANT ALL ON TABLE auth.webauthn_credentials TO dashboard_user;


--
-- TOC entry 4909 (class 0 OID 0)
-- Dependencies: 409
-- Name: TABLE hypopg_list_indexes; Type: ACL; Schema: extensions; Owner: supabase_admin
--

GRANT ALL ON TABLE extensions.hypopg_list_indexes TO postgres WITH GRANT OPTION;


--
-- TOC entry 4910 (class 0 OID 0)
-- Dependencies: 410
-- Name: TABLE hypopg_hidden_indexes; Type: ACL; Schema: extensions; Owner: supabase_admin
--

GRANT ALL ON TABLE extensions.hypopg_hidden_indexes TO postgres WITH GRANT OPTION;


--
-- TOC entry 4911 (class 0 OID 0)
-- Dependencies: 357
-- Name: TABLE pg_stat_statements; Type: ACL; Schema: extensions; Owner: postgres
--

REVOKE ALL ON TABLE extensions.pg_stat_statements FROM postgres;
GRANT ALL ON TABLE extensions.pg_stat_statements TO postgres WITH GRANT OPTION;
GRANT ALL ON TABLE extensions.pg_stat_statements TO dashboard_user;


--
-- TOC entry 4912 (class 0 OID 0)
-- Dependencies: 356
-- Name: TABLE pg_stat_statements_info; Type: ACL; Schema: extensions; Owner: postgres
--

REVOKE ALL ON TABLE extensions.pg_stat_statements_info FROM postgres;
GRANT ALL ON TABLE extensions.pg_stat_statements_info TO postgres WITH GRANT OPTION;
GRANT ALL ON TABLE extensions.pg_stat_statements_info TO dashboard_user;


--
-- TOC entry 4913 (class 0 OID 0)
-- Dependencies: 400
-- Name: TABLE admin_settings; Type: ACL; Schema: public; Owner: postgres
--

GRANT ALL ON TABLE public.admin_settings TO anon;
GRANT ALL ON TABLE public.admin_settings TO authenticated;
GRANT ALL ON TABLE public.admin_settings TO service_role;


--
-- TOC entry 4914 (class 0 OID 0)
-- Dependencies: 403
-- Name: TABLE affiliate_clicks; Type: ACL; Schema: public; Owner: postgres
--

GRANT ALL ON TABLE public.affiliate_clicks TO anon;
GRANT ALL ON TABLE public.affiliate_clicks TO authenticated;
GRANT ALL ON TABLE public.affiliate_clicks TO service_role;


--
-- TOC entry 4915 (class 0 OID 0)
-- Dependencies: 398
-- Name: TABLE booking_inquiries; Type: ACL; Schema: public; Owner: postgres
--

GRANT ALL ON TABLE public.booking_inquiries TO anon;
GRANT ALL ON TABLE public.booking_inquiries TO authenticated;
GRANT ALL ON TABLE public.booking_inquiries TO service_role;


--
-- TOC entry 4916 (class 0 OID 0)
-- Dependencies: 413
-- Name: TABLE bookings; Type: ACL; Schema: public; Owner: postgres
--

GRANT ALL ON TABLE public.bookings TO anon;
GRANT ALL ON TABLE public.bookings TO authenticated;
GRANT ALL ON TABLE public.bookings TO service_role;


--
-- TOC entry 4917 (class 0 OID 0)
-- Dependencies: 408
-- Name: TABLE course_prices; Type: ACL; Schema: public; Owner: postgres
--

GRANT ALL ON TABLE public.course_prices TO anon;
GRANT ALL ON TABLE public.course_prices TO authenticated;
GRANT ALL ON TABLE public.course_prices TO service_role;


--
-- TOC entry 4918 (class 0 OID 0)
-- Dependencies: 419
-- Name: TABLE dive_site_pages; Type: ACL; Schema: public; Owner: postgres
--

GRANT ALL ON TABLE public.dive_site_pages TO anon;
GRANT ALL ON TABLE public.dive_site_pages TO authenticated;
GRANT ALL ON TABLE public.dive_site_pages TO service_role;


--
-- TOC entry 4919 (class 0 OID 0)
-- Dependencies: 414
-- Name: TABLE emails; Type: ACL; Schema: public; Owner: postgres
--

GRANT ALL ON TABLE public.emails TO anon;
GRANT ALL ON TABLE public.emails TO authenticated;
GRANT ALL ON TABLE public.emails TO service_role;


--
-- TOC entry 4920 (class 0 OID 0)
-- Dependencies: 412
-- Name: TABLE newdiving; Type: ACL; Schema: public; Owner: postgres
--

GRANT ALL ON TABLE public.newdiving TO anon;
GRANT ALL ON TABLE public.newdiving TO authenticated;
GRANT ALL ON TABLE public.newdiving TO service_role;


--
-- TOC entry 4922 (class 0 OID 0)
-- Dependencies: 411
-- Name: SEQUENCE newdiving_id_seq; Type: ACL; Schema: public; Owner: postgres
--

GRANT ALL ON SEQUENCE public.newdiving_id_seq TO anon;
GRANT ALL ON SEQUENCE public.newdiving_id_seq TO authenticated;
GRANT ALL ON SEQUENCE public.newdiving_id_seq TO service_role;


--
-- TOC entry 4923 (class 0 OID 0)
-- Dependencies: 404
-- Name: TABLE page_content; Type: ACL; Schema: public; Owner: postgres
--

GRANT ALL ON TABLE public.page_content TO anon;
GRANT ALL ON TABLE public.page_content TO authenticated;
GRANT ALL ON TABLE public.page_content TO service_role;


--
-- TOC entry 4925 (class 0 OID 0)
-- Dependencies: 405
-- Name: TABLE page_metadata; Type: ACL; Schema: public; Owner: postgres
--

GRANT ALL ON TABLE public.page_metadata TO anon;
GRANT ALL ON TABLE public.page_metadata TO authenticated;
GRANT ALL ON TABLE public.page_metadata TO service_role;


--
-- TOC entry 4927 (class 0 OID 0)
-- Dependencies: 407
-- Name: TABLE page_security; Type: ACL; Schema: public; Owner: postgres
--

GRANT ALL ON TABLE public.page_security TO anon;
GRANT ALL ON TABLE public.page_security TO authenticated;
GRANT ALL ON TABLE public.page_security TO service_role;


--
-- TOC entry 4929 (class 0 OID 0)
-- Dependencies: 406
-- Name: TABLE page_seo; Type: ACL; Schema: public; Owner: postgres
--

GRANT ALL ON TABLE public.page_seo TO anon;
GRANT ALL ON TABLE public.page_seo TO authenticated;
GRANT ALL ON TABLE public.page_seo TO service_role;


--
-- TOC entry 4930 (class 0 OID 0)
-- Dependencies: 401
-- Name: TABLE profiles; Type: ACL; Schema: public; Owner: postgres
--

GRANT ALL ON TABLE public.profiles TO anon;
GRANT ALL ON TABLE public.profiles TO authenticated;
GRANT ALL ON TABLE public.profiles TO service_role;


--
-- TOC entry 4931 (class 0 OID 0)
-- Dependencies: 428
-- Name: TABLE project_tasks; Type: ACL; Schema: public; Owner: postgres
--

GRANT ALL ON TABLE public.project_tasks TO anon;
GRANT ALL ON TABLE public.project_tasks TO authenticated;
GRANT ALL ON TABLE public.project_tasks TO service_role;


--
-- TOC entry 4932 (class 0 OID 0)
-- Dependencies: 423
-- Name: TABLE role_change_audit; Type: ACL; Schema: public; Owner: postgres
--

GRANT ALL ON TABLE public.role_change_audit TO anon;
GRANT ALL ON TABLE public.role_change_audit TO authenticated;
GRANT ALL ON TABLE public.role_change_audit TO service_role;


--
-- TOC entry 4933 (class 0 OID 0)
-- Dependencies: 399
-- Name: TABLE user_roles; Type: ACL; Schema: public; Owner: postgres
--

GRANT ALL ON TABLE public.user_roles TO anon;
GRANT ALL ON TABLE public.user_roles TO authenticated;
GRANT ALL ON TABLE public.user_roles TO service_role;


--
-- TOC entry 4934 (class 0 OID 0)
-- Dependencies: 415
-- Name: TABLE users; Type: ACL; Schema: public; Owner: postgres
--

GRANT ALL ON TABLE public.users TO anon;
GRANT ALL ON TABLE public.users TO authenticated;
GRANT ALL ON TABLE public.users TO service_role;


--
-- TOC entry 4935 (class 0 OID 0)
-- Dependencies: 416
-- Name: TABLE vouchers; Type: ACL; Schema: public; Owner: postgres
--

GRANT ALL ON TABLE public.vouchers TO anon;
GRANT ALL ON TABLE public.vouchers TO authenticated;
GRANT ALL ON TABLE public.vouchers TO service_role;


--
-- TOC entry 4936 (class 0 OID 0)
-- Dependencies: 396
-- Name: TABLE messages; Type: ACL; Schema: realtime; Owner: supabase_realtime_admin
--

GRANT ALL ON TABLE realtime.messages TO postgres;
GRANT ALL ON TABLE realtime.messages TO dashboard_user;
GRANT SELECT,INSERT,UPDATE ON TABLE realtime.messages TO anon;
GRANT SELECT,INSERT,UPDATE ON TABLE realtime.messages TO authenticated;
GRANT SELECT,INSERT,UPDATE ON TABLE realtime.messages TO service_role;


--
-- TOC entry 4937 (class 0 OID 0)
-- Dependencies: 424
-- Name: TABLE messages_2026_04_01; Type: ACL; Schema: realtime; Owner: supabase_admin
--

GRANT ALL ON TABLE realtime.messages_2026_04_01 TO postgres;
GRANT ALL ON TABLE realtime.messages_2026_04_01 TO dashboard_user;


--
-- TOC entry 4938 (class 0 OID 0)
-- Dependencies: 425
-- Name: TABLE messages_2026_04_02; Type: ACL; Schema: realtime; Owner: supabase_admin
--

GRANT ALL ON TABLE realtime.messages_2026_04_02 TO postgres;
GRANT ALL ON TABLE realtime.messages_2026_04_02 TO dashboard_user;


--
-- TOC entry 4939 (class 0 OID 0)
-- Dependencies: 426
-- Name: TABLE messages_2026_04_03; Type: ACL; Schema: realtime; Owner: supabase_admin
--

GRANT ALL ON TABLE realtime.messages_2026_04_03 TO postgres;
GRANT ALL ON TABLE realtime.messages_2026_04_03 TO dashboard_user;


--
-- TOC entry 4940 (class 0 OID 0)
-- Dependencies: 427
-- Name: TABLE messages_2026_04_04; Type: ACL; Schema: realtime; Owner: supabase_admin
--

GRANT ALL ON TABLE realtime.messages_2026_04_04 TO postgres;
GRANT ALL ON TABLE realtime.messages_2026_04_04 TO dashboard_user;


--
-- TOC entry 4941 (class 0 OID 0)
-- Dependencies: 429
-- Name: TABLE messages_2026_04_05; Type: ACL; Schema: realtime; Owner: supabase_admin
--

GRANT ALL ON TABLE realtime.messages_2026_04_05 TO postgres;
GRANT ALL ON TABLE realtime.messages_2026_04_05 TO dashboard_user;


--
-- TOC entry 4942 (class 0 OID 0)
-- Dependencies: 430
-- Name: TABLE messages_2026_04_06; Type: ACL; Schema: realtime; Owner: supabase_admin
--

GRANT ALL ON TABLE realtime.messages_2026_04_06 TO postgres;
GRANT ALL ON TABLE realtime.messages_2026_04_06 TO dashboard_user;


--
-- TOC entry 4943 (class 0 OID 0)
-- Dependencies: 431
-- Name: TABLE messages_2026_04_07; Type: ACL; Schema: realtime; Owner: supabase_admin
--

GRANT ALL ON TABLE realtime.messages_2026_04_07 TO postgres;
GRANT ALL ON TABLE realtime.messages_2026_04_07 TO dashboard_user;


--
-- TOC entry 4944 (class 0 OID 0)
-- Dependencies: 390
-- Name: TABLE schema_migrations; Type: ACL; Schema: realtime; Owner: supabase_admin
--

GRANT ALL ON TABLE realtime.schema_migrations TO postgres;
GRANT ALL ON TABLE realtime.schema_migrations TO dashboard_user;
GRANT SELECT ON TABLE realtime.schema_migrations TO anon;
GRANT SELECT ON TABLE realtime.schema_migrations TO authenticated;
GRANT SELECT ON TABLE realtime.schema_migrations TO service_role;
GRANT ALL ON TABLE realtime.schema_migrations TO supabase_realtime_admin;


--
-- TOC entry 4945 (class 0 OID 0)
-- Dependencies: 393
-- Name: TABLE subscription; Type: ACL; Schema: realtime; Owner: supabase_admin
--

GRANT ALL ON TABLE realtime.subscription TO postgres;
GRANT ALL ON TABLE realtime.subscription TO dashboard_user;
GRANT SELECT ON TABLE realtime.subscription TO anon;
GRANT SELECT ON TABLE realtime.subscription TO authenticated;
GRANT SELECT ON TABLE realtime.subscription TO service_role;
GRANT ALL ON TABLE realtime.subscription TO supabase_realtime_admin;


--
-- TOC entry 4946 (class 0 OID 0)
-- Dependencies: 392
-- Name: SEQUENCE subscription_id_seq; Type: ACL; Schema: realtime; Owner: supabase_admin
--

GRANT ALL ON SEQUENCE realtime.subscription_id_seq TO postgres;
GRANT ALL ON SEQUENCE realtime.subscription_id_seq TO dashboard_user;
GRANT USAGE ON SEQUENCE realtime.subscription_id_seq TO anon;
GRANT USAGE ON SEQUENCE realtime.subscription_id_seq TO authenticated;
GRANT USAGE ON SEQUENCE realtime.subscription_id_seq TO service_role;
GRANT ALL ON SEQUENCE realtime.subscription_id_seq TO supabase_realtime_admin;


--
-- TOC entry 4948 (class 0 OID 0)
-- Dependencies: 383
-- Name: TABLE buckets; Type: ACL; Schema: storage; Owner: supabase_storage_admin
--

REVOKE ALL ON TABLE storage.buckets FROM supabase_storage_admin;
GRANT ALL ON TABLE storage.buckets TO supabase_storage_admin WITH GRANT OPTION;
GRANT ALL ON TABLE storage.buckets TO service_role;
GRANT ALL ON TABLE storage.buckets TO authenticated;
GRANT ALL ON TABLE storage.buckets TO anon;
GRANT ALL ON TABLE storage.buckets TO postgres WITH GRANT OPTION;


--
-- TOC entry 4949 (class 0 OID 0)
-- Dependencies: 387
-- Name: TABLE buckets_analytics; Type: ACL; Schema: storage; Owner: supabase_storage_admin
--

GRANT ALL ON TABLE storage.buckets_analytics TO service_role;
GRANT ALL ON TABLE storage.buckets_analytics TO authenticated;
GRANT ALL ON TABLE storage.buckets_analytics TO anon;


--
-- TOC entry 4950 (class 0 OID 0)
-- Dependencies: 388
-- Name: TABLE buckets_vectors; Type: ACL; Schema: storage; Owner: supabase_storage_admin
--

GRANT SELECT ON TABLE storage.buckets_vectors TO service_role;
GRANT SELECT ON TABLE storage.buckets_vectors TO authenticated;
GRANT SELECT ON TABLE storage.buckets_vectors TO anon;


--
-- TOC entry 4952 (class 0 OID 0)
-- Dependencies: 384
-- Name: TABLE objects; Type: ACL; Schema: storage; Owner: supabase_storage_admin
--

REVOKE ALL ON TABLE storage.objects FROM supabase_storage_admin;
GRANT ALL ON TABLE storage.objects TO supabase_storage_admin WITH GRANT OPTION;
GRANT ALL ON TABLE storage.objects TO service_role;
GRANT ALL ON TABLE storage.objects TO authenticated;
GRANT ALL ON TABLE storage.objects TO anon;
GRANT ALL ON TABLE storage.objects TO postgres WITH GRANT OPTION;


--
-- TOC entry 4953 (class 0 OID 0)
-- Dependencies: 385
-- Name: TABLE s3_multipart_uploads; Type: ACL; Schema: storage; Owner: supabase_storage_admin
--

GRANT ALL ON TABLE storage.s3_multipart_uploads TO service_role;
GRANT SELECT ON TABLE storage.s3_multipart_uploads TO authenticated;
GRANT SELECT ON TABLE storage.s3_multipart_uploads TO anon;


--
-- TOC entry 4954 (class 0 OID 0)
-- Dependencies: 386
-- Name: TABLE s3_multipart_uploads_parts; Type: ACL; Schema: storage; Owner: supabase_storage_admin
--

GRANT ALL ON TABLE storage.s3_multipart_uploads_parts TO service_role;
GRANT SELECT ON TABLE storage.s3_multipart_uploads_parts TO authenticated;
GRANT SELECT ON TABLE storage.s3_multipart_uploads_parts TO anon;


--
-- TOC entry 4955 (class 0 OID 0)
-- Dependencies: 389
-- Name: TABLE vector_indexes; Type: ACL; Schema: storage; Owner: supabase_storage_admin
--

GRANT SELECT ON TABLE storage.vector_indexes TO service_role;
GRANT SELECT ON TABLE storage.vector_indexes TO authenticated;
GRANT SELECT ON TABLE storage.vector_indexes TO anon;


--
-- TOC entry 4956 (class 0 OID 0)
-- Dependencies: 364
-- Name: TABLE secrets; Type: ACL; Schema: vault; Owner: supabase_admin
--

GRANT SELECT,REFERENCES,DELETE,TRUNCATE ON TABLE vault.secrets TO postgres WITH GRANT OPTION;
GRANT SELECT,DELETE ON TABLE vault.secrets TO service_role;


--
-- TOC entry 4957 (class 0 OID 0)
-- Dependencies: 365
-- Name: TABLE decrypted_secrets; Type: ACL; Schema: vault; Owner: supabase_admin
--

GRANT SELECT,REFERENCES,DELETE,TRUNCATE ON TABLE vault.decrypted_secrets TO postgres WITH GRANT OPTION;
GRANT SELECT,DELETE ON TABLE vault.decrypted_secrets TO service_role;


--
-- TOC entry 2658 (class 826 OID 16557)
-- Name: DEFAULT PRIVILEGES FOR SEQUENCES; Type: DEFAULT ACL; Schema: auth; Owner: supabase_auth_admin
--

ALTER DEFAULT PRIVILEGES FOR ROLE supabase_auth_admin IN SCHEMA auth GRANT ALL ON SEQUENCES TO postgres;
ALTER DEFAULT PRIVILEGES FOR ROLE supabase_auth_admin IN SCHEMA auth GRANT ALL ON SEQUENCES TO dashboard_user;


--
-- TOC entry 2659 (class 826 OID 16558)
-- Name: DEFAULT PRIVILEGES FOR FUNCTIONS; Type: DEFAULT ACL; Schema: auth; Owner: supabase_auth_admin
--

ALTER DEFAULT PRIVILEGES FOR ROLE supabase_auth_admin IN SCHEMA auth GRANT ALL ON FUNCTIONS TO postgres;
ALTER DEFAULT PRIVILEGES FOR ROLE supabase_auth_admin IN SCHEMA auth GRANT ALL ON FUNCTIONS TO dashboard_user;


--
-- TOC entry 2657 (class 826 OID 16556)
-- Name: DEFAULT PRIVILEGES FOR TABLES; Type: DEFAULT ACL; Schema: auth; Owner: supabase_auth_admin
--

ALTER DEFAULT PRIVILEGES FOR ROLE supabase_auth_admin IN SCHEMA auth GRANT ALL ON TABLES TO postgres;
ALTER DEFAULT PRIVILEGES FOR ROLE supabase_auth_admin IN SCHEMA auth GRANT ALL ON TABLES TO dashboard_user;


--
-- TOC entry 2668 (class 826 OID 16636)
-- Name: DEFAULT PRIVILEGES FOR SEQUENCES; Type: DEFAULT ACL; Schema: extensions; Owner: supabase_admin
--

ALTER DEFAULT PRIVILEGES FOR ROLE supabase_admin IN SCHEMA extensions GRANT ALL ON SEQUENCES TO postgres WITH GRANT OPTION;


--
-- TOC entry 2667 (class 826 OID 16635)
-- Name: DEFAULT PRIVILEGES FOR FUNCTIONS; Type: DEFAULT ACL; Schema: extensions; Owner: supabase_admin
--

ALTER DEFAULT PRIVILEGES FOR ROLE supabase_admin IN SCHEMA extensions GRANT ALL ON FUNCTIONS TO postgres WITH GRANT OPTION;


--
-- TOC entry 2666 (class 826 OID 16634)
-- Name: DEFAULT PRIVILEGES FOR TABLES; Type: DEFAULT ACL; Schema: extensions; Owner: supabase_admin
--

ALTER DEFAULT PRIVILEGES FOR ROLE supabase_admin IN SCHEMA extensions GRANT ALL ON TABLES TO postgres WITH GRANT OPTION;


--
-- TOC entry 2671 (class 826 OID 16591)
-- Name: DEFAULT PRIVILEGES FOR SEQUENCES; Type: DEFAULT ACL; Schema: graphql; Owner: supabase_admin
--

ALTER DEFAULT PRIVILEGES FOR ROLE supabase_admin IN SCHEMA graphql GRANT ALL ON SEQUENCES TO postgres;
ALTER DEFAULT PRIVILEGES FOR ROLE supabase_admin IN SCHEMA graphql GRANT ALL ON SEQUENCES TO anon;
ALTER DEFAULT PRIVILEGES FOR ROLE supabase_admin IN SCHEMA graphql GRANT ALL ON SEQUENCES TO authenticated;
ALTER DEFAULT PRIVILEGES FOR ROLE supabase_admin IN SCHEMA graphql GRANT ALL ON SEQUENCES TO service_role;


--
-- TOC entry 2670 (class 826 OID 16590)
-- Name: DEFAULT PRIVILEGES FOR FUNCTIONS; Type: DEFAULT ACL; Schema: graphql; Owner: supabase_admin
--

ALTER DEFAULT PRIVILEGES FOR ROLE supabase_admin IN SCHEMA graphql GRANT ALL ON FUNCTIONS TO postgres;
ALTER DEFAULT PRIVILEGES FOR ROLE supabase_admin IN SCHEMA graphql GRANT ALL ON FUNCTIONS TO anon;
ALTER DEFAULT PRIVILEGES FOR ROLE supabase_admin IN SCHEMA graphql GRANT ALL ON FUNCTIONS TO authenticated;
ALTER DEFAULT PRIVILEGES FOR ROLE supabase_admin IN SCHEMA graphql GRANT ALL ON FUNCTIONS TO service_role;


--
-- TOC entry 2669 (class 826 OID 16589)
-- Name: DEFAULT PRIVILEGES FOR TABLES; Type: DEFAULT ACL; Schema: graphql; Owner: supabase_admin
--

ALTER DEFAULT PRIVILEGES FOR ROLE supabase_admin IN SCHEMA graphql GRANT ALL ON TABLES TO postgres;
ALTER DEFAULT PRIVILEGES FOR ROLE supabase_admin IN SCHEMA graphql GRANT ALL ON TABLES TO anon;
ALTER DEFAULT PRIVILEGES FOR ROLE supabase_admin IN SCHEMA graphql GRANT ALL ON TABLES TO authenticated;
ALTER DEFAULT PRIVILEGES FOR ROLE supabase_admin IN SCHEMA graphql GRANT ALL ON TABLES TO service_role;


--
-- TOC entry 2663 (class 826 OID 16571)
-- Name: DEFAULT PRIVILEGES FOR SEQUENCES; Type: DEFAULT ACL; Schema: graphql_public; Owner: supabase_admin
--

ALTER DEFAULT PRIVILEGES FOR ROLE supabase_admin IN SCHEMA graphql_public GRANT ALL ON SEQUENCES TO postgres;
ALTER DEFAULT PRIVILEGES FOR ROLE supabase_admin IN SCHEMA graphql_public GRANT ALL ON SEQUENCES TO anon;
ALTER DEFAULT PRIVILEGES FOR ROLE supabase_admin IN SCHEMA graphql_public GRANT ALL ON SEQUENCES TO authenticated;
ALTER DEFAULT PRIVILEGES FOR ROLE supabase_admin IN SCHEMA graphql_public GRANT ALL ON SEQUENCES TO service_role;


--
-- TOC entry 2665 (class 826 OID 16570)
-- Name: DEFAULT PRIVILEGES FOR FUNCTIONS; Type: DEFAULT ACL; Schema: graphql_public; Owner: supabase_admin
--

ALTER DEFAULT PRIVILEGES FOR ROLE supabase_admin IN SCHEMA graphql_public GRANT ALL ON FUNCTIONS TO postgres;
ALTER DEFAULT PRIVILEGES FOR ROLE supabase_admin IN SCHEMA graphql_public GRANT ALL ON FUNCTIONS TO anon;
ALTER DEFAULT PRIVILEGES FOR ROLE supabase_admin IN SCHEMA graphql_public GRANT ALL ON FUNCTIONS TO authenticated;
ALTER DEFAULT PRIVILEGES FOR ROLE supabase_admin IN SCHEMA graphql_public GRANT ALL ON FUNCTIONS TO service_role;


--
-- TOC entry 2664 (class 826 OID 16569)
-- Name: DEFAULT PRIVILEGES FOR TABLES; Type: DEFAULT ACL; Schema: graphql_public; Owner: supabase_admin
--

ALTER DEFAULT PRIVILEGES FOR ROLE supabase_admin IN SCHEMA graphql_public GRANT ALL ON TABLES TO postgres;
ALTER DEFAULT PRIVILEGES FOR ROLE supabase_admin IN SCHEMA graphql_public GRANT ALL ON TABLES TO anon;
ALTER DEFAULT PRIVILEGES FOR ROLE supabase_admin IN SCHEMA graphql_public GRANT ALL ON TABLES TO authenticated;
ALTER DEFAULT PRIVILEGES FOR ROLE supabase_admin IN SCHEMA graphql_public GRANT ALL ON TABLES TO service_role;


--
-- TOC entry 2650 (class 826 OID 16494)
-- Name: DEFAULT PRIVILEGES FOR SEQUENCES; Type: DEFAULT ACL; Schema: public; Owner: postgres
--

ALTER DEFAULT PRIVILEGES FOR ROLE postgres IN SCHEMA public GRANT ALL ON SEQUENCES TO postgres;
ALTER DEFAULT PRIVILEGES FOR ROLE postgres IN SCHEMA public GRANT ALL ON SEQUENCES TO anon;
ALTER DEFAULT PRIVILEGES FOR ROLE postgres IN SCHEMA public GRANT ALL ON SEQUENCES TO authenticated;
ALTER DEFAULT PRIVILEGES FOR ROLE postgres IN SCHEMA public GRANT ALL ON SEQUENCES TO service_role;


--
-- TOC entry 2651 (class 826 OID 16495)
-- Name: DEFAULT PRIVILEGES FOR SEQUENCES; Type: DEFAULT ACL; Schema: public; Owner: supabase_admin
--

ALTER DEFAULT PRIVILEGES FOR ROLE supabase_admin IN SCHEMA public GRANT ALL ON SEQUENCES TO postgres;
ALTER DEFAULT PRIVILEGES FOR ROLE supabase_admin IN SCHEMA public GRANT ALL ON SEQUENCES TO anon;
ALTER DEFAULT PRIVILEGES FOR ROLE supabase_admin IN SCHEMA public GRANT ALL ON SEQUENCES TO authenticated;
ALTER DEFAULT PRIVILEGES FOR ROLE supabase_admin IN SCHEMA public GRANT ALL ON SEQUENCES TO service_role;


--
-- TOC entry 2649 (class 826 OID 16493)
-- Name: DEFAULT PRIVILEGES FOR FUNCTIONS; Type: DEFAULT ACL; Schema: public; Owner: postgres
--

ALTER DEFAULT PRIVILEGES FOR ROLE postgres IN SCHEMA public GRANT ALL ON FUNCTIONS TO postgres;
ALTER DEFAULT PRIVILEGES FOR ROLE postgres IN SCHEMA public GRANT ALL ON FUNCTIONS TO anon;
ALTER DEFAULT PRIVILEGES FOR ROLE postgres IN SCHEMA public GRANT ALL ON FUNCTIONS TO authenticated;
ALTER DEFAULT PRIVILEGES FOR ROLE postgres IN SCHEMA public GRANT ALL ON FUNCTIONS TO service_role;


--
-- TOC entry 2653 (class 826 OID 16497)
-- Name: DEFAULT PRIVILEGES FOR FUNCTIONS; Type: DEFAULT ACL; Schema: public; Owner: supabase_admin
--

ALTER DEFAULT PRIVILEGES FOR ROLE supabase_admin IN SCHEMA public GRANT ALL ON FUNCTIONS TO postgres;
ALTER DEFAULT PRIVILEGES FOR ROLE supabase_admin IN SCHEMA public GRANT ALL ON FUNCTIONS TO anon;
ALTER DEFAULT PRIVILEGES FOR ROLE supabase_admin IN SCHEMA public GRANT ALL ON FUNCTIONS TO authenticated;
ALTER DEFAULT PRIVILEGES FOR ROLE supabase_admin IN SCHEMA public GRANT ALL ON FUNCTIONS TO service_role;


--
-- TOC entry 2648 (class 826 OID 16492)
-- Name: DEFAULT PRIVILEGES FOR TABLES; Type: DEFAULT ACL; Schema: public; Owner: postgres
--

ALTER DEFAULT PRIVILEGES FOR ROLE postgres IN SCHEMA public GRANT ALL ON TABLES TO postgres;
ALTER DEFAULT PRIVILEGES FOR ROLE postgres IN SCHEMA public GRANT ALL ON TABLES TO anon;
ALTER DEFAULT PRIVILEGES FOR ROLE postgres IN SCHEMA public GRANT ALL ON TABLES TO authenticated;
ALTER DEFAULT PRIVILEGES FOR ROLE postgres IN SCHEMA public GRANT ALL ON TABLES TO service_role;


--
-- TOC entry 2652 (class 826 OID 16496)
-- Name: DEFAULT PRIVILEGES FOR TABLES; Type: DEFAULT ACL; Schema: public; Owner: supabase_admin
--

ALTER DEFAULT PRIVILEGES FOR ROLE supabase_admin IN SCHEMA public GRANT ALL ON TABLES TO postgres;
ALTER DEFAULT PRIVILEGES FOR ROLE supabase_admin IN SCHEMA public GRANT ALL ON TABLES TO anon;
ALTER DEFAULT PRIVILEGES FOR ROLE supabase_admin IN SCHEMA public GRANT ALL ON TABLES TO authenticated;
ALTER DEFAULT PRIVILEGES FOR ROLE supabase_admin IN SCHEMA public GRANT ALL ON TABLES TO service_role;


--
-- TOC entry 2661 (class 826 OID 16561)
-- Name: DEFAULT PRIVILEGES FOR SEQUENCES; Type: DEFAULT ACL; Schema: realtime; Owner: supabase_admin
--

ALTER DEFAULT PRIVILEGES FOR ROLE supabase_admin IN SCHEMA realtime GRANT ALL ON SEQUENCES TO postgres;
ALTER DEFAULT PRIVILEGES FOR ROLE supabase_admin IN SCHEMA realtime GRANT ALL ON SEQUENCES TO dashboard_user;


--
-- TOC entry 2662 (class 826 OID 16562)
-- Name: DEFAULT PRIVILEGES FOR FUNCTIONS; Type: DEFAULT ACL; Schema: realtime; Owner: supabase_admin
--

ALTER DEFAULT PRIVILEGES FOR ROLE supabase_admin IN SCHEMA realtime GRANT ALL ON FUNCTIONS TO postgres;
ALTER DEFAULT PRIVILEGES FOR ROLE supabase_admin IN SCHEMA realtime GRANT ALL ON FUNCTIONS TO dashboard_user;


--
-- TOC entry 2660 (class 826 OID 16560)
-- Name: DEFAULT PRIVILEGES FOR TABLES; Type: DEFAULT ACL; Schema: realtime; Owner: supabase_admin
--

ALTER DEFAULT PRIVILEGES FOR ROLE supabase_admin IN SCHEMA realtime GRANT ALL ON TABLES TO postgres;
ALTER DEFAULT PRIVILEGES FOR ROLE supabase_admin IN SCHEMA realtime GRANT ALL ON TABLES TO dashboard_user;


--
-- TOC entry 2656 (class 826 OID 16550)
-- Name: DEFAULT PRIVILEGES FOR SEQUENCES; Type: DEFAULT ACL; Schema: storage; Owner: postgres
--

ALTER DEFAULT PRIVILEGES FOR ROLE postgres IN SCHEMA storage GRANT ALL ON SEQUENCES TO postgres;
ALTER DEFAULT PRIVILEGES FOR ROLE postgres IN SCHEMA storage GRANT ALL ON SEQUENCES TO anon;
ALTER DEFAULT PRIVILEGES FOR ROLE postgres IN SCHEMA storage GRANT ALL ON SEQUENCES TO authenticated;
ALTER DEFAULT PRIVILEGES FOR ROLE postgres IN SCHEMA storage GRANT ALL ON SEQUENCES TO service_role;


--
-- TOC entry 2655 (class 826 OID 16549)
-- Name: DEFAULT PRIVILEGES FOR FUNCTIONS; Type: DEFAULT ACL; Schema: storage; Owner: postgres
--

ALTER DEFAULT PRIVILEGES FOR ROLE postgres IN SCHEMA storage GRANT ALL ON FUNCTIONS TO postgres;
ALTER DEFAULT PRIVILEGES FOR ROLE postgres IN SCHEMA storage GRANT ALL ON FUNCTIONS TO anon;
ALTER DEFAULT PRIVILEGES FOR ROLE postgres IN SCHEMA storage GRANT ALL ON FUNCTIONS TO authenticated;
ALTER DEFAULT PRIVILEGES FOR ROLE postgres IN SCHEMA storage GRANT ALL ON FUNCTIONS TO service_role;


--
-- TOC entry 2654 (class 826 OID 16548)
-- Name: DEFAULT PRIVILEGES FOR TABLES; Type: DEFAULT ACL; Schema: storage; Owner: postgres
--

ALTER DEFAULT PRIVILEGES FOR ROLE postgres IN SCHEMA storage GRANT ALL ON TABLES TO postgres;
ALTER DEFAULT PRIVILEGES FOR ROLE postgres IN SCHEMA storage GRANT ALL ON TABLES TO anon;
ALTER DEFAULT PRIVILEGES FOR ROLE postgres IN SCHEMA storage GRANT ALL ON TABLES TO authenticated;
ALTER DEFAULT PRIVILEGES FOR ROLE postgres IN SCHEMA storage GRANT ALL ON TABLES TO service_role;


--
-- TOC entry 3892 (class 3466 OID 19525)
-- Name: ensure_rls; Type: EVENT TRIGGER; Schema: -; Owner: postgres
--

CREATE EVENT TRIGGER ensure_rls ON ddl_command_end
         WHEN TAG IN ('CREATE TABLE', 'CREATE TABLE AS', 'SELECT INTO')
   EXECUTE FUNCTION public.rls_auto_enable();


ALTER EVENT TRIGGER ensure_rls OWNER TO postgres;

--
-- TOC entry 3885 (class 3466 OID 16575)
-- Name: issue_graphql_placeholder; Type: EVENT TRIGGER; Schema: -; Owner: supabase_admin
--

CREATE EVENT TRIGGER issue_graphql_placeholder ON sql_drop
         WHEN TAG IN ('DROP EXTENSION')
   EXECUTE FUNCTION extensions.set_graphql_placeholder();


ALTER EVENT TRIGGER issue_graphql_placeholder OWNER TO supabase_admin;

--
-- TOC entry 3890 (class 3466 OID 16654)
-- Name: issue_pg_cron_access; Type: EVENT TRIGGER; Schema: -; Owner: supabase_admin
--

CREATE EVENT TRIGGER issue_pg_cron_access ON ddl_command_end
         WHEN TAG IN ('CREATE EXTENSION')
   EXECUTE FUNCTION extensions.grant_pg_cron_access();


ALTER EVENT TRIGGER issue_pg_cron_access OWNER TO supabase_admin;

--
-- TOC entry 3884 (class 3466 OID 16573)
-- Name: issue_pg_graphql_access; Type: EVENT TRIGGER; Schema: -; Owner: supabase_admin
--

CREATE EVENT TRIGGER issue_pg_graphql_access ON ddl_command_end
         WHEN TAG IN ('CREATE FUNCTION')
   EXECUTE FUNCTION extensions.grant_pg_graphql_access();


ALTER EVENT TRIGGER issue_pg_graphql_access OWNER TO supabase_admin;

--
-- TOC entry 3891 (class 3466 OID 16657)
-- Name: issue_pg_net_access; Type: EVENT TRIGGER; Schema: -; Owner: supabase_admin
--

CREATE EVENT TRIGGER issue_pg_net_access ON ddl_command_end
         WHEN TAG IN ('CREATE EXTENSION')
   EXECUTE FUNCTION extensions.grant_pg_net_access();


ALTER EVENT TRIGGER issue_pg_net_access OWNER TO supabase_admin;

--
-- TOC entry 3886 (class 3466 OID 16576)
-- Name: pgrst_ddl_watch; Type: EVENT TRIGGER; Schema: -; Owner: supabase_admin
--

CREATE EVENT TRIGGER pgrst_ddl_watch ON ddl_command_end
   EXECUTE FUNCTION extensions.pgrst_ddl_watch();


ALTER EVENT TRIGGER pgrst_ddl_watch OWNER TO supabase_admin;

--
-- TOC entry 3887 (class 3466 OID 16577)
-- Name: pgrst_drop_watch; Type: EVENT TRIGGER; Schema: -; Owner: supabase_admin
--

CREATE EVENT TRIGGER pgrst_drop_watch ON sql_drop
   EXECUTE FUNCTION extensions.pgrst_drop_watch();


ALTER EVENT TRIGGER pgrst_drop_watch OWNER TO supabase_admin;

-- Completed on 2026-04-05 03:06:14 WITA

--
-- PostgreSQL database dump complete
--

\unrestrict jiCGcOqVFrBQC86pMbYXVDRfxpaf8FEdOofl6fpS5CXwyenUUa97UMOLXTHMfBg




