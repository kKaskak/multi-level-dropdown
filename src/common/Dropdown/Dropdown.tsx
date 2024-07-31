import { Button, Icon, Option } from '@/common';
import classNames from 'classnames';
import styles from './Dropdown.module.scss';

type Props = {
    options: MultiselectMenuOption[];
    selectedOption?: MultiselectMenuOption | null;
    menuOpen: boolean | (() => void);
    level?: number;
    setLevel?: (level: number) => void;
    onSelect: (value: number) => void;
};

const Dropdown = ({ level, setLevel, options, onSelect, selectedOption, menuOpen }: Props) => {
    const onBackButtonClick = () => {
        setLevel && level && setLevel(level - 1);
    };

    return (
        <div className={classNames(styles.dropdown, { [styles.open]: menuOpen })} role={'listbox'}>
            {
                level && level > 0 ?
                    <Button className={styles.backButton} onClick={onBackButtonClick}>
                        <Icon name={'arrow-down'} className={styles.icon} />
                        Back
                    </Button>
                : null
            }
            {
                options
                    .filter((option: MultiselectMenuOption) => !option.hidden)
                    .map((option: MultiselectMenuOption, index) => (
                        <Option
                            key={index}
                            option={option}
                            onSelect={onSelect}
                            selectedOption={selectedOption}
                        />
                    ))


            }
        </div>
    );
};

export default Dropdown;