import { Box, Stack, Typography } from '@mui/material'
import { useTranslation } from 'react-i18next'

const TermsAndConditions = () => {
  const { t } = useTranslation()
  return (
    <Box pt={12} pb={4} px={{ xs: 2, md: 10 }}>
      <Stack spacing={3}>
        <Typography variant={'h2'}>{t('termsAndConditions.title')}</Typography>
        <Typography variant={'h3'}>
          {t('termsAndConditions.overview')}
        </Typography>
        <Typography variant={'body1'}>
          {t('termsAndConditions.overviewBody')}
        </Typography>
        <Typography variant={'h3'}>
          {t('termsAndConditions.section1')}
        </Typography>
        <Typography variant={'body1'}>
          {t('termsAndConditions.section1Body')}
        </Typography>
        <Typography variant={'h3'}>
          {t('termsAndConditions.section2')}
        </Typography>
        <Typography variant={'body1'}>
          {t('termsAndConditions.section2Body')}
        </Typography>
        <Typography variant={'h3'}>
          {t('termsAndConditions.section3')}
        </Typography>
        <Typography variant={'body1'}>
          {t('termsAndConditions.section3Body')}
        </Typography>
        <Typography variant={'h3'}>
          {t('termsAndConditions.section4')}
        </Typography>
        <Typography variant={'body1'}>
          {t('termsAndConditions.section4Body')}
        </Typography>
        <Typography variant={'h3'}>
          {t('termsAndConditions.section5')}
        </Typography>
        <Typography variant={'body1'}>
          {t('termsAndConditions.section5Body')}
        </Typography>
        <Typography variant={'h3'}>
          {t('termsAndConditions.section6')}
        </Typography>
        <Typography variant={'body1'}>
          {t('termsAndConditions.section6Body')}
        </Typography>
        <Typography variant={'h3'}>
          {t('termsAndConditions.section7')}
        </Typography>
        <Typography variant={'body1'}>
          {t('termsAndConditions.section7Body')}
        </Typography>
        <Typography variant={'h3'}>
          {t('termsAndConditions.section8')}
        </Typography>
        <Typography variant={'body1'}>
          {t('termsAndConditions.section8Body')}
        </Typography>
        <Typography variant={'h3'}>
          {t('termsAndConditions.section9')}
        </Typography>
        <Typography variant={'body1'}>
          {t('termsAndConditions.section9Body')}
        </Typography>
        <Typography variant={'h3'}>
          {t('termsAndConditions.section10')}
        </Typography>
        <Typography variant={'body1'}>
          {t('termsAndConditions.section10Body')}
        </Typography>
        <Typography variant={'h3'}>
          {t('termsAndConditions.section11')}
        </Typography>
        <Typography variant={'body1'}>
          {t('termsAndConditions.section11Body')}
        </Typography>
        <Typography variant={'h3'}>
          {t('termsAndConditions.section12')}
        </Typography>
        <Typography variant={'body1'}>
          {t('termsAndConditions.section12Body')}
        </Typography>
        <Typography variant={'h3'}>
          {t('termsAndConditions.section13')}
        </Typography>
        <Typography variant={'body1'}>
          {t('termsAndConditions.section13Body')}
        </Typography>
        <Typography variant={'h3'}>
          {t('termsAndConditions.section14')}
        </Typography>
        <Typography variant={'body1'}>
          {t('termsAndConditions.section14Body')}
        </Typography>
        <Typography variant={'h3'}>
          {t('termsAndConditions.section15')}
        </Typography>
        <Typography variant={'body1'}>
          {t('termsAndConditions.section15Body')}
        </Typography>
        <Typography variant={'h3'}>
          {t('termsAndConditions.section16')}
        </Typography>
        <Typography variant={'body1'}>
          {t('termsAndConditions.section16Body')}
        </Typography>
        <Typography variant={'h3'}>
          {t('termsAndConditions.section17')}
        </Typography>
        <Typography variant={'body1'}>
          {t('termsAndConditions.section17Body')}
        </Typography>
        <Typography variant={'h3'}>
          {t('termsAndConditions.section18')}
        </Typography>
        <Typography variant={'body1'}>
          {t('termsAndConditions.section18Body')}
        </Typography>
        <Typography variant={'h3'}>
          {t('termsAndConditions.section19')}
        </Typography>
        <Typography variant={'body1'}>
          {t('termsAndConditions.section19Body')}
        </Typography>
        <Typography variant={'h3'}>
          {t('termsAndConditions.section20')}
        </Typography>
        <Typography variant={'body1'}>
          {t('termsAndConditions.section20Body')}
        </Typography>
        <Stack>
          <Typography variant={'body1'}>Seed and Spore</Typography>
          <Typography variant={'body1'}>seedandspore@proton.me</Typography>
          <Typography variant={'body1'}>Rua Alfageme de Santarém 36</Typography>
          <Typography variant={'body1'}>4150-046 Porto</Typography>
          <Typography variant={'body1'}>Portugal</Typography>
          <Typography variant={'body1'}>+351 912 563 920</Typography>
          <Typography variant={'body1'}>+49 176 4341 3719</Typography>
          <Typography variant={'body1'}>IVA/VAT: 240720725</Typography>
        </Stack>
        <Typography variant={'h2'}>{t('refundPolicy.header')}</Typography>
        <Typography variant={'body1'}>{t('refundPolicy.body')}</Typography>
        <Typography variant={'h3'}>
          {t('refundPolicy.damagesAndIssues')}
        </Typography>
        <Typography variant={'body1'}>
          {t('refundPolicy.damagesAndIssuesBody')}
        </Typography>
        <Typography variant={'h3'}>{t('refundPolicy.exchanges')}</Typography>
        <Typography variant={'body1'}>
          {t('refundPolicy.exchangesBody')}
        </Typography>
        <Typography variant={'h3'}>{t('refundPolicy.refunds')}</Typography>
        <Typography variant={'body1'}>
          {t('refundPolicy.refundsBody')}
        </Typography>
        <Typography variant={'h2'}>{t('privacyPolicy.header')}</Typography>
        <Typography variant={'body1'}>{t('privacyPolicy.body')}</Typography>
        <Typography variant={'h3'}>
          {t('privacyPolicy.personalInfo')}
        </Typography>
        <Typography variant={'body1'}>
          {t('privacyPolicy.personalInfoBody')}
        </Typography>
        <Typography variant={'h3'}>{t('privacyPolicy.howDoWeUse')}</Typography>
        <Typography variant={'body1'}>
          {t('privacyPolicy.howDoWeUseBody')}
        </Typography>
        <Typography variant={'h3'}>
          {t('privacyPolicy.sharingPersonalInfo')}
        </Typography>
        <Typography variant={'body1'}>
          {t('privacyPolicy.sharingPersonalInfoBody')}
        </Typography>
        <Typography variant={'h3'}>{t('privacyPolicy.doNotTrack')}</Typography>
        <Typography variant={'body1'}>
          {t('privacyPolicy.doNotTrackBody')}
        </Typography>
        <Typography variant={'h3'}>{t('privacyPolicy.yourRights')}</Typography>
        <Typography variant={'body1'}>
          {t('privacyPolicy.yourRightsBody')}
        </Typography>
        <Typography variant={'h3'}>
          {t('privacyPolicy.dataRetention')}
        </Typography>
        <Typography variant={'body1'}>
          {t('privacyPolicy.dataRetentionBody')}
        </Typography>
        <Typography variant={'h3'}>{t('privacyPolicy.changes')}</Typography>
        <Typography variant={'body1'}>
          {t('privacyPolicy.changesBody')}
        </Typography>
        <Typography variant={'h3'}>{t('privacyPolicy.contactUs')}</Typography>
        <Typography variant={'body1'}>
          {t('privacyPolicy.contactUsBody')}
        </Typography>
      </Stack>
    </Box>
  )
}

export default TermsAndConditions
