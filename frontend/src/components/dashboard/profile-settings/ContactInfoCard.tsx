import React from 'react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Mail, Phone, MapPin } from 'lucide-react';

interface Props {
  email: string;
  phone: string;
  location: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export const ContactInfoCard: React.FC<Props> = ({ email, phone, location, onChange }) => (
  <Card className="relative overflow-hidden shadow-soft border-border/50 bg-card h-max">
    <div className="absolute top-0 left-0 w-full h-1 bg-blue-500" />
    <CardHeader>
      <CardTitle className="text-xl flex items-center gap-2 font-bold">
        <Mail className="h-5 w-5 text-blue-500" /> Contact Info
      </CardTitle>
      <CardDescription className="text-muted-foreground">This information will appear on your Contact page.</CardDescription>
    </CardHeader>
    <CardContent className="space-y-5">
      <div className="space-y-2">
        <label className="text-sm font-semibold flex items-center gap-2 text-foreground">
          <Mail className="h-4 w-4 text-muted-foreground" /> Public Email
        </label>
        <Input name="email" value={email} onChange={onChange} placeholder="e.g. hello@example.com" className="bg-background border-border/50" />
      </div>
      <div className="space-y-2">
        <label className="text-sm font-semibold flex items-center gap-2 text-foreground">
          <Phone className="h-4 w-4 text-muted-foreground" /> Phone Number
        </label>
        <Input name="phone" value={phone} onChange={onChange} placeholder="e.g. +94 7X XXX XXXX" className="bg-background border-border/50" />
      </div>
      <div className="space-y-2">
        <label className="text-sm font-semibold flex items-center gap-2 text-foreground">
          <MapPin className="h-4 w-4 text-muted-foreground" /> Location
        </label>
        <Input name="location" value={location} onChange={onChange} placeholder="e.g. Peradeniya, Sri Lanka" className="bg-background border-border/50" />
      </div>
    </CardContent>
  </Card>
);