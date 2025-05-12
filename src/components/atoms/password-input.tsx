import { forwardRef, useState } from 'react';
import { EyeIcon, EyeOffIcon } from 'lucide-react';
import { cn } from '@/utils/cn';
import { Input, InputProps } from './input';
import { Button } from './button';

interface PasswordInputProps extends InputProps {
  isCheckShow?: boolean;
}

const PasswordInput = forwardRef<HTMLInputElement, PasswordInputProps>(
  ({ className, isCheckShow, ...props }, ref) => {
    const [showPassword, setShowPassword] = useState(false);
    const [passwordStrength, setPasswordStrength] = useState(0);
    const [isFocused, setIsFocused] = useState(false);

    const checkPasswordStrength = (password: string) => {
      let strength = 0;
      if (password.length >= 8) strength += 1;
      if (/[A-Z]/.test(password)) strength += 1;
      if (/[a-z]/.test(password)) strength += 1;
      if (/[0-9]/.test(password)) strength += 1;
      if (/[^A-Za-z0-9]/.test(password)) strength += 1;
      setPasswordStrength(strength);
    };

    const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      if (props.onChange) {
        props.onChange(e);
      }
      checkPasswordStrength(e.target.value);
    };

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
      if (e.key === 'Tab') {
        setIsFocused(false);
      }
    };

    const handleBlockCopyPaste = (
      e: React.ClipboardEvent<HTMLInputElement>,
    ) => {
      e.preventDefault();
    };

    const handleContextMenu = (e: React.MouseEvent<HTMLInputElement>) => {
      e.preventDefault();
    };

    return (
      <div className="relative">
        <Input
          type={showPassword ? 'text' : 'password'}
          className={cn('hide-password-toggle pl-10', className)}
          ref={ref}
          {...props}
          onChange={handlePasswordChange}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          onKeyDown={handleKeyDown}
          // onCopy={handleBlockCopyPaste}
          // onPaste={handleBlockCopyPaste}
          // onCut={handleBlockCopyPaste}
          // onContextMenu={handleContextMenu}
        />

        <Button
          type="button"
          variant="ghost"
          size="sm"
          tabIndex={-1}
          className="absolute left-1 top-0 h-full px-3 py-2 hover:bg-transparent"
          onClick={() => setShowPassword((prev) => !prev)}
        >
          {showPassword ? (
            <EyeIcon className="h-4 w-4" aria-hidden="true" />
          ) : (
            <EyeOffIcon className="h-4 w-4" aria-hidden="true" />
          )}
          <span className="sr-only">
            {showPassword ? 'Hide password' : 'Show password'}
          </span>
        </Button>

        {isCheckShow && isFocused && (
          <div
            className="absolute -bottom-2 right-1 h-1 w-[98%] rounded-md bg-gray-200"
            tabIndex={-1}
          >
            <div
              className={`h-1 rounded ${
                passwordStrength === 0
                  ? 'bg-gray-200'
                  : passwordStrength <= 2
                    ? 'bg-red-500'
                    : passwordStrength <= 4
                      ? 'bg-yellow-500'
                      : 'bg-green-500'
              }`}
              style={{ width: `${(passwordStrength / 5) * 100}%` }}
            ></div>
          </div>
        )}
      </div>
    );
  },
);
export { PasswordInput };
