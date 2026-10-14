// Central GSAP setup — registers ScrollTrigger once for the whole app.
// All components import { gsap, ScrollTrigger } from "@/lib/gsap" instead of
// calling gsap.registerPlugin(ScrollTrigger) themselves.
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export { gsap, ScrollTrigger };
