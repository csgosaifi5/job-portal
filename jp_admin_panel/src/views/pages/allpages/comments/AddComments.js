import React, { useEffect, useState, useContext } from 'react'
import { Editor } from '@tinymce/tinymce-react'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import { useNavigate, useParams } from 'react-router-dom'
import CreatableSelect from 'react-select/creatable'
import {
  CBadge,
  CButton,
  CCard,
  CCardBody,
  CCardHeader,
  CCol,
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
import { cilTrash } from '@coreui/icons'
import CIcon from '@coreui/icons-react'
import CommonService from 'src/services/CommonService'

const commonServ = new CommonService()
const AddComments = () => {
  // console.log(user.user_name)
  const { id } = useParams()
  const navigate = useNavigate()
  const [contentLoaded, setContentLoaded] = useState(false)
  const [submitLoader, setSubmitLoader] = useState(false)
  const [initialValues, setInitialValues] = useState({
    full_name: '',
    email_id: '',
    message: '',
  })

  const ValidateSchema = Yup.object({
    full_name: Yup.string().required('Required'),
    email_id: Yup.string().required('Required'),
    message: Yup.string().required('Required'),
  })

  const getSectionDetails = async () => {
    let response = await commonServ.getSingle(id, 'comments')
    if (response.data) {
      setInitialValues(response.data)
      setContentLoaded(true)
    }
  }

  useEffect(() => {
    if (id) {
      getSectionDetails()
    } else {
      setContentLoaded(true)
    }
  }, [id])

  const onSubmit = async (values) => {
    let response
    setSubmitLoader(true)
    let obj = { ...values }
    const formData = new FormData()
    try {
      formData.append('full_name', obj.full_name)
      formData.append('email_id', obj.email_id)
      formData.append('message', obj.message)
      if (id) {
        formData.append('_id', id)
        response = await commonServ.edit(formData, 'comments')
      } else {
        response = await commonServ.add(formData, 'comments')
      }
      if (response.error) {
        setSubmitLoader(false)
        toast.error(response.error)
      } else if (response.data) {
        setSubmitLoader(false)
        toast.success(response.message)
        setTimeout(() => {
          navigate('/articles-commnets/list-all')
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
          {id ? 'Edit Comment' : 'Add New Comment'}{' '}
          <CBadge color="success">{formik.values.section_name}</CBadge>
        </p>
        <CButton
          color="primary"
          variant="outline"
          onClick={() => navigate('/articles-commnets/list-all')}
        >
          Back
        </CButton>
      </CCardHeader>
      {!contentLoaded ? (
        <div className="d-flex justify-content-center py-3">
          <CSpinner color="dark" variant="grow" />
        </div>
      ) : (
        <CCardBody>
          <CForm onSubmit={formik.handleSubmit}>
            {/* <CContainer className="d-flex flex-column gap-3"> */}
            <CCard className={'d-flex flex-column gap-3 p-3'}>
              <CRow>
                <CCol sm="12" md="6">
                  <CFormLabel htmlFor="full_name">Person Name*</CFormLabel>
                  <CFormInput
                    type="text"
                    id="full_name"
                    placeholder="Enter Person Name"
                    value={formik.values.full_name}
                    name={`full_name`}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    className={
                      'mb-2' +
                      (formik.touched.full_name && formik.errors.full_name ? ' border-danger' : '')
                    }
                  />
                </CCol>
                <CCol sm="12" md="6">
                  <CFormLabel htmlFor="email_id">Person Email*</CFormLabel>
                  <CFormInput
                    type="email"
                    id="email_id"
                    placeholder="Enter Person Email"
                    value={formik.values.email_id}
                    name={`email_id`}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    className={
                      'mb-2' +
                      (formik.touched.email_id && formik.errors.email_id ? ' border-danger' : '')
                    }
                  />
                </CCol>
                <CCol sm="12" md="12">
                  <CFormLabel htmlFor="message">Comment*</CFormLabel>
                  <CFormTextarea
                    type="text"
                    id="message"
                    placeholder="Enter Comment"
                    value={formik.values.message}
                    name={`message`}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    className={
                      'mb-2' +
                      (formik.touched.message && formik.errors.message ? ' border-danger' : '')
                    }
                  />
                </CCol>
              </CRow>
            </CCard>
            <CRow>
              <CCol>
                <div
                  className="d-grid gap-2 col-sm-8 col-md-4 mx-auto"
                  style={{ margin: '1rem 0' }}
                >
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
                    ) : id ? (
                      'Submit'
                    ) : (
                      'Submit'
                    )}

                    {/* Submit */}
                  </CButton>
                </div>
              </CCol>
            </CRow>
            {/* </CContainer> */}
          </CForm>
        </CCardBody>
      )}
      <ToastContainer />
    </CCard>
  )
}

export default AddComments
