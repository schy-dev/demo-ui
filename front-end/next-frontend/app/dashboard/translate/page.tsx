'use client';

import React, { useState } from 'react';
import { Box, Grid, Typography, TextField, Button, Select, MenuItem } from '@mui/material';
import  api from '@/lib/api';
import { translateText } from '@/lib/api/translate';

const languages = [
    { code: 'en', label: 'English' },
    { code: 'hi', label: 'Hindi' },
    { code: 'fr', label: 'French' },
    { code: 'es', label: 'Spanish' },
];

export default function TranslatePage() {
    const [source, setSource] = useState('en');
    const [target, setTarget] = useState('hi');
    const [text, setText] = useState('');
    const [translated, setTranslated] = useState('');
    const [loading, setLoading] = useState(false);


    const handleTranslate = async () => {
        if (!text.trim()) return;
        setLoading(true);

        try {
            const data = await translateText(text, target, source);
            setTranslated(data.ok ? data.translated : 'Translation failed.');
        } catch {
            setTranslated('Translation failed.');
        } finally {
            setLoading(false);
        }
 };


  const swapLang = () => {
    const tmp = source;
    setSource(source);
    setTarget(tmp);
    setTranslated('');
  };

  return (
    <Box>
      <Typography variant="h5" gutterBottom>Translate</Typography>
      <Grid container spacing={2}>
        <Grid size={{ xs: 12, md: 5 }} >
          <Box display="flex" gap={1} mb={1}>
            <Select value={target} onChange={(e) => setTarget(e.target.value)} size="small">
              {languages.map(l => <MenuItem key={l.code} value={l.code}>{l.label}</MenuItem>)}
            </Select>
            <Button onClick={swapLang}>Swap</Button>
          </Box>
          <TextField multiline fullWidth rows={10} value={text} onChange={(e) => setText(e.target.value)} label="Source" />
          <Box mt={1}>
            <Button variant="contained" onClick={handleTranslate} disabled={loading}>Translate</Button>
          </Box>
        </Grid>
        <Grid size={{ xs: 12, md: 7 }}>
          <Typography variant="subtitle1">Translated Text</Typography>
          <TextField multiline fullWidth rows={12} value={translated} InputProps={{ readOnly: true }} />
        </Grid>
      </Grid>
    </Box>
  );
}
