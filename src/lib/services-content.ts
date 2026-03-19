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
      type: "promoBanner";
      /** Main headline (e.g. "YOUR HEART SHOULD NEVER WAIT.") */
      heading: string;
      /** Subtext (e.g. "Same-day Cardiology appointments now available.") */
      subheading?: string;
      phone?: string;
      brandName?: string;
      imageUrl: string;
      imageAlt?: string;
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
};

export function getServiceContent(slug: string): ServiceContent | null {
  if (SERVICES_CONTENT[slug]) return SERVICES_CONTENT[slug];
  return null;
}
