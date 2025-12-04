import prop1 from "../assets/images/prop1.webp";
import prop2 from "../assets/images/prop2.webp";
import prop3 from "../assets/images/prop3.webp";
import prop4 from "../assets/images/prop4.webp";
import prop5 from "../assets/images/prop5.webp";
import prop6 from "../assets/images/prop6.webp";
import client1 from "../assets/images/client1.png";
import client2 from "../assets/images/client2.png";
import client3 from "../assets/images/client3.png";
import client4 from "../assets/images/client4.png";
import client5 from "../assets/images/client5.png";
import client6 from "../assets/images/client6.png";
import { MdNoteAlt } from "react-icons/md";
import { FaHome, FaSearch, FaCheckDouble, FaCameraRetro } from "react-icons/fa";
import { GoPackage } from "react-icons/go";

export const property = [
  {
    images: prop1,
    address: "20 de Julio",
    name: "Casa 2 pisos",
    price: "$ 1.300.000",
    about:
      "Casa de dos pisos ubicada en una zona tranquila y segura, ideal para familias que buscan comodidad y espacio.",
    bed: 4,
    bath: 3,
    area: "75 metros",
    owner: "Alice adams",
  },
  {
    images: prop2,
    address: "Santa Lucia",
    name: "Casa con parqueadero",
    price: "$ 2.000.000",
    about:
      "Hermosa casa con parqueadero ubicada en una zona tranquila y segura, ideal para familias que buscan comodidad y espacio.",
    bed: 4,
    bath: 3,
    area: "60 metros",
    owner: "Drew Alice",
  },
  {
    images: prop3,
    address: "Teusaquillo",
    name: "Apartamento amplio",
    price: "$ 1.000.000",
    about:
      "Hermoso apartamento amplio ubicado en una zona tranquila y segura, ideal para familias que buscan comodidad y espacio.",
    bed: 4,
    bath: 3,
    area: "60 metros",
    owner: "Fursi Bam",
  },
  {
    images: prop4,
    address: "Galerias",
    name: "Apartamento moderno",
    price: "$ 950.000",
    about:
      "Hermoso apartamento moderno ubicado en una zona tranquila y segura, ideal para familias que buscan comodidad y espacio.",
    bed: 4,
    bath: 3,
    area: "53 metros",
    owner: "Neon Alice",
  },
  {
    images: prop5,
    address: "Bosa-naranjos",
    name: "Apartamento en conjunto cerrado",
    price: "$ 1.000.000",
    about:
      "Apartamento en conjunto cerrado ubicado en una zona tranquila y segura.",
    bed: 4,
    bath: 3,
    area: "52 metros",
    owner: "Firari Alice",
  },
  {
    images: prop6,
    address: "Villa del Prado",
    name: "Habitacion amoblada",
    price: "$ 650.000",
    about:
      "Hermosa habitacion amoblada ubicada en una zona tranquila y segura, ideal para familias que buscan comodidad y espacio.",
    bed: 4,
    bath: 3,
    area: "10 metros",
    owner: "Jordan Bram",
  },
];

export const Service = [
  {
    icon: MdNoteAlt,
    title: "Arrienda fácil, arrienda seguro",
    desc: "Simplificamos el proceso para que disfrutes de un arriendo sin sorpresas.",
  },
  {
    icon: FaHome,
    title: "Confianza para Propietarios y Arrendatarios",
    desc: "Unimos hogares confiables con personas confiables.",
  },
  {
    icon: GoPackage,
    title: "Tu match perfecto en vivienda",
    desc: "Donde tus necesidades encuentran su espacio.",
  },
  {
    icon: FaSearch,
    title: "Home Check",
    desc: "Tu decisión, respaldada por datos reales",
  },
  {
    icon: FaCheckDouble,
    title: "Evaluaciones & Opiniones",
    desc: "Opiniones reales para decisiones más seguras.",
  },
  {
    icon: FaCameraRetro,
    title: "Recorrido Visual",
    desc: "Fotografías que muestran exactamente lo que encontrarás.",
  },
];

export const Client = [
  {
    image: client1,
    name: "Camilo Ramirez",
    text: "Proceso de arriendo transparente",
    feedback:
      "Soy arrendatario y lo que más me gustó fue la claridad en cada paso. Desde la búsqueda hasta la firma del contrato, todo estuvo bien explicado y sin sorpresas. Me dio mucha confianza.",
  },
  {
    image: client2,
    name: "Ana Anderson",
    text: "Excelente comunicación",
    feedback:
      "Me encantó la comunicación constante con los interesados. La plataforma me permitió responder dudas fácilmente y mantener todo organizado sin perder información.",
  },
  {
    image: client3,
    name: "Martha Lopez",
    text: "Variedad de opciones",
    feedback:
      "Buscaba un apartamento en una zona específica y encontré varias alternativas que se ajustaban a mi presupuesto. La variedad de inmuebles disponibles me facilitó tomar la mejor decisión.",
  },
  {
    image: client4,
    name: "Dario Montez",
    text: "Seguridad en los pagos",
    feedback:
      "Como propietario, lo que más valoro es la seguridad en las transacciones. Los pagos de arriendo llegan puntuales y con respaldo, lo que me da tranquilidad total.",
  },
  {
    image: client5,
    name: "Alex Garcia",
    text: "Facilidad para encontrar inquilinos",
    feedback:
      "Me preocupaba el tiempo que tardaba en arrendar mi apartamento. Con esta plataforma logré encontrar inquilinos confiables en menos de una semana. Todo el proceso fue rápido y seguro.",
  },
  {
    image: client6,
    name: "Leonor Martinez",
    text: "Atención personalizada",
    feedback:
      "Soy arrendatario y me sorprendió la atención que recibí. Me ayudaron a resolver dudas sobre el contrato y me guiaron en todo el proceso. Sentí que realmente se preocupaban por mi experiencia.",
  },
];
