import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import React, { useState } from "react";

type FormDataProps = {
  fullname: string;
  adress: string;
  email: string;
  phonenumber: string;
  github: string;
  linkedin: string;
  portfolio: string;
  perfil: string;
  attributes: string;
  education: TEducation[];
  courses: string[];
  experience: TExperience[];
  language: TLanguage[];
};

type TLanguage = {
  language: string;
  level: string;
};

type TExperience = {
  enterprise: string;
  position: string;
  startDate: string;
  endDate: string;
};

type TEducation = {
  course: string;
  institution: string;
  startDate: string;
  endDate: string;
  type: string;
};

const initialValueFormData: FormDataProps = {
  adress: "Rua Exemplo, 10",
  attributes:
    "HTML5, CSS3, Javascript,Typescrip, ReactJS, Tailwind CSS, Node.js,Express, Prisma, MongoDB e PostgreSQL.",
  education: [
    {
      course: "",
      endDate: "",
      institution: "",
      startDate: "",
      type: "",
    },
  ],
  courses: [""],
  email: "exemplo@gmail.com",
  fullname: "Luiz Fernando S. Bezerra",
  github: "https://github.com/luizfernandosb/",
  language: [
    {
      language: "",
      level: "",
    },
  ],
  linkedin: "https://linkedin.com/in/luizfsb",
  perfil:
    "Tenho facilidade de adaptação em diversos ambientes, boa comunicação, facilidade de aprendizado e, desde que conheci o mundo da programação, busco novos conhecimentos constantemente. Tenho desenvolvido diversos projetos para colocar todo o meu conhecimento em prática. Atualmente, estou estudando por meio de cursos e documentações, além de estar cursando Gestão de Tecnologia da Informação.",
  phonenumber: "+55(32)99999-9999",
  portfolio: "https://github.com/luizfernandosb/luizfernando-portfolio",
  experience: [
    {
      enterprise: "",
      position: "",
      startDate: "",
      endDate: "",
    },
  ],
};
export default function App() {
  const [formData, setFormData] = useState<FormDataProps>(initialValueFormData);
  const [course, setCourse] = useState<string>("");
  const [isExperience, setIsExperience] = useState<TExperience>({
    enterprise: "",
    position: "",
    startDate: "",
    endDate: "",
  });
  const [isEducation, setIsEducation] = useState<TEducation>({
    course: "",
    endDate: "",
    institution: "",
    startDate: "",
    type: "",
  });
  const [isLanguage, setIsLanguage] = useState<TLanguage>({
    language: "",
    level: "",
  });

  const handleOnChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    const name = event.target.name;
    setFormData({ ...formData, [name]: value });
  };

  const handleAddCourse = () => {
    if (!course) return;

    setFormData({ ...formData, courses: [...formData.courses, course] });
    setCourse("");
  };

  const handleExperience = () => {
    if (!isExperience) return;

    setFormData({
      ...formData,
      experience: [...formData.experience, isExperience],
    });
    console.log(formData);
    setIsExperience({
      enterprise: "",
      position: "",
      startDate: "",
      endDate: "",
    });
  };

  const handleEducation = () => {
    if (!isEducation) return;

    setFormData({
      ...formData,
      education: [...formData.education, isEducation],
    });

    console.log(isEducation);

    setIsEducation({
      course: "",
      endDate: "",
      institution: "",
      startDate: "",
      type: "",
    });
  };

  const handleLanguage = () => {
    if (!isLanguage) return;

    setFormData({ ...formData, language: [...formData.language, isLanguage] });
    console.log(formData);
    setIsLanguage({
      language: "",
      level: "",
    });
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    console.log(formData);
  };

  const generateResume = async () => {
    const element = document.getElementById("resume");
    if (!element) return;

    const canvas = await html2canvas(element, { scale: 2 });
    const imgData = canvas.toDataURL("resume/png");

    const pdf = new jsPDF("p", "mm", "a4");

    const pdfWidth = pdf.internal.pageSize.getWidth();
    const pdfHeigth = (canvas.height * pdfWidth) / canvas.width;

    pdf.addImage(imgData, "PNG", 0, 0, pdfWidth, pdfHeigth);

    pdf.save("curriculo.pdf");
  };

  return (
    <main className="bg-stone-700 text-white flex">
      <form className="gap-2 flex flex-col" onSubmit={handleSubmit}>
        <Label htmlFor="fullname">Nome Completo</Label>
        <Input
          placeholder="Nome Completo"
          name="fullname"
          className="w-full max-w-[20rem]"
          onChange={handleOnChange}
        />

        <Label htmlFor="adress">Endereço</Label>
        <Input
          placeholder="R. Exemplo, 1 - Bairro, Cidade/Estado"
          name="adress"
          className="w-full max-w-[20rem]"
          onChange={handleOnChange}
        />

        <Label htmlFor="email">E-mail</Label>
        <Input
          placeholder="exemplo@exemplo.com"
          name="email"
          className="w-full max-w-[20rem]"
          onChange={handleOnChange}
        />

        <Label htmlFor="phonenumber">Telefone para contato</Label>
        <Input
          placeholder="+55(00)99999-9999"
          name="phonenumber"
          className="w-full max-w-[20rem]"
          onChange={handleOnChange}
        />
        <Label htmlFor="links">Links</Label>
        <Input
          placeholder="LinkedIn"
          name="linkedin"
          className="w-full max-w-[20rem]"
          onChange={handleOnChange}
        />
        <Input
          placeholder="GitHub"
          name="github"
          className="w-full max-w-[20rem]"
          onChange={handleOnChange}
        />
        <Input
          placeholder="Portfólio"
          name="portfolio"
          className="w-full max-w-[20rem]"
          onChange={handleOnChange}
        />

        <Label htmlFor="perfil">Perfil Profissional</Label>
        <Input
          placeholder="Perfil Profissional"
          name="perfil"
          className="w-full max-w-[20rem]"
          onChange={handleOnChange}
        />

        <Label htmlFor="attributes">Tecnologias/Habilidades</Label>
        <Input
          placeholder="Tecnologias/Habilidades"
          name="attributes"
          className="w-full max-w-[20rem]"
          onChange={handleOnChange}
        />
        <Label htmlFor="education">Formação</Label>
        <Input
          placeholder="Curso"
          value={isEducation.course}
          onChange={(e) =>
            setIsEducation({ ...isEducation, course: e.target.value })
          }
          name="education"
          className="w-full max-w-[20rem]"
        />
        <Input
          placeholder="Instituição"
          value={isEducation.institution}
          onChange={(e) =>
            setIsEducation({ ...isEducation, institution: e.target.value })
          }
          name="education"
          className="w-full max-w-[20rem]"
        />
        <Input
          type="date"
          placeholder="Inicio"
          value={isEducation.startDate}
          name="education"
          onChange={(e) =>
            setIsEducation({ ...isEducation, startDate: e.target.value })
          }
          className="w-full max-w-[20rem]"
        />
        <Input
          type="date"
          placeholder="Fim"
          value={isEducation.endDate}
          onChange={(e) =>
            setIsEducation({ ...isEducation, endDate: e.target.value })
          }
          name="education"
          className="w-full max-w-[20rem]"
        />
        <Select
          value={isEducation.type}
          name="CourseType"
          onValueChange={(event: string) =>
            setIsEducation({ ...isEducation, type: event })
          }
        >
          <SelectTrigger className="w-[20rem]">
            <SelectValue placeholder="Tipo de formação" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="tecnico">Técnico</SelectItem>
            <SelectItem value="tecnologico">Tecnológico</SelectItem>
            <SelectItem value="bacharelado">Bacharelado</SelectItem>
            <SelectItem value="licenciatura">Licenciatura</SelectItem>
            <SelectItem value="pos-lato">
              Pós-graduação Lato Sensu (Especialização)
            </SelectItem>
            <SelectItem value="pos-stricto">
              Pós-graduação Stricto Sensu (Mestrado, Doutorado)
            </SelectItem>
            <SelectItem value="livre">Curso Livre</SelectItem>
            <SelectItem value="extensao">Curso de Extensão</SelectItem>
            <SelectItem value="mba">
              MBA (Master in Business Administration)
            </SelectItem>
            <SelectItem value="sequencial">Sequencial</SelectItem>
          </SelectContent>
        </Select>
        <Button onClick={handleEducation}>Adicionar Formação</Button>

        <Label htmlFor="courses">Cursos e Qualificações Complementares</Label>
        <Input
          placeholder="Curso"
          name="courses"
          className="w-full max-w-[20rem]"
          value={course}
          onChange={(e) => setCourse(e.target.value)}
        />
        <Button onClick={handleAddCourse}>Adicionar Curso</Button>

        <Label htmlFor="experiencie">Experiência</Label>
        <Input
          placeholder="Empresa"
          name="experience"
          className="w-full max-w-[20rem]"
          value={isExperience.enterprise}
          onChange={(e) =>
            setIsExperience({ ...isExperience, enterprise: e.target.value })
          }
        />
        <Input
          placeholder="Cargo"
          name="experience"
          className="w-full max-w-[20rem]"
          value={isExperience.position}
          onChange={(e) =>
            setIsExperience({ ...isExperience, position: e.target.value })
          }
        />
        <Input
          type="date"
          placeholder="start"
          name="experience"
          className="w-full max-w-[20rem]"
          value={isExperience.startDate}
          onChange={(e) =>
            setIsExperience({ ...isExperience, startDate: e.target.value })
          }
        />
        <Input
          type="date"
          placeholder="end"
          name="experience"
          className="w-full max-w-[20rem]"
          value={isExperience.endDate}
          onChange={(e) =>
            setIsExperience({ ...isExperience, endDate: e.target.value })
          }
        />
        <Button onClick={handleExperience}>Adicionar Experiência</Button>

        <Label htmlFor="language">Idioma</Label>
        <Select
          name="language"
          value={isLanguage.language}
          onValueChange={(event: string) =>
            setIsLanguage({ ...isLanguage, language: event })
          }
        >
          <SelectTrigger className="w-[20rem]">
            <SelectValue placeholder="Idioma" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="Inglês">Inglês</SelectItem>
            <SelectItem value="Espanhol">Espanhol</SelectItem>
            <SelectItem value="Português">Português</SelectItem>
          </SelectContent>
        </Select>
        <Select
          name="level"
          value={isLanguage.level}
          onValueChange={(event: string) =>
            setIsLanguage({ ...isLanguage, level: event })
          }
        >
          <SelectTrigger className="w-[20rem]">
            <SelectValue placeholder="Nível" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="Básico">Básico</SelectItem>
            <SelectItem value="Intermediário">Intermediário</SelectItem>
            <SelectItem value="Avançado">Avançado</SelectItem>
          </SelectContent>
        </Select>
        <Button onClick={handleLanguage}>Adicionar Idioma</Button>
        <Button className="w-full max-w-[20rem]" onClick={generateResume}>
          Gerar Curriculo{" "}
        </Button>
      </form>
      <div className="bg-white text-black text-[1.2rem]" id="resume">
        {formData && (
          <div className="flex flex-col gap-5 px-5">
            <div>
              <h2 className="text-3xl font-bold">{formData.fullname}</h2>
              <p className="text-2xl">Desenvolvedor Front-end</p>
            </div>
            <div className="flex flex-col items-end">
              <p> {formData.adress}</p>
              <p> {formData.email}</p>
              <p>{formData.phonenumber}</p>
            </div>
            <div className="font-bold">
              <p>
                {" "}
                Portfólio:{" "}
                <span className="font-normal">{formData.portfolio}</span>
              </p>
              <p>
                LinkedIn:{" "}
                <span className="font-normal">{formData.linkedin}</span>
              </p>
              <p>
                GitHub: <span className="font-normal">{formData.github}</span>
              </p>
            </div>
            <span className="h-[1px] w-full bg-black"></span>
            <div>
              <h2 className="text-2xl font-bold uppercase">
                Perfil Profissional
              </h2>
              <p>{formData.perfil}</p>
            </div>
            <span className="h-[1px] w-full bg-black"></span>
            <div>
              <h2 className="text-2xl font-bold uppercase">Qualificações</h2>
              <p> {formData.attributes}</p>
            </div>
            <span className="h-[1px] w-full bg-black"></span>
            <div>
              <h2 className="text-2xl font-bold uppercase">formação</h2>
              <div className="flex flex-col gap-5">
                {formData.education.map((item, index) => (
                  <div key={index}>
                    <p className="font-bold">{item.institution}</p>
                    <p>{item.course}</p>
                    <p>
                      {item.startDate} {!item.startDate ? "" : "-"}{" "}
                      {item.endDate}
                    </p>
                    <p>{item.type}</p>
                  </div>
                ))}
              </div>
            </div>
            <span className="h-[1px] w-full bg-black"></span>
            <div>
              <h2 className="text-2xl font-bold uppercase">Cursos</h2>
              <ul>
                {formData.courses.map((item, index) => (
                  <li key={index}>{!item ? "" : item}</li>
                ))}
              </ul>
            </div>
            <span className="h-[1px] w-full bg-black"></span>
            <div>
              <h2 className="text-2xl font-bold uppercase">experiência</h2>
              <div className="flex flex-col gap-5">
                {formData.experience.map((item, index) => (
                  <div key={index}>
                    <p className="font-bold">{item.enterprise}</p>
                    <p>{item.position}</p>
                    <p>
                      {item.startDate} {!item.startDate ? "" : "-"}{" "}
                      {item.endDate}
                    </p>
                  </div>
                ))}
              </div>
              <p></p>
            </div>
            <span className="h-[1px] w-full bg-black"></span>
            <div>
              <h2 className="text-2xl font-bold uppercase mb-3">Idioma</h2>
              {/* <p>{formData.language}</p> */}
              {formData.language.map((item, index) => (
                <p key={index}>
                  <strong>{item.language}</strong> {!item.language ? "" : "-"}{" "}
                  {item.level}
                </p>
              ))}
            </div>
          </div>
        )}
      </div>
    </main>
  );
}
