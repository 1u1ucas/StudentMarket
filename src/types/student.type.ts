import {
  User,
  School,
  UploadFile,
  Skill,
  Prisma,
  EnumStatusTYpe,
} from "@prisma/client";

enum Type {
  STAGIAIRE = "Stage",
  ALTERNANT = "Alternance",
}

export interface Student {
  id: string;
  firstName: string;
  lastName: string;
  status: string | Type;
  description: string;
  isAvailable: boolean;
  userId: string | User;
  schoolId: School;
  CVId: string | UploadFile;
  profilePictureId: string | UploadFile;
  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date;
  skills: Skill[];
}

export interface GetAllParams {
  isAvailable?: boolean;
  status?: EnumStatusTYpe;
  skills?: string[];
}

export type StudentWithRelation = Prisma.StudentGetPayload<{
  include: {
    school: true;
    user: true;
    profilePicture: true;
    skills: true;
  };
}>;
