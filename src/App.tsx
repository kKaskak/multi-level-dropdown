import { useCallback, useEffect, useState, useRef, useLayoutEffect } from 'react';
import { multiLevel, singleLevel } from './data';
import MultiselectMenu from './MultiselectMenu';

const App = () => {
    const [options, setOptions] = useState<MultiselectMenuOption[]>(multiLevel);
    const [level, setLevel] = useState<number>(0);
    const [selectedOption, setSelectedOption] = useState<MultiselectMenuOption | undefined>(undefined);
    const [selectedOptionSingle, setSelectedOptionSingle] = useState<MultiselectMenuOption | undefined>(undefined);

    const previousLevelRef = useRef<number>(level);

    const defaultOption = multiLevel.find((option: MultiselectMenuOption) => option.default === true);

    const onSelect = (value: number) => {
        const option = options.find((option: MultiselectMenuOption) => option.value === value);
        if (option?.level) {
            setOptions(option.level);
            setLevel((prevLevel) => prevLevel + 1);
        } else {
            setSelectedOption(option);
        }
    };

    const defaultOptionSingle = singleLevel.find((option: MultiselectMenuOption) => option.default === true);
    
    const onSelectSingle = (value: number) => {
        const option = singleLevel.find((option: MultiselectMenuOption) => option.value === value);
        setSelectedOptionSingle(option);
    };

    const onLevelChange = useCallback(() => {
        if (level > previousLevelRef.current) {
            if (selectedOption?.level) {
                setOptions(selectedOption.level);
            }
        } else if (level < previousLevelRef.current) {
            setOptions(multiLevel);
        }
        previousLevelRef.current = level;
    }, [level, selectedOption]);


    useLayoutEffect(() => {
        onLevelChange();
    }, [level]);

    return (
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '3rem', width: '100vw', height: '100vh' }}>
            <MultiselectMenu
                options={options}
                onSelect={onSelect}
                selectedOption={selectedOption}
                defaultOption={defaultOption}
                level={level}
                setLevel={setLevel}
            />
            <MultiselectMenu
                options={singleLevel}
                onSelect={onSelectSingle}
                selectedOption={selectedOptionSingle}
                defaultOption={defaultOptionSingle}
            />
        </div>
    );
};

export default App;
