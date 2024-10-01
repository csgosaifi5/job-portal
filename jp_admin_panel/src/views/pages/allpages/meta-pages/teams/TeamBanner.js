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
      title: Yup.string().required('Required'),
      bg_image: Yup.string().required('Required'),
    },
    'Banner Section in not valid',
  ),
})

const TeamBanner = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const pagesService = new PagesService()
  const [contentLoaded, setContentLoaded] = useState(false)
  const [submitLoader, setSubmitLoader] = useState(false)
  const [initialValues, setInitialValues] = useState({
    screen_content: {
      title: '',
      bg_image: '',
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
      formData.append('bg_image', obj.screen_content.bg_image ? obj.screen_content.bg_image : '')

      let response = await pagesService.editPage(formData)
      if (response.error) {
        setSubmitLoader(false)
        toast.error(response.error)
      } else if (response.data) {
        setSubmitLoader(false)
        toast.success(response.message)
        setTimeout(() => {
          navigate('/team/list')
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
                  <CCol className={'mb-2 ' + (window.innerWidth < 576 ? 'col-12' : 'col-6')}>
                    <CFormLabel htmlFor="title">Title*</CFormLabel>
                    <CFormInput
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
                    />
                  </CCol>
                  <CCol>
                    <CFormLabel htmlFor="bg_image">
                      Background Image* <span className="text-info">(1920 x 1319)</span>
                    </CFormLabel>
                    <CFormInput
                      type="file"
                      id={`bg_image`}
                      placeholder="Background Image"
                      name={`screen_content.bg_image`}
                      onChange={(e) => {
                        formik.setFieldValue(`screen_content.bg_image`, e.currentTarget.files[0])
                      }}
                      className={
                        '' +
                        (formik.touched.screen_content &&
                        formik.touched.screen_content.bg_image &&
                        formik.errors.screen_content &&
                        formik.errors.screen_content.bg_image
                          ? ' border-danger'
                          : '')
                      }
                    />
                    {formik.values.screen_content.bg_image && (
                      <CRow>
                        <CCol className={'mt-3 ' + (window.innerWidth > 576 ? 'col-4' : 'col-8')}>
                          <CImage
                            rounded
                            thumbnail
                            src={
                              typeof formik.values.screen_content.bg_image == 'string'
                                ? process.env.REACT_APP_API_BASEURL +
                                  formik.values.screen_content.bg_image
                                : URL.createObjectURL(formik.values.screen_content.bg_image)
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
                                formik.setFieldValue(`screen_content.bg_image`, array)
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

export default TeamBanner
