# Form Validation & Feedback System

## Overview
Comprehensive form validation and feedback system using react-hook-form, Zod schema validation, and Framer Motion for animations.

## Tech Stack
- **react-hook-form**: Form state management
- **zod**: Schema validation
- **react-hot-toast**: Toast notifications
- **framer-motion**: Animation effects

## Validation Strategy

### Client-Side Validation
```typescript
import { z } from 'zod';

const contactSchema = z.object({
  name: z.string()
    .min(2, 'Name must be at least 2 characters')
    .max(50, 'Name must be less than 50 characters'),
  
  email: z.string()
    .email('Please enter a valid email address')
    .toLowerCase(),
  
  subject: z.string()
    .min(5, 'Subject must be at least 5 characters')
    .max(100, 'Subject must be less than 100 characters'),
  
  message: z.string()
    .min(10, 'Message must be at least 10 characters')
    .max(1000, 'Message must be less than 1000 characters'),
});

type ContactFormData = z.infer<typeof contactSchema>;
```

### Real-Time Validation
- Validate on blur for better UX
- Show errors only after user interaction
- Debounce validation for performance
- Clear errors on successful input

## Form Component Implementation

```tsx
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { motion, AnimatePresence } from 'framer-motion';
import toast from 'react-hot-toast';

const ContactForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting, dirtyFields },
    reset,
    watch
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactSchema),
    mode: 'onBlur',
  });

  const messageLength = watch('message')?.length || 0;

  const onSubmit = async (data: ContactFormData) => {
    try {
      // API call simulation
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      toast.success('Message sent successfully!', {
        duration: 4000,
        icon: '🎉',
      });
      
      reset();
    } catch (error) {
      toast.error('Failed to send message. Please try again.', {
        duration: 4000,
      });
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      {/* Form fields with animations */}
    </form>
  );
};
```

## Input Field Component

```tsx
interface FormFieldProps {
  label: string;
  name: keyof ContactFormData;
  type?: string;
  placeholder?: string;
  error?: string;
  touched?: boolean;
  register: any;
  multiline?: boolean;
}

const FormField = ({ 
  label, 
  name, 
  error, 
  touched, 
  register, 
  multiline,
  ...props 
}: FormFieldProps) => {
  const Component = multiline ? 'textarea' : 'input';
  
  return (
    <div className="relative">
      <label className="block text-sm font-medium mb-2">
        {label}
      </label>
      
      <div className="relative">
        <Component
          {...register(name)}
          {...props}
          className={`
            w-full px-4 py-3 rounded-lg border transition-all
            ${error && touched 
              ? 'border-red-500 focus:ring-red-500' 
              : 'border-border focus:ring-primary'
            }
            focus:outline-none focus:ring-2 focus:border-transparent
          `}
        />
        
        <AnimatePresence>
          {error && touched && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="absolute -bottom-6 left-0"
            >
              <p className="text-sm text-red-500 flex items-center gap-1">
                <span className="inline-block">⚠️</span>
                {error}
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};
```

## Animation Patterns

### Error Shake Animation
```tsx
const shakeAnimation = {
  shake: {
    x: [-10, 10, -10, 10, 0],
    transition: { duration: 0.4 }
  }
};
```

### Success Checkmark Animation
```tsx
const checkmarkAnimation = {
  hidden: { pathLength: 0, opacity: 0 },
  visible: {
    pathLength: 1,
    opacity: 1,
    transition: {
      pathLength: { duration: 0.4, ease: "easeInOut" },
      opacity: { duration: 0.2 }
    }
  }
};
```

### Loading State Animation
```tsx
const LoadingSpinner = () => (
  <motion.div
    animate={{ rotate: 360 }}
    transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
    className="h-5 w-5 border-2 border-white border-t-transparent rounded-full"
  />
);
```

## Toast Notifications

### Custom Toast Styles
```tsx
import toast, { Toaster } from 'react-hot-toast';

// Configure toast globally
const toastOptions = {
  success: {
    style: {
      background: 'rgb(var(--success))',
      color: 'white',
    },
    iconTheme: {
      primary: 'white',
      secondary: 'rgb(var(--success))',
    },
  },
  error: {
    style: {
      background: 'rgb(var(--destructive))',
      color: 'white',
    },
  },
};

// Usage
toast.success('Form submitted!', {
  duration: 4000,
  position: 'bottom-right',
});
```

### Custom Toast Component
```tsx
const CustomToast = ({ type, message, action }: ToastProps) => (
  <motion.div
    initial={{ opacity: 0, y: 50 }}
    animate={{ opacity: 1, y: 0 }}
    exit={{ opacity: 0, y: 20 }}
    className="flex items-center gap-3 p-4 rounded-lg shadow-lg"
  >
    <span className="text-2xl">{type === 'success' ? '✅' : '❌'}</span>
    <div className="flex-1">
      <p className="font-medium">{message}</p>
    </div>
    {action && (
      <button className="text-sm underline" onClick={action.onClick}>
        {action.label}
      </button>
    )}
  </motion.div>
);
```

## Accessibility Features

### Focus Management
```tsx
// Auto-focus first error field
useEffect(() => {
  const firstError = Object.keys(errors)[0];
  if (firstError) {
    const element = document.querySelector(`[name="${firstError}"]`);
    element?.focus();
  }
}, [errors]);
```

### ARIA Attributes
```tsx
<input
  aria-invalid={!!error}
  aria-describedby={error ? `${name}-error` : undefined}
  aria-required={required}
/>
{error && (
  <span id={`${name}-error`} role="alert">
    {error}
  </span>
)}
```

### Keyboard Navigation
- Tab order follows logical flow
- Enter key submits form
- Escape key clears focus
- Space bar toggles checkboxes

## Performance Optimizations

### Debounced Validation
```tsx
import { useDebouncedCallback } from 'use-debounce';

const debouncedValidate = useDebouncedCallback(
  (value) => validateField(value),
  500
);
```

### Lazy Loading
```tsx
const ContactForm = lazy(() => import('./ContactForm'));
```

### Memoization
```tsx
const MemoizedField = memo(FormField, (prev, next) => 
  prev.error === next.error && prev.value === next.value
);
```

## Testing Checklist
- [ ] All validation rules work correctly
- [ ] Error messages display appropriately
- [ ] Success feedback is clear
- [ ] Form resets after submission
- [ ] Loading states work properly
- [ ] Toast notifications appear/dismiss
- [ ] Keyboard navigation works
- [ ] Screen reader compatibility
- [ ] Mobile keyboard behavior
- [ ] Character counter updates
