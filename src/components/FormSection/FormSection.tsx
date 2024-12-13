import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import { Resizable } from "re-resizable";
import React, { useState, useRef } from "react";
import { ResumeSection } from "../ResumePreviewSection";
import { SelectEducationItem } from "./SelectEducationItem";
import { EducationTypeList } from "./SelectEductionItemList";
import { SelectionLanguageItem } from "./SelectLanguageItem";
import { LanguageList, LevelList } from "./SelectLanguageType";
import {
  FormDataProps,
  initialValueFormData,
  TEducation,
  TExperience,
  TLanguage,
} from "./types";

export const FormSection = () => {
  const previewRef = useRef(null)
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
  const [display, setDisplay] = useState<boolean>(false);

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
    <section className="flex flex-col w-full items-center p-12">
      <h1 className="text-3xl font-bold">Gerador de Currículo</h1>
      <form
        className="gap-4 w-3/4 flex flex-col border-2 rounded-md border-violet-700 bg-gradient-to-tl from-violet-900 to-violet-600 p-4"
        onSubmit={handleSubmit}
      >
        <fieldset className="flex flex-col gap-5 border-2 border-violet-800 p-4">
          <legend className="text-2xl">Informações pessoais</legend>
          <div className="flex gap-2">
            <div className="flex flex-col w-1/3">
              <Label htmlFor="fullname" className="text-lg">
                Nome Completo
              </Label>
              <Input
                placeholder="Nome Completo"
                name="fullname"
                className="w-full placeholder:text-neutral-300"
                onChange={handleOnChange}
              />
            </div>
            <div className="flex flex-col flex-grow">
              <Label htmlFor="position" className="text-lg">
                Cargo desejado
              </Label>
              <Input
                placeholder="Cargo desejado"
                name="position"
                className="w-full placeholder:text-neutral-300"
                onChange={handleOnChange}
              />
            </div>
          </div>
          <div className="flex gap-2">
            <div className="flex flex-col w-1/2">
              <Label htmlFor="email" className="text-lg">
                E-mail
              </Label>
              <Input
                placeholder="exemplo@exemplo.com"
                name="email"
                className="w-full placeholder:text-neutral-300"
                onChange={handleOnChange}
              />
            </div>

            <div className="flex flex-col w-1/2">
              <Label htmlFor="phonenumber" className="text-lg">
                Telefone para contato
              </Label>
              <Input
                placeholder="+55(00)99999-9999"
                name="phonenumber"
                className="w-full placeholder:text-neutral-300"
                onChange={handleOnChange}
              />
            </div>
          </div>
          <div className="flex flex-col w-full">
            <Label htmlFor="adress" className="text-lg">
              Endereço
            </Label>
            <Input
              placeholder="R. Exemplo, 1 - Bairro, Cidade/Estado"
              name="adress"
              className="w-full placeholder:text-neutral-300"
              onChange={handleOnChange}
            />
          </div>
          <div className="flex flex-col">
            <Label htmlFor="links" className="text-lg">
              Links
            </Label>
            <div className="flex w-full gap-2">
              <Input
                placeholder="LinkedIn"
                name="linkedin"
                className="w-1/3 placeholder:text-neutral-300"
                onChange={handleOnChange}
              />
              <Input
                placeholder="GitHub"
                name="github"
                className="w-1/3 placeholder:text-neutral-300"
                onChange={handleOnChange}
              />
              <Input
                placeholder="Portfólio"
                name="portfolio"
                className="w-1/3 placeholder:text-neutral-300"
                onChange={handleOnChange}
              />
            </div>
          </div>
          <div className="flex gap-2">
            <div className="flex flex-col w-1/2">
              <Label htmlFor="perfil" className="text-lg">
                Perfil Profissional
              </Label>
              <Input
                placeholder="Perfil Profissional"
                name="perfil"
                className="w-full placeholder:text-neutral-300"
                onChange={handleOnChange}
              />
            </div>

            <div className="flex flex-col w-1/2">
              <Label htmlFor="attributes" className="text-lg">
                Tecnologias/Habilidades
              </Label>
              <Input
                placeholder="Tecnologias/Habilidades"
                name="attributes"
                className="w-full placeholder:text-neutral-300"
                onChange={handleOnChange}
              />
            </div>
          </div>
        </fieldset>

        <fieldset className="flex flex-col items-center gap-5 border-2 border-violet-800 p-4">
          <legend className="text-2xl">Formações Acadêmicas</legend>
          <div className="flex gap-2 w-full">
            <div className="flex flex-col w-1/2">
              <Label htmlFor="education" className="text-lg">
                Curso
              </Label>
              <Input
                placeholder="Curso"
                value={isEducation.course}
                onChange={(e) =>
                  setIsEducation({ ...isEducation, course: e.target.value })
                }
                name="education"
                className="w-full placeholder:text-neutral-300"
              />
            </div>
            <div className="flex flex-col w-1/2">
              <Label htmlFor="education" className="text-lg">
                Instituição
              </Label>
              <Input
                placeholder="Instituição"
                value={isEducation.institution}
                onChange={(e) =>
                  setIsEducation({
                    ...isEducation,
                    institution: e.target.value,
                  })
                }
                name="education"
                className="w-full placeholder:text-neutral-300"
              />
            </div>
          </div>
          <div className="flex gap-2 w-full">
            <div className="flex flex-col w-1/3">
              <Label htmlFor="education" className="text-lg">
                Data de Inicio
              </Label>
              <Input
                type="date"
                placeholder="Inicio"
                value={isEducation.startDate}
                name="education"
                onChange={(e) =>
                  setIsEducation({ ...isEducation, startDate: e.target.value })
                }
                className="w-full"
              />
            </div>
            <div className="flex flex-col w-1/3">
              <Label htmlFor="education" className="text-lg">
                Data de Termino
              </Label>
              <Input
                type="date"
                placeholder="Fim"
                value={isEducation.endDate}
                onChange={(e) =>
                  setIsEducation({ ...isEducation, endDate: e.target.value })
                }
                name="education"
                className="w-full"
              />
            </div>
            <div className="flex flex-col w-1/3">
              <Label htmlFor="education" className="text-lg">
                Tipo de Formação
              </Label>
              <Select
                value={isEducation.type}
                name="CourseType"
                onValueChange={(event: string) =>
                  setIsEducation({ ...isEducation, type: event })
                }
              >
                <SelectTrigger className="w-full">
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
            </div>
          </div>
          <Button
            className="text-lg p-6 px-8 bg-blue-500 hover:bg-violet-600 hover:scale-105 transition-all duration-200 ease-in-out"
            onClick={handleEducation}
          >
            Adicionar Formação
          </Button>
        </fieldset>

        <fieldset className="flex flex-col items-center gap-5 border-2 border-violet-800 p-4">
          <legend className="text-2xl">Formações Complementares</legend>
          <div className="flex flex-col w-full">
            <Label htmlFor="courses" className="text-lg">
              Cursos e Qualificações Complementares
            </Label>
            <Input
              placeholder="Curso"
              name="courses"
              className="w-full placeholder:text-neutral-300"
              value={course}
              onChange={(e) => setCourse(e.target.value)}
            />
          </div>
          <Button
            className="text-lg p-6 px-8 bg-blue-500 hover:bg-violet-600 hover:scale-105 transition-all duration-200 ease-in-out"
            onClick={handleAddCourse}
          >
            Adicionar Curso
          </Button>
        </fieldset>

        <fieldset className="flex flex-col items-center gap-5 border-2 border-violet-800 p-4">
          <legend className="text-2xl">Experiências Profissionais</legend>
          <div className="flex gap-2 w-full">
            <div className="flex flex-col w-1/2">
              <Label htmlFor="experiencie" className="text-lg">
                Empresa
              </Label>
              <Input
                placeholder="Empresa"
                name="experience"
                className="w-full placeholder:text-neutral-300"
                value={isExperience.enterprise}
                onChange={(e) =>
                  setIsExperience({
                    ...isExperience,
                    enterprise: e.target.value,
                  })
                }
              />
            </div>
            <div className="flex flex-col w-1/2">
              <Label htmlFor="experiencie" className="text-lg">
                Cargo
              </Label>
              <Input
                placeholder="Cargo"
                name="experience"
                className="w-full placeholder:text-neutral-300"
                value={isExperience.position}
                onChange={(e) =>
                  setIsExperience({ ...isExperience, position: e.target.value })
                }
              />
            </div>
          </div>
          <div className="flex gap-2 w-full">
            <div className="flex flex-col w-1/2">
              <Label htmlFor="experiencie" className="text-lg">
                Data de Inicio
              </Label>
              <Input
                type="date"
                placeholder="start"
                name="experience"
                className="w-full"
                value={isExperience.startDate}
                onChange={(e) =>
                  setIsExperience({
                    ...isExperience,
                    startDate: e.target.value,
                  })
                }
              />
            </div>
            <div className="flex flex-col w-1/2">
              <Label htmlFor="experiencie" className="text-lg">
                Data de Termino
              </Label>
              <Input
                type="date"
                placeholder="end"
                name="experience"
                className="w-full"
                value={isExperience.endDate}
                onChange={(e) =>
                  setIsExperience({ ...isExperience, endDate: e.target.value })
                }
              />
            </div>
          </div>
          <Button
            className="text-lg p-6 px-8 bg-blue-500 hover:bg-violet-600 hover:scale-105 transition-all duration-200 ease-in-out"
            onClick={handleExperience}
          >
            Adicionar Experiência
          </Button>
        </fieldset>

        <fieldset className="flex flex-col items-center gap-5 border-2 border-violet-800 p-4">
          <legend className="text-2xl">Idiomas</legend>
          <div className="flex gap-2 w-full">
            <div className="flex flex-col w-1/2">
              <Label htmlFor="language" className="text-lg">
                Idioma
              </Label>
              <Select
                name="language"
                value={isLanguage.language}
                onValueChange={(event: string) =>
                  setIsLanguage({ ...isLanguage, language: event })
                }
              >
                <SelectTrigger className="">
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
            </div>
            <div className="flex flex-col w-1/2">
              <Label htmlFor="language" className="text-lg">
                Nível
              </Label>
              <Select
                name="level"
                value={isLanguage.level}
                onValueChange={(event: string) =>
                  setIsLanguage({ ...isLanguage, level: event })
                }
              >
                <SelectTrigger className="">
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
            </div>
          </div>
          <Button
            className="text-lg p-6 px-8 bg-blue-500 hover:bg-violet-600 hover:scale-105 transition-all duration-200 ease-in-out"
            onClick={handleLanguage}
          >
            Adicionar Idioma
          </Button>
        </fieldset>

        <div className="flex justify-center w-full gap-4">
          <Button
            className="text-xl p-6 px-8 bg-emerald-500 hover:bg-emerald-600 hover:scale-105 transition-all duration-200 ease-in-out"
            onClick={generateResume}
          >
            Gerar Currículo{" "}
          </Button>
          <Button
            className="text-xl p-6 px-8 bg-blue-500 hover:bg-blue-600 hover:scale-105 transition-all duration-200 ease-in-out"
            onClick={() => setDisplay(!display)}
          >
            Preview Currículo
          </Button>
        </div>
      </form>
      {display && (
        <div
          onClick={() => setDisplay(!display)}
          style={{
            position: "fixed",
            top: 0,
            bottom: 0,
            height: "100vh",
            width: "100vw",
            backgroundColor: "#00000036",
          }}
        ></div>
      )}
      <Resizable
        defaultSize={{ width: "700px", height: "650px" }}
        data-display={display}
        className="flex data-[display=false]:opacity-0 data-[display=false]:-z-10 p-2 bg-white bottom-2 right-2 border-2 border-neutral-800 rounded-md overflow-hidden"
        style={{ position: "absolute" }}
      >
        <div className="flex size-full items-center justify-center overflow-y-auto overflow-x-hidden">
          <ResumeSection formData={formData} ref={previewRef} />
        </div>
      </Resizable>
    </section>
  );
};
