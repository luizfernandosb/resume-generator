import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import React, { useState } from "react";
import { ResumeSection } from "../ResumePreviewSection";
import {
  FormDataProps,
  initialValueFormData,
  TEducation,
  TExperience,
  TLanguage,
} from "./types";
import { SelectEducationItem } from "./SelectEducationItem";
import { SelectionLanguageItem } from "./SelectLanguageItem";
import { EducationTypeList } from "./SelectEductionItemList";
import { LanguageList, LevelList } from "./SelectLanguageType";

export const FormSection = () => {
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
  };

  const generateResume = async () => {
    const element = document.getElementById("resume");
    if (!element) return;
    if (!formData) return;

    const canvas = await html2canvas(element, { scale: 2 });
    const imgData = canvas.toDataURL("resume/png");

    const pdf = new jsPDF("p", "mm", "a4");

    const pdfWidth = pdf.internal.pageSize.getWidth();
    const pdfHeigth = (canvas.height * pdfWidth) / canvas.width;

    pdf.addImage(imgData, "PNG", 0, 0, pdfWidth, pdfHeigth);

    pdf.save(formData.fullname);
    setFormData(initialValueFormData);
  };

  return (
    <section className="flex">
      <form className="gap-2 flex flex-col py-4 px-2 h" onSubmit={handleSubmit}>
        <Label htmlFor="fullname">Nome Completo</Label>
        <Input
          placeholder="Nome Completo"
          name="fullname"
          className="w-full max-w-[20rem]"
          onChange={handleOnChange}
        />
        <Label htmlFor="position">Cargo desejado</Label>
        <Input
          placeholder="Cargo desejado"
          name="position"
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
            {EducationTypeList.map((item, index: number) => (
              <SelectEducationItem
                value={item.name}
                key={index}
                content={item.name}
              />
            ))}
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
            {LanguageList.map((item, index) => (
              <SelectionLanguageItem
                key={index}
                content={item.name}
                value={item.name}
              />
            ))}
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
            {LevelList.map((item, index) => (
              <SelectionLanguageItem
                key={index}
                content={item.name}
                value={item.name}
              />
            ))}
          </SelectContent>
        </Select>
        <Button onClick={handleLanguage}>Adicionar Idioma</Button>
        <Button className="w-full max-w-[20rem]" onClick={generateResume}>
          Gerar Curriculo{" "}
        </Button>
      </form>
      <ResumeSection formData={formData} />
    </section>
  );
};
