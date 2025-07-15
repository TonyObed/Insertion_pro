import { Mail, Phone, MapPin } from "lucide-react"

interface CVTemplate2Props {
  data: {
    firstName: string
    lastName: string
    email: string
    phone: string
    location: string
    profilePicture?: string
    jobTitle: string
    objective: string
    skills: string[]
    experience: {
      id: string
      position: string
      company: string
      location: string
      period: string
      description: string
    }[]
    education: {
      id: string
      degree: string
      school: string
      location: string
      year: string
      description: string
    }[]
    languages: {
      id: string
      name: string
      level: string
    }[]
    certifications: {
      id: string
      name: string
      issuer: string
      year: string
    }[]
    interests: string[]
    showPhoto: boolean
    primaryColor: string
    secondaryColor: string
    fontSize: number
    sections: {
      objective: boolean
      skills: boolean
      experience: boolean
      education: boolean
      languages: boolean
      interests: boolean
      certifications: boolean
    }
  }
}

export default function CVTemplate2({ data }: CVTemplate2Props) {
  const {
    firstName,
    lastName,
    email,
    phone,
    location,
    profilePicture,
    jobTitle,
    objective,
    skills,
    experience,
    education,
    languages,
    certifications,
    interests,
    showPhoto,
    primaryColor,
    secondaryColor,
    fontSize,
    sections,
  } = data

  return (
    <div className="w-full h-full flex" style={{ fontSize: `${fontSize}rem` }}>
      {/* Sidebar */}
      <div className="w-1/3 p-6 text-gray-800" style={{ backgroundColor: secondaryColor }}>
        {/* Photo */}
        {showPhoto && (
          <div className="flex justify-center mb-6">
            <div className="h-32 w-32 rounded-full overflow-hidden border-4" style={{ borderColor: primaryColor }}>
              <img
                src={profilePicture || "/placeholder.svg?height=128&width=128"}
                alt={`${firstName} ${lastName}`}
                className="h-full w-full object-cover"
              />
            </div>
          </div>
        )}

        {/* Contact */}
        <div className="space-y-4 mb-6">
          <h2
            className="text-lg font-semibold pb-1 mb-2 border-b"
            style={{ color: primaryColor, borderColor: primaryColor }}
          >
            Contact
          </h2>
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <Mail className="h-4 w-4" style={{ color: primaryColor }} />
              <span className="text-sm">{email}</span>
            </div>
            <div className="flex items-center gap-2">
              <Phone className="h-4 w-4" style={{ color: primaryColor }} />
              <span className="text-sm">{phone}</span>
            </div>
            <div className="flex items-center gap-2">
              <MapPin className="h-4 w-4" style={{ color: primaryColor }} />
              <span className="text-sm">{location}</span>
            </div>
          </div>
        </div>

        {/* Skills */}
        {sections.skills && skills && skills.length > 0 && (
          <div className="mb-6">
            <h2
              className="text-lg font-semibold pb-1 mb-2 border-b"
              style={{ color: primaryColor, borderColor: primaryColor }}
            >
              Compétences
            </h2>
            <ul className="space-y-1">
              {skills.map((skill, index) => (
                <li key={index} className="text-sm">
                  {skill}
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Languages */}
        {sections.languages && languages && languages.length > 0 && (
          <div className="mb-6">
            <h2
              className="text-lg font-semibold pb-1 mb-2 border-b"
              style={{ color: primaryColor, borderColor: primaryColor }}
            >
              Langues
            </h2>
            <ul className="space-y-1">
              {languages.map((lang) => (
                <li key={lang.id} className="text-sm">
                  {lang.name} ({lang.level})
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Interests */}
        {sections.interests && interests && interests.length > 0 && (
          <div>
            <h2
              className="text-lg font-semibold pb-1 mb-2 border-b"
              style={{ color: primaryColor, borderColor: primaryColor }}
            >
              Centres d'intérêt
            </h2>
            <ul className="space-y-1">
              {interests.map((interest, index) => (
                <li key={index} className="text-sm">
                  {interest}
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>

      {/* Main Content */}
      <div className="w-2/3 p-6">
        {/* Header */}
        <div className="mb-6">
          <h1 className="text-2xl font-bold" style={{ color: primaryColor }}>
            {firstName} {lastName}
          </h1>
          <p className="text-lg text-gray-600">{jobTitle || "Développeur Web"}</p>
        </div>

        {/* Objective */}
        {sections.objective && objective && (
          <div className="mb-6">
            <h2
              className="text-lg font-semibold pb-1 mb-2 border-b"
              style={{ color: primaryColor, borderColor: primaryColor }}
            >
              Profil
            </h2>
            <p className="text-gray-700">{objective}</p>
          </div>
        )}

        {/* Experience */}
        {sections.experience && experience && experience.length > 0 && (
          <div className="mb-6">
            <h2
              className="text-lg font-semibold pb-1 mb-2 border-b"
              style={{ color: primaryColor, borderColor: primaryColor }}
            >
              Expérience professionnelle
            </h2>
            <div className="space-y-4">
              {experience.map((exp) => (
                <div key={exp.id}>
                  <div className="flex justify-between">
                    <h3 className="font-medium">{exp.position}</h3>
                    <span className="text-gray-500 text-sm">{exp.period}</span>
                  </div>
                  <p className="text-gray-600">
                    {exp.company}
                    {exp.location ? `, ${exp.location}` : ""}
                  </p>
                  <p className="text-gray-700 text-sm mt-1">{exp.description}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Education */}
        {sections.education && education && education.length > 0 && (
          <div className="mb-6">
            <h2
              className="text-lg font-semibold pb-1 mb-2 border-b"
              style={{ color: primaryColor, borderColor: primaryColor }}
            >
              Formation
            </h2>
            <div className="space-y-4">
              {education.map((edu) => (
                <div key={edu.id}>
                  <div className="flex justify-between">
                    <h3 className="font-medium">{edu.degree}</h3>
                    <span className="text-gray-500 text-sm">{edu.year}</span>
                  </div>
                  <p className="text-gray-600">
                    {edu.school}
                    {edu.location ? `, ${edu.location}` : ""}
                  </p>
                  <p className="text-gray-700 text-sm mt-1">{edu.description}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Certifications */}
        {sections.certifications && certifications && certifications.length > 0 && (
          <div>
            <h2
              className="text-lg font-semibold pb-1 mb-2 border-b"
              style={{ color: primaryColor, borderColor: primaryColor }}
            >
              Certifications
            </h2>
            <div className="space-y-2">
              {certifications.map((cert) => (
                <div key={cert.id}>
                  <div className="flex justify-between">
                    <h3 className="font-medium">{cert.name}</h3>
                    <span className="text-gray-500 text-sm">{cert.year}</span>
                  </div>
                  <p className="text-gray-600">{cert.issuer}</p>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
