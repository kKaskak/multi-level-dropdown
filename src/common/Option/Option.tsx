import { useMemo } from 'react';
import classNames from 'classnames';
import { Button, Icon } from '@/common';
import styles from './Option.module.scss';

type Props = {
    option: MultiselectMenuOption;
    selectedOption?: MultiselectMenuOption | null;
    onSelect: (value: number) => void;
};

const Option = ({ option, selectedOption, onSelect }: Props) => {
    // consider using option.id === selectedOption?.id instead
    const selected = useMemo(() => option?.value === selectedOption?.value, [option, selectedOption]);

    return (
        <Button
            className={classNames(styles.option, { [styles.selected]: selected })}
            key={option.id}
            onClick={() => onSelect(option.value)}
            aria-selected={selected}
        >
            <div className={styles.label}>{ option.label }</div>
            {
                selected && !option.level ?
                <div className={styles.icon} />
                    : null

            }
            {
                option.level ?
                    <Icon name={'arrow-down'} className={styles.levelIcon} />
                    : null
            }
        </Button>
    );
};

export default Option;