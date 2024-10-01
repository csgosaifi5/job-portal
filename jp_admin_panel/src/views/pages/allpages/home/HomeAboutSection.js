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
import { Editor } from '@tinymce/tinymce-react'
import editorConfig from 'src/util/editorConfig'

const ValidateSchema = Yup.object({
  screen_content: Yup.object().shape(
    {
      title: Yup.string().required('Required'),
      description: Yup.string().required('Required'),
      btn_text: Yup.string().required('Required'),
      image: Yup.string().required('Required'),
      btn_link: Yup.string(),
    },
    'Club Section in not valid',
  ),
})

const HomeAboutSection = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const pagesService = new PagesService()
  const [contentLoaded, setContentLoaded] = useState(false)
  const [submitLoader, setSubmitLoader] = useState(false)
  const [initialValues, setInitialValues] = useState({
    screen_content: {
      title: '',
      description: '',
      btn_text: '',
      btn_link: '',
      image: '',
    },
  })

  const getSectionDetails = async () => {
    let response = await pagesService.getDetails(id)
    if (response.data) {
      setInitialValues(response.data)
      setContentLoaded(true)
    }
  }

  useEffect(() => {
    if (id) {
      getSectionDetails()
    }
  }, [id])

  const onSubmit = async (values) => {
    setSubmitLoader(true)
    let obj = { ...values }
    const formData = new FormData()
    try {
      if (id) {
        formData.append('_id', id)
      }
      formData.append('screen_content', JSON.stringify(obj.screen_content))
      formData.append('image__', obj.screen_content.image ? obj.screen_content.image : '')

      let response = await pagesService.editPage(formData)
      if (response.error) {
        setSubmitLoader(false)
        toast.error(response.error)
      } else if (response.data) {
        setSubmitLoader(false)
        toast.success(response.message)
        setTimeout(() => {
          navigate('/home/list')
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
          {id ? 'Edit Section' : 'Add Section'}{' '}
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
                  <CCol className={window.innerWidth < 576 ? 'col-12' : 'col-6'}>
                    <CFormLabel htmlFor="title">Title*</CFormLabel>
                    <Editor
                      apiKey={process.env.REACT_APP_TINYMCE_KEY}
                      value={formik.values.screen_content.title}
                      onEditorChange={(e) => {
                        formik.setFieldValue(`screen_content.title`, e)
                      }}
                      onBlur={formik.handleBlur}
                      init={editorConfig.singleLineEditor}
                    />
                    {/* <CFormInput
                      type="text"
                      id="title"
                      placeholder="Title"
                      value={formik.values.screen_content.title}
                      name={`screen_content.title`}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      className={
                        'mb-2' +
                        (formik.touched.screen_content &&
                        formik.touched.screen_content.title &&
                        formik.errors.screen_content &&
                        formik.errors.screen_content.title
                          ? ' border-danger'
                          : '')
                      }
                    /> */}
                  </CCol>
                  <CCol>
                    <CFormLabel htmlFor="btn_link">Button Link</CFormLabel>
                    <CFormInput
                      type="text"
                      id="btn_link"
                      placeholder="Button Link"
                      value={formik.values.screen_content.btn_link}
                      name={`screen_content.btn_link`}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      className="mb-2"
                    />
                  </CCol>
                  <CCol>
                    <CFormLabel htmlFor="btn_text">Button Text*</CFormLabel>
                    <CFormInput
                      type="text"
                      id="btn_text"
                      placeholder="Button Text"
                      value={formik.values.screen_content.btn_text}
                      name={`screen_content.btn_text`}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      className={
                        'mb-2' +
                        (formik.touched.screen_content &&
                        formik.touched.screen_content.btn_text &&
                        formik.errors.screen_content &&
                        formik.errors.screen_content.btn_text
                          ? ' border-danger'
                          : '')
                      }
                    />
                  </CCol>
                </CRow>
                <CRow>
                  <CCol>
                    <CFormLabel htmlFor="description">Description*</CFormLabel>
                    <Editor
                      apiKey={process.env.REACT_APP_TINYMCE_KEY}
                      value={formik.values.screen_content.description}
                      onEditorChange={(e) => {
                        formik.setFieldValue(`screen_content.description`, e)
                      }}
                      onBlur={formik.handleBlur}
                      init={editorConfig.multiLineEditor}
                    />
                    {/* <CFormTextarea
                      type="text"
                      id="description"
                      placeholder="Description"
                      rows={7}
                      value={formik.values.screen_content.description}
                      name={`screen_content.description`}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      className={
                        'textareaResizeNone' +
                        (formik.touched.screen_content &&
                        formik.touched.screen_content.description &&
                        formik.errors.screen_content &&
                        formik.errors.screen_content.description
                          ? ' border-danger'
                          : '')
                      }
                    /> */}
                  </CCol>
                </CRow>
                <CRow>
                  <CCol>
                    <CFormLabel htmlFor="image">
                      Image* <span className="text-info">(609 x 538)</span>
                    </CFormLabel>
                    <CFormInput
                      type="file"
                      id={`image`}
                      placeholder="Image"
                      name={`screen_content.image`}
                      onChange={(e) => {
                        formik.setFieldValue(`screen_content.image`, e.currentTarget.files[0])
                      }}
                      className={
                        '' +
                        (formik.touched.screen_content &&
                        formik.touched.screen_content.image &&
                        formik.errors.screen_content &&
                        formik.errors.screen_content.image
                          ? ' border-danger'
                          : '')
                      }
                    />
                    {formik.values.screen_content.image && (
                      <CRow>
                        <CCol className={'mt-3 ' + (window.innerWidth > 576 ? 'col-2' : 'col-8')}>
                          <CImage
                            rounded
                            thumbnail
                            src={
                              typeof formik.values.screen_content.image == 'string'
                                ? process.env.REACT_APP_API_BASEURL +
                                  formik.values.screen_content.image
                                : URL.createObjectURL(
                                    process.env.REACT_APP_API_BASEURL +
                                      formik.values.screen_content.image,
                                  )
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
                                formik.setFieldValue(`screen_content.image`, array)
                              }
                            }}
                          />
                        </CCol>
                      </CRow>
                    )}
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

export default HomeAboutSection
