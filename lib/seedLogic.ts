import dbConnect from "./dbConnect";
import Specialization from "../models/Specialization";
import Doctor from "../models/Doctor";
import Admin from "../models/Admin";
import mongoose from "mongoose";
import bcrypt from "bcryptjs";

export async function seedDatabase() {
  try {
    console.log("Seeding started...");
    await dbConnect();

    console.log("Clearing old data...");
    await Promise.all([
      Specialization.deleteMany({}),
      Doctor.deleteMany({}),
      Admin.deleteMany({}),
    ]);

    console.log("Seeding default admin...");
    const hashedPassword = await bcrypt.hash("admin123", 10);
    await Admin.create({
      email: "admin@clinic.com",
      password: hashedPassword,
      role: "admin",
    });

    console.log("Inserting specializations...");
    const specializationsData = [
      { 
        name: "Cardiology", 
        description: "Expert care for heart conditions", 
        icon: "HeartPulse",
        features: ["ECG & Stress Test", "Echocardiography", "Heart Surgery"]
      },
      { 
        name: "Neurology", 
        description: "Advanced treatment for brain disorders", 
        icon: "Brain",
        features: ["Stroke Management", "Epilepsy Care", "EEG Diagnostics"]
      },
      { 
        name: "Pediatrics", 
        description: "Healthcare for infants and children", 
        icon: "Baby",
        features: ["Vaccinations", "Growth Monitoring", "Newborn Care"]
      },
      { 
        name: "Orthopedics", 
        description: "Treatment for bone and joint conditions", 
        icon: "Bone",
        features: ["Joint Replacement", "Sports Medicine", "Fracture Care"]
      },
      { 
        name: "Ophthalmology", 
        description: "Complete eye care", 
        icon: "Eye",
        features: ["Cataract Surgery", "Laser Treatment", "Vision Testing"]
      },
      { 
        name: "General Medicine", 
        description: "Primary healthcare services", 
        icon: "Stethoscope",
        features: ["Annual Checkups", "Fever Treatment", "Diabetes Care"]
      },
      { 
        name: "Dermatology", 
        description: "Skin, hair, and nail health", 
        icon: "Pill",
        features: ["Acne Treatment", "Laser Therapy", "Skin Allergy"]
      },
      { 
        name: "Surgery", 
        description: "Minimally invasive and traditional surgery", 
        icon: "Scissors",
        features: ["Laparoscopy", "General Surgery", "Trauma Care"]
      },
    ];
    const insertedSpecs = await Specialization.insertMany(specializationsData);

    const specMap: Record<string, string> = {};
    insertedSpecs.forEach(spec => {
      specMap[spec.name] = spec._id.toString();
    });

    console.log("Inserting doctors...");
    const doctorsData = [
      // Cardiology (4)
      { name: "Dr. Rajesh Sharma", isFeatured: true, specialization: specMap["Cardiology"], experience: 15, rating: 4.9, reviews: 284, location: "AIIMS, Delhi", availabilityStatus: "Available", nextAvailable: "Today, 3:00 PM", image: "https://images.unsplash.com/photo-1622253692010-333f2da6031d?auto=format&fit=crop&w=600&q=80" },
      { name: "Dr. Aarti Mehta", specialization: specMap["Cardiology"], experience: 12, rating: 4.8, reviews: 210, location: "Apollo Hospital, Delhi", availabilityStatus: "Available", nextAvailable: "Tomorrow, 10:00 AM", image: "https://images.unsplash.com/photo-1559839734-2271ea197ec2?auto=format&fit=crop&w=600&q=80" },
      { name: "Dr. Pratik Joshi", specialization: specMap["Cardiology"], experience: 8, rating: 4.6, reviews: 155, location: "Fortis Hospital, Delhi", availabilityStatus: "Busy", nextAvailable: "Next Week", image: "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?auto=format&fit=crop&w=600&q=80" },
      { name: "Dr. Kiran Rao", isFeatured: true, specialization: specMap["Cardiology"], experience: 20, rating: 5.0, reviews: 420, location: "Max Healthcare, Delhi", availabilityStatus: "Available", nextAvailable: "Today, 5:00 PM", image: "https://images.unsplash.com/photo-1651008376811-b90baee60c1f?auto=format&fit=crop&w=600&q=80" },
      
      // Neurology (3)
      { name: "Dr. Ananya Iyer", isFeatured: true, specialization: specMap["Neurology"], experience: 14, rating: 4.8, reviews: 198, location: "Medanta - The Medicity, Delhi", availabilityStatus: "Available", nextAvailable: "Tomorrow, 10:00 AM", image: "https://images.unsplash.com/photo-1582750433449-648ed127bb54?auto=format&fit=crop&w=600&q=80" },
      { name: "Dr. Suresh Reddy", specialization: specMap["Neurology"], experience: 18, rating: 4.9, reviews: 310, location: "Apollo Hospital, Delhi", availabilityStatus: "Busy", nextAvailable: "Next Mon, 1:00 PM", image: "https://images.unsplash.com/photo-1537368910025-700350fe46c7?auto=format&fit=crop&w=600&q=80" },
      { name: "Dr. Nitya Singh", specialization: specMap["Neurology"], experience: 7, rating: 4.5, reviews: 112, location: "Sir Ganga Ram Hospital, Delhi", availabilityStatus: "Available", nextAvailable: "Today, 4:00 PM", image: "https://images.unsplash.com/photo-1594824476967-48c8b964273f?auto=format&fit=crop&w=600&q=80" },

      // Pediatrics (4)
      { name: "Dr. Sunita Gupta", isFeatured: true, specialization: specMap["Pediatrics"], experience: 19, rating: 4.9, reviews: 342, location: "Rainbow Children's Hospital, Delhi", availabilityStatus: "Available", nextAvailable: "Today, 5:30 PM", image: "https://images.unsplash.com/photo-1651008376811-b90baee60c1f?auto=format&fit=crop&w=600&q=80" },
      { name: "Dr. Rakesh Verma", specialization: specMap["Pediatrics"], experience: 11, rating: 4.7, reviews: 205, location: "Max Health, Delhi", availabilityStatus: "Available", nextAvailable: "Tomorrow, 9:00 AM", image: "https://images.unsplash.com/photo-1622253692010-333f2da6031d?auto=format&fit=crop&w=600&q=80" },
      { name: "Dr. Nisha Patel", specialization: specMap["Pediatrics"], experience: 6, rating: 4.6, reviews: 130, location: "City Clinic, Delhi", availabilityStatus: "Busy", nextAvailable: "Next Week", image: "https://images.unsplash.com/photo-1582750433449-648ed127bb54?auto=format&fit=crop&w=600&q=80" },
      { name: "Dr. Amit Kumar", specialization: specMap["Pediatrics"], experience: 16, rating: 4.8, reviews: 275, location: "Apollo Hospital, Delhi", availabilityStatus: "Available", nextAvailable: "Today, 2:00 PM", image: "https://images.unsplash.com/photo-1537368910025-700350fe46c7?auto=format&fit=crop&w=600&q=80" },

      // Orthopedics (3)
      { name: "Dr. Vikram Malhotra", specialization: specMap["Orthopedics"], experience: 10, rating: 4.7, reviews: 156, location: "AIIMS, Delhi", availabilityStatus: "Busy", nextAvailable: "Next Week", image: "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?auto=format&fit=crop&w=600&q=80" },
      { name: "Dr. Sanjay Das", isFeatured: true, specialization: specMap["Orthopedics"], experience: 15, rating: 4.9, reviews: 400, location: "Fortis Hospital, Delhi", availabilityStatus: "Available", nextAvailable: "Tomorrow, 11:00 AM", image: "https://images.unsplash.com/photo-1537368910025-700350fe46c7?auto=format&fit=crop&w=600&q=80" },
      { name: "Dr. Pooja Iyer", specialization: specMap["Orthopedics"], experience: 8, rating: 4.6, reviews: 180, location: "Max Healthcare, Delhi", availabilityStatus: "Available", nextAvailable: "Today, 6:00 PM", image: "https://images.unsplash.com/photo-1582750433449-648ed127bb54?auto=format&fit=crop&w=600&q=80" },

      // Ophthalmology (3)
      { name: "Dr. Ritu Sharma", specialization: specMap["Ophthalmology"], experience: 12, rating: 4.8, reviews: 290, location: "Centre for Sight, Delhi", availabilityStatus: "Available", nextAvailable: "Today, 4:00 PM", image: "https://images.unsplash.com/photo-1594824476967-48c8b964273f?auto=format&fit=crop&w=600&q=80" },
      { name: "Dr. Karan Jain", isFeatured: true, specialization: specMap["Ophthalmology"], experience: 20, rating: 5.0, reviews: 500, location: "Apollo Hospital, Delhi", availabilityStatus: "Busy", nextAvailable: "Next Week", image: "https://images.unsplash.com/photo-1537368910025-700350fe46c7?auto=format&fit=crop&w=600&q=80" },
      { name: "Dr. Sneha Desai", specialization: specMap["Ophthalmology"], experience: 5, rating: 4.5, reviews: 110, location: "Vision Eye Care, Delhi", availabilityStatus: "Available", nextAvailable: "Tomorrow, 3:00 PM", image: "https://images.unsplash.com/photo-1651008376811-b90baee60c1f?auto=format&fit=crop&w=600&q=80" },

      // General Medicine (5)
      { name: "Dr. Mohan Das", isFeatured: true, specialization: specMap["General Medicine"], experience: 20, rating: 4.9, reviews: 800, location: "Metro Hospitals, Delhi", availabilityStatus: "Available", nextAvailable: "Today, 10:00 AM", image: "https://images.unsplash.com/photo-1537368910025-700350fe46c7?auto=format&fit=crop&w=600&q=80" },
      { name: "Dr. Swati Sen", specialization: specMap["General Medicine"], experience: 8, rating: 4.7, reviews: 190, location: "Apollo Hospital, Delhi", availabilityStatus: "Available", nextAvailable: "Tomorrow, 9:00 AM", image: "https://images.unsplash.com/photo-1582750433449-648ed127bb54?auto=format&fit=crop&w=600&q=80" },
      { name: "Dr. Alok Verma", isFeatured: true, specialization: specMap["General Medicine"], experience: 25, rating: 5.0, reviews: 950, location: "Max Health, Delhi", availabilityStatus: "Busy", nextAvailable: "Next Mon, 10:00 AM", image: "https://images.unsplash.com/photo-1559839734-2271ea197ec2?auto=format&fit=crop&w=600&q=80" },
      { name: "Dr. Preeti Kaur", specialization: specMap["General Medicine"], experience: 6, rating: 4.5, reviews: 150, location: "Fortis, Delhi", availabilityStatus: "Available", nextAvailable: "Today, 4:30 PM", image: "https://images.unsplash.com/photo-1594824476967-48c8b964273f?auto=format&fit=crop&w=600&q=80" },
      { name: "Dr. Dev Anand", specialization: specMap["General Medicine"], experience: 14, rating: 4.8, reviews: 320, location: "AIIMS, Delhi", availabilityStatus: "Available", nextAvailable: "Today, 12:00 PM", image: "https://images.unsplash.com/photo-1622253692010-333f2da6031d?auto=format&fit=crop&w=600&q=80" },

      // Dermatology (3)
      { name: "Dr. Smriti Khanna", specialization: specMap["Dermatology"], experience: 10, rating: 4.8, reviews: 260, location: "Skin Alive Clinic, Delhi", availabilityStatus: "Available", nextAvailable: "Tomorrow, 2:00 PM", image: "https://images.unsplash.com/photo-1651008376811-b90baee60c1f?auto=format&fit=crop&w=600&q=80" },
      { name: "Dr. Vivek Bajaj", specialization: specMap["Dermatology"], experience: 16, rating: 4.9, reviews: 410, location: "Apollo Clinic, Delhi", availabilityStatus: "Busy", nextAvailable: "Next Week", image: "https://images.unsplash.com/photo-1537368910025-700350fe46c7?auto=format&fit=crop&w=600&q=80" },
      { name: "Dr. Shruti Menon", specialization: specMap["Dermatology"], experience: 9, rating: 4.6, reviews: 200, location: "Max Healthcare, Delhi", availabilityStatus: "Available", nextAvailable: "Today, 5:00 PM", image: "https://images.unsplash.com/photo-1582750433449-648ed127bb54?auto=format&fit=crop&w=600&q=80" },

      // Surgery (4)
      { name: "Dr. Aditya Singh", isFeatured: true, specialization: specMap["Surgery"], experience: 18, rating: 5.0, reviews: 350, location: "AIIMS, Delhi", availabilityStatus: "Busy", nextAvailable: "Next Week", image: "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&w=600&q=80" },
      { name: "Dr. Kavita Joshi", specialization: specMap["Surgery"], experience: 12, rating: 4.8, reviews: 280, location: "Apollo Hospital, Delhi", availabilityStatus: "Available", nextAvailable: "Tomorrow, 9:00 AM", image: "https://images.unsplash.com/photo-1651008376811-b90baee60c1f?auto=format&fit=crop&w=600&q=80" },
      { name: "Dr. Naveen Kumar", specialization: specMap["Surgery"], experience: 20, rating: 4.9, reviews: 520, location: "Fortis Memorial, Delhi", availabilityStatus: "Busy", nextAvailable: "Next Mon, 8:00 AM", image: "https://images.unsplash.com/photo-1537368910025-700350fe46c7?auto=format&fit=crop&w=600&q=80" },
      { name: "Dr. Priyanka Shah", specialization: specMap["Surgery"], experience: 7, rating: 4.6, reviews: 140, location: "Max Smart Healthcare, Delhi", availabilityStatus: "Available", nextAvailable: "Today, 3:00 PM", image: "https://images.unsplash.com/photo-1582750433449-648ed127bb54?auto=format&fit=crop&w=600&q=80" },
    ];

    await Doctor.insertMany(doctorsData);

    // Using Promise.all for faster updates
    const updatePromises = insertedSpecs.map(async (spec) => {
      const count = await Doctor.countDocuments({ specialization: spec._id });
      return Specialization.findByIdAndUpdate(spec._id, { doctorCount: count });
    });
    await Promise.all(updatePromises);

    console.log("Data inserted successfully");
    console.log("Seeding completed");

    return { success: true, message: "Database seeded successfully" };
  } catch (error: any) {
    console.error("Seeding error:", error);
    return { success: false, error: error.message || "Failed to seed database" };
  }
}
