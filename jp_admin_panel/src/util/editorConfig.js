// export default {
//   singleLineEditor: {
//     height: '150',
//     plugins:
//       'anchor autolink charmap codesample emoticons image link lists media searchreplace table visualblocks wordcount fullscreen',
//     toolbar:
//       'blocks fontsize | formatselect | bold italic backcolor forecolor | alignleft aligncenter alignright alignjustify | removeformat | help',
//     menubar: false,
//   },
//   multiLineEditor: {
//     plugins:
//       'anchor autolink charmap codesample emoticons image link lists media searchreplace table visualblocks wordcount fullscreen',
//     toolbar:
//       'undo redo | formatselect | bold italic backcolor forecolor | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent | removeformat | fullscreen | help',
//     menubar: true,
//   },
// }

export default {
  singleLineEditor: {
    height: '150',
    plugins:
      'advlist autolink lists link image charmap print preview anchor searchreplace visualblocks code fullscreen insertdatetime media table paste code help wordcount',
    toolbar:
      'undo redo | blocks fontsize | formatselect | bold italic backcolor forecolor | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent | removeformat | link image | charmap | code',
    menubar: false,
  },
  multiLineEditor: {
    plugins:
      'advlist autolink lists link image charmap print preview anchor searchreplace visualblocks code fullscreen insertdatetime media table paste code help wordcount',
    toolbar:
      'undo redo | blocks fontsize | styleselect formatselect fontselect fontsizeselect | bold italic underline strikethrough | alignleft aligncenter alignright alignjustify | outdent indent |  numlist bullist | forecolor backcolor removeformat | subscript superscript | link image media | charmap table | emoticons hr | print preview | code fullscreen',
    menubar: false,
  },
}
