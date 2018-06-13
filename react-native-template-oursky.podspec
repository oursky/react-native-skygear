Pod::Spec.new do |s|
  s.name         = "react-native-template-oursky"
  s.version      = 0.0.1
  s.platform     = :ios, "10.0"
  s.source_files  = "ios/**/*.{h,m}"
  s.requires_arc = true
  s.dependency "React"
end