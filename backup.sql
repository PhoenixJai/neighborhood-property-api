--
-- PostgreSQL database dump
--

\restrict ZMvQh0glugCqFbhV38s1l52VJZjhkRWVTlE4JYaUfkmtlKLjQXhQRMJpd929Sfv

-- Dumped from database version 18.4 (Postgres.app)
-- Dumped by pg_dump version 18.4 (Postgres.app)

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

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- Name: neighborhood; Type: TABLE; Schema: public; Owner: jaiden
--

CREATE TABLE public.neighborhood (
    neighborhood_id integer NOT NULL,
    name character varying(100) NOT NULL,
    state character(2) NOT NULL,
    hashoa boolean NOT NULL
);


ALTER TABLE public.neighborhood OWNER TO jaiden;

--
-- Name: property; Type: TABLE; Schema: public; Owner: jaiden
--

CREATE TABLE public.property (
    property_id integer NOT NULL,
    neighborhood_id integer NOT NULL,
    address character varying(100) NOT NULL,
    city character varying(100) NOT NULL,
    state character(2) NOT NULL,
    zipcode character(5) NOT NULL,
    value integer NOT NULL
);


ALTER TABLE public.property OWNER TO jaiden;

--
-- Data for Name: neighborhood; Type: TABLE DATA; Schema: public; Owner: jaiden
--

COPY public.neighborhood (neighborhood_id, name, state, hashoa) FROM stdin;
1	Trolley Square	DE	t
2	Bear Trap Dunes	DE	t
3	Rittenhouse Square	PA	f
4	Chestnut Hill	PA	t
5	Hoboken Heights	NJ	f
6	Cherry Hill Estates	NJ	t
\.


--
-- Data for Name: property; Type: TABLE DATA; Schema: public; Owner: jaiden
--

COPY public.property (property_id, neighborhood_id, address, city, state, zipcode, value) FROM stdin;
1	1	101 Delaware Ave	Wilmington	DE	19806	385000
2	1	103 Delaware Ave	Wilmington	DE	19806	392000
3	1	105 Delaware Ave	Wilmington	DE	19806	410000
4	1	201 Scott St	Wilmington	DE	19806	355000
5	1	203 Scott St	Wilmington	DE	19806	361000
6	1	305 Van Buren St	Wilmington	DE	19806	428000
7	1	307 Van Buren St	Wilmington	DE	19806	415000
8	1	410 Jackson St	Wilmington	DE	19806	372000
9	1	412 Jackson St	Wilmington	DE	19806	380000
10	1	515 Franklin St	Wilmington	DE	19806	399000
11	2	1 Bear Trap Dr	Ocean View	DE	19970	620000
12	2	3 Bear Trap Dr	Ocean View	DE	19970	645000
13	2	5 Bear Trap Dr	Ocean View	DE	19970	599000
14	2	12 Fairway Ct	Ocean View	DE	19970	715000
15	2	14 Fairway Ct	Ocean View	DE	19970	730000
16	2	21 Marsh Island Ln	Ocean View	DE	19970	555000
17	2	23 Marsh Island Ln	Ocean View	DE	19970	568000
18	2	30 Egret Way	Ocean View	DE	19970	675000
19	2	32 Egret Way	Ocean View	DE	19970	689000
20	2	40 Heron Ct	Ocean View	DE	19970	601000
21	3	1810 Spruce St	Philadelphia	PA	19103	890000
22	3	1812 Spruce St	Philadelphia	PA	19103	875000
23	3	2001 Pine St	Philadelphia	PA	19103	920000
24	3	2003 Pine St	Philadelphia	PA	19103	905000
25	3	1720 Locust St	Philadelphia	PA	19103	1050000
26	3	1722 Locust St	Philadelphia	PA	19103	1075000
27	3	2100 Walnut St	Philadelphia	PA	19103	780000
28	3	2102 Walnut St	Philadelphia	PA	19103	799000
29	3	1900 Chestnut St	Philadelphia	PA	19103	845000
30	3	1902 Chestnut St	Philadelphia	PA	19103	860000
31	4	8200 Germantown Ave	Philadelphia	PA	19118	675000
32	4	8202 Germantown Ave	Philadelphia	PA	19118	690000
33	4	15 W Highland Ave	Philadelphia	PA	19118	725000
34	4	17 W Highland Ave	Philadelphia	PA	19118	710000
35	4	22 E Evergreen Ave	Philadelphia	PA	19118	655000
36	4	24 E Evergreen Ave	Philadelphia	PA	19118	640000
37	4	301 W Chestnut Hill Ave	Philadelphia	PA	19118	815000
38	4	303 W Chestnut Hill Ave	Philadelphia	PA	19118	830000
39	4	9 Norwood Ave	Philadelphia	PA	19118	599000
40	4	11 Norwood Ave	Philadelphia	PA	19118	612000
41	5	210 Washington St	Hoboken	NJ	07030	799000
42	5	212 Washington St	Hoboken	NJ	07030	815000
43	5	305 Garden St	Hoboken	NJ	07030	762000
44	5	307 Garden St	Hoboken	NJ	07030	774000
45	5	410 Bloomfield St	Hoboken	NJ	07030	840000
46	5	412 Bloomfield St	Hoboken	NJ	07030	855000
47	5	15 Willow Ave	Hoboken	NJ	07030	725000
48	5	17 Willow Ave	Hoboken	NJ	07030	738000
49	5	520 Park Ave	Hoboken	NJ	07030	880000
50	5	522 Park Ave	Hoboken	NJ	07030	895000
51	6	100 Chapel Ave	Cherry Hill	NJ	08034	450000
52	6	102 Chapel Ave	Cherry Hill	NJ	08034	462000
53	6	210 Kings Hwy	Cherry Hill	NJ	08034	495000
54	6	212 Kings Hwy	Cherry Hill	NJ	08034	480000
55	6	15 Marlton Pike	Cherry Hill	NJ	08034	425000
56	6	17 Marlton Pike	Cherry Hill	NJ	08034	438000
57	6	303 Springdale Rd	Cherry Hill	NJ	08034	512000
58	6	305 Springdale Rd	Cherry Hill	NJ	08034	528000
59	6	8 Evesham Rd	Cherry Hill	NJ	08034	470000
60	6	10 Evesham Rd	Cherry Hill	NJ	08034	485000
\.


--
-- Name: neighborhood neighborhood_pkey; Type: CONSTRAINT; Schema: public; Owner: jaiden
--

ALTER TABLE ONLY public.neighborhood
    ADD CONSTRAINT neighborhood_pkey PRIMARY KEY (neighborhood_id);


--
-- Name: property property_address_city_state_zipcode_key; Type: CONSTRAINT; Schema: public; Owner: jaiden
--

ALTER TABLE ONLY public.property
    ADD CONSTRAINT property_address_city_state_zipcode_key UNIQUE (address, city, state, zipcode);


--
-- Name: property property_pkey; Type: CONSTRAINT; Schema: public; Owner: jaiden
--

ALTER TABLE ONLY public.property
    ADD CONSTRAINT property_pkey PRIMARY KEY (property_id);


--
-- Name: property property_neighborhood_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: jaiden
--

ALTER TABLE ONLY public.property
    ADD CONSTRAINT property_neighborhood_id_fkey FOREIGN KEY (neighborhood_id) REFERENCES public.neighborhood(neighborhood_id);


--
-- PostgreSQL database dump complete
--

\unrestrict ZMvQh0glugCqFbhV38s1l52VJZjhkRWVTlE4JYaUfkmtlKLjQXhQRMJpd929Sfv

