import { Dropdown, Button, useBinaryState, useOutsideClick, Icon } from '@/common';
import classNames from 'classnames';
import styles from './MultiselectMenu.module.scss';

type Props = {
    className?: string,
    title?: string;
    options: MultiselectMenuOption[];
    selectedOption?: MultiselectMenuOption;
    defaultOption?: MultiselectMenuOption;
    onSelect: (value: number) => void;
    level?: number;
    setLevel?: (level: number) => void;
};

const MultiselectMenu = ({ className, title, options, selectedOption, onSelect, defaultOption, level, setLevel }: Props) => {
    const [menuOpen, , closeMenu, toggleMenu] = useBinaryState(false);
    const multiselectMenuRef = useOutsideClick(() => closeMenu());

    const onOptionSelect = (value: number) => {
        const [clickedOption] = options.filter((option) => option.value === value);
        onSelect(value);
        !clickedOption.level && closeMenu();
    };
    
    return (
        <div className={classNames(styles.multiselectMenu, className)} ref={multiselectMenuRef}>
            <Button
                className={classNames(styles.multiselectButton, { [styles.open]: menuOpen })}
                onClick={toggleMenu}
                tabIndex={0}
                aria-haspopup={'listbox'}
                aria-expanded={menuOpen}
            >
                {
                    title ?
                        title
                        : selectedOption ?
                            selectedOption.label
                            : defaultOption ?
                                defaultOption.label
                                : 'Select an option'
                }
                <Icon name={'arrow-down'} className={classNames(styles.icon, { [styles.open]: menuOpen })} />
            </Button>
            {
                menuOpen ?
                    <Dropdown
                        level={level}
                        setLevel={setLevel}
                        options={options}
                        onSelect={onOptionSelect}
                        menuOpen={menuOpen}
                        selectedOption={selectedOption}
                    />
                : null
            }
        </div>
    );
};

export default MultiselectMenu;