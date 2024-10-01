import React, { useEffect, useState } from 'react'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import { useNavigate, useParams } from 'react-router-dom'
import {
  CBadge,
  CButton,
  CCard,
  CCardBody,
  CCardHeader,
  CCol,
  CContainer,
  CForm,
  CFormInput,
  CFormLabel,
  CFormTextarea,
  CImage,
  CRow,
  CSpinner,
} from '@coreui/react'
import { toast, ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import PagesService from 'src/services/PagesService'
import { cilTrash } from '@coreui/icons'
import CIcon from '@coreui/icons-react'

const ValidateSchema = Yup.object({
  screen_content: Yup.object().shape(
    {
      address: Yup.string().required('Required'),
      phone_number: Yup.number().required('Required'),
      email_id: Yup.string().required('Required'),
      facebook_link: Yup.string(),
      instagram_link: Yup.string(),
      twitter_link: Yup.string(),
      location_link: Yup.string(),
      tiktok_link: Yup.string(),
      linkedin_link: Yup.string(),
      youtube_link: Yup.string(),
    },
    'Section in not valid',
  ),
})

const ContactDetails = () => {
  const [type, setType] = useState('contact-us')
  const navigate = useNavigate()
  const pagesService = new PagesService()
  const [contentLoaded, setContentLoaded] = useState(false)
  const [submitLoader, setSubmitLoader] = useState(false)
  const [initialValues, setInitialValues] = useState({
    screen_content: {
      address: '',
      phone_number: '',
      email_id: '',
      facebook_link: '',
      instagram_link: '',
      twitter_link: '',
      location_link: '',
      tiktok_link: '',
      linkedin_link: '',
      youtube_link: '',
      banner_image: '',
    },
  })

  const getSectionDetails = async () => {
    let response = await pagesService.getDetails(type)
    if (response) {
      setInitialValues(response.content ? {screen_content:JSON.parse(response.content)}  : initialValues)
      setContentLoaded(true)
    }
  }

  useEffect(() => {
    if (type) {
      getSectionDetails()
    }
  }, [type])

  const onSubmit = async (values) => {
    setSubmitLoader(true)
    let obj = { ...values }
    const formData = new FormData()
    try {
      if (type) {
        formData.append('type', type)
      }
      formData.append('screen_content', JSON.stringify(obj.screen_content))
      formData.append(
        'banner_image',
        obj.screen_content.banner_image ? obj.screen_content.banner_image : '',
      )
      let response = await pagesService.editPage(formData)
      if (response.error) {
        setSubmitLoader(false)
        toast.error(response.error)
      } else if (response.data) {
        setSubmitLoader(false)
        toast.success(response.message)
        setTimeout(() => {
          navigate('/contact-us')
        }, 1500)
      }
    } catch (error) {
      setSubmitLoader(false)
      toast.error(error.message)
    }
  }
  const formik = useFormik({
    initialValues: initialValues,
    validateOnBlur: true,
    onSubmit,
    validationSchema: ValidateSchema,
    enableReinitialize: true,
  })
  return (
    <CCard style={{ margin: '0 auto 1.5rem' }}>
      <CCardHeader className="d-flex flex-row justify-content-between">
        <p className="fw-bolder fs-4 m-0">
          {type ? 'Edit Section' : 'Add Section'}{' '}
          <CBadge color="success">{formik.values.section_name}</CBadge>
        </p>
        <div>
          <CButton
            color="primary"
            type="submit"
            className="me-3"
            onClick={formik.handleSubmit}
            disabled={!(formik.isValid && formik.dirty) || submitLoader ? true : false}
          >
            Save
          </CButton>
          <CButton color="primary" variant="outline" onClick={() => navigate(-1)}>
            Back
          </CButton>
        </div>
      </CCardHeader>
      {!contentLoaded ? (
        <div className="d-flex justify-content-center py-3">
          <CSpinner color="dark" variant="grow" />
        </div>
      ) : (
        <CCardBody className={window.innerWidth < 576 ? 'px-0' : ''}>
          <CForm onSubmit={formik.handleSubmit}>
            <CContainer className="d-flex flex-column gap-3">
              <CCard className={'d-flex flex-column gap-3 p-3'}>
                <CBadge color="info" shape="rounded-pill" className="col-md-1 col-sm-4 py-2">
                  Edit Section
                </CBadge>
                <CRow>
                  <CCol className={'mb-2 ' + (window.innerWidth < 576 ? 'col-12' : 'col-6')}>
                    <CFormLabel htmlFor="address">Address*</CFormLabel>
                    <CFormTextarea
                      type="text"
                      id="address"
                      placeholder="Address"
                      rows={4}
                      value={formik.values.screen_content.address}
                      name={`screen_content.address`}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      className={
                        'textareaResizeNone mb-2' +
                        (formik.touched.screen_content &&
                        formik.touched.screen_content.address &&
                        formik.errors.screen_content &&
                        formik.errors.screen_content.address
                          ? ' border-danger'
                          : '')
                      }
                    />
                    
                  </CCol>
                  <CCol>
                    <CFormLabel htmlFor="banner_image">
                      Banner Image* <span className="text-info">(1920 x 1319)</span>
                    </CFormLabel>
                    <CFormInput
                      type="file"
                      id={`banner_image`}
                      placeholder="Background Image"
                      name={`screen_content.banner_image`}
                      onChange={(e) => {
                        formik.setFieldValue(
                          `screen_content.banner_image`,
                          e.currentTarget.files[0],
                        )
                      }}
                      className={
                        '' +
                        (formik.touched.screen_content &&
                        formik.touched.screen_content.banner_image &&
                        formik.errors.screen_content &&
                        formik.errors.screen_content.banner_image
                          ? ' border-danger'
                          : '')
                      }
                    />
                    {formik.values.screen_content.banner_image && (
                      <CRow>
                        <CCol className={'mt-3 ' + (window.innerWidth > 576 ? 'col-4' : 'col-8')}>
                          <CImage
                            rounded
                            thumbnail
                            src={
                              typeof formik.values.screen_content.banner_image == 'string'
                                ? process.env.REACT_APP_API_BASEURL +
                                  formik.values.screen_content.banner_image
                                : URL.createObjectURL(formik.values.screen_content.banner_image)
                            }
                            width={200}
                            height={200}
                          />
                        </CCol>
                        <CCol className={'mt-3 ' + (window.innerWidth > 576 ? 'col-2' : 'col-4')}>
                          <CIcon
                            icon={cilTrash}
                            className="text-danger cursorPointer"
                            width={20}
                            height={20}
                            onClick={(e) => {
                              let text = 'Do you want to remove image ?'
                              if (window.confirm(text) === true) {
                                let array = ''
                                formik.setFieldValue(`screen_content.banner_image`, array)
                              }
                            }}
                          />
                        </CCol>
                      </CRow>
                    )}
                  </CCol>
                
                </CRow>
                <CRow>
                  <CCol className={'mb-2 ' + (window.innerWidth < 576 ? 'col-12' : 'col-6')}>
                    
                    <CFormLabel htmlFor="phone_number">Phone Number*</CFormLabel>
                    <CFormInput
                      type="text"
                      id="phone_number"
                      placeholder="Phone Number"
                      value={formik.values.screen_content.phone_number}
                      name={`screen_content.phone_number`}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      maxLength={10}
                      className={
                        'mb-2' +
                        (formik.touched.screen_content &&
                        formik.touched.screen_content.phone_number &&
                        formik.errors.screen_content &&
                        formik.errors.screen_content.phone_number
                          ? ' border-danger'
                          : '')
                      }
                    />

                    <CFormLabel htmlFor="email_id">Email Id*</CFormLabel>
                    <CFormInput
                      type="text"
                      id="email_id"
                      placeholder="Email Id"
                      value={formik.values.screen_content.email_id}
                      name={`screen_content.email_id`}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      maxLength={30}
                      className={
                        'mb-2' +
                        (formik.touched.screen_content &&
                        formik.touched.screen_content.email_id &&
                        formik.errors.screen_content &&
                        formik.errors.screen_content.email_id
                          ? ' border-danger'
                          : '')
                      }
                    />
                    <CFormLabel htmlFor="location_link">Location Link</CFormLabel>
                    <CFormInput
                      type="text"
                      id="location_link"
                      placeholder="Location Link"
                      value={formik.values.screen_content.location_link}
                      name={`screen_content.location_link`}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      className="mb-2"
                    />
                    <CFormLabel htmlFor="linkedin_link">Linkedin Link</CFormLabel>
                    <CFormInput
                      type="text"
                      id="linkedin_link"
                      placeholder="Linkedin Link"
                      value={formik.values.screen_content.linkedin_link}
                      name={`screen_content.linkedin_link`}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      className="mb-2"
                    />
                      <CFormLabel htmlFor="instagram_link">Instagram Link</CFormLabel>
                    <CFormInput
                      type="text"
                      id="instagram_link"
                      placeholder="Instagram Link"
                      value={formik.values.screen_content.instagram_link}
                      name={`screen_content.instagram_link`}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      className="mb-2"
                    />
                  </CCol>
                  
                  <CCol>
                  
                    <CFormLabel htmlFor="facebook_link">Facebook Link</CFormLabel>
                    <CFormInput
                      type="text"
                      id="facebook_link"
                      placeholder="Facebook Link"
                      value={formik.values.screen_content.facebook_link}
                      name={`screen_content.facebook_link`}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      className="mb-2"
                    />
                    <CFormLabel htmlFor="twitter_link">Twitter Link</CFormLabel>
                    <CFormInput
                      type="text"
                      id="twitter_link"
                      placeholder="Twitter Link"
                      value={formik.values.screen_content.twitter_link}
                      name={`screen_content.twitter_link`}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      className="mb-2"
                    />
                    <CFormLabel htmlFor="tiktok_link">Tiktok Link</CFormLabel>
                    <CFormInput
                      type="text"
                      id="tiktok_link"
                      placeholder="Tiktok Link"
                      value={formik.values.screen_content.tiktok_link}
                      name={`screen_content.tiktok_link`}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      className="mb-2"
                    />
                    <CFormLabel htmlFor="youtube_link">Youtube Link</CFormLabel>
                    <CFormInput
                      type="text"
                      id="youtube_link"
                      placeholder="Youtube Link"
                      value={formik.values.screen_content.youtube_link}
                      name={`screen_content.youtube_link`}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      className="mb-2"
                    />
                  </CCol>
                </CRow>
              </CCard>
              <CRow>
                <CCol>
                  <div className="d-grid gap-2 col-4 mx-auto" style={{ margin: '1rem 0' }}>
                    <CButton
                      color="primary"
                      type="submit"
                      disabled={!(formik.isValid && formik.dirty) || submitLoader ? true : false}
                    >
                      {submitLoader ? (
                        <>
                          <CSpinner component="span" size="sm" variant="grow" aria-hidden="true" />
                          {'  '}Loading...
                        </>
                      ) : (
                        'Save'
                      )}
                    </CButton>
                  </div>
                </CCol>
              </CRow>
            </CContainer>
          </CForm>
        </CCardBody>
      )}
      <ToastContainer />
    </CCard>
  )
}

export default ContactDetails
