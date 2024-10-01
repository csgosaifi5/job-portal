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
  CRow,
  CSpinner,
} from '@coreui/react'
import { toast, ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import PagesService from 'src/services/PagesService'

const ValidateSchema = Yup.object({
  screen_content: Yup.object().shape(
    {
      meta_title: Yup.string().required('Required'),
      meta_description: Yup.string().required('Required'),
      meta_keywords: Yup.string().required('Required'),
    },
    'Blogs Section in not valid',
  ),
})

const MetaBlogs = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const pagesService = new PagesService()
  const [contentLoaded, setContentLoaded] = useState(false)
  const [submitLoader, setSubmitLoader] = useState(false)
  const [initialValues, setInitialValues] = useState({
    screen_content: {
      meta_title: '',
      meta_description: '',
      meta_keywords: '',
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

      let response = await pagesService.editPage(formData)
      if (response.error) {
        setSubmitLoader(false)
        toast.error(response.error)
      } else if (response.data) {
        setSubmitLoader(false)
        toast.success(response.message)
        setTimeout(() => {
          navigate('/testimonials/list')
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
          <CButton color="primary" variant="outline" onClick={() => navigate('/testimonials/list')}>
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
                  <CCol sm="12" md="6">
                    <CFormLabel htmlFor="meta_title">Meta-Title*</CFormLabel>
                    <CFormInput
                      type="text"
                      id="meta_title"
                      placeholder="Enter Meta-Title"
                      value={formik.values.screen_content.meta_title}
                      name={`screen_content.meta_title`}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      className={
                        'mb-2' +
                        (formik.touched.screen_content &&
                        formik.touched.screen_content.meta_title &&
                        formik.errors.screen_content &&
                        formik.errors.screen_content.meta_title
                          ? ' border-danger'
                          : '')
                      }
                    />
                  </CCol>
                  <CCol sm="12" md="6">
                    <CFormLabel htmlFor="meta_description">Meta-Description*</CFormLabel>
                    <CFormInput
                      type="text"
                      id="meta_description"
                      placeholder="Enter Meta-Description"
                      value={formik.values.screen_content.meta_description}
                      name={`screen_content.meta_description`}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      className={
                        'mb-2' +
                        (formik.touched.screen_content &&
                        formik.touched.screen_content.meta_description &&
                        formik.errors.screen_content &&
                        formik.errors.screen_content.meta_description
                          ? ' border-danger'
                          : '')
                      }
                    />
                  </CCol>
                  <CCol sm="12" md="6">
                    <CFormLabel htmlFor="meta_keywords">Meta-Keywords*</CFormLabel>
                    <CFormInput
                      type="text"
                      id="meta_keywords"
                      placeholder="Enter Meta-Keywords"
                      value={formik.values.screen_content.meta_keywords}
                      name={`screen_content.meta_keywords`}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      className={
                        'mb-2' +
                        (formik.touched.screen_content &&
                        formik.touched.screen_content.meta_keywords &&
                        formik.errors.screen_content &&
                        formik.errors.screen_content.meta_keywords
                          ? ' border-danger'
                          : '')
                      }
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

                      {/* Submit */}
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

export default MetaBlogs
