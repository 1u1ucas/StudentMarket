import { StudentWithRelation } from "@/types/student.type";
import { Badge } from "../ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../ui/card";
import Link from "next/link";
import Image from "next/image";

interface CardStudentProps {
  student: StudentWithRelation;
}

const CardStudent = ({ student }: CardStudentProps) => {
  // Fonction pour vérifier si l'URL est valide
  const getValidImageUrl = () => {
    try {
      // Vérifier si profilePicture existe et si l'URL est définie
      const url = student.profilePicture?.url;
      
      // Si l'URL n'existe pas ou est vide, utiliser l'image par défaut
      if (!url) return "/default-avatar.png";
      
      // Vérifier si l'URL est valide en essayant de créer un objet URL
      new URL(url);
      return url;
    } catch (error) {
      // En cas d'URL invalide, utiliser l'image par défaut
      console.warn("URL d'image invalide pour l'étudiant:", student.firstName, student.lastName);
      return "/default-avatar.png";
    }
  };

  const imageUrl = getValidImageUrl();

  return (
    <Card className="flex flex-col h-fit gap-2 w-[250px] p-0 shadow-lg rounded-2xl overflow-hidden border-2 border-transparent  transition-all">
      <CardHeader className="p-0">
        <Image
          src={imageUrl}
          alt="Student"
          width={250}
          height={140}
          className="w-full h-35 object-cover"
        />
        <div className="p-3 text-center">
          <CardTitle className="text-md font-semibold">
            {student?.firstName} {student?.lastName}
          </CardTitle>
          <CardDescription className="text-xs text-gray-500">
            {student?.school.name}
          </CardDescription>
        </div>
      </CardHeader>
      <CardContent className="px-3 pb-3">
        <div className="flex flex-wrap gap-1 mt-1">
          {student?.skills?.map((skill, index) => (
            <Badge key={index} variant="secondary">
              {skill?.name}
            </Badge>
          ))}
        </div>
      </CardContent>
      <CardFooter className="px-3 pb-3 text-center text-xs text-gray-400 flex flex-col gap-2 py-3">
        Recherche : {student?.status}
        <Link href={`/student/${student.id}`}>
          <button className="bg-blue-500 text-white px-4 py-1 rounded-md text-xs hover:bg-blue-600 transition">
            Voir le profil
          </button>
        </Link>
      </CardFooter>
    </Card>
  );
};

export default CardStudent;
