import type { FC, SVGProps } from 'react';
import { IconName } from '../../../public/icons/name';

interface IconProps extends SVGProps<SVGSVGElement> {
  id: IconName;
  size?: number;
}

const Icon: FC<IconProps> = ({ id, size = 24, ...props }) => {
  return (
    <svg width={size} height={size} {...props}>
      <use href={`/icons/sprite.svg#${id}`} />
    </svg>
  );
};

export { Icon };
