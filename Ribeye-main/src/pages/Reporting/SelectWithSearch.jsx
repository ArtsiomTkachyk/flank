import { useState, useEffect } from 'react';
import BusinessIcon from '@mui/icons-material/Business';
import { styled } from '@mui/material/styles';
import CheckboxFalse from '../../assets/icons/CheckboxFalse.svg';
import CheckboxTrue from '../../assets/icons/CheckboxTrue.svg';
import Autocomplete, { autocompleteClasses } from '@mui/material/Autocomplete';
import InputBase from '@mui/material/InputBase';
import { Checkbox, ClickAwayListener, OutlinedInput } from '@mui/material';
import DropdownSVG from '../../assets/icons/filtering/DropdownIcon.svg';

const uncheckedIcon = <img src={CheckboxFalse} alt='Icon' />;
const checkedIcon = <img src={CheckboxTrue} alt='Icon' />;

function DropdownIcon() {
  return <img src={DropdownSVG} alt='Calendar' />;
}

const StyledAutocompletePopper = styled('div')(() => ({
  [`& .${autocompleteClasses.paper}`]: {
    margin: 0,
    color: '#000929',
    fontSize: 14,
    boxShadow: 0,
    overflow: 'hidden',
  },
  [`& .${autocompleteClasses.listbox}`]: {
    padding: 0,
    width: 500,
    [`& .${autocompleteClasses.option}`]: {
      height: 40,
      alignItems: 'flex-start',
      '&[aria-selected="true"]': {
        backgroundColor: 'white',
      },
      [`&.${autocompleteClasses.focused}, &.${autocompleteClasses.focused}[aria-selected="true"]`]:
        {
          backgroundColor: '#DEF2EA',
        },
    },
  },
}));

const StyledInput = styled(InputBase)(({ theme }) => ({
  padding: 10,
  position: 'relative',
  width: 320,
  right: 0,
  '& input': {
    borderRadius: 4,
    backgroundColor: '#F1F3F4',
    padding: 8,
    transition: theme.transitions.create(['border-color', 'box-shadow']),
    fontSize: 14,
  },
}));

export default function SelectWithSearch({
  iconSVG,
  placeholder,
  listOfItems,
  value,
  setValue,
}) {
  function Icon() {
    return iconSVG ? (
      <img src={iconSVG} alt='Icon' />
    ) : (
      <BusinessIcon color='action' />
    );
  }
  const [pendingValue, setPendingValue] = useState(value);

  useEffect(() => {
    if (pendingValue.length !== value.length) setPendingValue(value);
  }, [value]);
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(!open);

  const setAndClose = () => {
    setValue(pendingValue);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <ClickAwayListener onClickAway={handleClose}>
      <div className='w-full'>
        <OutlinedInput
          startAdornment={<Icon />}
          endAdornment={<DropdownIcon />}
          placeholder={placeholder}
          onClick={handleOpen}
          sx={{ height: 38, width: '100%' }}
          value={value.map((val) => val.name)}
          readOnly
          disabled={listOfItems.length === 0}
        />
        {open && (
          <div className=' p-1 absolute z-10 bg-white border-r-6 shadow-lg'>
            <Autocomplete
              open
              multiple
              fullWidth
              onClose={setAndClose}
              value={pendingValue}
              onChange={(event, newValue) => {
                setPendingValue(newValue);
              }}
              disableCloseOnSelect
              PopperComponent={StyledAutocompletePopper}
              noOptionsText='No options'
              renderOption={(props, option, { selected }) => (
                <li {...props}>
                  <Checkbox
                    icon={uncheckedIcon}
                    checkedIcon={checkedIcon}
                    style={{ marginRight: 8 }}
                    checked={selected}
                  />
                  <div className='flex items-center h-8'>{option.name}</div>
                </li>
              )}
              options={[...listOfItems].sort((a, b) => {
                let ai = value.indexOf(a);
                ai = ai === -1 ? value.length + listOfItems.indexOf(a) : ai;
                let bi = value.indexOf(b);
                bi = bi === -1 ? value.length + listOfItems.indexOf(b) : bi;
                return ai - bi;
              })}
              getOptionLabel={(option) => option.name}
              renderInput={(params) => (
                <StyledInput
                  ref={params.InputProps.ref}
                  inputProps={params.inputProps}
                  autoFocus
                  placeholder='Filter labels'
                />
              )}
            />
          </div>
        )}
      </div>
    </ClickAwayListener>
  );
}
