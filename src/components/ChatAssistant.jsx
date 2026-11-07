import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  FaRobot, 
  FaTimes, 
  FaPaperPlane, 
  FaCalendarCheck, 
  FaWhatsapp, 
  FaDumbbell, 
  FaUserMd, 
  FaSyncAlt,
  FaNotesMedical
} from 'react-icons/fa';
import { usePractice } from '../context/PracticeContext';

const ChatAssistant = () => {
  const { practiceData, settings } = usePractice();
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    {
      id: 1,
      sender: 'bot',
      text: `Hello! I'm your AI Recovery Assistant at Physio Pulse. How can I help you today with your pain, rehab exercises, or booking with Dr. Shaik?`,
      actions: ['symptoms', 'booking']
    }
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [conversationContext, setConversationContext] = useState({
    bodyPart: null,
    duration: null,
    discussedTopics: new Set()
  });

  const messagesEndRef = useRef(null);

  // Auto scroll to bottom
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    if (isOpen) {
      scrollToBottom();
    }
  }, [messages, isTyping, isOpen]);

  // Contextual data
  const doctorName = practiceData?.profile?.name || 'Dr. Shaik Mohamed Shaheed';
  const credentials = practiceData?.profile?.credentials || 'B.P.T, CDNT.';
  const phone = settings?.phone || '9392473392';
  const whatsappNum = (settings?.whatsapp || settings?.phone || '9392473392').replace(/[^0-9]/g, '');
  const clinicAddress = settings?.clinicAddress || 'Physio Pulse Clinic';
  const serviceMode = settings?.serviceMode || 'both';
  const timings = settings?.timings || 'Monday - Saturday: 8:00 AM - 8:00 PM';
  const coverageArea = settings?.serviceArea || 'Citywide doorstep rehabilitation';

  // Smooth scroll helper
  const navigateToSection = (id) => {
    setIsOpen(false);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    } else {
      window.location.href = `/#${id}`;
    }
  };

  // Open WhatsApp
  const openWhatsApp = (customMsg) => {
    const defaultMsg = `Hello ${doctorName}, I was chatting with your AI assistant and would like to inquire about clinical physiotherapy consultation.`;
    const msg = encodeURIComponent(customMsg || defaultMsg);
    window.open(`https://wa.me/91${whatsappNum}?text=${msg}`, '_blank');
  };

  // Intelligent Clinical NLP Response Generator
  const analyzeAndGenerateResponse = (userText, history) => {
    const lower = userText.toLowerCase().trim();
    const prevTopics = conversationContext.discussedTopics;
    let newBodyPart = conversationContext.bodyPart;
    let reply = '';
    let actions = [];

    // 1. Detect Red Flags / Medical Emergencies
    if (
      lower.includes('chest pain') ||
      lower.includes('shortness of breath') ||
      lower.includes('loss of bladder') ||
      lower.includes('loss of bowel') ||
      lower.includes('saddle anesthesia') ||
      lower.includes('cannot move leg') ||
      lower.includes('paralysis') ||
      lower.includes('fracture') ||
      lower.includes('broken bone')
    ) {
      return {
        text: `⚠️ **Medical Priority Notice**: These symptoms may indicate an acute medical condition requiring immediate emergency medical evaluation rather than routine physiotherapy. Please visit the nearest emergency hospital or urgent trauma center promptly.`,
        actions: ['whatsapp', 'call']
      };
    }

    // 2. Greetings
    if (/^(hi|hello|hey|good morning|good evening|good afternoon|namaste|salam|hola|start)/i.test(lower) && lower.length < 25) {
      const greetings = [
        `Welcome to Physio Pulse! I can analyze your symptoms (back, neck, knee, shoulder), guide you on safe recovery movements, or help you connect directly with ${doctorName} (${credentials}). What are you experiencing today?`,
        `Hello! I'm here to assist with your physical recovery and mobility. Are you dealing with pain, recovering from an injury, or looking for clinical consultation options?`,
        `Hi there! Feel free to describe any pain, stiffness, or sports discomfort you have. You can also ask about our specialized Dry Needling therapy or doorstep home visits.`
      ];
      return {
        text: greetings[Math.floor(Math.random() * greetings.length)],
        actions: ['symptoms', 'booking']
      };
    }

    // 3. Thanks / Politeness
    if (/^(thanks|thank you|thx|great|awesome|helpful|ok|okay|cool|understood|got it)/i.test(lower) && lower.length < 30) {
      return {
        text: `You're very welcome! Consistency in proper movement is the key to pain-free living. Remember that early clinical care prevents chronic stiffness. Feel free to book an appointment or WhatsApp ${doctorName} anytime you need personalized guidance!`,
        actions: ['booking', 'whatsapp']
      };
    }

    // 4. Inquiries: Dry Needling
    if (lower.includes('dry needling') || lower.includes('needling') || lower.includes('needle') || lower.includes('cdnt')) {
      prevTopics.add('dry_needling');
      reply = `**Certified Dry Needling Therapy (CDNT)** is one of ${doctorName}'s core specialties!

• **How it works**: Ultra-fine, specialized filiform needles are inserted into deep myofascial trigger points (painful muscle knots).
• **Key Benefits**: It rapidly releases persistent muscle spasms, resets neuromuscular tension, and stimulates localized blood circulation.
• **Is it painful?**: Most patients feel only a fleeting micro-twitch followed by profound muscle relaxation and noticeable pain relief.
• **Best for**: Chronic neck stiffness, shoulder impingement, lower back spasms, tennis elbow, and sciatica.`;
      actions = ['booking', 'whatsapp'];
      return { text: reply, actions };
    }

    // 5. Inquiries: Home Visits / Clinic Location
    if (
      lower.includes('home visit') || 
      lower.includes('home service') || 
      lower.includes('doorstep') || 
      lower.includes('come to home') ||
      lower.includes('visit my home')
    ) {
      prevTopics.add('home_visits');
      reply = `Yes! We provide dedicated **Doorstep Home Physiotherapy Visits** across ${coverageArea}.

• **How it works**: ${doctorName} brings complete portable clinical rehabilitation tools, assessment gear, and therapeutic modalities directly to your home.
• **Ideal for**: Post-surgical rehabilitation, severe acute pain, elderly patients with mobility constraints, or busy schedules.
• **Clinic appointments**: We also conduct in-clinic sessions at ${clinicAddress}.`;
      actions = ['booking', 'whatsapp'];
      return { text: reply, actions };
    }

    // 6. Inquiries: Timings, Address, Clinic Location
    if (lower.includes('timing') || lower.includes('hours') || lower.includes('open') || lower.includes('when can i visit')) {
      return {
        text: `Our clinical practice hours are:\n\n⏰ **${timings}**\n📍 **Location**: ${clinicAddress}\n🏠 **Home Visits**: Scheduled based on patient convenience across surrounding areas.\n\nWould you like to schedule an appointment for today or this week?`,
        actions: ['booking', 'whatsapp']
      };
    }

    if (lower.includes('location') || lower.includes('where is') || lower.includes('address') || lower.includes('map')) {
      return {
        text: `Our clinic is located at **${clinicAddress}**.\n\nWe provide both in-clinic evaluations and doorstep home visits. You can see the interactive map in our Contact section below, or message Dr. Shaik on WhatsApp for live location sharing.`,
        actions: ['contact', 'whatsapp']
      };
    }

    // 7. Inquiries: Doctor Credentials & Qualifications
    if (lower.includes('doctor') || lower.includes('shaheed') || lower.includes('who are you') || lower.includes('qualification') || lower.includes('experience')) {
      return {
        text: `**${doctorName}** is a Consultant Physiotherapist & Certified Dry Needling Therapist (${credentials}).\n\nHe specializes in modern orthopedic recovery, myofascial trigger-point release, sports injury rehabilitation, ergonomic posture correction, and tailored home rehabilitation programs.`,
        actions: ['booking', 'whatsapp']
      };
    }

    // 8. Inquiries: Pricing / Fees
    if (lower.includes('fee') || lower.includes('cost') || lower.includes('price') || lower.includes('charge')) {
      return {
        text: `Consultation and therapy fees depend on whether you require an **In-Clinic Session** or a **Doorstep Home Visit**, as well as the specific treatment modality (e.g. Dry Needling, Manual Therapy, Exercise Rehab).\n\nFeel free to connect directly on WhatsApp with Dr. Shaik for transparent pricing tailored to your condition!`,
        actions: ['whatsapp', 'booking']
      };
    }

    // 9. Body Parts & Symptom Analysis:
    // Back / Lumbar / Spine / Sciatica
    if (
      lower.includes('back') || 
      lower.includes('lumbar') || 
      lower.includes('spine') || 
      lower.includes('sciatica') || 
      lower.includes('disc') || 
      lower.includes('backache')
    ) {
      newBodyPart = 'back';
      const isSciatica = lower.includes('sciatica') || lower.includes('shooting') || lower.includes('numbness') || lower.includes('leg');
      
      if (isSciatica) {
        reply = `It sounds like you may be experiencing sciatic nerve irritation or nerve root compression radiating from the lumbar spine down into the leg.

💡 **Immediate Guidelines:**
• **Avoid Aggressive Bending**: Do not touch your toes or perform sudden twists under load.
• **Decompression Position**: Lie on a firm surface with knees bent at 90 degrees supported by a pillow or chair (Psoas rest position).
• **Cold Therapy**: Apply an ice pack wrapped in a cloth to the lower back for 15 minutes to reduce localized inflammation.

${doctorName} utilizes specialized nerve-gliding techniques, core stabilization, and CDNT dry needling to decompress affected nerve pathways.`;
      } else {
        const isAcute = lower.includes('sudden') || lower.includes('yesterday') || lower.includes('days') || lower.includes('morning');
        reply = `Lower back pain is frequently tied to muscular trigger points, sacroiliac joint stiffness, or prolonged sitting.

💡 **Recovery Action Steps:**
• **Acute Relief**: ${isAcute ? 'Since this started recently, avoid heavy lifting and apply ice for 15-20 mins.' : 'For lingering stiffness, alternate gentle moist heat with light walking.'}
• **Safe Movement**: Try gentle pelvic tilts and knee-to-chest glides on a firm bed. Never push into sharp pinching pain.
• **Ergonomic Tip**: Place a small lumbar roll behind your lower back when sitting and stand up every 30 minutes.

We can arrange an in-person assessment or home visit to evaluate your lumbar alignment.`;
      }
      actions = ['exercises', 'booking', 'whatsapp'];
    }

    // Neck / Cervical / Traps / Headaches
    else if (
      lower.includes('neck') || 
      lower.includes('cervical') || 
      lower.includes('trap') || 
      lower.includes('shoulder blade') || 
      lower.includes('headache')
    ) {
      newBodyPart = 'neck';
      reply = `Cervical stiffness and neck tension usually originate from forward head posture ('tech neck'), prolonged laptop usage, or sleeping awkwardly.

💡 **Targeted Relief Strategies:**
• **Chin Tucks**: Keep your eyes forward and gently glide your chin straight back (creating a mild double chin) for 5 seconds. Repeat 8-10 times to activate deep neck flexors.
• **Upper Trap Relief**: Gently tilt your ear towards your opposite shoulder until a comfortable stretch is felt along the side of the neck.
• **Screen Setup**: Position your monitor so the top third of the screen is at eye level to prevent downward neck strain.

For stubborn muscle knots in the upper trapezius, ${doctorName}'s Certified Dry Needling therapy delivers rapid neuromuscular release.`;
      actions = ['exercises', 'booking', 'whatsapp'];
    }

    // Knee / Patella / Meniscus / Ligament
    else if (
      lower.includes('knee') || 
      lower.includes('patella') || 
      lower.includes('acl') || 
      lower.includes('meniscus') || 
      lower.includes('stairs') || 
      lower.includes('squat')
    ) {
      newBodyPart = 'knee';
      const stairs = lower.includes('stairs') || lower.includes('staircase') || lower.includes('squat');
      reply = `Knee discomfort ${stairs ? 'when taking stairs or squatting often indicates patellofemoral tracking irritation or quadriceps imbalance' : 'often stems from joint loading, hamstring tightness, or ligament strain'}.

💡 **Recommended Action Steps:**
• **Isometric Quad Activation**: Sit with your leg extended flat and press the back of your knee gently into a rolled towel, tightening your thigh for 6 seconds.
• **Avoid Deep Knee Flexion**: Limit deep unassisted squats or sudden pivots until the joint stabilizes.
• **Low-Impact Movement**: Stationary cycling or gentle flat-surface walking helps circulate synovial fluid without compressive shock.

${doctorName} designs customized knee rehabilitation protocols to strengthen the stabilizing muscles and preserve cartilage health.`;
      actions = ['exercises', 'booking', 'whatsapp'];
    }

    // Shoulder / Rotator Cuff / Frozen Shoulder
    else if (
      lower.includes('shoulder') || 
      lower.includes('rotator') || 
      lower.includes('overhead') || 
      lower.includes('frozen shoulder')
    ) {
      newBodyPart = 'shoulder';
      reply = `Shoulder pain—especially during overhead lifting, reaching behind your back, or sleeping on the side—commonly indicates rotator cuff irritation, subacromial impingement, or early adhesive capsulitis.

💡 **Immediate Mobility Exercises:**
• **Pendulum Swings**: Lean forward, support yourself with one hand on a table, and let the painful arm hang naturally. Gently sway it in small circular motions using gravity.
• **Avoid Aggressive Overhead Loads**: Temporarily pause heavy military presses or repetitive high reaching.
• **Sleep Modification**: Avoid sleeping directly onto the affected shoulder; support your arm with a pillow across your chest.

Early mobilization and targeted dry needling prevent a stiff shoulder from advancing into a locked frozen shoulder.`;
      actions = ['exercises', 'booking', 'whatsapp'];
    }

    // Ankle / Foot / Heel / Plantar Fasciitis
    else if (
      lower.includes('ankle') || 
      lower.includes('foot') || 
      lower.includes('heel') || 
      lower.includes('plantar') || 
      lower.includes('sprain')
    ) {
      newBodyPart = 'ankle';
      reply = `Ankle and foot pain (such as first-step morning heel pain or rolling sprains) require careful load management.

💡 **Key Relief Measures:**
• **Calf & Plantar Stretch**: Loop a towel under the ball of your foot with leg extended, gently pulling towards you for 20 seconds.
• **Cold Bottle Roll**: Roll the arch of your foot over a cold water bottle for 5-8 minutes to soothe plantar fascia tension.
• **Supportive Footwear**: Avoid walking barefoot on hard floors during recovery.`;
      actions = ['booking', 'whatsapp'];
    }

    // Follow-up on Duration / Stages
    else if (
      lower.includes('since') || 
      lower.includes('days') || 
      lower.includes('weeks') || 
      lower.includes('months') || 
      lower.includes('chronic') || 
      lower.includes('years')
    ) {
      reply = `Thank you for sharing the timeframe. 

• **Acute Phase (< 2-3 weeks)**: Focus is on calming inflammation, gentle unloaded movement, and safeguarding injured tissues.
• **Chronic Phase (> 6 weeks)**: Pain often involves muscle guarding, trigger point knots, and altered joint mechanics. Active rehabilitation, dry needling, and corrective strengthening are crucial to break the pain cycle.

Would you like Dr. Shaik to review your case and outline a tailored recovery plan?`;
      actions = ['booking', 'whatsapp'];
    }

    // General Exercise & Mobility Inquiry
    else if (lower.includes('exercise') || lower.includes('stretch') || lower.includes('workout') || lower.includes('routine')) {
      reply = `We provide specialized structured recovery programs directly in our Exercise Library:

1. **Desk Worker Posture Reset** (Neck, Thoracic spine & Wrists)
2. **Spine & Lower Back Core Stability** (Lumbar & Glute strengthening)
3. **Knee Joint Longevity & Mobility** (Quadriceps & Hamstrings)
4. **Senior Balance & Doorstep Mobility**

You can browse step-by-step visual guides in our Exercise section right on this page!`;
      actions = ['exercises', 'booking'];
    }

    // Fallback: Smart Clinical Triaging
    else {
      // Dynamic fallback based on previously identified body part or general query
      if (conversationContext.bodyPart) {
        reply = `Regarding your **${conversationContext.bodyPart}**: Pain and stiffness often fluctuate based on daily posture, stress, and repetitive loads. 

To help guide you better:
• Does the discomfort worsen after prolonged sitting, walking, or sudden bending?
• Is it a dull ache, sharp pinching, or burning sensation?

You can also schedule a direct clinical evaluation or message Dr. Shaik on WhatsApp with your specific details.`;
      } else {
        reply = `I have logged your query. To provide accurate recovery guidance:

• Which area is primarily affected (e.g. Lower Back, Neck, Knee, Shoulder)?
• Did it start after an injury/workout, or build up gradually from daily routine?

Feel free to mention any specific details, or connect with ${doctorName} directly for professional diagnosis.`;
      }
      actions = ['booking', 'whatsapp'];
    }

    // Update conversation state
    setConversationContext(prev => ({
      ...prev,
      bodyPart: newBodyPart,
      discussedTopics: prevTopics
    }));

    return { text: reply, actions };
  };

  const handleSend = (textToSend) => {
    const text = textToSend || input;
    if (!text.trim()) return;

    const userMessage = { id: Date.now(), text, sender: 'user' };
    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsTyping(true);

    // Dynamic, realistic response delay (500-750ms)
    setTimeout(() => {
      const generated = analyzeAndGenerateResponse(text, messages);
      const botMessage = {
        id: Date.now() + 1,
        text: generated.text,
        sender: 'bot',
        actions: generated.actions
      };
      setMessages(prev => [...prev, botMessage]);
      setIsTyping(false);
    }, 600);
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') handleSend();
  };

  const resetChat = () => {
    setMessages([
      {
        id: Date.now(),
        sender: 'bot',
        text: `Conversation cleared. Hello! I'm your AI Recovery Assistant. How can I assist with your physiotherapy or pain recovery today?`,
        actions: ['symptoms', 'booking']
      }
    ]);
    setConversationContext({
      bodyPart: null,
      duration: null,
      discussedTopics: new Set()
    });
  };

  // Quick prompt chip shortcuts
  const quickPrompts = [
    'Lower Back Pain',
    'Neck Stiffness',
    'Knee Joint Pain',
    'What is Dry Needling?',
    'Home Visit Availability',
    'Book Appointment'
  ];

  return (
    <>
      {/* Floating Chat Button */}
      <motion.button
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        whileHover={{ scale: 1.08 }}
        whileTap={{ scale: 0.92 }}
        onClick={() => setIsOpen(true)}
        aria-label="Open AI Recovery Assistant"
        className="fixed bottom-4 left-3 sm:bottom-6 sm:left-6 w-12 h-12 sm:w-14 sm:h-14 bg-gradient-to-r from-teal-500 to-blue-600 text-white rounded-full shadow-lg shadow-teal-500/30 hover:shadow-xl z-40 flex items-center justify-center cursor-pointer transition-all border-2 border-white/40"
        title="AI Recovery Assistant"
      >
        <FaRobot size={24} />
      </motion.button>

      {/* Chat Modal */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-end sm:items-center justify-center z-50 p-2 sm:p-4"
            onClick={() => setIsOpen(false)}
          >
            <motion.div
              initial={{ scale: 0.9, y: 30, opacity: 0 }}
              animate={{ scale: 1, y: 0, opacity: 1 }}
              exit={{ scale: 0.9, y: 30, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-white dark:bg-gray-800 rounded-3xl sm:rounded-2xl shadow-2xl w-full max-w-lg h-[540px] max-h-[88vh] flex flex-col overflow-hidden border border-gray-100 dark:border-gray-700"
            >
              {/* Header */}
              <div className="bg-gradient-to-r from-teal-600 via-teal-500 to-blue-600 text-white p-3.5 sm:p-4 flex justify-between items-center shadow-md">
                <div className="flex items-center space-x-2.5">
                  <div className="w-9 h-9 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center text-white shadow-inner">
                    <FaRobot size={20} />
                  </div>
                  <div>
                    <h3 className="font-bold text-sm sm:text-base leading-tight flex items-center space-x-1.5">
                      <span>AI Recovery Assistant</span>
                      <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
                    </h3>
                    <p className="text-[11px] text-teal-100">
                      Trained for {doctorName} ({credentials})
                    </p>
                  </div>
                </div>

                <div className="flex items-center space-x-1">
                  <button
                    onClick={resetChat}
                    className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white transition cursor-pointer"
                    title="Clear Conversation"
                  >
                    <FaSyncAlt size={12} />
                  </button>
                  <button
                    onClick={() => setIsOpen(false)}
                    className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white transition cursor-pointer"
                    aria-label="Close chat"
                  >
                    <FaTimes size={15} />
                  </button>
                </div>
              </div>

              {/* Quick Prompts Bar */}
              <div className="bg-gray-100/80 dark:bg-gray-850 px-3 py-2 overflow-x-auto whitespace-nowrap flex space-x-1.5 border-b border-gray-200/60 dark:border-gray-700/60 text-xs no-scrollbar">
                {quickPrompts.map((prompt, idx) => (
                  <button
                    key={idx}
                    onClick={() => handleSend(prompt)}
                    className="px-2.5 py-1 rounded-full bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-200 hover:bg-teal-500 hover:text-white dark:hover:bg-teal-600 border border-gray-200 dark:border-gray-600 text-[11px] font-medium transition cursor-pointer flex-shrink-0"
                  >
                    {prompt}
                  </button>
                ))}
              </div>

              {/* Messages Body */}
              <div className="flex-1 p-3.5 sm:p-4 overflow-y-auto space-y-3.5 bg-gray-50/60 dark:bg-gray-900/60">
                {messages.map((message) => (
                  <div
                    key={message.id}
                    className={`flex flex-col ${message.sender === 'user' ? 'items-end' : 'items-start'}`}
                  >
                    <div
                      className={`max-w-[88%] p-3.5 rounded-2xl text-xs sm:text-sm leading-relaxed ${
                        message.sender === 'user'
                          ? 'bg-gradient-to-r from-teal-500 to-blue-600 text-white rounded-tr-none shadow-sm font-medium'
                          : 'bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-100 border border-gray-100 dark:border-gray-700 rounded-tl-none shadow-sm'
                      }`}
                    >
                      {/* Markdown-style bold rendering */}
                      <div className="whitespace-pre-wrap space-y-1">
                        {message.text.split('\n').map((line, lIdx) => {
                          if (line.startsWith('• ')) {
                            return (
                              <p key={lIdx} className="pl-3 relative before:content-['•'] before:absolute before:left-0 before:text-teal-500 font-normal">
                                {line.replace('• ', '')}
                              </p>
                            );
                          }
                          return <p key={lIdx}>{line}</p>;
                        })}
                      </div>

                      {/* Integrated Action Buttons */}
                      {message.sender === 'bot' && message.actions && message.actions.length > 0 && (
                        <div className="mt-3 pt-2.5 border-t border-gray-100 dark:border-gray-700 flex flex-wrap gap-1.5">
                          {message.actions.includes('booking') && (
                            <button
                              onClick={() => navigateToSection('booking')}
                              className="inline-flex items-center space-x-1.5 px-3 py-1.5 rounded-xl bg-teal-50 dark:bg-teal-900/40 text-teal-700 dark:text-teal-300 font-semibold text-[11px] hover:bg-teal-100 dark:hover:bg-teal-900/70 transition cursor-pointer"
                            >
                              <FaCalendarCheck size={12} />
                              <span>Book Consultation</span>
                            </button>
                          )}

                          {message.actions.includes('whatsapp') && (
                            <button
                              onClick={() => openWhatsApp()}
                              className="inline-flex items-center space-x-1.5 px-3 py-1.5 rounded-xl bg-emerald-50 dark:bg-emerald-900/40 text-emerald-700 dark:text-emerald-300 font-semibold text-[11px] hover:bg-emerald-100 dark:hover:bg-emerald-900/70 transition cursor-pointer"
                            >
                              <FaWhatsapp size={13} className="text-emerald-500" />
                              <span>WhatsApp Dr. Shaik</span>
                            </button>
                          )}

                          {message.actions.includes('exercises') && (
                            <button
                              onClick={() => navigateToSection('exercises')}
                              className="inline-flex items-center space-x-1.5 px-3 py-1.5 rounded-xl bg-blue-50 dark:bg-blue-900/40 text-blue-700 dark:text-blue-300 font-semibold text-[11px] hover:bg-blue-100 dark:hover:bg-blue-900/70 transition cursor-pointer"
                            >
                              <FaDumbbell size={12} />
                              <span>Exercise Library</span>
                            </button>
                          )}

                          {message.actions.includes('contact') && (
                            <button
                              onClick={() => navigateToSection('contact')}
                              className="inline-flex items-center space-x-1.5 px-3 py-1.5 rounded-xl bg-purple-50 dark:bg-purple-900/40 text-purple-700 dark:text-purple-300 font-semibold text-[11px] hover:bg-purple-100 dark:hover:bg-purple-900/70 transition cursor-pointer"
                            >
                              <FaNotesMedical size={12} />
                              <span>Clinic & Map</span>
                            </button>
                          )}
                        </div>
                      )}
                    </div>
                  </div>
                ))}

                {/* Animated Typing Indicator */}
                {isTyping && (
                  <div className="flex items-center space-x-2 text-gray-500 dark:text-gray-400 text-xs pl-2">
                    <div className="w-7 h-7 rounded-full bg-teal-500/10 text-teal-600 dark:text-teal-400 flex items-center justify-center">
                      <FaRobot size={14} />
                    </div>
                    <div className="bg-white dark:bg-gray-800 px-3.5 py-2.5 rounded-2xl rounded-tl-none border border-gray-100 dark:border-gray-700 flex space-x-1">
                      <span className="w-1.5 h-1.5 bg-teal-500 rounded-full animate-bounce"></span>
                      <span className="w-1.5 h-1.5 bg-teal-500 rounded-full animate-bounce [animation-delay:0.2s]"></span>
                      <span className="w-1.5 h-1.5 bg-teal-500 rounded-full animate-bounce [animation-delay:0.4s]"></span>
                    </div>
                  </div>
                )}

                <div ref={messagesEndRef} />
              </div>

              {/* Input Area */}
              <div className="p-2.5 sm:p-3 bg-white dark:bg-gray-800 border-t border-gray-100 dark:border-gray-700 flex items-center space-x-2">
                <input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder="Ask about back pain, knee, dry needling, home visits..."
                  className="flex-1 px-4 py-2.5 rounded-full border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-900 text-gray-800 dark:text-gray-100 text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-teal-500"
                />
                <button
                  onClick={() => handleSend()}
                  disabled={!input.trim()}
                  className="w-10 h-10 rounded-full bg-gradient-to-r from-teal-500 to-blue-600 text-white flex items-center justify-center hover:opacity-95 transition disabled:opacity-40 cursor-pointer flex-shrink-0 shadow-md"
                  aria-label="Send message"
                >
                  <FaPaperPlane size={13} />
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default ChatAssistant;
