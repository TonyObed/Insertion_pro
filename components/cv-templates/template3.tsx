import { Mail, Phone, MapPin } from "lucide-react"

interface CVTemplate3Props {
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

export default function CVTemplate3({ data }: CVTemplate3Props) {
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
    <div className="w-full h-full p-6" style={{ fontSize: `${fontSize}rem` }}>
      {/* Header */}
      <div className="flex justify-between items-start mb-6">
        <div>
          <h1 className="text-2xl font-bold">
            {firstName} {lastName}
          </h1>
          <p className="text-lg" style={{ color: primaryColor }}>
            {jobTitle || "Développeur Web"}
          </p>

          <div className="flex flex-wrap gap-3 mt-2">
            <div className="flex items-center gap-1">
              <Mail className="h-4 w-4" style={{ color: primaryColor }} />
              <span className="text-sm">{email}</span>
            </div>
            <div className="flex items-center gap-1">
              <Phone className="h-4 w-4" style={{ color: primaryColor }} />
              <span className="text-sm">{phone}</span>
            </div>
            <div className="flex items-center gap-1">
              <MapPin className="h-4 w-4" style={{ color: primaryColor }} />
              <span className="text-sm">{location}</span>
            </div>
          </div>
        </div>

        {showPhoto && (
          <div className="h-24 w-24 rounded-full overflow-hidden border-2" style={{ borderColor: primaryColor }}>
            <img
              src={profilePicture || "/placeholder.svg?height=96&width=96"}
              alt={`${firstName} ${lastName}`}
              className="h-full w-full object-cover"
            />
          </div>
        )}
      </div>

      {/* Divider */}
      <div className="h-1 w-full mb-6" style={{ backgroundColor: primaryColor }}></div>

      {/* Two Column Layout */}
      <div className="grid grid-cols-3 gap-6">
        {/* Left Column */}
        <div className="col-span-1 space-y-6">
          {/* Skills */}
          {sections.skills && skills && skills.length > 0 && (
            <div>
              <h2 className="text-lg font-semibold mb-2" style={{ color: primaryColor }}>
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
            <div>
              <h2 className="text-lg font-semibold mb-2" style={{ color: primaryColor }}>
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
              <h2 className="text-lg font-semibold mb-2" style={{ color: primaryColor }}>
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

          {/* Certifications */}
          {sections.certifications && certifications && certifications.length > 0 && (
            <div>
              <h2 className="text-lg font-semibold mb-2" style={{ color: primaryColor }}>
                Certifications
              </h2>
              <ul className="space-y-1">
                {certifications.map((cert) => (
                  <li key={cert.id} className="text-sm">
                    {cert.name} ({cert.issuer}, {cert.year})
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>

        {/* Right Column */}
        <div className="col-span-2 space-y-6">
          {/* Objective */}
          {sections.objective && objective && (
            <div>
              <h2 className="text-lg font-semibold mb-2" style={{ color: primaryColor }}>
                Profil
              </h2>
              <p className="text-gray-700 text-sm">{objective}</p>
            </div>
          )}

          {/* Experience */}
          {sections.experience && experience && experience.length > 0 && (
            <div>
              <h2 className="text-lg font-semibold mb-2" style={{ color: primaryColor }}>
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
              <h2 className="text-lg font-semibold mb-2" style={{ color: primaryColor }}>
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
        </div>
      </div>
    </div>
  )
}
