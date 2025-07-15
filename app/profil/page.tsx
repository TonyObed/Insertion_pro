"use client"

import type React from "react"

import { useState, useRef } from "react"
import Link from "next/link"
import { useAuth, type User } from "@/lib/auth"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Textarea } from "@/components/ui/textarea"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { useToast } from "@/hooks/use-toast"
import {
  UserIcon,
  Mail,
  Phone,
  MapPin,
  Briefcase,
  GraduationCap,
  Heart,
  Award,
  FileText,
  Upload,
  X,
} from "lucide-react"
import { Separator } from "@/components/ui/separator"
import Header from "@/components/header"
import Footer from "@/components/footer"
import { useRouter } from "next/navigation"
import CVBuilder from "@/components/cv-builder"

export default function ProfilePage() {
  const { user, updateProfile } = useAuth()
  const { toast } = useToast()
  const router = useRouter()
  const [isEditing, setIsEditing] = useState(false)
  const [formData, setFormData] = useState<Partial<User>>(user)
  const [isLoading, setIsLoading] = useState(false)
  const [previewImage, setPreviewImage] = useState<string | null>(user.profilePicture || null)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleLogout = () => {
    toast({
      title: "Déconnexion simulée",
      description: "Dans une version réelle, vous seriez déconnecté.",
    })
    router.push("/")
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSkillsChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const skills = e.target.value.split(",").map((skill) => skill.trim())
    setFormData((prev) => ({ ...prev, skills }))
  }

  const handleInterestsChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const interests = e.target.value.split(",").map((interest) => interest.trim())
    setFormData((prev) => ({ ...prev, interests }))
  }

  const handleEducationChange = (index: number, field: string, value: string) => {
    const updatedEducation = [...(formData.education || [])]
    updatedEducation[index] = { ...updatedEducation[index], [field]: value }
    setFormData((prev) => ({ ...prev, education: updatedEducation }))
  }

  const handleExperienceChange = (index: number, field: string, value: string) => {
    const updatedExperience = [...(formData.experience || [])]
    updatedExperience[index] = { ...updatedExperience[index], [field]: value }
    setFormData((prev) => ({ ...prev, experience: updatedExperience }))
  }

  const addEducation = () => {
    const updatedEducation = [...(formData.education || []), { degree: "", school: "", year: "" }]
    setFormData((prev) => ({ ...prev, education: updatedEducation }))
  }

  const removeEducation = (index: number) => {
    const updatedEducation = [...(formData.education || [])]
    updatedEducation.splice(index, 1)
    setFormData((prev) => ({ ...prev, education: updatedEducation }))
  }

  const addExperience = () => {
    const updatedExperience = [...(formData.experience || []), { position: "", company: "", period: "" }]
    setFormData((prev) => ({ ...prev, experience: updatedExperience }))
  }

  const removeExperience = (index: number) => {
    const updatedExperience = [...(formData.experience || [])]
    updatedExperience.splice(index, 1)
    setFormData((prev) => ({ ...prev, experience: updatedExperience }))
  }

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onloadend = () => {
        const result = reader.result as string
        setPreviewImage(result)
        setFormData((prev) => ({ ...prev, profilePicture: result }))
      }
      reader.readAsDataURL(file)
    }
  }

  const triggerFileInput = () => {
    fileInputRef.current?.click()
  }

  const removeImage = () => {
    setPreviewImage(null)
    setFormData((prev) => ({ ...prev, profilePicture: null }))
    if (fileInputRef.current) {
      fileInputRef.current.value = ""
    }
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    try {
      updateProfile(formData)
      toast({
        title: "Profil mis à jour",
        description: "Vos informations ont été mises à jour avec succès.",
      })
      setIsEditing(false)
    } catch (error) {
      toast({
        title: "Erreur",
        description: "Une erreur est survenue lors de la mise à jour du profil.",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-1 py-10 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row gap-8">
            {/* Sidebar */}
            <div className="w-full md:w-1/4">
              <Card>
                <CardContent className="p-6">
                  <div className="flex flex-col items-center text-center">
                    <Avatar className="h-24 w-24 mb-4">
                      <AvatarImage
                        src={user.profilePicture || "/placeholder.svg"}
                        alt={`${user.firstName} ${user.lastName}`}
                      />
                      <AvatarFallback className="text-lg">
                        {user.firstName.charAt(0)}
                        {user.lastName.charAt(0)}
                      </AvatarFallback>
                    </Avatar>
                    <h2 className="text-xl font-bold">
                      {user.firstName} {user.lastName}
                    </h2>
                    <p className="text-gray-500 mb-4">{user.location}</p>

                    <div className="w-full mt-4">
                      <Button className="w-full mb-2" onClick={() => setIsEditing(!isEditing)}>
                        {isEditing ? "Annuler" : "Modifier le profil"}
                      </Button>
                      <Button variant="outline" className="w-full" asChild>
                        <Link href="/profil/parametres">Paramètres</Link>
                      </Button>
                      <Button variant="destructive" className="w-full mt-2" onClick={handleLogout}>
                        Se déconnecter
                      </Button>
                    </div>
                  </div>

                  <Separator className="my-6" />

                  <div className="space-y-4">
                    <div className="flex items-center gap-2">
                      <Mail className="h-4 w-4 text-gray-500" />
                      <span className="text-sm">{user.email}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Phone className="h-4 w-4 text-gray-500" />
                      <span className="text-sm">{user.phone}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <MapPin className="h-4 w-4 text-gray-500" />
                      <span className="text-sm">{user.location}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Main Content */}
            <div className="w-full md:w-3/4">
              {isEditing ? (
                <Card>
                  <CardHeader>
                    <CardTitle>Modifier votre profil</CardTitle>
                    <CardDescription>Mettez à jour vos informations personnelles</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <form onSubmit={handleSubmit} className="space-y-6">
                      <div className="space-y-4">
                        <h3 className="text-lg font-medium">Photo de profil</h3>
                        <div className="flex items-center gap-4">
                          <div className="relative">
                            <Avatar className="h-24 w-24">
                              <AvatarImage src={previewImage || "/placeholder.svg"} alt="Photo de profil" />
                              <AvatarFallback className="text-lg">
                                {formData.firstName?.charAt(0)}
                                {formData.lastName?.charAt(0)}
                              </AvatarFallback>
                            </Avatar>
                            {previewImage && (
                              <Button
                                type="button"
                                variant="destructive"
                                size="icon"
                                className="absolute -top-2 -right-2 h-6 w-6 rounded-full"
                                onClick={removeImage}
                              >
                                <X className="h-3 w-3" />
                              </Button>
                            )}
                          </div>
                          <div>
                            <input
                              type="file"
                              ref={fileInputRef}
                              onChange={handleImageUpload}
                              accept="image/*"
                              className="hidden"
                            />
                            <Button
                              type="button"
                              variant="outline"
                              onClick={triggerFileInput}
                              className="flex items-center gap-2"
                            >
                              <Upload className="h-4 w-4" />
                              Changer la photo
                            </Button>
                            <p className="text-xs text-gray-500 mt-1">JPG, PNG ou GIF. 5 MB maximum.</p>
                          </div>
                        </div>
                      </div>

                      <Separator />

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="firstName">Prénom</Label>
                          <Input
                            id="firstName"
                            name="firstName"
                            value={formData.firstName}
                            onChange={handleChange}
                            required
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="lastName">Nom</Label>
                          <Input
                            id="lastName"
                            name="lastName"
                            value={formData.lastName}
                            onChange={handleChange}
                            required
                          />
                        </div>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="email">Email</Label>
                          <Input
                            id="email"
                            name="email"
                            type="email"
                            value={formData.email}
                            onChange={handleChange}
                            required
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="phone">Téléphone</Label>
                          <Input id="phone" name="phone" value={formData.phone} onChange={handleChange} />
                        </div>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="location">Localisation</Label>
                        <Input id="location" name="location" value={formData.location} onChange={handleChange} />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="bio">Biographie</Label>
                        <Textarea id="bio" name="bio" value={formData.bio} onChange={handleChange} rows={4} />
                      </div>

                      <Separator />

                      <div className="space-y-4">
                        <h3 className="text-lg font-medium">Compétences</h3>
                        <div className="space-y-2">
                          <Label htmlFor="skills">Compétences (séparées par des virgules)</Label>
                          <Input
                            id="skills"
                            value={formData.skills?.join(", ")}
                            onChange={handleSkillsChange}
                            placeholder="Ex: JavaScript, React, Marketing digital"
                          />
                        </div>
                      </div>

                      <Separator />

                      <div className="space-y-4">
                        <div className="flex items-center justify-between">
                          <h3 className="text-lg font-medium">Formation</h3>
                          <Button type="button" variant="outline" size="sm" onClick={addEducation}>
                            Ajouter une formation
                          </Button>
                        </div>

                        {formData.education?.map((edu, index) => (
                          <div key={index} className="space-y-4 p-4 border rounded-md relative">
                            <Button
                              type="button"
                              variant="destructive"
                              size="icon"
                              className="absolute top-2 right-2 h-6 w-6"
                              onClick={() => removeEducation(index)}
                            >
                              <X className="h-3 w-3" />
                            </Button>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                              <div className="space-y-2">
                                <Label htmlFor={`degree-${index}`}>Diplôme</Label>
                                <Input
                                  id={`degree-${index}`}
                                  value={edu.degree}
                                  onChange={(e) => handleEducationChange(index, "degree", e.target.value)}
                                />
                              </div>
                              <div className="space-y-2">
                                <Label htmlFor={`school-${index}`}>Établissement</Label>
                                <Input
                                  id={`school-${index}`}
                                  value={edu.school}
                                  onChange={(e) => handleEducationChange(index, "school", e.target.value)}
                                />
                              </div>
                            </div>
                            <div className="space-y-2">
                              <Label htmlFor={`year-${index}`}>Année</Label>
                              <Input
                                id={`year-${index}`}
                                value={edu.year}
                                onChange={(e) => handleEducationChange(index, "year", e.target.value)}
                              />
                            </div>
                          </div>
                        ))}
                      </div>

                      <Separator />

                      <div className="space-y-4">
                        <div className="flex items-center justify-between">
                          <h3 className="text-lg font-medium">Expérience professionnelle</h3>
                          <Button type="button" variant="outline" size="sm" onClick={addExperience}>
                            Ajouter une expérience
                          </Button>
                        </div>

                        {formData.experience?.map((exp, index) => (
                          <div key={index} className="space-y-4 p-4 border rounded-md relative">
                            <Button
                              type="button"
                              variant="destructive"
                              size="icon"
                              className="absolute top-2 right-2 h-6 w-6"
                              onClick={() => removeExperience(index)}
                            >
                              <X className="h-3 w-3" />
                            </Button>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                              <div className="space-y-2">
                                <Label htmlFor={`position-${index}`}>Poste</Label>
                                <Input
                                  id={`position-${index}`}
                                  value={exp.position}
                                  onChange={(e) => handleExperienceChange(index, "position", e.target.value)}
                                />
                              </div>
                              <div className="space-y-2">
                                <Label htmlFor={`company-${index}`}>Entreprise</Label>
                                <Input
                                  id={`company-${index}`}
                                  value={exp.company}
                                  onChange={(e) => handleExperienceChange(index, "company", e.target.value)}
                                />
                              </div>
                            </div>
                            <div className="space-y-2">
                              <Label htmlFor={`period-${index}`}>Période</Label>
                              <Input
                                id={`period-${index}`}
                                value={exp.period}
                                onChange={(e) => handleExperienceChange(index, "period", e.target.value)}
                                placeholder="Ex: 2020 - 2022"
                              />
                            </div>
                          </div>
                        ))}
                      </div>

                      <Separator />

                      <div className="space-y-4">
                        <h3 className="text-lg font-medium">Centres d'intérêt</h3>
                        <div className="space-y-2">
                          <Label htmlFor="interests">Centres d'intérêt (séparés par des virgules)</Label>
                          <Input
                            id="interests"
                            value={formData.interests?.join(", ")}
                            onChange={handleInterestsChange}
                            placeholder="Ex: Photographie, Voyages, Lecture"
                          />
                        </div>
                      </div>

                      <div className="flex justify-end gap-2">
                        <Button type="button" variant="outline" onClick={() => setIsEditing(false)}>
                          Annuler
                        </Button>
                        <Button type="submit" className="bg-blue-600 hover:bg-blue-700" disabled={isLoading}>
                          {isLoading ? "Enregistrement..." : "Enregistrer les modifications"}
                        </Button>
                      </div>
                    </form>
                  </CardContent>
                </Card>
              ) : (
                <Tabs defaultValue="profil">
                  <TabsList className="mb-6">
                    <TabsTrigger value="profil">Profil</TabsTrigger>
                    <TabsTrigger value="formations">Mes formations</TabsTrigger>
                    <TabsTrigger value="favoris">Favoris</TabsTrigger>
                    <TabsTrigger value="certificats">Certificats</TabsTrigger>
                    <TabsTrigger value="cv-builder" className="flex items-center gap-1">
                      <FileText className="h-4 w-4" />
                      CV Builder
                    </TabsTrigger>
                  </TabsList>

                  <TabsContent value="profil">
                    <div className="space-y-6">
                      <Card>
                        <CardHeader>
                          <div className="flex items-center justify-between">
                            <CardTitle className="flex items-center gap-2">
                              <UserIcon className="h-5 w-5 text-blue-600" />À propos
                            </CardTitle>
                          </div>
                        </CardHeader>
                        <CardContent>
                          <p className="text-gray-700">{user.bio}</p>
                        </CardContent>
                      </Card>

                      <Card>
                        <CardHeader>
                          <div className="flex items-center justify-between">
                            <CardTitle className="flex items-center gap-2">
                              <Award className="h-5 w-5 text-blue-600" />
                              Compétences
                            </CardTitle>
                          </div>
                        </CardHeader>
                        <CardContent>
                          <div className="flex flex-wrap gap-2">
                            {user.skills?.map((skill, index) => (
                              <Badge key={index} variant="secondary">
                                {skill}
                              </Badge>
                            ))}
                          </div>
                        </CardContent>
                      </Card>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <Card>
                          <CardHeader>
                            <div className="flex items-center justify-between">
                              <CardTitle className="flex items-center gap-2">
                                <GraduationCap className="h-5 w-5 text-blue-600" />
                                Formation
                              </CardTitle>
                            </div>
                          </CardHeader>
                          <CardContent>
                            <div className="space-y-4">
                              {user.education?.map((edu, index) => (
                                <div key={index} className="border-l-2 border-blue-600 pl-4 py-1">
                                  <h4 className="font-medium">{edu.degree}</h4>
                                  <p className="text-sm text-gray-500">
                                    {edu.school} • {edu.year}
                                  </p>
                                </div>
                              ))}
                            </div>
                          </CardContent>
                        </Card>

                        <Card>
                          <CardHeader>
                            <div className="flex items-center justify-between">
                              <CardTitle className="flex items-center gap-2">
                                <Briefcase className="h-5 w-5 text-blue-600" />
                                Expérience
                              </CardTitle>
                            </div>
                          </CardHeader>
                          <CardContent>
                            <div className="space-y-4">
                              {user.experience?.map((exp, index) => (
                                <div key={index} className="border-l-2 border-blue-600 pl-4 py-1">
                                  <h4 className="font-medium">{exp.position}</h4>
                                  <p className="text-sm text-gray-500">
                                    {exp.company} • {exp.period}
                                  </p>
                                </div>
                              ))}
                            </div>
                          </CardContent>
                        </Card>
                      </div>

                      <Card>
                        <CardHeader>
                          <div className="flex items-center justify-between">
                            <CardTitle className="flex items-center gap-2">
                              <Heart className="h-5 w-5 text-blue-600" />
                              Centres d'intérêt
                            </CardTitle>
                          </div>
                        </CardHeader>
                        <CardContent>
                          <div className="flex flex-wrap gap-2">
                            {user.interests?.map((interest, index) => (
                              <Badge key={index} variant="outline">
                                {interest}
                              </Badge>
                            ))}
                          </div>
                        </CardContent>
                      </Card>
                    </div>
                  </TabsContent>

                  <TabsContent value="formations">
                    <Card>
                      <CardHeader>
                        <CardTitle>Mes formations</CardTitle>
                        <CardDescription>Suivez votre progression et accédez à vos formations</CardDescription>
                      </CardHeader>
                      <CardContent>
                        <div className="text-center py-8">
                          <p className="text-gray-500">Vous n'avez pas encore de formations en cours.</p>
                          <Button className="mt-4 bg-blue-600 hover:bg-blue-700" asChild>
                            <Link href="/formations">Découvrir les formations</Link>
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  </TabsContent>

                  <TabsContent value="favoris">
                    <Card>
                      <CardHeader>
                        <CardTitle>Mes favoris</CardTitle>
                        <CardDescription>Les formations et ressources que vous avez enregistrées</CardDescription>
                      </CardHeader>
                      <CardContent>
                        <div className="text-center py-8">
                          <p className="text-gray-500">Vous n'avez pas encore de favoris.</p>
                          <Button className="mt-4 bg-blue-600 hover:bg-blue-700" asChild>
                            <Link href="/formations">Parcourir les formations</Link>
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  </TabsContent>

                  <TabsContent value="certificats">
                    <Card>
                      <CardHeader>
                        <CardTitle>Mes certificats</CardTitle>
                        <CardDescription>Les certificats que vous avez obtenus</CardDescription>
                      </CardHeader>
                      <CardContent>
                        <div className="text-center py-8">
                          <p className="text-gray-500">Vous n'avez pas encore de certificats.</p>
                          <Button className="mt-4 bg-blue-600 hover:bg-blue-700" asChild>
                            <Link href="/formations">Commencer une formation</Link>
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  </TabsContent>

                  <TabsContent value="cv-builder">
                    <CVBuilder user={user} />
                  </TabsContent>
                </Tabs>
              )}
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}
