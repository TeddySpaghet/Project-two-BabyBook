--
-- PostgreSQL database dump
--

-- Dumped from database version 13.1
-- Dumped by pg_dump version 13.1

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- Name: SequelizeMeta; Type: TABLE; Schema: public; Owner: theod
--

CREATE TABLE public."SequelizeMeta" (
    name character varying(255) NOT NULL
);


ALTER TABLE public."SequelizeMeta" OWNER TO theod;

--
-- Name: babies; Type: TABLE; Schema: public; Owner: theod
--

CREATE TABLE public.babies (
    id integer NOT NULL,
    name character varying(255),
    birthdate timestamp with time zone,
    img character varying(255),
    "userId" integer,
    "createdAt" timestamp with time zone NOT NULL,
    "updatedAt" timestamp with time zone NOT NULL
);


ALTER TABLE public.babies OWNER TO theod;

--
-- Name: babies_id_seq; Type: SEQUENCE; Schema: public; Owner: theod
--

CREATE SEQUENCE public.babies_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.babies_id_seq OWNER TO theod;

--
-- Name: babies_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: theod
--

ALTER SEQUENCE public.babies_id_seq OWNED BY public.babies.id;


--
-- Name: posts; Type: TABLE; Schema: public; Owner: theod
--

CREATE TABLE public.posts (
    id integer NOT NULL,
    height character varying(255),
    weight character varying(255),
    img character varying(255),
    title character varying(255),
    firsts text,
    favorites text,
    "babyId" integer,
    "createdAt" timestamp with time zone NOT NULL,
    "updatedAt" timestamp with time zone NOT NULL
);


ALTER TABLE public.posts OWNER TO theod;

--
-- Name: posts_id_seq; Type: SEQUENCE; Schema: public; Owner: theod
--

CREATE SEQUENCE public.posts_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.posts_id_seq OWNER TO theod;

--
-- Name: posts_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: theod
--

ALTER SEQUENCE public.posts_id_seq OWNED BY public.posts.id;


--
-- Name: users; Type: TABLE; Schema: public; Owner: theod
--

CREATE TABLE public.users (
    id integer NOT NULL,
    email character varying(255),
    name character varying(255),
    password character varying(255),
    "createdAt" timestamp with time zone NOT NULL,
    "updatedAt" timestamp with time zone NOT NULL
);


ALTER TABLE public.users OWNER TO theod;

--
-- Name: users_id_seq; Type: SEQUENCE; Schema: public; Owner: theod
--

CREATE SEQUENCE public.users_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.users_id_seq OWNER TO theod;

--
-- Name: users_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: theod
--

ALTER SEQUENCE public.users_id_seq OWNED BY public.users.id;


--
-- Name: babies id; Type: DEFAULT; Schema: public; Owner: theod
--

ALTER TABLE ONLY public.babies ALTER COLUMN id SET DEFAULT nextval('public.babies_id_seq'::regclass);


--
-- Name: posts id; Type: DEFAULT; Schema: public; Owner: theod
--

ALTER TABLE ONLY public.posts ALTER COLUMN id SET DEFAULT nextval('public.posts_id_seq'::regclass);


--
-- Name: users id; Type: DEFAULT; Schema: public; Owner: theod
--

ALTER TABLE ONLY public.users ALTER COLUMN id SET DEFAULT nextval('public.users_id_seq'::regclass);


--
-- Data for Name: SequelizeMeta; Type: TABLE DATA; Schema: public; Owner: theod
--

COPY public."SequelizeMeta" (name) FROM stdin;
20201022182723-create-user.js
20201023231510-create-baby.js
20201023231912-create-post.js
\.


--
-- Data for Name: babies; Type: TABLE DATA; Schema: public; Owner: theod
--

COPY public.babies (id, name, birthdate, img, "userId", "createdAt", "updatedAt") FROM stdin;
2	mahtest	2020-12-05 16:00:00-08	https://i.imgur.com/BKRCPji.jpeg	1	2020-12-15 10:55:08.868-08	2020-12-15 10:55:21.411-08
\.


--
-- Data for Name: posts; Type: TABLE DATA; Schema: public; Owner: theod
--

COPY public.posts (id, height, weight, img, title, firsts, favorites, "babyId", "createdAt", "updatedAt") FROM stdin;
\.


--
-- Data for Name: users; Type: TABLE DATA; Schema: public; Owner: theod
--

COPY public.users (id, email, name, password, "createdAt", "updatedAt") FROM stdin;
1	pokeboy@gmail.com	testybaby	$2b$12$MBBLwPauMVv55cDBKn9ie.eHWheVuRgUvOD4hbzOcexctAmxvKVtC	2020-12-14 11:02:21.511-08	2020-12-14 11:02:21.511-08
\.


--
-- Name: babies_id_seq; Type: SEQUENCE SET; Schema: public; Owner: theod
--

SELECT pg_catalog.setval('public.babies_id_seq', 2, true);


--
-- Name: posts_id_seq; Type: SEQUENCE SET; Schema: public; Owner: theod
--

SELECT pg_catalog.setval('public.posts_id_seq', 1, false);


--
-- Name: users_id_seq; Type: SEQUENCE SET; Schema: public; Owner: theod
--

SELECT pg_catalog.setval('public.users_id_seq', 1, true);


--
-- Name: SequelizeMeta SequelizeMeta_pkey; Type: CONSTRAINT; Schema: public; Owner: theod
--

ALTER TABLE ONLY public."SequelizeMeta"
    ADD CONSTRAINT "SequelizeMeta_pkey" PRIMARY KEY (name);


--
-- Name: babies babies_pkey; Type: CONSTRAINT; Schema: public; Owner: theod
--

ALTER TABLE ONLY public.babies
    ADD CONSTRAINT babies_pkey PRIMARY KEY (id);


--
-- Name: posts posts_pkey; Type: CONSTRAINT; Schema: public; Owner: theod
--

ALTER TABLE ONLY public.posts
    ADD CONSTRAINT posts_pkey PRIMARY KEY (id);


--
-- Name: users users_pkey; Type: CONSTRAINT; Schema: public; Owner: theod
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_pkey PRIMARY KEY (id);


--
-- PostgreSQL database dump complete
--

