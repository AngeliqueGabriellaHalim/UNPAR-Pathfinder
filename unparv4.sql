--
-- PostgreSQL database dump
--

\restrict umQzaWXzuxslbbYSdvgfcDAI8IXXznH9EdGmvqSxsXFqmLbbuzCGd3enPEEcdWM

-- Dumped from database version 17.6
-- Dumped by pg_dump version 17.6

-- Started on 2026-07-20 08:24:04

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
-- TOC entry 218 (class 1259 OID 54926)
-- Name: edge; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.edge (
    id integer NOT NULL,
    from_id integer NOT NULL,
    to_id integer NOT NULL,
    accessible integer NOT NULL,
    weight integer NOT NULL
);


ALTER TABLE public.edge OWNER TO postgres;

--
-- TOC entry 219 (class 1259 OID 54941)
-- Name: edge_images; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.edge_images (
    id integer NOT NULL,
    edge_id integer NOT NULL,
    image_url text NOT NULL,
    petunjuk text,
    step_order integer NOT NULL
);


ALTER TABLE public.edge_images OWNER TO postgres;

--
-- TOC entry 217 (class 1259 OID 54890)
-- Name: node; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.node (
    id integer NOT NULL,
    nama text NOT NULL,
    tipe integer NOT NULL,
    x integer,
    y integer,
    is_destination boolean DEFAULT false NOT NULL,
    lantai integer,
    lantai_label text,
    confirmation_image text[]
);


ALTER TABLE public.node OWNER TO postgres;

--
-- TOC entry 4866 (class 0 OID 54926)
-- Dependencies: 218
-- Data for Name: edge; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.edge (id, from_id, to_id, accessible, weight) FROM stdin;
1	1	2	1	36
2	2	3	0	59
3	9	12	0	16
4	12	17	1	31
5	41	42	1	15
6	42	43	1	15
7	43	44	1	15
8	44	45	1	15
9	45	20	1	43
10	12	21	1	10
11	28	22	1	19
12	9	16	1	53
13	16	46	0	58
14	46	29	1	8
15	46	30	1	92
16	46	32	1	58
17	29	30	1	84
18	33	23	1	6
19	48	47	1	15
20	47	34	2	19
21	25	12	1	56
22	25	63	1	56
23	79	80	1	15
24	80	81	1	15
25	81	28	1	53
26	2	4	1	37
27	8	25	1	42
28	8	4	1	64
29	9	15	1	30
30	15	36	1	38
31	36	50	0	43
32	50	37	0	33
33	37	24	0	40
34	2	5	1	75
35	5	10	2	36
36	5	11	0	23
37	11	19	1	24
38	2	6	0	71
39	3	13	0	94
40	13	6	1	57
41	2	7	1	77
42	15	14	1	36
43	3	8	1	67
44	14	6	1	55
45	49	75	1	15
46	75	76	1	15
47	76	77	1	15
48	8	31	1	68
49	8	2	1	92
50	30	33	0	32
51	33	65	1	29
52	52	69	1	20
53	69	53	1	20
54	53	35	1	20
55	33	73	1	8
56	73	55	0	21
57	55	39	0	27
58	39	54	1	8
59	54	74	0	10
60	74	40	0	2
61	40	56	0	10
62	56	35	1	11
63	46	16	0	73
64	16	9	0	53
65	9	3	0	36
66	3	4	1	22
67	47	48	1	15
68	48	49	1	15
69	49	12	1	33
70	12	25	1	56
71	25	8	1	42
72	26	32	1	71
73	29	32	1	62
74	29	34	2	47
75	77	78	1	15
76	38	51	0	31
77	10	38	1	50
78	51	24	0	21
79	51	38	0	57
80	78	20	1	31
81	14	7	0	53
82	9	13	1	55
83	2	8	1	92
84	27	67	1	4
85	57	53	1	20
86	53	69	1	20
87	69	52	1	20
88	52	33	1	29
89	12	72	1	49
90	72	12	1	49
91	72	9	1	42
92	9	72	1	42
93	71	70	1	33
94	11	71	1	7
95	2	1	1	36
96	3	2	0	59
97	12	9	0	16
98	42	41	1	15
99	43	42	1	15
100	44	43	1	15
101	45	44	1	15
102	20	62	1	43
103	21	12	1	10
104	22	28	1	19
105	29	46	1	8
106	30	46	1	92
107	32	46	1	58
108	30	29	1	84
109	23	33	1	6
110	34	60	2	19
111	79	25	1	56
112	80	79	1	15
113	81	80	1	15
114	28	64	1	53
115	4	2	1	37
116	4	8	1	64
117	15	9	1	30
118	36	15	1	38
119	50	36	0	78
120	37	50	0	23
121	24	37	0	25
122	5	2	1	75
123	10	5	2	36
124	11	5	0	23
125	19	11	1	24
126	6	2	0	71
127	13	3	0	44
128	6	13	0	57
129	7	2	1	77
130	14	15	1	36
131	8	3	1	67
132	5	6	0	48
133	6	14	0	55
134	75	49	1	15
135	76	75	1	15
136	77	76	1	15
137	31	8	1	68
138	33	30	0	32
139	35	66	1	20
140	73	33	1	8
141	55	73	0	29
142	39	55	0	27
143	54	39	1	8
144	74	54	0	14
145	40	74	0	2
146	56	40	0	18
147	35	56	1	11
148	3	9	0	36
149	4	3	1	22
150	49	48	1	15
151	12	18	1	33
152	6	5	0	33
153	7	14	0	53
154	24	51	0	21
155	78	77	1	15
156	57	27	1	4
157	53	57	1	20
158	34	29	2	47
159	32	26	1	71
160	32	29	1	62
161	20	59	1	31
162	13	9	1	55
163	38	10	1	50
164	65	52	1	31
165	67	57	1	31
166	62	45	1	53
167	60	47	1	53
168	64	81	1	53
169	66	53	1	31
170	71	11	1	7
171	17	41	1	53
172	70	71	1	33
173	18	49	1	53
174	63	79	1	53
175	59	78	1	53
176	28	61	1	30
177	28	58	1	30
178	39	68	1	29
179	43	28	1	30
180	58	76	1	53
181	61	43	1	53
182	68	69	1	31
183	69	39	1	29
184	76	28	1	30
185	6	70	1	22
186	5	70	2	15
187	10	70	1	13
188	70	6	1	22
189	70	5	2	15
190	70	10	1	13
191	5	7	2	46
192	72	18	1	28
193	6	10	2	33
194	32	34	1	103
195	16	15	2	46
196	52	23	1	6
197	25	17	1	23
198	22	64	1	44
199	6	7	2	59
200	10	6	2	33
201	62	20	1	43
202	60	34	2	19
203	64	28	1	53
204	66	35	1	20
205	18	12	1	33
206	59	20	1	31
207	65	33	1	29
208	63	25	1	56
209	67	27	1	4
210	61	28	1	30
211	68	39	1	29
212	58	28	1	30
213	65	23	1	6
214	141	82	1	20
215	141	83	1	35
216	141	84	1	50
217	141	85	1	65
218	141	93	1	77
219	141	94	1	65
220	141	99	1	62
221	141	100	1	50
222	141	101	1	47
223	141	102	1	35
224	141	103	1	32
225	141	104	1	20
226	143	82	1	60
227	143	83	1	45
228	143	84	1	30
229	143	85	1	15
230	143	93	1	15
231	143	94	1	27
232	143	99	1	30
233	143	100	1	42
234	143	101	1	45
235	143	102	1	57
236	143	103	1	60
237	143	104	1	62
238	15	160	1	15
239	32	90	0	91
240	32	92	0	71
241	75	91	1	115
242	42	91	1	153
243	77	106	1	89
244	44	106	1	127
245	139	106	1	15
246	172	106	1	68
247	135	91	1	41
248	80	91	1	51
249	8	161	1	68
250	125	96	1	47
251	127	96	1	45
252	169	98	1	31
253	168	90	1	60
254	168	92	1	79
255	77	107	1	115
256	44	107	1	153
257	77	108	1	128
258	44	108	1	166
259	139	108	1	54
260	172	108	1	34
261	139	107	1	41
262	172	107	1	51
263	121	109	1	47
264	123	109	1	45
265	5	110	0	15
266	110	5	0	11
267	118	107	1	95
268	118	108	1	109
269	116	91	1	95
270	118	106	1	70
271	78	121	1	15
272	121	141	1	15
273	141	144	1	15
274	144	146	1	15
275	146	148	1	15
276	148	150	1	15
277	150	152	1	15
278	152	154	1	15
279	154	156	1	15
280	45	123	1	15
281	123	143	1	15
282	143	145	1	15
283	145	147	1	15
284	147	149	1	15
285	149	151	1	15
286	151	153	1	15
287	153	155	1	15
288	155	157	1	15
289	131	125	1	15
290	125	175	1	15
291	175	176	1	15
292	176	177	1	15
293	177	178	1	15
294	178	179	1	15
295	179	180	1	15
296	180	181	1	15
297	181	182	1	15
298	129	127	1	15
299	181	183	1	15
300	183	184	1	15
301	184	185	1	15
302	185	186	1	15
303	186	187	1	15
304	187	188	1	15
305	120	121	1	51
306	140	141	1	51
307	122	123	1	51
308	142	143	1	51
309	159	157	1	51
310	124	125	1	51
311	126	127	1	51
312	113	114	0	41
313	114	115	0	41
314	115	116	0	41
315	116	117	0	41
316	117	118	0	41
317	118	119	0	41
318	114	113	0	33
319	115	114	0	33
320	116	115	0	33
321	117	116	0	33
322	118	117	0	33
323	119	118	0	33
324	82	140	1	20
325	83	140	1	35
326	84	140	1	50
327	85	140	1	65
328	93	140	1	77
329	94	140	1	65
330	99	140	1	62
331	100	140	1	50
332	101	140	1	47
333	102	140	1	35
334	103	140	1	32
335	104	140	1	20
336	82	142	1	60
337	83	142	1	45
338	84	142	1	30
339	85	142	1	15
340	93	142	1	15
341	94	142	1	27
342	99	142	1	30
343	100	142	1	42
344	101	142	1	45
345	102	142	1	57
346	103	142	1	60
347	104	142	1	62
348	106	205	1	89
349	106	138	1	15
350	91	134	1	41
351	96	124	1	52
352	96	126	1	50
353	107	205	1	115
354	108	205	1	128
355	108	206	1	166
356	108	138	1	54
357	107	138	1	41
358	109	120	1	47
359	109	122	1	45
360	121	78	1	15
361	141	121	1	15
362	144	141	1	15
363	146	144	1	15
364	148	146	1	15
365	150	148	1	15
366	152	150	1	15
367	154	152	1	15
368	156	154	1	15
369	123	45	1	15
370	143	123	1	15
371	145	143	1	15
372	147	145	1	15
373	149	147	1	15
374	151	149	1	15
375	153	151	1	15
376	155	153	1	15
377	157	155	1	15
378	125	131	1	15
386	127	129	1	15
393	156	105	1	35
394	157	105	1	79
395	105	158	1	35
396	105	159	1	79
397	132	63	1	92
398	160	15	1	15
399	221	220	0	34
400	224	225	0	14
401	11	110	1	23
402	5	112	2	10
403	6	112	0	15
404	2	112	1	65
409	112	2	1	65
410	29	210	0	20
411	223	95	0	31
412	161	95	0	55
413	41	12	1	31
414	7	5	1	46
415	49	72	1	28
416	34	32	1	103
417	15	16	1	46
418	23	65	1	6
419	41	25	1	23
420	81	22	1	44
421	7	6	0	59
422	90	32	0	90
423	92	32	0	71
424	161	8	1	68
425	107	118	1	95
426	108	118	1	109
427	91	116	1	95
428	106	118	1	70
429	63	132	1	92
430	110	11	1	23
431	112	5	2	10
432	112	6	0	15
433	140	82	1	20
434	140	83	1	35
435	140	84	1	50
436	140	85	1	65
437	140	93	1	77
439	140	99	1	62
440	140	100	1	50
441	140	101	1	47
442	140	102	1	35
443	140	103	1	32
444	140	104	1	20
445	142	82	1	60
446	142	83	1	45
447	142	84	1	30
448	142	85	1	15
449	142	93	1	15
450	142	94	1	27
451	142	99	1	30
452	142	100	1	42
453	142	101	1	45
454	142	102	1	57
455	142	103	1	60
456	142	104	1	62
457	165	90	1	60
458	165	92	1	45
459	201	91	1	115
460	202	91	1	153
461	205	106	1	89
462	107	203	1	115
463	138	106	1	15
464	107	204	1	153
465	134	91	1	41
466	124	96	1	47
467	126	96	1	45
468	167	98	1	31
469	205	107	1	115
471	205	108	1	128
473	138	108	1	54
475	138	107	1	41
476	120	109	1	47
477	122	109	1	45
478	158	105	1	35
479	159	105	1	79
480	163	29	1	96
481	17	12	1	31
482	18	72	1	28
483	17	25	1	23
484	64	22	1	44
485	163	30	1	44
486	95	161	0	55
487	202	42	1	53
488	204	44	1	53
489	201	75	1	53
490	203	77	1	53
491	206	80	1	53
492	132	133	1	53
493	134	135	1	53
494	136	137	1	53
495	138	139	1	53
496	162	163	1	31
497	164	165	1	31
498	166	167	1	31
499	228	171	1	31
500	205	172	1	53
501	222	212	1	31
502	239	213	1	31
503	240	214	1	31
504	227	215	1	31
505	241	221	1	31
506	229	223	1	53
507	230	231	1	31
508	232	233	1	31
509	203	106	1	89
510	204	106	1	127
511	206	91	1	51
512	203	107	1	115
513	204	107	1	153
514	203	108	1	128
515	204	108	1	166
516	164	90	1	60
517	164	92	1	45
518	166	98	1	31
519	162	29	1	96
520	162	30	1	44
521	97	226	1	14
522	111	226	1	34
523	30	162	0	44
524	29	162	0	44
525	226	97	0	14
526	226	111	0	34
527	225	226	1	14
528	226	225	1	11
529	225	224	1	11
530	31	224	0	20
531	224	31	0	20
532	133	135	1	15
533	135	137	1	15
534	137	139	1	15
535	139	131	1	15
536	131	139	1	15
537	139	137	1	15
538	137	135	1	15
539	135	133	1	15
540	81	172	1	15
541	172	129	1	15
542	172	81	1	15
543	129	172	1	15
544	207	98	2	29
545	98	207	2	29
546	169	168	0	23
547	168	169	0	19
548	168	170	0	23
549	170	168	0	19
550	32	164	0	57
551	164	32	0	32
552	163	165	1	20
553	165	163	1	20
554	163	167	1	20
555	167	165	1	20
557	21	115	1	23
558	12	115	1	23
559	18	115	1	18
560	49	115	1	18
561	20	119	1	23
562	119	20	1	23
563	17	115	1	72
564	41	115	1	72
565	213	214	1	15
566	214	212	1	15
567	212	221	1	15
568	221	215	1	15
569	214	213	1	15
570	212	214	1	15
571	221	212	1	15
572	215	221	1	15
573	160	222	1	24
574	222	160	1	24
575	212	160	1	24
576	210	209	0	23
577	211	210	0	23
578	209	220	0	23
579	220	208	0	23
580	209	210	0	17
581	210	211	0	17
582	220	209	0	17
583	208	220	0	17
584	209	222	1	2
585	212	209	1	2
586	222	209	1	2
587	215	88	1	33
588	227	88	1	33
589	88	227	1	33
590	211	87	1	18
591	213	87	1	19
592	239	87	1	19
593	87	239	1	19
594	87	211	1	18
595	208	88	1	32
596	88	208	1	32
597	210	29	0	20
598	229	95	0	31
599	95	229	0	31
600	219	86	1	13
601	219	238	0	17
602	238	237	0	17
603	237	236	0	17
604	236	6	0	14
605	6	236	0	14
606	236	237	0	22
607	237	238	0	22
608	238	219	0	22
609	86	219	1	13
610	228	6	1	16
611	171	6	1	16
612	6	228	1	16
613	232	219	1	34
614	233	219	1	34
615	219	232	0	34
379	13	112	0	63
380	98	166	1	31
381	117	28	1	20
382	207	74	0	10
383	216	14	1	10
384	14	216	1	10
387	28	117	1	20
405	13	89	1	5
406	89	13	1	5
407	130	131	1	53
408	128	129	1	53
385	74	207	0	10
\.


--
-- TOC entry 4867 (class 0 OID 54941)
-- Dependencies: 219
-- Data for Name: edge_images; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.edge_images (id, edge_id, image_url, petunjuk, step_order) FROM stdin;
1	1	/uploads/1_1_2_1.png	Jalan lurus hingga perempatan	1
2	2	/uploads/2_2_3_1.png	Jalan ke arah gedung rektorat	1
3	2	/uploads/2_2_3_2.png	Belok kiri menuju Wind Tunnel	2
315	2	/uploads/2_2_3_3.png	Jalan menuju Wind Tunnel	3
4	3	/uploads/3_9_12_1.png	Jalan lurus menuju PPAG 2 Lantai 1	1
5	4	/uploads/4_12_17_1.png	Jalan ke arah Lift B	1
6	5	/uploads/5_41_42_1.png	Naik ke Lantai 1A	1
7	6	/uploads/6_42_43_1.png	Naik ke Lantai 2	1
8	7	/uploads/7_43_44_1.png	Naik ke Lantai 2A	1
9	8	/uploads/8_44_45_1.png	Naik ke Lantai 3	1
200	9	uploads/9_45_20_1.png	Jalan menuju PPAG 2 Lantai 3	1
11	10	/uploads/10_12_21_1.png	Jalan menuju ruang Multifungsi PPAG 2	1
201	11	uploads/11_28_22_1.png	Jalan ke arah Auditorium Arntz-Geise	1
13	12	/uploads/12_9_16_1.png	Jalan menuju Tangga Aborsi Atas	1
14	13	/uploads/13_16_46_1.png	Turun Tangga Aborsi	1
15	14	/uploads/14_46_29_1.png	Belok kiri ke arah Pintu Masuk Utama Gedung 3	1
16	15	/uploads/15_46_30_1.png	Jalan lurus kemudian belok kiri ke arah Pintu Masuk Utama Gedung 9	1
254	15	uploads/15_46_30_2.png	Jalan menuju Gedung 9	2
17	16	/uploads/16_46_32_1.png	Jalan ke arah Pintu Masuk Utama Gedung 10	1
18	17	/uploads/17_29_30_1.png	Jalan lurus kemudian belok kiri ke arah Pintu Masuk Utama Gedung 9	1
19	17	/uploads/17_29_30_2.png	Jalan menuju Pintu Masuk Utama Gedung 9	2
20	18	/uploads/18_33_23_1.png	Jalan menuju Perpustakaan	1
21	19	/uploads/19_48_47_1.png	Turun ke Lantai B2	1
22	20	/uploads/20_47_34_1.png	Jalan menuju Palang Masuk Parkir B2 PPAG 2	1
23	21	/uploads/21_25_12_1.png	Jalan lurus kemudian belok kanan ke arah PPAG 2 Lantai 1	1
261	21	uploads/21_25_12_2.png	Jalan menuju PPAG 2 Lantai 1	2
202	22	uploads/22_25_63_1.png	Jalan menuju Lift D	1
203	22	uploads/22_25_63_2.png	Jalan menuju Lift D	2
25	23	/uploads/23_79_80_1.png	Naik ke Lantai 1A	1
26	24	/uploads/24_80_81_1.png	Naik ke Lantai 2	1
205	25	uploads/25_81_28_1.png	Jalan lurus melewati pintu	1
206	25	uploads/25_81_28_2.png	Jalan lurus kemudian belok kiri	2
207	25	uploads/25_81_28_3.png	Jalan lurus	3
208	25	uploads/25_81_28_4.png	Jalan menuju PPAG 2 Lantai 2	4
28	26	/uploads/26_2_4_1.png	Jalan ke arah Lobby Rektorat	1
288	26	uploads/26_2_4_2.png	Jalan menuju Lobby Rektorat	2
29	27	/uploads/27_8_25_1.png	Jalan menuju Patung Arntz-Geise	1
30	28	/uploads/28_8_4_1.png	Jalan ke arah Lobby Rektorat	1
256	28	uploads/28_8_4_2.png	Jalan menuju Wind Tunnel	2
31	29	/uploads/29_9_15_1.png	Jalan menuju Selasar CIMB Niaga	1
32	30	/uploads/30_15_36_1.png	Jalan lurus kemudian belok kanan menuju tangga	1
259	30	uploads/30_15_36_2.png	Belok menuju tangga	2
33	31	/uploads/31_36_50_1.png	Turun tangga	1
34	32	/uploads/32_50_37_1.png	Jalan menuju Area Ruang Himpunan	1
204	33	uploads/33_37_24_1.png	Jalan menuju kantin	1
36	34	/uploads/34_2_5_1.png	Jalan ke arah Pohon Hukum	1
258	34	uploads/34_2_5_2.png	Jalan menuju Pohon Hukum	2
257	34	uploads/34_2_5_3.png	Jalan menuju Pohon Hukum	3
37	35	/uploads/35_5_10_1.png	Jalan menuju Sekre UKM	1
38	36	/uploads/36_5_11_1.png	Jalan menuju Gedung Ditmawa	1
39	37	/uploads/37_11_19_1.png	Jalan menuju BRI Works	1
40	38	/uploads/38_2_6_1.png	Jalan lurus kemudian belok kanan menuju Gedung Hukum	1
260	38	uploads/38_2_6_2.png	Jalan menuju Gedung Hukum	2
41	39	/uploads/39_3_13_1.png	Jalan menuju tangga	1
264	39	uploads/39_3_13_2.png	Turun tangga kemudian belok kiri	2
269	39	uploads/39_3_13_3.png	Jalan menuju Selasar Belakang Rektorat	3
42	40	/uploads/40_13_6_1.png	Jalan menuju Front Office Gedung Hukum	1
268	40	uploads/40_13_6_2.png	Jalan menuju Front Office Gedung Hukum	2
43	41	/uploads/41_2_7_1.png	Jalan lurus kemudian belok kiri ke arah lorong Gedung ASP	1
44	41	/uploads/41_2_7_2.png	Masuk ke lorong Gedung ASP	2
45	41	/uploads/41_2_7_3.png	Masuk ke Gedung ASP	3
46	42	/uploads/42_15_14_1.png	Jalan lurus	1
270	42	uploads/42_15_14_2.png	Belok kiri menuju Selasar HMPSIH	2
271	42	uploads/42_15_14_3.png	Jalan menuju Selasar HMPSIH	3
47	43	/uploads/43_3_8_1.png	Jalan lurus kemudian belok kiri menuju perempatan	1
272	43	uploads/43_3_8_2.png	Jalan menuju perempatan	2
209	44	/uploads/44_14_6_1.png	Jalan lurus kemudian belok kanan	1
210	44	uploads/44_14_6_2.png	Jalan menuju Front Office Gedung Hukum	2
49	45	/uploads/45_49_75_1.png	Naik ke Lantai 1A	1
50	46	/uploads/46_75_76_1.png	Naik ke Lantai 2	1
51	47	/uploads/47_76_77_1.png	Naik ke Lantai 2A	1
52	48	/uploads/48_8_31_1.png	Jalan menuju Gedung 8	1
53	49	/uploads/49_8_2_1.png	Jalan menuju perempatan	1
273	49	uploads/49_8_2_2.png	Jalan menuju perempatan	2
54	50	/uploads/50_30_33_1.png	Jalan menuju tangga	1
55	50	/uploads/50_30_33_2.png	Turun tangga	2
56	51	/uploads/51_33_65_1.png	Jalan menuju Lift	1
57	52	/uploads/52_52_69_1.png	Turun ke Lantai 1	1
58	53	/uploads/53_69_53_1.png	Turun ke Lantai SB	1
59	54	/uploads/54_53_35_1.png	Jalan menuju Laboratorium Komputasi Gedung 9	1
60	55	/uploads/55_33_73_1.png	Jalan lurus kemudian belok kanan ke arah tangga	1
61	56	/uploads/56_73_55_1.png	Turun tangga ke Lantai 1	1
62	57	/uploads/57_55_39_1.png	Jalan menuju Gedung 9 Lantai 1	1
63	58	/uploads/58_39_54_1.png	Jalan menuju tangga	1
64	59	/uploads/59_54_74_1.png	Turun tangga	1
65	60	/uploads/60_74_40_1.png	Belok kiri menuju tangga	1
66	61	/uploads/61_40_56_1.png	Turun tangga	1
67	62	/uploads/62_56_35_1.png	Jalan menuju Laboratorium Komputasi Gedung 9	1
68	63	/uploads/63_46_16_1.png	Naik Tangga Aborsi	1
69	64	/uploads/64_16_9_1.png	Jalan menuju Selasar PPAG	1
70	65	/uploads/65_9_3_1.png	Jalan menuju Wind Tunnel	1
71	66	/uploads/66_3_4_1.png	Jalan menuju Lobby Gedung Rektorat	1
72	67	/uploads/67_47_48_1.png	Naik ke Lantai B1	1
73	68	/uploads/68_48_49_1.png	Naik ke Lantai 1	1
74	69	/uploads/69_49_12_1.png	Jalan menuju PPAG 2 Lantai 1	1
75	70	/uploads/70_12_25_1.png	Jalan lurus kemudian belok kiri	1
263	70	uploads/70_12_25_2.png	Jalan lurus hingga Patung Arntz-Geise berada di sebelah kiri Anda	2
76	71	/uploads/71_25_8_1.png	Jalan menuju perempatan	1
211	72	uploads/72_26_32_1.png	Jalan ke arah Pintu Masuk Utama Gedung 10	1
78	73	/uploads/73_29_32_1.png	Jalan ke arah Pintu Masuk Utama Gedung 10	1
212	74	uploads/74_29_34_1.png	Jalan lurus kemudian belok kanan	1
213	74	uploads/74_29_34_2.png	Jalan lurus menuju Palang Masuk Parkir B2 PPAG 2	2
80	75	/uploads/75_77_78_1.png	Naik ke Lantai 3	1
214	76	uploads/76_38_51_1.png	Turun tangga	1
215	78	uploads/78_51_24_1.png	Jalan menuju area kantin	1
216	79	uploads/79_51_38_1.png	Naik tangga	1
217	80	/uploads/80_78_20_1.png	Jalan menuju PPAG 2 Lantai 3	1
218	81	uploads/81_14_7_1.png	Jalan lurus kemudian jalan menuju tangga di sebelah kanan	1
219	81	uploads/81_14_7_2.png	Naik tangga, jalan lurus sedikit kemudian belok kanan	2
220	81	uploads/81_14_7_3.png	Jalan lurus kemudian belok kiri	3
221	81	uploads/81_14_7_4.png	Jalan menuju lorong Gedung ASP	4
222	81	uploads/81_14_7_5.png	Jalan lurus kemudian belok kiri	5
223	81	uploads/81_14_7_6.png	Jalan menuju Gedung ASP	6
87	82	/uploads/82_9_13_1.png	Jalan lurus kemudian belok kanan menuju Selasar Belakang Rektorat	1
265	82	uploads/82_9_13_2.png	Jalan menuju Selasar Belakang Rektorat	2
88	83	/uploads/83_2_8_1.png	Jalan lurus menuju perempatan	1
266	83	uploads/83_2_8_2.png	Jalan terus menuju perempatan	2
89	84	/uploads/84_27_67_1.png	Masuk ke dalam lift	1
90	85	/uploads/85_57_53_1.png	Naik ke Lantai SB	1
91	86	/uploads/86_53_69_1.png	Naik ke Lantai 1	1
92	87	/uploads/87_69_52_1.png	Naik ke Lantai 2	1
93	88	/uploads/88_52_33_1.png	Jalan menuju Gedung 9 Lantai 2	1
94	89	/uploads/89_12_72_1.png	Jalan lurus kemudian belok kiri menuju ramp	1
267	89	uploads/89_12_72_2.png	Jalan menuju ramp	2
95	90	/uploads/90_72_12_1.png	Jalan lurus kemudian belok kanan	1
96	90	/uploads/90_72_12_2.png	Jalan menuju PPAG 2 Lantai 1	2
97	91	/uploads/91_72_9_1.png	Belok kiri menuju Selasar PPAG	1
98	91	/uploads/91_72_9_2.png	Jalan menuju Selasar PPAG	2
99	92	/uploads/92_9_72_1.png	Belok menuju ramp	1
316	92	/uploads/92_9_72_1.png	Jalan menuju Ramp	2
100	93	/uploads/93_71_70_1.png	Gunakan ramp	1
101	94	/uploads/94_11_71_1.png	Jalan lurus kemudian belok kiri menuju ramp 2	1
102	95	/uploads/95_2_1_1.png	Jalan menuju Gate 1	1
103	96	/uploads/96_3_2_1.png	Jalan lurus kemudian belok kanan menuju Lobby Gedung Rektorat	1
104	97	/uploads/97_12_9_1.png	Jalan menuju Selasar PPAG	1
105	98	/uploads/98_42_41_1.png	Turun ke Lantai 1	1
106	99	/uploads/99_43_42_1.png	Turun ke Lantai 1A	1
107	100	/uploads/100_44_43_1.png	Turun ke Lantai 2	1
108	101	/uploads/101_45_44_1.png	Turun ke Lantai 2A	1
109	102	/uploads/102.png	Jalan menuju lift	1
110	103	/uploads/103_21_12_1.png	Jalan menuju PPAG 2 Lantai 1	1
224	104	uploads/104_22_28_1.png	Jalan menuju PPAG 2 Lantai 2	1
112	105	/uploads/105_22_28_1.png	Belok ke arah tangga	1
113	106	/uploads/106_30_46_1.png	Jalan mengikuti tanda panah	1
274	106	uploads/106_30_46_2.png	Jalan terus menuju tangga	2
114	107	/uploads/107_32_46_1.png	Jalan menuju Tangga Aborsi	1
115	108	/uploads/108_30_29_1.png	Jalan lurus kemudian belok kanan	1
252	108	uploads/108_30_29_2.png	Jalan lurus dan Gedung 3 akan ada di sebelah kanan Anda	2
255	108	uploads/108_30_29_3.png	Jalan menuju Gedung 3	3
225	109	uploads/109_23_33_1.png	Jalan menuju Gedung 9 Lantai 2	1
117	110	/uploads/110_34_60_1.png	Belok kiri	1
118	110	/uploads/110_34_60_2.png	Jalan menuju lift	2
119	111	/uploads/111_79_25_1.png	Jalan lurus kemudian belok kiri menuju Patung Arntz-Geise	1
120	112	/uploads/112_80_79_1.png	Turun ke Lantai 1	1
121	113	/uploads/113_81_80_1.png	Turun ke Lantai 1A	1
226	114	uploads/114_28_64_1.png	Jalan lurus kemudian belok kanan	1
227	114	uploads/114_28_64_2.png	Jalan lurus hingga melewati pintu	2
228	114	uploads/114_28_64_3.png	Jalan menuju lift D	3
123	115	/uploads/115_4_2_1.png	Jalan lurus kemudian belok kanan menuju perempatan	1
124	116	/uploads/116_4_8_1.png	Jalan menuju perempatan	1
275	116	uploads/116_4_8_2.png	Jalan terus menuju perempatan	2
229	117	uploads/117_15_9_1.png	Jalan lurus kemudian belok kanan menuju Selasar PPAG	1
276	117	uploads/117_15_9_2.png	Jalan terus menuju Selasar PPAG	2
230	118	uploads/118_36_15_1.png	Jalan menuju Selasar CIMB Niaga	1
127	119	/uploads/119_50_36_1.png	Naik tangga	1
128	120	/uploads/120_37_50_1.png	Jalan lurus kemudian belok kanan menuju tangga	1
231	121	uploads/121_24_37_1.png	Jalan menuju Area Ruang Himpunan	1
130	122	/uploads/122_5_2_1.png	Jalan lurus menuju perempatan	1
131	123	/uploads/123_10_5_1.png	Jalan lurus menuju Pohon Hukum	1
132	124	/uploads/124_11_5_1.png	Jalan lurus menuju Pohon Hukum	1
133	125	/uploads/125_19_11_1.png	Jalan lurus menuju Gedung Ditmawa	1
134	126	/uploads/126_6_2_1.png	Jalan lurus sedikit kemudian belok kanan	1
277	126	uploads/126_6_2_2.png	Jalan lurus kemudian belok kiri	2
278	126	uploads/126_6_2_3.png	Jalan terus menuju perempatan	3
135	127	/uploads/127_13_3_1.png	Jalan lurus	1
287	127	uploads/127_13_3_2.png	Jalan terus kemudian belok kanan menuju Wind Tunnel	2
136	128	/uploads/128_6_13_1.png	Jalan lurus menuju Selasar Belakang Rektorat	1
137	129	/uploads/129_7_2_1.png	Jalan lurus kemudian belok kanan menuju perempatan	1
279	129	uploads/129_7_2_2.png	Jalan terus menuju perempatan	2
138	130	/uploads/130_14_15_1.png	Jalan lurus kemudian belok kanan menuju Selasar CIMB Niaga	1
280	130	uploads/130_14_15_2.png	Jalan terus menuju Selasar CIMB NIAGA	2
139	131	/uploads/131_8_3_1.png	Jalan lurus kemudian belok kanan menuju Wind Tunnel	1
281	131	uploads/131_8_3_2.png	Jalan terus menuju Wind Tunnel	2
140	132	/uploads/132_5_6_1.png	Jalan lurus kemudian belok kanan	1
282	132	uploads/132_5_6_2.png	Jalan hingga Lobby Gedung Hukum berada di sebelah kiri Anda	2
283	132	uploads/132_5_6_3.png	Jalan menuju Lobby Gedung Hukum	3
141	133	/uploads/133_6_14_1.png	Jalan lurus kemudian belok kiri menuju Selasar HMPSIH	1
142	134	/uploads/134_75_49_1.png	Turun ke lantai 1	1
143	135	/uploads/135_76_75_1.png	Turun ke lantai 1A	1
144	136	/uploads/136_77_76_1.png	Turun ke lantai 2	1
145	137	/uploads/137_8_31_1.png	Jalan menuju perempatan	1
146	138	/uploads/138_33_30_1.png	Jalan lurus dan naik tangga	1
147	139	/uploads/139_35_66_1.png	Jalan menuju lift	1
232	140	uploads/140_73_33_1.png	Jalan menuju Gedung 9 Lantai 2	1
149	141	/uploads/141_55_73_1.png	Naik tangga	1
150	142	/uploads/142_39_55_1.png	Jalan lurus kemudian belok kanan ke arah tangga	1
151	143	/uploads/143_54_39_1.png	Jalan menuju Gedung 9 Lantai 1	1
152	144	/uploads/144_74_54_1.png	Naik tangga	1
153	145	/uploads/145_40_74_1.png	Jalan menuju tangga	1
154	146	/uploads/146_56_40_1.png	Naik tangga	1
155	147	/uploads/147_35_56_1.png	Jalan menuju tangga	1
156	148	/uploads/148_3_9_1.png	Jalan menuju Selasar PPAG	1
253	148	uploads/148_3_9_2.png	Jalan lurus hingga Selasar PPAG	2
157	149	/uploads/149_4_3_1.png	Jalan menuju Wind Tunnel	1
158	150	/uploads/150_49_48_1.png	Turun ke Lantai B1	1
159	151	/uploads/151_12_18_1.png	Jalan menuju Lift A	1
160	152	/uploads/152_6_5_1.png	Jalan lurus kemudian belok kiri	1
284	152	uploads/152_6_5_2.png	Jalan menuju Pohon Hukum	2
163	155	/uploads/155_78_77_1.png	Turun ke Lantai 2A	1
164	156	/uploads/156_57_27_1.png	Jalan menuju Area Lift Lantai B1	1
165	157	/uploads/157_53_57_1.png	Turun ke Lantai B1	1
166	158	/uploads/158_34_29_1.png	Jalan lurus kemudian belok kiri	1
167	158	/uploads/158_34_29_2.png	Jalan menuju Pintu Masuk Utama Gedung 3	2
168	159	/uploads/159_32_36_1.png	Jalan lurus menuju Gate 3	1
169	160	/uploads/160_32_29_1.png	Jalan menuju Pintu Masuk Utama Gedung 3	1
171	162	/uploads/162_13_9_1.png	Jalan lurus terus	1
285	162	uploads/162_13_9_2.png	Belok kiri menuju Selasar PPAG	2
286	162	uploads/162_13_9_3.png	Jalan menuju Selasar PPAG	3
242	163	uploads/163_38_10_1.png	Jalan lurus menuju Sekre UKM	1
173	164	/uploads/164_65_52_1.png	Masuk ke dalam lift	1
174	165	/uploads/165_67_57_1.png	Masuk ke dalam lift	1
175	166	/uploads/166_62_45_1.png	Masuk ke dalam lift	1
176	167	/uploads/167_60_47_1.png	Masuk ke dalam lift	2
177	168	/uploads/168_64_81_1.png	Masuk ke dalam lift	1
178	169	/uploads/169_66_53_1.png	Masuk ke dalam lift	1
179	170	/uploads/170_70_71_1.png	Naik tangga menuju Kantor Ditmawa	1
180	171	/uploads/171_17_41_1.png	Masuk ke dalam lift	1
181	172	/uploads/172_70_71_1.png	Gunakan ramp untuk naik	1
182	173	/uploads/173_18_49_1.png	Masuk ke dalam lift	1
183	174	/uploads/174_63_81_1.png	Masuk ke dalam lift	2
184	175	/uploads/175_59_78_1.png	Masuk ke dalam lift	1
185	176	/uploads/176_28_61_1.png	Jalan menuju lift	1
186	177	/uploads/177_28_58_1.png	Jalan menuju lift	1
187	178	/uploads/178_39_68_1.png	Jalan menuju lift	1
243	179	uploads/179_43_28_1.png	Jalan menuju PPAG 2 Lantai 2	1
189	180	/uploads/180_58_76_1.png	Masuk ke dalam lift	1
190	181	/uploads/181_61_43_1.png	Masuk ke dalam lift	1
191	182	/uploads/182_68_69_1.png	Masuk ke dalam lift	1
244	183	uploads/183_69_39_1.png	Jalan menuju Gedung 9 Lantai 1	1
245	184	uploads/184_76_28_1.png	Jalan menuju PPAG 2 Lantai 2	1
246	185	uploads/185_6_70_1.png	Jalan lurus kemudian belok kiri menuju ramp	1
195	186	/uploads/186_70_15_1.png	Jalan lurus kemudian belok kiri menuju ramp	1
196	187	/uploads/187_10_70_1.png	Jalan menuju ramp	1
247	188	uploads/188_70_6_1.png	Belok kanan kemudian jalan lurus menuju Front Office Gedung Hukum	1
248	189	uploads/189_70_5_1.png	Jalan lurus kemudian belok kanan	1
249	189	uploads/189_70_5_2.png	Jalan menuju Pohon Hukum	2
250	190	uploads/190_70_10_1.png	Jalan lurus kemudian belok kiri	1
251	190	uploads/190_70_10_2.png	Jalan lurus menuju Sekre UKM	2
289	191	uploads/191_5_7_1.png	Jalan lurus kemudian belok kanan menuju lorong ASP	1
290	191	uploads/191_5_7_2.png	Jalan menuju lorong ASP	2
291	191	uploads/191_5_7_3.png	Jalan menuju Gedung ASP	3
292	192	uploads/192_72_18_1.png	Jalan lurus kemudian belok kiri menuju lift A	1
293	192	uploads/192_72_18_2.png	Jalan menuju Lift A	2
294	193	uploads/193_6_10_1.png	Jalan lurus kemudian belok kanan menuju Sekre UKM	1
295	193	uploads/193_6_10_2.png	Jalan menuju Sekre UKM	2
296	194	uploads/194_32_34_1.png	Jalan lurus kemudian belok kiri	1
297	194	uploads/194_32_34_2.png	Jalan lurus kemudian belok kanan	2
298	194	uploads/194_32_34_3.png	Jalan menuju palang	3
299	195	uploads/195_16_15_1.png	Jalan lurus menuju Selasar CIMB NIAGA	1
300	196	uploads/196_52_23_1.png	Jalan lurus menuju Perpustakaan	1
301	197	uploads/197_25_17_1.png	Jalan lurus	1
302	197	uploads/197_25_17_2.png	Jalan menuju Lift B	2
303	198	uploads/198_22_64_1.png	Jalan lurus kemudian belok kanan	1
304	198	uploads/198_22_64_2.png	Jalan lurus	2
305	198	uploads/198_22_64_3.png	Jalan lurus terus menuju Lift	3
306	198	uploads/198_22_64_4.png	Jalan menuju Lift D	4
307	199	uploads/199_6_7_1.png	Jalan lurus kemudian belok kanan	1
308	199	uploads/199_6_7_2.png	Jalan lurus kemudian belok kiri	2
309	199	uploads/199_6_7_3.png	Jalan menuju lorong ASP	3
310	199	uploads/199_6_7_4.png	Jalan memasuki lorong ASP	4
311	199	/uploads/199_6_7_5.png	Jalan menuju Gedung ASP	5
312	200	uploads/200_10_6_1.png	Jalan lurus kemudian belok kiri	1
313	200	uploads/200_10_6_2.png	Jalan lurus kemudian belok kiri	2
314	200	uploads/200_10_6_3.png	Jalan menuju Front Office Gedung Hukum	3
317	201	uploads/9_45_20_1.png	Jalan menuju PPAG 2 Lantai 3	1
318	202	uploads/20_47_34_1.png	Jalan menuju Palang Masuk Parkir B2 PPAG 2	1
319	203	uploads/25_81_28_1.png	Jalan lurus melewati pintu	1
320	203	uploads/25_81_28_2.png	Jalan lurus kemudian belok kiri	2
321	203	uploads/25_81_28_3.png	Jalan lurus	3
322	203	uploads/25_81_28_4.png	Jalan menuju PPAG 2 Lantai 2	4
323	204	uploads/54_53_35_1.png	Jalan menuju Laboratorium Komputasi Gedung 9	1
324	205	uploads/69_49_12_1.png	Jalan menuju PPAG 2 Lantai 1	1
325	206	uploads/80_78_20_1.png	Jalan menuju PPAG 2 Lantai 3	1
326	207	uploads/88_52_33_1.png	Jalan menuju Gedung 9 Lantai 2	1
327	208	uploads/111_79_25_1.png	Jalan lurus kemudian belok kiri menuju Patung Arntz-Geise	1
328	209	uploads/156_57_27_1.png	Jalan menuju Area Lift Lantai B1	1
329	210	uploads/179_43_28_1.png	Jalan menuju PPAG 2 Lantai 2	1
330	211	uploads/183_69_39_1.png	Jalan menuju Gedung 9 Lantai 1	1
331	212	uploads/184_76_28_1.png	Jalan menuju PPAG 2 Lantai 2	1
332	213	uploads/196_52_23_1.png	Jalan lurus menuju Perpustakaan	1
333	615	/uploads/615.png	Turun tangga menuju lift	1
334	613	/uploads/613_614.png	Naik tangga	1
335	614	/uploads/613_614.png	Naik tangga	1
336	612	/uploads/612.png	Jalan kemudian belok kiri menuju lift	1
337	610	/uploads/610_611.png	Jalan menuju pintu	1
338	611	/uploads/610_611.png	Jalan menuju pintu	1
340	606	/uploads/606_608.png	Naik tangga ke lantai 2	1
341	607	/uploads/606_608.png	Naik tangga ke lantai 3	1
342	608	/uploads/606_608.png	Naik tangga ke lantai 4	1
343	605	/uploads/605.png	Jalan lurus kemudian belok kanan menuju tangga	1
344	604	/uploads/604.png	Jalan lurus menuju pintu	1
345	602	/uploads/602_603.png	Turun menuju lantai 2	1
346	603	/uploads/602_603.png	Turun menuju lantai 1	1
347	601	/uploads/601.png	Turun menuju lantai 3	1
348	600	/uploads/600.png	Lurus kemudian belok kiri	1
349	599	/uploads/599.png	Jalan menuju lift D	1
350	598	/uploads/598.png	Jalan menuju Geo Lab	1
351	597	/uploads/597.png	Belok kanan kemudian jalan menuju Pintu	1
352	596	/uploads/596.png	Belok kanan menuju lift	1
353	596	/uploads/596_2.png	Jalan lurus kemudian belok kiri menuju tangga	2
354	595	/uploads/595.png	Jalan lurus kemudian belok kiri	1
355	594	/uploads/594.png	Jalan lurus kemudian belok kiri menuju tangga	1
356	593	/uploads/593.png	Jalan lurus menuju lift	1
357	592	/uploads/590_592.png	Jalan lurus kemudian belok kanan menuju pintu ruang ADVIS	1
358	591	/uploads/590_592.png	Jalan lurus kemudian belok kanan menuju pintu ruang ADVIS	1
359	590	/uploads/590_592.png	Jalan lurus kemudian belok kanan menuju pintu ruang ADVIS	1
360	589	/uploads/589.png	Jalan lurus kemudian belok kanan menuju lift	1
361	589	/uploads/589_2.png	Jalan lurus menuju lift	2
362	587	/uploads/587_588.png	Jalan lurus kemudian belok kiri menuju Ruang Veritas	1
363	588	/uploads/587_588.png	Jalan lurus kemudian belok kiri menuju Ruang Veritas	1
364	585	/uploads/585_586.png	Jalan menuju tangga	1
365	586	/uploads/585_586.png	Jalan menuju tangga	1
366	584	/uploads/584.png	Belok kiri menuju lift	1
367	584	/uploads/584_2.png	Jalan menuju lift	2
368	580	/uploads/580_583.png	Turun tangga menuju lantai 2	1
369	581	/uploads/580_583.png	Turun tangga menuju lantai 1	1
370	582	/uploads/580_583.png	Turun tangga menuju lantai 3	1
371	583	/uploads/580_583.png	Turun tangga menuju lantai 4	1
372	576	/uploads/576_579.png	Naik tangga menuju lantai 3	1
373	577	/uploads/576_579.png	Naik tangga menuju lantai 2	1
374	578	/uploads/576_579.png	Naik tangga menuju lantai 4	1
375	579	/uploads/576_579.png	Naik tangga menuju lantai 5	1
376	574	/uploads/574_575.png	Jalan lurus menuju jembatan FISIP	1
377	575	/uploads/574_575.png	Jalan lurus menuju jembatan FISIP	1
378	573	/uploads/573.png	Jalan lurus menuju pintu gedung 3	1
379	573	/uploads/573_2.png	Belok kanan menuju lift	2
380	565	/uploads/565_572.png	Naik lift menuju lantai 	1
381	566	/uploads/565_572.png	Naik lift menuju lantai 	1
382	567	/uploads/565_572.png	Naik lift menuju lantai 	1
383	568	/uploads/565_572.png	Naik lift menuju lantai 	1
384	569	/uploads/565_572.png	Naik lift menuju lantai 	1
385	570	/uploads/565_572.png	Naik lift menuju lantai 	1
386	571	/uploads/565_572.png	Naik lift menuju lantai 	1
387	572	/uploads/565_572.png	Naik lift menuju lantai 	1
388	563	/uploads/563_564.png	Jalan lurus kemudian belok kiri menuju tangga	1
389	564	/uploads/563_564.png	Jalan lurus kemudian belok kiri menuju tangga	1
390	562	/uploads/562.png	Jalan menuju PPAG 2 Lantai 3	1
391	561	/uploads/561.png	Jalan lurus kemudian belok kiri menuju tangga	1
392	215	/uploads/215.png	Keluar lift kemudian jalan sesuai arah panah	1
393	215	/uploads/214_2.png	Jalan lurus menuju Ruang 01.02	2
394	215	/uploads/215_3.png	Jalan lurus menuju Ruang 01.02	3
395	214	/uploads/214.png	Keluar lift kemudian jalan sesuai arah panah	1
396	214	/uploads/214_2.png	Jalan lurus menuju Ruang 01.01	2
397	214	/uploads/214_3.png	Jalan lurus menuju Ruang 01.01	3
398	216	/uploads/216.png	Keluar lift kemudian jalan sesuai arah panah	1
399	216	/uploads/216_2.png	Jalan lurus menuju Ruang 01.03	2
400	216	/uploads/216_3.png	Jalan lurus menuju Ruang 01.03	3
401	217	/uploads/217.png	Keluar lift kemudian jalan sesuai arah panah	1
402	217	/uploads/217_2.png	Jalan lurus menuju Ruang 01.04	2
403	217	/uploads/217_3.png	Jalan lurus menuju Ruang 01.04	3
404	218	/uploads/218.png	Keluar lift kemudian jalan sesuai arah panah	1
405	218	/uploads/218_2.png	Jalan lurus menuju Ruang 05	2
406	218	/uploads/218_3.png	Jalan lurus menuju Ruang 05	3
407	219	/uploads/219.png	Keluar lift kemudian jalan sesuai arah panah	1
408	219	/uploads/219_2.png	Jalan lurus menuju Ruang 06	2
409	219	/uploads/219_3.png	Jalan lurus menuju Ruang 06	3
410	220	/uploads/220.png	Keluar lift kemudian jalan sesuai arah panah	1
411	220	/uploads/220_2.png	Jalan lurus menuju Ruang 07	2
412	220	/uploads/220_3.png	Jalan lurus menuju Ruang 07	3
413	221	/uploads/221.png	Keluar lift kemudian jalan sesuai arah panah	1
414	221	/uploads/221_2.png	Jalan lurus menuju Ruang 08	2
415	221	/uploads/221_3.png	Jalan lurus menuju Ruang 08	3
416	222	/uploads/222.png	Keluar lift kemudian jalan sesuai arah panah	1
417	222	/uploads/222_2.png	Jalan lurus menuju Ruang 09	2
418	222	/uploads/222_3.png	Jalan lurus menuju Ruang 09	3
419	223	/uploads/223.png	Keluar lift kemudian jalan sesuai arah panah	1
420	223	/uploads/223_2.png	Jalan lurus menuju Ruang 10	2
421	223	/uploads/223_3.png	Jalan lurus menuju Ruang 10	3
422	224	/uploads/224.png	Keluar lift kemudian jalan sesuai arah panah	1
423	224	/uploads/224_2.png	Jalan lurus menuju Ruang 11	2
424	224	/uploads/224_3.png	Jalan lurus menuju Ruang 11	3
425	225	/uploads/225.png	Keluar lift kemudian jalan sesuai arah panah	1
426	225	/uploads/225_2.png	Jalan lurus menuju Ruang 12	2
427	226	/uploads/226.png	Keluar lift kemudian jalan sesuai arah panah	1
428	226	/uploads/226_2.png	Jalan lurus menuju Ruang 01.01	2
429	227	/uploads/227.png	Keluar lift kemudian jalan sesuai arah panah	1
430	227	/uploads/227_2.png	Jalan lurus menuju Ruang 01.02	2
431	228	/uploads/228.png	Keluar lift kemudian jalan menuju Ruang 01.03	1
432	229	/uploads/229.png	Keluar lift kemudian jalan menuju Ruang 01.04	1
433	230	/uploads/230.png	Keluar lift kemudian jalan menuju Ruang 05	1
434	231	/uploads/231.png	Keluar lift kemudian jalan menuju Ruang 06	1
435	232	/uploads/232.png	Keluar lift kemudian jalan sesuai arah panah	1
436	232	/uploads/232_2.png	Jalan lurus menuju Ruang 07	2
437	233	/uploads/233.png	Keluar lift kemudian jalan sesuai arah panah	1
438	233	/uploads/233_2.png	Jalan lurus menuju Ruang 08	2
439	234	/uploads/234.png	Keluar lift kemudian jalan menuju Ruang 09	1
440	235	/uploads/235.png	Keluar lift kemudian jalan sesuai arah panah	1
441	235	/uploads/235_2.png	Jalan lurus menuju Ruang 10	2
442	236	/uploads/236.png	Keluar lift kemudian jalan sesuai arah panah	1
443	236	/uploads/236_2.png	Jalan lurus menuju Ruang 11	2
444	237	/uploads/237.png	Keluar lift kemudian jalan sesuai arah panah	1
445	237	/uploads/237_2.png	Jalan lurus menuju Ruang 12	2
446	238	/uploads/238.png	Jalan menuju Jembatan FISIP	1
447	239	/uploads/239.png	Jalan lurus menuju Gedung 10 lantai 3	1
448	239	/uploads/239_2.png	Belok kiri	2
449	239	/uploads/239_3.png	Jalan lurus kemudian belok kanan menuju pintu	3
450	239	/uploads/239_4.png	Jalan lurus kemudian belok kanan sedikit	4
451	239	/uploads/239_5.png	Jalan menuju Lab IPA Terpadu & Lab Microteaching	5
452	240	/uploads/240.png	Jalan lurus menuju Gedung 10 lantai 3	1
453	240	/uploads/240_2.png	Belok kiri	2
454	240	/uploads/240_3.png	Jalan lurus kemudian belok kiri menuju lorong	3
455	240	/uploads/240_4.png	Jalan lurus kemudian belok kiri	4
456	240	/uploads/240_5.png	Jalan menuju Lab Fisika Dasar 10314 - 10315	5
457	245	/uploads/245.png	Keluar lift menuju Ruang Kelas Bahasa BIPA	1
458	246	/uploads/246.png	Keluar lift menuju Ruang Kelas Bahasa BIPA	1
459	246	/uploads/246_2.png	Jalan menuju Ruang Kelas Bahasa BIPA	2
460	247	/uploads/247.png	Keluar lift menuju Ruang 03.03-04	1
461	248	/uploads/248.png	Keluar lift menuju Ruang 03.03-04	1
462	249	/uploads/249.png	Jalan lurus	1
463	249	/uploads/249_2.png	Belok kiri menuju Gedung 7 Pintu Masuk Utama	2
464	251	/uploads/251.png	Jalan mengikuti arah panah	1
465	251	/uploads/251_2.png	Jalan menuju lorong	2
466	241	/uploads/241.png	Jalan lurus kemudian belok kiri menuju Lorong	1
467	241	/uploads/241_2.png	Belok kiri dan masuk ke Lorong	2
468	241	/uploads/241_3.png	Jalan lurus	3
469	241	/uploads/241_4.png	Belok kanan	4
470	241	/uploads/241_5.png	Jalan lurus terus	5
471	241	/uploads/241_6.png	Jalan lurus kemudian belok kiri menuju Ruang 03.03-04	6
472	241	/uploads/241_7.png	Jalan menuju Ruang 03.03-04	7
473	242	/uploads/242.png	Jalan lurus kemudian belok kiri	1
474	242	/uploads/242_2.png	Jalan menuju Ruang 03.03-04	2
475	242	/uploads/242_3.png	Jalan menuju Ruang 03.03-04	3
476	243	/uploads/243.png	Jalan lurus kemudian belok kiri setelah pintu	1
477	243	/uploads/243_2.png	Jalan lurus kemudian belok kanan	2
478	243	/uploads/243_3.png	Jalan lurus hingga Ruang Kolas Bahasa BIPA ada di sebelah kiri Anda	3
479	244	/uploads/244.png	Jalan lurus kemudian belok kiri setelah pintu	1
480	244	/uploads/244_2.png	Jalan lurus kemudian belok kanan	2
481	244	/uploads/244_3.png	Jalan lurus hingga Ruang Kelas Bahasa BIPA ada di sebelah kiri Anda	3
482	250	/uploads/250.png	Belok kiri	1
483	250	/uploads/250_2.png	Lurus kemudian belok kanan	2
484	250	/uploads/250_3.png	Jalan lurus menuju Lorong	3
485	252	/uploads/252.png	Belok kanan menuju pintu	1
486	252	/uploads/252_2.png	Jalan lurus	2
487	252	/uploads/252_3.png	Jalan menuju Lab Komp 10.209 10.210 di sisi kanan Anda	3
488	253	/uploads/253.png	Belok kanan menuju pintu	1
489	253	/uploads/253_2.png	Jalan lurus kemudian belok kanan menuju pintu	2
490	253	/uploads/253_3.png	Lurus kemudian belok kanan sedikit	3
491	253	/uploads/253_4.png	Jalan menuju Lab IPA Terpadu & Lab Microteaching	4
492	254	/uploads/254.png	Belok kanan menuju pintu	1
493	254	/uploads/254_2.png	Jalan lurus kemudian belok kiri menuju lorong	2
494	254	/uploads/254_3.png	Jalan menuju Lab Fisika Dasar 10314 - 10315	3
495	256	/uploads/256.png	Keluar lift kemudian jalan lurus dan belok kanan	1
496	256	/uploads/256_2.png	Jalan lurus kemudian belok kanan	2
497	256	/uploads/256_3.png	Jalan menuju Ruang 03-04 di sebelah kiri Anda	3
498	257	/uploads/257.png	Keluar lift kemudian jalan lurus dan belok kiri	1
499	257	/uploads/257_2.png	Jalan lurus kemudian belok kanan	2
500	257	/uploads/257_3.png	Jalan menuju Ruang 05-06 di sebelah kiri Anda	3
501	258	/uploads/258.png	Keluar lift kemudian jalan lurus dan belok kanan	1
502	258	/uploads/258_2.png	Jalan lurus kemudian belok kanan	2
503	258	/uploads/258_3.png	Jalan menuju Ruang 05-06 di sebelah kiri Anda	3
504	259	/uploads/259.png	Keluar lift menuju Ruang 05-06	1
505	260	/uploads/260.png	Keluar lift menuju Ruang 05-06	1
506	261	/uploads/261.png	Keluar lift menuju Ruang 03-04	1
507	262	/uploads/262.png	Keluar lift menuju Ruang 03-04	1
508	265	/uploads/265.png	Jalan menuju Sekretariat Mahitala	1
509	266	/uploads/266.png	Jalan menuju Pohon Hukum	1
510	263	/uploads/263.png	Jalan lurus kemudian belok kanan	1
511	263	/uploads/263_2.png	Belok kiri menuju Lorong kelas	2
512	263	/uploads/263_3.png	Jalan lurus	3
513	263	/uploads/263_4.png	Jalan menuju Ruang 09-10 di sisi kiri Anda	4
514	264	/uploads/264.png	Jalan lurus	1
515	264	/uploads/264_2.png	Jalan menuju Ruang 09-10 di sisi kanan Anda	2
516	267	/uploads/267.png	Jalan lurus kemudian belok kiri setelah pintu	1
517	267	/uploads/267_2.png	Jalan lurus kemudian belok kanan	2
518	267	/uploads/267_3.png	Jalan lurus hingga Ruang 03-04 ada di sisi kiri Anda	3
519	268	/uploads/268.png	Jalan lurus kemudian belok kiri setelah pintu	1
520	268	/uploads/268_2.png	Jalan lurus kemudian belok kanan	2
521	268	/uploads/268_3.png	Jalan lurus hingga Ruang 05-06 ada di sisi kiri Anda	3
522	269	/uploads/269.png	Masuk ke Lorong	1
523	269	/uploads/269_2.png	Jalan lurus pada Lorong	2
524	269	/uploads/269_3.png	Belok kanan	3
525	269	/uploads/269_4.png	Jalan lurus terus	4
526	269	/uploads/269_5.png	Jalan lurus hingga Ruang 03.03-04 di sisi kiri Anda	5
527	270	/uploads/270.png	Jalan lurus kemudian belok kiri setelah pintu	1
528	270	/uploads/270_2.png	Jalan lurus kemudian belok kanan	2
529	270	/uploads/270_3.png	Jalan lurus hingga Ruang Kelas Bahasa BIPA ada di sisi kiri Anda	3
530	271	/uploads/271_304.png	Naik lift menuju lantai 4	1
531	272	/uploads/271_304.png	Naik lift menuju lantai 5	1
532	273	/uploads/271_304.png	Naik lift menuju lantai 6	1
533	274	/uploads/271_304.png	Naik lift menuju lantai 7	1
534	275	/uploads/271_304.png	Naik lift menuju lantai 8	1
535	276	/uploads/271_304.png	Naik lift menuju lantai 9	1
536	277	/uploads/271_304.png	Naik lift menuju lantai 10	1
537	278	/uploads/271_304.png	Naik lift menuju lantai 11	1
538	279	/uploads/271_304.png	Naik lift menuju lantai 12	1
539	280	/uploads/271_304.png	Naik lift menuju lantai 4	1
540	281	/uploads/271_304.png	Naik lift menuju lantai 5	1
541	282	/uploads/271_304.png	Naik lift menuju lantai 6	1
542	283	/uploads/271_304.png	Naik lift menuju lantai 7	1
543	284	/uploads/271_304.png	Naik lift menuju lantai 8	1
544	285	/uploads/271_304.png	Naik lift menuju lantai 9	1
545	286	/uploads/271_304.png	Naik lift menuju lantai 10	1
546	287	/uploads/271_304.png	Naik lift menuju lantai 11	1
547	288	/uploads/271_304.png	Naik lift menuju lantai 12	1
548	289	/uploads/271_304.png	Naik lift menuju lantai 4	1
549	290	/uploads/271_304.png	Naik lift menuju lantai 7	1
550	291	/uploads/271_304.png	Naik lift menuju lantai 8	1
551	292	/uploads/271_304.png	Naik lift menuju lantai 9	1
552	293	/uploads/271_304.png	Naik lift menuju lantai 10	1
553	294	/uploads/271_304.png	Naik lift menuju lantai 11	1
554	295	/uploads/271_304.png	Naik lift menuju lantai 12	1
555	296	/uploads/271_304.png	Naik lift menuju lantai 5	1
556	297	/uploads/271_304.png	Naik lift menuju lantai 6	1
557	298	/uploads/271_304.png	Naik lift menuju lantai 4	1
558	299	/uploads/271_304.png	Naik lift menuju lantai 7	1
559	300	/uploads/271_304.png	Naik lift menuju lantai 8	1
560	301	/uploads/271_304.png	Naik lift menuju lantai 9	1
561	302	/uploads/271_304.png	Naik lift menuju lantai 10	1
562	303	/uploads/271_304.png	Naik lift menuju lantai 11	1
563	304	/uploads/271_304.png	Naik lift menuju lantai 12	1
564	305	/uploads/305.png	Masuk ke lift di lantai 4	1
565	306	/uploads/306.png	Masuk ke lift di lantai 5	1
566	307	/uploads/307.png	Masuk ke lift di lantai 4	1
567	308	/uploads/308.png	Masuk ke lift di lantai 5	1
568	309	/uploads/309.png	Masuk ke lift di lantai 12	1
569	310	/uploads/310.png	Masuk ke lift di lantai 4	1
570	311	/uploads/311.png	Masuk ke lift di lantai 4	1
571	487	/uploads/487.png	Masuk ke lift di lantai 1A	1
572	488	/uploads/488.png	Masuk ke lift di lantai 2A	1
573	489	/uploads/489.png	Masuk ke lift di lantai 1A	1
574	490	/uploads/490.png	Masuk ke lift di lantai 2A	1
575	491	/uploads/491.png	Masuk ke lift di lantai 1A	1
576	492	/uploads/492.png	Masuk ke lift di lantai 1	1
577	493	/uploads/493.png	Masuk ke lift di lantai 1A	1
578	494	/uploads/494.png	Masuk ke lift di lantai 2	1
579	495	/uploads/495.png	Masuk ke lift di lantai 2A	1
580	496	/uploads/496.png	Masuk ke lift di lantai 4	1
581	497	/uploads/497.png	Masuk ke lift di lantai 3	1
582	498	/uploads/498.png	Masuk ke lift di lantai 2	1
583	499	/uploads/499.png	Masuk ke lift di lantai 1	1
584	500	/uploads/500.png	Masuk ke lift di lantai 2A	1
585	501	/uploads/501.png	Masuk ke lift di lantai 3	1
586	502	/uploads/502.png	Masuk ke lift di lantai 1	1
587	503	/uploads/503.png	Masuk ke lift di lantai 2	1
588	504	/uploads/504.png	Masuk ke lift di lantai 5	1
589	505	/uploads/505.png	Masuk ke lift di lantai 4	1
590	506	/uploads/506.png	Masuk ke lift di lantai B1	1
591	507	/uploads/507.png	Masuk ke lift di lantai 2	1
592	508	/uploads/508.png	Masuk ke lift di lantai 3	1
593	312	/uploads/312_317.png	Turun tangga menuju lantai B1	1
594	313	/uploads/312_317.png	Naik tangga menuju lantai 1	1
595	314	/uploads/312_317.png	Naik tangga menuju lantai 1A	1
596	315	/uploads/312_317.png	Naik tangga menuju lantai 2	1
597	316	/uploads/312_317.png	Naik tangga menuju lantai 2A	1
598	317	/uploads/312_317.png	Naik tangga menuju lantai 3	1
599	318	/uploads/318_323.png	Turun tangga menuju lantai B2	1
600	319	/uploads/318_323.png	Turun tangga menuju lantai B1	1
601	320	/uploads/318_323.png	Turun tangga menuju lantai 1	1
602	321	/uploads/318_323.png	Turun tangga menuju lantai 1A	1
603	322	/uploads/318_323.png	Turun tangga menuju lantai 2	1
604	323	/uploads/318_323.png	Turun tangga menuju lantai 2A	1
605	324	/uploads/324.png	Belok kanan menuju Pintu Lift A	1
606	325	/uploads/325_332.png	Jalan lurus hingga ujung Lorong	1
607	325	/uploads/325_332_2.png	Belok kanan menuju lift	2
608	326	/uploads/325_332.png	Jalan lurus hingga ujung Lorong	1
609	326	/uploads/325_332_2.png	Belok kanan menuju lift	2
610	327	/uploads/325_332.png	Jalan lurus hingga ujung Lorong	1
611	327	/uploads/325_332_2.png	Belok kanan menuju lift	2
612	328	/uploads/325_332.png	Jalan lurus hingga ujung Lorong	1
613	328	/uploads/325_332_2.png	Belok kanan menuju lift	2
614	329	/uploads/325_332.png	Jalan lurus hingga ujung Lorong	1
615	329	/uploads/325_332_2.png	Belok kanan menuju lift	2
616	330	/uploads/325_332.png	Jalan lurus hingga ujung Lorong	1
617	330	/uploads/325_332_2.png	Belok kanan menuju lift	2
618	331	/uploads/325_332.png	Jalan lurus hingga ujung Lorong	1
619	331	/uploads/325_332_2.png	Belok kanan menuju lift	2
620	332	/uploads/325_332.png	Jalan lurus hingga ujung Lorong	1
621	332	/uploads/325_332_2.png	Belok kanan menuju lift	2
622	333	/uploads/333_335.png	Belok kanan menuju Pintu Lift A	1
623	334	/uploads/333_335.png	Belok kanan menuju Pintu Lift A	1
624	335	/uploads/333_335.png	Belok kanan menuju Pintu Lift A	1
625	336	/uploads/336_347.png	Jalan menuju Pintu Lift B	1
626	337	/uploads/336_347.png	Jalan menuju Pintu Lift B	1
627	338	/uploads/336_347.png	Jalan menuju Pintu Lift B	1
628	339	/uploads/336_347.png	Jalan menuju Pintu Lift B	1
629	340	/uploads/336_347.png	Jalan menuju Pintu Lift B	1
630	341	/uploads/336_347.png	Jalan menuju Pintu Lift B	1
631	342	/uploads/336_347.png	Jalan menuju Pintu Lift B	1
632	343	/uploads/336_347.png	Jalan menuju Pintu Lift B	1
633	344	/uploads/336_347.png	Jalan menuju Pintu Lift B	1
634	345	/uploads/336_347.png	Jalan menuju Pintu Lift B	1
635	346	/uploads/336_347.png	Jalan menuju Pintu Lift B	1
636	347	/uploads/336_347.png	Jalan menuju Pintu Lift B	1
637	351	/uploads/351.png	Jalan lurus hingga ujung Lorong	1
638	351	/uploads/351_2.png	Belok kiri menuju Lab Arsitektur	2
639	352	/uploads/352.png	Jalan lurus hingga ujung Lorong	1
640	352	/uploads/352_2.png	Belok kanan menuju Lab Arsitektur	2
641	353	/uploads/353_354.png	Jalan menuju Pintu Lift D	1
642	354	/uploads/353_354.png	Jalan menuju Pintu Lift D	1
643	356	/uploads/356_357.png	Jalan menuju Pintu Lift C	1
644	357	/uploads/356_357.png	Jalan menuju Pintu Lift C	1
645	360	/uploads/360_392.png	Turun lift menuju lantai 3	1
646	361	/uploads/360_392.png	Turun lift menuju lantai 4	1
647	362	/uploads/360_392.png	Turun lift menuju lantai 5	1
648	363	/uploads/360_392.png	Turun lift menuju lantai 6	1
649	364	/uploads/360_392.png	Turun lift menuju lantai 7	1
650	365	/uploads/360_392.png	Turun lift menuju lantai 8	1
651	366	/uploads/360_392.png	Turun lift menuju lantai 9	1
652	367	/uploads/360_392.png	Turun lift menuju lantai 10	1
653	368	/uploads/360_392.png	Turun lift menuju lantai 11	1
654	369	/uploads/360_392.png	Turun lift menuju lantai 3	1
655	370	/uploads/360_392.png	Turun lift menuju lantai 4	1
656	371	/uploads/360_392.png	Turun lift menuju lantai 5	1
657	372	/uploads/360_392.png	Turun lift menuju lantai 6	1
658	373	/uploads/360_392.png	Turun lift menuju lantai 7	1
659	374	/uploads/360_392.png	Turun lift menuju lantai 8	1
660	375	/uploads/360_392.png	Turun lift menuju lantai 9	1
661	376	/uploads/360_392.png	Turun lift menuju lantai 10	1
662	377	/uploads/360_392.png	Turun lift menuju lantai 11	1
663	378	/uploads/360_392.png	Turun lift menuju lantai 3	1
671	386	/uploads/360_392.png	Turun lift menuju lantai 3	1
678	393	/uploads/393.png	Belok kanan	1
679	393	/uploads/393_2.png	Belok kiri menuju Lorong	2
680	393	/uploads/393_3.png	Jalan lurus	3
681	393	/uploads/393_4.png	Jalan lurus terus hingga Ruang 01.03 berada di sisi kiri Anda	4
682	393	/uploads/393_5.png	Jalan ke Ruang 01.03	5
683	394	/uploads/394.png	Jalan lurus kemudian belok kanan menuju Lorong	1
684	394	/uploads/394_2.png	Jalan menuju Ruang 01.03 di sisi kanan Anda	2
685	395	/uploads/395.png	Jalan lurus kemudian belok kanan	1
686	395	/uploads/395_2.png	Jalan menuju lift	2
687	395	/uploads/395_3.png	Jalan menuju Pintu Lift A	3
688	401	/uploads/401.png	Jalan lurus kemudian belok kiri	1
689	401	/uploads/401_2.png	Jalan menuju Sekretariat Mahitala	2
690	404	/uploads/404.png	Jalan lurus	1
691	404	/uploads/404_2.png	Jalan menuju Area Parkir Fakultas Hukum	2
700	348	/uploads/348.png	Jalan menuju Pintu Lift D	1
701	349	/uploads/349.png	Jalan menuju Pintu Lift C	1
702	350	/uploads/350.png	Jalan menuju Pintu Lift C	1
703	358	/uploads/358.png	Belok kanan menuju Pintu Lift A	1
704	359	/uploads/359.png	Jalan menuju Pintu Lift B	1
705	396	/uploads/396.png	Jalan menuju Pintu Lift B	1
706	397	/uploads/397.png	Jalan menuju Pintu Lift D	1
707	398	/uploads/398.png	Jalan menuju Selasar CIMB Niaga	1
708	399	/uploads/399.png	Jalan menuju tangga sebelah lift	1
709	400	/uploads/400.png	Naik menuju lantai 2	1
710	402	/uploads/402.png	Jalan menuju Area Parkir Fakultas Hukum	1
711	403	/uploads/403.png	Jalan menuju Area Parkir Fakultas Hukum	1
712	409	/uploads/409.png	Jalan menuju Perempatan Palang Masuk Gate 1	1
713	411	/uploads/411.png	Jalan menuju Lab Geoteknik	1
714	412	/uploads/412.png	Jalan menuju Lab Geoteknik	1
715	413	/uploads/413.png	Keluar lift menuju PPAG 2 Lantai 1	1
717	415	/uploads/415.png	Keluar lift menuju Ramp Selasar & PPAG 2 Lantai 1	1
718	416	/uploads/416.png	Jalan menuju Gedung 10 Pintu Masuk Utama	1
719	417	/uploads/417.png	Jalan menuju Tangga Aborsi Atas	1
720	418	/uploads/418.png	Jalan menuju Pintu Lift Gedung 9 Lantai 2	1
721	419	/uploads/419.png	Keluar lift dan belok kanan menuju Patung Arntz-Geise	1
722	420	/uploads/420.png	Keluar lift menuju Auditorium Arntz-Geise	1
723	421	/uploads/421.png	Jalan menuju Gedung 2 Front Office	1
724	422	/uploads/422.png	Jalan menuju Gedung 10 Pintu Masuk Utama	1
725	423	/uploads/423.png	Jalan menuju Gedung 10 Pintu Masuk Utama	1
716	414	uploads/414_3.png	Jalan menuju Pohon Hukum	3
726	424	/uploads/424.png	Jalan menuju Perempatan Palang Keluar Gate 1	1
727	410	/uploads/410.png	Masuk ke lobby	1
728	410	/uploads/410_2.png	Jalan lurus kemudian belok kiri menuju tangga	2
729	412	/uploads/412.png	Belok kiri sebelum pintu masuk	1
730	412	/uploads/412_2.png	Lurus kemudian belok kanan	2
731	412	/uploads/412_3.png	Belok kiri	3
732	412	/uploads/412_4.png	Belok kanan	4
733	412	/uploads/412_5.png	Jalan menuju Lab Geoteknik di sisi kanan Anda	5
737	415	/uploads/415.png	Jalan lurus kemudian belok kanan ke arah ramp	1
738	415	/uploads/415_2.png	Jalan menuju ramp	2
739	416	/uploads/416.png	Jalan lurus kemudian belok kiri	1
740	416	/uploads/416_2.png	Jalan lurus kemudian belok kanan	2
741	416	/uploads/416_3.png	Jalan menuju Gedung 10	3
742	417	/uploads/417.png	Belok kiri	1
743	417	/uploads/417_2.png	Jalan lurus menuju Tangga Aborsi Atas	2
744	420	/uploads/420.png	Jalan lurus hingga keluar dari pintu	1
745	420	/uploads/420_2.png	Jalan lurus kemudian belok kiri di ujung lorong	2
746	420	/uploads/420_3.png	Jalan lurus	3
747	420	/uploads/420_4.png	Jalan lurus menuju Auditorium Arntz-Geise	4
748	421	/uploads/421.png	Jalan keluar dari lorong ASP	1
749	421	/uploads/421_2.png	Belok kiri	2
750	421	/uploads/421_3.png	Jalan lurus kemudian belok kanan	3
751	421	/uploads/421_4.png	Jalan menuju Gedung 2	4
752	422	/uploads/422.png	Jalan lurus	1
753	422	/uploads/422_2.png	Jalan lurus keluar dari lorong kemudian belok kiri	2
754	422	/uploads/422_3.png	Jalan lurus kemudian belok kanan menuju lorong	3
755	422	/uploads/422_4.png	Belok kanan	4
756	422	/uploads/422_5.png	Jalan lurus menuju pintu	5
757	423	/uploads/423.png	Jalan lurus kemudian belok kanan	1
758	423	/uploads/423_2.png	Belok kanan	2
759	423	/uploads/423_3.png	Ikuti arah panah	3
760	423	/uploads/423_4.png	Jalan lurus menuju pintu	4
761	425	/uploads/425_426_428.png	Jalan lurus kemudian belok kiri	1
762	425	/uploads/425_426_428_2.png	Ikuti arah panah kemudian belok kanan	2
763	425	/uploads/425_426_428_3.png	Jalan lurus kemudian belok kiri menuju tangga	3
764	426	/uploads/425_426_428.png	Jalan lurus kemudian belok kiri	1
765	426	/uploads/425_426_428_2.png	Ikuti arah panah kemudian belok kanan	2
766	426	/uploads/425_426_428_3.png	Jalan lurus kemudian belok kiri menuju tangga	3
767	427	/uploads/427.png	Jalan lurus hingga ujung lorong	1
768	427	/uploads/427_2.png	Belok kiri	2
769	427	/uploads/427_3.png	Jalan lurus	3
770	427	/uploads/427_4.png	Keluar dari lorong dan belok kanan	4
771	427	/uploads/427_5.png	Jalan menuju tangga di sisi kiri Anda	5
772	428	/uploads/425_426_428.png	Jalan lurus kemudian belok kiri	1
773	428	/uploads/425_426_428_2.png	Ikuti arah panah kemudian belok kanan	2
774	428	/uploads/425_426_428_3.png	Jalan lurus kemudian belok kiri menuju tangga	3
775	430	/uploads/430.png	Belok kanan	1
776	430	/uploads/430_2.png	Jalan lurus menuju Gedung 13	2
777	433	/uploads/433.png	Ikuti arah panah	1
778	433	/uploads/433_2.png	Belok kanan menuju Ruang 01.01	2
779	433	/uploads/433_3.png	Jalan menuju Ruang 01.01	3
780	434	/uploads/434.png	Ikuti arah panah	1
781	434	/uploads/434_2.png	Jalan lurus di lorong hingga Ruang 01.02 berada di sisi kanan Anda	2
782	434	/uploads/434_3.png	Jalan menuju Ruang 01.02	3
783	435	/uploads/435.png	Ikuti arah panah	1
784	435	/uploads/435_2.png	Jalan lurus di lorong hingga Ruang 01.03 berada di sisi kanan Anda	2
785	435	/uploads/435_3.png	Jalan menuju Ruang 01.03	3
786	436	/uploads/436.png	Ikuti arah panah	1
787	436	/uploads/436_2.png	Jalan lurus di lorong hingga Ruang 01.04 berada di sisi kanan Anda	2
788	436	/uploads/436_3.png	Jalan menuju Ruang 01.04	3
789	437	/uploads/437.png	Ikuti arah panah	1
790	437	/uploads/437_2.png	Jalan lurus hingga Ruang 05 berada di sisi kiri Anda	2
791	437	/uploads/437_3.png	Jalan menuju Ruang 05	3
795	439	/uploads/439.png	Ikuti arah panah	1
796	439	/uploads/439_2.png	Jalan lurus hingga Ruang 07 berada di sisi kiri Anda	2
797	439	/uploads/439_3.png	Jalan menuju Ruang 07	3
798	440	/uploads/440.png	Ikuti arah panah	1
799	440	/uploads/440_2.png	Jalan lurus hingga Ruang 08 berada di sisi kiri Anda	2
800	440	/uploads/440_3.png	Jalan menuju Ruang 08	3
801	441	/uploads/441.png	Ikuti arah panah	1
802	441	/uploads/441_2.png	Jalan lurus hingga Ruang 09 berada di sisi kiri Anda	2
803	441	/uploads/441_3.png	Jalan menuju Ruang 09	3
804	442	/uploads/442.png	Ikuti arah panah	1
805	442	/uploads/442_2.png	Jalan lurus hingga Ruang 10 berada di sisi kiri Anda	2
806	442	/uploads/442_3.png	Jalan menuju Ruang 10	3
807	443	/uploads/443.png	Ikuti arah panah	1
808	443	/uploads/443_2.png	Jalan lurus hingga Ruang 11 berada di sisi kiri Anda	2
809	443	/uploads/443_3.png	Jalan menuju Ruang 11	3
810	444	/uploads/444.png	Ikuti arah panah	1
811	444	/uploads/444_2.png	Jalan lurus hingga Ruang 12 berada di sisi kiri Anda	2
812	445	/uploads/445.png	Jalan lurus	1
899	514	/uploads/514_2.png	Jalan lurus kemudian belok kanan	2
735	414	uploads/414_2.png	Belok kiri	2
734	414	uploads/414.png	Jalan keluar dari lorong ASP	1
813	445	/uploads/445_2.png	Jalan lurus hingga Ruang 01.01 berada di sisi kiri Anda	2
814	446	/uploads/446.png	Jalan lurus	1
815	446	/uploads/446_2.png	Jalan lurus hingga Ruang 01.02 berada di sisi kiri Anda	2
816	451	/uploads/451.png	Jalan lurus	1
817	451	/uploads/451_2.png	Jalan lurus hingga Ruang 07 berada di sisi kiri Anda	2
818	455	/uploads/455.png	Jalan lurus	1
819	455	/uploads/455_2.png	Jalan lurus hingga Ruang 11 berada di sisi kanan Anda	2
820	457	/uploads/457.png	Belok kiri menuju pintu	1
821	457	/uploads/457_2.png	Jalan lurus kemudian belok kanan menuju pintu	2
822	457	/uploads/457_3.png	Jalan lurus kemudian belok kanan sedikit	3
823	457	/uploads/457_4.png	Jalan menuju Lab IPA Terpadu	4
824	458	/uploads/458.png	Belok kiri menuju pintu kemudian jalan lurus	1
825	458	/uploads/458_2.png	Belok kiri menuju lorong	2
826	458	/uploads/458_3.png	Jalan menuju Lab Fisika Dasar di sisi kiri Anda	3
827	459	/uploads/459.png	Jalan lurus kemudian belok kiri menuju lorong	1
828	459	/uploads/459_2.png	Masuk ke lorong	2
829	459	/uploads/459_3.png	Jalan lurus	3
830	459	/uploads/459_4.png	Belok kanan	4
831	459	/uploads/459_5.png	Jalan lurus	5
832	459	/uploads/459_6.png	Jalan menuju Ruang 03.03-04 di sisi kiri Anda	6
833	459	/uploads/459_7.png	Jalan menuju Ruang 03.03-04	7
834	460	/uploads/460.png	Jalan lurus hingga ujung lorong kemudian belok kiri	1
835	460	/uploads/460_2.png	Jalan lurus hingga Ruang 03.03-04 di sisi kanan Anda	2
836	460	/uploads/460_3.png	Jalan menuju Ruang 03.03-04	3
837	461	/uploads/461.png	Jalan lurus	1
838	461	/uploads/461_2.png	Jalan menuju Ruang Kelas Bahasa BIPA di sisi kanan Anda	2
839	462	/uploads/462.png	Jalan hingga ujung lorong kemudian belok kiri	1
840	462	/uploads/462_2.png	Jalan lurus kemudian belok kanan menuju pintu	2
841	462	/uploads/462_3.png	Jalan menuju Pintu Lift A	3
842	464	/uploads/464.png	Jalan hingga ujung lorong kemudian belok kiri	1
843	464	/uploads/464_2.png	Jalan lurus kemudian belok kiri	2
844	464	/uploads/464_3.png	Jalan menuju Pintu Lift B	3
845	466	/uploads/466.png	Belok kiri	1
846	466	/uploads/466_2.png	Belok kanan menuju lorong	2
847	466	/uploads/466_3.png	Jalan lurus	3
848	467	/uploads/467.png	Ikuti arah panah	1
849	467	/uploads/467_2.png	Jalan lurus	2
850	468	/uploads/468_518.png	Jalan masuk pintu	1
851	468	/uploads/468_518_2.png	Jalan menuju Lab Komp 10.209 10.210 di sisi kanan Anda	2
852	476	/uploads/476.png	Belok kanan	1
853	476	/uploads/476_2.png	Belok kiri menuju lorong	2
854	476	/uploads/476_3.png	Jalan lurus	3
855	476	/uploads/476_4.png	Jalan menuju Ruang 09-10 di sisi kiri Anda	4
856	477	/uploads/477.png	Jalan menuju lorong	1
857	477	/uploads/477_2.png	Jalan lurus hingga Ruang 09-10 berada di sisi kanan Anda	2
858	478	/uploads/478.png	Belok kanan	1
859	478	/uploads/478_2.png	Belok kiri menuju lorong	2
860	478	/uploads/478_3.png	Jalan lurus	3
861	478	/uploads/478_4.png	Jalan lurus terus	4
862	478	/uploads/478_5.png	Jalan menuju Ruang 01.03 di sisi kiri Anda	5
863	479	/uploads/479.png	Ikuti arah panah	1
864	479	/uploads/479_2.png	Jalan menuju Ruang 01.03 di sisi kanan Anda	2
865	480	/uploads/480_519.png	Belok kiri menuju pintu	1
866	480	/uploads/480_519_2.png	Belok kiri	2
867	480	/uploads/480_519_3.png	Jalan lurus hingga Gedung 3 berada di sisi kanan Anda	3
868	480	/uploads/480_519_4.png	Jalan menuju Gedung 3	4
869	484	/uploads/484.png	Jalan lurus keluar dari pintu	1
870	484	/uploads/484_2.png	Jalan lurus kemudian belok kiri	2
871	484	/uploads/484_3.png	Jalan lurus	3
872	484	/uploads/484_4.png	Jalan menuju Auditorium Arntz-Geise	4
873	485	/uploads/485_520.png	Belok kiri keluar dari pintu	1
874	485	/uploads/485_520_2.png	Jalan menuju Gedung 9	2
875	486	/uploads/486.png	Belok kiri	1
876	486	/uploads/486_2.png	Lurus kemudian belok kanan	2
877	486	/uploads/486_3.png	Lurus kemudian belok kiri	3
878	486	/uploads/486_4.png	Belok kanan	4
879	501	/uploads/501_505.png	Masuk ke lift di lantai 3	1
880	502	/uploads/501_505.png	Masuk ke lift di lantai 1	1
881	503	/uploads/501_505.png	Masuk ke lift di lantai 2	1
882	504	/uploads/501_505.png	Masuk ke lift di lantai 5	1
883	505	/uploads/501_505.png	Masuk ke lift di lantai 4	1
884	507	/uploads/507_508.png	Masuk ke lift di lantai 2	1
885	508	/uploads/507_508.png	Masuk ke lift di lantai 3	1
886	509	/uploads/509.png	Jalan lurus kemudian belok kiri setelah pintu	1
887	509	/uploads/509_2.png	Jalan lurus kemudian belok kanan	2
888	509	/uploads/509_3.png	Jalan menuju Ruang Kelas Bahasa BIPA di sisi kiri Anda	3
889	510	/uploads/510.png	Jalan lurus kemudian belok kanan	1
890	510	/uploads/510_2.png	Jalan lurus kemudian belok kanan	2
891	510	/uploads/510_3.png	Jalan lurus hingga Ruang Kelas Bahasa BIPA di sisi kiri Anda	3
892	512	/uploads/512.png	Jalan lurus kemudian belok kiri setelah pintu	1
893	512	/uploads/512_2.png	Jalan lurus kemudian belok kanan	2
894	512	/uploads/512_3.png	Jalan lurus hingga Ruang 03-04 berada di sisi kiri Anda	3
895	513	/uploads/513.png	Jalan lurus kemudian belok kanan	1
896	513	/uploads/513_2.png	Jalan lurus kemudian belok kanan	2
897	513	/uploads/513_3.png	Jalan lurus hingga Ruang 03-04 di sisi kiri Anda	3
898	514	/uploads/514.png	Jalan lurus kemudian belok kiri setelah pintu	1
900	514	/uploads/514_3.png	Jalan lurus hingga Ruang 05-06 berada di sisi kiri Anda	3
901	515	/uploads/515.png	Jalan lurus kemudian belok kanan	1
902	515	/uploads/515_2.png	Jalan lurus kemudian belok kanan	2
903	515	/uploads/515_3.png	Jalan lurus hingga Ruang 05-06 di sisi kiri Anda	3
904	516	/uploads/516.png	Belok kiri menuju pintu	1
905	516	/uploads/516_2.png	Jalan lurus kemudian belok kanan menuju pintu	2
906	516	/uploads/516_3.png	Jalan lurus	3
907	516	/uploads/516_4.png	Jalan menuju Lab IPA Terpadu	4
908	517	/uploads/517.png	Belok kiri menuju pintu	1
909	517	/uploads/517_2.png	Jalan lurus kemudian belok kiri menuju lorong	2
910	517	/uploads/517_3.png	Jalan menuju Lab Fisika Dasar	3
911	518	/uploads/468_518.png	Jalan masuk pintu	1
912	518	/uploads/468_518_2.png	Jalan menuju Lab Komp 10.209 10.210 di sisi kanan Anda	2
913	519	/uploads/480_519.png	Belok kiri menuju pintu	1
914	519	/uploads/480_519_2.png	Belok kiri	2
915	519	/uploads/480_519_3.png	Jalan lurus hingga Gedung 3 berada di sisi kanan Anda	3
916	519	/uploads/480_519_4.png	Jalan menuju Gedung 3	4
917	520	/uploads/485_520.png	Belok kiri keluar dari pintu	1
918	520	/uploads/485_520_2.png	Jalan menuju Gedung 9	2
919	521	/uploads/521_522.png	Jalan menuju tangga 8.3	1
920	522	/uploads/521_522.png	Jalan menuju tangga 8.3	1
921	524	/uploads/524.png	Jalan lurus kemudian belok kanan menuju pintu	1
922	524	/uploads/524_2.png	Masuk pintu kemudian belok kanan menuju Pintu Lift Gedung 10	2
923	528	/uploads/528_529.png	Turun tangga menuju Tangga 8.2	1
924	529	/uploads/528_529.png	Turun tangga menuju Tangga 8.1	1
925	530	/uploads/530.png	Jalan melewati pintu kemudian belok kanan menuju tangga	1
926	532	/uploads/532_543.png	Naik lift menuju lantai 1A	1
927	533	/uploads/532_543.png	Naik lift menuju lantai 2	1
928	534	/uploads/532_543.png	Naik lift menuju lantai 2A	1
929	535	/uploads/532_543.png	Naik lift menuju lantai 3	1
930	536	/uploads/532_543.png	Turun lift menuju lantai 2A	1
931	537	/uploads/532_543.png	Turun lift menuju lantai 2	1
932	538	/uploads/532_543.png	Turun lift menuju lantai 1A	1
933	539	/uploads/532_543.png	Turun lift menuju lantai 1	1
934	540	/uploads/532_543.png	Naik lift menuju lantai 2A	1
935	541	/uploads/532_543.png	Naik lift menuju lantai 3	1
936	542	/uploads/532_543.png	Turun lift menuju lantai 2	1
937	543	/uploads/532_543.png	Turun lift menuju lantai 2A	1
938	544	/uploads/544.png	Jalan lurus kemudian belok kiri menuju Lab Komp 10.209 10.210	1
939	546	/uploads/546_548.png	Naik tangga menuju lantai 3	1
940	548	/uploads/546_548.png	Naik tangga menuju lantai 4	1
941	547	/uploads/547_549.png	Turun tangga menuju lantai 2	1
942	549	/uploads/547_549.png	Turun tangga menuju lantai 3	1
943	550	/uploads/550.png	Jalan lurus hingga ujung lorong kemudian belok kanan	1
944	550	/uploads/550_2.png	Jalan melewati pintu kemudian belok kanan menuju Pintu Lift Gedung 10	2
945	552	/uploads/552_555.png	Turun lift menuju lantai 3	1
946	553	/uploads/552_555.png	Naik lift menuju lantai 4	1
947	554	/uploads/552_555.png	Turun lift menuju lantai 2	1
948	555	/uploads/552_555.png	Naik lift menuju lantai 3	1
949	557	/uploads/557_558.png	Jalan menuju tangga PPAG 2 Lantai 1	1
950	558	/uploads/557_558.png	Jalan menuju tangga PPAG 2 Lantai 1	1
951	559	/uploads/559_560.png	Jalan menuju tangga PPAG 2 Lantai 1	1
952	560	/uploads/559_560.png	Jalan menuju tangga PPAG 2 Lantai 1	1
953	429	/uploads/429.png	Jalan menuju Pintu Lift C	1
954	431	/uploads/431.png	Jalan menuju Pohon Hukum	1
955	432	/uploads/432.png	Jalan menuju Gedung 2 Front Office	1
956	447	/uploads/447.png	Masuk lift menuju Ruang 01.03	1
957	448	/uploads/448.png	Masuk lift menuju Ruang 01.04	1
958	449	/uploads/449.png	Masuk lift menuju Ruang 05	1
959	450	/uploads/450.png	Masuk lift menuju Ruang 06	1
960	452	/uploads/452.png	Masuk lift menuju Ruang 08	1
961	453	/uploads/453.png	Masuk lift menuju Ruang 09	1
962	454	/uploads/454.png	Masuk lift menuju Ruang 10	1
963	456	/uploads/456.png	Masuk lift menuju Ruang 12	1
964	463	/uploads/463.png	Jalan menuju Ruang Kelas Bahasa BIPA	1
965	465	/uploads/465.png	Jalan menuju Ruang 03.03-04	1
966	469	/uploads/469.png	Jalan menuju Ruang 03-04	1
967	471	/uploads/471.png	Jalan menuju Ruang 05-06	1
968	473	/uploads/473.png	Jalan menuju Ruang 05-06	1
969	475	/uploads/475.png	Jalan menuju Ruang 03-04	1
970	481	/uploads/481.png	Jalan menuju PPAG 2 Lantai 1	1
971	482	/uploads/482.png	Jalan menuju Ramp Selasar & PPAG 2 Lantai 1	1
972	483	/uploads/483.png	Jalan menuju Patung Arntz-Geise	1
973	511	/uploads/511.png	Jalan menuju Ruang 03.03-04	1
974	523	/uploads/523.png	Jalan menuju Pintu Lift Gedung 10 Lantai 4	1
975	525	/uploads/525.png	Jalan menuju Lab Perancangan Sistem Teknik Industri	1
976	526	/uploads/526.png	Jalan menuju Ruang Gambar Teknik	1
977	527	/uploads/527.png	Naik tangga menuju Tangga 8.3	1
978	531	/uploads/531.png	Jalan menuju gedung 8	1
979	545	/uploads/545.png	Jalan menuju Jembatan Gedung 9.1 dan 10.2	1
980	551	/uploads/551.png	Jalan menuju gedung 10	1
981	561	/uploads/561.png	Jalan menuju tangga ppag 2 lantai 3	1
339	609	/uploads/609.png	Jalan lurus kemudian belok kanan	1
982	609	/uploads/609_2.png	Jalan menuju tangga	2
983	379	/uploads/379.png	Jalan lurus kemudian belok kiri	1
984	379	/uploads/379_2.png	Jalan lurus menuju area parkir	2
985	380	/uploads/380.png	Jalan lurus kemudian belok kanan menuju lift	1
986	381	/uploads/381.png	Jalan lurus menuju PPAG 2 Lantai 2	1
987	382	/uploads/382.png	Jalan menuju tangga	1
988	383	/uploads/383.png	Jalan lurus menuju selasar HMPSIH	1
989	384	/uploads/384.png	Jalan lurus menuju pintu	1
990	385	/uploads/385.png	Jalan lurus menuju jembatan	1
991	387	/uploads/387.png	Jalan lurus kemudian belok kiri menuju tangga	1
992	405	/uploads/405.png	Jalan menuju pintu masuk Lab Kedokteran	1
993	406	/uploads/406.png	Jalan lurus	1
\.


--
-- TOC entry 4865 (class 0 OID 54890)
-- Dependencies: 217
-- Data for Name: node; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.node (id, nama, tipe, x, y, is_destination, lantai, lantai_label, confirmation_image) FROM stdin;
1	Gate 1	0	0	0	f	\N	\N	\N
2	Perempatan Palang Masuk Gate 1	0	0	36	f	\N	\N	\N
3	Wind Tunnel	0	42	53	f	\N	\N	\N
4	Gedung 0 (Rektorat): Lobby	0	28	45	t	\N	\N	{/uploads/dest4.png}
5	Pohon Hukum	0	-75	36	f	\N	\N	\N
6	Gedung 2 (Fakultas Hukum): Front Office	0	-49	58	t	\N	\N	{/uploads/dest6.png}
7	Gedung 17 (Subdirektorat Aset, Sarana, dan Prasarana)	0	-46	9	t	\N	\N	{/uploads/dest7.png}
8	Perempatan Palang Keluar Gate 1	0	92	36	f	\N	\N	\N
10	Gedung 14 (Sekretariat UKM)	0	-75	72	t	\N	\N	{/uploads/dest10.png}
11	Gedung 13 (Direktorat Kemahasiswaan)	0	-98	36	t	\N	\N	{/uploads/dest11.png}
12	PPAG 2 Lantai 1	0	58	89	f	1	1	\N
13	Selasar Belakang Rektorat	0	18	58	f	\N	\N	\N
14	Selasar HMPSIH	0	-10	74	f	\N	\N	\N
15	Selasar CIMB Niaga	0	22	99	f	\N	\N	\N
16	Tangga Aborsi Atas	1	21	121	f	\N	\N	\N
17	Pintu Lift B PPAG 2 Lantai 1	2	58	58	f	1	1	\N
18	Pintu Lift A PPAG 2 Lantai 1	2	58	122	f	1	1	\N
19	BRI Works	0	-122	36	t	\N	\N	{/uploads/dest19.png}
20	PPAG 2 Lantai 3	0	58	91	t	5	3	{/uploads/dest20.png}
21	Ruang Multifungsi PPAG 2	0	68	89	t	\N	\N	{/uploads/dest21.png,/uploads/dest21_2.png,/uploads/dest21_3.jpg}
22	Auditorium Arntz-Geise	0	65	104	t	\N	\N	{/uploads/dest22.png}
23	Gedung 9 Lt.2 Ruang Perpustakaan	0	58	208	t	\N	\N	{/uploads/dest23.png}
24	Kantin Rammah Food Collective	0	-86	145	t	\N	\N	{/uploads/dest24.png}
25	Patung Arntz-Geise	0	92	78	t	1	1	{/uploads/dest25.png}
26	Gate 3	0	99	182	f	\N	\N	\N
27	Area Lift Gedung 9 Lantai B1	0	-51	202	f	-2	B1	\N
28	PPAG 2 Lantai 2	0	58	92	f	3	2	\N
29	Gedung 3 (Fakultas Ilmu Sosial & Ilmu Politik): Pintu Masuk Utama	0	18	130	t	\N	\N	{/uploads/dest29.png}
30	Gedung 9 (Fakultas Ekonomi dan Fakultas Sains): Pintu Masuk Utama	0	6	202	t	\N	\N	{/uploads/dest30.png}
31	Gedung 8 (Fakultas Teknologi Rekayasa): Pintu Masuk Utama	0	160	36	t	\N	\N	{/uploads/dest31.png}
32	Gedung 10 (Fakultas Keguruan & Ilmu Pendidikan dan Fakultas Vokasi): Pintu Masuk Utama	0	28	182	t	\N	\N	{/uploads/dest32.png}
33	Gedung 9 Lantai 2	0	-26	202	f	2	2	\N
34	Palang Masuk Parkir B2 PPAG 2	0	48	113	f	-2	B2	\N
35	Gedung 9 Lt.Semibasement Ruang Laboratorium Komputasi Fakultas Sains	0	-24	209	t	-1	SB	{/uploads/dest35.png}
36	Tangga Samping Hukum Atas	0	-13	102	f	\N	\N	\N
37	Gedung 15 (Student Centre)	0	-46	145	f	\N	\N	\N
38	Tangga Sebelah Luar Area Kantin Atas	1	-75	104	f	\N	\N	\N
39	Gedung 9 Lantai 1	0	-26	202	f	1	1	\N
40	Tangga Gedung 9 Lantai SB Atas	0	-8	204	f	\N	\N	\N
41	Lift B PPAG 2 Lantai 1	2	58	58	f	1	1	\N
42	Lift B PPAG 2 Lantai 1A	2	58	58	f	2	1A	\N
43	Lift B PPAG 2 Lantai 2	2	58	58	f	3	2	\N
44	Lift B PPAG 2 Lantai 2A	2	58	58	f	4	2A	\N
45	Lift B PPAG 2 Lantai 3	2	58	58	f	5	3	\N
46	Tangga Aborsi Bawah	1	21	125	f	\N	\N	\N
47	Lift A PPAG 2 Lantai B2	2	58	122	f	-2	B2	\N
48	Lift A PPAG 2 Lantai B1	2	58	122	f	-1	B1	\N
49	Lift A PPAG 2 Lantai 1	2	58	122	f	1	1	\N
50	Tangga Samping Hukum Bawah	1	-13	145	f	\N	\N	\N
51	Tangga Sebelah Luar Area Kantin Bawah	1	-86	135	f	\N	\N	\N
52	Lift Gedung 9 Lantai 2	2	-55	202	f	2	2	\N
53	Lift Gedung 9 Lantai SB	2	-55	202	f	-1	SB	\N
54	Pintu 9.1 (Tangga 9.1 Atas)	1	-18	202	f	\N	\N	\N
55	Tangga Gedung 9 Lantai 1	1	-26	210	f	\N	\N	\N
56	Tangga Gedung 9 Lantai SB Bawah	1	-18	204	f	\N	\N	\N
57	Lift Gedung 9 Lantai B1	2	-55	202	f	-2	B1	\N
58	Pintu Lift A PPAG 2 Lantai 2	2	58	122	f	2	2	\N
59	Pintu Lift A PPAG 2 Lantai 3	2	58	122	f	2	3	\N
60	Pintu Lift A PPAG 2 Lantai B2	2	58	122	f	-2	B2	\N
61	Pintu Lift B PPAG 2 Lantai 2	2	58	58	f	3	2	\N
62	Pintu Lift B PPAG 2 Lantai 3	2	58	58	f	5	3	\N
63	Pintu Lift D PPAG 2 Lantai 1	2	115	45	f	1	1	\N
64	Pintu Lift D PPAG 2 Lantai 2	2	115	45	f	3	2	\N
65	Pintu Lift Gedung 9 Lantai 2	2	-55	202	f	2	2	\N
66	Pintu Lift Gedung 9 Lantai SB	2	-55	202	f	-1	2	\N
67	Pintu Lift Gedung 9 Lantai B1	2	-55	202	f	-2	B1	\N
68	Pintu Lift Gedung 9 Lantai 1	0	-55	202	f	1	1	\N
69	Lift Gedung 9 Lantai 1	2	-55	202	f	1	1	\N
70	Ramp Gedung 13 Bawah	0	-105	36	f	\N	\N	\N
71	Ramp Gedung 13 Atas	0	-105	36	f	\N	\N	\N
72	Ramp Selasar & PPAG 2 Lantai 1	0	54	119	f	\N	\N	\N
73	Tangga Gedung 9 Lantai 2	1	-26	210	f	\N	\N	\N
74	Tangga 9.1 Bawah	1	-8	202	f	\N	\N	\N
75	Lift A PPAG 2 Lantai 1A	2	58	122	f	2	1A	\N
76	Lift A PPAG 2 Lantai 2	2	58	122	f	3	2	\N
77	Lift A PPAG 2 Lantai 2A	2	58	122	f	4	2A	\N
78	Lift A PPAG 2 Lantai 3	2	58	122	f	5	3	\N
79	Lift D PPAG 2 Lantai 1	2	115	45	f	1	1	\N
80	Lift D PPAG 2 Lantai 1A	2	115	45	f	2	1A	\N
81	Lift D PPAG 2 Lantai 2	2	115	45	f	3	2	\N
113	Tangga PPAG 2 Lantai B2	1	53	112	f	\N	\N	\N
114	Tangga PPAG 2 Lantai B1	1	53	112	f	\N	\N	\N
115	Tangga PPAG 2 Lantai 1	1	53	112	f	\N	\N	\N
116	Tangga PPAG 2 Lantai 1A	1	53	112	f	\N	\N	\N
117	Tangga PPAG 2 Lantai 2	1	53	112	f	\N	\N	\N
118	Tangga PPAG 2 Lantai 2A	1	53	112	f	\N	\N	\N
119	Tangga PPAG 2 Lantai 3	1	53	112	f	\N	\N	\N
120	Pintu Lift A PPAG 2 Lantai 4	0	58	122	f	\N	4	\N
121	Lift A PPAG 2 Lantai 4	2	58	122	f	\N	4	\N
122	Pintu Lift B PPAG 2 Lantai 4	0	58	58	f	\N	4	\N
123	Lift B PPAG 2 Lantai 4	2	58	58	f	\N	4	\N
124	Pintu Lift C PPAG 2 Lantai 4	0	119	225	f	\N	4	\N
125	Lift C PPAG 2 Lantai 4	2	117	135	f	\N	4	\N
126	Pintu Lift D PPAG 2 Lantai 4	2	115	45	f	\N	4	\N
127	Lift D PPAG 2 Lantai 4	2	115	45	f	\N	4	\N
128	Pintu Lift D PPAG 2 Lantai 3	0	115	45	f	\N	3	\N
129	Lift D PPAG 2 Lantai 3	2	115	45	f	\N	3	\N
130	Pintu Lift C PPAG 2 Lantai 3	0	78	1022	f	\N	3	\N
131	Lift C PPAG 2 Lantai 3	2	76	932	f	\N	3	\N
132	Pintu Lift C PPAG 2 Lantai 1	0	74	842	f	\N	1	\N
133	Lift C PPAG 2 Lantai 1	2	72	752	f	\N	1	\N
134	Pintu Lift C PPAG 2 Lantai 1A	0	70	662	f	\N	1A	\N
135	Lift C PPAG 2 Lantai 1A	2	68	572	f	\N	1A	\N
136	Pintu Lift C PPAG 2 Lantai 2	0	66	482	f	\N	2	\N
137	Lift C PPAG 2 Lantai 2	2	64	392	f	\N	2	\N
138	Pintu Lift C PPAG 2 Lantai 2A	0	62	302	f	\N	2A	\N
139	Lift C PPAG 2 Lantai 2A	2	60	212	f	\N	2A	\N
140	Pintu Lift A PPAG 2 Lantai 5	2	58	122	f	\N	5	\N
141	Lift A PPAG 2 Lantai 5	2	58	122	f	\N	5	\N
142	Pintu Lift B PPAG 2 Lantai 5	0	58	58	f	\N	5	\N
143	Lift B PPAG 2 Lantai 5	2	58	58	f	\N	5	\N
144	Lift A PPAG 2 Lantai 6	2	58	122	f	\N	6	\N
145	Lift B PPAG 2 Lantai 6	2	58	58	f	\N	6	\N
146	Lift A PPAG 2 Lantai 7	2	58	122	f	\N	7	\N
147	Lift B PPAG 2 Lantai 7	2	58	58	f	\N	7	\N
148	Lift A PPAG 2 Lantai 8	2	58	122	f	\N	8	\N
149	Lift B PPAG 2 Lantai 8	2	58	58	f	\N	8	\N
150	Lift A PPAG 2 Lantai 9	2	58	122	f	\N	9	\N
151	Lift B PPAG 2 Lantai 9	2	58	58	f	\N	9	\N
152	Lift A PPAG 2 Lantai 10	2	58	122	f	\N	10	\N
153	Lift B PPAG 2 Lantai 10	2	58	58	f	\N	10	\N
154	Lift A PPAG 2 Lantai 11	2	58	122	f	\N	11	\N
155	Lift B PPAG 2 Lantai 11	2	58	58	f	\N	11	\N
156	Lift A PPAG 2 Lantai 12	2	58	122	f	\N	12	\N
157	Lift B PPAG 2 Lantai 12	2	58	58	f	\N	12	\N
158	Pintu Lift A PPAG 2 Lantai 12	0	58	122	f	\N	12	\N
159	Pintu Lift B PPAG 2 Lantai 12	0	58	58	f	\N	12	\N
160	Jembatan FISIP	0	22	114	f	\N	\N	\N
161	Gedung 7: Pintu Masuk Utama	0	155	41	f	\N	\N	\N
162	Pintu Lift Gedung 10 Lantai 4	0	38	224	f	\N	4	\N
163	Lift Gedung 10 Lantai 4	2	38	224	f	\N	4	\N
164	Pintu Lift Gedung 10 Lantai 3	0	38	224	f	\N	3	\N
165	Lift Gedung 10 Lantai 3	2	38	224	f	\N	3	\N
166	Pintu Lift Gedung 10 Lantai 2	0	38	224	f	\N	2	\N
167	Lift Gedung 10 Lantai 2	2	38	224	f	\N	2	\N
168	Tangga Gedung 10 Lantai 3	1	11	212	f	\N	\N	\N
169	Tangga Gedung 10 Lantai 2	1	11	212	f	\N	\N	\N
170	Tangga Gedung 10 Lantai 4	1	11	212	f	\N	\N	\N
171	Lift Gedung 2 Lantai 1	2	-59	64	f	\N	1	\N
172	Lift D PPAG 2 Lantai 2A	2	115	45	f	\N	2A	\N
173	Lift C PPAG 2 Lantai 5	2	117	135	f	\N	5	\N
174	Lift C PPAG 2 Lantai 6	2	117	135	f	\N	6	\N
175	Lift C PPAG 2 Lantai 7	2	117	135	f	\N	7	\N
176	Lift C PPAG 2 Lantai 8	2	117	135	f	\N	8	\N
177	Lift C PPAG 2 Lantai 9	2	117	135	f	\N	9	\N
178	Lift C PPAG 2 Lantai 10	2	117	135	f	\N	10	\N
179	Lift C PPAG 2 Lantai 11	2	117	135	f	\N	11	\N
180	Lift C PPAG 2 Lantai 12	2	117	135	f	\N	12	\N
181	Lift D PPAG 2 Lantai 5	2	115	45	f	\N	5	\N
182	Lift D PPAG 2 Lantai 6	2	115	45	f	\N	6	\N
183	Lift D PPAG 2 Lantai 7	2	115	45	f	\N	7	\N
184	Lift D PPAG 2 Lantai 8	2	115	45	f	\N	8	\N
185	Lift D PPAG 2 Lantai 9	2	115	45	f	\N	9	\N
186	Lift D PPAG 2 Lantai 10	2	115	45	f	\N	10	\N
187	Lift D PPAG 2 Lantai 11	2	115	45	f	\N	11	\N
188	Lift D PPAG 2 Lantai 12	2	115	45	f	\N	12	\N
189	Pintu Lift A PPAG 2 Lantai 6	0	58	122	f	\N	6	\N
190	Pintu Lift A PPAG 2 Lantai 7	0	58	122	f	\N	7	\N
191	Pintu Lift A PPAG 2 Lantai 8	0	58	122	f	\N	8	\N
192	Pintu Lift A PPAG 2 Lantai 9	0	58	122	f	\N	9	\N
193	Pintu Lift A PPAG 2 Lantai 10	0	58	122	f	\N	10	\N
194	Pintu Lift A PPAG 2 Lantai 11	0	58	122	f	\N	11	\N
195	Pintu Lift B PPAG 2 Lantai 6	0	58	58	f	\N	6	\N
196	Pintu Lift B PPAG 2 Lantai 7	0	58	58	f	\N	7	\N
197	Pintu Lift B PPAG 2 Lantai 8	0	58	58	f	\N	8	\N
198	Pintu Lift B PPAG 2 Lantai 9	0	58	58	f	\N	9	\N
199	Pintu Lift B PPAG 2 Lantai 10	0	58	58	f	\N	10	\N
200	Pintu Lift B PPAG 2 Lantai 11	0	58	58	f	\N	11	\N
201	Pintu Lift A PPAG 2 Lantai 1A	0	58	122	f	\N	1A	\N
202	Pintu Lift B PPAG 2 Lantai 1A	0	58	58	f	\N	1A	\N
203	Pintu Lift A PPAG 2 Lantai 2A	0	58	122	f	\N	2A	\N
204	Pintu Lift B PPAG 2 Lantai 2A	0	58	58	f	\N	2A	\N
205	Pintu Lift D PPAG 2 Lantai 2A	0	115	45	f	\N	2A	\N
206	Pintu Lift D PPAG 2 Lantai 1A	0	115	45	f	\N	1A	\N
207	Jembatan Gedung 9.1 dan 10.2	0	2	212	f	\N	\N	\N
208	Tangga Gedung 3 Lt. 5 Sebelah Lift	1	2	126	f	\N	5	\N
209	Tangga Gedung 3 Lt. 3 Sebelah Lift	1	2	126	f	\N	3	\N
210	Tangga Gedung 3 Lt. 2 Sebelah Lift	1	2	126	f	\N	2	\N
211	Tangga Gedung 3 Lt. 1 Sebelah Lift	1	2	126	f	\N	1	\N
212	Lift Gedung 3 Lt. 3	2	2	126	f	\N	3	\N
213	Lift Gedung 3 Lt. 1	2	2	126	f	\N	1	\N
214	Lift Gedung 3 Lt. 2	2	2	126	f	\N	2	\N
215	Lift Gedung 3 Lt. 5	2	2	126	f	\N	5	\N
216	Gedung 2 (Fakultas Hukum): Pintu Sebelah Law Profile	0	-24	80	f	\N	\N	\N
217	Tangga Gedung 2 Lt. 2	1	-26	80	f	\N	\N	\N
218	Tangga Gedung 2 Lt. 3	1	-26	80	f	\N	\N	\N
219	Tangga Gedung 2 Lt. 4 Sebelah Lift	1	-43	45	f	\N	4	\N
220	Tangga Gedung 3 Lt. 4 Sebelah Lift	1	2	126	f	\N	4	\N
221	Lift Gedung 3 Lt. 4	2	2	126	f	\N	4	\N
222	Pintu Lift Gedung 3 Lt. 3	0	44	214	f	\N	3	\N
223	Lift D PPAG 2 Lantai B1	2	115	45	f	\N	B1	\N
224	Tangga 8.1	1	172	28	f	\N	\N	\N
225	Tangga 8.2	1	172	28	f	\N	\N	\N
226	Tangga 8.3	1	172	28	f	\N	\N	\N
227	Pintu Lift Gedung 3 Lt. 5	0	2	126	f	\N	5	\N
228	Pintu Lift Gedung 2 Lantai 1	0	-59	64	f	\N	1	\N
229	Pintu Lift D PPAG 2 Lantai B1	0	115	45	f	\N	B1	\N
230	Pintu Lift Gedung 2 Lantai 2	0	-59	64	f	\N	2	\N
231	Lift Gedung 2 Lantai 2	2	-59	64	f	\N	2	\N
232	Pintu Lift Gedung 2 Lantai 3	0	-59	64	f	\N	3	\N
233	Lift Gedung 2 Lantai 3	2	-59	64	f	\N	3	\N
234	Tangga Gedung 2 Lt. 1	1	-26	80	f	\N	\N	\N
235	Tangga Gedung 2 Lt. 4	1	-26	80	f	\N	\N	\N
236	Tangga Gedung 2 Lt. 1 Sebelah Lift	1	-43	45	f	\N	1	\N
237	Tangga Gedung 2 Lt. 2 Sebelah Lift	1	-43	45	f	\N	2	\N
238	Tangga Gedung 2 Lt. 3 Sebelah Lift	1	-43	45	f	\N	3	\N
239	Pintu Lift Gedung 3 Lt. 1	2	2	126	f	\N	1	\N
240	Pintu Lift Gedung 3 Lt. 2	2	2	126	f	\N	2	\N
241	Pintu Lift Gedung 3 Lt. 4	2	2	126	f	\N	4	\N
9	Selasar PPAG	0	42	89	t	\N	\N	{/uploads/dest9.png}
82	Gedung PPAG2 Utara Lt. 05 Ruang 01.01	0	57	117	t	\N	\N	{/uploads/dest82.png}
83	Gedung PPAG2 Utara Lt. 05 Ruang 01.02	0	57	102	t	\N	\N	{/uploads/dest83.png}
84	Gedung PPAG2 Utara Lt. 05 Ruang 01.03	0	57	87	t	\N	\N	{/uploads/dest84.png}
85	Gedung PPAG2 Utara Lt. 05 Ruang 01.04	0	57	72	t	\N	\N	{/uploads/dest85.png}
86	Gedung 2 FH Lt.4 Ruang Seminar	0	-38	53	t	\N	\N	{/uploads/dest86.png}
87	Gedung 3 FISIP Lt. 1 Ruang ADVIS	0	-15	128	t	\N	\N	{/uploads/dest87.png}
88	Gedung 3 FISIP Lt.5 Ruang Veritas	0	-25	132	t	\N	\N	{/uploads/dest88.png}
89	Gedung PPAG1 Lt. 1 Ruang Lab Fakultas Kedokteran	0	18	75	t	\N	\N	{/uploads/dest89.png}
90	Gedung 10 Lt.3 Ruang Lab IPA Terpadu & Lab Microteaching	0	12	191	t	\N	\N	{/uploads/dest90.png}
91	Gedung PPAG2 Utara Lt. 1A Ruang 03.03-04	0	115	96	t	\N	\N	{/uploads/dest91.png}
92	Gedung 10 Lt.3 Ruang Lab Fisika Dasar 10314 - 10315	0	28	182	t	\N	\N	{/uploads/dest92.png}
93	Gedung PPAG2 Utara Lt. 05 Ruang 05	0	59	72	t	\N	\N	{/uploads/dest93.png}
94	Gedung PPAG2 Utara Lt. 05 Ruang 06	0	59	84	t	\N	\N	{/uploads/dest94.png}
95	Gedung 7, Lt.Semibasement, Lab Geoteknik	0	146	45	t	\N	\N	{/uploads/dest95.png}
96	Gedung PPAG2 Selatan Lt. 4 Lab Arsitektur	0	115	89	t	\N	\N	{/uploads/dest96.png}
97	Gedung 8 Lt.3 Ruang Lab Perancangan Sistem Teknik Industri	0	172	42	t	\N	\N	{/uploads/dest97.png}
98	Gedung 10 Lt.2 Ruang Lab Komp 10.209 10.210	0	30	217	t	\N	\N	{/uploads/dest98.png}
99	Gedung PPAG2 Utara Lt. 05 Ruang 07	0	59	87	t	\N	\N	{/uploads/dest99.png}
100	Gedung PPAG2 Utara Lt. 05 Ruang 08	0	59	99	t	\N	\N	{/uploads/dest100.png}
101	Gedung PPAG2 Utara Lt. 05 Ruang 09	0	59	102	t	\N	\N	{/uploads/dest101.png}
102	Gedung PPAG2 Utara Lt. 05 Ruang 10	0	59	114	t	\N	\N	{/uploads/dest102.png}
103	Gedung PPAG2 Utara Lt. 05 Ruang 11	0	59	117	t	\N	\N	{/uploads/dest103.png}
104	Gedung PPAG2 Utara Lt. 05 Ruang 12	0	59	119	t	\N	\N	{/uploads/dest104.png}
105	Gedung PPAG2 Utara Lt. 12 Ruang 01.03	0	57	87	t	\N	\N	{/uploads/dest105.png}
106	Gedung PPAG 2 Lantai 2A Ruang 03.01-02 (Ruang Kelas Bahasa BIPA)	0	115	113	t	\N	\N	{/uploads/dest106.png}
107	Gedung PPAG2 Lt. 2A Ruang 03-04	0	115	96	t	\N	\N	{/uploads/dest107.png}
108	Gedung PPAG2 Lt. 2A Ruang 05-06	0	115	79	t	\N	\N	{/uploads/dest108.png}
109	Gedung PPAG2 Utara Lt. 04 Ruang 09-10	0	59	102	t	\N	\N	{/uploads/dest109.png}
110	Sekretariat Mahitala	0	-75	25	t	\N	\N	{/uploads/dest110.png}
111	Gedung 8 Lt.3 Ruang Gambar Teknik	0	172	62	t	\N	\N	{/uploads/dest111.png}
112	Area Parkir Fakultas Hukum	0	-65	36	t	\N	\N	{/uploads/dest112.png}
\.


--
-- TOC entry 4708 (class 2606 OID 54958)
-- Name: edge edge_from_to_uniq; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.edge
    ADD CONSTRAINT edge_from_to_uniq UNIQUE (from_id, to_id);


--
-- TOC entry 4715 (class 2606 OID 54947)
-- Name: edge_images edge_images_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.edge_images
    ADD CONSTRAINT edge_images_pkey PRIMARY KEY (id);


--
-- TOC entry 4710 (class 2606 OID 54930)
-- Name: edge edge_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.edge
    ADD CONSTRAINT edge_pkey PRIMARY KEY (id);


--
-- TOC entry 4704 (class 2606 OID 54956)
-- Name: node node_nama_uniq; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.node
    ADD CONSTRAINT node_nama_uniq UNIQUE (nama);


--
-- TOC entry 4706 (class 2606 OID 54897)
-- Name: node node_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.node
    ADD CONSTRAINT node_pkey PRIMARY KEY (id);


--
-- TOC entry 4711 (class 1259 OID 54959)
-- Name: idx_edge_from; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX idx_edge_from ON public.edge USING btree (from_id);


--
-- TOC entry 4712 (class 1259 OID 54953)
-- Name: idx_edge_from_to; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX idx_edge_from_to ON public.edge USING btree (from_id, to_id);


--
-- TOC entry 4716 (class 1259 OID 54961)
-- Name: idx_edge_images_edge_id; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX idx_edge_images_edge_id ON public.edge_images USING btree (edge_id);


--
-- TOC entry 4713 (class 1259 OID 54960)
-- Name: idx_edge_to; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX idx_edge_to ON public.edge USING btree (to_id);


--
-- TOC entry 4717 (class 2606 OID 54962)
-- Name: edge edge_from_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.edge
    ADD CONSTRAINT edge_from_id_fkey FOREIGN KEY (from_id) REFERENCES public.node(id) ON DELETE CASCADE;


--
-- TOC entry 4719 (class 2606 OID 54972)
-- Name: edge_images edge_images_edge_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.edge_images
    ADD CONSTRAINT edge_images_edge_id_fkey FOREIGN KEY (edge_id) REFERENCES public.edge(id) ON DELETE CASCADE;


--
-- TOC entry 4718 (class 2606 OID 54967)
-- Name: edge edge_to_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.edge
    ADD CONSTRAINT edge_to_id_fkey FOREIGN KEY (to_id) REFERENCES public.node(id) ON DELETE CASCADE;


-- Completed on 2026-07-20 08:24:04

--
-- PostgreSQL database dump complete
--

\unrestrict umQzaWXzuxslbbYSdvgfcDAI8IXXznH9EdGmvqSxsXFqmLbbuzCGd3enPEEcdWM

