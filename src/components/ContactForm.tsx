import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { motion, AnimatePresence } from 'framer-motion';
import toast from 'react-hot-toast';
import { Send, Loader2, Mail, User, MessageSquare, FileText } from 'lucide-react';
import { useState, useEffect } from 'react';

const contactSchema = z.object({
  name: z.string()
    .min(2, 'Name must be at least 2 characters')
    .max(50, 'Name must be less than 50 characters'),
  
  email: z.string()
    .email('Please enter a valid email address'),
  
  subject: z.string()
    .min(5, 'Subject must be at least 5 characters')
    .max(100, 'Subject must be less than 100 characters'),
  
  message: z.string()
    .min(10, 'Message must be at least 10 characters')
    .max(1000, 'Message must be less than 1000 characters'),
});

type ContactFormData = z.infer<typeof contactSchema>;

const ContactForm = () => {
  const [isSubmitSuccessful, setIsSubmitSuccessful] = useState(false);
  
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting, dirtyFields, touchedFields },
    reset,
    watch,
    setFocus
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactSchema),
    mode: 'onBlur',
  });

  const messageValue = watch('message', '');
  const messageLength = messageValue.length;

  // Focus on first error field
  useEffect(() => {
    const firstError = Object.keys(errors)[0] as keyof ContactFormData;
    if (firstError) {
      setFocus(firstError);
    }
  }, [errors, setFocus]);

  const onSubmit = async (data: ContactFormData) => {
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // In production, this would be an actual API call
      console.log('Form data:', data);
      
      toast.success('Message sent successfully! I\'ll get back to you soon.', {
        duration: 4000,
        position: 'bottom-right',
        style: {
          background: '#10b981',
          color: '#fff',
        },
      });
      
      setIsSubmitSuccessful(true);
      reset();
      
      // Reset success state after 5 seconds
      setTimeout(() => setIsSubmitSuccessful(false), 5000);
      
    } catch (error) {
      toast.error('Failed to send message. Please try again later.', {
        duration: 4000,
        position: 'bottom-right',
        style: {
          background: '#ef4444',
          color: '#fff',
        },
      });
    }
  };

  const fieldVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.4 }
    }
  };

  const errorVariants = {
    hidden: { opacity: 0, x: -10, scale: 0.9 },
    visible: { 
      opacity: 1, 
      x: 0, 
      scale: 1,
      transition: { type: "spring", stiffness: 200 }
    }
  };

  const shakeVariants = {
    shake: {
      x: [-10, 10, -10, 10, 0],
      transition: { duration: 0.4 }
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="w-full max-w-2xl mx-auto"
    >
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        {/* Name Field */}
        <motion.div 
          variants={fieldVariants}
          initial="hidden"
          animate="visible"
          className="relative"
        >
          <label htmlFor="name" className="block text-sm font-medium mb-2">
            <User className="inline-block w-4 h-4 mr-1" />
            Your Name
          </label>
          <motion.div
            animate={errors.name ? "shake" : ""}
            variants={shakeVariants}
          >
            <input
              {...register('name')}
              id="name"
              type="text"
              placeholder="John Doe"
              aria-invalid={!!errors.name}
              aria-describedby={errors.name ? 'name-error' : undefined}
              className={`
                w-full px-4 py-3 rounded-lg border transition-all
                ${errors.name && touchedFields.name
                  ? 'border-red-500 focus:ring-red-500' 
                  : dirtyFields.name && !errors.name
                  ? 'border-green-500 focus:ring-green-500'
                  : 'border-border focus:ring-primary'
                }
                focus:outline-none focus:ring-2 focus:border-transparent
                bg-background
              `}
            />
          </motion.div>
          <AnimatePresence>
            {errors.name && touchedFields.name && (
              <motion.p
                id="name-error"
                role="alert"
                variants={errorVariants}
                initial="hidden"
                animate="visible"
                exit="hidden"
                className="absolute -bottom-5 left-0 text-sm text-red-500 flex items-center gap-1"
              >
                <span>⚠</span> {errors.name.message}
              </motion.p>
            )}
          </AnimatePresence>
        </motion.div>

        {/* Email Field */}
        <motion.div 
          variants={fieldVariants}
          initial="hidden"
          animate="visible"
          transition={{ delay: 0.1 }}
          className="relative"
        >
          <label htmlFor="email" className="block text-sm font-medium mb-2">
            <Mail className="inline-block w-4 h-4 mr-1" />
            Email Address
          </label>
          <motion.div
            animate={errors.email ? "shake" : ""}
            variants={shakeVariants}
          >
            <input
              {...register('email')}
              id="email"
              type="email"
              placeholder="john@example.com"
              aria-invalid={!!errors.email}
              aria-describedby={errors.email ? 'email-error' : undefined}
              className={`
                w-full px-4 py-3 rounded-lg border transition-all
                ${errors.email && touchedFields.email
                  ? 'border-red-500 focus:ring-red-500' 
                  : dirtyFields.email && !errors.email
                  ? 'border-green-500 focus:ring-green-500'
                  : 'border-border focus:ring-primary'
                }
                focus:outline-none focus:ring-2 focus:border-transparent
                bg-background
              `}
            />
          </motion.div>
          <AnimatePresence>
            {errors.email && touchedFields.email && (
              <motion.p
                id="email-error"
                role="alert"
                variants={errorVariants}
                initial="hidden"
                animate="visible"
                exit="hidden"
                className="absolute -bottom-5 left-0 text-sm text-red-500 flex items-center gap-1"
              >
                <span>⚠</span> {errors.email.message}
              </motion.p>
            )}
          </AnimatePresence>
        </motion.div>

        {/* Subject Field */}
        <motion.div 
          variants={fieldVariants}
          initial="hidden"
          animate="visible"
          transition={{ delay: 0.2 }}
          className="relative"
        >
          <label htmlFor="subject" className="block text-sm font-medium mb-2">
            <FileText className="inline-block w-4 h-4 mr-1" />
            Subject
          </label>
          <motion.div
            animate={errors.subject ? "shake" : ""}
            variants={shakeVariants}
          >
            <input
              {...register('subject')}
              id="subject"
              type="text"
              placeholder="Research Collaboration Opportunity"
              aria-invalid={!!errors.subject}
              aria-describedby={errors.subject ? 'subject-error' : undefined}
              className={`
                w-full px-4 py-3 rounded-lg border transition-all
                ${errors.subject && touchedFields.subject
                  ? 'border-red-500 focus:ring-red-500' 
                  : dirtyFields.subject && !errors.subject
                  ? 'border-green-500 focus:ring-green-500'
                  : 'border-border focus:ring-primary'
                }
                focus:outline-none focus:ring-2 focus:border-transparent
                bg-background
              `}
            />
          </motion.div>
          <AnimatePresence>
            {errors.subject && touchedFields.subject && (
              <motion.p
                id="subject-error"
                role="alert"
                variants={errorVariants}
                initial="hidden"
                animate="visible"
                exit="hidden"
                className="absolute -bottom-5 left-0 text-sm text-red-500 flex items-center gap-1"
              >
                <span>⚠</span> {errors.subject.message}
              </motion.p>
            )}
          </AnimatePresence>
        </motion.div>

        {/* Message Field */}
        <motion.div 
          variants={fieldVariants}
          initial="hidden"
          animate="visible"
          transition={{ delay: 0.3 }}
          className="relative"
        >
          <label htmlFor="message" className="block text-sm font-medium mb-2">
            <MessageSquare className="inline-block w-4 h-4 mr-1" />
            Message
            <span className="ml-2 text-xs text-muted-foreground">
              ({messageLength}/1000)
            </span>
          </label>
          <motion.div
            animate={errors.message ? "shake" : ""}
            variants={shakeVariants}
          >
            <textarea
              {...register('message')}
              id="message"
              rows={6}
              placeholder="Tell me about your project or inquiry..."
              aria-invalid={!!errors.message}
              aria-describedby={errors.message ? 'message-error' : undefined}
              className={`
                w-full px-4 py-3 rounded-lg border transition-all resize-none
                ${errors.message && touchedFields.message
                  ? 'border-red-500 focus:ring-red-500' 
                  : dirtyFields.message && !errors.message
                  ? 'border-green-500 focus:ring-green-500'
                  : 'border-border focus:ring-primary'
                }
                focus:outline-none focus:ring-2 focus:border-transparent
                bg-background
              `}
            />
          </motion.div>
          <AnimatePresence>
            {errors.message && touchedFields.message && (
              <motion.p
                id="message-error"
                role="alert"
                variants={errorVariants}
                initial="hidden"
                animate="visible"
                exit="hidden"
                className="absolute -bottom-5 left-0 text-sm text-red-500 flex items-center gap-1"
              >
                <span>⚠</span> {errors.message.message}
              </motion.p>
            )}
          </AnimatePresence>
          
          {/* Character count indicator */}
          <div className="absolute bottom-3 right-3">
            <motion.div
              animate={{
                scale: messageLength > 900 ? [1, 1.2, 1] : 1,
                color: messageLength > 900 ? '#ef4444' : undefined
              }}
              transition={{ duration: 0.3 }}
              className={`text-xs ${
                messageLength > 900 
                  ? 'text-red-500 font-semibold' 
                  : 'text-muted-foreground'
              }`}
            >
              {1000 - messageLength} characters remaining
            </motion.div>
          </div>
        </motion.div>

        {/* Submit Button */}
        <motion.div
          variants={fieldVariants}
          initial="hidden"
          animate="visible"
          transition={{ delay: 0.4 }}
        >
          <motion.button
            type="submit"
            disabled={isSubmitting}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className={`
              w-full px-6 py-3 rounded-lg font-medium transition-all
              flex items-center justify-center gap-2
              ${isSubmitting 
                ? 'bg-muted text-muted-foreground cursor-not-allowed'
                : 'bg-primary text-primary-foreground hover:bg-primary/90 shadow-lg hover:shadow-xl'
              }
            `}
          >
            {isSubmitting ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                Sending...
              </>
            ) : isSubmitSuccessful ? (
              <>
                <motion.svg
                  className="w-5 h-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: 1 }}
                  transition={{ duration: 0.5 }}
                >
                  <motion.path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M5 13l4 4L19 7"
                  />
                </motion.svg>
                Sent Successfully!
              </>
            ) : (
              <>
                <Send className="w-4 h-4" />
                Send Message
              </>
            )}
          </motion.button>
        </motion.div>
      </form>

      {/* Success Animation Overlay */}
      <AnimatePresence>
        {isSubmitSuccessful && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            className="fixed inset-0 flex items-center justify-center pointer-events-none z-50"
          >
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: [0, 1.2, 1] }}
              transition={{ duration: 0.5 }}
              className="bg-green-500 text-white p-8 rounded-full shadow-2xl"
            >
              <svg
                className="w-16 h-16"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <motion.path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M5 13l4 4L19 7"
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: 1 }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                />
              </svg>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default ContactForm;
