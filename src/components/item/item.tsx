import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import {Checkbox, FormControlLabel, IconButton, Stack, TextField} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import SaveIcon from '@mui/icons-material/Save';
import {getDeadlineDate} from '../../helpers';
import {ItemRdo} from '../../types/item.rdo';
import {ChangeEvent, useEffect, useState} from 'react';
import {useAppDispatch} from '../../hooks';
import {updateItemAction} from '../../store/api-actions';
import DeadlineDatePicker from '../date-picker/date-picker';

type ItemProps = {
  item: ItemRdo;
};

function Item({item}: ItemProps): JSX.Element {
  const dispatch = useAppDispatch();

  const itemDeadlineColor = item.deadline && new Date(item.deadline) < new Date() ? 'red' : 'green';

  const [isContentEditable, setContentEditable] = useState(false);

  const [isDeadlineInputDisabled, setIsDeadlineInputDisabled] = useState(false);

  const [titleValue, setTitleValue] = useState(item.title);
  const [titleHelperText, setTitleHelperText] = useState('');

  const [descriptionValue, setDescriptionValue] = useState(item.description);
  const [descriptionHelperText, setDescriptionHelperText] = useState('');

  const [deadline, setDeadline] = useState<string | undefined>(undefined);

  const [isFormValid, setIsFormValid] = useState(false);

  useEffect(() => {
    if (titleValue.length >= 5 && titleValue.length <= 30 && descriptionValue.length <= 230) {
      setIsFormValid(true);
    } else {
      setIsFormValid(false);
    }
  }, [descriptionValue.length, titleValue.length]);

  const handleDeleteButtonClick = () => {
    setContentEditable(false); // tmp
  };

  const handleSaveButtonClick = () => {
    if (isFormValid) {
      setContentEditable(false);
      dispatch(updateItemAction({
        id: item.id,
        updateItemDto: {
          title: titleValue,
          description: descriptionValue,
          deadline: deadline ?? null
        }
      }));
    }
  };

  const handleEditButtonClick = () => {
    setContentEditable(true);
  };

  const handleTitleInputChange = (evt: ChangeEvent<HTMLInputElement>) => {
    const value = evt.currentTarget.value;
    setTitleValue(value);
    if (value.length === 0) {
      setTitleHelperText('Введите название');
    }
    if (value.length > 30) {
      setTitleHelperText('Максимальная длина 30 символов');
    }
    if (value.length >= 1 && value.length < 5) {
      setTitleHelperText('Минимальная длина 5 символов');
    }
    if (value.length >= 5 && value.length <= 30) {
      setTitleHelperText('');
    }
  };

  const handleDescriptionInputChange = (evt: ChangeEvent<HTMLInputElement>) => {
    const value = evt.currentTarget.value;
    setDescriptionValue(value);
    if (value.length > 230) {
      setDescriptionHelperText('Максимальная длина 230 символов');
    } else {
      setDescriptionHelperText('');
    }
  };

  const handleUndedlinedInputChange = (evt: ChangeEvent<HTMLInputElement>) => {
    const checked = evt.currentTarget.checked;
    if (checked) {
      setDeadline(undefined);
      setIsDeadlineInputDisabled(true);
    } else {
      setIsDeadlineInputDisabled(false);
    }
  };

  return (
    <Accordion>
      <AccordionSummary
        sx={{
          backgroundColor: '#f0f7ff'
        }}
        expandIcon={<ExpandMoreIcon />}
      >
        <Stack direction={'column'}>
          {
            item.deadline
              && (
                <Typography
                  sx={{
                    color: itemDeadlineColor,
                    fontSize: '10px'
                  }}
                >
                  {getDeadlineDate(item.deadline)}
                </Typography>
              )
          }
          <Typography>
            {item.title}
          </Typography>
        </Stack>
      </AccordionSummary>
      <AccordionDetails>
        <Stack direction={'column'} spacing={1}>
          {
            isContentEditable
              ? (
                <>
                  <TextField
                    defaultValue={item.title}
                    onChange={handleTitleInputChange}
                    error={titleHelperText !== ''}
                    helperText={titleHelperText}
                    size='small'
                  />
                  <TextField
                    defaultValue={item.description}
                    onChange={handleDescriptionInputChange}
                    error={descriptionHelperText !== ''}
                    helperText={descriptionHelperText}
                    size='small'
                    multiline
                    rows={4}
                  />
                  <Stack direction={'row'} spacing={2}>
                    <DeadlineDatePicker
                      setDeadline={setDeadline}
                      value={item.deadline ?? undefined}
                      disabled={isDeadlineInputDisabled}
                    />
                    <FormControlLabel
                      control={<Checkbox onChange={handleUndedlinedInputChange}/>}
                      label="Бессрочно"
                    />
                  </Stack>
                </>
              )
              : (
                <Typography
                  sx={{
                    fontSize: '14px'
                  }}
                >
                  {item.description}
                </Typography>
              )
          }
          <Stack direction={'row'}>
            {
              isContentEditable
                ? (
                  <>
                    <IconButton onClick={handleDeleteButtonClick}>
                      <DeleteIcon />
                    </IconButton>
                    <IconButton onClick={handleSaveButtonClick}>
                      <SaveIcon />
                    </IconButton>
                  </>
                )
                : (
                  <IconButton onClick={handleEditButtonClick}>
                    <EditIcon />
                  </IconButton>
                )
            }
          </Stack>
        </Stack>
      </AccordionDetails>
    </Accordion>
  );
}

export default Item;
