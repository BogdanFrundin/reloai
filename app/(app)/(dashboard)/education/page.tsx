"use client";

import Image from "next/image";
import { useEffect, useMemo, useState, type ReactNode } from "react";
import { useRouter } from "next/navigation";
import PageHeader from "../../../_components/PageHeader";
import Reveal from "../../../_components/Reveal";
import CitySelect from "../../../_components/CitySelect";
import { useLanguage } from "../../../_components/LanguageProvider";
import type { Dictionary } from "../../../_lib/i18n";
import { useAuth } from "../../../_components/AuthProvider";
import { useCurrency } from "../../../_components/CurrencyProvider";
import { convertPlnText } from "../../../_lib/currency";
import CurrencyHint from "../../../_components/CurrencyHint";
import { getFlagUrl } from "../../../_lib/flags";
import { supabase } from "../../../../lib/supabase";
import { useSelectedCity } from "../../../_lib/useSelectedCity";
import { buildGoogleMapsUrl } from "../../../_lib/mapsLink";
import { getChosenCount, formatChosenCount } from "../../../_lib/chosenCount";

type TabId = "courses" | "schools" | "kindergartens" | "universities";
type FilterId = "all" | "государственный" | "частный";

const TYPE_BY_TAB: Record<TabId, string> = {
  courses: "языковые курсы",
  schools: "школа",
  kindergartens: "детский сад",
  universities: "университет",
};

type EduRow = {
  id: string;
  city: string;
  type: string;
  ownership: string | null;
  name: string;
  address: string | null;
  cost: string | null;
  audience: string | null;
  languages: string[] | null;
  required_docs: string[] | null;
  programs: string[] | null;
  schedule: string | null;
  highlights: string[] | null;
  features: string[] | null;
};

const iconBadgeClass =
  "flex h-[38px] w-[38px] flex-shrink-0 items-center justify-center rounded-xl bg-accent/15 text-accent-bright";

// Real brand logos, cropped down to just the icon mark (or a tight wordmark
// crop for brands with no separate icon) and saved locally under
// public/images/logos/education/. Keyed by a lowercase substring of row.name,
// same pattern as BANK_DOMAINS in BankCardGrid.tsx and CLINIC_LOGOS in
// medicine/page.tsx. Falls back to the generic per-tab category icon below
// when nothing matches or the file 404s.
const EDU_LOGOS: Record<string, string> = {
  "lingua nova": "lingua-nova",
  "edu & more": "edu-and-more",
  "edu&more": "edu-and-more",
  "dialogue club": "dialogue-club",
  "polish linguistic institute": "polski-instytut-jezykowy",
  "polski instytut językowy": "polski-instytut-jezykowy",
  "polski instytut jezykowy": "polski-instytut-jezykowy",
  "lingua polonica": "lingua-polonica",
  together: "together-polish",
  "institute of polish for foreigners": "iko",
  "academy of language": "academy-of-language",
  "international school of languages warsaw": "islw",
  islw: "islw",
  "speakpro academy": "speakpro-academy",
  "school of english agnieszka": "school-of-english-agnieszka",
  słowianka: "slowianka",
  slowianka: "slowianka",
  prima: "prima-polsko-turecka",
  pygmalion: "pygmalion",
  "english for you": "english-for-you",
  "spox school": "spox-school",
  "lemon language school": "lemon-szkola",
  "bla-bla school": "bla-bla-school",
  "the british school warsaw": "british-school-warsaw",
  "monnet international school": "monnet-international",
  "international european school": "international-european-school",
  "international american school": "international-american-school",
  "polish british academy": "polish-british-academy",
  "vancouver school": "vancouver-schools",
  "bednarska": "bednarska-rasz",
  "american school of warsaw": "american-school-of-warsaw",
  "thames british school": "thames-british-school",
  "warsaw montessori": "warsaw-montessori",
  "nr 81": "sp-nr-81",
  "batalionu ak": "sp-lo4-parasol",
  "bartoszewskiego": "wbschool-bartoszewski",
  "europejska szkoła przyszłości": "europejska-szkola-przyszlosci",
  "europejska szkola przyszlosci": "europejska-szkola-przyszlosci",
  "dwujęzyczna szkoła podstawowa nr 1": "dwujezyczna-sp1-cambridge",
  "dwujezyczna szkola podstawowa nr 1": "dwujezyczna-sp1-cambridge",
  "przymierza rodzin": "sp3-przymierza-rodzin",
  "szkoła podstawowa nr 10 sto": "sto-ostrobramska",
  "szkola podstawowa nr 10 sto": "sto-ostrobramska",
  "wisławy szymborskiej": "sp9-sto-szymborska",
  "wislawy szymborskiej": "sp9-sto-szymborska",
  "szkoła podstawowa nr 2 sto": "ssp2-sto",
  "szkola podstawowa nr 2 sto": "ssp2-sto",
  "szkoła podstawowa nr 4 sto": "ssp4-sto-grabski",
  "szkola podstawowa nr 4 sto": "ssp4-sto-grabski",
  "kids&co": "kids-and-co",
  "kids & co": "kids-and-co",
  tequesta: "tequesta-international",
  "casa dei bambini": "casa-dei-bambini-montessori",
  "pomarańczowa ciuchcia": "pomaranczowa-ciuchcia",
  "pomaranczowa ciuchcia": "pomaranczowa-ciuchcia",
  "canadian school": "canadian-school-preschool",
  "norlandia": "norlandia-house-of-reggio",
  "my first academy": "my-first-academy",
  lalilu: "lalilu",
  primrose: "primrose-bilingual",
  "happy preschool": "happy-preschool",
  "maple tree montessori": "maple-tree-montessori",
  "buzzy bee": "buzzy-bee",
  "baby academy": "baby-academy",
  "ulik": "ulik-przedszkole",
  "fairy house": "fairy-house-nursery",
  "nr 26": "przedszkole-26",
  "przedszkole nr 36": "przedszkole-36",
  "nr 124": "przedszkole-124",
  "nr 244": "przedszkole-244-niegocinska",
  niegocińska: "przedszkole-244-niegocinska",
  niegocinska: "przedszkole-244-niegocinska",
  "nr 420": "przedszkole-420",
  "nr 416": "przedszkole-416-unicef",
  "nr 434": "przedszkole-434-na-gorce",
  "na górce": "przedszkole-434-na-gorce",
  "na gorce": "przedszkole-434-na-gorce",
  "nr 393": "przedszkole-393",
  "nr 227": "przedszkole-227-kolorowe-kredki",
  "nr 215": "przedszkole-215",
  "university of warsaw": "university-of-warsaw",
  "warsaw university of technology": "warsaw-university-of-technology",
  "sgh warsaw school of economics": "sgh-warsaw",
  "medical university of warsaw": "medical-university-of-warsaw",
  "warsaw university of life sciences": "sggw",
  sggw: "sggw",
  "military university of technology": "wat-military-university",
  "fryderyk chopin university of music": "umfc",
  "academy of fine arts in warsaw": "academy-of-fine-arts-warsaw",
  "kozminski university": "kozminski-university",
  "swps university": "swps-university",
  "collegium civitas": "collegium-civitas",
  "vistula university": "vistula-university",
  pjatk: "pjatk",
  "university of ecology and management": "wsge",
  wsge: "wsge",
  "warsaw management university": "wsm-warsaw-management",
  "menedżerska akademia nauk stosowanych": "wsm-warsaw-management",
  "menedzerska akademia nauk stosowanych": "wsm-warsaw-management",
  "collegium humanum": "collegium-humanum",
  "nr 149": "przedszkole-149-teczowa-polanka",
  "tęczowa polanka": "przedszkole-149-teczowa-polanka",
  "teczowa polanka": "przedszkole-149-teczowa-polanka",
  "nr 82 we wrocławiu": "przedszkole-82-wroclaw",
  "nr 82 we wroclawiu": "przedszkole-82-wroclaw",
  "budowniczych wrocławia": "przedszkole-82-wroclaw",
  "budowniczych wroclawia": "przedszkole-82-wroclaw",
  "nr 25 we wrocławiu": "przedszkole-25-wroclaw",
  "nr 25 we wroclawiu": "przedszkole-25-wroclaw",
  "nr 55 we wrocławiu": "przedszkole-55-wroclaw",
  "nr 55 we wroclawiu": "przedszkole-55-wroclaw",
  "polskich podróżników": "przedszkole-55-wroclaw",
  "polskich podroznikow": "przedszkole-55-wroclaw",
  "wesoła trójeczka": "przedszkole-3-wesola-trojeczka",
  "wesola trojeczka": "przedszkole-3-wesola-trojeczka",
  "niezapominajka": "przedszkole-56-niezapominajka",
  "nr 100 we wrocławiu": "przedszkole-100-wroclaw",
  "nr 100 we wroclawiu": "przedszkole-100-wroclaw",
  "zespół przedszkoli nr1": "zespol-przedszkoli-nr1-wroclaw",
  "zespol przedszkoli nr1": "zespol-przedszkoli-nr1-wroclaw",
  "in harmony": "in-harmony-preschool",
  "akademia bystrzaków": "akademia-bystrzakow",
  "akademia bystrzakow": "akademia-bystrzakow",
  "prywatne przedszkole fsa": "fsa-przedszkole",
  "young leaders": "young-leaders-academy",
  "sunshine preschool": "sunshine-preschool-wroclaw",
  "booba kids": "booba-kids",
  "happy fox": "happy-fox-montessori",
  "nr 47": "sp47-noblistow-polskich",
  "noblistów polskich": "sp47-noblistow-polskich",
  "noblistow polskich": "sp47-noblistow-polskich",
  "nr 66 im. zbigniewa herberta": "sp66-herbert",
  "zbigniewa herberta": "sp66-herbert",
  "nr 113": "sp113-wroclaw",
  "nr 118": "sp118-wroclaw",
  "orląt lwowskich": "sp91-orlat-lwowskich",
  "orlat lwowskich": "sp91-orlat-lwowskich",
  "łukasińskiego": "sp84-lukasinskiego",
  "lukasinskiego": "sp84-lukasinskiego",
  "zesłańców sybiru": "sp-zeslancow-sybiru",
  "zeslancow sybiru": "sp-zeslancow-sybiru",
  "nr 80": "sp80-wroclaw",
  "\"primus\"": "sp-primus",
  primus: "sp-primus",
  "\"iskry\"": "sp-iskry",
  ekola: "sp-ekola",
  atut: "sp-atut",
  "wrocław international school": "wroclaw-international-school",
  "wroclaw international school": "wroclaw-international-school",
  parnas: "sp-parnas",
  "\"zdrój\"": "sp-zdroj",
  "\"zdroj\"": "sp-zdroj",
  salezjanek: "sp-salezjanek",
  "american school of wrocław": "american-school-of-wroclaw",
  "american school of wroclaw": "american-school-of-wroclaw",
  "wrocław university of science and technology": "wroclaw-univ-science-technology",
  "wroclaw university of science and technology": "wroclaw-univ-science-technology",
  "university of wrocław": "university-of-wroclaw",
  "university of wroclaw": "university-of-wroclaw",
  "wroclaw medical university": "wroclaw-medical-university",
  "uniwersytet medyczny we wrocławiu": "wroclaw-medical-university",
  "uniwersytet medyczny we wroclawiu": "wroclaw-medical-university",
  "environmental and life sciences": "wroclaw-univ-life-sciences",
  "uniwersytet przyrodniczy we wrocławiu": "wroclaw-univ-life-sciences",
  "uniwersytet przyrodniczy we wroclawiu": "wroclaw-univ-life-sciences",
  "akademia sztuk pięknych": "asp-wroclaw",
  "akademia sztuk pieknych": "asp-wroclaw",
  "karol lipiński": "karol-lipinski-academy-music",
  "karol lipinski": "karol-lipinski-academy-music",
  "akademia wojsk lądowych": "awl-wroclaw",
  "akademia wojsk ladowych": "awl-wroclaw",
  "akademia sztuk teatralnych": "ast-wroclaw",
  "dolnośląska szkoła wyższa": "dsw-wroclaw",
  "dolnoslaska szkola wyzsza": "dsw-wroclaw",
  "uniwersytet dsw": "dsw-wroclaw",
  "wsb merito wrocław": "wsb-merito-wroclaw",
  "wsb merito wroclaw": "wsb-merito-wroclaw",
  "swps wrocław": "swps-wroclaw",
  "swps wroclaw": "swps-wroclaw",
  "logistyki i transportu": "mwslit",
  mwslit: "mwslit",
  "coventry university": "coventry-university-wroclaw",
  "wyższa szkoła prawa": "wsp-prawa-wroclaw",
  "wyzsza szkola prawa": "wsp-prawa-wroclaw",
  "akademia nauk stosowanych": "ans-wroclaw",
  atins: "atins-wroclaw",
  "wyższa szkoła fizjoterapii": "wsf-fizjoterapii",
  "wyzsza szkola fizjoterapii": "wsf-fizjoterapii",
  ewst: "ewst-wroclaw",
  "link school of polish": "link-school-of-polish",
  fishkoi: "fishkoi-polish",
  "polish dream": "polish-dream",
  "po polsku": "po-polsku-centrum",
  wisła: "wisla-centrum-jezykowe",
  wisla: "wisla-centrum-jezykowe",
  polishstreet: "polishstreet",
  inpolish: "inpolish-academy",
  polskikraj: "polskikraj",
  "spoko polish": "spoko-polish",
  "witaj wrocław": "witaj-wroclaw",
  "witaj wroclaw": "witaj-wroclaw",
  "polish world": "polish-world",
  "kultury i języka polskiego": "centrum-kultury-jezyka-polskiego",
  "kultury i jezyka polskiego": "centrum-kultury-jezyka-polskiego",
  "języka polskiego i kultury": "centrum-kultury-jezyka-polskiego",
  "jezyka polskiego i kultury": "centrum-kultury-jezyka-polskiego",
  "ab polonia": "ab-polonia",
  avalon: "avalon-szkola-jezykowa",
  "co ludzie powiedzą": "co-ludzie-powiedza",
  "co ludzie powiedza": "co-ludzie-powiedza",
  "lubelska szkoła języków obcych": "lubelska-szkola-jezykow",
  "lubelska szkola jezykow obcych": "lubelska-szkola-jezykow",
  noproblem: "noproblem-lublin",
  columbus: "columbus-szkola-jezykowa",
  linguaton: "linguaton",
  "fabryka języka": "fabryka-jezyka-lublin",
  "fabryka jezyka": "fabryka-jezyka-lublin",
  moose: "moose-centrum-jezykow",
  "nonstop english": "nonstop-english",
  dialogo: "dialogo-lublin",
  "specjalna nr 26": "sp-specjalna-26-lublin",
  "nr 39 w lublinie": "przedszkole-39-lublin",
  "nr 43 w lublinie": "przedszkole-43-lublin",
  "nr 63 w lublinie": "przedszkole-63-lublin",
  "nr 66 w lublinie": "przedszkole-66-lublin",
  "nr 75 w lublinie": "przedszkole-75-lublin",
  "żłobek ziarenko": "ziarenko-lublin",
  "zlobek ziarenko": "ziarenko-lublin",
  "przedszkole ziarenko": "ziarenko-lublin",
  "mistrzowie zabawy": "mistrzowie-zabawy-lublin",
  nazaretanek: "nazaretanek-kalwaria",
  "zielona wieża": "zielona-wieza-wlochy",
  "zielona wieza": "zielona-wieza-wlochy",
  dzwoneczek: "dzwoneczek-lublin",
  koralik: "koralik-lublin",
  "lubelskie skrzaty": "felin-lubelskie-skrzaty",
  felin: "felin-lubelskie-skrzaty",
  "niepubliczne przedszkole skrzat": "przedszkole-skrzat-lublin",
  "przedszkole skrzat": "przedszkole-skrzat-lublin",
  zamoyskiego: "ii-lo-zamoyskiego-lublin",
  "ix liceum": "ix-lo-kopernika-lublin",
  "kopernika w lublinie": "ix-lo-kopernika-lublin",
  biskupiak: "biskupiak-lublin",
  zselektryk: "zselektryk-lublin",
  kleeberga: "zs-chemicznych-kleeberga-lublin",
  "transportowo-komunikacyjnych": "zstk-lublin",
  klonowic: "klonowic-lublin",
  "montessori niepubliczna": "montessori-sp-lublin",
  umcs: "umcs-lublin",
  "medical university of lublin": "medical-university-lublin",
  "politechnika lubelska": "politechnika-lubelska",
  "catholic university of lublin": "kul-lublin",
  "uniwersytet przyrodniczy w lublinie": "uniwersytet-przyrodniczy-lublin",
  wsei: "wsei-lublin",
  "vincent pol": "vincent-pol-university-lublin",
  wspa: "wspa-lublin",
  ansim: "ansim-lublin",
  "nr 1 w gdańsku": "przedszkole-1-gdansk",
  "nr 1 w gdansku": "przedszkole-1-gdansk",
  "nr 2 w gdańsku": "przedszkole-2-gdansk",
  "nr 2 w gdansku": "przedszkole-2-gdansk",
  "nr 3 w gdańsku": "przedszkole-3-gdansk",
  "nr 3 w gdansku": "przedszkole-3-gdansk",
  "nr 5 w gdańsku": "przedszkole-5-gdansk",
  "nr 5 w gdansku": "przedszkole-5-gdansk",
  "nr 6 w gdańsku": "przedszkole-6-gdansk",
  "nr 6 w gdansku": "przedszkole-6-gdansk",
  "nr 8 w gdańsku": "przedszkole-8-gdansk",
  "nr 8 w gdansku": "przedszkole-8-gdansk",
  "emilii hoene": "przedszkole-9-gdansk",
  "nr 10 w gdańsku": "przedszkole-10-gdansk",
  "nr 10 w gdansku": "przedszkole-10-gdansk",
  "nr 11 w gdańsku": "przedszkole-11-gdansk",
  "nr 11 w gdansku": "przedszkole-11-gdansk",
  "gdańsk – preschool": "bisg-preschool-gdansk",
  "gdansk – preschool": "bisg-preschool-gdansk",
  "te vizja": "te-vizja-gdansk",
  lingwista: "lingwista-przedszkole-gdansk",
  "przedszkole leonardo": "leonardo-przedszkole-gdansk",
  "bursztynowy kompas": "bursztynowy-kompas-gdansk",
  "little harvard": "little-harvard-gdansk",
  nadmorskie: "nadmorskie-montessori-gdansk",
  "be montessori toddlers": "be-montessori-toddlers-gdansk",
  "megamocni": "megamocni-gdansk",
  "akademia języka polskiego": "akademia-jezyka-polskiego-gdansk",
  "akademia jezyka polskiego": "akademia-jezyka-polskiego-gdansk",
  "skybar school": "skybar-school-gdansk",
  "time for polish": "time-for-polish-gdansk",
  berlitz: "berlitz-gdansk",
  "prestige lingua": "prestige-lingua-gdansk",
  "language box": "language-box-gdansk",
  "szkoła językowa connect": "connect-szkola-jezykowa-gdansk",
  "szkola jezykowa connect": "connect-szkola-jezykowa-gdansk",
  "językowe flow": "jezykowe-flow-gdansk",
  "jezykowe flow": "jezykowe-flow-gdansk",
  universus: "universus-gdansk",
  "nr 45 im. bohaterów westerplatte": "sp45-westerplatte-gdansk",
  "nr 45 im. bohaterow westerplatte": "sp45-westerplatte-gdansk",
  "nr 47 im. arenda dickmana": "sp47-gdansk",
  "nr 48 im. gen. józefa hallera": "sp48-hallera-gdansk",
  "nr 48 im. gen. jozefa hallera": "sp48-hallera-gdansk",
  "nr 49 im. ks. bronisława komorowskiego": "sp49-komorowskiego-gdansk",
  "nr 49 im. ks. bronislawa komorowskiego": "sp49-komorowskiego-gdansk",
  "nr 50 im. emilii plater": "sp50-gdansk",
  "nr 52 im. tadeusza kościuszki": "sp52-kosciuszki-gdansk",
  "nr 52 im. tadeusza kosciuszki": "sp52-kosciuszki-gdansk",
  "british international school gdańsk": "bisg-school-gdansk",
  "british international school gdansk": "bisg-school-gdansk",
  "nr 58 im. kazimierza sołtysika": "sp58-gdansk",
  "nr 58 im. kazimierza soltysika": "sp58-gdansk",
  "international school of gdansk": "international-school-gdansk",
  "gdańska autonomiczna": "gdanska-autonomiczna-sp",
  "gdanska autonomiczna": "gdanska-autonomiczna-sp",
  "podstawowa leonardo": "leonardo-sp-gdansk",
  "nasza szkoła": "nasza-szkola-gdansk",
  "nasza szkola": "nasza-szkola-gdansk",
  "chrześcijańska szkoła podstawowa montessori": "chrzescijanska-montessori-gdansk",
  "chrzescijanska szkola podstawowa montessori": "chrzescijanska-montessori-gdansk",
  "szkoła podstawowa fregata": "fregata-gdansk",
  "szkola podstawowa fregata": "fregata-gdansk",
  "szkoła podstawowa columbus": "columbus-sp-gdansk",
  "szkola podstawowa columbus": "columbus-sp-gdansk",
  "university of gdańsk": "university-of-gdansk",
  "university of gdansk": "university-of-gdansk",
  "politechnika gdańska": "politechnika-gdanska",
  "politechnika gdanska": "politechnika-gdanska",
  "akademia muzyczna im. stanisława moniuszki": "amuz-gdansk",
  "akademia muzyczna im. stanislawa moniuszki": "amuz-gdansk",
  "akademia sztuk pięknych w gdańsku": "asp-gdansk",
  "akademia sztuk pieknych w gdansku": "asp-gdansk",
  "akademia wychowania fizycznego i sportu": "awfis-gdansk",
  "akademia marynarki wojennej": "amw-gdansk",
  "wsb merito gdańsk": "wsb-merito-gdansk",
  "wsb merito gdansk": "wsb-merito-gdansk",
  "ateneum": "ateneum-gdansk",
  "gdańska wyższa szkoła humanistyczna": "gwsh-gdansk",
  "gdanska wyzsza szkola humanistyczna": "gwsh-gdansk",
  "powiślańska szkoła wyższa": "pans-gdansk",
  "powislanska szkola wyzsza": "pans-gdansk",
  "wyższa szkoła turystyki i hotelarstwa": "wstih-gdansk",
  "wyzsza szkola turystyki i hotelarstwa": "wstih-gdansk",
  "gdańska akademia medyczna nauk stosowanych": "gdanska-akademia-medyczna",
  "gdanska akademia medyczna nauk stosowanych": "gdanska-akademia-medyczna",
  "wyższa szkoła zdrowia w gdańsku": "gdanska-akademia-medyczna",
  "wyzsza szkola zdrowia w gdansku": "gdanska-akademia-medyczna",
  "społeczna akademia nauk": "spoleczna-akademia-nauk-gdansk",
  "spoleczna akademia nauk": "spoleczna-akademia-nauk-gdansk",
  "nr 128": "przedszkole-128-lodz",
  sezamkowo: "sezamkowo-lodz",
  galileo: "galileo-lodz",
  "przyjaciół dzieci": "tpd-baluty-lodz",
  "przyjaciol dzieci": "tpd-baluty-lodz",
  "nr 22": "przedszkole-22-lodz",
  "nr 73": "przedszkole-73-lodz",
  "talents garden": "talents-garden-lodz",
  playschool: "playschool-lodz",
  "oliwkowy gaj": "oliwkowy-gaj-lodz",
  witaminka: "witaminka-lodz",
  "little genius": "little-genius-lodz",
  "przedszkole hello": "hello-przedszkole-lodz",
  "anglojęzyczne przedszkole hello": "hello-przedszkole-lodz",
  "family school montessori": "family-school-montessori-lodz",
  "e-maluch": "e-maluch-lodz",
  "university of lodz": "university-of-lodz",
  "politechnika łódzka": "politechnika-lodzka",
  "politechnika lodzka": "politechnika-lodzka",
  "uniwersytet medyczny w łodzi": "uniwersytet-medyczny-lodz",
  "uniwersytet medyczny w lodzi": "uniwersytet-medyczny-lodz",
  "lodz film school": "lodz-film-school",
  "strzemińskiego": "asp-strzeminskiego-lodz",
  "strzeminskiego": "asp-strzeminskiego-lodz",
  "bacewiczów": "am-bacewiczow-lodz",
  "bacewiczow": "am-bacewiczow-lodz",
  "akademia humanistyczno-ekonomiczna w łodzi": "ahe-lodz",
  "akademia humanistyczno-ekonomiczna w lodzi": "ahe-lodz",
  "wsb merito łódź": "wsb-merito-lodz",
  "wsb merito lodz": "wsb-merito-lodz",
  "sztuki i projektowania": "wssip-lodz",
  "akademia polskiego": "akademia-polskiego-lodz",
  polonus: "polonus-lodz",
  "centrum języka polskiego dla cudzoziemców uniwersytetu łódzkiego": "centrum-jp-cudzoziemcow-lodz",
  "centrum jezyka polskiego dla cudzoziemcow uniwersytetu lodzkiego": "centrum-jp-cudzoziemcow-lodz",
  "alliance française": "alliance-francaise-lodz",
  "alliance francaise": "alliance-francaise-lodz",
  "modern languages center": "mlc-lodz",
  "modern languages centre": "mlc-lodz",
  skawi: "skawi-lodz",
  "lloyd woodley": "lloyd-woodley-lodz",
  "nr 41 im. króla władysława jagiełły": "sp41-jagielly-lodz",
  "nr 41 im. krola wladyslawa jagielly": "sp41-jagielly-lodz",
  "hubala": "sp3-hubala-lodz",
  "szarych szeregów": "sp6-lodz",
  "szarych szeregow": "sp6-lodz",
  "orląt lwowskich w łodzi": "sp7-lodz",
  "orlat lwowskich w lodzi": "sp7-lodz",
  "nr 11 im. marii kownackiej": "sp11-lodz",
  "im. jana kochanowskiego": "sp101-lodz",
  "british international school of the university of lodz": "bisul-lodz",
  "szkole europejskiej": "szkola-europejska-lodz",
  "family school – szkoła podstawowa montessori": "family-school-montessori-sp-lodz",
  "family school - szkola podstawowa montessori": "family-school-montessori-sp-lodz",
  "edukacji innowacyjnej": "msp-edukacji-innowacyjnej-lodz",
  "krzysztofa augustyniaka": "augustyniaka-sp-lodz",
  "łódzkiego stowarzyszenia edukacyjnego": "lse-sp-lodz",
  "lodzkiego stowarzyszenia edukacyjnego": "lse-sp-lodz",
  gortata: "gortata-siemiradzkiego-lodz",
  "smart school": "smart-school-lodz",
  "towarzystwa oświatowego": "edukacja-sp-lodz",
  "towarzystwa oswiatowego": "edukacja-sp-lodz",
  "medical university of gdańsk": "medical-university-gdansk",
  "medical university of gdansk": "medical-university-gdansk",
  "nr 18 „kubuś puchatek”": "przedszkole-18-poznan",
  "nr 18 „kubus puchatek”": "przedszkole-18-poznan",
  "kubusia puchatka": "przedszkole-18-poznan",
  "nr 42 „kwiaty polskie”": "przedszkole-42-poznan",
  "kwiaty polskie": "przedszkole-42-poznan",
  "bajkowy świat": "bajkowy-swiat-poznan",
  "bajkowy swiat": "bajkowy-swiat-poznan",
  "mali odkrywcy": "mali-odkrywcy-poznan",
  "pod topolą": "pod-topola-poznan",
  "pod topola": "pod-topola-poznan",
  "jacusia i agatki": "poznan-crest-generic",
  "nr 100 „mali poznaniacy”": "przedszkole-100-poznan",
  "mali poznaniacy": "przedszkole-100-poznan",
  "international school of poznan": "international-school-poznan",
  "norlandia przedszkole poznań": "norlandia-poznan",
  "norlandia przedszkole poznan": "norlandia-poznan",
  "harmonia montessori": "harmonia-montessori-poznan",
  "przedszkole da vinci": "da-vinci-przedszkole-poznan",
  "leonardo kindergarten poznań": "leonardo-kindergarten-poznan",
  "leonardo kindergarten poznan": "leonardo-kindergarten-poznan",
  "przedszkole kolumbus": "kolumbus-poznan",
  "bajkowy domek": "bajkowy-domek-poznan",
  "henryka sucharskiego": "sp36-poznan",
  "k.k. baczyńskiego": "sp89-poznan",
  "k.k. baczynskiego": "sp89-poznan",
  "nr 65 im. f. żwirki": "zsp5-sp65-poznan",
  "nr 65 im. f. zwirki": "zsp5-sp65-poznan",
  "nr 74 im. mikołaja kopernika": "sp74-poznan",
  "nr 74 im. mikolaja kopernika": "sp74-poznan",
  "15 pułku ułanów poznańskich": "sp77-poznan",
  "15 pulku ulanow poznanskich": "sp77-poznan",
  "prof. wiktora degi": "sp78-poznan",
  "oddziałami sportowymi nr 1": "zsos1-poznan",
  "oddzialami sportowymi nr 1": "zsos1-poznan",
  "mistrzostwa sportowego nr 2": "zsms2-poznan",
  "poznań british international school": "poznan-bis",
  "poznan british international school": "poznan-bis",
  "primary school da vinci": "da-vinci-sp-poznan",
  "harmonia prywatna szkoła podstawowa montessori": "harmonia-sp-montessori-poznan",
  "harmonia prywatna szkola podstawowa montessori": "harmonia-sp-montessori-poznan",
  "bilingual polish-english private primary school": "britannica-poznan",
  "spark academy": "spark-academy-poznan",
  "gaudium et studium": "gaudium-et-studium-poznan",
  "szkoła mieszko": "mieszko-poznan",
  "szkola mieszko": "mieszko-poznan",
  "króla dawida": "krola-dawida-poznan",
  "krola dawida": "krola-dawida-poznan",
  "otwarte drzwi": "otwarte-drzwi-poznan",
  "easy polish": "easy-polish-poznan",
  "active study": "active-study-poznan",
  "kontakt centrum języków obcych": "kontakt-cjo-poznan",
  "kontakt centrum jezykow obcych": "kontakt-cjo-poznan",
  "miła szkoła językowa": "mila-szkola-jezykowa-poznan",
  "mila szkola jezykowa": "mila-szkola-jezykowa-poznan",
  "enjoy language school": "enjoy-language-school-poznan",
  "alfa direct": "alfa-direct-poznan",
  "klucz do polskiego": "klucz-do-polskiego-poznan",
  "perfect kursy językowe": "perfect-kursy-poznan",
  "perfect kursy jezykowe": "perfect-kursy-poznan",
  profilingua: "profilingua-poznan",
  "leader school": "leader-school-poznan",
  "uniwersytet im. adama mickiewicza": "uam-poznan",
  "politechnika poznańska": "politechnika-poznanska",
  "politechnika poznanska": "politechnika-poznanska",
  "karola marcinkowskiego": "uniwersytet-medyczny-poznan",
  "uniwersytet ekonomiczny w poznaniu": "uniwersytet-ekonomiczny-poznan",
  "uniwersytet przyrodniczy w poznaniu": "uniwersytet-przyrodniczy-poznan",
  "magdaleny abakanowicz": "uniwersytet-artystyczny-poznan",
  "eugeniusza piaseckiego": "awf-piaseckiego-poznan",
  "ignacego jana paderewskiego": "akademia-muzyczna-paderewskiego-poznan",
  "collegium da vinci": "collegium-da-vinci-poznan",
  "wsb merito poznań": "wsb-merito-poznan",
  "wsb merito poznan": "wsb-merito-poznan",
  "swps – filia w poznaniu": "swps-poznan",
  "swps - filia w poznaniu": "swps-poznan",
  "swps poznań": "swps-poznan",
  "wyższa szkoła logistyki": "wsl-poznan",
  "wyzsza szkola logistyki": "wsl-poznan",
  "poznańska wyższa szkoła biznesu": "poznanska-wsb-poznan",
  "poznanska wyzsza szkola biznesu": "poznanska-wsb-poznan",
  "komunikacji i zarządzania": "wskiz-poznan",
  "komunikacji i zarzadzania": "wskiz-poznan",
  "samuela bogumiła lindego": "wsjo-lindego-poznan",
  "samuela bogumila lindego": "wsjo-lindego-poznan",
  "pedagogiki i administracji": "wspia-poznan",
  "edukacji i terapii": "wseit-poznan",
  "księcia mieszka i w poznaniu": "ansm-poznan",
  "ksiecia mieszka i w poznaniu": "ansm-poznan",
  "polish is my love": "polish-is-my-love-szczecin",
  "centrum języków obcych effekt": "effekt-cjo-szczecin",
  "centrum jezykow obcych effekt": "effekt-cjo-szczecin",
  "open mind": "openmind-szczecin",
  "szkoła językowa fokus": "fokus-szczecin",
  "szkola jezykowa fokus": "fokus-szczecin",
  "presto language": "presto-language-szczecin",
  "language universe": "universe-languages-szczecin",
  "angielski nie gryzie": "angielski-nie-gryzie-szczecin",
  "nr 3 „pentliczek”": "pentliczek-szczecin",
  "nr 32": "przedszkole-32-szczecin",
  "nr 51": "przedszkole-51-szczecin",
  "nr 74": "przedszkole-74-szczecin",
  "nr 54": "przedszkole-54-szczecin",
  "nr 77": "przedszkole-77-szczecin",
  "sail international": "sail-international-szczecin",
  "promyk językowo-muzyczne": "promyk-przedszkole-szczecin",
  "promyk jezykowo-muzyczne": "promyk-przedszkole-szczecin",
  "przedszkole językowe bus": "bus-przedszkole-szczecin",
  "przedszkole jezykowe bus": "bus-przedszkole-szczecin",
  "przedszkole montessori": "montessori-przedszkole-szczecin",
  "lucky surmaki": "lucky-surmaki-szczecin",
  "przedszkole bystrzaki": "bystrzaki-szczecin",
  "przedszkole zdrowia": "przedszkole-zdrowia-szczecin",
  "kolorowe kredki przedszkole niepubliczne": "kolorowe-kredki-szczecin",
  "maleńka kraina": "malenka-kraina-szczecin",
  "malenka kraina": "malenka-kraina-szczecin",
  "xiii liceum": "xiii-lo-szczecin",
  "ii liceum ogólnokształcące im. mieszka i w szczecinie": "ii-lo-mieszka-szczecin",
  "ii liceum ogolnoksztalcace im. mieszka i w szczecinie": "ii-lo-mieszka-szczecin",
  "xiv liceum": "xiv-lo-szczecin",
  "monte cassino": "ix-lo-monte-cassino-szczecin",
  "czarnieckiego": "lo-czarnieckiego-szczecin",
  "bolesława prusa": "zso4-iv-lo-prusa-szczecin",
  "boleslawa prusa": "zso4-iv-lo-prusa-szczecin",
  "szczecin international school": "sis-szczecin",
  "szkoły promyk": "promyk-szkoly-paderewskiego-szczecin",
  "szkoly promyk": "promyk-szkoly-paderewskiego-szczecin",
  "akademia sztuki w szczecinie": "akademia-sztuki-szczecin",
  "wsb merito w szczecinie": "wsb-merito-szczecin",
  "wsb merito szczecin": "wsb-merito-szczecin",
  "zachodniopomorska szkoła biznesu": "zpsb-szczecin",
  "zachodniopomorska szkola biznesu": "zpsb-szczecin",
  "collegium balticum": "collegium-balticum-szczecin",
  "administracji publicznej": "wsap-szczecin",
  "varsovia": "varsovia-szczecin",
  "integracji europejskiej": "wsie-szczecin",
  "leonarda piwoni": "leonarda-piwoni-szczecin",
  "szkoła podstawowa tak": "sp-tak-szczecin",
  "szkola podstawowa tak": "sp-tak-szczecin",
  "świętej rodziny": "swietej-rodziny-szczecin",
  "swietej rodziny": "swietej-rodziny-szczecin",
  "liceum svs": "liceum-svs-szczecin",
  "uniwersytet szczeciński": "us-szczecin",
  "uniwersytet szczecinski": "us-szczecin",
  "west pomeranian university of technology": "zut-szczecin",
  "zachodniopomorski uniwersytet technologiczny": "zut-szczecin",
  "pomeranian medical university": "pum-szczecin",
  "pomorski uniwersytet medyczny": "pum-szczecin",
  "maritime university of szczecin": "mus-szczecin",
  "akademia morska w szczecinie": "mus-szczecin",
  "linguacity": "linguacity-katowice",
  "project school": "project-school-katowice",
  "lingua house": "lingua-house-katowice",
  "business english academy": "business-english-academy-katowice",
  "hi there": "hi-there-katowice",
  "deru": "deru-katowice",
  "nr 16": "przedszkole-16-katowice",
  "nr 88": "przedszkole-88-katowice",
  "przedszkole nr 4": "przedszkole-4-katowice",
  "ps 69": "ps-69-katowice",
  "nr 39 im. tajemniczego ogrodu": "przedszkole-39-katowice",
  "international preschool": "international-preschool-katowice",
  "bajkowy dworek": "bajkowy-dworek-katowice",
  "bajka przedszkole": "bajka-katowice",
  "happy kids": "happy-kids-katowice",
  "kraina odkrywcy": "kraina-odkrywcy-katowice",
  "plastuś": "plastus-katowice",
  "plastus": "plastus-katowice",
  "mała akademia": "mala-akademia-lekkoatletyki-katowice",
  "mala akademia": "mala-akademia-lekkoatletyki-katowice",
  "stanisława ligonia": "sp33-ligonia-katowice",
  "stanislawa ligonia": "sp33-ligonia-katowice",
  "jana twardowskiego": "sp37-twardowskiego-katowice",
  "stefana żeromskiego": "sp53-zeromskiego-katowice",
  "stefana zeromskiego": "sp53-zeromskiego-katowice",
  "nr 58 z oddziałami integracyjnymi im. marii dąbrowskiej": "sp58-dabrowskiej-katowice",
  "nr 58 z oddzialami integracyjnymi im. marii dabrowskiej": "sp58-dabrowskiej-katowice",
  "gustawa morcinka": "sp65-morcinka-katowice",
  "nr 66 im. janusza korczaka": "sp66-korczaka-katowice",
  "nr 67 im. komisji edukacji narodowej": "sp67-katowice",
  "ratowników górskich": "sp64-ratownikow-gorskich-katowice",
  "ratownikow gorskich": "sp64-ratownikow-gorskich-katowice",
  "english montessori": "english-montessori-katowice",
  "stanisława konarskiego": "sto-konarskiego-katowice",
  "stanislawa konarskiego": "sto-konarskiego-katowice",
  "zakonu pijarów": "pijarow-matki-bozej-katowice",
  "zakonu pijarow": "pijarow-matki-bozej-katowice",
  "św. jacka": "sw-jacka-katowice",
  "sw. jacka": "sw-jacka-katowice",
  "uniwersytet śląski w katowicach": "us-katowice-uniwersytet",
  "uniwersytet slaski w katowicach": "us-katowice-uniwersytet",
  "medical university of silesia": "medical-university-silesia-katowice",
  "śląski uniwersytet medyczny": "medical-university-silesia-katowice",
  "slaski uniwersytet medyczny": "medical-university-silesia-katowice",
  "university of economics in katowice": "university-economics-katowice",
  "uniwersytet ekonomiczny w katowicach": "university-economics-katowice",
  "akademia górnośląska": "akademia-gornoslaska-katowice",
  "akademia gornoslaska": "akademia-gornoslaska-katowice",
  "wsb merito university katowice": "wsb-merito-katowice",
  "wsb merito katowice": "wsb-merito-katowice",
  "uniwersytet wsb merito katowice": "wsb-merito-katowice",
  "humanitas": "humanitas-katowice",
  "akademia śląska": "akademia-slaska-katowice",
  "akademia slaska": "akademia-slaska-katowice",
  "wyższa szkoła techniczna w katowicach": "wst-katowice",
  "wyzsza szkola techniczna w katowicach": "wst-katowice",
  "akademia wsb": "akademia-wsb-katowice",
  "akademia finansów i biznesu vistula": "vistula-afib-katowice",
  "akademia finansow i biznesu vistula": "vistula-afib-katowice",
  "frajda": "frajda-krakow",
  "kraina uśmiechu": "kraina-usmiechu-krakow",
  "kraina usmiechu": "kraina-usmiechu-krakow",
  "pod gwiazdkami": "pod-gwiazdkami-krakow",
  "maplebear": "maplebear-krakow",
  "maple bear": "maplebear-krakow",
  "da vinci's international": "da-vinci-international-preschool-krakow",
  "hello kids": "hello-kids-krakow",
  "international trilingual school": "itsc-krakow",
  "pod wawelem": "pod-wawelem-krakow",
  "mali artyści": "mali-artysci-krakow",
  "mali artysci": "mali-artysci-krakow",
  "samorządowe przedszkole nr 14": "przedszkole-14-krakow",
  "samorzadowe przedszkole nr 14": "przedszkole-14-krakow",
  "samorządowe przedszkole nr 33": "przedszkole-33-krakow",
  "samorzadowe przedszkole nr 33": "przedszkole-33-krakow",
  "nr 49 im.j. brzechwy": "przedszkole-49-brzechwy-krakow",
  "nr 49 im. j. brzechwy": "przedszkole-49-brzechwy-krakow",
  "samorządowe przedszkole nr 64": "przedszkole-64-krakow",
  "samorzadowe przedszkole nr 64": "przedszkole-64-krakow",
  "na krakowską nutę": "przedszkole-151-krakow",
  "na krakowska nute": "przedszkole-151-krakow",
  "nr 151": "przedszkole-151-krakow",
};

function findEduLogo(name: string): string | null {
  const lower = name.toLowerCase();
  for (const [key, slug] of Object.entries(EDU_LOGOS)) {
    if (lower.includes(key)) return slug;
  }
  return null;
}

function EduAvatar({ name, icon }: { name: string; icon: ReactNode }) {
  const slug = findEduLogo(name);
  const [failed, setFailed] = useState(false);

  if (slug && !failed) {
    return (
      <span className="flex h-[38px] w-[38px] flex-shrink-0 items-center justify-center rounded-xl bg-white/95 p-1">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={`/images/logos/education/${slug}.png`}
          alt={name}
          className="h-full w-full object-contain"
          onError={() => setFailed(true)}
        />
      </span>
    );
  }
  return <span className={iconBadgeClass}>{icon}</span>;
}

const TAB_ICONS: Record<TabId, ReactNode> = {
  courses: (
    <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.75}>
      <circle cx="12" cy="12" r="9" />
      <path strokeLinecap="round" strokeLinejoin="round" d="M3 12h18M12 3c2.5 2.7 4 6 4 9s-1.5 6.3-4 9c-2.5-2.7-4-6-4-9s1.5-6.3 4-9z" />
    </svg>
  ),
  schools: (
    <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.75}>
      <rect x="4" y="3" width="16" height="18" rx="1" />
      <path strokeLinecap="round" strokeLinejoin="round" d="M9 21v-4a1 1 0 011-1h4a1 1 0 011 1v4M8 7h1m-1 4h1m6-4h1m-1 4h1" />
    </svg>
  ),
  kindergartens: (
    <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.75}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 20.5s-7.5-4.6-9.5-9.1C1.2 8.1 3 5 6.2 5c1.9 0 3.3 1 4.3 2.4C11.5 6 12.9 5 14.8 5 18 5 19.8 8.1 18.5 11.4 16.5 15.9 12 20.5 12 20.5z" />
    </svg>
  ),
  universities: (
    <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.75}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 3L2 8l10 5 10-5-10-5z" />
      <path strokeLinecap="round" strokeLinejoin="round" d="M6 10.5V16c0 1.5 2.7 3 6 3s6-1.5 6-3v-5.5" />
      <path strokeLinecap="round" strokeLinejoin="round" d="M22 8v6" />
    </svg>
  ),
};

const SPARKLE_ICON = (
  <svg className="h-3.5 w-3.5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.75}>
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09zM18.259 8.715L18 9.75l-.259-1.035a2.25 2.25 0 00-1.632-1.632L15 6.75l1.035-.259a2.25 2.25 0 001.632-1.632L18 3.75l.259 1.035a2.25 2.25 0 001.632 1.632L21 6.75l-1.035.259a2.25 2.25 0 00-1.632 1.632z"
    />
  </svg>
);


type EducationSearchResult = {
  tab: TabId | null;
  ownership: "государственный" | "частный" | null;
  keywords: string[];
  reply: string;
};

function OwnershipBadge({ ownership, t }: { ownership: string | null; t: Dictionary }) {
  if (!ownership) return null;
  return ownership === "государственный" ? (
    <span className="inline-flex flex-shrink-0 items-center rounded-full bg-white/10 px-2.5 py-1 text-[11px] font-semibold text-[#9fb0e8]">
      {t.education.publicBadge}
    </span>
  ) : (
    <span className="inline-flex flex-shrink-0 items-center rounded-full bg-amber-500/15 px-2.5 py-1 text-[11px] font-semibold text-amber-300">
      {t.education.privateBadge}
    </span>
  );
}

function InfoRow({ label, value, showCurrencyHint }: { label: string; value: string; showCurrencyHint?: boolean }) {
  return (
    <div className="text-xs">
      <p className="flex items-center gap-1 text-white/40">
        {label}
        {showCurrencyHint && <CurrencyHint />}
      </p>
      <p className="mt-0.5 text-white/70">{value}</p>
    </div>
  );
}

function EduCard({ row, icon }: { row: EduRow; icon: ReactNode }) {
  const router = useRouter();
  const { currency, rates } = useCurrency();
  const { t, lang } = useLanguage();
  const ed = t.education;
  const [open, setOpen] = useState(false);
  const cost = convertPlnText(row.cost, currency, rates);
  const chosenCount = formatChosenCount(getChosenCount(row.id), lang);
  const notes = [...(row.highlights ?? []), ...(row.features ?? [])];
  const subtitleParts = [row.audience, row.languages && row.languages.length > 0 ? row.languages.join(", ") : null].filter(
    Boolean
  );

  function askAi() {
    const question = ed.askAiQuestionTemplate.replace("{name}", row.name).replace("{city}", row.city);
    router.push(`/dashboard/ai?q=${encodeURIComponent(question)}`);
  }

  return (
    <div className="group relative flex flex-col rounded-[28px] bg-[#1c1f26] p-6 transition-[transform,box-shadow,background-color] duration-300 ease-[var(--ease-out-strong)] [@media(hover:hover)_and_(pointer:fine)]:hover:-translate-y-1 [@media(hover:hover)_and_(pointer:fine)]:hover:bg-[#20242d] [@media(hover:hover)_and_(pointer:fine)]:hover:shadow-[0_16px_36px_-14px_rgba(33,85,212,0.4)] motion-reduce:transition-none">
      <button
        type="button"
        onClick={() => setOpen((prev) => !prev)}
        aria-expanded={open}
        className="flex w-full flex-1 flex-col items-start gap-4 text-left"
      >
        <div className="flex w-full items-center justify-between gap-2">
          <EduAvatar name={row.name} icon={icon} />
          <OwnershipBadge ownership={row.ownership} t={t} />
        </div>

        <div>
          <p className="text-[19px] font-bold leading-tight text-white">{row.name}</p>
          <div className="mt-1.5 flex items-center gap-1.5">
            <p className="text-sm font-medium text-accent-bright/70">{cost || ed.priceOnRequestText}</p>
            <CurrencyHint />
          </div>
          {subtitleParts.length > 0 && <p className="mt-2 text-xs text-white/50">{subtitleParts.join(" · ")}</p>}
          <p className="mt-2 flex items-center gap-1.5 text-[11px] text-white/40">
            <svg className="h-3 w-3 flex-shrink-0" viewBox="0 0 20 20" fill="currentColor">
              <path d="M10 2a4 4 0 100 8 4 4 0 000-8zM2 17a8 8 0 1116 0H2z" />
            </svg>
            {t.common.chosenByCountTemplate.replace("{n}", chosenCount)}
          </p>
        </div>

        {row.programs && row.programs.length > 0 && (
          <div className="flex flex-wrap gap-1.5">
            {row.programs.slice(0, 3).map((p) => (
              <span key={p} className="rounded-lg bg-white/[0.06] px-2.5 py-1 text-[11px] text-white/60">
                {p}
              </span>
            ))}
            {row.programs.length > 3 && (
              <span className="rounded-lg bg-white/[0.06] px-2.5 py-1 text-[11px] text-white/60">
                +{row.programs.length - 3}
              </span>
            )}
          </div>
        )}
      </button>

      <div className="mt-4 flex gap-2">
        <button
          type="button"
          onClick={() => setOpen((prev) => !prev)}
          className="flex-1 rounded-2xl bg-white/10 py-3 text-[13px] font-bold text-white transition-colors duration-150 hover:bg-accent"
        >
          {open ? t.dashboard.collapseBtn : ed.learnMore}
        </button>
        <button
          type="button"
          onClick={askAi}
          aria-label={ed.askAiAriaTemplate.replace("{name}", row.name)}
          className="flex flex-1 items-center justify-center gap-1.5 rounded-2xl bg-white/10 py-3 text-[13px] font-bold text-white transition-colors duration-150 hover:bg-accent"
        >
          {SPARKLE_ICON}
          {ed.askAiBtn}
        </button>
      </div>

      {open && (
        <div className="mt-4 space-y-4 border-t border-white/10 pt-4">
          {row.address && (
            <div>
              <InfoRow label={ed.addressLabel} value={row.address} />
              <a
                href={buildGoogleMapsUrl([row.address, row.city, "Poland"])}
                target="_blank"
                rel="noopener noreferrer"
                onClick={(event) => event.stopPropagation()}
                className="mt-2 inline-flex items-center gap-1 text-xs font-semibold text-accent-bright hover:underline"
              >
                {ed.showOnMapBtn}
              </a>
            </div>
          )}

          <div className="grid gap-3 sm:grid-cols-2">
            {row.audience && <InfoRow label={ed.forWhomLabel} value={row.audience} />}
            {row.languages && row.languages.length > 0 && <InfoRow label={ed.languageLabel} value={row.languages.join(", ")} />}
            {row.schedule && <InfoRow label={ed.scheduleLabel} value={row.schedule} />}
            {cost && <InfoRow label={ed.costLabel} value={cost} showCurrencyHint />}
          </div>

          {row.required_docs && row.required_docs.length > 0 && (
            <p className="text-xs leading-relaxed text-white/60">
              <span className="font-semibold text-white/80">{ed.documentsLabel}</span>
              {row.required_docs.join("; ")}
            </p>
          )}

          {notes.length > 0 && (
            <p className="rounded-xl bg-white/[0.05] px-3 py-2 text-xs leading-relaxed text-white/60">
              {notes.join(" · ")}
            </p>
          )}

          <button
            type="button"
            onClick={() => setOpen(false)}
            className="flex w-full items-center justify-center gap-1.5 border-t border-white/10 pt-3 text-xs font-semibold text-white/40 transition-colors duration-150 hover:text-white/80"
          >
            {t.dashboard.collapseBtn}
            <svg className="h-3.5 w-3.5 rotate-180" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
            </svg>
          </button>
        </div>
      )}
    </div>
  );
}

export default function EducationPage() {
  const router = useRouter();
  const { t, lang } = useLanguage();
  const { profile } = useAuth();
  const [city, setCity] = useSelectedCity(profile?.city);
  const [rows, setRows] = useState<EduRow[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<TabId>("universities");
  const [filter, setFilter] = useState<FilterId>("all");
  const [search, setSearch] = useState("");
  const [aiQuery, setAiQuery] = useState("");
  const [aiLoading, setAiLoading] = useState(false);
  const [aiResult, setAiResult] = useState<EducationSearchResult | null>(null);

  useEffect(() => {
    let active = true;
    setLoading(true);
    supabase
      .from("education")
      .select("*")
      .eq("city", city)
      .then(({ data }) => {
        if (!active) return;
        setRows((data as EduRow[]) ?? []);
        setAiQuery("");
        setAiResult(null);
        setLoading(false);
      });
    return () => {
      active = false;
    };
  }, [city]);

  function handleTabChange(tab: TabId) {
    setActiveTab(tab);
    setFilter("all");
  }

  const items = useMemo(() => {
    const wantedType = TYPE_BY_TAB[activeTab];
    const term = search.trim().toLowerCase();
    const aiKeywords = (aiResult?.keywords ?? []).map((k) => k.toLowerCase()).filter(Boolean);

    return rows.filter((r) => {
      if (r.type !== wantedType) return false;
      if (filter !== "all" && r.ownership !== filter) return false;
      if (term && !r.name.toLowerCase().includes(term)) return false;

      if (aiKeywords.length > 0) {
        const haystack = [
          r.audience ?? "",
          ...(r.languages ?? []),
          ...(r.programs ?? []),
          ...(r.highlights ?? []),
          ...(r.features ?? []),
        ]
          .join(" ")
          .toLowerCase();
        const matchesAi = aiKeywords.some((k) => haystack.includes(k));
        if (!matchesAi) return false;
      }

      return true;
    });
  }, [rows, activeTab, filter, search, aiResult]);

  async function handleAiSearch() {
    const query = aiQuery.trim();
    if (!query || aiLoading) return;
    setAiLoading(true);
    try {
      const response = await fetch("/api/education-search", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ query, language: lang }),
      });
      const result = (await response.json()) as EducationSearchResult;
      setAiResult(result);
      if (result.tab) setActiveTab(result.tab);
      setFilter(result.ownership ?? "all");
    } catch (err) {
      console.error("AI education search failed:", err);
    } finally {
      setAiLoading(false);
    }
  }

  function resetAiSearch() {
    setAiQuery("");
    setAiResult(null);
    setFilter("all");
  }

  const TABS: { id: TabId; label: string }[] = [
    { id: "universities", label: t.education.universitiesTab },
    { id: "schools", label: t.education.schoolsTab },
    { id: "kindergartens", label: t.education.kindergartensTab },
    { id: "courses", label: t.education.coursesTab },
  ];

  return (
    <div className="px-6 py-8 lg:px-10 lg:py-10">
      <PageHeader
        title={
          <span className="inline-flex items-center gap-3">
            {t.education.title}
            <Image src={getFlagUrl("pl", "md")} alt="Poland" width={32} height={24} className="rounded-sm" unoptimized />
          </span>
        }
        subtitle={t.education.subtitle}
      />

      {/* Tab bar + city selector, on the same row */}
      <div className="mt-6 flex flex-wrap items-center justify-between gap-3">
        <div className="flex flex-wrap gap-2">
          {TABS.map((tab) => (
            <button
              key={tab.id}
              type="button"
              onClick={() => handleTabChange(tab.id)}
              className={`flex-shrink-0 rounded-full px-4 py-2 text-sm font-semibold transition-colors duration-150 ${
                activeTab === tab.id ? "bg-accent text-white" : "bg-[#1c1f26] text-white/50 hover:text-white/80"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
        <CitySelect value={city} onChange={setCity} label={t.common.cityLabel} />
      </div>

      <div className="mt-4 rounded-[28px] bg-[#1c1f26] p-4 sm:p-5">
        <div className="flex items-start gap-3">
          <span className="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-xl bg-accent/15 text-accent-bright">
            {SPARKLE_ICON}
          </span>
          <div className="min-w-0 flex-1">
            <p className="text-sm font-semibold text-white">{t.education.aiPickHeading}</p>
            <p className="mt-0.5 text-xs text-white/50">{t.education.aiPickSubtitle}</p>
            <div className="mt-3 flex flex-col gap-2 sm:flex-row">
              <input
                value={aiQuery}
                onChange={(e) => setAiQuery(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") handleAiSearch();
                }}
                placeholder={t.education.aiPickPlaceholder}
                className="flex-1 rounded-xl border border-border-strong bg-surface-1 px-4 py-2.5 text-sm text-text-primary placeholder:text-text-muted focus:border-accent focus:outline-none"
              />
              <button
                type="button"
                onClick={handleAiSearch}
                disabled={aiLoading || !aiQuery.trim()}
                className="rounded-xl bg-accent px-5 py-2.5 text-sm font-semibold text-white transition-colors duration-150 hover:bg-accent-bright disabled:cursor-not-allowed disabled:opacity-50"
              >
                {aiLoading ? t.education.findingBtn : t.education.findBtn}
              </button>
            </div>
            {aiResult && (
              <div className="mt-3 flex flex-wrap items-center gap-3 rounded-xl bg-white/[0.05] px-4 py-2.5">
                <span className="text-xs text-white/70">{aiResult.reply}</span>
                <button
                  type="button"
                  onClick={resetAiSearch}
                  className="ml-auto flex-shrink-0 text-xs font-semibold text-accent-bright transition-colors duration-150 hover:text-white"
                >
                  {t.education.resetBtn}
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="mt-3 max-w-sm">
        <input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder={t.education.searchByNamePlaceholder}
          className="w-full rounded-full border border-border-strong bg-surface-1 px-4 py-2 text-sm text-text-primary placeholder:text-text-muted focus:border-accent focus:outline-none"
        />
      </div>

      {/* Filter pills (hidden for courses, which have no ownership split) */}
      {activeTab !== "courses" && (
        <div className="mt-3 flex flex-wrap gap-2">
          {(
            [
              { id: "all", label: t.education.filterAll },
              { id: "государственный", label: t.education.filterPublic },
              { id: "частный", label: t.education.filterPrivate },
            ] as { id: FilterId; label: string }[]
          ).map((f) => (
            <button
              key={f.id}
              type="button"
              onClick={() => setFilter(f.id)}
              className={`rounded-full border px-4 py-1.5 text-xs font-semibold transition-colors duration-150 ${
                filter === f.id
                  ? "border-accent bg-accent/15 text-accent-bright"
                  : "border-border-strong bg-surface-1 text-text-muted hover:border-border-strong hover:text-text-primary"
              }`}
            >
              {f.label}
            </button>
          ))}
        </div>
      )}

      {/* items-start (not items-stretch) below: each card's "Подробнее"
          panel can have wildly different amounts of content (programs,
          docs, notes), so forcing every card in a row to match the tallest
          one just left short cards with a big empty gap at the bottom --
          letting each size to its own content looks proportional. */}
      <div className="mt-6">
        {loading ? (
          <p className="py-14 text-center text-sm text-text-muted">{t.guideCard.loading}</p>
        ) : items.length > 0 ? (
          <div className="grid items-start gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {items.map((row, i) => (
              <Reveal key={row.id} delay={i * 40}>
                <EduCard row={row} icon={TAB_ICONS[activeTab]} />
              </Reveal>
            ))}
          </div>
        ) : (
          <p className="py-14 text-center text-sm text-text-muted">{t.education.emptyState}</p>
        )}
      </div>

      <Reveal delay={100} className="mt-10">
        <div className="rounded-[28px] bg-[#1c1f26] p-6">
          <div className="flex items-center gap-2.5">
            <span className="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-xl bg-accent/15 text-accent-bright">
              {SPARKLE_ICON}
            </span>
            <p className="text-[15px] font-bold text-white">{t.education.needHelpHeading}</p>
          </div>
          <div className="mt-4 flex flex-wrap gap-2">
            {t.education.tabQuestions[activeTab].map((q) => (
              <button
                key={q}
                type="button"
                onClick={() => router.push(`/dashboard/ai?q=${encodeURIComponent(q)}`)}
                className="rounded-full bg-white/[0.06] px-3.5 py-2.5 text-[13px] text-white/70 transition-colors duration-150 hover:bg-accent hover:text-white"
              >
                {q} →
              </button>
            ))}
          </div>
          <p className="mt-3.5 text-xs text-white/40">{t.education.clickHintText}</p>
        </div>
      </Reveal>
    </div>
  );
}
