
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Phone, Plus, Trash2, AlertTriangle, Heart, Clock } from 'lucide-react';
import { toast } from '@/hooks/use-toast';

interface EmergencyContact {
  id: number;
  name: string;
  phone: string;
  relationship: string;
  type: 'emergency' | 'doctor' | 'pharmacy';
}

const EmergencyContacts = () => {
  const [contacts, setContacts] = useState<EmergencyContact[]>([
    { id: 1, name: 'Dr. Smith (Cardiologist)', phone: '(555) 123-4567', relationship: 'Primary Doctor', type: 'doctor' },
    { id: 2, name: 'Jane Doe', phone: '(555) 987-6543', relationship: 'Emergency Contact', type: 'emergency' },
    { id: 3, name: 'City Pharmacy', phone: '(555) 456-7890', relationship: 'Pharmacy', type: 'pharmacy' },
  ]);

  const [newContact, setNewContact] = useState({
    name: '',
    phone: '',
    relationship: '',
    type: 'emergency' as 'emergency' | 'doctor' | 'pharmacy'
  });

  const [showAddForm, setShowAddForm] = useState(false);

  const addContact = () => {
    if (!newContact.name || !newContact.phone) {
      toast({
        title: "Missing Information",
        description: "Please fill in name and phone number.",
        variant: "destructive"
      });
      return;
    }

    const contact: EmergencyContact = {
      id: Date.now(),
      ...newContact
    };

    setContacts([...contacts, contact]);
    setNewContact({ name: '', phone: '', relationship: '', type: 'emergency' });
    setShowAddForm(false);
    
    toast({
      title: "Contact Added! 📞",
      description: `${contact.name} has been added to your emergency contacts.`,
    });
  };

  const removeContact = (id: number) => {
    setContacts(contacts.filter(contact => contact.id !== id));
    toast({
      title: "Contact Removed",
      description: "Emergency contact has been deleted.",
    });
  };

  const callContact = (phone: string, name: string) => {
    // In a real app, this would initiate a phone call
    toast({
      title: "Calling... 📞",
      description: `Initiating call to ${name} at ${phone}`,
    });
  };

  const getContactIcon = (type: string) => {
    switch (type) {
      case 'doctor': return <Heart className="w-5 h-5 text-blue-500" />;
      case 'pharmacy': return <Plus className="w-5 h-5 text-green-500" />;
      default: return <Phone className="w-5 h-5 text-red-500" />;
    }
  };

  const getContactColor = (type: string) => {
    switch (type) {
      case 'doctor': return 'bg-blue-100 text-blue-800';
      case 'pharmacy': return 'bg-green-100 text-green-800';
      default: return 'bg-red-100 text-red-800';
    }
  };

  return (
    <div className="space-y-6">
      {/* Emergency Alert */}
      <Card className="bg-gradient-to-r from-red-50 to-orange-50 border-l-4 border-l-red-500">
        <CardContent className="p-6">
          <div className="flex items-center space-x-3 mb-4">
            <AlertTriangle className="w-8 h-8 text-red-500" />
            <div>
              <h3 className="font-bold text-lg text-red-800">Emergency Information</h3>
              <p className="text-red-600">In case of emergency, call 911 immediately</p>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Button 
              className="bg-red-500 hover:bg-red-600 text-white font-bold"
              onClick={() => callContact('911', 'Emergency Services')}
            >
              🚨 Call 911
            </Button>
            <Button 
              variant="outline" 
              className="border-red-300 text-red-700 hover:bg-red-50"
              onClick={() => callContact('1-800-222-1222', 'Poison Control')}
            >
              ☠️ Poison Control
            </Button>
            <Button 
              variant="outline" 
              className="border-blue-300 text-blue-700 hover:bg-blue-50"
              onClick={() => toast({ title: "Medical ID", description: "Showing medical information..." })}
            >
              🆔 Medical ID
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Emergency Contacts List */}
      <Card>
        <CardHeader>
          <div className="flex justify-between items-center">
            <CardTitle className="flex items-center space-x-2">
              <Phone className="w-6 h-6 text-blue-600" />
              <span>Emergency Contacts</span>
            </CardTitle>
            <Button 
              onClick={() => setShowAddForm(!showAddForm)}
              className="bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600"
            >
              <Plus className="w-4 h-4 mr-2" />
              Add Contact
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          {/* Add Contact Form */}
          {showAddForm && (
            <Card className="mb-6 bg-gray-50">
              <CardContent className="p-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <Input
                    placeholder="Contact Name"
                    value={newContact.name}
                    onChange={(e) => setNewContact({...newContact, name: e.target.value})}
                  />
                  <Input
                    placeholder="Phone Number"
                    value={newContact.phone}
                    onChange={(e) => setNewContact({...newContact, phone: e.target.value})}
                  />
                  <Input
                    placeholder="Relationship"
                    value={newContact.relationship}
                    onChange={(e) => setNewContact({...newContact, relationship: e.target.value})}
                  />
                  <select 
                    className="p-2 border rounded-md"
                    value={newContact.type}
                    onChange={(e) => setNewContact({...newContact, type: e.target.value as any})}
                  >
                    <option value="emergency">Emergency Contact</option>
                    <option value="doctor">Doctor</option>
                    <option value="pharmacy">Pharmacy</option>
                  </select>
                </div>
                <div className="flex justify-end space-x-2 mt-4">
                  <Button variant="outline" onClick={() => setShowAddForm(false)}>
                    Cancel
                  </Button>
                  <Button onClick={addContact}>
                    Add Contact
                  </Button>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Contacts List */}
          <div className="space-y-4">
            {contacts.map((contact) => (
              <Card key={contact.id} className="hover:shadow-md transition-all duration-300">
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                      {getContactIcon(contact.type)}
                      <div>
                        <h3 className="font-semibold text-lg">{contact.name}</h3>
                        <p className="text-gray-600">{contact.phone}</p>
                        <div className="flex items-center space-x-2 mt-1">
                          <Badge className={getContactColor(contact.type)}>
                            {contact.type.toUpperCase()}
                          </Badge>
                          {contact.relationship && (
                            <span className="text-sm text-gray-500">{contact.relationship}</span>
                          )}
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex items-center space-x-2">
                      <Button 
                        onClick={() => callContact(contact.phone, contact.name)}
                        className="bg-green-500 hover:bg-green-600"
                      >
                        <Phone className="w-4 h-4 mr-2" />
                        Call
                      </Button>
                      <Button 
                        variant="outline" 
                        size="sm"
                        onClick={() => removeContact(contact.id)}
                        className="text-red-600 hover:bg-red-50"
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Quick Medical Info */}
      <Card className="bg-gradient-to-r from-purple-50 to-blue-50">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Clock className="w-6 h-6 text-purple-600" />
            <span>Quick Medical Information</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h4 className="font-semibold mb-2">🩸 Blood Type</h4>
              <p className="text-gray-600">A+ (Update in settings)</p>
            </div>
            <div>
              <h4 className="font-semibold mb-2">🤧 Allergies</h4>
              <p className="text-gray-600">Penicillin, Shellfish</p>
            </div>
            <div>
              <h4 className="font-semibold mb-2">💊 Current Medications</h4>
              <p className="text-gray-600">Lisinopril, Metformin, Aspirin</p>
            </div>
            <div>
              <h4 className="font-semibold mb-2">🏥 Insurance</h4>
              <p className="text-gray-600">Blue Cross Blue Shield</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default EmergencyContacts;
