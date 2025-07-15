import { Mail, Phone, MapPin } from "lucide-react"

interface CVTemplate1Props {
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

export default function CVTemplate1({ data }: CVTemplate1Props) {
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
    <div className="w-full h-full flex flex-col" style={{ fontSize: `${fontSize}rem` }}>
      {/* Header */}
      <div style={{ backgroundColor: primaryColor }} className="text-white p-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold">
              {firstName} {lastName}
            </h1>
            <p className="text-lg opacity-90">{jobTitle || "Développeur Web"}</p>
          </div>
          {showPhoto && (
            <div className="h-24 w-24 rounded-full overflow-hidden bg-white border-4 border-white">
              <img
                src={profilePicture || "/placeholder.svg?height=96&width=96"}
                alt={`${firstName} ${lastName}`}
                className="h-full w-full object-cover"
              />
            </div>
          )}
        </div>
      </div>

      {/* Contact Info */}
      <div className="bg-gray-100 p-3 flex flex-wrap justify-center gap-4 text-sm">
        <div className="flex items-center gap-1">
          <Mail className="h-4 w-4" style={{ color: primaryColor }} />
          <span>{email}</span>
        </div>
        <div className="flex items-center gap-1">
          <Phone className="h-4 w-4" style={{ color: primaryColor }} />
          <span>{phone}</span>
        </div>
        <div className="flex items-center gap-1">
          <MapPin className="h-4 w-4" style={{ color: primaryColor }} />
          <span>{location}</span>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 p-6 space-y-4">
        {/* Objective */}
        {sections.objective && objective && (
          <div className="mb-4">
            <h2
              className="text-lg font-semibold mb-2 pb-1 border-b-2"
              style={{ borderColor: primaryColor, color: primaryColor }}
            >
              Objectif professionnel
            </h2>
            <p className="text-gray-700">{objective}</p>
          </div>
        )}

        {/* Two Column Layout */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Left Column */}
          <div className="space-y-6">
            {/* Skills */}
            {sections.skills && skills && skills.length > 0 && (
              <div>
                <h2
                  className="text-lg font-semibold mb-2 pb-1 border-b-2"
                  style={{ borderColor: primaryColor, color: primaryColor }}
                >
                  Compétences
                </h2>
                <ul className="list-disc list-inside space-y-1">
                  {skills.map((skill, index) => (
                    <li key={index} className="text-gray-700">
                      {skill}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Languages */}
            {sections.languages && languages && languages.length > 0 && (
              <div>
                <h2
                  className="text-lg font-semibold mb-2 pb-1 border-b-2"
                  style={{ borderColor: primaryColor, color: primaryColor }}
                >
                  Langues
                </h2>
                <ul className="list-disc list-inside space-y-1">
                  {languages.map((lang) => (
                    <li key={lang.id} className="text-gray-700">
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
                  className="text-lg font-semibold mb-2 pb-1 border-b-2"
                  style={{ borderColor: primaryColor, color: primaryColor }}
                >
                  Centres d'intérêt
                </h2>
                <ul className="list-disc list-inside space-y-1">
                  {interests.map((interest, index) => (
                    <li key={index} className="text-gray-700">
                      {interest}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>

          {/* Right Column */}
          <div className="md:col-span-2 space-y-6">
            {/* Experience */}
            {sections.experience && experience && experience.length > 0 && (
              <div>
                <h2
                  className="text-lg font-semibold mb-2 pb-1 border-b-2"
                  style={{ borderColor: primaryColor, color: primaryColor }}
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
              <div>
                <h2
                  className="text-lg font-semibold mb-2 pb-1 border-b-2"
                  style={{ borderColor: primaryColor, color: primaryColor }}
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
                  className="text-lg font-semibold mb-2 pb-1 border-b-2"
                  style={{ borderColor: primaryColor, color: primaryColor }}
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
      </div>
    </div>
  )
}
