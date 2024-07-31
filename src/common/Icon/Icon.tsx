import ArrowDown from '@/assets/arrow-down.svg';

const ICONS: { [key: string]: string } = {
    'arrow-down': ArrowDown,
};

type Props = {
    className?: string;
    name: string;
};

const Icon = ({ className, name }: Props) => {
    return <img className={className} src={ICONS[name]} />;
};

export default Icon;
