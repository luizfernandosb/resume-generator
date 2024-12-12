
export type TLanguage = {
  language: string;
  level: string;
};

export type TExperience = {
  enterprise: string;
  position: string;
  startDate: string;
  endDate: string;
};

export type TEducation = {
  course: string;
  institution: string;
  startDate: string;
  endDate: string;
  type: string;
};


export type FormDataProps = {
  fullname: string;
  position: string,
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

export const initialValueFormData: FormDataProps = {
  position: "",
  adress: "",
  attributes:
    "",
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
  email: "",
  fullname: "",
  github: "",
  language: [
    {
      language: "",
      level: "",
    },
  ],
  linkedin: "",
  perfil:
    "",
  phonenumber: "",
  portfolio: "",
  experience: [
    {
      enterprise: "",
      position: "",
      startDate: "",
      endDate: "",
    },
  ],
};

