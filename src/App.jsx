import logo from './logo.svg';
import './App.css';
import Grid2 from "@mui/material/Unstable_Grid2"
import { Fragment, useState } from 'react';
import _ from "lodash"
import { FormControl, InputLabel, Select, MenuItem, Button, TextField, IconButton } from "@mui/material"
import AddIcon from '@mui/icons-material/Add';
import RemoveCircleOutlineIcon from '@mui/icons-material/RemoveCircleOutline';
import { useTranslation } from "react-i18next";
import i18n from './i18n/i18n';

function App() {
  const [language, setLanguage] = useState("JavaScript")
  const [description, setDescription] = useState("")
  const [paramsArr, setParamsArr] = useState([""])
  const [finalInstruction, setFinalInstruction] = useState("")
  const [returnValue, setReturnValue] = useState("")
  const [i18nDisplay, seti18nDisplay] = useState("zh")
  const { t, i18n } = useTranslation();
  function generate() {
    let instruction = ""
    instruction += t("i.create")
    instruction += t("i.colon")
    instruction += language
    instruction += "\n"

    instruction += t("i.description")
    instruction += t("i.colon")
    instruction += description
    instruction += "\n"
    _.map(paramsArr, (item, index) => {
      instruction += t("i.param1")
      instruction += (index + 1)
      instruction += t("i.param2")
      instruction += t("i.colon")
      instruction += item
      instruction += "\n"
    })
    instruction += t("i.return")
    instruction += t("i.colon")
    instruction += returnValue
    instruction += "\n"
    instruction += t("i.test")

    setFinalInstruction(instruction)

  }

  return (
    <div style={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
      <Grid2 container m={2} spacing={2} width={"500px"}>
        <Grid2 xs={6}>
          <FormControl fullWidth variant='standard'>
            <InputLabel id="demo-simple-select-label">{t("ui.programming_language")}</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={language}
              label={t("ui.programming_language")}
              onChange={(e) => { setLanguage(e.target.value) }}
            >
              {_.map(["JavaScript", "Python", "Java", "Golang", "Lua"], (item) => {
                return <MenuItem value={item}>{item}</MenuItem>
              })}
            </Select>
          </FormControl>
        </Grid2>
        <Grid2 xs={6}>
          <FormControl fullWidth variant='standard'>
            <InputLabel id="demo-simple-select-label">{t("ui.ui_language")}</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={i18nDisplay}
              label={t("ui.ui_language")}
              onChange={(e) => { i18n.changeLanguage(e.target.value); seti18nDisplay(e.target.value) }}
            >
              {_.map([{ id: "zh", label: "中文" }, { id: "en", label: "English" }], (item) => {
                return <MenuItem value={item.id}>{item.label}</MenuItem>
              })}
            </Select>
          </FormControl>
        </Grid2>
        <Grid2 xs={12}>
          <TextField fullWidth multiline rows={4} id="standard-basic" label={t("ui.description")} value={description} onChange={e => { setDescription(e.target.value) }} />
        </Grid2>
        {_.map(paramsArr, (paramItem, paramIndex) => {
          return (
            <Fragment>
              <Grid2 xs={12} display="flex" alignItems="center">

                <TextField fullWidth id="standard-basic" label={`${t("ui.param")} ${paramIndex + 1}`} variant="standard" value={paramItem} onChange={e => { paramsArr[paramIndex] = e.target.value; setParamsArr([...paramsArr]) }} />
                <IconButton sx={{ margin: "10px" }} color="error" aria-label="add an alarm" onClick={() => { paramsArr.splice(paramIndex, 1); setParamsArr([...paramsArr]) }}>
                  <RemoveCircleOutlineIcon />
                </IconButton>
              </Grid2>
              {/* <Grid2 xs={11}>
              </Grid2> */}
            </Fragment>
          )
        })}
        <Grid2 xs={12}>
          <Button fullWidth variant="outlined" startIcon={<AddIcon />} onClick={() => { setParamsArr([...paramsArr, ""]) }}>
            {t("ui.add_param")}
          </Button>
        </Grid2>
        <Grid2 xs={12}>
          <TextField fullWidth id="standard-basic" label={t("ui.return")} variant="standard" value={returnValue} onChange={e => { setReturnValue(e.target.value) }} />
        </Grid2>
        <Grid2 xs={12}>
          <Button fullWidth variant="contained" onClick={generate}>
            {t("ui.generate")}
          </Button>
        </Grid2>

        <Grid2 xs={12}>
          <TextField color='secondary' fullWidth multiline rows={10} id="standard-basic" label={t("ui.generated_instruction")} value={finalInstruction} onChange={e => { setFinalInstruction(e.target.value) }} />
        </Grid2>
      </Grid2 >
    </div >
  );
}

export default App;
