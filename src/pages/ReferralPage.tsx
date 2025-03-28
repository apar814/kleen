
import React from 'react';
import { Copy, Share, Twitter, Mail, Facebook } from 'lucide-react';
import { motion } from 'framer-motion';
import DashboardLayout from '@/components/DashboardLayout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

const ReferralPage = () => {
  const referralLink = "https://kleen.app/ref/user12345";
  
  const copyToClipboard = () => {
    navigator.clipboard.writeText(referralLink);
    // In a real app, you would show a toast notification here
  };

  return (
    <DashboardLayout title="Refer Friends" description="Share Kleen with your friends and earn rewards">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-2 space-y-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            <Card>
              <CardHeader>
                <CardTitle>Your Referral Link</CardTitle>
                <CardDescription>Share this link with your friends</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex items-center gap-2 mb-6">
                  <Input value={referralLink} readOnly className="bg-gray-50" />
                  <Button onClick={copyToClipboard} variant="outline" size="icon">
                    <Copy className="h-4 w-4" />
                  </Button>
                </div>
                
                <div className="flex flex-wrap gap-3">
                  <Button variant="outline" className="flex items-center gap-2">
                    <Share className="h-4 w-4" />
                    Share
                  </Button>
                  <Button variant="outline" className="flex items-center gap-2">
                    <Mail className="h-4 w-4" />
                    Email
                  </Button>
                  <Button variant="outline" className="flex items-center gap-2">
                    <Twitter className="h-4 w-4" />
                    Twitter
                  </Button>
                  <Button variant="outline" className="flex items-center gap-2">
                    <Facebook className="h-4 w-4" />
                    Facebook
                  </Button>
                </div>
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
                <CardTitle>How It Works</CardTitle>
                <CardDescription>Learn about our referral program</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  <div className="flex gap-4">
                    <div className="bg-kleen-mint/10 h-10 w-10 rounded-full flex items-center justify-center shrink-0">
                      <span className="text-kleen-mint font-semibold">1</span>
                    </div>
                    <div>
                      <h3 className="font-semibold">Share your unique link</h3>
                      <p className="text-kleen-gray">Send your referral link to friends who might be interested in living toxin-free.</p>
                    </div>
                  </div>
                  
                  <div className="flex gap-4">
                    <div className="bg-kleen-mint/10 h-10 w-10 rounded-full flex items-center justify-center shrink-0">
                      <span className="text-kleen-mint font-semibold">2</span>
                    </div>
                    <div>
                      <h3 className="font-semibold">Friends sign up</h3>
                      <p className="text-kleen-gray">When your friends click your link and create an account, they get a free upgrade.</p>
                    </div>
                  </div>
                  
                  <div className="flex gap-4">
                    <div className="bg-kleen-mint/10 h-10 w-10 rounded-full flex items-center justify-center shrink-0">
                      <span className="text-kleen-mint font-semibold">3</span>
                    </div>
                    <div>
                      <h3 className="font-semibold">You earn rewards</h3>
                      <p className="text-kleen-gray">For each friend that joins, you'll receive credits towards premium features.</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>
        
        <div className="md:col-span-1">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.2 }}
          >
            <Card>
              <CardHeader>
                <CardTitle>Your Stats</CardTitle>
                <CardDescription>Track your referral progress</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="bg-gray-50 rounded-md p-4">
                  <div className="text-center">
                    <div className="text-4xl font-bold text-kleen-mint">0</div>
                    <div className="text-kleen-gray">Friends Referred</div>
                  </div>
                </div>
                
                <div>
                  <div className="flex justify-between mb-1">
                    <span className="text-sm text-kleen-gray">Progress to next reward</span>
                    <span className="text-sm font-medium">0/3</span>
                  </div>
                  <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
                    <div className="bg-kleen-mint h-full rounded-full" style={{ width: '0%' }}></div>
                  </div>
                  <p className="text-xs text-kleen-gray mt-2">Refer 3 friends to unlock premium features for 1 month.</p>
                </div>
                
                <div className="pt-4 border-t">
                  <h4 className="font-medium mb-3">Rewards Earned</h4>
                  <div className="text-kleen-gray text-sm">
                    You haven't earned any rewards yet. Start sharing your referral link!
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default ReferralPage;
