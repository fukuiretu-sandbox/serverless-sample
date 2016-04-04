// 'use strict';
//
// var _ = require('lodash'),
//   path = require('path'),
//   fs = require('fs');
//
// module.exports.handler = function(event, context) {
//   console.log('isEmpty:' + _.isEmpty(''));
//
//   var filePath = path.join(__dirname, '../../lib/test.txt');
//   var txt = fs.readFileSync(filePath, 'UTF-8');
//   console.log('txt:' + txt);
//
//   return context.done(null, {
//     message: txt
//   });
// };

// 'use strict';
//
// var _ = require('lodash'),
//   path = require('path'),
//   fs = require('fs'),
//   child_process = require('child_process'),
//   done = console.log.bind(console),
//   go_proc = null;
//
// (function new_go_proc() {
//   go_proc = child_process.spawn('./main', { stdio: ['pipe', 'pipe', process.stderr] });
//
//   var data = null;
// 	go_proc.stdout.on('data', function(chunk) {
// 		fails = 0; // reset fails
// 		if (data === null) {
// 			data = chunk;
// 		} else {
// 			data = Buffer.concat([data, chunk]);
// 		}
// 		// check for newline ascii char 10
// 		if (data.length && data[data.length-1] == 10) {
// 			try {
// 				var output = JSON.parse(data.toString('UTF-8'));
// 				data = null;
// 				done(null, output);
// 			} catch(err) {
// 				done(JSON.stringify({
// 					"error": err.toString('UTF-8'),
// 					"payload": data.toString('UTF-8')
// 				}));
// 			}
// 		};
// 	});
// })();
//
// module.exports.handler = function(event, context) {
//   // console.log('isEmpty:' + _.isEmpty(''));
//   //
//   // var filePath = path.join(__dirname, '../../lib/test.txt');
//   // var txt = fs.readFileSync(filePath, 'UTF-8');
//   // console.log('txt:' + txt);
//   //
//   // return context.done(null, {
//   //   message: txt
//   // });
//   done = context.done.bind(context);
//   go_proc.stdin.write(JSON.stringify({
// 		"event": event,
// 		"context": context
// 	})+"\n");
// };

// 'use strict';
//
// var child_process = require('child_process'),
//   path = require('path'),
//   fs = require('fs');
//
// module.exports.handler = function(event, context) {
//   var filePath = path.join(__dirname, './main');
//
//   var child = child_process.spawn(filePath, [ JSON.stringify(event) ]);
//   child.stdout.on('data', function (data) {
//     console.log("stdout:\n"+data);
//     context.done(null, {
//       message: data
//     });
//   });
//   // child.stderr.on('data', function (data) { console.log("stderr:\n"+data); });
//   child.on('close', function (code) { context.done(); });
// }

var exec = require('child_process').exec,
   path = require('path');

exports.handler = function(event, context) {
  var filePath = path.join(__dirname, './main');
  child = exec('chmod 755 ' + filePath + '; ' + filePath, function(error) {
      // Resolve with result of process
      context.done(error, 'Process complete!');
  });

  // Log process stdout and stderr
  child.stdout.on('data', console.log);
  child.stderr.on('data', console.error);
};
