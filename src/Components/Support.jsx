import React from "react";
import { Mail, Phone, Facebook, Instagram } from "lucide-react";

const Support = () => {
  return (
    <>
    <h2 className="text-3xl font-bold text-center py-12  mb-6">
          Support & Contact
        </h2>

    <div className=" flex items-center justify-center ">
      
      <div className="  shadow-lg rounded-2xl p-8 w-full max-w-10/12 mx-auto bg-white text-gray-600">
        

        <div className="space-y-4 text-center ">
          {/* Email */}
          <div className="flex items-center gap-3 justify-center">
            <Mail className="w-5 h-5 text-center"  />
            <a
              href="mailto:hasan.abir3176@gmail.com"
              className="hover:underline text-center"
            >
              hasan.abir3176@gmail.com
            </a>
          </div>

          {/* Phone */}
          <div className="flex items-center gap-3 justify-center">
            <Phone className="w-5 h-5" />
            <a href="tel:+8801871917336" className="hover:underline">
              +8801871917336
            </a>
          </div>

          {/* Facebook */}
          <div className="flex items-center gap-3 justify-center">
            <Facebook className="w-5 h-5 " />
            <a
              href="https://www.facebook.com/abirhasan09z/"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:underline"
            >
              Facebook Profile
            </a>
          </div>

          {/* Instagram */}
          <div className="flex items-center gap-3 justify-center">
            <Instagram className="w-5 h-5 " />
            <a
              href="https://www.instagram.com/abirhasan09z/"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:underline"
            >
              Instagram Profile
            </a>
          </div>
        </div>
      </div>
    </div>
    </>
    
  );
};

export default Support;
