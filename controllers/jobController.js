const catchAsync = require('../utils/catchAsync');
const Job = require('./../models/jobModel');

exports.getAllJobs = async (req, res, next) => {
  try {
    const jobs = await Job.find();
    res.status(201).json({
      status: 'succes',
      results: jobs.length,
      data: { jobs },
    });
  } catch (err) {
    console.log(err);
  }
};

exports.createJob = async (req, res, next) => {
  try {
    const newJob = await Job.create(req.body);
    res.status(201).json({
      status: 'succes',
      data: { job: newJob },
    });
  } catch (err) {
    console.log(err);
  }
};

// exports.findJob = async (req, res, next) => {
//   try {
//     const job = await Job.findById(req.params.id);
//     if (!job) {
//       res.status(400).json({
//         status: 'fail',
//         message: 'no job found'
//       });
//       return;
//     }
//     res.status(201).json({
//       status: 'succes',
//       data: { job }
//     });
//   } catch (err) {
//     console.log(err);
//   }
// };

exports.findJob = catchAsync(async (req, res, next) => {
  const job = await Job.findById(req.params.id);
  if (!job) {
    res.status(400).json({
      status: 'fail',
      message: 'no job found',
    });
    return;
  }
  res.status(201).json({
    status: 'succes',
    data: { job },
  });
});

exports.updateJob = async (req, res, next) => {
  try {
    const job = await Job.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!job) {
      res.status(400).json({
        status: 'fail',
        message: 'no job found',
      });
      return;
    }
    res.status(204).json({
      status: 'succes',
      data: { job },
    });
  } catch (err) {
    console.log(err);
  }
};

exports.deleteJob = async (req, res, next) => {
  try {
    const job = await Job.findByIdAndDelete(req.params.id);
    if (!job) {
      res.status(400).json({
        status: 'fail',
        message: 'no job found',
      });
      return;
    }
    res.status(204).json({
      status: 'succes',
      data: null,
    });
  } catch (err) {
    console.log(err);
  }
};

// var config = require('../dbconfig');
// const sql = require('mssql');

// async function getReferences() {
//     try {
//         let pool = await sql.connect(config);
//         let references = await pool.request().query("SELECT id, name  from color_references");
//         return references.recordsets;
//     }
//     catch (error) {
//         console.log(error);
//     }
// }

// async function getColors(reference) {
//     try {
//         let pool = await sql.connect(config);
//         let colors = await pool.request()
//         .input('param_reference', sql.Int, reference)
//         .query("SELECT * from reference_patches WHERE reference_id = @param_reference");
//         return colors.recordsets;
//     }
//     catch (error) {
//         console.log(error);
//     }
// }

// async function getColor(name, reference) {
//     try {
//         let pool = await sql.connect(config);
//         let color = await pool.request()
//             .input('param_reference', sql.Int, reference)
//             .input('param_name', sql.NVarChar, name)
//             .query("SELECT * from reference_patches WHERE reference_id = @param_reference AND name = @param_name");
//         return color.recordsets;

//     }
//     catch (error) {
//         console.log(error);
//     }
// }

// async function addColor(color) {

//     try {
//         let pool = await sql.connect(config);
//         let insertColor = await pool.request()
//             .input('Id', sql.Int, color.Id)
//             .input('Title', sql.NVarChar, color.Title)
//             .input('Quantity', sql.Int, color.Quantity)
//             .input('Message', sql.NVarChar, color.Message)
//             .input('City', sql.NVarChar, color.City)
//             .execute('InsertColor');
//         return insertColor.recordsets;
//     }
//     catch (error) {
//         console.log(error);
//     }

// }

// module.exports = {
//     getReferences: getReferences,
//     getColors : getColors,
//     getColor : getColor,
//     addColor : addColor
// }
