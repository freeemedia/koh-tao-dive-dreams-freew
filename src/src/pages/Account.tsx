import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../integrations/supabase/client';
import { Button } from '../components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card';
import { Download, User, BookOpen, LogOut } from 'lucide-react';
import { toast } from 'sonner';

interface UserProfile {
  id: string;
  email: string;
  created_at: string;
  // Add other profile fields as needed
}

const Account = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getUser = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        navigate('/signup');
        return;
      }

      // Get user profile from profiles table
      const { data: profile } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', user.id)
        .single();

      setUser({
        id: user.id,
        email: user.email || '',
        created_at: user.created_at,
        ...profile
      });
      setLoading(false);
    };

    getUser();
  }, [navigate]);

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    toast.success('Signed out successfully');
    navigate('/');
  };

  const eLearningMaterials = [
    {
      title: 'PADI Open Water Diver Manual',
      description: 'Complete course manual for Open Water certification',
      downloadUrl: '/downloads/padi-open-water-manual.pdf',
      type: 'PDF'
    },
    {
      title: 'Dive Tables & Safety Guidelines',
      description: 'Essential dive planning and safety information',
      downloadUrl: '/downloads/dive-tables.pdf',
      type: 'PDF'
    },
    {
      title: 'Marine Life Identification Guide',
      description: 'Comprehensive guide to Koh Tao marine species',
      downloadUrl: '/downloads/marine-life-guide.pdf',
      type: 'PDF'
    },
    {
      title: 'Emergency Procedures Video',
      description: 'Training video for emergency dive situations',
      downloadUrl: '/downloads/emergency-procedures.mp4',
      type: 'Video'
    }
  ];

  if (loading) {
    return (
      <div className="min-h-screen bg-background py-16">
        <div className="max-w-4xl mx-auto px-4">
          <div className="text-center">Loading...</div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background py-16">
      <div className="max-w-4xl mx-auto px-4 space-y-8">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold">My Account</h1>
            <p className="text-muted-foreground">Welcome back to Koh Tao Dive Dreams</p>
          </div>
          <Button variant="outline" onClick={handleSignOut} className="flex items-center gap-2">
            <LogOut className="h-4 w-4" />
            Sign Out
          </Button>
        </div>

        {/* User Profile Card */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <User className="h-5 w-5" />
              Profile Information
            </CardTitle>
            <CardDescription>Your account details and membership status</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label className="text-sm font-medium text-muted-foreground">Email</label>
                <p className="text-lg">{user?.email}</p>
              </div>
              <div>
                <label className="text-sm font-medium text-muted-foreground">Member Since</label>
                <p className="text-lg">{new Date(user?.created_at || '').toLocaleDateString()}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* E-Learning Materials */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <BookOpen className="h-5 w-5" />
              E-Learning Materials
            </CardTitle>
            <CardDescription>Access your course materials and training resources</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-2 gap-4">
              {eLearningMaterials.map((material, index) => (
                <div key={index} className="border rounded-lg p-4 hover:bg-muted/50 transition-colors">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <h3 className="font-semibold text-lg">{material.title}</h3>
                      <p className="text-sm text-muted-foreground mb-3">{material.description}</p>
                      <span className="inline-block px-2 py-1 bg-primary/10 text-primary text-xs rounded-full">
                        {material.type}
                      </span>
                    </div>
                  </div>
                  <Button
                    className="w-full mt-3 flex items-center gap-2"
                    onClick={() => {
                      // In a real app, this would trigger a download
                      toast.info(`Downloading ${material.title}...`);
                    }}
                  >
                    <Download className="h-4 w-4" />
                    Download
                  </Button>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Quick Actions */}
        <Card>
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
            <CardDescription>Common tasks and navigation</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-3 gap-4">
              <Button
                variant="outline"
                className="h-20 flex flex-col items-center gap-2"
                onClick={() => navigate('/courses')}
              >
                <BookOpen className="h-6 w-6" />
                Browse Courses
              </Button>
              <Button
                variant="outline"
                className="h-20 flex flex-col items-center gap-2"
                onClick={() => navigate('/fun-diving-koh-tao')}
              >
                <div className="h-6 w-6 rounded-full bg-blue-500"></div>
                Book Fun Dive
              </Button>
              <Button
                variant="outline"
                className="h-20 flex flex-col items-center gap-2"
                onClick={() => navigate('/#contact')}
              >
                <div className="h-6 w-6 rounded-full bg-green-500"></div>
                Contact Us
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Account;