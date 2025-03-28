
import React from 'react';
import { Edit2, User } from 'lucide-react';
import { motion } from 'framer-motion';
import DashboardLayout from '@/components/DashboardLayout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const Profile = () => {
  return (
    <DashboardLayout title="Profile" description="Manage your account and preferences">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-1 space-y-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            <Card>
              <CardHeader>
                <CardTitle>Account Information</CardTitle>
                <CardDescription>Your basic account details</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex justify-center">
                  <div className="relative">
                    <div className="h-24 w-24 rounded-full bg-gray-200 flex items-center justify-center">
                      <User className="h-12 w-12 text-gray-500" />
                    </div>
                    <button className="absolute bottom-0 right-0 bg-kleen-mint rounded-full p-1.5 shadow-md">
                      <Edit2 className="h-4 w-4 text-white" />
                    </button>
                  </div>
                </div>
                
                <div>
                  <p className="text-sm text-kleen-gray/70">Email</p>
                  <p className="font-medium">user@example.com</p>
                </div>
                
                <div>
                  <p className="text-sm text-kleen-gray/70">Joined</p>
                  <p className="font-medium">June 2023</p>
                </div>
                
                <Button variant="outline" className="w-full">Edit Profile</Button>
              </CardContent>
            </Card>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.1 }}
          >
            <Card>
              <CardHeader>
                <CardTitle>Account Type</CardTitle>
                <CardDescription>Your subscription status</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="bg-kleen-mint/10 p-4 rounded-md mb-4">
                  <p className="font-semibold text-kleen-mint">Free Plan</p>
                  <p className="text-sm mt-1">Basic access to Kleen features</p>
                </div>
                <Button className="w-full bg-kleen-mint hover:bg-kleen-mint/90">Upgrade to Premium</Button>
              </CardContent>
            </Card>
          </motion.div>
        </div>
        
        <div className="md:col-span-2">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.2 }}
          >
            <Card>
              <CardHeader>
                <CardTitle>Preferences</CardTitle>
                <CardDescription>Customize your Kleen experience</CardDescription>
              </CardHeader>
              <CardContent>
                <Tabs defaultValue="values">
                  <TabsList className="mb-4">
                    <TabsTrigger value="values">Values</TabsTrigger>
                    <TabsTrigger value="allergies">Allergies</TabsTrigger>
                    <TabsTrigger value="goals">Health Goals</TabsTrigger>
                  </TabsList>
                  
                  <TabsContent value="values">
                    <div className="space-y-4">
                      <p className="text-kleen-gray">Select the values that matter to you</p>
                      
                      <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                        {['Vegan', 'Cruelty-Free', 'Organic', 'Paraben-Free', 'Sustainable', 'Non-GMO'].map(value => (
                          <div key={value} className="border rounded-md p-3 cursor-pointer hover:border-kleen-mint hover:bg-kleen-mint/5 transition-colors">
                            {value}
                          </div>
                        ))}
                      </div>
                      
                      <p className="text-sm text-kleen-gray mt-4">
                        These values will help Kleen find products that align with your preferences.
                      </p>
                    </div>
                  </TabsContent>
                  
                  <TabsContent value="allergies">
                    <div className="space-y-4">
                      <p className="text-kleen-gray">Add ingredients you're allergic to</p>
                      
                      <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                        {['Nuts', 'Gluten', 'Soy', 'Dairy', 'Fragrance', 'Sulfates'].map(allergen => (
                          <div key={allergen} className="border rounded-md p-3 cursor-pointer hover:border-kleen-mint hover:bg-kleen-mint/5 transition-colors">
                            {allergen}
                          </div>
                        ))}
                      </div>
                      
                      <p className="text-sm text-kleen-gray mt-4">
                        Kleen will warn you about products containing these ingredients.
                      </p>
                    </div>
                  </TabsContent>
                  
                  <TabsContent value="goals">
                    <div className="space-y-4">
                      <p className="text-kleen-gray">What are your health priorities?</p>
                      
                      <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                        {['Reduce Toxins', 'Eco-Friendly', 'Budget-Conscious', 'Sensitive Skin', 'Performance', 'Family-Safe'].map(goal => (
                          <div key={goal} className="border rounded-md p-3 cursor-pointer hover:border-kleen-mint hover:bg-kleen-mint/5 transition-colors">
                            {goal}
                          </div>
                        ))}
                      </div>
                      
                      <p className="text-sm text-kleen-gray mt-4">
                        These goals help us personalize your product recommendations.
                      </p>
                    </div>
                  </TabsContent>
                </Tabs>
                
                <div className="mt-6 flex justify-end">
                  <Button className="bg-kleen-mint hover:bg-kleen-mint/90">Save Preferences</Button>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Profile;
