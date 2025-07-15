"use client"

import type React from "react"

import { useState, useRef } from "react"
import type { User } from "@/lib/auth"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { Slider } from "@/components/ui/slider"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { useToast } from "@/hooks/use-toast"
import { Download, Eye, Palette, FileText, Layout, Plus, Trash2 } from "lucide-react"
import { Separator } from "@/components/ui/separator"
import CVTemplate1 from "./cv-templates/template1"
import CVTemplate2 from "./cv-templates/template2"
import CVTemplate3 from "./cv-templates/template3"
import html2canvas from "html2canvas"
import jsPDF from "jspdf"

interface CVBuilderProps {
  user: User
}

// Types pour les données du CV
interface Experience {
  id: string
  position: string
  company: string
  location: string
  period: string
  description: string
}

interface Education {
  id: string
  degree: string
  school: string
  location: string
  year: string
  description: string
}

interface Language {
  id: string
  name: string
  level: string
}

interface Certification {
  id: string
  name: string
  issuer: string
  year: string
}

interface CVData extends User {
  jobTitle: string
  objective: string
  showPhoto: boolean
  primaryColor: string
  secondaryColor: string
  fontSize: number
  skills: string[]
  experience: Experience[]
  education: Education[]
  languages: Language[]
  certifications: Certification[]
  interests: string[]
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

export default function CVBuilder({ user }: CVBuilderProps) {
  const { toast } = useToast()
  const [activeTemplate, setActiveTemplate] = useState<string>("template1")
  const cvRef = useRef<HTMLDivElement>(null)

  // Initialiser les données du CV avec les données utilisateur
  const [cvData, setCvData] = useState<CVData>({
    ...user,
    jobTitle: user.jobTitle || "Développeur Web",
    objective:
      user.objective ||
      "Professionnel passionné par le développement web et les nouvelles technologies, à la recherche de nouvelles opportunités pour mettre à profit mes compétences.",
    showPhoto: true,
    primaryColor: "#2563eb", // blue-600
    secondaryColor: "#f3f4f6", // gray-100
    fontSize: 1, // 1 = normal, 0.9 = small, 1.1 = large
    skills: user.skills || ["HTML/CSS", "JavaScript", "React", "Node.js", "Next.js"],
    experience: user.experience || [
      {
        id: "exp1",
        position: "Développeur Frontend",
        company: "Entreprise ABC",
        location: "Paris, France",
        period: "2020 - Présent",
        description:
          "Développement d'applications web avec React et Next.js. Collaboration avec l'équipe design pour implémenter des interfaces utilisateur responsives et accessibles.",
      },
    ],
    education: user.education || [
      {
        id: "edu1",
        degree: "Master en Informatique",
        school: "Université XYZ",
        location: "Lyon, France",
        year: "2018 - 2020",
        description: "Spécialisation en développement web et applications mobiles.",
      },
    ],
    languages: [
      { id: "lang1", name: "Français", level: "Natif" },
      { id: "lang2", name: "Anglais", level: "Courant" },
      { id: "lang3", name: "Espagnol", level: "Intermédiaire" },
    ],
    certifications: [
      { id: "cert1", name: "Certification Next.js", issuer: "Vercel", year: "2023" },
      { id: "cert2", name: "Certification React Avancé", issuer: "Meta", year: "2022" },
    ],
    interests: user.interests || ["Développement web", "Nouvelles technologies", "Open source", "Photographie"],
    sections: {
      objective: true,
      skills: true,
      experience: true,
      education: true,
      languages: true,
      interests: true,
      certifications: true,
    },
  })

  const handleSectionToggle = (section: string) => {
    setCvData({
      ...cvData,
      sections: {
        ...cvData.sections,
        [section]: !cvData.sections[section as keyof typeof cvData.sections],
      },
    })
  }

  const handleColorChange = (type: "primaryColor" | "secondaryColor", value: string) => {
    setCvData({
      ...cvData,
      [type]: value,
    })
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setCvData({
      ...cvData,
      [name]: value,
    })
  }

  // Gestion des compétences
  const handleSkillChange = (index: number, value: string) => {
    const updatedSkills = [...cvData.skills]
    updatedSkills[index] = value
    setCvData({ ...cvData, skills: updatedSkills })
  }

  const addSkill = () => {
    setCvData({ ...cvData, skills: [...cvData.skills, ""] })
  }

  const removeSkill = (index: number) => {
    const updatedSkills = [...cvData.skills]
    updatedSkills.splice(index, 1)
    setCvData({ ...cvData, skills: updatedSkills })
  }

  // Gestion des centres d'intérêt
  const handleInterestChange = (index: number, value: string) => {
    const updatedInterests = [...cvData.interests]
    updatedInterests[index] = value
    setCvData({ ...cvData, interests: updatedInterests })
  }

  const addInterest = () => {
    setCvData({ ...cvData, interests: [...cvData.interests, ""] })
  }

  const removeInterest = (index: number) => {
    const updatedInterests = [...cvData.interests]
    updatedInterests.splice(index, 1)
    setCvData({ ...cvData, interests: updatedInterests })
  }

  // Gestion des expériences
  const handleExperienceChange = (id: string, field: keyof Experience, value: string) => {
    const updatedExperiences = cvData.experience.map((exp) => (exp.id === id ? { ...exp, [field]: value } : exp))
    setCvData({ ...cvData, experience: updatedExperiences })
  }

  const addExperience = () => {
    const newExperience: Experience = {
      id: `exp${Date.now()}`,
      position: "",
      company: "",
      location: "",
      period: "",
      description: "",
    }
    setCvData({ ...cvData, experience: [...cvData.experience, newExperience] })
  }

  const removeExperience = (id: string) => {
    setCvData({
      ...cvData,
      experience: cvData.experience.filter((exp) => exp.id !== id),
    })
  }

  // Gestion des formations
  const handleEducationChange = (id: string, field: keyof Education, value: string) => {
    const updatedEducation = cvData.education.map((edu) => (edu.id === id ? { ...edu, [field]: value } : edu))
    setCvData({ ...cvData, education: updatedEducation })
  }

  const addEducation = () => {
    const newEducation: Education = {
      id: `edu${Date.now()}`,
      degree: "",
      school: "",
      location: "",
      year: "",
      description: "",
    }
    setCvData({ ...cvData, education: [...cvData.education, newEducation] })
  }

  const removeEducation = (id: string) => {
    setCvData({
      ...cvData,
      education: cvData.education.filter((edu) => edu.id !== id),
    })
  }

  // Gestion des langues
  const handleLanguageChange = (id: string, field: keyof Language, value: string) => {
    const updatedLanguages = cvData.languages.map((lang) => (lang.id === id ? { ...lang, [field]: value } : lang))
    setCvData({ ...cvData, languages: updatedLanguages })
  }

  const addLanguage = () => {
    const newLanguage: Language = {
      id: `lang${Date.now()}`,
      name: "",
      level: "",
    }
    setCvData({ ...cvData, languages: [...cvData.languages, newLanguage] })
  }

  const removeLanguage = (id: string) => {
    setCvData({
      ...cvData,
      languages: cvData.languages.filter((lang) => lang.id !== id),
    })
  }

  // Gestion des certifications
  const handleCertificationChange = (id: string, field: keyof Certification, value: string) => {
    const updatedCertifications = cvData.certifications.map((cert) =>
      cert.id === id ? { ...cert, [field]: value } : cert,
    )
    setCvData({ ...cvData, certifications: updatedCertifications })
  }

  const addCertification = () => {
    const newCertification: Certification = {
      id: `cert${Date.now()}`,
      name: "",
      issuer: "",
      year: "",
    }
    setCvData({ ...cvData, certifications: [...cvData.certifications, newCertification] })
  }

  const removeCertification = (id: string) => {
    setCvData({
      ...cvData,
      certifications: cvData.certifications.filter((cert) => cert.id !== id),
    })
  }

  const handleDownload = async () => {
    if (!cvRef.current) return

    try {
      toast({
        title: "Préparation du PDF",
        description: "Veuillez patienter pendant la génération de votre CV...",
      })

      const canvas = await html2canvas(cvRef.current, {
        scale: 2,
        useCORS: true,
        allowTaint: true,
        logging: false,
      })

      const imgData = canvas.toDataURL("image/png")
      const pdf = new jsPDF({
        orientation: "portrait",
        unit: "mm",
        format: "a4",
      })

      const imgWidth = 210
      const imgHeight = (canvas.height * imgWidth) / canvas.width

      pdf.addImage(imgData, "PNG", 0, 0, imgWidth, imgHeight)
      pdf.save(`CV_${cvData.firstName}_${cvData.lastName}.pdf`)

      toast({
        title: "CV téléchargé",
        description: "Votre CV a été téléchargé avec succès.",
      })
    } catch (error) {
      console.error("Erreur lors de la génération du PDF:", error)
      toast({
        title: "Erreur",
        description: "Une erreur est survenue lors de la génération du PDF. Veuillez réessayer.",
        variant: "destructive",
      })
    }
  }

  const renderTemplatePreview = () => {
    switch (activeTemplate) {
      case "template1":
        return <CVTemplate1 data={cvData} />
      case "template2":
        return <CVTemplate2 data={cvData} />
      case "template3":
        return <CVTemplate3 data={cvData} />
      default:
        return <CVTemplate1 data={cvData} />
    }
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <FileText className="h-5 w-5 text-blue-600" />
            Générateur de CV
          </CardTitle>
          <CardDescription>Créez un CV professionnel à partir de vos informations de profil</CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="templates" className="w-full">
            <TabsList className="grid grid-cols-5 mb-6">
              <TabsTrigger value="templates" className="flex items-center gap-1">
                <Layout className="h-4 w-4" />
                Modèles
              </TabsTrigger>
              <TabsTrigger value="customize" className="flex items-center gap-1">
                <Palette className="h-4 w-4" />
                Personnaliser
              </TabsTrigger>
              <TabsTrigger value="personal" className="flex items-center gap-1">
                <FileText className="h-4 w-4" />
                Personnel
              </TabsTrigger>
              <TabsTrigger value="content" className="flex items-center gap-1">
                <FileText className="h-4 w-4" />
                Contenu
              </TabsTrigger>
              <TabsTrigger value="preview" className="flex items-center gap-1">
                <Eye className="h-4 w-4" />
                Aperçu
              </TabsTrigger>
            </TabsList>

            <TabsContent value="templates">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <Card
                  className={`cursor-pointer transition-all ${activeTemplate === "template1" ? "ring-2 ring-blue-600" : "hover:shadow-md"}`}
                  onClick={() => setActiveTemplate("template1")}
                >
                  <CardContent className="p-4">
                    <div className="aspect-[210/297] bg-white border rounded-md overflow-hidden">
                      <div className="w-full h-1/6 bg-blue-600"></div>
                      <div className="p-4">
                        <div className="h-4 w-3/4 bg-gray-200 rounded mb-2"></div>
                        <div className="h-3 w-1/2 bg-gray-200 rounded mb-6"></div>
                        <div className="space-y-4">
                          <div>
                            <div className="h-3 w-1/4 bg-blue-200 rounded mb-2"></div>
                            <div className="h-2 w-full bg-gray-100 rounded"></div>
                            <div className="h-2 w-full bg-gray-100 rounded mt-1"></div>
                          </div>
                          <div>
                            <div className="h-3 w-1/4 bg-blue-200 rounded mb-2"></div>
                            <div className="h-2 w-full bg-gray-100 rounded"></div>
                            <div className="h-2 w-full bg-gray-100 rounded mt-1"></div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <p className="text-center mt-2 font-medium">Moderne</p>
                  </CardContent>
                </Card>

                <Card
                  className={`cursor-pointer transition-all ${activeTemplate === "template2" ? "ring-2 ring-blue-600" : "hover:shadow-md"}`}
                  onClick={() => setActiveTemplate("template2")}
                >
                  <CardContent className="p-4">
                    <div className="aspect-[210/297] bg-white border rounded-md overflow-hidden">
                      <div className="flex h-full">
                        <div className="w-1/3 bg-gray-100 p-3">
                          <div className="h-12 w-12 rounded-full bg-blue-600 mb-4"></div>
                          <div className="space-y-4">
                            <div>
                              <div className="h-3 w-3/4 bg-blue-200 rounded mb-2"></div>
                              <div className="h-2 w-full bg-gray-200 rounded"></div>
                            </div>
                            <div>
                              <div className="h-3 w-3/4 bg-blue-200 rounded mb-2"></div>
                              <div className="h-2 w-full bg-gray-200 rounded"></div>
                            </div>
                          </div>
                        </div>
                        <div className="w-2/3 p-3">
                          <div className="h-4 w-3/4 bg-gray-200 rounded mb-2"></div>
                          <div className="h-3 w-1/2 bg-gray-200 rounded mb-4"></div>
                          <div className="space-y-3">
                            <div>
                              <div className="h-3 w-1/4 bg-blue-200 rounded mb-1"></div>
                              <div className="h-2 w-full bg-gray-100 rounded"></div>
                            </div>
                            <div>
                              <div className="h-3 w-1/4 bg-blue-200 rounded mb-1"></div>
                              <div className="h-2 w-full bg-gray-100 rounded"></div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <p className="text-center mt-2 font-medium">Classique</p>
                  </CardContent>
                </Card>

                <Card
                  className={`cursor-pointer transition-all ${activeTemplate === "template3" ? "ring-2 ring-blue-600" : "hover:shadow-md"}`}
                  onClick={() => setActiveTemplate("template3")}
                >
                  <CardContent className="p-4">
                    <div className="aspect-[210/297] bg-white border rounded-md overflow-hidden">
                      <div className="p-4">
                        <div className="flex justify-between items-center mb-4">
                          <div>
                            <div className="h-4 w-40 bg-gray-200 rounded mb-1"></div>
                            <div className="h-3 w-32 bg-blue-200 rounded"></div>
                          </div>
                          <div className="h-12 w-12 rounded-full bg-blue-600"></div>
                        </div>
                        <div className="h-0.5 w-full bg-blue-600 mb-4"></div>
                        <div className="space-y-3">
                          <div>
                            <div className="h-3 w-1/4 bg-blue-600 rounded mb-1"></div>
                            <div className="h-2 w-full bg-gray-100 rounded"></div>
                            <div className="h-2 w-full bg-gray-100 rounded mt-1"></div>
                          </div>
                          <div>
                            <div className="h-3 w-1/4 bg-blue-600 rounded mb-1"></div>
                            <div className="h-2 w-full bg-gray-100 rounded"></div>
                            <div className="h-2 w-full bg-gray-100 rounded mt-1"></div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <p className="text-center mt-2 font-medium">Professionnel</p>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            <TabsContent value="customize">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Apparence</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="space-y-2">
                      <Label>Couleur principale</Label>
                      <div className="grid grid-cols-6 gap-2">
                        {["#2563eb", "#dc2626", "#16a34a", "#7c3aed", "#0891b2", "#000000"].map((color) => (
                          <div
                            key={color}
                            className={`h-8 rounded-md cursor-pointer transition-all ${
                              cvData.primaryColor === color ? "ring-2 ring-offset-2 ring-blue-600" : ""
                            }`}
                            style={{ backgroundColor: color }}
                            onClick={() => handleColorChange("primaryColor", color)}
                          ></div>
                        ))}
                      </div>
                      <Input
                        type="color"
                        value={cvData.primaryColor}
                        onChange={(e) => handleColorChange("primaryColor", e.target.value)}
                        className="w-full h-10 mt-2"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label>Couleur secondaire</Label>
                      <div className="grid grid-cols-6 gap-2">
                        {["#f3f4f6", "#fef2f2", "#f0fdf4", "#f5f3ff", "#ecfeff", "#f9fafb"].map((color) => (
                          <div
                            key={color}
                            className={`h-8 rounded-md cursor-pointer border transition-all ${
                              cvData.secondaryColor === color ? "ring-2 ring-offset-2 ring-blue-600" : ""
                            }`}
                            style={{ backgroundColor: color }}
                            onClick={() => handleColorChange("secondaryColor", color)}
                          ></div>
                        ))}
                      </div>
                      <Input
                        type="color"
                        value={cvData.secondaryColor}
                        onChange={(e) => handleColorChange("secondaryColor", e.target.value)}
                        className="w-full h-10 mt-2"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label>Taille de police</Label>
                      <Slider
                        defaultValue={[cvData.fontSize * 10]}
                        min={8}
                        max={12}
                        step={1}
                        onValueChange={(value) => setCvData({ ...cvData, fontSize: value[0] / 10 })}
                        className="py-4"
                      />
                      <div className="flex justify-between text-sm text-gray-500">
                        <span>Petite</span>
                        <span>Normale</span>
                        <span>Grande</span>
                      </div>
                    </div>

                    <div className="flex items-center space-x-2">
                      <Switch
                        id="show-photo"
                        checked={cvData.showPhoto}
                        onCheckedChange={(checked) => setCvData({ ...cvData, showPhoto: checked })}
                      />
                      <Label htmlFor="show-photo">Afficher la photo</Label>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Sections</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex items-center justify-between">
                      <Label htmlFor="objective-section">Objectif professionnel</Label>
                      <Switch
                        id="objective-section"
                        checked={cvData.sections.objective}
                        onCheckedChange={() => handleSectionToggle("objective")}
                      />
                    </div>
                    <Separator />

                    <div className="flex items-center justify-between">
                      <Label htmlFor="skills-section">Compétences</Label>
                      <Switch
                        id="skills-section"
                        checked={cvData.sections.skills}
                        onCheckedChange={() => handleSectionToggle("skills")}
                      />
                    </div>
                    <Separator />

                    <div className="flex items-center justify-between">
                      <Label htmlFor="experience-section">Expérience professionnelle</Label>
                      <Switch
                        id="experience-section"
                        checked={cvData.sections.experience}
                        onCheckedChange={() => handleSectionToggle("experience")}
                      />
                    </div>
                    <Separator />

                    <div className="flex items-center justify-between">
                      <Label htmlFor="education-section">Formation</Label>
                      <Switch
                        id="education-section"
                        checked={cvData.sections.education}
                        onCheckedChange={() => handleSectionToggle("education")}
                      />
                    </div>
                    <Separator />

                    <div className="flex items-center justify-between">
                      <Label htmlFor="languages-section">Langues</Label>
                      <Switch
                        id="languages-section"
                        checked={cvData.sections.languages}
                        onCheckedChange={() => handleSectionToggle("languages")}
                      />
                    </div>
                    <Separator />

                    <div className="flex items-center justify-between">
                      <Label htmlFor="interests-section">Centres d'intérêt</Label>
                      <Switch
                        id="interests-section"
                        checked={cvData.sections.interests}
                        onCheckedChange={() => handleSectionToggle("interests")}
                      />
                    </div>
                    <Separator />

                    <div className="flex items-center justify-between">
                      <Label htmlFor="certifications-section">Certifications</Label>
                      <Switch
                        id="certifications-section"
                        checked={cvData.sections.certifications}
                        onCheckedChange={() => handleSectionToggle("certifications")}
                      />
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            <TabsContent value="personal">
              <Card>
                <CardHeader>
                  <CardTitle>Informations personnelles</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="firstName">Prénom</Label>
                      <Input id="firstName" name="firstName" value={cvData.firstName} onChange={handleInputChange} />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="lastName">Nom</Label>
                      <Input id="lastName" name="lastName" value={cvData.lastName} onChange={handleInputChange} />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="jobTitle">Titre professionnel</Label>
                      <Input
                        id="jobTitle"
                        name="jobTitle"
                        value={cvData.jobTitle}
                        onChange={handleInputChange}
                        placeholder="ex: Développeur Web"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="email">Email</Label>
                      <Input id="email" name="email" type="email" value={cvData.email} onChange={handleInputChange} />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="phone">Téléphone</Label>
                      <Input id="phone" name="phone" value={cvData.phone} onChange={handleInputChange} />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="location">Localisation</Label>
                      <Input id="location" name="location" value={cvData.location} onChange={handleInputChange} />
                    </div>
                    <div className="space-y-2 md:col-span-2">
                      <Label htmlFor="objective">Objectif professionnel</Label>
                      <Textarea
                        id="objective"
                        name="objective"
                        value={cvData.objective}
                        onChange={handleInputChange}
                        rows={3}
                      />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="content">
              <div className="space-y-6">
                {/* Compétences */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center justify-between">
                      <span>Compétences</span>
                      <Button onClick={addSkill} variant="outline" size="sm" className="h-8">
                        <Plus className="h-4 w-4 mr-1" /> Ajouter
                      </Button>
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      {cvData.skills.map((skill, index) => (
                        <div key={index} className="flex items-center gap-2">
                          <Input
                            value={skill}
                            onChange={(e) => handleSkillChange(index, e.target.value)}
                            placeholder="ex: JavaScript"
                          />
                          <Button
                            onClick={() => removeSkill(index)}
                            variant="ghost"
                            size="icon"
                            className="h-8 w-8 text-red-500"
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                {/* Expériences professionnelles */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center justify-between">
                      <span>Expériences professionnelles</span>
                      <Button onClick={addExperience} variant="outline" size="sm" className="h-8">
                        <Plus className="h-4 w-4 mr-1" /> Ajouter
                      </Button>
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-6">
                      {cvData.experience.map((exp) => (
                        <div key={exp.id} className="space-y-4 border p-4 rounded-md relative">
                          <Button
                            onClick={() => removeExperience(exp.id)}
                            variant="ghost"
                            size="icon"
                            className="h-8 w-8 text-red-500 absolute top-2 right-2"
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>

                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="space-y-2">
                              <Label>Poste</Label>
                              <Input
                                value={exp.position}
                                onChange={(e) => handleExperienceChange(exp.id, "position", e.target.value)}
                                placeholder="ex: Développeur Frontend"
                              />
                            </div>
                            <div className="space-y-2">
                              <Label>Entreprise</Label>
                              <Input
                                value={exp.company}
                                onChange={(e) => handleExperienceChange(exp.id, "company", e.target.value)}
                                placeholder="ex: Entreprise ABC"
                              />
                            </div>
                            <div className="space-y-2">
                              <Label>Lieu</Label>
                              <Input
                                value={exp.location}
                                onChange={(e) => handleExperienceChange(exp.id, "location", e.target.value)}
                                placeholder="ex: Paris, France"
                              />
                            </div>
                            <div className="space-y-2">
                              <Label>Période</Label>
                              <Input
                                value={exp.period}
                                onChange={(e) => handleExperienceChange(exp.id, "period", e.target.value)}
                                placeholder="ex: 2020 - Présent"
                              />
                            </div>
                          </div>
                          <div className="space-y-2">
                            <Label>Description</Label>
                            <Textarea
                              value={exp.description}
                              onChange={(e) => handleExperienceChange(exp.id, "description", e.target.value)}
                              placeholder="Décrivez vos responsabilités et réalisations"
                              rows={3}
                            />
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                {/* Formations */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center justify-between">
                      <span>Formations</span>
                      <Button onClick={addEducation} variant="outline" size="sm" className="h-8">
                        <Plus className="h-4 w-4 mr-1" /> Ajouter
                      </Button>
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-6">
                      {cvData.education.map((edu) => (
                        <div key={edu.id} className="space-y-4 border p-4 rounded-md relative">
                          <Button
                            onClick={() => removeEducation(edu.id)}
                            variant="ghost"
                            size="icon"
                            className="h-8 w-8 text-red-500 absolute top-2 right-2"
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>

                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="space-y-2">
                              <Label>Diplôme</Label>
                              <Input
                                value={edu.degree}
                                onChange={(e) => handleEducationChange(edu.id, "degree", e.target.value)}
                                placeholder="ex: Master en Informatique"
                              />
                            </div>
                            <div className="space-y-2">
                              <Label>Établissement</Label>
                              <Input
                                value={edu.school}
                                onChange={(e) => handleEducationChange(edu.id, "school", e.target.value)}
                                placeholder="ex: Université XYZ"
                              />
                            </div>
                            <div className="space-y-2">
                              <Label>Lieu</Label>
                              <Input
                                value={edu.location}
                                onChange={(e) => handleEducationChange(edu.id, "location", e.target.value)}
                                placeholder="ex: Lyon, France"
                              />
                            </div>
                            <div className="space-y-2">
                              <Label>Année</Label>
                              <Input
                                value={edu.year}
                                onChange={(e) => handleEducationChange(edu.id, "year", e.target.value)}
                                placeholder="ex: 2018 - 2020"
                              />
                            </div>
                          </div>
                          <div className="space-y-2">
                            <Label>Description</Label>
                            <Textarea
                              value={edu.description}
                              onChange={(e) => handleEducationChange(edu.id, "description", e.target.value)}
                              placeholder="Décrivez votre formation"
                              rows={3}
                            />
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                {/* Langues */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center justify-between">
                      <span>Langues</span>
                      <Button onClick={addLanguage} variant="outline" size="sm" className="h-8">
                        <Plus className="h-4 w-4 mr-1" /> Ajouter
                      </Button>
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      {cvData.languages.map((lang) => (
                        <div key={lang.id} className="flex items-center gap-2">
                          <Input
                            value={lang.name}
                            onChange={(e) => handleLanguageChange(lang.id, "name", e.target.value)}
                            placeholder="ex: Français"
                            className="flex-1"
                          />
                          <Input
                            value={lang.level}
                            onChange={(e) => handleLanguageChange(lang.id, "level", e.target.value)}
                            placeholder="ex: Natif"
                            className="flex-1"
                          />
                          <Button
                            onClick={() => removeLanguage(lang.id)}
                            variant="ghost"
                            size="icon"
                            className="h-8 w-8 text-red-500"
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                {/* Certifications */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center justify-between">
                      <span>Certifications</span>
                      <Button onClick={addCertification} variant="outline" size="sm" className="h-8">
                        <Plus className="h-4 w-4 mr-1" /> Ajouter
                      </Button>
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      {cvData.certifications.map((cert) => (
                        <div key={cert.id} className="grid grid-cols-3 gap-2 items-center">
                          <Input
                            value={cert.name}
                            onChange={(e) => handleCertificationChange(cert.id, "name", e.target.value)}
                            placeholder="ex: Certification Next.js"
                          />
                          <Input
                            value={cert.issuer}
                            onChange={(e) => handleCertificationChange(cert.id, "issuer", e.target.value)}
                            placeholder="ex: Vercel"
                          />
                          <div className="flex items-center gap-2">
                            <Input
                              value={cert.year}
                              onChange={(e) => handleCertificationChange(cert.id, "year", e.target.value)}
                              placeholder="ex: 2023"
                            />
                            <Button
                              onClick={() => removeCertification(cert.id)}
                              variant="ghost"
                              size="icon"
                              className="h-8 w-8 text-red-500 flex-shrink-0"
                            >
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                {/* Centres d'intérêt */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center justify-between">
                      <span>Centres d'intérêt</span>
                      <Button onClick={addInterest} variant="outline" size="sm" className="h-8">
                        <Plus className="h-4 w-4 mr-1" /> Ajouter
                      </Button>
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      {cvData.interests.map((interest, index) => (
                        <div key={index} className="flex items-center gap-2">
                          <Input
                            value={interest}
                            onChange={(e) => handleInterestChange(index, e.target.value)}
                            placeholder="ex: Photographie"
                          />
                          <Button
                            onClick={() => removeInterest(index)}
                            variant="ghost"
                            size="icon"
                            className="h-8 w-8 text-red-500"
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            <TabsContent value="preview">
              <div className="space-y-6">
                <Card>
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <CardTitle>Aperçu de votre CV</CardTitle>
                      <Button onClick={handleDownload} className="bg-blue-600 hover:bg-blue-700">
                        <Download className="mr-2 h-4 w-4" />
                        Télécharger PDF
                      </Button>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div ref={cvRef} className="border rounded-md overflow-hidden bg-white shadow-md mx-auto max-w-3xl">
                      {renderTemplatePreview()}
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  )
}
