export type ServiceFaqItem = {
  question: string;
  answer: string;
};

export type ServiceSection =
  | {
      type: "richText";
      heading?: string;
      body: string[];
    }
  | {
      type: "faq";
      heading: string;
      items: ServiceFaqItem[];
    }
  | {
      type: "phoneCards";
      heading: string;
      intro?: string;
      cards: {
        label: string;
        phone: string;
        note?: string;
        imageURL?: string;
      }[];
    }
  | {
      type: "providerHighlight";
      heading: string;
      name: string;
      title: string;
      bio: string[];
      imageUrl: string;
    }
  | {
      type: "serviceLocations";
      heading?: string;
      /** Duly-style: map pin, name, address, phone, Get Directions; optional services list per location */
      locations: {
        name: string;
        facilityName?: string;
        addressLine1: string;
        addressLine2: string;
        phone?: string;
        /** Imaging (or other) services offered at this location: title, optional note, hours */
        services?: {
          title: string;
          note?: string;
          hours: string[];
        }[];
      }[];
    };

export type ServiceContent = {
  /** Route slug, e.g. Post_COVID-19_Recovery – must match /services/[id] */
  slug: string;
  title: string;
  subtitle?: string;
  heroImageUrl: string;
  heroImageAlt?: string;
  sections: ServiceSection[];
};

export const SERVICES_CONTENT: Record<string, ServiceContent> = {
  "Post_COVID-19_Recovery": {
    slug: "Post_COVID-19_Recovery",
    title: "Post COVID-19 Recovery",
    heroImageUrl:
      "https://middletownmedical.com/wp-content/uploads/2021/06/MM-AdobeStock_104818012.jpg",
    heroImageAlt: "Patient kayaking on a lake during recovery",
    sections: [
      {
        type: "richText",
        heading: "Let Middletown Medical Help You Get On The Road To Recovery.",
        body: [
          "For most patients who suffer from COVID-19, symptoms get better within a few weeks. However, some patients exhibit ongoing symptoms, which may be mild or serious. These persistent symptoms can sometimes linger for months, and this stage of illness is referred to as “long-COVID,” “chronic COVID-19,” or “post-COVID-19 syndrome.”",
          "Middletown Medical is here for you if you are suffering from post-COVID syndrome. Our practice offers state-of-the-art testing to determine and develop treatment plans for any post-COVID symptoms you may be suffering from.",
        ],
      },
      {
        type: "faq",
        heading: "Frequently Asked Questions",
        items: [
          {
            question: "What is post-COVID syndrome?",
            answer:
              "Although most people with COVID-19 get better within weeks of illness, some people experience ongoing, returning, or new health problems that appear more than four weeks after first being infected with the virus that causes COVID-19. These conditions are sometimes called long COVID, long-haul COVID, chronic COVID, or post-acute COVID-19. They may involve different organ systems and can present in different combinations of symptoms that persist for different lengths of time.",
          },
          {
            question: "What are the symptoms of post-COVID syndrome?",
            answer:
              "Symptoms can include fatigue, shortness of breath, cough, chest pain, difficulty thinking or concentrating (“brain fog”), sleep problems, headache, dizziness on standing, changes in smell or taste, depression or anxiety, and other issues. People can experience different combinations of these symptoms.",
          },
          {
            question:
              "What should I do if I have symptoms of post-COVID syndrome?",
            answer:
              "If you have lingering symptoms since your COVID-19 infection, it is important to schedule an appointment with Middletown Medical so we can evaluate your symptoms and develop a customized treatment plan. Our dedicated specialists are prepared to coordinate a long-term care plan for your post-COVID symptoms, including cardiac rehabilitation, pulmonary rehabilitation, physical therapy, and more.",
          },
        ],
      },
    ],
  },
  Ketamine_Clinic: {
    slug: "Ketamine_Clinic",
    title: "Ketamine Clinic",
    subtitle: "Orange County’s First Ketamine Clinic",
    heroImageUrl:
      "https://middletownmedical.com/wp-content/uploads/2022/12/aAdobeStock_288863883.jpg",
    heroImageAlt: "Healthcare professional comforting a patient",
    sections: [
      {
        type: "richText",
        heading: "What Is Ketamine Treatment?",
        body: [
          "Ketamine is an FDA-approved anesthetic that has been safely used around the world for more than five decades. It is also a medication that has been found to have fast-acting antidepressant properties.",
          "While ketamine isn’t considered a first-line therapy for chronic pain, depression, or any other mental health disorder, it can be used to treat severe cases of depression, anxiety, and/or PTSD that haven’t been successfully treated with conventional medications or therapies.",
        ],
      },
      {
        type: "richText",
        heading: "Benefits of Ketamine",
        body: [
          "Ketamine can be especially useful for specific types of pain, particularly neuropathic pain such as complex regional pain syndrome, trigeminal neuralgia, fibromyalgia, and neuropathy.",
          "Ketamine works by going into the central nervous system and resetting hypersensitized pain receptors. Sometimes pain receptors can become overactive, so that even a slight touch could be extremely painful. Ketamine can significantly reduce these symptoms.",
        ],
      },
      {
        type: "richText",
        heading: "Does Ketamine Have Side Effects?",
        body: [
          "Side effects of ketamine therapy tend to be fairly mild. The most common side effects include:",
          "• Nausea",
          "• Dizziness",
          "• Headaches",
          "• Short-term feelings of dissociation or feeling disconnected from your body, thoughts, and feelings",
        ],
      },
      {
        type: "providerHighlight",
        heading: "Meet Our Team",
        name: "Cynthia Delavalle, MS, AGPCNP-BC",
        title: "Adult-Gerontology Nurse Practitioner",
        imageUrl:
          "https://middletownmedical.com/wp-content/uploads/2023/02/eb5d4a72-019d-4aec-b5bc-1f9453958798.jpg",
        bio: [
          "Cynthia Delavalle, MS, AGPCNP-BC is an adult-gerontology nurse practitioner board-certified by the American Nurses Credentialing Center (ANCC). She specializes in interventional pain management.",
          "Ms. Delavalle has more than 30 years of experience as a registered nurse, working in acute care settings and critical care. She has been an active member of several professional organizations and is committed to providing compassionate, patient-centered care.",
        ],
      },
    ],
  },
  Same_Day_Appointments: {
    slug: "Same_Day_Appointments",
    title: "Same Day Appointments",
    subtitle: "No Waiting. Get Seen Today.",
    heroImageUrl:
      "https://middletownmedical.com/wp-content/uploads/2016/02/Drone-shot-Middletown-Location-during-Day.jpg",
    heroImageAlt: "Aerial view of Middletown Medical campus",
    sections: [
      {
        type: "richText",
        body: [
          "Middletown Medical is proud to offer Same-Day Appointments. We are currently offering Same-Day Appointments for Gastroenterology, Endocrinology, and Cardiology. To schedule your Same-Day Appointment, simply call one of the numbers below.",
          "Same-Day Appointments are available Monday–Friday, 9am–4pm.",
        ],
      },
      {
        type: "phoneCards",
        heading:
          "Call One of the Numbers Below to Set Up Your Same-Day Appointment",
        cards: [
          {
            label: "Gastroenterology",
            phone: "845-342-4774 ext. 4207",
            imageURL:
              "https://middletownmedical.com/wp-content/uploads/2020/07/11-Gastro-BG-wr.jpg",
          },
          {
            label: "Endocrinology",
            phone: "845-695-0210",
            imageURL:
              "https://middletownmedical.com/wp-content/uploads/2020/07/11-Endo-BG-wr.jpg",
          },
          {
            label: "Cardiology",
            phone: "845-421-6316",
            imageURL:
              "https://middletownmedical.com/wp-content/uploads/2020/07/11-Cardi-BG-wr.jpg",
          },
          {
            label: "Gynecology",
            phone: "845-342-4774",
            imageURL:
              "https://middletownmedical.com/wp-content/uploads/2020/07/11-gyno-wr.jpg",
          },
        ],
      },
    ],
  },
  Imaging_Services: {
    slug: "Imaging_Services",
    title: "Middletown Medical Imaging Services",
    subtitle: "On Your Schedule",
    heroImageUrl:
      "https://middletownmedical.com/wp-content/uploads/2018/11/Imaging-Services-Middletown-Medical.png",
    heroImageAlt: "Middletown Medical imaging and care",
    sections: [
      {
        type: "richText",
        body: [
          "You don't need to be a Middletown Medical patient for our imaging services. Just bring your prescription with you and our staff will be able to assist you.",
          "Struggling with insurance authorizations? Our staff will help with attaining the approval you need.",
          "We offer convenient and extended hours that work with your busy schedule.",
        ],
      },
      {
        type: "serviceLocations",
        heading: "Locations",
        locations: [
          {
            name: "Middletown",
            facilityName: "Middletown Center",
            addressLine1: "111 Maltese Drive",
            addressLine2: "Middletown, NY 10940",
            phone: "(845) 342-4774",
            services: [
              {
                title: "CT Scan Services",
                hours: ["Mon-Fri: 8am-9pm", "Sat-Sun: 9am-9pm"],
              },
              {
                title: "MRI Services",
                hours: ["Mon-Fri: 7:00am-9:00pm", "Sat & Sun: 7:00am-3:00pm"],
              },
              {
                title: "Ultrasound Services - General",
                hours: ["Mon-Fri: 7:00am-7:00pm", "Sat: 8:00am-2:00pm"],
              },
              {
                title: "Ultrasound Services - Vascular & Echocardiogram",
                hours: ["Mon-Fri: 7:00am-7:00pm", "Sat: 8:00am-4:00pm"],
              },
              {
                title: "X-Ray Services",
                note: "Walk-ins welcome! Just bring your prescription with you!",
                hours: ["Mon-Fri: 8am-9pm", "Sat-Sun: 9am-9pm"],
              },
            ],
          },
          {
            name: "Port Jervis",
            addressLine1: "100 Pike Street",
            addressLine2: "Port Jervis, NY 12771",
            phone: "(845) 858-8000",
            services: [
              {
                title: "CT Scan Services",
                hours: ["Mon-Fri: 8am-8pm", "Sat-Sun: 8am-1pm"],
              },
              {
                title: "Ultrasound Services - General",
                hours: ["Mon-Fri: 7:00am-7:00pm", "Sat: 8:00am-2:00pm"],
              },
              {
                title: "X-Ray Services",
                note: "Walk-ins welcome! Just bring your prescription with you!",
                hours: ["Mon-Fri: 8am-8pm", "Sat-Sun: 8am-1pm"],
              },
            ],
          },
          {
            name: "Newburgh",
            facilityName: "Newburgh Medical Center",
            addressLine1: "Mid Valley Mall, 47 N Plank Rd Suite 19",
            addressLine2: "Newburgh, NY 12550",
            phone: "(845) 561-8100",
            services: [
              {
                title: "CT Scan Services",
                hours: ["Mon-Fri: 8:00am-5:00pm"],
              },
              {
                title: "X-Ray Services",
                note: "Walk-ins welcome! Just bring your prescription with you!",
                hours: ["Mon-Fri: 8:00am-5:00pm"],
              },
            ],
          },
          {
            name: "Chester",
            facilityName: "Chester Center",
            addressLine1: "78 Brookside Avenue, Suite 143",
            addressLine2: "Chester, NY 10918",
            phone: "(845) 469-7900",
            services: [
              {
                title: "X-Ray Services",
                note: "Walk-ins welcome! Just bring your prescription with you!",
                hours: ["Mon-Fri: 8am-6pm", "Sat: 9am-1pm"],
              },
            ],
          },
          {
            name: "Monticello",
            facilityName: "Monticello Center",
            addressLine1:
              "32 Thompson Square (Thompson Square Mall / ShopRite Plaza)",
            addressLine2: "Monticello, NY 12701",
            phone: "(845) 791-5400",
            services: [
              {
                title: "CT Scan Services",
                note: "Calcium Score Testing - just $65",
                hours: ["Mon-Fri: 8am-6pm", "Sat: 9am-1pm"],
              },
              {
                title: "X-Ray Services",
                note: "Walk-ins welcome! Just bring your prescription with you!",
                hours: ["Mon-Fri: 8am-5pm"],
              },
            ],
          },
        ],
      },
    ],
  },
};

export function getServiceContent(slug: string): ServiceContent | null {
  if (SERVICES_CONTENT[slug]) return SERVICES_CONTENT[slug];
  return null;
}
