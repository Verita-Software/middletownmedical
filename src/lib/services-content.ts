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
      /** Optional link to provider's full profile page */
      profileUrl?: string;
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
    }
  | {
      type: "locationCards";
      heading?: string;
      /** Card grid: image, name, address, phone, hours, Directions */
      locations: {
        name: string;
        imageUrl: string;
        imageAlt?: string;
        addressLine1: string;
        addressLine2: string;
        phone?: string;
        hours?: string;
      }[];
    }
  | {
      type: "urgentLocationCards";
      heading?: string;
      /** Card grid: image, name, address, phone, hours, Directions */
      locations: {
        name: string;
        imageUrl: string;
        imageAlt?: string;
        addressLine1: string;
        addressLine2: string;
        phone?: string;
        hours?: string;
      }[];
    }
  | {
      type: "promoBanner";
      /** Main headline (e.g. "YOUR HEART SHOULD NEVER WAIT.") */
      heading: string;
      /** Subtext (e.g. "Same-day Cardiology appointments now available.") */
      subheading?: string;
      phone?: string;
      brandName?: string;
      imageUrl: string;
      imageAlt?: string;
    }
  | {
      type: "checkList";
      heading: string;
      items: string[];
    }
  | {
      type: "groupedList";
      heading: string;
      intro?: string;
      groups: {
        name: string;
        items: string[];
      }[];
    };

export type ServiceContent = {
  /** Route slug, e.g. Post_COVID-19_Recovery – must match /services/[id] */
  slug: string;
  title: string;
  subtitle?: string;
  heroImageUrl: string;
  heroImageAlt?: string;
  /** Optional mapping to provider data so we can show matching staff for this service. */
  providerFilter?: {
    specialties?: string[];
    /** Include these providers by profile URL even if they don't match specialties. */
    includeProviderUrls?: string[];
  };
  sections: ServiceSection[];
};

export const SERVICES_CONTENT: Record<string, ServiceContent> = {
  "Post_COVID-19_Recovery": {
    slug: "Post_COVID-19_Recovery",
    title: "Post COVID-19 Recovery",
    heroImageUrl:
      "https://middletownmedical.com/wp-content/uploads/2021/06/MM-AdobeStock_104818012.jpg",
    heroImageAlt: "Patient kayaking on a lake during recovery",
    providerFilter: {
      specialties: ["Pulmonary Medicine", "Primary / Family Medicine"],
    },
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
        type: "richText",
        heading: "How we support your recovery",
        body: [
          "Your recovery plan may include pulmonary rehabilitation, cardiac evaluation, physical therapy, or referrals to specialty care such as neurology or behavioral health. We coordinate across your care team so that every provider understands your history and goals.",
          "We also focus on symptom management and quality of life. That may include help with fatigue, sleep, shortness of breath, concentration problems, and mood changes. Our goal is to help you regain confidence in your day-to-day activities, whether that means returning to work, spending more time with family, or simply feeling more like yourself again.",
          "Telemedicine options are available for certain follow-up visits, making it easier to stay connected with your care team while you recover at home.",
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
          {
            question: "How should I prepare for my first post-COVID visit?",
            answer:
              "Bring a list of your current medications, any recent test results or hospital discharge summaries, and notes about the symptoms that concern you most. It can be helpful to keep a symptom diary for a few days before your visit so we can see how your energy, breathing, sleep, and mood change throughout the day.",
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
    providerFilter: {
      specialties: ["Behavioral Health", "Pain Management & Rehabilitation"],
    },
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
          "For mood disorders, ketamine may help improve symptoms for people who have not responded to traditional antidepressants. In these cases, treatment is carefully structured and closely monitored as part of a broader mental health plan.",
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
          "Most side effects are temporary and occur only around the time of treatment. Your care team will review potential risks with you and monitor you before, during, and after each session to keep you safe and comfortable.",
        ],
      },
      {
        type: "faq",
        heading: "What to expect from treatment",
        items: [
          {
            question: "What does a typical ketamine visit look like?",
            answer:
              "Before treatment begins, you will meet with our team to review your history, current medications, and goals. On the day of treatment, you will be in a monitored setting where we can track your vital signs and how you are feeling. Most visits last between one and two hours, including preparation and recovery time. You will need a trusted adult to drive you home.",
          },
          {
            question: "How many treatments will I need?",
            answer:
              "The number of treatments varies based on your diagnosis, how you respond, and your overall care plan. Some patients notice improvement after the first few sessions, while others may need a full series to see the strongest benefit. Our team will regularly check in with you and your referring provider to adjust your plan as needed.",
          },
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
    providerFilter: {
      specialties: ["Gastroenterology", "Endocrinology", "Cardiology"],
    },
    sections: [
      {
        type: "richText",
        body: [
          "Middletown Medical is proud to offer Same-Day Appointments. We are currently offering Same-Day Appointments for Gastroenterology, Endocrinology, and Cardiology. To schedule your Same-Day Appointment, simply call one of the numbers below.",
          "Same-Day Appointments are available Monday–Friday, 9am–4pm.",
        ],
      },
      {
        type: "richText",
        heading: "How same-day appointments work",
        body: [
          "When you call for a same-day appointment, our team will ask a few brief questions about your symptoms to match you with the right specialty and location. Whenever possible, we will schedule you with your existing Middletown Medical provider; if that’s not available, we will connect you with another member of our care team who can help.",
          "Same-day appointments are ideal for new or worsening concerns that need timely attention but do not require the emergency room. If your symptoms suggest an emergency, our staff will advise you to call 911 or go to the nearest emergency department.",
          "Please bring your photo ID, insurance card, and a list of your medications to your visit. If you are a new patient, arriving a few minutes early will help us complete your registration quickly so you can be seen on time.",
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
    providerFilter: {
      specialties: ["Radiology & Ultrasound", "Pulmonary Medicine"],
    },
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
        type: "richText",
        heading: "Comprehensive imaging close to home",
        body: [
          "Across our locations, we offer a full range of imaging, including CT, MRI, ultrasound, vascular and echocardiography studies, X-ray, and more. Our technologists are highly trained and work closely with board-certified radiologists who interpret your studies with care and attention to detail.",
          "Results are shared directly with your referring provider, and many studies are available quickly through our electronic health record. When appropriate, we coordinate follow-up imaging or specialty referrals so that next steps are clear.",
          "For most exams, you can wear comfortable clothing without metal zippers or snaps. Our team will let you know in advance if fasting or other preparation is required.",
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
  "3D_Mammography": {
    slug: "3D_Mammography",
    title: "3D Mammography",
    subtitle: "Genius™ 3D Mammography™ at Middletown Medical",
    heroImageUrl:
      "https://images.unsplash.com/photo-1579684385127-1ef15d508118?q=80&w=2400&auto=format&fit=crop",
    heroImageAlt: "Mammography and breast health screening",
    providerFilter: {
      specialties: ["Radiology & Ultrasound", "Gynecology"],
    },
    sections: [
      {
        type: "richText",
        heading:
          "Better detection. More accurate. An easier and faster experience.",
        body: [
          "Traditional 2D images are flat, and breast tissue can overlap in a way that creates shadows and makes images harder to read. 3D mammography captures multiple thin slices of the breast from different angles, giving your care team a clearer view through and around breast tissue. That can mean earlier detection and greater peace of mind.",
        ],
      },
      {
        type: "richText",
        heading: "Why clarity matters",
        body: [
          "Greater clarity often means better breast cancer detection and a reduced chance of needing additional screenings. *When compared to 2D imaging alone, 3D mammography has been shown to find more cancers and call fewer women back for follow-up tests.",
        ],
      },
      {
        type: "locationCards",
        heading: "Where we offer 3D mammography",
        locations: [
          {
            name: "60 Dunning Road – Gynecology, Suite 3",
            imageUrl:
              "https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?q=80&w=1200&auto=format&fit=crop",
            imageAlt: "Middletown Medical, 60 Dunning Road",
            addressLine1: "60 Dunning Road, Suite 3",
            addressLine2: "Middletown, NY 10940",
            phone: "(845) 342-4774",
          },
        ],
      },
      {
        type: "richText",
        body: [
          "Don’t wait. Schedule your annual mammogram today. One in eight women will be diagnosed with breast cancer in their lifetime — early detection saves lives.",
          "Call (845) 342-4774 or visit our main campus at 111 Maltese Drive, Middletown. We’re here to make scheduling simple and your visit as comfortable as possible.",
        ],
      },
      {
        type: "faq",
        heading: "3D mammography FAQs",
        items: [
          {
            question: "How often should I have a screening mammogram?",
            answer:
              "Most women at average risk begin annual screening mammograms between ages 40 and 45, but recommendations can vary based on your personal and family history. Your primary care provider or gynecologist will help you decide on the right schedule for you.",
          },
          {
            question:
              "Will a 3D mammogram feel different from a traditional mammogram?",
            answer:
              "The positioning and compression are very similar to a standard mammogram, and the exam typically takes only a few minutes. The main difference is the way the images are captured and processed, which happens behind the scenes to give your radiologist more information.",
          },
        ],
      },
    ],
  },
  Lung_Screening: {
    slug: "Lung_Screening",
    title: "Lung Screening",
    subtitle: "LDCT Lung Cancer Screening at Middletown Medical",
    heroImageUrl:
      "https://images.unsplash.com/photo-1581595220892-b0739db3ba8c?q=80&w=2400&auto=format&fit=crop",
    heroImageAlt: "Lung screening and respiratory care",
    providerFilter: {
      specialties: ["Pulmonary Medicine", "Radiology & Ultrasound"],
    },
    sections: [
      {
        type: "richText",
        heading: "What is LDCT lung screening?",
        body: [
          "We are pleased to offer Low-Dose CT (LDCT) lung cancer screening. Lung cancer is the leading cause of cancer deaths for both men and women worldwide — and finding it early can be life-saving. LDCT uses a small amount of radiation to create detailed images of your lungs, helping us spot small nodules or changes that may need follow-up.",
          "All insurances are accepted for this screening, including Medicare. If you qualify, scheduling is easy: call (845) 372-6679 to book your appointment.",
        ],
      },
      {
        type: "richText",
        heading: "Why screening matters",
        body: [
          "Of the top four deadliest cancers in the U.S. — lung, prostate, breast, and colorectal — lung cancer is the only one that has not historically been part of routine screening. The National Lung Screening Trial (NLST) showed that LDCT lung screening can save lives in people at high risk by finding cancer earlier, when it is easier to treat. If you meet the criteria, talking to your provider about screening is an important step.",
        ],
      },
      {
        type: "richText",
        heading: "Who may qualify for LDCT lung screening?",
        body: [
          "Key qualifications typically include: being between the ages of 55 and 77 and in generally good health; being a current smoker or a former smoker who quit within the past 15 years; and having a smoking history of at least 30 pack-years (for example, one pack per day for 30 years, or two packs per day for 15 years). Your provider can help you decide if screening is right for you.",
        ],
      },
      {
        type: "faq",
        heading: "Frequently asked questions",
        items: [
          {
            question: "Why does it matter if I have symptoms?",
            answer:
              "Lung cancer screening is meant for people at high risk who do not yet have symptoms. Finding cancer early, before symptoms develop, often leads to more treatment options and better outcomes. If you have symptoms such as a lasting cough, shortness of breath, or unexplained weight loss, your provider will guide you on the right next steps, which may include different tests or a specialist.",
          },
          {
            question:
              "I am in one of the high-risk groups but have been diagnosed with cancer in the past. Is LDCT lung screening appropriate for me?",
            answer:
              "A prior cancer history can affect whether LDCT screening is recommended and how often. Your healthcare provider will consider your full medical history and current health to determine the right plan for you. We encourage you to schedule an appointment to discuss your individual situation.",
          },
          {
            question: "What happens after my LDCT lung screening?",
            answer:
              "Your scan will be reviewed by a radiologist who specializes in interpreting imaging studies of the chest. In many cases, results are available quickly and are sent directly to your ordering provider. If the scan shows findings that need follow-up — such as a nodule or other change — your provider will talk with you about the next steps, which may include repeat imaging or a visit with a specialist.",
          },
        ],
      },
      {
        type: "richText",
        body: [
          "If you have more questions or are ready to schedule, call (845) 372-6679. Our team will help you understand the process and book a time that works for you.",
        ],
      },
    ],
  },
  Laboratory_Services: {
    slug: "Laboratory_Services",
    title: "Middletown Medical Laboratory Services",
    heroImageUrl:
      "https://middletownmedical.com/wp-content/uploads/2016/02/Drone-shot-Middletown-Location-during-Day.jpg",
    heroImageAlt: "Laboratory and diagnostic services",
    providerFilter: {
      specialties: ["Laboratory Services"],
    },
    sections: [
      {
        type: "richText",
        body: [
          "Middletown Medical’s on-site laboratories are designed to make testing simple, accurate, and convenient. Whether your provider orders routine blood work, cultures, or specialized tests, our team works to deliver reliable results and a smooth experience.",
          "We accept lab orders from outside providers for patients who have been seen at Middletown Medical at least once. That way, you can keep your care in one place and avoid extra trips across town.",
          "Our labs serve patients of all ages — from pediatrics through geriatrics — and we follow strict quality and safety standards so you and your provider can trust the results.",
          "To schedule a lab visit or ask about fasting, forms, or result timing, call (845) 342-4774 or use the locations below to find the lab nearest you and get directions.",
        ],
      },
      {
        type: "locationCards",
        heading: "Lab locations",
        locations: [
          {
            name: "419 East Main Street",
            imageUrl:
              "https://middletownmedical.com/wp-content/uploads/2025/10/Untitled-1366-x-768-px-980x551.png",
            imageAlt: "419 East Main Street, Middletown",
            addressLine1: "419 East Main Street",
            addressLine2: "Middletown, NY 10940",
            phone: "(845) 342-4774",
            hours: "Mon-Fri, 7:45 AM - 4:45 PM",
          },
          {
            name: "75 Maltese Drive",
            imageUrl:
              "https://middletownmedical.com/wp-content/uploads/2019/03/75-Maltese-Dr-Thumbnail-768x432.jpg",
            imageAlt: "75 Maltese Drive, Middletown",
            addressLine1: "75 Maltese Drive",
            addressLine2: "Middletown, NY 10940",
            phone: "(845) 342-4774",
            hours: "Mon-Fri, 7:00 AM - 4:45 PM",
          },
        ],
      },
      {
        type: "faq",
        heading: "Laboratory FAQs",
        items: [
          {
            question: "Do I need an appointment for lab work?",
            answer:
              "Some tests can be done on a walk-in basis, while others benefit from scheduled times to help manage fasting requirements or special preparations. When your provider orders your labs, our team will let you know if an appointment is recommended.",
          },
          {
            question: "How long will it take to get my results?",
            answer:
              "Turnaround time depends on the type of test. Many routine blood tests are available within one to two business days, while more specialized studies may take longer. Results are sent directly to your ordering provider and, when available, are also released to your patient portal.",
          },
        ],
      },
    ],
  },
  TMS: {
    slug: "TMS",
    title: "Transcranial Magnetic Stimulation (TMS)",
    subtitle: "Revolutionizing Depression Treatment at Middletown Medical",
    heroImageUrl:
      "https://middletownmedical.com/wp-content/uploads/2024/03/tms-3.jpg",
    heroImageAlt: "TMS and mental wellness",
    providerFilter: {
      specialties: ["Behavior Health"],
      includeProviderUrls: [
        "https://middletownmedical.com/medical-staff/Louie_Beth",
      ],
    },
    sections: [
      {
        type: "richText",
        heading: "What is TMS?",
        body: [
          "Transcranial Magnetic Stimulation (TMS) is a groundbreaking, non-invasive procedure that utilizes magnetic fields to stimulate nerve cells in the brain. It is FDA-approved and has been shown to be effective in treating symptoms of depression, including for many people who have not responded well to medication or therapy alone. TMS offers a safe and effective alternative when other treatments have not provided sufficient relief.",
        ],
      },
      {
        type: "richText",
        heading: "How does TMS work?",
        body: [
          "During a TMS session, highly focused magnetic pulses are delivered to specific areas of the brain associated with mood regulation, particularly the prefrontal cortex. The treatment coil is placed gently against the scalp — no surgery or implants are required. Sessions are typically done in an outpatient setting and last about 20–40 minutes. Many patients can return to their usual activities right after each visit.",
        ],
      },
      {
        type: "richText",
        heading: "Why consider TMS?",
        body: [
          "Unlike ECT (electroconvulsive therapy), TMS does not require anesthesia or cause seizures, and it is generally well tolerated. Side effects are often minimal and may include mild scalp discomfort or headache during or after treatment. Clinical studies have demonstrated that TMS can produce meaningful symptom reduction, with benefits that can last for months to years. Treatment plans are customized to your needs and response.",
        ],
      },
      {
        type: "richText",
        body: [
          "Schedule an appointment by phone or chat: (845) 342-4774. Our team can answer your questions and help you determine if TMS is right for you.",
        ],
      },
    ],
  },
  Treating_Depression_with_TMS: {
    slug: "Treating_Depression_with_TMS",
    title: "Treating Depression with Transcranial Magnetic Stimulation (TMS)",
    heroImageUrl:
      "https://middletownmedical.com/wp-content/uploads/2024/03/Depression.jpg",
    heroImageAlt: "Depression and TMS treatment",
    providerFilter: {
      specialties: ["Behavior Health"],
      includeProviderUrls: [
        "https://middletownmedical.com/medical-staff/Louie_Beth",
      ],
    },
    sections: [
      {
        type: "richText",
        heading: "Understanding depression",
        body: [
          "Depression is a common but serious mood disorder that affects how you feel, think, and handle daily activities. It can lead to persistent sadness, loss of interest in activities you once enjoyed, changes in sleep or appetite, low energy, and difficulty concentrating. For some, symptoms persist despite medication and therapy — and that’s where TMS may help.",
        ],
      },
      {
        type: "richText",
        heading: "How TMS helps",
        body: [
          "TMS works by delivering magnetic pulses to areas of the brain involved in mood regulation. By stimulating underactive regions, TMS can help alleviate depressive symptoms. It is FDA-approved for major depressive disorder and is often used when antidepressants have not provided adequate relief.",
        ],
      },
      {
        type: "richText",
        heading: "Benefits of TMS for depression",
        body: [
          "Non-invasive and well tolerated — no surgery or implants.",
          "Minimal side effects compared to many antidepressant medications.",
          "Effective, even for many people with treatment-resistant depression.",
          "Customized treatment plans tailored to your response and goals.",
          "Long-lasting results — many patients experience improvement that lasts for months to years.",
          "TMS provides a safe and effective alternative for individuals seeking relief from the burdens of depression, offering the potential for significant improvement in mood and overall well-being.",
        ],
      },
      {
        type: "richText",
        body: ["Schedule an appointment by phone or chat: (845) 342-4774."],
      },
    ],
  },
  Treating_Anxiety_with_TMS: {
    slug: "Treating_Anxiety_with_TMS",
    title: "Treating Anxiety with Transcranial Magnetic Stimulation (TMS)",
    heroImageUrl:
      "https://middletownmedical.com/wp-content/uploads/2024/03/Anxiety.jpg",
    heroImageAlt: "Anxiety and TMS care",
    providerFilter: {
      specialties: ["Behavior Health"],
      includeProviderUrls: [
        "https://middletownmedical.com/medical-staff/Louie_Beth",
      ],
    },
    sections: [
      {
        type: "richText",
        heading: "Understanding anxiety",
        body: [
          "Anxiety disorders can interfere with daily life, causing persistent worry, restlessness, difficulty concentrating, rapid heartbeat, sweating, and avoidance of certain situations. When anxiety does not improve sufficiently with therapy or medication, TMS may be an option to explore.",
        ],
      },
      {
        type: "richText",
        heading: "How TMS helps",
        body: [
          "TMS is primarily FDA-approved for depression, but emerging research suggests it may also benefit some people with anxiety disorders by targeting specific brain areas involved in fear and emotional regulation. This may help reduce anxiety symptoms and improve overall functioning. Further research is ongoing.",
        ],
      },
      {
        type: "richText",
        heading: "Benefits of TMS for anxiety",
        body: [
          "Potential reduction in anxiety symptoms.",
          "Improved mood and overall well-being.",
          "Non-invasive and well tolerated.",
          "Customized treatment plans for individual needs.",
          "While more research is needed, TMS represents a promising alternative for some individuals with anxiety disorders. Talk to your provider to see if it might be right for you.",
        ],
      },
      {
        type: "richText",
        body: ["Schedule an appointment by phone or chat: (845) 342-4774."],
      },
    ],
  },
  Treating_PTSD_with_TMS: {
    slug: "Treating_PTSD_with_TMS",
    title: "Treating PTSD with Transcranial Magnetic Stimulation (TMS)",
    heroImageUrl:
      "https://middletownmedical.com/wp-content/uploads/2024/03/ptsd.jpg",
    heroImageAlt: "PTSD and TMS treatment",
    providerFilter: {
      specialties: ["Behavior Health"],
      includeProviderUrls: [
        "https://middletownmedical.com/medical-staff/Louie_Beth",
      ],
    },
    sections: [
      {
        type: "richText",
        heading: "Understanding PTSD",
        body: [
          "Post-Traumatic Stress Disorder (PTSD) can develop after experiencing or witnessing a traumatic event. Symptoms may include flashbacks, nightmares, hypervigilance, avoidance of reminders of the trauma, and changes in mood or thinking. PTSD can significantly impact quality of life and daily functioning.",
        ],
      },
      {
        type: "richText",
        heading: "How TMS helps",
        body: [
          "TMS therapy targets brain areas involved in fear processing and emotional regulation. By stimulating these regions, TMS may help reduce PTSD symptoms and improve overall functioning. It is non-invasive and does not require anesthesia or cause seizures, making it an option some people consider when other treatments have not been enough.",
        ],
      },
      {
        type: "richText",
        heading: "Benefits of TMS for PTSD",
        body: [
          "Potential reduction in PTSD symptoms, such as flashbacks and hypervigilance.",
          "Improved mood and quality of life.",
          "Non-invasive and well tolerated.",
          "Customized treatment plans for individual needs.",
          "Research in this area continues to grow. TMS may offer new hope for some individuals living with PTSD. Schedule a conversation with our team to learn more.",
        ],
      },
      {
        type: "richText",
        body: ["Schedule an appointment by phone or chat: (845) 342-4774."],
      },
    ],
  },
  Treating_ADHD_with_TMS: {
    slug: "Treating_ADHD_with_TMS",
    title: "Treating ADHD with Transcranial Magnetic Stimulation (TMS)",
    heroImageUrl:
      "https://middletownmedical.com/wp-content/uploads/2024/03/adhd.jpg",
    heroImageAlt: "ADHD and TMS care",
    providerFilter: {
      specialties: ["Behavior Health"],
      includeProviderUrls: [
        "https://middletownmedical.com/medical-staff/Louie_Beth",
      ],
    },
    sections: [
      {
        type: "richText",
        heading: "Understanding ADHD",
        body: [
          "Attention-Deficit/Hyperactivity Disorder (ADHD) involves persistent difficulties with attention, hyperactivity, and impulsivity that can affect work, school, and relationships. ADHD often coexists with mood disorders, and standard treatments may not fully address all symptoms for everyone.",
        ],
      },
      {
        type: "richText",
        heading: "How TMS helps",
        body: [
          "TMS is being studied for its potential to improve attention and executive function in people with ADHD. By targeting regions of the brain involved in focus and impulse control, TMS may offer an additional option for some individuals. Your provider can help you understand whether TMS might be appropriate as part of your care plan.",
        ],
      },
      {
        type: "richText",
        heading: "Benefits of TMS for ADHD",
        body: [
          "Potential improvement in attention and focus.",
          "Reduction in impulsivity and hyperactivity for some patients.",
          "Non-invasive and well tolerated.",
          "Customized treatment plans for individual needs.",
          "TMS represents a promising area of research for ADHD. If you are interested in learning more, our team is here to discuss your options.",
        ],
      },
      {
        type: "richText",
        body: ["Schedule an appointment by phone or chat: (845) 342-4774."],
      },
    ],
  },
  Addiction_Medicine: {
    slug: "Addiction_Medicine",
    title: "Addiction Medicine",
    subtitle: "at Middletown Medical",
    heroImageUrl:
      "https://middletownmedical.com/wp-content/uploads/2022/11/addiction.jpg",
    heroImageAlt: "Addiction medicine and recovery",
    providerFilter: { specialties: ["Addiction Medicine"] },
    sections: [
      {
        type: "richText",
        heading: "Addiction has many faces",
        body: [
          "Middletown Medical, PC is here to help. In the United States, 21.7 million people need or receive treatment for substance use disorders. Substance-related disorders can involve alcohol, IV drugs, prescription medications, and more. They are chronic, complex diseases that require prolonged, intensive treatment.",
        ],
      },
      {
        type: "richText",
        body: [
          "At Middletown Medical, PC, Lori Musorrafiti, FNP-BC is a skilled Addiction Management specialist. Her experience includes opioid use disorder, including dispensing the prescription Suboxone, and providing education and counseling related to opioid use disorder and pain medication management.",
          "Explore your options for addiction and medication management: schedule an appointment with Lori Musorrafiti, FNP-BC today. Appointments available in Middletown.",
        ],
      },
      {
        type: "providerHighlight",
        heading: "Meet our addiction medicine provider",
        name: "Lori Musorrafiti, FNP-BC",
        title: "Family Medicine · Addiction Medicine",
        imageUrl:
          "https://dashboard.middletownmedical.com/storage/profile_pictures/826469e9-50ab-4e75-8939-646bb2b74996.png",
        profileUrl:
          "https://middletownmedical.com/medical-staff/Musorrafiti_Lori",
        bio: [
          "Lori Musorrafiti, FNP-BC is a family nurse practitioner with over 10 years of experience in the medical field, board-certified by the American Nurses Credentialing Center (ANCC).",
          "Her specialized experience has included Endocrinology, Emergency Medicine, Addiction Medicine, Primary Care, Gynecology, and more. She sees patients at 111 Maltese Drive - Medical Campus.",
        ],
      },
      {
        type: "richText",
        body: ["Schedule an appointment by phone or chat: (845) 342-4774."],
      },
    ],
  },
  "Allergy_&_Immunology": {
    slug: "Allergy_&_Immunology",
    title: "Allergy & Immunology",
    subtitle: "at Middletown Medical",
    heroImageUrl:
      "https://middletownmedical.com/wp-content/uploads/2019/10/Allergy-BG-wr.jpg",
    heroImageAlt: "Allergy and immunology care",
    providerFilter: { specialties: ["Allergy"] },
    sections: [
      {
        type: "richText",
        heading: "Allergy & Immunology",
        body: [
          "Our board-certified physician has special insight in the assessment and treatment of common and rare allergies and allergic diseases including asthma, hay fever, sinusitis as well as bee sting and food and drug allergies. Under the care of our physician and his professional staff, you will receive the most up-to-the-minute treatment and therapy options to improve your quality of life.",
        ],
      },
      {
        type: "richText",
        body: ["Schedule an appointment by phone or chat: (845) 342-4774."],
      },
    ],
  },
  Behavioral_Health: {
    slug: "Behavioral_Health",
    title: "Behavioral Health",
    subtitle: "at Middletown Medical",
    heroImageUrl:
      "https://middletownmedical.com/wp-content/uploads/2024/01/AdobeStock_635108385.jpg",
    heroImageAlt: "Behavioral health and wellness",
    providerFilter: { specialties: ["Behavior Health"] },
    sections: [
      {
        type: "richText",
        heading: "Behavioral Health at Middletown Medical",
        body: [
          "Empowering Minds, Transforming Lives.",
          "Middletown Medical's Behavioral Health Services have expanded to include Transcranial Magnetic Stimulation (TMS), an innovative treatment for a range of mental health conditions. Our dedicated team of professionals is here to support your journey to wellness.",
        ],
      },
      {
        type: "serviceLocations",
        heading: "Location",
        locations: [
          {
            name: "Middletown Medical Behavioral Health",
            addressLine1: "419 East Main Street, Suite 307",
            addressLine2: "Middletown, NY 10940",
            phone: "(845) 342-4774",
          },
        ],
      },
      {
        type: "richText",
        heading: "Introducing Transcranial Magnetic Stimulation (TMS)",
        body: [
          "TMS is a non-invasive, FDA-approved therapy used to treat depression and other mental health disorders. It uses magnetic fields to stimulate nerve cells in the brain, offering hope for many who have not responded fully to medication or therapy alone.",
        ],
      },
      {
        type: "richText",
        heading: "Key benefits of TMS",
        body: [
          "Non-invasive with minimal side effects.",
          "FDA approved for depression treatment.",
          "No anesthesia or sedation required.",
          "Outpatient procedure — patients can return to daily activities immediately.",
        ],
      },
      {
        type: "richText",
        heading: "Start your journey with us",
        body: [
          "We welcome patients for TMS therapy and comprehensive behavioral health care. Your mental health journey is unique, and at Middletown Medical we are committed to providing personalized care tailored to your individual needs. Schedule your appointment by phone or chat to get started.",
        ],
      },
      {
        type: "richText",
        body: ["Schedule an appointment by phone or chat: (845) 342-4774."],
      },
    ],
  },
  Cardiology: {
    slug: "Cardiology",
    title: "Cardiology",
    subtitle: "at Middletown Medical",
    heroImageUrl:
      "https://middletownmedical.com/wp-content/uploads/2019/10/Cardiology-BG-wr.jpg",
    heroImageAlt: "Cardiology and heart care",
    providerFilter: { specialties: ["Cardiology"] },
    sections: [
      {
        type: "richText",
        heading: "Our cardiology team",
        body: [
          "Our board-certified cardiologists bring expertise in interventional cardiology, cardiovascular disease, echocardiography, nuclear cardiology, and more. We create personalized treatment plans and use state-of-the-art diagnostic procedures and equipment. Our office offers nuclear stress testing, echocardiography, Holter monitoring, BP monitoring, and T-wave alternans testing.",
        ],
      },
      {
        type: "richText",
        body: ["Schedule an appointment by phone or chat: (845) 342-4774."],
      },
      {
        type: "promoBanner",
        heading: "YOUR HEART SHOULD NEVER WAIT.",
        subheading: "Same-day Cardiology appointments now available.",
        phone: "(845) 342-4774",
        brandName: "MIDDLETOWN MEDICAL",
        imageUrl:
          "https://images.unsplash.com/photo-1559757175-5700dde675bc?q=80&w=800&auto=format&fit=crop",
        imageAlt: "Cardiology care at Middletown Medical",
      },
      {
        type: "richText",
        heading:
          "Peripheral arterial disease (PAD) — a serious medical condition",
        body: [
          "Often asymptomatic, underdiagnosed, and untreated.",
          "PAD affects 8–12 million Americans. About 18% of the Medicare population has PAD, and 66% of all PAD patients have no symptoms. PAD increases the risk of cardiovascular disease and events. Monitoring for risk factors and symptoms is essential.",
        ],
      },
      {
        type: "richText",
        heading: "Risk factors",
        body: [
          "Smokers · Age 50+ · Diabetes · High blood pressure · High cholesterol · Obesity · Chronic kidney disease · Family history of heart disease, heart attack, or stroke · History of COVID-19.",
        ],
      },
      {
        type: "richText",
        heading: "Symptoms",
        body: [
          "Muscle pain and cramping in legs (especially with activity), non-healing wounds, diabetic foot ulcers, discomfort in feet and legs, change in leg appearance or temperature.",
        ],
      },
      {
        type: "richText",
        heading: "No risk of losing your patients",
        body: [
          "Referred patients are treated by our vascular specialists and returned to your care.",
        ],
      },
      {
        type: "richText",
        heading: "Easy scheduling",
        body: [
          "Quick and easy scheduling process to help avoid risk of admission or increased risk for amputation.",
        ],
      },
      {
        type: "richText",
        heading: "Safe, comforting outpatient center",
        body: [
          "Board-certified experts perform minimally invasive procedures in our fully equipped facility. You can rely on our team to provide high-quality, compassionate care before, during, and after each procedure without a hospital stay.",
          "If diagnosed early, PAD is treatable; if not, PAD can lead to amputation or worse. Patients with ulcers and wounds should be referred immediately as they may already have critical limb ischemia (CLI). Minimally invasive, image-guided procedures improve patients' comfort, safety, and outcomes. We prevent more than 80% of amputations in patients who were told it was the only option.",
        ],
      },
      {
        type: "richText",
        body: ["Schedule an appointment by phone or chat: (845) 342-4774."],
      },
    ],
  },
  Dermatology: {
    slug: "Dermatology",
    title: "Dermatology",
    subtitle: "at Middletown Medical",
    heroImageUrl:
      "https://middletownmedical.com/wp-content/uploads/2019/12/Dermatology-BG-WR.jpg",
    heroImageAlt: "Dermatology and skin care",
    providerFilter: { specialties: ["Dermatology"] },
    sections: [
      {
        type: "richText",
        heading: "Dermatology at Middletown Medical",
        body: [
          "Comprehensive Skin Care for All Ages.",
          "The Dermatology team at Middletown Medical provides expert care for conditions affecting the skin, hair, and nails. Our experienced providers offer personalized, evidence-based treatment plans for patients of all ages, focusing on both prevention and long-term skin health.",
          "Whether you are managing a chronic skin condition, noticing changes in your skin, or seeking routine screenings, our team is here to support you with compassionate, high-quality care.",
          "Explore our full range of advanced skin care solutions by visiting our dedicated dermatology website — MMPC Skincare.",
        ],
      },
      {
        type: "richText",
        heading: "What to expect at your dermatology visit",
        body: [
          "Your visit begins with a thorough evaluation of your skin concerns. Our providers will review your medical history, perform a detailed skin examination, and discuss treatment options tailored to your needs.",
          "Follow-up care and ongoing management are an important part of maintaining healthy skin, and our team is committed to supporting you beyond your initial visit.",
        ],
      },
      {
        type: "richText",
        body: [
          "Dermatology services are offered at three convenient Middletown Medical locations.",
        ],
      },
      {
        type: "serviceLocations",
        heading: "Our locations",
        locations: [
          {
            name: "Middletown",
            addressLine1: "419 East Main Street, Suite 302",
            addressLine2: "Middletown, NY 10940",
            phone: "(845) 342-4774",
          },
          {
            name: "Newburgh",
            addressLine1: "47 North Plank Road, Suite 2A",
            addressLine2: "Newburgh, NY 12550",
            phone: "(845) 561-8100",
          },
          {
            name: "Warwick",
            addressLine1: "200 Ronald Reagan Boulevard",
            addressLine2: "Warwick, NY 10990",
            phone: "(845) 342-4774",
          },
        ],
      },
      {
        type: "richText",
        heading: "Schedule your dermatology appointment",
        body: [
          "Schedule by phone at (845) 421-7040 or visit mm.care/chat for online scheduling options.",
        ],
      },
      {
        type: "richText",
        heading: "Conditions treated",
        body: [
          "Middletown Medical's Dermatology Department specializes in treating a wide range of unusual and complex conditions and diseases, including: autoimmune diseases, basal cell carcinoma, blistering (bullous) diseases, canker sore, chronic hives, hyperhidrosis, itchy skin (pruritus), keloids, lichen planus, lip cancer, melanoma, moles, panniculitis, pigmentation disorders, polymorphous light eruption, porphyria cutanea tarda, psoriasis, skin cancer, and vitiligo.",
        ],
      },
    ],
  },
  "Diabetes_In_Children_&_Teens": {
    slug: "Diabetes_In_Children_&_Teens",
    title: "Diabetes In Children & Teens",
    subtitle: "At Middletown Medical",
    heroImageUrl:
      "https://middletownmedical.com/wp-content/uploads/2019/06/endocrinology-cover-image.jpg",
    heroImageAlt: "Children and teens health",
    providerFilter: {
      specialties: ["Endocrinology", "Pediatrics", "Pediatric Endocrinology"],
    },
    sections: [
      {
        type: "richText",
        heading: "Parents",
        body: [
          "Millions of people live with diabetes. While Type 1 and Type 2 are incurable, with the right treatment and an experienced healthcare team, your child can lead a long, healthy, and happy life.",
        ],
      },
      {
        type: "richText",
        heading: "What is Type 1 diabetes?",
        body: [
          "Type 1 diabetes is an autoimmune disease in which the pancreas stops producing insulin. Without insulin, the body cannot use sugar for energy, and blood sugar levels rise.",
        ],
      },
      {
        type: "richText",
        heading: "What are the warning signs of Type 1 diabetes?",
        body: [
          "Signs often develop quickly, over a matter of weeks. They can include: drowsiness or lethargy, extreme thirst, frequent urination, fruity odor on the breath, increased appetite, heavy or labored breathing, sudden weight loss, sudden vision changes, sugar in the urine, and stupor or unconsciousness.",
        ],
      },
      {
        type: "richText",
        heading: "Living with Type 1 diabetes",
        body: [
          "With proper care and disease management, people with Type 1 diabetes can live long, happy lives. Treatment and lifestyle choices are tailored to each patient with support from our team.",
        ],
      },
      {
        type: "richText",
        heading: "What is Type 2 diabetes?",
        body: [
          "Type 2 diabetes occurs when the pancreas makes insulin but the body cannot use it normally. Risk factors can include diet and a sedentary lifestyle; it is increasingly seen in children and teens.",
        ],
      },
      {
        type: "richText",
        heading: "What are the warning signs of Type 2 diabetes?",
        body: [
          "Symptoms often develop gradually and may be hard to notice; sometimes Type 2 is diagnosed during a routine physical. Signs can include: drowsiness or lethargy, extreme thirst, frequent urination, sudden vision changes, and non-healing sores or frequent infections.",
        ],
      },
      {
        type: "richText",
        heading: "Living with Type 2 diabetes",
        body: [
          "Treatment for Type 2 diabetes includes blood sugar monitoring, healthy eating, and regular exercise, and may be supplemented with insulin or other medications. As a child's body grows and changes, treatment is adjusted over time.",
        ],
      },
      {
        type: "richText",
        heading: "What should I do if I believe my child may have diabetes?",
        body: [
          "If you notice any of the signs or symptoms listed above, talk to your doctor. Middletown Medical's pediatric endocrinology team specializes in the diagnosis, treatment, and management of both Type 1 and Type 2 diabetes in children and teens.",
        ],
      },
      {
        type: "providerHighlight",
        heading: "Your dedicated pediatric endocrinologist",
        name: "Prajith Mepparambath, MD",
        title: "Pediatric Endocrinology",
        imageUrl:
          "https://dashboard.middletownmedical.com/storage/profile_pictures/3ecdb4d2-4574-43cd-801b-2ee79c4531b8.png",
        profileUrl:
          "https://middletownmedical.com/medical-staff/Mepparambath_Prajith",
        bio: [
          "Dr. Prajith Mepparambath is a pediatric endocrinologist specializing in the acute and advanced care of pediatric endocrine patients, including diabetes, growth disorders, thyroid and adrenal disorders, and other endocrine conditions.",
          "He sees patients at 35 Maltese Drive, Middletown. Schedule an appointment by phone or chat: (845) 342-4774 or mm.care/chat.",
        ],
      },
      {
        type: "richText",
        body: [
          "Learn more about our pediatric endocrinology services today: (845) 342-4774 or mm.care/chat.",
        ],
      },
    ],
  },

  Dietitian_Nutritionist: {
    slug: "Dietitian_Nutritionist",
    title: "Nutrition & Diabetes Care",
    subtitle: "at Middletown Medical",
    heroImageUrl:
      "https://images.unsplash.com/photo-1490645935967-10de6ba17061?q=80&w=2400&auto=format&fit=crop",
    heroImageAlt: "Nutrition and diabetes care",
    providerFilter: { specialties: ["Dietitian Nutritionist"] },
    sections: [
      {
        type: "richText",
        body: [
          "At Middletown Medical, our dedicated team of dietitians and diabetes care specialists is here to help you take control of your health through personalized guidance, education, and support. Whether you're managing diabetes, working toward healthier eating habits, or looking for nutrition solutions tailored to your lifestyle, we're here for you every step of the way.",
        ],
      },
      {
        type: "richText",
        heading: "Meet our nutrition & diabetes care team",
        body: [
          "With over 30 years of experience, our team has helped thousands of patients take control of their health. We specialize in diabetes management, nutrition education, and empowering patients with practical tools to live healthier lives. Our registered dietitian nutritionists and certified specialists provide evidence-based strategies for weight management, cardiovascular health, and lifestyle changes that fit each patient's unique needs.",
        ],
      },
      {
        type: "richText",
        heading: "Our expanding diabetes nutrition program",
        body: [
          "Our comprehensive diabetes care program is designed to give you the tools and knowledge you need to live well with diabetes. Services include: diabetes self-management education; one-on-one nutrition counseling; personalized meal planning and goal setting; support for type 1, type 2, and gestational diabetes; weight management and lifestyle strategies; and ongoing follow-up and support.",
        ],
      },
      {
        type: "richText",
        heading: "Why choose Middletown Medical for nutrition & diabetes care?",
        body: [
          "Experienced team with specialized training in diabetes and medical nutrition therapy. Personalized, patient-centered care tailored to your goals. Support for managing chronic conditions and preventive health. Coordinated care with your primary care provider and specialists.",
        ],
      },
      {
        type: "richText",
        body: ["Schedule an appointment by phone or chat: (845) 342-4774."],
      },
    ],
  },
  Endocrinology: {
    slug: "Endocrinology",
    title: "Endocrinology",
    subtitle: "at Middletown Medical",
    heroImageUrl:
      "https://images.unsplash.com/photo-1576091160550-2173dba999ef?q=80&w=2400&auto=format&fit=crop",
    heroImageAlt: "Endocrinology and diabetes care",
    providerFilter: { specialties: ["Endocrinology"] },
    sections: [
      {
        type: "richText",
        heading: "What is an endocrinologist?",
        body: [
          "Endocrinologists are doctors who specialize in treating disorders of the endocrine system, such as diabetes, hyperthyroidism, and many others. They are specialists of internal medicine or pediatrics.",
          "Schedule an appointment by phone or chat: (845) 342-4774.",
        ],
      },
      {
        type: "richText",
        body: [
          "The body's endocrine system includes the pancreas, the thyroid, parathyroid, pineal, hypothalamus, adrenal and pituitary glands, and the ovaries and testes. It also involves many other organs that respond to, modify, or metabolize hormones.",
        ],
      },
      {
        type: "richText",
        body: [
          "Middletown Medical's Division of Endocrinology, Diabetes, Metabolism & Nutrition is one of the best in the region, with locations in Chester, 60 Dunning Rd in Middletown, and 75 Maltese Dr. in Middletown. Our endocrinologists are trained to evaluate and treat people for endocrine and metabolic disorders. We also offer Pediatric endocrinology with a convenient schedule to help your children without hurting your schedule or theirs.",
        ],
      },
      {
        type: "serviceLocations",
        heading: "Our locations",
        locations: [
          {
            name: "Chester",
            addressLine1: "78 Brookside Avenue, Suite 143",
            addressLine2: "Chester, NY 10918",
            phone: "(845) 469-7900",
          },
          {
            name: "Middletown — 60 Dunning Road",
            addressLine1: "60 Dunning Road",
            addressLine2: "Middletown, NY 10940",
            phone: "(845) 342-4774",
          },
          {
            name: "Middletown — 75 Maltese Drive",
            addressLine1: "75 Maltese Drive",
            addressLine2: "Middletown, NY 10940",
            phone: "(845) 342-4774",
          },
        ],
      },
      {
        type: "richText",
        body: [
          "Middletown Medical receives top ranks from patients just like you. Our team of dedicated endocrinologists evaluates the relationship between nutrition and human disease to improve and maintain a person's health and are trained to treat a wide range of endocrine disorders and dysfunctions. We offer a multidisciplinary approach to a person's medical problems, including:",
        ],
      },
      {
        type: "richText",
        heading: "Conditions we treat",
        body: [
          "Diabetes.",
          "Nutrition.",
          "Osteoporosis and calcium disorders.",
          "Pituitary, gonad, and adrenal disorders.",
          "Thyroid disorders.",
        ],
      },
      {
        type: "richText",
        heading:
          "Peripheral Arterial Disease (PAD) – A Serious Medical Condition",
        body: [
          "Often Asymptomatic, Underdiagnosed, and Untreated.",
          "PAD affects 8–12 million Americans | 18% of the Medicare population has PAD | 66% of all PAD patients have NO symptoms.",
          "Patients who may have PAD should be tested—it's more than a pain in the leg.",
          "PAD is associated with a 6 times higher risk for cardiovascular disease/event (heart attack/stroke). Watch for risk factors and symptoms in your patients.",
        ],
      },
      {
        type: "richText",
        heading: "Risk factors",
        body: [
          "Smokers · Age 50+ · Diabetics · High blood pressure · High cholesterol · Obesity · Chronic kidney disease · Family medical history (heart disease, heart attack or stroke) · History of COVID-19.",
        ],
      },
      {
        type: "richText",
        heading: "Symptoms",
        body: [
          "Muscle pain and cramping (often in the calf, buttocks or thigh; leg pain while walking or exercising).",
          "Non-healing wounds (often on the legs and feet).",
          "Diabetic foot ulcers (approx. 1/2 of diabetics have PAD).",
          "Discomfort in feet and legs (coldness, numbness, feeling of heaviness).",
          "Change in leg appearance (hair loss, slow hair growth, change in leg color, excessively shiny skin).",
        ],
      },
      {
        type: "richText",
        heading: "No risk of losing your patients",
        body: [
          "Referred patients are treated by our vascular specialists and returned to your care.",
        ],
      },
      {
        type: "richText",
        heading: "Easy scheduling",
        body: [
          "Quick and easy scheduling process to help avoid risk of an admission or increased risk for amputation.",
        ],
      },
      {
        type: "richText",
        heading: "Safe, comforting outpatient center",
        body: [
          "Board-certified experts perform minimally invasive procedures in our fully equipped facility.",
          "You can rely on our team to provide high quality, compassionate care before, during and after each procedure without a hospital stay.",
        ],
      },
      {
        type: "richText",
        body: [
          "If diagnosed early, PAD is treatable; if not, PAD can lead to amputation, even death.",
          "Patients with ulcers and wounds should be referred immediately as they may already have critical limb ischemia (CLI), which can lead to amputation. Minimally invasive, image-guided procedures improve patients' comfort, safety and outcomes.",
          "We prevent more than 80% of amputations in patients who were told it was the only option.",
        ],
      },
      {
        type: "richText",
        body: ["Schedule an appointment by phone or chat: (845) 342-4774."],
      },
    ],
  },
  Gastroenterology: {
    slug: "Gastroenterology",
    title: "Gastroenterology",
    subtitle: "at Middletown Medical",
    heroImageUrl:
      "https://middletownmedical.com/wp-content/uploads/2019/10/Gastro-BG-wr2.jpg",
    heroImageAlt: "Gastroenterology at Middletown Medical",
    providerFilter: { specialties: ["Gastroenterology"] },
    sections: [
      {
        type: "richText",
        heading: "Our Gastroenterology Team",
        body: [
          "The board-certified gastroenterologists and advanced practice providers at Middletown Medical provide comprehensive care for conditions affecting the digestive system. From colon cancer screening and Crohn's disease to Barrett's esophagus, ulcers, and GERD, our team offers advanced diagnostics and treatment in a caring environment.",
          "Our state-of-the-art endoscopy suite supports colonoscopy, upper endoscopy, and other procedures so you can get the care you need close to home.",
        ],
      },
      {
        type: "richText",
        body: ["Schedule an appointment by phone or chat: 845.342.4774"],
      },
      {
        type: "serviceLocations",
        heading: "Our locations",
        locations: [
          {
            name: "Middletown",
            addressLine1: "111 Maltese Drive",
            addressLine2: "Middletown, NY 10940",
            phone: "(845) 342-4774",
          },
          {
            name: "Port Jervis",
            addressLine1: "100 Pike Street",
            addressLine2: "Port Jervis, NY 12771",
            phone: "(845) 858-8000",
          },
        ],
      },
    ],
  },
  Gynecology: {
    slug: "Gynecology",
    title: "Gynecology",
    subtitle: "at Middletown Medical",
    heroImageUrl:
      "https://middletownmedical.com/wp-content/uploads/2019/10/ob-BG.jpg",
    heroImageAlt: "Gynecology at Middletown Medical",
    providerFilter: { specialties: ["Gynecology"] },
    sections: [
      {
        type: "richText",
        heading: "Our Gynecology Team",
        body: [
          "Our board-certified gynecologists provide care for women throughout their lives in a caring, comforting environment. From annual exams and preventive care to early detection and treatment of conditions, we are committed to supporting your health at every stage.",
        ],
      },
      {
        type: "richText",
        body: ["Schedule an appointment by phone or chat: 845.342.4774"],
      },
      {
        type: "richText",
        heading: "Community and care",
        body: [
          "The staff at our Gynecology office in Middletown dyed their hair pink in support of Breast Cancer Awareness month.",
        ],
      },
      {
        type: "serviceLocations",
        heading: "Our locations",
        locations: [
          {
            name: "60 Dunning Road – Gynecology, Suite 3",
            addressLine1: "60 Dunning Road, Suite 3",
            addressLine2: "Middletown, NY 10940",
            phone: "(845) 342-4774",
          },
        ],
      },
    ],
  },
  "Hematology_&_Oncology": {
    slug: "Hematology_&_Oncology",
    title: "Hematology & Oncology",
    subtitle: "Treating Patients. Beating Cancer.",
    heroImageUrl:
      "https://middletownmedical.com/wp-content/uploads/2019/10/oncology-BG-wr.jpg",
    heroImageAlt: "Hematology and oncology care",
    providerFilter: {
      specialties: ["Hematology", "Oncology"],
    },
    sections: [
      {
        type: "richText",
        heading: "Comprehensive Care and Support",
        body: [
          "Welcome to the Hematology & Oncology Department at Middletown Medical. Our dedicated team of compassionate physicians, nurses, and support staff provides comprehensive, personalized, and evidence-based care for patients of all ages.",
          "From blood disorders to various types of cancer, we offer advanced diagnostics, treatment options, and a multidisciplinary approach to care. Our collaborative team works closely with other medical disciplines to develop tailored treatment plans. We also provide emotional support and resources for you and your loved ones.",
          "Choose Middletown Medical for exceptional Hematology & Oncology care. We're honored to be part of your journey.",
        ],
      },
      {
        type: "richText",
        heading: "Request An Appointment",
        body: [
          "Make the first step towards relieving your pain. Call (845) 342-4774 or submit an online request to schedule your visit.",
        ],
      },
      {
        type: "serviceLocations",
        heading: "Our locations",
        locations: [
          {
            name: "Middletown",
            addressLine1: "111 Maltese Drive",
            addressLine2: "Middletown, NY 10940",
            phone: "(845) 342-4774",
          },
          {
            name: "Newburgh",
            addressLine1: "47 North Plank Road, Suite 19",
            addressLine2: "Newburgh, NY 12550",
            phone: "(845) 561-8100",
          },
        ],
      },
    ],
  },
  Intensive_Cardiac_Rehabilitation: {
    slug: "Intensive_Cardiac_Rehabilitation",
    title: "Intensive Cardiac Rehabilitation",
    subtitle: "at Middletown Medical",
    heroImageUrl:
      "https://middletownmedical.com/wp-content/uploads/2026/01/cardiovascular-health-how-exercise-strengthens-your-heartnxxf.jpg",
    heroImageAlt: "Intensive cardiac rehabilitation",
    providerFilter: { specialties: ["Cardiology"] },
    sections: [
      {
        type: "richText",
        heading: "Supporting Recovery, One Beat at a Time",
        body: [
          "Our program includes closely monitored exercise therapy, heart-healthy nutrition education, risk factor reduction and lifestyle coaching, and stress management with emotional support. At Middletown Medical, PC, we understand that heart recovery is personal. Every patient is unique, and our team is here to support your journey back to strength and health.",
        ],
      },
      {
        type: "richText",
        heading: "What Is Intensive Cardiac Rehabilitation?",
        body: [
          "Intensive Cardiac Rehabilitation is a comprehensive, medically supervised program designed for patients recovering from heart-related conditions or procedures. We focus on heart health, physical strength, nutrition, stress management, and lifestyle habits.",
          "You'll work with our team on a customized exercise therapy plan, risk factor reduction, lifestyle coaching, and emotional support—all with an evidence-based approach tailored to your needs.",
        ],
      },
      {
        type: "richText",
        heading: "How Our Team at Middletown Medical Can Help",
        body: [
          "Our dedicated, multidisciplinary team provides personalized care and works closely with your cardiologist and primary care provider. We offer individualized treatment plans, ongoing monitoring, and education to help every step of the way, creating a supportive and encouraging environment.",
        ],
      },
      {
        type: "richText",
        heading: "Schedule Your Appointment",
        body: [
          "Take the first step toward recovery today. Call 845-317-8139 to schedule your Intensive Cardiac Rehabilitation appointment at our Middletown location.",
          "Appointments are available at our Middletown Office. Schedule an appointment by phone or chat: 845-317-8139.",
        ],
      },
      {
        type: "richText",
        heading: "Why Choose Middletown Medical, PC?",
        body: [
          "Comprehensive, personalized care.",
          "Experienced cardiac rehabilitation specialists.",
          "Collaborative, team-based approach.",
          "Focus on long-term success.",
          "Convenient access within a trusted multispecialty practice.",
          "We're here to help you return to a stronger, healthier life. Stronger Hearts Start Here.",
        ],
      },
      {
        type: "serviceLocations",
        heading: "Our locations",
        locations: [
          {
            name: "Middletown",
            addressLine1: "111 Maltese Drive",
            addressLine2: "Middletown, NY 10940",
            phone: "(845) 317-8139",
          },
        ],
      },
    ],
  },
  Interventional_Gastroenterology: {
    slug: "Interventional_Gastroenterology",
    title: "Interventional Gastroenterology",
    subtitle: "Appointments available at the Monticello Center",
    heroImageUrl:
      "https://middletownmedical.com/wp-content/uploads/2019/10/Intter-gaso-BG-wr.jpg",
    heroImageAlt: "Interventional gastroenterology at Middletown Medical",
    providerFilter: { specialties: ["Gastroenterology"] },
    sections: [
      {
        type: "richText",
        heading: "What Is Gastroenterology?",
        body: [
          "Gastroenterology is the study of the normal function and diseases of the esophagus, stomach, small intestine, colon and rectum, pancreas, gallbladder, bile ducts, and liver.",
        ],
      },
      {
        type: "checkList",
        heading: "What Conditions Are Treated?",
        items: [
          "Colon & rectal bleeding",
          "Polyps",
          "Cancer",
          "Complications from bariatric surgery",
          "Diseases of the esophagus",
          "Gallbladder disease",
          "Gastric stomach diseases",
          "Gastroesophageal reflux disease (GERD)",
          "Pancreatic diseases",
        ],
      },
      {
        type: "checkList",
        heading: "What Procedures Are Available?",
        items: [
          "Endoscopic Ultrasonography (EUS)",
          "Endoscopic Retrograde Cholangiopancreatography (ERCP)",
          "Radiofrequency Ablation (RFA)",
          "Gastrointestinal Endoscopic Mucosal Resection (EMR)",
          "Enteroscopy",
          "Endoscopic suturing",
          "Endoscopic stenting",
        ],
      },
      {
        type: "serviceLocations",
        heading: "Our locations",
        locations: [
          {
            name: "Monticello",
            facilityName: "Monticello Center",
            addressLine1:
              "32 Thompson Square (Thompson Square Mall / ShopRite Plaza)",
            addressLine2: "Monticello, NY 12701",
            phone: "(845) 791-5400",
          },
        ],
      },
    ],
  },
  Nephrology: {
    slug: "Nephrology",
    title: "Nephrology",
    subtitle: "at Middletown Medical",
    heroImageUrl:
      "https://middletownmedical.com/wp-content/uploads/2016/02/Drone-shot-Middletown-Location-during-Day.jpg",
    heroImageAlt: "Nephrology at Middletown Medical",
    providerFilter: { specialties: ["Nephrology"] },
    sections: [
      {
        type: "richText",
        heading: "Our Nephrology Team",
        body: [
          "Our board-certified nephrologists are highly trained in all aspects of nephrology, including kidney disease and its causes. The focus of the practice is on the prevention, treatment, and management of hypertension and all types of kidney diseases. Our team of specialists is dedicated to improving the quality of life of those afflicted with kidney disease. We provide medical care to dialysis and kidney transplant patients as well.",
        ],
      },
      {
        type: "richText",
        body: ["Schedule an appointment by phone or chat: 845.342.4774"],
      },
      {
        type: "serviceLocations",
        heading: "Our locations",
        locations: [
          {
            name: "Middletown",
            addressLine1: "111 Maltese Drive",
            addressLine2: "Middletown, NY 10940",
            phone: "(845) 342-4774",
          },
          {
            name: "Newburgh",
            addressLine1: "47 North Plank Road, Suite 19",
            addressLine2: "Newburgh, NY 12550",
            phone: "(845) 561-8100",
          },
        ],
      },
    ],
  },
  Neurology: {
    slug: "Neurology",
    title: "Neurology",
    subtitle: "at Middletown Medical",
    heroImageUrl:
      "https://middletownmedical.com/wp-content/uploads/2016/02/Drone-shot-Middletown-Location-during-Day.jpg",
    heroImageAlt: "Neurology at Middletown Medical",
    providerFilter: { specialties: ["Neurology"] },
    sections: [
      {
        type: "richText",
        heading: "Our Neurology Team",
        body: [
          "Our board-certified Neurologists have outstanding expertise in all areas of neurology, with special interests in stroke, multiple sclerosis, dementia, epilepsy, migraine & headaches, neurophysiology, neuroimaging, and sleep disorders. The members of our specially trained team have the ability to communicate effectively with you, helping to guide you through any medical issues with compassion and understanding.",
        ],
      },
      {
        type: "richText",
        body: ["Schedule an appointment by phone or chat: 845.342.4774"],
      },
      {
        type: "richText",
        heading: "Headache Center",
        body: [
          "At our Headache Center, patients learn how to modify their lifestyle and living environment to suppress migraine development by learning to:",
        ],
      },
      {
        type: "checkList",
        heading: "Headache Center approach",
        items: [
          "Identify triggers that may initiate the onset of a headache",
          "Initiate activities and behaviors that reduce their risk of experiencing a headache",
          "Anticipate an episode in time for prevention",
          "Adopt coping methods for pain reduction when a headache does occur",
        ],
      },
      {
        type: "serviceLocations",
        heading: "Our locations",
        locations: [
          {
            name: "Middletown",
            addressLine1: "111 Maltese Drive",
            addressLine2: "Middletown, NY 10940",
            phone: "(845) 342-4774",
          },
          {
            name: "Newburgh",
            addressLine1: "47 North Plank Road, Suite 19",
            addressLine2: "Newburgh, NY 12550",
            phone: "(845) 561-8100",
          },
        ],
      },
    ],
  },
  "Ophthalmology_/_Optometry": {
    slug: "Ophthalmology_/_Optometry",
    title: "Ophthalmology / Optometry",
    subtitle: "at Middletown Medical",
    heroImageUrl:
      "https://middletownmedical.com/wp-content/uploads/2023/11/ophthalmology-MM.jpg",
    heroImageAlt: "Ophthalmology and optometry at Middletown Medical",
    providerFilter: {
      specialties: ["Ophthalmology", "Optometry"],
    },
    sections: [
      {
        type: "richText",
        heading: "Our Ophthalmology / Optometry Team",
        body: [
          "Welcome to Middletown Medical's Ophthalmology / Optometry Services, dedicated to excellent eye care. Our department offers comprehensive services including routine eye exams, advanced diagnostics, and treatment for various eye conditions. Our experienced team uses the latest technology to ensure personalized care, whether you need glasses or treatment for conditions like glaucoma or cataracts.",
          "At Middletown Medical, we focus on individualized treatment plans and state-of-the-art equipment for accurate diagnosis and effective treatment. We believe in educating our patients about their eye health, helping you make informed decisions. Trust us for a clearer vision and a brighter vision for the future.",
        ],
      },
      {
        type: "richText",
        body: ["Schedule an appointment by phone or chat: 845.342.4774"],
      },
      {
        type: "serviceLocations",
        heading: "Our locations",
        locations: [
          {
            name: "Middletown",
            addressLine1: "111 Maltese Drive",
            addressLine2: "Middletown, NY 10940",
            phone: "(845) 342-4774",
          },
          {
            name: "60 Dunning Road",
            addressLine1: "60 Dunning Road",
            addressLine2: "Middletown, NY 10940",
            phone: "(845) 342-4774",
          },
        ],
      },
    ],
  },
  Orthopedics: {
    slug: "Orthopedics",
    title: "Orthopedics",
    subtitle: "at Middletown Medical",
    heroImageUrl:
      "https://middletownmedical.com/wp-content/uploads/2019/10/orthopedic-BG-wr.jpg",
    heroImageAlt: "Orthopedics at Middletown Medical",
    providerFilter: { specialties: ["Orthopedics"] },
    sections: [
      {
        type: "richText",
        heading: "Our Orthopedics Team",
        body: [
          "Our board-certified Orthopedic Surgeons have over 45 years of combined experience and specialize in treatment of fractures, total joint, knee, and shoulder arthritis, as well as arthroscopic sports medicine. They look forward to helping you become pain-free!",
          "All aspects of orthopedic care are treated with the latest information and technology available, improving your quality of life is our top priority.",
          "Take the first step towards and to improve quality of life by requesting an appointment with one of our Certified Orthopedists today!",
        ],
      },
      {
        type: "richText",
        body: ["Schedule an appointment by phone or chat: 845.342.4774"],
      },
      {
        type: "richText",
        heading: "We are proud to welcome Dr. Barry S. Hyman",
        body: [
          "Dr. Hyman attended Columbia University where he earned a B.A. in Music/Pre Med, Masters' Degrees in Physical Education and Education and his Doctorate in Science Education. He went on to graduate from Columbia's College of Physicians and Surgeons where he received the New York Orthopedic Hospital Award.",
          "Dr. Hyman completed his Orthopedic Residency at the Robert Wood Johnson Medical School, and his fellowship in Sports Medicine Orthopedic Surgery at the Johns Hopkins University.",
        ],
      },
      {
        type: "serviceLocations",
        heading: "Our locations",
        locations: [
          {
            name: "Middletown",
            addressLine1: "111 Maltese Drive",
            addressLine2: "Middletown, NY 10940",
            phone: "(845) 342-4774",
          },
          {
            name: "Newburgh",
            addressLine1: "47 North Plank Road, Suite 19",
            addressLine2: "Newburgh, NY 12550",
            phone: "(845) 561-8100",
          },
        ],
      },
    ],
  },
  Otolaryngology: {
    slug: "Otolaryngology",
    title: "Otolaryngology",
    subtitle: "at Middletown Medical",
    heroImageUrl:
      "https://middletownmedical.com/wp-content/uploads/2019/10/Otolaryngology-BG-wr.jpg",
    heroImageAlt: "Otolaryngology (ENT) at Middletown Medical",
    providerFilter: { specialties: ["Otolaryngology"] },
    sections: [
      {
        type: "richText",
        heading: "Our Otolaryngology Team",
        body: [
          "Otolaryngology is the oldest medical specialty in the United States. Otolaryngologists are physicians trained in the medical and surgical management and treatment of patients with diseases and disorders of the ear, nose, throat (ENT), and related structures of the head and neck.",
        ],
      },
      {
        type: "richText",
        body: ["Schedule an appointment by phone or chat: 845.342.4774"],
      },
      {
        type: "serviceLocations",
        heading: "Our locations",
        locations: [
          {
            name: "Middletown",
            addressLine1: "111 Maltese Drive",
            addressLine2: "Middletown, NY 10940",
            phone: "(845) 342-4774",
          },
          {
            name: "60 Dunning Road",
            addressLine1: "60 Dunning Road",
            addressLine2: "Middletown, NY 10940",
            phone: "(845) 342-4774",
          },
        ],
      },
    ],
  },
  "Pain_Management_&_Rehabilitation": {
    slug: "Pain_Management_&_Rehabilitation",
    title: "Pain Management & Rehabilitation",
    subtitle: "at Middletown Medical",
    heroImageUrl:
      "https://middletownmedical.com/wp-content/uploads/2019/10/Podiatry-BG-wr.jpg",
    heroImageAlt: "Pain management and rehabilitation at Middletown Medical",
    providerFilter: { specialties: ["Pain Management"] },
    sections: [
      {
        type: "richText",
        heading: "Our Pain Management & Rehabilitation Team",
        body: [
          "It is estimated that 21% of Adult Americans, or 34 million people, experience mild to moderate chronic pain to the degree that they seek relief from a physician.",
          "The American Medical Association estimates that 10% of Americans are dealing with chronic pain. The National Institute of Health claims that 40 million Americans are unable to find relief for their pain which is chronic.",
        ],
      },
      {
        type: "richText",
        body: ["Schedule an appointment by phone or chat: 845.342.4774"],
      },
      {
        type: "richText",
        heading: "What is Pain Management?",
        body: [
          "Pain management is the field that specializes in the evaluation, diagnosis, and treatment of pain. Our providers have advanced training that qualifies them as the best source of treatment for patients who are experiencing any type of pain due to illness or injury.",
        ],
      },
      {
        type: "checkList",
        heading: "What symptoms would I see a Rheumatologist for?",
        items: [
          "Inflammation",
          "Joint pain, stiffness or swelling",
          "Rash",
          "Sleep disturbance from pain",
          "Toughness, tightening or hardening of the skin",
          "Weakness or loss of mobility",
        ],
      },
      {
        type: "richText",
        heading: "How are rheumatic conditions diagnosed?",
        body: [
          "A physical exam and laboratory tests are common for diagnosing and treating rheumatic diseases. Your doctor may also order blood work, urine samples, or additional lab tests to confirm your diagnosis and ensure proper treatment:",
        ],
      },
      {
        type: "checkList",
        heading: "Common tests and imaging",
        items: [
          "Biopsy",
          "Magnetic resonance imaging (MRI)",
          "Musculoskeletal (MSK) ultrasound",
          "X-ray",
        ],
      },
      {
        type: "richText",
        heading: "Treatments/Services Offered",
        body: [
          "Middletown Medical, PC offers comprehensive, individualized treatment plans. Your provider will evaluate you to determine the appropriate course of action for your condition, which will also include taking the following into consideration:",
        ],
      },
      {
        type: "checkList",
        heading: "Considerations in your treatment plan",
        items: [
          "Diet changes",
          "Exercise",
          "Heat and cold therapy",
          "Medication",
          "Relaxation techniques",
          "Muscle or joint treatments including braces, splints, canes, or walkers",
          "Pain Management referrals",
          "Physical Therapy referrals",
        ],
      },
      {
        type: "checkList",
        heading: "Conditions/Injuries Treated",
        items: [
          "Ankylosing spondylitis and other spondyloarthropathies",
          "Antiphospholipid syndrome",
          "Arthritis",
          "Autoinflammatory diseases",
          "Behcet's disease",
          "Bursitis",
          "Carpal tunnel syndrome",
          "Giant cell arteritis",
          "Gout and pseudogout (also called calcium pyrophosphate deposition/cppd)",
          "Granulomatosis with polyangiitis (Wegener's)",
          "Inflammatory myopathies",
          "Lupus (systemic lupus erythematosus)",
          "Lyme disease",
          "Osteoarthritis",
          "Osteoporosis",
          "Palindromic rheumatism",
          "Polyarteritis nodosum",
          "Polymyalgia rheumatica (PMR)",
          "Polymyositis or dermatomyositis",
          "Psoriatic arthritis",
          "Raynaud's disease",
          "Relapsing polychondritis",
          "Retroperitoneal fibrosis",
          "Rheumatoid arthritis",
          "Sarcoidosis",
          "Scleroderma",
          "Sjogren's syndrome",
          "Tendinitis",
          "Vasculitis",
        ],
      },
      {
        type: "serviceLocations",
        heading: "Our locations",
        locations: [
          {
            name: "Middletown",
            addressLine1: "111 Maltese Drive",
            addressLine2: "Middletown, NY 10940",
            phone: "(845) 342-4774",
          },
          {
            name: "Newburgh",
            addressLine1: "47 North Plank Road, Suite 19",
            addressLine2: "Newburgh, NY 12550",
            phone: "(845) 561-8100",
          },
        ],
      },
    ],
  },
  Pediatrics: {
    slug: "Pediatrics",
    title: "Pediatrics",
    subtitle: "at Middletown Medical",
    heroImageUrl:
      "https://middletownmedical.com/wp-content/uploads/2019/10/Pediatrics-BG-wr.jpg",
    heroImageAlt: "Pediatrics at Middletown Medical",
    providerFilter: { specialties: ["Pediatrics"] },
    sections: [
      {
        type: "richText",
        heading: "Our Pediatric Team",
        body: [
          "Pediatrics is a branch of medicine that deals with promoting the physical and psychological growth, development, safety and care of infants and children from birth through adolescence and the prevention of their diseases, injuries and complications. Our pediatric staff is dedicated to the health and well-being of your children.",
          "Our pediatricians see patients in Middletown and Wurtsboro. Please call for a convenient appointment time.",
        ],
      },
      {
        type: "phoneCards",
        heading: "Schedule an appointment by phone or chat:",
        cards: [
          { label: "Circleville Pediatrics Patients", phone: "(845) 888-2200" },
          { label: "Dr. Reyes & Specialists", phone: "(845) 342-4774" },
        ],
      },
      {
        type: "serviceLocations",
        heading: "Our locations",
        locations: [
          {
            name: "Circleville Pediatrics",
            addressLine1: "2142 Route 302",
            addressLine2: "Circleville, NY 10919",
            phone: "(845) 888-2200",
            services: [
              {
                title: "Office hours",
                hours: [
                  "Monday: 8:00 AM – 8:00 PM",
                  "Tuesday: 8:00 AM – 6:00 PM",
                  "Wednesday: 8:00 AM – 8:00 PM",
                  "Thursday: 8:00 AM – 6:00 PM",
                  "Friday: 8:00 AM – 8:00 PM",
                ],
              },
            ],
          },
          {
            name: "Middletown",
            addressLine1: "111 Maltese Drive",
            addressLine2: "Middletown, NY 10940",
            phone: "(845) 342-4774",
          },
        ],
      },
      {
        type: "richText",
        body: [
          "Circleville Pediatrics is a division of Middletown Medical, providing comprehensive, compassionate care for infants, children, and adolescents. Our experienced pediatric team is committed to partnering with families to support every stage of a child's growth and development. We offer well child exams, same-day sick visits, immunizations, developmental screenings, behavioral health support, and adolescent care in a welcoming, family centered environment.",
        ],
      },
    ],
  },
  Pediatric_Endocrinology: {
    slug: "Pediatric_Endocrinology",
    title: "Pediatric Endocrinology",
    subtitle:
      "75 Maltese Dr, Middletown, NY • Call for Appointment 845-342-4774 ex 4342",
    heroImageUrl:
      "https://middletownmedical.com/wp-content/uploads/2019/06/endocrinology-cover-image.jpg",
    heroImageAlt: "Children and teens health",
    providerFilter: {
      includeProviderUrls: [
        "https://middletownmedical.com/medical-staff/Mepparambath_Prajith",
      ],
    },
    sections: [
      {
        type: "richText",
        body: [
          "75 Maltese Dr, Middletown, NY",
          "Call for Appointment 845-342-4774 ex 4342",
        ],
      },
      {
        type: "richText",
        heading: "PARENTS",
        body: [
          "Children are not simply little adults. Their emotional and medical needs are completely different from the needs of an adult.",
          "This is especially true when it comes to dealing with a child's sexual development or growth disorders. If your child is facing any of these problems, then seeing a pediatric endocrinologist is the best since they are specially trained to diagnose and treat the unique needs of endocrine and hormonal disorders in children and teens.",
          "Early Intervention is best when treating childhood obesity.",
          "✅ Now accepting new patients",
          "✅ Convenient hours on the weekend",
          "Schedule an appointment by phone or chat: 845.342.4774 ex 4342",
        ],
      },
      {
        type: "richText",
        heading: "What is Pediatric Endocrinology??",
        body: [
          "Pediatric endocrinology is a medical subspecialty dealing with disorders of the endocrine glands, such as variations of physical growth and sexual development in childhood, diabetes and many more.",
        ],
      },
      {
        type: "richText",
        heading: "What symptoms would my child see an Endocrinologist for?",
        body: [
          "Growth problems, such as short stature",
          "Early or delayed puberty",
          "Enlarged thyroid gland (goiter)",
          "Underactive or overactive thyroid gland",
          "Pituitary gland hypo/hyper function",
          "Adrenal gland hypo/hyper function",
          "Ambiguous genitals/intersex",
          "Ovarian and testicular dysfunction",
          "Diabetes",
          "Low blood sugar (hypoglycemia)",
          "Obesity",
          "Problems with Vitamin D (rickets, hypocalcemia)",
        ],
      },
      {
        type: "richText",
        heading: "How are endocrine disorders diagnosed?",
        body: [
          "A number of tests and exams may help in diagnosing a child with endocrine disorders. Blood and urine tests verify hormone levels can help your doctors determine if an endocrine disorder exists. Imaging tests may be done to help locate or evaluate nodules, organs, and glands.",
        ],
      },
      {
        type: "richText",
        heading: "Treatments/Services Offered",
        body: [
          "Middletown Medical, PC offers comprehensive, individualized treatment plans. Your provider will evaluate your child to determine the appropriate course of action for your child's condition, which may include one or more of the following:",
          "Diabetes treatment and medical management.",
          "Patient education for self-managing conditions",
          "Hormone therapy",
          "Obesity education and supervised weight loss programs",
          "Pituitary, adrenal, reproductive, and other hormonal disorder treatments",
          "Thyroid disorder treatments",
          "And more!",
        ],
      },
      {
        type: "richText",
        heading: "Conditions/Injuries Treated",
        body: [
          "Middletown Medical, PC offers comprehensive, individualized treatment plans. Your provider will evaluate your child to determine the appropriate course of action for your child's condition, which may include one or more of the following:",
          "Acromegaly",
          "Addison's disease",
          "Adult-onset growth hormone deficiency",
          "Amenorrhoea",
          "Carcinoid tumour",
          "Childhood-onset growth hormone deficiency",
          "Chronic fatigue syndrome",
          "Circadian rhythm sleep disorders",
          "Congenital adrenal hyperplasia",
          "Craniopharyngioma",
          "Cushing's disease",
          "Cushing's syndrome",
          "Delayed puberty",
          "Diabetes insipidus",
          "Diabetes mellitus",
          "Eating disorders",
          "Empty sella syndrome",
          "Endometrial cancer",
          "Endometriosis",
          "Familial medullary thyroid cancer",
          "Female infertility",
          "Gastrinoma",
          "Gender identity disorder",
          "Gestational diabetes",
          "Gigantism",
          "Glucagonoma",
          "Goitre",
          "Graves' disease",
          "Hashimoto's disease",
          "Hirsutism",
          "Hypercalcaemia",
          "Hyperthyroidism",
          "Hypocalcaemia",
          "Hyponatraemia",
          "Hypoparathyroidism",
          "Hypophosphataemia",
          "Hypopituitarism",
          "Hypothyroidism",
          "Insulinoma",
          "Jet lag",
          "Klinefelter's syndrome",
          "Male hypogonadism",
          "Menopause",
          "Multinodular goitre",
          "Multiple endocrine neoplasia type 1",
          "Multiple endocrine neoplasia type 2A",
          "Multiple endocrine neoplasia type 2B",
          "Nelson's syndrome",
          "Non-functioning pancreatic NETs",
          "Non-functioning pituitary tumours",
          "Obesity",
          "Osteoporosis",
          "Paget's disease",
          "Paraganglioma",
          "Phaeochromocytoma",
          "Pituitary apoplexy",
          "Polycystic ovary syndrome",
          "Prader-Willi syndrome",
          "Pre-eclampsia",
          "Precocious puberty",
          "Premature ovarian failure",
          "Premenstrual syndrome",
          "Primary hyperaldosteronism",
          "Primary hyperparathyroidism",
          "Prolactinoma",
          "Resistance to thyroid hormone",
          "Rickets",
          "Secondary hyperparathyroidism",
          "Sheehan's syndrome",
        ],
      },
      {
        type: "providerHighlight",
        heading: "YOUR DEDICATED PEDIATRIC ENDOCRINOLOGIST",
        name: "Prajith Mepparambath, M.D.",
        title: "Pediatric Endocrinology",
        imageUrl:
          "https://dashboard.middletownmedical.com/storage/profile_pictures/3ecdb4d2-4574-43cd-801b-2ee79c4531b8.png",
        profileUrl:
          "https://middletownmedical.com/medical-staff/Mepparambath_Prajith",
        bio: [],
      },
    ],
  },
  "Physical_Therapy/Occupational_Therapy": {
    slug: "Physical_Therapy/Occupational_Therapy",
    title: "Physical Therapy / Occupational Therapy",
    subtitle: "at Middletown Medical",
    heroImageUrl:
      "https://middletownmedical.com/wp-content/uploads/2022/09/PT-MMPC-location-photos-04.jpg",
    heroImageAlt: "Rehabilitation and physical therapy at Middletown Medical",
    providerFilter: {
      specialties: [
        "Physical Therapy",
        "Occupational Therapy",
        "Rehabilitation",
      ],
    },
    sections: [
      {
        type: "richText",
        heading: "Our Physical Therapy & Occupational Therapy Team",
        body: [
          "Our physical and occupational therapy team helps patients restore mobility, strength, and function. Whether you are recovering from an injury, managing chronic pain, or regaining everyday skills after illness, we provide individualized plans designed around your goals.",
        ],
      },
      {
        type: "phoneCards",
        heading: "Schedule an appointment by phone or chat:",
        cards: [{ label: "Physical Therapy", phone: "845.344.1899" }],
      },
      {
        type: "serviceLocations",
        heading: "Hours",
        locations: [
          {
            name: "Middletown Medical Physical Therapy",
            addressLine1: "419 E Main St, Suite 110",
            addressLine2: "Middletown, NY 10940",
            phone: "845.344.1899",
            services: [
              {
                title: "Hours",
                hours: [
                  "Monday: 8:00 AM - 5:00 PM",
                  "Tuesday: 8:00 AM - 5:00 PM",
                  "Wednesday: 8:00 AM - 5:00 PM",
                  "Thursday: 8:00 AM - 5:00 PM",
                  "Friday: 8:00 AM - 5:00 PM",
                ],
              },
            ],
          },
        ],
      },
    ],
  },
  Podiatry: {
    slug: "Podiatry",
    title: "Podiatry",
    subtitle: "at Middletown Medical",
    heroImageUrl:
      "https://middletownmedical.com/wp-content/uploads/2019/10/Podiatry-BG-wr.jpg",
    heroImageAlt: "Podiatry at Middletown Medical",
    providerFilter: { specialties: ["Podiatry"] },
    sections: [
      {
        type: "richText",
        heading: "Our Podiatry Team",
        body: [
          "Podiatrists diagnose and treat conditions of the foot, ankle, and related structures of the leg, such as tumors, ulcers, fractures, skin or nail diseases, and congenital or acquired deformity such as weak feet and foot imbalance. They also treat conditions such as corns, calluses, bunions, heel spurs, ingrown toenails, arch problems, shortened tendons, cysts, bone disorders, and abscesses. They design corrective orthotics, plaster casts, and strappings to correct deformities as well as flexible casting for immobilization of foot and ankle fractures, sprains, or other injuries. They can correct walking patterns and balance, and promote the overall ability to move about more efficiently and comfortably.",
        ],
      },
      {
        type: "phoneCards",
        heading: "Schedule an appointment by phone or chat:",
        cards: [{ label: "Podiatry Patients", phone: "845.342.4774" }],
      },
      {
        type: "richText",
        heading:
          "Peripheral Arterial Disease (PAD) – A Serious Medical Condition",
        body: [
          "Often Asymptomatic, Underdiagnosed, and Untreated",
          "PAD affects 8-12 million Americans | 18% of the Medicare population has PAD | 66% of all PAD patients have NO symptoms.*",
          "Patients who may have PAD should be tested—it’s more than a pain in the leg.",
          "PAD is associated with a 6 times higher risk for cardiovascular disease/event (heart attack/stroke). Watch for risk factors and symptoms in your patients.",
        ],
      },
      {
        type: "richText",
        heading: "RISK FACTORS",
        body: [
          "Smokers",
          "Age 50+",
          "Diabetics",
          "High Blood Pressure",
          "High Cholesterol",
          "Obesity",
          "Chronic Kidney Disease",
          "Family Medical History (heart disease, heart attack or stroke)",
          "History of COVID-19",
        ],
      },
      {
        type: "richText",
        heading: "SYMPTOMS",
        body: [
          "Muscle Pain and Cramping (often in the calf, buttocks or thigh; leg pain while walking or exercising)",
          "Non-healing Wounds (often on the legs and feet)",
          "Diabetic Foot Ulcers (approx. 1/2 of diabetics have PAD)",
          "Discomfort in Feet and Legs (coldness, numbness, feeling of heaviness)",
          "Change in Leg Appearance (hair loss, slow hair growth, change in leg color, excessively shiny skin)",
        ],
      },
      {
        type: "richText",
        heading: "NO RISK OF LOSING YOUR PATIENTS",
        body: [
          "Referred patients are treated by our vascular specialists and returned to your care.",
        ],
      },
      {
        type: "richText",
        heading: "EASY SCHEDULING",
        body: [
          "Quick and easy scheduling process to help avoid risk of an admission or increased risk for amputation.",
        ],
      },
      {
        type: "richText",
        heading: "SAFE, COMFORTING OUTPATIENT CENTER",
        body: [
          "Board-certified experts perform minimally invasive procedures in our fully equipped facility.",
          "You can rely on our team to provide high quality, compassionate care before, during and after each procedure without a hospital stay.",
        ],
      },
      {
        type: "richText",
        body: [
          "If diagnosed early, PAD is treatable; if not, PAD can lead to amputation, even death.",
          "Patients with ulcers and wounds should be referred immediately as they may already have critical limb ischemia (CLI), which can lead to amputation. Minimally invasive, image guided procedures improve patients' comfort, safety and outcomes.",
          "WE PREVENT MORE THAN 80% OF AMPUTATIONS IN PATIENTS WHO WERE TOLD IT WAS THE ONLY OPTION.",
        ],
      },
      {
        type: "richText",
        body: ["Schedule an appointment by phone or chat: 845.342.4774"],
      },
    ],
  },
  "Primary_/_Family_Medicine": {
    slug: "Primary_/_Family_Medicine",
    title: "Primary / Family Medicine",
    subtitle: "at Middletown Medical",
    heroImageUrl:
      "https://middletownmedical.com/wp-content/uploads/2019/10/family-med-BG-wr.jpg",
    heroImageAlt: "Primary / Family Medicine at Middletown Medical",
    providerFilter: { specialties: ["Primary Medicine"] },
    sections: [
      {
        type: "richText",
        heading: "OUR PRIMARY / FAMILY MEDICINE TEAM",
        body: [
          "Our primary care team provides personalized, compassionate care for patients of all ages. We focus on prevention, wellness, and evidence-based treatment for everyday health concerns.",
          "From routine checkups and screenings to diagnosis and management of chronic conditions, you can count on us to guide you through your care plan.",
        ],
      },
      {
        type: "richText",
        body: ["Schedule an appointment by phone or chat: 845.342.4774"],
      },
      {
        type: "serviceLocations",
        heading: "Our locations",
        locations: [
          {
            name: "Middletown",
            facilityName: "Medical Campus",
            addressLine1: "111 Maltese Dr",
            addressLine2: "Middletown, NY 10940",
            phone: "(845) 342-4774",
          },
        ],
      },
    ],
  },
  Pulmonary_Medicine: {
    slug: "Pulmonary_Medicine",
    title: "Pulmonary Medicine",
    subtitle: "at Middletown Medical",
    heroImageUrl:
      "https://middletownmedical.com/wp-content/uploads/2019/11/Pulmonary-BG.jpg",
    heroImageAlt: "Pulmonary Medicine at Middletown Medical",
    providerFilter: { specialties: ["Pulmonary Medicine"] },
    sections: [
      {
        type: "richText",
        heading: "OUR PULMONARY MEDICINE TEAM",
        body: [
          "Our pulmonary medicine providers specialize in evaluating and treating conditions that affect the lungs and breathing.",
          "We provide patient-centered care for respiratory symptoms and chronic lung conditions, with a focus on comfort, education, and long-term management.",
        ],
      },
      {
        type: "richText",
        body: ["Schedule an appointment by phone or chat: 845.342.4774"],
      },
      {
        type: "serviceLocations",
        heading: "Our locations",
        locations: [
          {
            name: "Middletown",
            facilityName: "Medical Campus",
            addressLine1: "111 Maltese Dr",
            addressLine2: "Middletown, NY 10940",
            phone: "(845) 342-4774",
          },
        ],
      },
    ],
  },
  "Radiology_&_Ultrasound": {
    slug: "Radiology_&_Ultrasound",
    title: "Radiology & Ultrasound",
    subtitle: "at Middletown Medical",
    heroImageUrl:
      "https://middletownmedical.com/wp-content/uploads/2019/10/radiology-ultra-sound.png",
    heroImageAlt: "Radiology and ultrasound at Middletown Medical",
    providerFilter: { specialties: ["Radiology"], includeProviderUrls: [] },
    sections: [
      {
        type: "richText",
        heading: "OVERVIEW",
        body: [
          "Our state of the art Radiology Department offers a wide array of services, all proudly accredited by the American College of Radiology. In addition, all Radiology Technologists are licensed and certified by the American Registry of Radiologic Technologists. Your exam will be interpreted by our Board-certified radiologists and reported to your physician in a timely manner.",
        ],
      },
      {
        type: "richText",
        heading: "CT / CTA",
        body: [
          "Middletown Medical’s Philips Brilliance 16-Slice CT scanner is the industry standard for CT scanning. This incredible machine opens new doors for assessing some of today’s most pressing health care conditions such as stroke, heart disease and lung cancer. The Brilliance 16-Slice gives sixteen crystal clear images per rotation, while older machines took only one image. This means that you receive a much more accurate diagnosis than ever before possible. The Philips Brilliance 16-Slice scanner is the region’s most advanced scanner. It is fast, accurate and able to perform more studies with incredible clarity. Additionally, our department is ACR certified and our technologists are highly trained, caring and ready to help you.",
        ],
      },
      {
        type: "richText",
        heading: "Dexa Scan (bone density)",
        body: [
          "At Middletown Medical, our professional and caring staff will guide you through this painless, non-invasive, simple screening test in about 20 minutes. This test will provide invaluable information for your physician about your chance for getting osteoporosis, a preventable disease when detected early.",
        ],
      },
      {
        type: "richText",
        heading: "Mammography",
        body: [
          "Our recenty purchased Hologic Selenia Full Field Digital Mammography (FFDM) system is a state-of-the-art digital mammography machine that is highly accurate and provides greater patient comfort. Digital mammography is the industry standard for providing the most accurate images with a reduced number of retakes needed in order to obtain an accurate image.",
        ],
      },
      {
        type: "richText",
        heading: "MRI / MRA",
        body: [
          "The new Philips 1.5 Tesla short bore MRI gives you the feeling of an open MRI. And with Philips’ new technology, scan times are cut in half without ever compromising quality or comfort. This state-of-the-art scanner combines the strongest magnetic field strength and shortest scanning tube available to minimize study times and maximize quality while providing you with a comfortable and roomy feeling. In addition, Middletown Medical uses CinemaVision, a convenient, versatile and user-friendly 3D virtual reality system. Providing multiple entertainment options – from standard television, DVD, CD and AM/FM input – this system allows you to enjoy a stunning sight and sound experience during your MRI scan.",
        ],
      },
      {
        type: "richText",
        heading: "Ultrasound",
        body: [
          "The The Affiniti 50 ultrasound system, powered by Philips digital imaging ultrasound system delivers high definition imaging in a compact and ergonomic package designed for a variety of tests including breast, pediatric, vascular and musculoskeletal ultrasounds. It is a state-of-the-art system that provides the best images in the least amount of time to assist your physician in providing you the best care possible. The testing performed is painless and non-invasive while not exposing you to any radiation. Our Ultrasound and Echocardiography Departments are ACR and ICAEL accredited and utilize the latest equipment in a warm, welcoming environment. Our licensed ultrasound technologists perform most on-site specialized testing within 30 minutes. Your results are reported to your physician as quickly as possible.",
        ],
      },
      {
        type: "faq",
        heading: "FAQs",
        items: [
          {
            question: "Do I have to remain still the whole time?",
            answer:
              "It is important for image clarity and optimum scan results to hold still during the exam. Keep in mind a routine exam will take at least 20 minutes. MRI isn’t for everyone. Be sure to inform your physician if you have a pacemaker, aneurysm clips in the brain, a shunt with telesensor, inner ear implants, medication patches, metal fragments in one or both eyes, implanted spinal cord stimulators or if you are pregnant, breasfeeding, or have anemia or any disease affecting red blood cells.",
          },
          {
            question: "MRI isn't for everyone",
            answer:
              "MRI isn’t for everyone. Be sure to inform your physician if you have a pacemaker, aneurysm clips in the brain, a shunt with telesensor, inner ear implants, medication patches, metal fragments in one or both eyes, implanted spinal cord stimulators or if you are pregnant, breasfeeding, or have anemia or any disease affecting red blood cells.",
          },
          {
            question: "Does the machine make a lot of noise?",
            answer:
              "Yes, there is significant noise made by the magnet. Our exclusive CinemaVision program blocks out the noise with either music, TV programs or movies.",
          },
          {
            question: "Is an MRI scan like an X-ray?",
            answer:
              "No.  An MRI scan uses a powerful magnet in conjunction with radio frequency waves to generate images of your internal organs and structures without radiation.",
          },
          {
            question: "How long will the exam take?",
            answer:
              "That will depend on what is being studied but a typical exam lasts 20 - 45 minutes. You should allow extra time in case the exam lasts longer than expected.",
          },
        ],
      },
      {
        type: "serviceLocations",
        heading: "LOCATIONS & HOURS—radiology",
        locations: [
          {
            name: "Middletown",
            facilityName: "Medical Campus",
            addressLine1: "111 Maltese Dr",
            addressLine2: "Middletown, NY 10940",
            phone: "(845) 342-4774",
            services: [
              {
                title: "Xray",
                hours: ["Mon-Fri: 8:00am-9:00pm", "Sat-Sun: 9:00am-9:00pm"],
              },
              {
                title: "CAT Scan",
                hours: ["Mon-Fri: 8:00am-9:00pm", "Sat-Sun: 9:00am-9:00pm"],
              },
              {
                title: "MRI",
                hours: ["Mon-Fri: 7:00am-9:00pm", "Sat-Sun: 7:00am-3:00pm"],
              },
              {
                title: "Ultrasound",
                hours: ["Mon-Fri: 7:00am-7:00pm", "Sat: 8:00am-2:00pm"],
              },
              { title: "Mammography", hours: ["Mon-Fri: 8:00am-5:00pm"] },
              { title: "Dexa Scan", hours: ["Mon-Fri: 8:00am-5:00pm"] },
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
                title: "Xray",
                hours: ["Mon-Fri: 8:00am-6:00pm", "Sat: 9:00am-1:00pm"],
              },
              { title: "Ultrasound", hours: ["Mon-Fri: 8:00am-5:00pm"] },
            ],
          },
          {
            name: "Ellenville",
            facilityName: "ShopRite Plaza",
            addressLine1: "112 ShopRite Plaza, Shoprite Blvd",
            addressLine2: "Ellenville, NY 12428",
            phone: "(845) 647-6400",
            services: [
              { title: "Ultrasound", hours: ["Mon-Fri: 8:00am-5:00pm"] },
            ],
          },
          {
            name: "Monticello",
            facilityName: "Monticello Center",
            addressLine1: "4058 State Route 42 Suite 5",
            addressLine2: "Monticello, NY 12701",
            phone: "(845) 791-5400",
            services: [
              { title: "Xray", hours: ["Mon-Fri: 8:00am-5:00pm"] },
              { title: "Ultrasound", hours: ["Mon-Fri: 8:00am-5:00pm"] },
            ],
          },
          {
            name: "Liberty",
            facilityName: "Liberty Medical Branch",
            addressLine1: "111 Sullivan Ave",
            addressLine2: "Liberty, NY 12754",
            phone: "(845) 292-4141",
            services: [
              { title: "Ultrasound", hours: ["Mon-Fri: 8:00am-5:00pm"] },
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
